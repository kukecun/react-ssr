const path    = require("path"),
      env     = require("./env"),
      deploy  = require("./deploy"),
      time    = new Date().getTime();

global.Config = {

  env: env.deploy,

	version: "1.00",

  time: time,

	// web服务
  webServer: deploy.ip.webServer[env.deploy],

	// 项目根目录
  rootProject: deploy.path.rootProject(env.deploy),

  // 服务根目录
  rootServer: function () {
		return path.join(this.rootProject, "server");
	},

	// 静态文件根目录
	rootStartProject: function () {
		return path.join(this.rootProject, "client");
  },

  // 日志文件根目录
	rootLogsProject: path.join(deploy.path.rootLogsProject(env.deploy), "logs"),

	// node服务器
	nodeServer: function(){
		return {
			host: deploy.ip.node[env.deploy].host,
			port: deploy.ip.node[env.deploy].port,
			portal: deploy.ip.node[env.deploy].portal
		}
  },

  // redis服务器
	redisServer: function(){
		return {
			host: deploy.ip.redis[env.deploy].host,
			port: deploy.ip.redis[env.deploy].port,
			portal: deploy.ip.redis[env.deploy].portal
		}
	},

	// webview环境
  dist: deploy.dist(env.deploy),

  // 日志等级
  logs: deploy.logs(env.deploy),
}
