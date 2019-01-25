const express=require('express')
var router=express.Router();
var pool=require('../../pool');

router.post('/update',(req,res)=>{
    var aid=req.body.aid;
    var apwd=req.body.apwd;
    var sql='UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aid=?';
    pool.query(sql,[apwd,aid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,data:'修改成功'})
        }else{
            res.send({code:0,data:'修改失败'})
        }
    })
})
module.exports=router;