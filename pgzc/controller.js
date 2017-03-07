var pgzcApp=angular.module('pgzcApp',[]);
pgzcApp.controller('pgzcController',['$scope','$http',function($scope,$http){
	$http({
		url:'pgzc.json'
	}).then(function(d){
		$scope.data=d.data;
		console.log($scope.data);
	});
}]);