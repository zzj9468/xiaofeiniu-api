const express=require('express')
var router=express.Router();
var pool=require('../../pool');
/**
 * API 
 * 列出所有的菜品
 * GET  /admin/dish
 * 获取所有的菜品,根据类别进行分类
 * 返回数据:
 *      []
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
        // 循环遍历每个菜品类别,查询该类别下有哪些菜品
        var categoryList=result;//菜品类别数组
        var finishedCount=0;
        // console.log(result);
        var sql='select * from xfn_dish where categoryId=? order by did desc';    
        for(let c of categoryList){
                pool.query(sql,c.cid,(err,result)=>{
                if(err)throw err;
                c.dishList=result;
                finishedCount++;
                if(finishedCount==categoryList.length){
                    //必须保证所有的类别下的菜品全部查询完成才能发送响应消息--这些查询都是异步的
                    res.send(categoryList)
                }    
            })


        }
  
    })
})
/**
 * POST /admin/dish/image
 * 请求参数
 * 接收客户端上传的菜品的图片,保存在服务器上,返回该图片在服务器上的随机文件名
 * 返回数据:{code:200,msg:'upload succ',filename:'13512873612-2342.jpg'}
 */
//引入multer中间件
const multer=require('multer');
const fs=require('fs')
var upload=multer({
    dest:'tmp/'  //指定客户端上传文件临时存储路径
})
//定义路由，使用文件上传中间件
//upload.single('filedname')--单个文件上传
//upload.array('filedname')--多个文件上传
router.post('/image',upload.single('dishImg'),(req,res)=>{
    //console.log(req.file);  //客户端上传的文件
    //console.log(req.body);  //客户端随同图片提交的字符数据
    //客户端上传的文件从临时目录转移到永久的图片路径下
    var tmpFile=req.file.path;//临时文件名
    var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf('.'))//原始文件的后缀部分
    var newFile=randomFileName(suffix);//目标文件吗
    fs.rename(tmpFile,'img/dish/'+newFile,()=>{
        res.send({code:200,msg:'upload succ',filename:newFile})
    })
})
//生成一个随机文件名
//参数:suffix表示要生成的文件名的后缀
function randomFileName(suffix){
    var time=new Date().getTime();//当前系统时间戳
    var num=Math.floor(Math.random()*(10000-1000)+10000);//四位随机数
    return time+'-'+num+suffix
}
/**
 * POST /admin/dish
 * 添加一个新的菜品
 * 请求参数:{title:'..',imgUrl:'.',price:'',detail:'.',categoryId:''}
 * 输出消息:
 *    {code:200,msg:'dish added succ',dishId:46}
 */
router.post('/',(req,res)=>{
    var data=req.body;
    var sql='INSERT INTO xfn_dish(title,price,imgUrl,detail,categoryId) VALUES(?,?,?,?,?)';
    pool.query(sql,[data.title,data.price,data.imgUrl,data.detail,data.categoryId],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'dish added succ',dishId:result.insertId})//insert语句产生的自增编号输出给客户端
        }else{
            res.send({code:400,msg:'dish added err'})
        }
    })
})
/**
 * DELETE /admin/dish:did
 * 按照指定的菜品删除该菜品
 * 输出数据: *{code:200,msg:'dish delete succ'}
 *              code:400,msg:'dish not exists}
 *          
 */

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

router.put('/',(req,res)=>{
    var data=req.body;
    var sql='update xfn_dish set title=?,imgUrl=?,price=?,detail=?,category=? where tid=?';
    pool.query(sql,[data.title,data.imgUrl,data.price,data.detail,data.categoryId],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'dish added succ'})
        }else{
            res.send({code:400,msg:'dish added err'})
        }
    })
})
module.exports=router;