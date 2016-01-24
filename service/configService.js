//This file is user to populate reference collections like countries and languages, station list ...
var securityUtils = require('../utils/SecurityUtils.js'), assert = require('assert'), fs = require('fs'), async = require('async'), path = require('path');

var _this = this;

module.exports.initRef = function(req, res, next, _db) {

	var jsonUser = req.body;
	console.log(path.dirname(require.main.filename) + '\\data\\France\\');
	var p = path.dirname(require.main.filename) + '\\data\\France\\';

	fs.readdir(p, function(err, files) {
		if (err) {
			return res.status(500).json({
				"status" : -1,
				"msg" : err.message
			});
		}
		files.forEach(function(filename) {
			fs.readFile(p + filename, 'utf-8', function(err, content) {
				if (err) {
					return res.status(500).json({
						"status" : -1,
						"msg" : err.message
					});
				}
				// Get Json Array from data

				var d = JSON.parse(content);
				console.log(''+filename.split('.',1));
				var col = _db.collection(''+filename.split('.',1));
				col.deleteMany({},// query
						function(err, object) {
					if (err) {
						return res.status(500).json({
							"status" : -1,
							"msg" : err.message
						});
					}
					console.log(filename.split('.',1)+" data removed");
				});
				var batch = col.initializeOrderedBulkOp();
				console.log('data insert processing...');
				if(filename === 'station.geojson'){
					for (i = 0; i < d.features.length; i++) {
						var feature = d.features[i];
						batch.insert(feature);
					}
				}
				if(filename === 'commune.json'){
					for (i = 0; i < d.length; i++) {
						var feature = d[i];
						batch.insert(feature);
					}
				}
				// Execute the operations
				batch.execute(function(err, result) {
					if (err) {
						return res.status(500).json({
							"status" : -1,
							"msg" : err.message
						});
					}

				});
				console.log('data inserted');

			});
		});

	});

	return res.status(200).json({
		"status" : "011",
		"msg" : "Reference data updated"
	});
}