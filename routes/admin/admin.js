/**
 * 管理员相关路由
 * API:
 */
 const express=require('express')
var router=express.Router();
var pool=require('../../pool');


/**
 完成用户登录验证(提示:有的项目会选择POST请求)
 * GET请求可以有主体吗?
 * GET  /admin/login/:aname/:apwd
 * 
 * 请求数据:{aname:'',apwd:''}
 * 返回数据:
 *      {code:200,msg:'login success'}
 *      {code:400,msg:'aname or apwd err'}
 * 
 */
  //get不允许提交请求主体消息
router.get('/login/:aname/:apwd',(req,res)=>{
    var aname=req.params.aname;
    var apwd=req.params.apwd;
    var sql='SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)'
    pool.query(sql,[aname,apwd],(err,result)=>{
        if(err)throw err;
        if(result.length>0){ //查询到一行数据
            res.send({code:200,msg:'login success'})
        }else{  //没有查询到数据
            res.send({code:400,msg:'aname or apwd err'});
        }
    })
})
 /**
 
 根据用户名和密码修改用户密码
 * PUT/PATCH
 * PUT:修改完整的一行数据
 * PATCH:修改一行的其中一个数据
 * PATCH/admin
 * 请求数据{aname:'',oldPWD:'',newPwd:''}
 * 根据管理员名和密码修改管理员密码
 * 返回数据
 *      {code:200,msg:'modified succ'}
 *      {code:400,msg:'aname or pwd err'}
 *      {code:401,msg:'apwd not modified'}
  */

router.patch('/',(req,res)=>{
    var data=req.body;
    //先根据aname和oldPwd判断管理员是否存在
    //如果查询到,在修改密码
    pool.query('select aid from xfn_admin where aname=? and apwd=PASSWORD(?)',[data.aname,data.oldPwd],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
            res.send({code:400,msg:'pwd err'});
            return;
        }
        var sql='UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?';
        pool.query(sql,[data.newPwd,data.aname],(err,result)=>{
            if(err) throw err;
            if(result.changedRows>0){
                res.send({code:200,msg:'modified succ'})
            }else{
                res.send({code:401,msg:'apwd not modified'})
            }
    })
    })

})
module.exports=router;