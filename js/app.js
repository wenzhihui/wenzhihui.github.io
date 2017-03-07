(function (angular) {
    "use strict";

    // start your ride
	var moviecatApp=angular.module("moviecatApp",["ngRoute","pgzcApp",]);
	//$routeProvider 是门卫
	moviecatApp.config(["$routeProvider",function($routeProvider){
		$routeProvider.when('/pgzc',{
			templateUrl:'pgzc/view.html',
			controller:'pgzcController'
		}).otherwise({
			redirectTo:"/pgzc"
		})
	}])
	

})(angular);