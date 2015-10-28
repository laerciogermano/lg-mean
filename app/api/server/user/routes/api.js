'use strict';

var UserController = require('../controllers/user');

module.exports = function(app, io, db, config){
	var userController = new UserController(app, io);

	app.route('/api/user')
	.get(userController.getUsers)
	.post(userController.createUser);
};