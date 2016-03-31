'use strict';

var app = angular.module('myapp', ['ngRoute'], function($compileProvider){


$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|http|file|callto):/);

});




app.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, ASSETS){

	$urlRouterProvider.otherwise('/html/index.html');

});