'use strict';

var appPath = process.cwd();

var path = require('path');
var fs = require('fs');

var globby = require('globby');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swig = require('swig');
var cors = require('cors');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');


function initMiddleware(app){

    app.use(cors());

    app.use(morgan('dev'));

    app.use(bodyParser.json({
        limit: '50mb',
        parameterLimit: 5000
    }));

    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: 5000
    }));

};

function initViewEngine(app){

    // set .html as the default extension
    app.set('view engine', 'html');
    app.engine('html', swig.renderFile);

    // Swig will cache templates for you, but you can disable
    // that and use Express's caching instead, if you like:
    app.set('view cache', false);
    // To disable Swig's cache, do the following:
    swig.setDefaults({
        cache: false
    });

};

function initSession(app, db, config){
    app.use(session({
        secret: config.sessionSecret,
        store: new mongoStore({
            mongooseConnection: db.connection,
            collection: config.sessionCollection
        }),
        cookie: config.sessionCookie,
        name: config.sessionName,
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());

};

function initStatics(app){
    app.use('/', express.static(appPath + '/statics'));
};


module.exports.init = function init(app, db, config){

    // Initialize all middlewares
    initMiddleware(app);
    // Initialize view engine
    initViewEngine(app);
    // Initialize session configuration
    initSession(app, db, config);
    // Initialize statics folders
    initStatics(app);

    return app;
};