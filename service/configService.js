//This file is user to populate reference collections like countries and languages, station list ...
var _this = this;
module.exports.resetRef(req, res, next, _db){
	
	
	return res.status(200).json({"status":1,"msg":"Reference data updated"});
}