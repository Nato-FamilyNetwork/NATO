'use strict';

/**
 * @ngdoc overview
 * @name familyNetworkApp
 * @description
 * # familyNetworkApp
 *
 * Main module of the application.
 */

  var app = angular.module('familyNetworkApp', [
    
    
    'ngRoute'
    
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        
      })
    .when('/404', {
        templateUrl: 'views/test.html',
        
        
      })
    .when('/login', {
        templateUrl: 'views/login.html',
        
        
      })
    .when('/todo', {
        templateUrl: 'views/todo.html'
        
        
      })
    .when('/suggestion', {
        templateUrl: 'views/suggestion.html',
        
        
      })
    .when('/calendar', {
        templateUrl: 'views/calendar.html',
        
        
      })
    .when('/galery', {
        templateUrl: 'views/galery.html',
        
        
      })
	  .when('/comparator', {
        templateUrl: 'views/comparator.html',
        
        
      })
	  // new
    .when('/radio', {
        templateUrl: 'views/radio.html',
        
        
      })
    .when('/tv', {
        templateUrl: 'views/tv.html',
        
        
      })
    // end new
    .when('/programs', {
        templateUrl: 'views/programs.html',
        
        
      })
    .when('/actu', {
        templateUrl: 'views/actu.html',
        
        
      })
      .otherwise({
        redirectTo: '/404'
      });
  });
