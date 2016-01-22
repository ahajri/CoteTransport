//This file is user to populate reference collections like countries and languages, station list ...
var securityUtils = require('../utils/SecurityUtils.js'), 
assert = require('assert'), 
fs = require('fs');


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

	return res.status(200).json({
		"status" : "011",
		"msg" : "Reference data updated"
	});
}