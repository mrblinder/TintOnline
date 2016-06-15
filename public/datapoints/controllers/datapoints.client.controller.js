angular.module('datapoints').controller('DatapointsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Datapoints', 'Vis',
	function($scope, $routeParams, $location, Authentication, Datapoints, Vis) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var datapoint = new Datapoints({
					val: this.val,
					coords: [this.x_coord, this.y_coord],
					comment: this.comment
			});

			//
			// // coords: {this.x_coord, this.y_coord},
			// coords.x_coord: this.x_coord,
			// coords.y_coord: this.y_coord,

			datapoint.$save(function(response) {
				$location.path('datapoints/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			 $scope.datapoints = Datapoints.query();
			};

		$scope.findOne = function() {
			$scope.datapoint = Datapoints.get({
				datapointId: $routeParams.datapointId
			});
		};

		$scope.findByUser = function() {
				$scope.datapoints = Vis.query({userId: $scope.authentication.user._id});
		};

		$scope.update = function() {
			$scope.datapoint.$update(function() {
				$location.path('datapoints/' + $scope.datapoint._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(datapoint) {
			if (datapoint) {
				datapoint.$remove(function() {
					for (var i in $scope.datapoints) {
						if ($scope.datapoints[i] === datapoint) {
							$scope.datapoints.splice(i, 1);
						}
					}
				});
			} else {
				$scope.datapoint.$remove(function() {
					$location.path('datapoints');
				});
			}
		};
	}
]);
