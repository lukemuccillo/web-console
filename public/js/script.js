

var app = angular.module("myApp", []);


app.filter('byText', function() {

	return function(logs, text) {

		var out = [];

		if (text == "" || text == null || angular.isUndefined(text)) {
			return logs;
		}

		for (var i = 0; i < logs.length; i++) {

			if (logs[i].Message.search(text) != -1) {

				out.push(logs[i]);
			} else if(logs[i].Source.search(text) != -1) {

				out.push(logs[i]);
			}
		}

		return out;

	};
})

app.filter('bySource', function() {

	return function(logs, sources) {

		var out = [];

		for (var i = 0; i < logs.length; i++) {


			if (sources.indexOf(logs[i].Source) != -1) {

				out.push(logs[i]);
			}
		}

		return out;
	};
});

app.controller("LogController", function($scope) {

	console.log("Script 1 is running");

	$scope.selectedSources = [];

	$scope.filtersVisible = false;
	
	$scope.getSources = function() {

		var sources = [];

		for (var i = 0; i < $scope.logs.length; i++) {

			if (sources.indexOf($scope.logs[i].Source) == -1) {

				sources.push($scope.logs[i].Source);
			}
		}

		return sources;
	}

	$scope.filter = {}

	$scope.socket = io();
	$scope.logs = [];

	window.me = $scope;

	$scope.predicate = '-Timestamp';

	$scope.socket.on('eventlog', function(log){
		log["Timestamp"] = new Date();

		$scope.logs.push(log);

		// if ($scope.logs.length > 10) {
			// $scope.logs.shift();
		//} 
		
		$scope.$apply();
	});

});

