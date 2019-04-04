const path 					= require("path"),
			favicon 			= require('serve-favicon'),
			bodyParser 		= require('body-parser'),
      cookieParser 	= require('cookie-parser');

// gzip压缩
const compression 	= require('compression');

// 模版插件
const consolidate 	= require('consolidate');

// 进入SSR中间件
//const clientRoute   = require('./middlewares/router.js');

require("../conf/config.js");

// 日志输出
global.log = require('m.logs').init();

const postAPI 	    = require('./post');
const getPage       = require('./get');

module.exports.start = function(app, express, router){

	// gzip压缩
	app.use(compression());

	// favicon.ico
	app.use(favicon(path.join(Config.rootStartProject(), 'favicon.ico')));

	// 配置静态路径
	app.use(express.static(Config.rootStartProject()));

	// bodyParser中间件，用于更好的获取请求的数据
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json({limit: '10mb'}));

	// set cookie
	app.use(cookieParser());

  // 启动React服务端渲染
  //app.use(clientRoute);

	// 配置默认模板，目前为html
	app.engine('html', consolidate.ejs);
	app.set('view engine', 'html');
  app.set('views', Config.rootStartProject());

  // post请求2
  postAPI.start(app, router);

  // 页面控制器
  getPage.start(app, router);
}
