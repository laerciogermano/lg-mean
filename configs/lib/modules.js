'use strict';

var express = require('express');
var path = require('path');

function initModulesServerModels(paths){
   paths.forEach(function(path){
        require(path)();
   });
};

function initModulesServerRoutes(files, moduleApp, io, globalApp){
    files.forEach(function(file){
        require(file)(moduleApp, io, globalApp);
    });
};

function initModulesServerViews(modulePath, moduleApp){
     moduleApp.set('views', path.join(modulePath, '/server'));
};

function initModulesServerConfigs(files, moduleApp, io){
    files.forEach(function(file){
        require(file)(moduleApp, io);
    });
};

function initModulesClientPublics(module, moduleApp){
    module.client.publics.forEach(function(file){
        moduleApp.use('/' + module.name + '/public', express.static(file));
    });
};

function initModulesLocalsAssets(module, moduleApp){
    moduleApp.locals.js = [];
    moduleApp.locals.css = [];
    module.client.localsAssets.forEach(function(file){
        var route = path.join('/', module.name, path.relative(module.path, file));
        var ext = path.extname(file).substring(1);
        moduleApp.locals[ext].push(route); 
    });
};


module.exports.init = function init(app, io, config){

    //initialize all server models
    initModulesServerModels(config.models);

    // Each modules
    Object.keys(config.modules).forEach(function(moduleName){
        
        var module = config.modules[moduleName];
        // Create a new instance express
        var moduleApp = new express();
        
        // initialize all server configs
        initModulesServerConfigs(module.server.configs, moduleApp, io);
        // initialize all server routes
        initModulesServerRoutes(module.server.routes, moduleApp, io, app);
        // set all module views
        initModulesServerViews(module.path, moduleApp);
        // set public all client routes
        initModulesClientPublics(module, moduleApp);
        // initialize all locals assets
        initModulesLocalsAssets(module, moduleApp);
        // import moduleApp to global app
        app.use(moduleApp);

    });

    return app;
};