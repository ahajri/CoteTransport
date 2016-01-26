var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended : true

})); // for parsing
// application/x-www-form-urlencoded
//
var Db = require('mongodb').Db, MongoClient = require('mongodb').MongoClient, 
mongoose = require('mongoose'), 
Server = require('mongodb').Server, 
ReplSetServers = require('mongodb').ReplSetServers, 
ObjectID = require('mongodb').ObjectID, 
Binary = require('mongodb').Binary, GridStore = require('mongodb').GridStore, 
Grid = require('mongodb').Grid, 
Code = require('mongodb').Code, 
BSON = require('mongodb').BSON, 
util = require('util'), 
fs = require('fs'), 
assert = require('assert'), 
request = require('request'),
Glob = require('glob').Glob,
cluster = require('cluster'), 
mysql = require('mysql'), 
Converter = require("csvtojson").Converter, 
nodemailer = require("nodemailer"), 
json = require('json-update'),
uuid = require('node-uuid'),

//
securityUtils = require('./utils/SecurityUtils.js'), 
configServcice = require('./service/configService.js'), 
userServcice = require('./service/userService.js'), 
crudServcice = require('./service/crudService.js'), 
//
languages = require('./data/ref/languages.json');

//
var _db; // new Db('APPDB', new Server('localhost', 27017));

var mongoclient = new MongoClient(new Server("localhost", 27017), {
	native_parser : true
});
// run server
var server = app.listen(8585, function() {
	if (cluster.isMaster) {
		console.log('Master process ...');
	}
	if (cluster.isWorker) {
		console.log('Worker process ...');
	}
	// MongoDB
	mongoclient.connect('mongodb://localhost:27017/APPDB', {
		native_parser : true
	}, function(err, db) {
		assert.equal(null, err);
		assert.ok(db !== null);
		_db = db;
		console.log('Connected to MongoDB ...');
	});

	var cpuCount = require('os').cpus().length;
	console.log('CPU nodes = ' + cpuCount);
	var host = server.address().address;
	var port = server.address().port;

	console.log("REST Service is running on http://%s:%s", host, port);
});

//
function supportCrossOriginScript(req, res, next) {
	res.status(200);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	// res.header("Access-Control-Allow-Headers", "Origin");
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,
	// Content-Type, Accept");
	// res.header("Access-Control-Allow-Methods","POST, OPTIONS");
	res.header("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, DELETE, PUT, HEAD");
	// res.header("Access-Control-Max-Age","1728000");
	next();
}

app.post('/addUserAsync/', supportCrossOriginScript, function(req, res, next) {
	userServcice.addUserAsync(req, res, next, _db);
});

app.post('/modifyUserAsync/', supportCrossOriginScript,
		function(req, res, next) {
			userServcice.modifyUserAsync(req, res, next, _db);

		});

app.post('/deleteUserAsync/', supportCrossOriginScript,
		function(req, res, next) {
			crudServcice.deleteDocumentAsync(req, res, next, _db, "UserAuth", {
				"email" : req.body.email
			});

		});

app.post('/findOneUserAsync/', supportCrossOriginScript, function(req, res,
		next) {
	crudServcice
			.findOneDocumentAsync(req, res, next, _db, "UserAuth", req.body);

});

app.post('/loginAsync/', supportCrossOriginScript, function(req, res, next) {
	var query;
	var username = req.body.username;
	var email = req.body.email;
	var password = securityUtils.md5(req.body.password);
	if (username !== null) {
		query = {
			"username" : username,
			"password" : password
		};
	}
	if (email !== null) {
		query = {
			"email" : email,
			"password" : password
		};
	}
	crudServcice.findOneDocumentAsync(req, res, next, _db, "UserAuth", query);
});

app.get('/verifyEmail/:id', function(req, res,next) {
//	var objId = new ObjectID(req.params.id.toString());
//	console.log(ObjectID(req.params.id.toString()));
//	console.log(ObjectID.createFromHexString(req.params.id.toString()));
	userServcice.verifyUser(req, res, next, _db, "UserAuth", {"_id":new ObjectID(req.params.id)});
	
});

app.post('/config/', supportCrossOriginScript, function(req, res,
		next) {
	configServcice.initRef(req, res, next, _db,'France');

});

app.post('/resetPassword/', supportCrossOriginScript, function(req, res,
		next) {
	userServcice.resetPassword(req, res, next, _db);

});

function errorHandler(err, req, res, next) {
	console.log(' handle error: ' + err);
	var code = err.code;
	var message = err.message;
	res.writeHead(code, message, {
		'content-type' : 'text/plain'
	});
	res.end(message);
}
