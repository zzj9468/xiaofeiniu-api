const express=require('express')
var router=express.Router();
var pool=require('../../pool');

/**全局设置 */
router.get('/all',(req,res)=>{
    var sql='SELECT * FROM xfn_settings';
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
    var appname=req.body.appname;
    var apiUrl=req.body.apiUrl;
    var adminUrl=req.body.adminUrl;
    var appUrl=req.body.appUrl;
    var icp=req.body.icp;
    var copyright=req.body.copyright;
    var sql='UPDATE xfn_settings SET appname=?,apiUrl=?,adminUrl=?,appUrl=?,icp=?,copyright=?';
    pool.query(sql,[appname,apiUrl,adminUrl,appUrl,icp,copyright],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'修改成功'})
        }else{
            res.send({code:0,msg:'修改失败'})
        }
    })
})

module.exports=router;