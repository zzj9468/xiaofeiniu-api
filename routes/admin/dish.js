const express=require('express')
var router=express.Router();
var pool=require('../../pool');

router.get('/all',(req,res)=>{
    var sql='SELECT * FROM xfn_dish';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }else{
            res.send({code:0,data:'查询失败'})
        }
    })
})
router.post('/add',(req,res)=>{
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

router.get('/delete',(req,res)=>{
    var did=req.query.did;
    var title=req.query.title;
    var sql='DELETE FROM xfn_dish WHERE did=? OR title=?';
    pool.query(sql,[did,title],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'删除成功'})
        }else{
            res.send({code:0,data:'删除失败'})
        }
    })
})

module.exports=router;