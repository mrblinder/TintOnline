var appName = 'mean';
<<<<<<< HEAD
var app = angular.module(appName, ['ngResource', 'ngRoute', 'example', 'users', 'todos', 'datapoints']);
=======
var app = angular.module(appName, ['ngResource', 'ngRoute', 'example', 'users', 'datapoints']);
>>>>>>> b5808900d1c782291c54f03bd7f4ab32f78c4f85

app.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
	angular.bootstrap(document, [appName]);
});

//var app = angular.module('mean', ['example', 'ngRoute']);
