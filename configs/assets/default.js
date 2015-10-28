'use strict';

var appPath = process.cwd();
var modulesPath = appPath + '/app'; 

module.exports = {
	app : {
		path : modulesPath,
		modules : modulesPath + '/**/{server,public}'
	},
    server : {
        models : '/**/server/**/models/*.js',
        configs : '/**/server/**/configs/*.js',
        routes :  '/**/server/**/routes/*.js'
    },
    client : {
    	publics : '/**/public',
    	localsAssets : '/**/public/**/*.{css,js}'
    }
};