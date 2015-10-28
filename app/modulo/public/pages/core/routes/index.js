'use strict';

//Setting up route
angular.module('app.core').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/users');

    $stateProvider
    .state('core', {
      abstract: true,
      url : '/',
      templateUrl : '/modulo/public/pages/core/views/index.html'
    });
    
  }])
.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
