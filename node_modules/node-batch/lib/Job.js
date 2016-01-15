/**
 * Module dependencies.
 */

var fs = require('fs')
,	util = require('util')
,	inherits = util.inherits
,	EventEmitter = require('events').EventEmitter;


/**
 * Expose `Job()`.
 */

exports = module.exports = {};
exports.Job = Job;

/**
 * Create a Job Object
 *
 * @param {Object} options
 * @param {Object} [options.input] - Input type and source.
 * @param {String} [options.input.type] - One of the node-batch ResourceTypes (Ex: 'Mongo').
 * @param {String} [options.input.uri] - Default location of input resource (Ex: 'localhost/test' for Mongo).
 * @param {Object} [options.output] - Output type and source.
 * @param {String} [options.output.type] - One of the node-batch ResourceTypes (Ex: 'Mongo').
 * @param {String} [options.input.uri] - Default location of resource (Ex: 'localhost/test' for Mongo).
 *
 * @return {Job}
 * @api public
 */
 

function Job(options) {
	var self = this;
	this.options = options || {};

	//Configure Input/Output
	if(!options || !options.input || !options.input.type || !options.input.uri){
		throw new Error("Input not specified properly");
	}

	if(!options || !options.output || !options.output.type || !options.output.uri){
		throw new Error("Output not specified properly");
	}
}

inherits(Job, EventEmitter);