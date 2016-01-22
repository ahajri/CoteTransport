//This file is user to populate reference collections like countries and languages, station list ...
var securityUtils = require('../utils/SecurityUtils.js'), assert = require('assert'), fs = require('fs'), path = require('path');

var _this = this;

module.exports.initRef = function(req, res, next, _db) {

	var jsonUser = req.body;
	//	// verify if user is
	//	var pattern = "{./*/*,/*,/data/France/*}";
	//		//"data/France/**/[cg]/../[cg]"
	//	console.log(pattern);
	//	var mg = new Glob(pattern, {
	//		mark : true
	//	}, function(err, matches) {
	//		return res.status(500).json(err);
	//		console.log("matches", matches)
	//	})
	//	console.log("after")

	//	if (process.argv.length <= 2) {
	//	    console.log("Usage: " + __filename + " path/to");
	//	    process.exit(-1);
	//	}
	console.log(path.dirname(require.main.filename) + '\\data\\France\\');
	var p = path.dirname(require.main.filename) + '\\data\\France\\';

	fs.readdir(p, function(err, files) {
		if (err) {
			return res.status(500).json({
				"status" : "-01",
				"msg" : er.message
			});
		}
		files.forEach(function(filename) {
			console.log(filename);
//			fs.readFile(p + filename, 'utf-8', function(err, content) {
//				if (err) {
//					onError(err);
//					return;
//				}
//				onFileContent(filename, content);
//			});
		});
		
	});

	return res.status(200).json({
		"status" : "011",
		"msg" : "Reference data updated"
	});
}