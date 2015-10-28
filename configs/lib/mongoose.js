'use strict';

var mongoose = require('mongoose');
var chalk = require('chalk');

module.exports.connect = function connect(config, callback){
	
	var conn = mongoose.connection;

	var db = mongoose.connect(config.db.uri, config.db.options, function(err){
		// Log Error
	    if (err) {
	      console.error(chalk.red('Could not connect to MongoDB!'));
	      console.log(err);
	    } else {

	      // Enabling mongoose debug mode if required
	      mongoose.set('debug', config.db.debug);

	      // Call callback FN
	      if (callback) callback(db);
	    }
	});
};