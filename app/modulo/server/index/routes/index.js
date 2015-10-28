'use strict';

module.exports = function(app, io, db){

	app.get('/', function(req, res){
		res.render('index/views/index');
	});
};