/**
 * 小肥牛扫码点餐项目API子系统
 */
const port=8090;
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
var admin=require('./routes/admin/admin');
var setting=require('./routes/admin/setting');
var table=require('./routes/admin/table');
var dish=require('./routes/admin/dish');
var category=require('./routes/admin/category');

var app=express();
app.listen(port,()=>{
    console.log('server listening '+port+'....');
})
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(express.static('public'));
app.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true
}))

app.use('/admin',admin);
app.use('/setting',setting);
app.use('/table',table);
app.use('/dish',dish);
app.use('/category',category);