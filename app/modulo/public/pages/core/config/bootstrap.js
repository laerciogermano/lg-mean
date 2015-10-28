'use strict';

angular.element(document).ready(function() {
	//, 'mean.auth', 
	angular.bootstrap(document, ['app', 'app.core', 'app.users', 'app.api-user']);
});


// Default modules
var modules = ['ngResource','ui.router'];
// Combined modules
angular.module('app', modules);
