
// 默认页面
const Home = require("./home");

// 错误页
const Err = require("./error");

module.exports.start = function(app){

  Home.start(app);
  Err.start(app);
}
