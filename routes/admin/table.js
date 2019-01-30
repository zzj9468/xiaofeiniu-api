const express=require('express')
var router=express.Router();
var pool=require('../../pool');

/**
 * GET /admin/table
 * 查询所有桌台的信息
 * 返回数据,   
 *     [
 *        {tid:xxx,tname:'xx',status:..} 
 * ]
 */
router.get('/',(req,res)=>{
    var sql='SELECT * FROM xfn_table';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({ code: 1, data: result });
        }else{
            res.send({code:0,data:'查询失败'})
        }
    })
})

/**
 * 查询一个桌台的信息
 */
router.get('/detail/:tname',(req,res)=>{
    var tname=req.params.tname;
    pool.query('select * from xfn_table where tname=?',tname,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var res01=result;
            if(result[0].status==2){
                console.log('状态为'+result[0].status+'时,tname::'+tname);
                pool.query('select * from xfn_reservation where tableId=? order by contactTime asc limit 1',result[0].tid,(err,result)=>{
                    if(err) throw err;
                    if(result.length>0){
                        res01[0].reservationList=result[0];
                        res.send({code:200,data:res01});
                    }
                })
            }else if(result[0].status==3){
                //桌子状态为占用时
                    //先根据tableId查询订单详情表的内容
                    console.log('状态为'+result[0].status+'时,tname::'+tname);
                    pool.query('select startTime,oid,customerCount from xfn_order where tableId=? order by startTime asc limit 1',result[0].tid,(err,result)=>{
                        if(err) throw err;
                        if(result.length>0){
                            // console.log(result)
                            res01[0].orderList=result[0];
                            //根据订单
                            pool.query('select customerName,dishCount,dishId from xfn_order_detail where orderId=?',result[0].oid,(err,result)=>{
                                if(err)throw err;
                                if(result.length>0){
                                    res01[0].userList=result
                                    var count=0;
                                    var userList=result;
                                    for(let r of userList){
                                        pool.query('select title from xfn_dish where did=?',r.dishId,(err,result)=>{
                                            if(err)throw err;                         count++;
                                            if(result.length>0){ 
                                                r.title=result[0].title
                                                if(count>result.length){
                                                    res.send({code:200,data:res01})
                                            }
                                            //    res01[0].userList.title=result[0].title
   
                                            }
                                         })
                                    }
                                }
                            })
                            
                        }
                    })
    
            }else{
                res.send({code:200,data:result})
            }
            // res.send({code:200,data:result})
        }else{
            res.send({code:400,msg:'table selected err'})
        }
    })
})
/**
 * 修改桌台的状态
 */
router.put('/',(req,res)=>{
    var data=req.body;
    var tid=data.tid;
    var status=data.status;
    if(status==0){
        var tname=data.tname;
        Updata('UPDATE xfn_table SET status=?,tname=? WHERE tid=?',[tname,status,tid])
    }else if(status==1){
        Updata('UPDATE xfn_table SET status=? WHERE tid=?',[status,tid])
    }else if(status==2){
        Updata('UPDATE xfn_table SET type=?,status=? WHERE tid=?',[tname,type,status,tid])
    }else{
        Updata('UPDATE xfn_table SET type=?,status=? WHERE tid=?',[tname,type,status,tid])
    }
    function Updata(sql,parm){
        pool.query(sql,parm,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:1,data:'修改成功'})
            }else{
                res.send({code:0,data:'修改失败'})
            }
        })
    } 

})
router.post('/',(req,res)=>{
    var data=req.body;
    var sql='INSERT INTO xfn_table(tname,type,status) VALUES(?,?,?)';
    pool.query('select * from xfn_table where tname=?', data.tname, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 200, data: 'table has exists' })
        }else{
            pool.query(sql,[data.tname,data.type,data.status],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({ code: 200, data: '1 table added' })
                }else{
                    res.send({ code: 400, msg: '0 table added' })
                }
            })
        }
    })
})



router.delete('/:tid',(req,res)=>{
    var tid=req.params.tid;
    var sql='DELETE FROM xfn_table WHERE tid=?';
    pool.query(sql,tid,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ code: 200, msg: "1 table deleted" })
        }else{
            res.send({ code: 200, msg: "0 table deleted" })
        }
    })
})
module.exports=router;