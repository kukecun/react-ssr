// Provide custom regenerator runtime and core-js
//require('babel-polyfill');

// Node babel source map support
//require('source-map-support').install()

// Javascript require hook
require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['add-module-exports', 'syntax-dynamic-import']
});

// Css require hook
require('css-modules-require-hook')({
  extensions: ['.scss'],
  preprocessCss: (data, filename) =>
    require('node-sass').renderSync({
        data,
        file: filename
    }).css,
  camelCase: true,
  generateScopedName: '[name]__[local]__[hash:base64:8]'
});

// Image require hook
require('asset-require-hook')({
  name: '/[hash].[ext]',
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 8000
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
  log.warn("服务"+Config.nodeServer().portal+"启动！");
  console.log("服务"+Config.nodeServer().portal+"启动！");
});
