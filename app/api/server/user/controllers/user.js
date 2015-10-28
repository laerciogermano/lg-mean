'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserMethods = new User();

module.exports = function(app, io, db, config){
	var exports = {};

	function createUser(req, res){
		var params = req.body;
		UserMethods.createUser(params, function(err, users){
			if(err)
				res.status(400).json(err);

			res.json(users);
		});
	}

	function getUsers(req, res){
		UserMethods.getUsers(function(err, users){
			if(err)
				res.status(400).json(err);

			res.json(users);
		});
	};

	exports.getUsers = getUsers;
	exports.createUser = createUser;
	return exports;
};