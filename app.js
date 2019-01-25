/**
 * 小肥牛扫码点餐项目API子系统
 */
const port=8090;
const express=require('express');
const cors=require('cors')
const bodyParser=require('body-parser')
bodyParser.urlencoded({
    extends:false
})
var app=express();
app.listen(port,()=>{
    console.log('server listening '+port+'....');
})
