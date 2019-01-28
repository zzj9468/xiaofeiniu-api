const express=require('express')
var router=express.Router();
var pool=require('../../pool');
/**
 * API 
 * 列出所有的菜品
 * GET  /admin/dish
 * 获取所有的菜品,根据类别进行分类
 * 返回数据:
 *      [
 *          {cid:1,cname:'肉类',disdList:[{},{},{}..]}
 *          {cid:1,cname:'海鲜类',disdList:[{},{},{}..]}
 *          {cid:1,cname:'虾滑类',disdList:[{},{},{}..]}
 *          {cid:1,cname:'..',disdList:[{},{},{}..]}
 *          {cid:1,cname:'..',disdList:[{},{},{}..]}
 *      ]
 * 
 */
router.get('/',(req,res)=>{
    //查询所有的类别
    pool.query('select cid,cname from xfn_category',(err,result)=>{
        if(err)throw err;
        var categoryList=result;//菜品类别数组
        var count=0;
        console.log(result);
        var sql='select * from xfn_dish where categoryId=?';    
        for(var c of categoryList){
                pool.query(sql,c.cid,(err,result)=>{
                if(err)throw err;
                c.dishList=result;
                count++;
                if(count==5){
                    res.send(categoryList)
                }    
            })


        }
  
    })
})
    /** 
    var sql='SELECT * FROM xfn_dish';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }else{
            res.send({code:0,data:'查询失败'})
        }
    })
})*/
router.post('/',(req,res)=>{
    var title=req.body.title;
    var price=req.body.price;
    var imgUrl=req.body.imgUrl; 
    var detail=req.body.detail; 
    var categoryId=req.body.categoryId; 
    var sql='INSERT INTO xfn_dish(title,price,imgUrl,detail,categoryId) VALUES(?,?,?,?,?)';
    pool.query(sql,[title,price,imgUrl,detail,categoryId],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'添加桌台成功'})
        }else{
            res.send({code:0,data:'添加失败'})
        }
    })
})

router.delete('/:did/:title',(req,res)=>{
    var did=req.params.did;
    var title=req.params.title;
    var sql='DELETE FROM xfn_dish WHERE did=? OR title=?';
    pool.query(sql,[did,title],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'delete success'})
        }else{
            rse.send({code:400,msg:'login err'})
        }
    })
})

module.exports=router;