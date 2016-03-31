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
    
    
    'ngRoute',
	'familyNetworkAppc'
	
    
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        //controller: 'MainCtrl',
        
      })
    .when('/404', {
        templateUrl: 'views/test.html',
        
        
      })
    .when('/login', {
        templateUrl: 'login.html',
        
        
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
     .when('/mapLocalisation', {
        templateUrl: 'views/mapLocalisation.html',
        
        
      })
    .when('/mapTrace', {
        templateUrl: 'views/mapTrace.html',
        
        
      })
    .when('/mapNbr', {
        templateUrl: 'views/mapNbr.html',
        
        
      })
    .when('/counter', {
        templateUrl: 'views/counter.html',
        
        
      })
    .when('/galery', {
        templateUrl: 'views/galery.html',
        
        
      })
	  .when('/comparator', {
        templateUrl: 'views/comparator.html',
        controller: 'comparatorController'
        
        
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
        controller: 'scheduleListController'
        
      })
    .when('/actu', {
        templateUrl: 'views/actu.html',
        
        
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
