const express=require('express')
var router=express.Router();
var pool=require('../../pool');

router.get('/all',(req,res)=>{
    var sql='SELECT * FROM xfn_category';
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
    var cname=req.body.cname; 
    var sql='INSERT INTO xfn_category(cname) VALUES(?)';
    pool.query(sql,cname,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'添加菜品成功'})
        }else{
            res.send({code:0,data:'添加菜品失败'})
        }
    })
})

router.get('/delete',(req,res)=>{
    var cid=req.query.cid;
    var sql='DELETE FROM xfn_category WHERE cid=?';
    pool.query(sql,cid,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'删除成功'})
        }else{
            res.send({code:0,data:'删除失败'})
        }
    })
})

router.post('/update',(req,res)=>{
    var cid=req.body.cid;
    var cname=req.body.cname;
    var sql='UPDATE xfn_category SET cname=? WHERE cid=?';
    pool.query(sql,[cname,cid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'修改成功'})
        }else{
            res.send({code:0,data:'修改失败'})
        }
    })
})

module.exports=router;