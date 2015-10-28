'use strict';

angular.module('app.users').controller('UserController', ['$scope', '$rootScope', '$state', 'UserApi',
	function($scope, $rootScope, $state, UserApi) {

		$scope.users = [];
		$scope.form = {};

		function getUsers(){
			UserApi.getUsers(function(err, users){
				if(err)
					return console.log(err);

				$scope.users = users;
			});
		};

		function createUser(body){
			UserApi.createUser(body, function(err, data){
				if(err)
					return console.log(err);

				// $scope.users.push(body);
				getUsers();
			});
		};

		// exports
		$scope.createUser = createUser;
		
		// boostratp
		getUsers();
	}
]);
