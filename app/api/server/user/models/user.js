'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelName = 'User';

module.exports = function(app, io, db){

	var newSchema = new Schema({
		username : {
			type : String,
			unique : true,
			required : true
		},
		firstName : String,
		lastName : String
	});

	function createUser(data, callback){
		var Model = mongoose.model(modelName);
		var newModel = new Model(data);
		newModel.save(function(err, data){
			if(err)
				return callback({msg : '** MongoDB err'});

			callback(null, data);
		});
	};

	function getUsers(callback){
		var Model = mongoose.model(modelName);
		Model.find({}, function(err, data){
			if(err)
				return callback({msg : '** MongoDB err'});

			callback(null, data);
		});
	};

	newSchema.methods.createUser = createUser;
	newSchema.methods.getUsers = getUsers;
	mongoose.model(modelName, newSchema);
};