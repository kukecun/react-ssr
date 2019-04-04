
const routers = require("../../router");
const url = require("url");
const mConfig = require('m.config');

module.exports.start = async function(app) {

  app.get("/", async function(req, res){

    let dataBase = Object.assign({}, mConfig.dataBase);

    routers.start(req, res, dataBase);
  });
}
