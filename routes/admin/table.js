const express=require('express')
var router=express.Router();
var pool=require('../../pool');

router.get('/all',(req,res)=>{
    var sql='SELECT * FROM xfn_table';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }else{
            res.send({code:0,data:'查询失败'})
        }
    })
})
router.post('/update',(req,res)=>{
    var tid=req.body.tid;
    var tname=req.body.tname;
    var type=req.body.type;
    var status=req.body.status;
    var sql='UPDATE xfn_table SET tname=?,type=?,status=? WHERE tid=?';
    pool.query(sql,[tname,type,status,tid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'修改成功'})
        }else{
            res.send({code:0,data:'修改失败'})
        }
    })
})
router.post('/add',(req,res)=>{
    var tname=req.body.tname;
    var type=req.body.type;
    var status=req.body.status; 
    var sql='INSERT INTO xfn_table(tname,type,status) VALUES(?,?,?)';
    pool.query(sql,[tname,type,status],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'添加桌台成功'})
        }else{
            res.send({code:0,data:'添加失败'})
        }
    })
})
router.get('/delete',(req,res)=>{
    var tid=req.query.tid;
    var sql='DELETE FROM xfn_table WHERE tid=?';
    pool.query(sql,tid,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'删除成功'})
        }else{
            res.send({code:0,data:'删除失败'})
        }
    })
})
module.exports=router;