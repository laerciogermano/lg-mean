'use strict';

/**
 * Module dependencies.
 */

var socketIo = require('socket.io');
var express = require('express');
var http = require('http');

// Instances
var app = express();
var server = http.Server(app);
var io = socketIo.listen(server);

// Configs
var bootstrap = require('./configs/lib/app');
var config = require('./configs/config');

//Start
bootstrap.start(app, io, config, function(){
	server.listen(config.port, config.hostname, function() {
		console.log('Server is running. Host: ' + config.hostname + ' and Port: ' + config.port + '.');
	});
});
