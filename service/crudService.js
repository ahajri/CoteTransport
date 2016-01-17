var securityUtils = require('../utils/SecurityUtils.js'), 
assert = require('assert'), 
async = require('async');

module.exports.addDocumentAsync = function(req, res, next, _db,collectionName,query) {
	var lang = req.acceptsLanguages('fr', 'ar', 'en');
	var collection = _db.collection(collectionName);
	var result = {};
	var jsonData = req.body;
	jsonData.password = securityUtils.md5(req.body.password);
	async
			.series(
					[
							// Check and Load user
							function(callback) {

								_db
										.open(function(err, db) {
											collection
													.findOne(
															query,
															function(err, users) {
																assert
																		.ok(db != null);
																if (err)
																	return callback(err);
																if (users) {
																	return res
																			.status(
																					500)
																			.json(
																					{
																						"error" : "Anotheritem with same identifiers already exits"
																					});
																}
																callback();
															});
										});
							},
							// insert user (won't be called before task 1's
							// "task callback" has
							// been called)
							function(callback) {
								collection.insert(req.body, {
									w : 1
								}, function(err, records) {
									result = records;
									callback(jsonData);
								});
							} ], function(msg) { // This function gets called
						// after the two tasks
						// have called their "task callbacks"
						if (msg) {
							return res.status(200).json(msg);
						}
						// Here locals will be populated with 'user' and 'posts'
						res.render('item-created', result);
					});
}

//Update User with complete data
module.exports.modifyDocumentAsync = function(req, res, next, _db,collectionName,query) {
	var collection = _db.collection(collectionName);
	var jsonData = req.body;
	jsonData.password = securityUtils.md5(req.body.password);
	async.series([
	// Check and Load user
	function(callback) {

		_db.open(function(err, db) {
			assert.ok(db != null);
			collection.findAndModify(query,// query			
			/*[ [ '_id', 'desc' ] ], // sort order*/
			jsonData, // replacement
			{}, // options
			function(err, object) {
				if (err) {
					return res.status(500).json({
						"error" : err.message
					});
				}
				if (object.value === null) {
					callback({
						"error" : "User does not exist for this email"
					});
				} else {
					callback();
				}
			});

			//	collection.update({"email":jsonData.email}, jsonData, function(err, user) {
			//		if (err) return callback(err);
			//		if(user){
			//		callback();
			//   }else{
			//	 return res.status(500).json({ "error": "user does not exist!" });
			//	   }
			//	 });

		});
	}

	], function(err) { // This function gets called after the two
		// tasks
		// have called their "task callbacks"
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({
			"msg" : "User modified successfully"
		});

	});

}

module.exports.deleteDocumentAsync = function(req, res, next, _db,collectionName,query) {
	var collection = _db.collection(collectionName);
	async.series([
	// Check and Load user
	function(callback) {

		_db.open(function(err, db) {
			assert.ok(db != null);
			collection.deleteOne(query,// query			
			function(err, object) {
				if (err) {
					return res.status(500).json({
						"error" : err.message
					});
				}
				if (object.value === null) {
					callback({
						"error" : "Item does not exist for this query"
					});
				} else {
					callback();
				}
			});
		});
	}

	], function(err) { // This function gets called after the two
		// tasks
		// have called their "task callbacks"
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({
			"msg" : "Item removed successfully"
		});

	});

}