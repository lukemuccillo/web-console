

var app = angular.module("myApp", []);

app.controller("LogController", function($scope) {

	$scope.socket = io();
	$scope.logs = [];

	window.me = $scope;

	$scope.predicate = '-Timestamp';

	$scope.socket.on('eventlog', function(log){
		log["Timestamp"] = new Date();

		$scope.logs.push(log);

		if ($scope.logs.length > 10) {
			$scope.logs.shift();
		} 
		
		$scope.$apply();
	});

});



