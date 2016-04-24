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
	'familyNetworkAppc',
	'familyNetworkApp.services',
      'pascalprecht.translate'
    
   
    
     
	
    
  ]).config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
       
    }
]);

app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    TITLE: 'Welcome',
    Entert : 'Entertainment',
    weather: 'Weather in Tunis, Tunisia',
    curr: 'current',
    tod: 'To Do List',
    foot: 'Football',
    plz: 'Please Enter Your Information',
    enr: 'I want to register',
    lg: 'Login',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_DE: 'german'
  });
  $translateProvider.translations('de', {
    TITLE: 'Wilkommen',
    Entert : 'Unterhaltung',
    weather: 'Wetter in Tunis, Tunesien',
    curr: 'Strom',
    tod: 'Aufgabenliste',
    foot: 'Fußball',
    plz: 'Bitte geben Sie Ihre Informationen',
    enr: 'Ich möchte mich registrieren',
    lg: 'Anmeldung',
    BUTTON_LANG_EN: 'englisch',
    BUTTON_LANG_DE: 'deutsch'
  });
    $translateProvider.translations('fr', {
    TITLE: 'Bienvenue',
    Entert : 'Divertissement',
    weather: 'Météo à Tunis, Tunisie',
    curr: 'Maintenant',
    tod: 'liste de choses à faire',
    foot: 'Foot',
    plz: 'Sil vous plaît Entrez vos informations',
    enr: 'Je veux menregistrer',
    lg: 'Se connecter',
    BUTTON_LANG_EN: 'Anglais',
    BUTTON_LANG_DE: 'Allemand'
  });
  $translateProvider.preferredLanguage('de');
});
  


  
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
       controller:'loginController'
        
      })
    .when('/404', {
        templateUrl: 'views/test.html',
        
        
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
         
        
      }).when('/chat', {
        controller: 'chatCtrl',
         templateUrl: 'views/chat.html'
         
        
      })
    
    .when('/suggestion', {
        templateUrl: 'views/suggestion.html',
        
        
      })
    .when('/calendar', {
        templateUrl: 'views/calendar.html',
        controller:'calendarController',
        
        
        
      })
     .when('/mapLocalisation', {
        templateUrl: 'views/mapLocalisation.html',
        controller: 'localisationController'
        
      })
    .when('/mapTrace', {
        templateUrl: 'views/mapTrace.html',
        controller: 'mapTraceController'
        
        
      })
    .when('/reminder', {
        templateUrl: 'views/reminder.html',
        controller: 'remainController'
        
        
      })
     .when('/needs', {
        templateUrl: 'views/needs.html',
        controller: 'needsController'
        
        
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
    
	
    .when('/register', {
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
    .when('/news', {
        templateUrl: 'views/news.html',
        controller:'newsListController'
        
      })
    
    .when('/logout', {
        templateUrl: 'views/logout.html',
        controller:'logoutController'
        
      })
    .when('/all', {
        templateUrl: 'views/family.html',
        controller:'familyListController'
        
      })
	  .when('/twitts', {
        templateUrl: 'views/twitter.html',
        controller:'TwitterController'
        
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
