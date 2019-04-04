module.exports = {

	// get全局处理
	get: function(app, router){

		// 配置路由 get
		router.get(/^\/*/, function(req, res, next){

			if (req.url == "/favicon.ico") {
				next();
				return;
			}

			next();
    });

    app.get('/*', router);
	}
}
