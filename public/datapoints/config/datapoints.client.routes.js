angular.module('datapoints').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/datapoints', {
			templateUrl: 'datapoints/views/list-datapoints.client.view.html'
		}).
		//test page for per-user visualization:
		when('/vis/:userId', {
			templateUrl: 'datapoints/views/graph-datapoints.client.view.html'
		}).
		when('/datapoints/create', {
			templateUrl: 'datapoints/views/create-datapoint.client.view.html'
		}).
		when('/datapoints/:datapointId', {
			templateUrl: 'datapoints/views/view-datapoint.client.view.html'
		}).
		when('/datapoints/:datapointId/edit', {
			templateUrl: 'datapoints/views/edit-datapoint.client.view.html'
		}).
		when('/users', {
			templateUrl: 'datapoints/views/viewall-datapoints.client.view.html'
		});
	}
]);
