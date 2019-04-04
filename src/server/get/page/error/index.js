
module.exports.start = function(app) {

  app.get("/*", function(req, res){
    res.render('views/404', {}, function(err, html) {
      res.send(html);
    });
  });
}
