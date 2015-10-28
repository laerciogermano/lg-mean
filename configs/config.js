'use strict';

var _ = require('lodash');
var globby = require('globby');
var chalk = require('chalk');
var path = require('path');

var validateEnvironmentVariable = function () {
  var environmentFiles = globby.sync('./configs/env/' + process.env.NODE_ENV + '.js');
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
    } else {
      console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }
  // Reset console color
  console.log(chalk.white(''));
};

function mergePaths(string, array){
  var _array = [];
  array.forEach(function(element, pos){
    _array.push(string + element);
  });
  return _array;
};

var initGlobalConfigFiles = function (config, assets) {
  // Appending files
  config.modules = {};

  // Setting Globbed server models files
  config.models = globby.sync(path.join(assets.app.path, assets.server.models));

  //  Setting Globbed model files
  globby.sync(assets.app.modules).forEach(function(modulePath){

      // Refatoring modulePath
      modulePath = path.resolve(modulePath, '../');

      // Get module name
      var moduleName = path.relative(assets.app.path, modulePath);

      // Initalize module
      module = config.modules[moduleName] = {
        server : {},
        client : {}
      };

      // Setting Globbed path
      module.path = modulePath;
      // Setting Globbed name
      module.name = moduleName;
      // Setting Globbed server configs files
      module.server.configs = globby.sync(path.join(modulePath, assets.server.configs));
      // Setting Globbed server route files
      module.server.routes = globby.sync(path.join(modulePath, assets.server.routes));
      // Setting Globbed client publics files
      module.client.publics = globby.sync(path.join(modulePath, assets.client.publics));
      // Setting Globbed client locals assets files
      module.client.localsAssets = globby.sync(path.join(modulePath, assets.client.localsAssets));

  });

  return config;
};

function initGlobalConfig(){
	// Validate NDOE_ENV existance
  validateEnvironmentVariable();

  // Get the default assets
  var defaultAssets = require(path.join(process.cwd(), 'configs/assets/default'));

  // Get the current assets
  var environmentAssets = require(path.join(process.cwd(), 'configs/assets/', process.env.NODE_ENV)) || {};

  // Merge assets
  var assets = _.merge(defaultAssets, environmentAssets);

  // Get the default config
  var defaultConfig = require(path.join(process.cwd(), 'configs/env/default'));

  // Get the current config
  var environmentConfig = require(path.join(process.cwd(), 'configs/env/', process.env.NODE_ENV)) || {};

  // Merge config files
  var envConf = _.merge(defaultConfig, environmentConfig);

  // Initialize server modules config
  initGlobalConfigFiles(envConf, assets);

  return envConf;

};

module.exports = initGlobalConfig();