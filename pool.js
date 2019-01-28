const mysql=require('mysql');
var pool=mysql.createPool({
    host:'127.0.0.1', //数据库地址
    port:3306,   //数据库端口号
    user:'root',
    password:'',
    database:'xiaofeiniu',
    connectionLimit:20
})
module.exports=pool;