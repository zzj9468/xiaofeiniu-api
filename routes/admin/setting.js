const express=require('express')
var router=express.Router();
var pool=require('../../pool');

/**全局设置 */
router.get('/',(req,res)=>{
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

router.put('/',(req,res)=>{
    var data=req.body;
    var sql='UPDATE xfn_settings SET appname=?,apiUrl=?,adminUrl=?,appUrl=?,icp=?,copyright=?';
    pool.query(sql,[data.appname,data.apiUrl,data.adminUrl,data.appUrl,data.icp,data.copyright],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'修改成功'})
        }else{
            res.send({code:0,msg:'修改失败'})
        }
    })
})

module.exports=router;