
const path 	= require("path");
const fs 		= require("fs");

module.exports = {

	entry: function(hotMiddlewareScript){

		let fpath 	= 'client/enter',
        jsPath 	= path.join(__dirname, "../", fpath),
        matchs 	= [],
        files 	= {};

		let getFiles = function(jsPath, fpath){

			let dirs = fs.readdirSync(jsPath);

			dirs.forEach(function(item){
				matchs = item.match(/(.+)\.js$/);

				if(matchs) {

          let pathname = fpath.split("client/enter")[1], name = "";
          pathname = pathname != "" && pathname.split("/").filter( r => r != "").join("-");
          name = pathname == "" ? matchs[1] : pathname + "-" + matchs[1];

          if(hotMiddlewareScript) {
            files[name] = [path.join(__dirname, "../", fpath, item), hotMiddlewareScript];
          } else {
            files[name] = path.join(__dirname, "../", fpath, item);
          }

				} else {

					let a 	= "/" + item,
              b  	= jsPath + a,
              c 	= fpath + a,
              f 	= fs.lstatSync(b).isDirectory();

					f && getFiles(b, c);
				}
			});
		}

		getFiles(jsPath, fpath);

		return files;
	}
}
