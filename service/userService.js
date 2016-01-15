var securityUtils = require('../utils/SecurityUtils.js'), 
assert = require('assert'), 
async = require('async');

module.exports.addUserAsync = function(req, res, next, _db) {
	var lang = req.acceptsLanguages('fr', 'ar', 'en');
	var collection = _db.collection('UserAuth');
	var result = {};
	var userJson = req.body;
	userJson.password = securityUtils.md5(req.body.password);
	async
			.series(
					[
							// Check and Load user
							function(callback) {

								_db
										.open(function(err, db) {
											collection
													.findOne(
															{
																"$or" : [
																		{
																			"email" : userJson.email
																		},
																		{
																			"username" : userJson.login
																		} ]
															},
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
																						"error" : "Another user using the same username or email already exists"
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
									callback(userJson);
								});
							} ], function(msg) { // This function gets called
						// after the two tasks
						// have called their "task callbacks"
						if (msg) {
							return res.status(200).json(msg);
						}
						// Here locals will be populated with 'user' and 'posts'
						res.render('user-created', result);
					});
}

//Update User with complete data
module.exports.modifyUserAsync = function(req, res, next, _db) {
	var collection = _db.collection('UserAuth');
	var userJson = req.body;
	userJson.password = securityUtils.md5(req.body.password);
	async.series([
	// Check and Load user
	function(callback) {

		_db.open(function(err, db) {
			assert.ok(db != null);
			collection.findAndModify({				"email" : userJson.email			},// query			
			[ [ '_id', 'desc' ] ], // sort order
			userJson, // replacement
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

			//	collection.update({"email":userJson.email}, userJson, function(err, user) {
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