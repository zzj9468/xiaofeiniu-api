/**
 * 小肥牛扫码点餐项目API子系统
 */
console.log('准备启动API服务器···');
console.log(new Date().toLocaleString());
const port=8090;
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
var adminRouter=require('./routes/admin/admin');
var setting=require('./routes/admin/setting');
var table=require('./routes/admin/table');
var dishRouter=require('./routes/admin/dish');
var categoryRouter=require('./routes/admin/category');

var app=express();
app.listen(port,()=>{
    console.log('API服务器启动成功,端口是:'+port+'....');
})
/**
 * 使用中间件
 */
app.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true
}))
/**
 * bodyParser.urlencoded是把application/x-www-form-urlencoded格式的请求主体数据解析出来放入req.body中
 */
//bodyParser.json()把application/json格式的请求主体数据请求出来放入req.body
app.use(bodyParser.json())

app.use(express.static('public'));

/*
挂载到路由器下 */
app.use('/admin',adminRouter);
app.use('/damin/setting',setting);
app.use('/admin/table',table);
app.use('/admin/dish',dishRouter);
app.use('/admin/category',categoryRouter);