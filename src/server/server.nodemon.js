
require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['add-module-exports', 'syntax-dynamic-import']
});

// 服务端系列
const express 							= require("express"),
      router 								= express.Router(),
      app 									= express(),
      serverBase						= require('./server.js');

// 配置基本信息
serverBase.start(app, express, router);

// 启动服务
app.listen(Config.nodeServer().port, function(){
  console.log("服务"+Config.nodeServer().portal+"启动！");
});
