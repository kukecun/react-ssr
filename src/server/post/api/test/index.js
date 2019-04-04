

const security = require("m.security");

module.exports.start = function(app) {

	app.post("/api/test", function(req, res){

		res.json({
			data: security.md5(req.body.text)
		});
	});
}
