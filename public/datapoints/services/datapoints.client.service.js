angular.module('datapoints').factory('Datapoints', ['$resource',
	function($resource) {
		return $resource('api/datapoints/:datapointId', {
			datapointId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('datapoints').factory('Vis', ['$resource',
	function($resource) {
		return $resource('api/vis/:userId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
