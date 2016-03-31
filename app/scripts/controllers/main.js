'use strict';

/**
 * @ngdoc function
 * @name familyNetworkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyNetworkApp
 */
angular.module('familyNetworkAppc', ["ngResource"])
  .controller('scheduleListController',function($scope, $resource){
    
	
	
	
	var allfbs=$resource('http://127.0.0.1:3000/schedule');
    //getAll
	
    $scope.fbs=allfbs.query();
	
    console.log($scope.fbs);
      
});
