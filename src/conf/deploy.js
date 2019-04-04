var path 	= require("path");

module.exports = {

	// 服务器配置
	ip: {

		node: {

			"0": {
				host: '127.0.0.1',
				port: 8000,
				portal: 'dev.kukecun.com:8000'
      },

      "1": {
				host: '127.0.0.1',
				port: 8000,
				portal: 'dev.kukecun.com:8000'
      },

      "2": {
				host: '127.0.0.1',
				port: 8000,
				portal: 'dev.kukecun.com:8000'
      },

			"9": {
				host: '127.0.0.1',
				port: 9001,
				portal: 'kukecun.com'
			},
    },

    // redis
    redis: {

      "0": {
        host: "127.0.0.1",
        port: 9999,
        password: ""
      },

      "1": {
        host: "127.0.0.1",
        port: 9999,
        password: ""
      },

      "2": {
        host: "127.0.0.1",
        port: 9999,
        password: ""
      },

      "9": {
        host: "127.0.0.1",
        port: 9010,
        password: ""
      },
    },

		// web端请求
		webServer: {
      "0": "",
      "1": "",
      "2": "",
      "9": "",
		},
	},

	// 目录结构
	path: {
		rootProject: function(env) {
			var env = +env >= 2 ? "1" : "0";
			return {
				"0": path.join(__dirname, "../"),
        "1": path.join(__dirname, "../"),
			}[env];
    },

    rootLogsProject: function(env) {
			var env = +env > 2 ? "1" : "0";
			return {
				"0": path.join(__dirname, "../../"),
        "1": path.join(__dirname, "../../../"),
			}[env];
    },
	},

	// webview环境
	dist: function(env) {
		var env = +env >= 2 ? "1" : "0";
		return {
			"0": "dev",
      "1": "prod",
		}[env];
  },

  // 日志等级
  logs: function(env) {
		var env = +env == 9 ? "1" : "0";
		return {
			"0": "all",
      "1": "info",
		}[env];
  },
}
