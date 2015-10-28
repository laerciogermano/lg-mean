'use strict';

var mongoose = require('./mongoose');
var express = require('./express');
var socketIo = require('./socket.io');
var modules = require('./modules');


// initialize all app
module.exports.start = function start(app, io, config, callback){
	
	// Connect mongo db
	mongoose.connect(config, function(db){
		// Configure SockerIo
		socketIo.init(io, db, config);
		// Configure express
		express.init(app, db, config);
		// Initialize app modules
		modules.init(app, io, config);
		// end
		if(callback) callback();
	});

};