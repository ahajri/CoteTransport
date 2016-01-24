//This file is user to populate reference collections like countries and languages, station list ...
var securityUtils = require('../utils/SecurityUtils.js'),
assert = require('assert'), 
fs = require('fs'), 
async = require('async'), 
path = require('path');

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
		var stationsData = {};
		files.forEach(function(filename) {
			fs.readFile(p + filename, 'utf-8', function(err, content) {
				if (err) {
					return res.status(500).json({
						"status" : "-01",
						"msg" : err.message
					});
				}
				// Get Json Array from data
				if (filename === 'stations_ratp.geojson') {

					stationsData = JSON.parse(content);
					console.log(stationsData.features.length + " stations");
					var stationCollection = _db.collection('station');
					var batch = stationCollection.initializeOrderedBulkOp();
					console.log('data insert processing...');
					for (i = 0; i < stationsData.features.length; i++) {
						var feature = stationsData.features[i];
						batch.insert(feature);
					}
					// Execute the operations
					  batch.execute(function(err, result) {
					    console.dir(err);
					    console.dir(result);
					  });
					console.log('alla sttaions inserted');
				}

			});
		});

	});

	return res.status(200).json({
		"status" : "011",
		"msg" : "Reference data updated"
	});
}