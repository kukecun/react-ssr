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

// 打包系列
const webpack								= require('webpack'),
			webpackDevMiddleware 	= require('webpack-dev-middleware'),
			webpackHotMiddleware 	= require('webpack-hot-middleware'),
			webpackDevConfig 			= require("../build/webpack.dev.config"),
      compiler 							= webpack(webpackDevConfig);

// 连接编译器和服务器
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));

// 启动热更新
app.use(webpackHotMiddleware(compiler));

// 配置基本信息
serverBase.start(app, express, router);

// 启动服务
app.listen(Config.nodeServer().port, function(){
  console.log("服务"+Config.nodeServer().portal+"启动！");
});
