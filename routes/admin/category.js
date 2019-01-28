const express = require('express')
var router = express.Router();
var pool = require('../../pool');
/**
 * 四个路由器
 * ①查看
 * API:GET/admin/category
 * 含义:客户端获取所有的菜品类别,按编号升序排列
 * 返回值形式:[{cid:1,cname:'..'},{cid:2,cname:'..'}]
 * 
 */
router.get('/', (req, res) => {
    var sql = 'SELECT * FROM xfn_category ORDER BY cid';
    pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, data: result });
        } else {
            res.send(result)
        }
    })
})

/**
 * 
 *②删除
 * API:DELETE/admin/category/:cid=3
 * 含义:根据表示菜品编号的路由参数，删除该菜品
 * 返回值形式:{code:200,msg:"1 category deleted"}
 *          {code:200,msg:" 0 category deleted"}
 */
router.delete('/:cid', (req, res) => {
    /**注意删除类别菜品前必须先把属于该类的菜品的类别编号设置为NULL*/
    pool.query('update xfn_dish set categoryId=null where categoryId=?', req.params.cid, (err, result) => {
        if (err) throw err;
        //至此指定类别的菜品已经修改完毕
        var sql = 'DELETE FROM xfn_category WHERE cid=?';
        pool.query(sql, req.params.cid, (err, result) => {
            if (err) throw err;
            //获取delete语句在数据库中影响的行数
            if (result.affectedRows > 0) {
                res.send({ code: 200, msg: "1 category deleted" })
            } else {
                res.send({ code: 200, msg: " 0 category deleted" })
            }
        })
    })

})

/**
 *①添加
 * API:POST/admin/category
 * 请求主体参数{cname:'..'}
 * 含义:添加新的菜品类别
 * 返回值形式:{code:200,msg:'1 category added',cid:''}
 *
 */

router.post('/', (req, res) => {
    console.log('获取到请求数据:');
    console.log(req.body)//形如{cname:'...'}
    var cname = req.body.cname;
    pool.query('select * from xfn_category where cname=?', cname, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 200, data: 'category has exists' })
        }else{
            var sql = 'INSERT INTO xfn_category(cname) VALUES(?)';
            pool.query(sql, cname, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.send({ code: 200, data: '1 category added' })
                } else {
                    res.send({ code: 400, msg: '0 category added' })
                }
            })
        }
    })
})


/**
 * * ①修改
 * API:PUT/admin/category
 * 请求主体参数{cid:..,cname:''}
 * 含义:根据菜品类别修改该类别
 * 返回值形式:{code:200,msg:'1 category modified'}
 *           {code:400,msg:'0 category modified,not exists'}
 *           {code:401,msg:'0 category modified,no modification'}
 */
router.put('/', (req, res) => {
    var data=req.body;  /**请求数据{cid:..,cname:'..'} */
    //TODO此处可对数据进行验证
    var sql = 'UPDATE xfn_category SET cname=? WHERE cid=?';
    pool.query(sql, [data.cname, data.cid], (err, result) => {
        console.log(result)
        if (err) throw err;
        if (result.changedRows > 0) {  //更新了一行
            res.send({code:200,msg:'1 category modified'})
        } else if(result.affectedRows==0){
            res.send({code:400,msg:'0 category modified,not exists'})
        }else if(result.affectedRows==1 && result.changedRows==0){//影响了一行,更新了一行,新值与原值相同
            res.send({code:401,msg:'0 category modified,no modification'})
        }
    })
})

module.exports = router;