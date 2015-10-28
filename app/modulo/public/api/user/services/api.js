'use strict';

angular.module('app.api-user').factory('UserApi', ['$rootScope','$http', function ($rootScope, $http) {
    
    var exports = {};  

    function getUsers(callback){
        $http.get('/api/user')
        .success(function(data, status, headers, config){
          callback(false, data);
        })
        .error(function(data, status, headers, config){
          callback(true);
        });
    }

    function createUser(data, callback){
        $http.post('/api/user', data)
        .success(function(data, status, headers, config){
          callback(false, data);
        })
        .error(function(data, status, headers, config){
          callback(true);
        });
    } 

    exports.getUsers = getUsers;
    exports.createUser = createUser;
    return exports; 
  
}]);