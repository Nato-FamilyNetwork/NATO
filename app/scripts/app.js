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
      
           templateUrl: 'views/todo.html',
        controller:'userTodo',
        
      })
    .when('/todo/:id', {
         templateUrl: 'views/todo.html',
         controller: 'updateTodoCtrl'
        
      })
    .when('/todo2/:id', {
         templateUrl: 'views/todo.html',
         controller: 'updateTodoneTodoCtrl'
        
      })
     .when('/tododelete/:id', {
         templateUrl: 'views/todo.html',
         controller: 'deleteTodoCtrl'
        
      }).when('/tododeleteall', {
         templateUrl: 'views/todo.html',
         controller: 'deleteAllTodoCtrl'
        
      })
    .when('/refreche', {
        controller: 'refrecheCtrl',
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
        controller: 'mapTraceController'
        
        
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
        .when('/imprimante', {
        templateUrl: 'views/imprimante.html',
        controller: 'imprimantesController'
        
        
      }) 
        .when('/tablette', {
        templateUrl: 'views/tablettes.html',
        controller: 'tabletteController'
        
        
      })
    .when('/league', {
        templateUrl: 'views/league.html',
        controller: 'leagueController'
        
        
      })
    .when('/team/:param', {
        templateUrl: 'views/team.html',
        controller: 'teamController'
        
        
      })
    .when('/:test/:param', {
        templateUrl: 'views/information.html',
        controller: 'informationController'
        
        
      })
    
	  // new
    .when('/radio', {
        templateUrl: 'views/radio.html',
        
        
      })
    .when('/tv', {
        templateUrl: 'views/tv.html',
        controller:'registerController'
        
      })
    // end new
    .when('/programs', {
        templateUrl: 'views/programs.html',
        controller: 'scheduleListController'
        
      })
    .when('/actu', {
        templateUrl: 'views/actu.html',
        controller:'facebookListController'
        
      })
    .when('/slogin', {
        templateUrl: 'views/slogin.html',
        controller:'loginController'
        
      })
    .when('/logout', {
        templateUrl: 'views/logout.html',
        controller:'logoutController'
        
      })
    .when('/all', {
        templateUrl: 'views/family.html',
        controller:'familyListController'
        
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
