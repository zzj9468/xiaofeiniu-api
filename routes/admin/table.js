const express=require('express')
var router=express.Router();
var pool=require('../../pool');

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
router.get('/detail/:tname',(req,res)=>{
    var res=[];
    var tname=req.params.tname;
    pool.query('select * from xfn_table where tname=?')
})
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