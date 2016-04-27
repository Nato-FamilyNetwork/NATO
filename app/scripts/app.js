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
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);
       
    }
]);



app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    TITLE: 'Welcome',
    a : 'to',
    Entert : 'Entertainment',
    weather: 'Weather in Tunis, Tunisia',
    curr: 'Currently',
    tod: 'To Do List',
    foot: 'Football',
    plz: 'Please Enter Your Information',
    enr: 'I want to register',
    lg: 'Login',
    pricec: 'Price Comparator',
    mp: 'My Map',
    dist: 'Distance Traveled',
    cl: 'My Calendar',
    rp: 'My Reminder',
    myf: 'Add members to my family',
    tt: 'ToDo List',
    mtd: 'Move to doing',
    mtdd: 'Move to done',
    clr: 'Clear',
    td: 'To Do',
    doi: 'Doing',
    don: 'Done',
    conv: 'Conversation',
    togg: 'Radio Stations',
    tach: 'Add a task',
    desc: 'Description',
    ttl: 'Title',
    dat: 'Date',
      pseud : 'username',
      pw: 'password',
      cldesc: 'with draggable and editable events',
      auj: 'Today',
      mth: 'Month',
      wk: 'Week',
      dy: 'Day',
      dragg: 'Draggable events',
      evt: 'My Event',
      rad: 'Remove after drop',
      myp: 'My Profile',
      newt: 'Tunisia news from L\'Economiste',
      neww: 'World news from L\'Economiste',
      newe: 'Events in Tunisia from L\'Economiste',
      newp: 'Political news from L\'Economiste',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_DE: 'german'
  });
  $translateProvider.translations('de', {
    TITLE: 'Wilkommen',
    a : 'zum',
    Entert : 'Unterhaltung',
    weather: 'Wetter in Tunis, Tunesien',
    curr: 'Strom',
    tod: 'Aufgabenliste',
    foot: 'Fußball',
    plz: 'Bitte geben Sie Ihre Informationen',
    enr: 'Ich möchte mich registrieren',
    lg: 'Anmeldung',
    pricec: 'Preisvergleicher',
    mp: 'Meine Karte',
    dist: 'Strecke zurückgelegt',
    cl: 'Meine Kalender',
    rp: 'Mahnung',
    myf: 'Mitglieder hinzufügen um meine Familie',
    tt: 'Aufgabenliste',
    mtd: 'bewegen zu tun',
    mtdd: 'bewegen getan',
    clr: 'klar',
    td: 'werde Tun',
    doi: 'Tun',
    don: 'Erledigt',
    conv: 'Konversation',
    togg: 'Radio Stationen',
    tach: 'fügen Sie eine neue Aufgabe',
    desc: 'Beschreibung',
    ttl: 'Titel',
    dat: 'Datum',
      pseud: 'Benutzername',
      pw: 'Passwort',
      cldesc: 'mit ziehbar und bearbeitbare Ereignisse',
      auj: 'Heute',
      mth: 'Monat',
      wk: 'Woche',
      dy: 'Tag',
      dragg: 'Ziehbar Veranstaltungen',
      evt: 'Meine Veranstaltung',
      rad: 'Entfernen, nachdem Tropfen',
      myp: 'Mein Profil',
      newt: 'Tunesien Nachrichten von L\'Economiste',
      neww: 'Weltnachrichten L\'Economiste',
      newe: 'Veranstaltungen in Tunesien von L\'Economiste',
      newp: 'Politische Nachrichten in Tunesien L\'Economiste',
    BUTTON_LANG_EN: 'englisch',
    BUTTON_LANG_DE: 'deutsch'
  });
    $translateProvider.translations('fr', {
    TITLE: 'Bienvenue',
    a : 'à',
    Entert : 'Divertissement',
    weather: 'Météo à Tunis, Tunisie',
    curr: 'Maintenant',
    tod: 'Liste de choses à faire',
    foot: 'Foot',
    plz: 'S\'il vous plaît Entrez vos informations',
    enr: 'Je veux menregistrer',
    lg: 'Se connecter',
    pricec: 'Comparateur de prix',
    mp: 'Ma carte',
    dist: 'Distance voyagé',
    cl: 'Mon Calendrier',
    rp: 'Mon Rappel',
    myf: 'Ajouter des membres à ma famille',
    tt: 'Liste des choses à faire',
    mtd: 'En train de faire',
    mtdd: 'fait',
    clr: 'Supprimer',
    td: 'A faire',
    doi: 'En train de faire',
    don: 'Fait',
    conv: 'Conversation',
    togg: 'Stations Radio',
    tach: 'Ajouter une tache',
    desc: 'Description',
    ttl: 'Titre',
    dat: 'Date',
    pseud: 'nom d\'utilisateur',
    pw: 'mot de passe',
    cldesc: 'avec des événements déplaçables et modifiables',
    auj: 'Aujourd\'hui',
        mth: 'Mois',
      wk: 'Semaine',
      dy: 'Jour',
        dragg: 'Evénements déplaçables',
        evt: 'Mon Evénement',
        rad: 'Retirer après dépôt',
        myp: 'Mon Profil',
        newt: 'Actu de la Tunisie de L\'Economiste',
      neww: 'Actu monde de L\'Economiste',
      newe: 'Evenements en Tunisie de L\'Economiste',
      newp: 'Politique en Tunisie de L\'Economiste',
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
        controller: 'TwitterController'
        
        
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
    .when('/league/team/:param2/:param3/:param4/:param5', {
        templateUrl: 'views/team.html',
        controller: 'teamController'
        
        
      })
    .when('/league/team/:test/:param', {
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
    .when('/me', {
        templateUrl: 'views/me.html'
        
        
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
