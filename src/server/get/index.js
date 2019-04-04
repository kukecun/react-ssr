
// 控制器
const CTRL = require("./control");

// 页面
const PAGE = require("./page");

module.exports.start = function(app, router) {
	CTRL.get(app, router);
  PAGE.start(app);
}
