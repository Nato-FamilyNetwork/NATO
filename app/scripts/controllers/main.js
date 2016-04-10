'use strict';

/**
 * @ngdoc function
 * @name familyNetworkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyNetworkApp
 */
angular.module('familyNetworkAppc', ["ngResource","todo.fac"])
  .controller('scheduleListController',function($scope, $resource){
    
	
	
	
	var allfbs=$resource('http://127.0.0.1:3000/schedule');
    //getAll
	
    $scope.fbs=allfbs.query();
	
    console.log($scope.fbs);
      

}) .controller('TodoCtrl', function($scope, $resource) {
    
    var todoget =  $resource('http://127.0.0.1:3000/todo');
    $scope.todos = todoget.query();
        
        
  

})
.controller('TwitterController', function($scope, $q, twitterService) {

    $scope.tweets; //tableau twitts
    
    twitterService.initialize();

    //refresh function
    $scope.refreshTimeline = function() {
        twitterService.getLatestTweets().then(function(data) {
            $scope.tweets = data;
        });
    }

    //popup + css
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut').fadeIn();
                    $scope.refreshTimeline();
                });
            }
        });
    }

    //fassa5 oauth session
    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
        $('#getTimelineButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
        });
    }

    //déja connecté
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
        $scope.refreshTimeline();
    }

})
.controller('facebookListController',function($scope, $resource){
    
	
	
	
	var allfbs=$resource('http://127.0.0.1:3000/final/fbs');
    //getAll
	
    $scope.fbs=allfbs.get();
	
    console.log($scope.fbs);
      
})
.controller('newsListController',function($scope, $resource){
    
	
	
	
	var allfbs=$resource('http://127.0.0.1:3000/news/tounsya');
    //getAll
	
    $scope.medianews=allfbs.query();
	
    console.log($scope.medianews);
    
    
    
    var allchourouk=$resource('http://127.0.0.1:3000/news/chourouk');
    //getAll
	
    $scope.chourouk=allchourouk.query();
	
    console.log($scope.chourouk);
    
    
    
      
})



  .controller('registerController',function($scope, $http){
    
	
	
	// post
    $scope.add = function(ad,a){
	$http.post('http://127.0.0.1:3000/register',$scope.formData).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    }
})
 .controller('loginController',function($rootScope, $scope, $http){
    
	
	
	// post
    $scope.login = function(){
	$http.post('http://127.0.0.1:3000/login',$scope.user).
        success(function(data) {
            console.log("connected successfully");
        $rootScope.currentuser = data;
        console.log($rootScope.currentuser._id);
        console.log($scope.user);
    }).error(function(data) {
            console.error("error in connecting");
        })
    }
    
    
    
   
    
    
    
})


.controller('familyListController',function($rootScope,$resource, $scope, $http, $routeParams){
    
    var allfbs=$resource('http://127.0.0.1:3000/login/all');
    //getAll
	
    $scope.fbs=allfbs.query();
	
    console.log($scope.fbs);
    
    
    $scope.addF = function(idd) {
         var hj=$resource('http://127.0.0.1:3000/login/add/:id/:fid', {}, {
      query: {method:'PUT', params:{id:idd,fid:$rootScope.currentuser.familyid}, isArray:false}});
	  hj.query();
    
    }
    
    
})



.factory('weatherService', function($http) {
    return { 
      getWeather: function() {
        var weather = { temp: {}, clouds: null };
        $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=Tunis,at&units=metric&callback=JSON_CALLBACK&APPID=f9dbd911bc01df1d9ce563b2ba4d3209').success(function(data) {
            if (data) {
                if (data.main) {
                    weather.temp.current = data.main.temp;
                    weather.temp.min = data.main.temp_min;
                    weather.temp.max = data.main.temp_max;
                }
                weather.clouds = data.clouds ? data.clouds.all : undefined;
            }
        });

        return weather;
      }
    }; 
})

.filter('temp', function($filter) {
    return function(input, precision) {
        if (!precision) {
            precision = 1;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0C';
    };
})

.controller('WeatherCtrl', function ($scope, weatherService) {
    $scope.weather = weatherService.getWeather();
})

.directive('weatherIcon', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@'
        },
        controller: function($scope) {
            $scope.imgurl = function() {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.cloudiness < 20) {
                    return baseUrl + 'sunny.png';
                } else if ($scope.cloudiness < 90) {
                   return baseUrl + 'partly_cloudy.png';
                } else {
                    return baseUrl + 'cloudy.png';
                }
            };
        },
        template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
    };
})



























.controller('logoutController',function($rootScope,$http, $scope, $resource){
    
	
	
	$scope.logout = function(){
	$http.get('http://127.0.0.1:3000/login/logout').
        success(function(data) {
            console.log("loggingout");
        $rootScope.currentuser=undefined;
        }).error(function(data) {
            console.error("error");
        })
    }
   

})






      .controller('comparatorController',function($scope, $resource){
    
	
	
	
	var allfbs=$resource('http://127.0.0.1:3000/pcs');
    //getAll
	
    $scope.pcs=allfbs.query();
	 




}).controller('imprimantesController',function($scope, $resource){
    
	
	
	
	var allfbs=$resource('http://127.0.0.1:3000/imprimantes');
    //getAll
	
    $scope.imprimantes=allfbs.query();
	 
      
})





 .controller('tabletteController',function($scope, $resource){
    
	
	
	
	var allfbs=$resource('http://127.0.0.1:3000/tablettes');
    //getAll
	
    $scope.tablettes=allfbs.query();
	 
      
}).controller('refrecheCtrl', function($location) {
    
        $location.path( "/todo" );
    
}).controller('userTodo', function($rootScope,$scope, $resource, $location) {
    console.log("salut"+$rootScope.currentuser._id);
     $scope.add = function(t,ds,da){


	 	var AddTodo = $resource('http://127.0.0.1:3000/todo');
        var todo = new AddTodo;
	 	 todo.titre = t;
         todo.description=ds;
         todo.date=da;
         todo.userFK=$rootScope.currentuser._id;
         todo.status="1";
        
	 	
	 	
	 	todo.$save();
      
         
       console.log("haha2Added");
        $location.path( "/refreche" );
	 }
        

    var done =  $resource('http://127.0.0.1:3000/todo/'+$rootScope.currentuser._id+'/3');
    var todo =  $resource('http://127.0.0.1:3000/todo/'+$rootScope.currentuser._id+'/1');
    var doing =  $resource('http://127.0.0.1:3000/todo/'+$rootScope.currentuser._id+'/2');
    
    
    
     $scope.done = done.query();
    $scope.todo = todo.query();
    $scope.doing = doing.query();
   
        
         $location.path( "/todo" )
  

})


.controller('mapTraceController',function($scope, $resource){


	var map=$resource('http://127.0.0.1:3000/map/afficher');
    //getAll
	
    $scope.trace=map.query();
   
})
.controller('leagueController',function($scope, $resource){

	var allfbs=$resource('http://127.0.0.1:3000/league');
    //getAll
	
    $scope.league=allfbs.query();
    
    $scope.updateme=function(link)
    {
        console.log(link);
        
    }
	 
      
})
 .controller('teamController',function($scope, $resource,$routeParams){
    
	
	
	//console.log($routeParams.param);
	var allfbs=$resource('http://127.0.0.1:3000/league/'+$routeParams.param);
    //getAll

	
    $scope.team=allfbs.query();
     $scope.hh=$routeParams;
})

.controller('informationController',function($scope, $resource,$routeParams,$rootScope){
    
	
	
	console.log($routeParams.param);
	var allfbs=$resource('http://127.0.0.1:3000/league/'+$routeParams.test+'/'+$routeParams.param);

    //getAll
	
    $scope.information=allfbs.query();
	 
    var hj=$resource('http://127.0.0.1:3000/login/update/:user/:league/:team', {}, {
      query: {method:'PUT', params:{user:$rootScope.currentuser._id,league:$routeParams.test,team:$routeParams.param}, isArray:false}});
	  hj.query();
    
      
})

.controller("updateTodoCtrl",function($scope,$routeParams,$resource,todoFactory,$location){
    
    
 var id = $routeParams.id
  $scope.todo = todoFactory.query({id: id})
   
    console.log("haha1");
    $scope.action = "Update"
   
    
       
    todoFactory.update({id: id}, $scope.todo, function() {
          $scope.todo.status="2";
      $location.path( "/todo" )
       console.log("haha2");
    })
  
	
   
     console.log("haha3");
    
  

    
}).controller("updateTodoneTodoCtrl",function($scope,$routeParams,$resource,tododoneFactory,$location){
    
    
 var id = $routeParams.id
  $scope.todo = tododoneFactory.query({id: id})
   
    console.log("haha1");
    $scope.action = "Update"
   
    
       
    tododoneFactory.update({id: id}, $scope.todo, function() {
         
      $location.path( "/todo" )
       console.log("haha2");
    })
  
	
   
     console.log("haha3");
    
  

    
})
.controller('deleteTodoCtrl', function( $routeParams, Deletetodo,$location) {
   
    Deletetodo.delete({id: $routeParams.id} ,$location.path( "/todo" ));
    
       
    
})
.controller('deleteAllTodoCtrl', function($rootScope,DeletetodoAll,$location) {
      $scope.action = "Update"
   
    DeletetodoAll.delete({id: $rootScope.currentuser._id});
    
        $location.path( "/refreche" );
    
})


.controller('chatCtrl', function($scope,$rootScope) {
       $scope.chatid = $rootScope.currentuser._id;
        $scope.chatusername = $rootScope.currentuser.username;
    
        $scope.date = new Date();


})


;


