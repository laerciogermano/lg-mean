'use strict';

//Setting up route
angular.module('app.users').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
  
    $stateProvider
    .state('core.users', {
      url: 'users',
      controller : 'UserController', 
      templateUrl : '/modulo/public/pages/user/views/index.html'
    });
    

}]);
