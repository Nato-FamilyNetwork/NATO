'use strict';

/**
 * @ngdoc function
 * @name familyNetworkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyNetworkApp
 */
angular.module('familyNetworkAppc', ["ngResource","todo.fac","pcs","imps","tablettes","foods"])

  .controller('scheduleListController',function($rootScope,$localStorage,$scope, $resource){
    
	if($localStorage.loggedin)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
	
	
	var allness=$resource('http://natofamilynetwork.herokuapp.com/schedule/nessma');
    //getAll
	
    $scope.nessma=allness.query();
    
    
    
    var allhann=$resource('http://natofamilynetwork.herokuapp.com/schedule/hannibal');
    //getAll
	
    $scope.hannibal=allhann.query();
    
    
    
    var allwat=$resource('http://natofamilynetwork.herokuapp.com/schedule/wataniya1');
    //getAll
	
    $scope.wat=allwat.query();
    
    
    
    var allwatt=$resource('http://natofamilynetwork.herokuapp.com/schedule/wataniya2');
    //getAll
	
    $scope.watt=allwatt.query();
	
    
      

}) 
    .controller('TodoCtrl', function($rootScope,$localStorage,$scope, $resource) {
    if($localStorage.loggedin)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    var todoget =  $resource('http://natofamilynetwork.herokuapp.com/todo');
    $scope.todos = todoget.query();
        
        
  

})
.controller('TwitterController', function($location,$rootScope,$localStorage,$scope, $q, twitterService) {

    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
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
    
    
    $scope.inst = function() {
    twitterService.connectInstagram();
    twitterService.getMyImg().then(function(data) {
            $scope.instas = data.data;
        console.log(data.data.images);
        });
       
    }
    
    

})
.controller('facebookListController',function($rootScope,$localStorage,$scope, $resource){
    
	if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
	
	
	var allfbs=$resource('http://natofamilynetwork.herokuapp.com/final/fbs');
    //getAll
	
    $scope.fbs=allfbs.get();
	
    console.log($scope.fbs);
      
})
.controller('newsListController',function($rootScope,$localStorage,$scope, $resource){
    
	
	if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
	
	var allfbs=$resource('http://natofamilynetwork.herokuapp.com/news/tounsya');
    //getAll
	
    $scope.medianews=allfbs.query();
	
    console.log($scope.medianews);
    
    
    
    
    
      
})



  .controller('registerController',function($rootScope,$localStorage,$scope, $http, $route, $location){
    
	
    
    
   
    
    $scope.add = function(){
        if($scope.formData.familyid){
    $scope.formData.fid= $scope.formData.familyname+" Family";
            $scope.formData.admin = "True";
            $scope.formData.role = "Father";
            $localStorage.admin=true
            
    }
	$http.post('http://natofamilynetwork.herokuapp.com/register',$scope.formData).
        success(function(data) {
            $localStorage.currentuser=data;
            $rootScope.currentuser=$localStorage.currentuser;
        $localStorage.loggedin=true;
        
       
	if($localStorage.currentuser.familyid && $localStorage.admin)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            $location.path("/all");
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
        
        
        
        }).error(function(data) {
        $scope.error = "An error has occured please try again!";
            console.error("error in posting");
        })
         var title = "date creation";
            var start = new Date();
            var end = null;
            var className = 'label-info';
            var familyFK = $scope.formData.fid;
			$scope.formEvent={title,start,end,className,familyFK };
                    $http.post('http://natofamilynetwork.herokuapp.com/calendar/addEvent',$scope.formEvent).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    }
})
 .controller('loginController',function($resource,$rootScope,$sessionStorage,$localStorage, $scope, $http, $location){
    
	
    
	if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
            $location.path( "/me" );
        }
    
	
    $scope.login = function(){
        
        
	$http.post('http://natofamilynetwork.herokuapp.com/login',$scope.user).
        success(function(data) {
            
        // $sessionStorage.currentuser = data;
        
         $localStorage.currentuser = data;
        $localStorage.loggedin = true;
        $rootScope.currentuser = $localStorage.currentuser;
        
        console.log($localStorage.currentuser.admin);
        
        
        
        var hj=$resource('http://natofamilynetwork.herokuapp.com/login/online/:id/', {}, {
      query: {method:'PUT', params:{id:$localStorage.currentuser._id}, isArray:false}});
	  hj.query();
        
        var onlines=$resource('http://natofamilynetwork.herokuapp.com/login/all/online/');
    
        $rootScope.ons=onlines.query();
        
        if($localStorage.currentuser.familyid){
            $location.path( "/me" );
        }
        
        if($localStorage.loggedin && !$localStorage.currentuser.familyid){
            
            $location.path( "/pending" );
        }
        
    }).error(function(data) {
        $scope.error = "Error in connecting please try again!";
            console.error("error in connecting");
        })
    }
        
    
    
    
   
    
    
    
})








.controller('familyListController',function($location,$localStorage,$rootScope,$resource, $scope, $http, $routeParams, $route){
    
    
    
    
    
    if($localStorage.currentuser.admin=="True")
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
             var allfbs=$resource('http://natofamilynetwork.herokuapp.com/login/all');
    //getAll
	
    $scope.fbs=allfbs.query();
	
    console.log($scope.fbs);
    
    
    $scope.addF = function(idd) {
         
        
      var role = document.getElementById( "aa"+idd );
$scope.aa= role.options[ role.selectedIndex ].value;
        
        console.log($scope.aa);
        
        
        var hj=$resource('http://natofamilynetwork.herokuapp.com/login/add/:id/:fid/:role', {}, {
      query: {method:'PUT', params:{id:idd,fid:$rootScope.currentuser.familyid,role:$scope.aa}, isArray:false}});
	  hj.query();


    $scope.fbs=allfbs.query();
    $route.reload();
    
    }
            
        }
    
    if($localStorage.currentuser.admin!="True")
        {
            
            $location.path("/me");
            
        }
    
    

    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
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
        template: '<div style="float:left"><img width="60" ng-src="{{ imgurl() }}"></div>'
    };
})



























.controller('logoutController',function($rootScope,$http,$localStorage, $scope, $resource, $location){
    
	if($localStorage.loggedin)
        {
            var hj=$resource('http://natofamilynetwork.herokuapp.com/login/offline/:id/', {}, {
      query: {method:'PUT', params:{id:$localStorage.currentuser._id}, isArray:false}});
	  hj.query();
            
           $http.get('http://natofamilynetwork.herokuapp.com/login/logout').
        success(function(data) {
            console.log("loggingout");
        $location.path('/login');
        
       // $rootScope.loggedin=false;
        delete $localStorage.currentuser;
               delete $localStorage.panier;
        $localStorage.loggedin=false;
        $rootScope.currentuser = undefined;
        
        }).error(function(data) {
            console.error("error");
        })
            
        }
    
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
	
	
	
    
   

})


.controller('botsController',function($location,$localStorage,$scope, $http,$resource,$routeParams,$rootScope,$route){
  
if(!$localStorage.loggedin )
        {
            
            $location.path("/");
            
        } 
    
   if($localStorage.currentuser.familyid )
        {
            
            $location.path("/me");
            
        }  
    
    
    var x = new Array();
    $scope.tkalem = function() {
    $http.get('http://localhost/bassem/alice.php?sujet='+$scope.msg).success(function(data)
  {
    $scope.user=$localStorage.currentuser.username;
    x.push(data) ;
        console.log(x);
        $scope.rep = x;
  }
  ).error(function(data){ console.log("erreur");});
}
  
})

.controller('foodsController',function($localStorage,$scope, $http,$resource,$routeParams,$rootScope,$route,foodsListFromFactory){
   	if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        } 
    if(!$localStorage.loggedin )
        {
            
            $location.path("/");
            
        } 
    
    
	
    //getAll
	 
    $scope.foods=foodsListFromFactory;
   // console.log($scope.foods);
	 
    $scope.users=$localStorage.currentuser._id;
    
     $scope.add = function(){
             var title=$scope.food.title;
             var contenue=$scope.food.contenue;
             var mx=$rootScope.currentuser.username;
             var family=$rootScope.currentuser.familyid;
          $scope.food={title,contenue,mx,family};
                 
         
         
	$http.post('http://natofamilynetwork.herokuapp.com/foods/',$scope.food).
        success(function(data) {
           // $rootScope.currentuser=data;
        $scope.foods=allfbs.query();
        
          
        //$location.path( "/login" );
        
        }).error(function(data) {
     
            console.error("error in posting");
        })
    }
     
   $scope.update= function(idd,nom)
    {
        var x=idd;
        var y=$scope.nom;
        var hh=$rootScope.currentuser.username;
          var up=$resource('http://natofamilynetwork.herokuapp.com/foods/:id/:msg/:z', {}, {
      query: {method:'PUT', params:{id:x,msg:y,z:hh}, isArray:false}});
        
                  
	  up.query();
     
       $route.reload(); 
    }
    
    $scope.vote= function(id1,id2,note)
    { 
        console.log(id1,id2,note);
          var up=$resource('http://natofamilynetwork.herokuapp.com/foods/update/:id1/:id2/:note', {}, {
    query: {method:'PUT', params:{id1:id1,id2:id2,note:$localStorage.currentuser.name}, isArray:false}});
                 up.query();
   $route.reload(); 
    }
    
    
   /* var hj=$resource('http://127.0.0.1:3000/login/update/:user/:league/:team', {}, {
      query: {method:'PUT', params:{user:$rootScope.currentuser._id,league:$routeParams.test,team:$routeParams.param}, isArray:false}});
	  hj.query();*/
    
      
})

      .controller('comparatorController',function($rootScope,$localStorage,$scope, $resource,pcListFromFactory){
    
	
	if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
	
	
    //getAll
	
    $scope.pcs=pcListFromFactory;
	 




})

    .controller('imprimantesController',function($rootScope,$localStorage,$scope, $resource,impListFromFactory){
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
	
	
	 //getAll
	
    $scope.imprimantes=impListFromFactory;
	 
      
})





 .controller('tabletteController',function($rootScope,$localStorage,$scope, $resource,tablettesListFromFactory){
    
	if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
	
	 
	
    $scope.tablettes= tablettesListFromFactory;
	 
      
})
    .controller('refrecheCtrl', function($rootScope,$localStorage,$location, $route) {
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
    
    $route.reload(); 
        $location.path( "/todo" );
    
    
})
    .controller('userTodo', function($localStorage,$rootScope,$scope, $resource, $location, $route) {
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
    console.log("salut"+$rootScope.currentuser._id);
    
     
       

    var done =  $resource('http://natofamilynetwork.herokuapp.com/todo/'+$rootScope.currentuser._id+'/3');
    var todo =  $resource('http://natofamilynetwork.herokuapp.com/todo/'+$rootScope.currentuser._id+'/1');
    var doing =  $resource('http://natofamilynetwork.herokuapp.com/todo/'+$rootScope.currentuser._id+'/2');
    
    
    
     $scope.done = done.query();
    $scope.todo = todo.query();
    $scope.doing = doing.query();
   
        $scope.add = function(t,ds,da){
         


	 	var AddTodo = $resource('http://natofamilynetwork.herokuapp.com/todo');
        var todo = new AddTodo;
	 	 todo.titre = t;
         todo.description=ds;
         todo.date=da.toLocaleDateString();
         todo.userFK=$rootScope.currentuser._id;
         todo.status="1";
        
	 	
	 	
	 	todo.$save();
      
         
   
            $route.reload();
         
         
	 }
        
  

})



.controller('leagueController',function($rootScope,$localStorage,$scope, $resource){
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }

	var allfbs=$resource('http://natofamilynetwork.herokuapp.com/league');
    //getAll
	
    $scope.league=allfbs.query();
    
    $scope.updateme=function(link)
    {
        console.log(link);
        
    }
	 
      
})



.controller('needsController',function($rootScope,$localStorage,$scope, $resource){
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }

	var allfbs=$resource('http://natofamilynetwork.herokuapp.com/needs');
    //getAll
	
    $scope.needs=allfbs.query();
    
     var x = new Array();
    $scope.addtocart = function(a,b) {
        
       
        
        x.push({a,b});
        alert(a+" Added!");
        $localStorage.panier=x;
        console.log($localStorage.panier.length);
        
    }
    
   
	 
      
})

.controller('teamController',function($rootScope,$localStorage,$scope, $resource,$routeParams){
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
	
	
	//console.log($routeParams.param);
	var allfbs=$resource('http://natofamilynetwork.herokuapp.com/league/team/'+$routeParams.param2+'/'+$routeParams.param3+'/'+$routeParams.param4+'/'+$routeParams.param5);
    //getAll
	
    $scope.team=allfbs.get();
     $scope.hh=$routeParams;
})
.controller('informationController',function($localStorage,$scope, $resource,$routeParams,$rootScope){
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
	
	
	console.log($routeParams.param);
	var allfbs=$resource('http://natofamilynetwork.herokuapp.com/league/team/'+$routeParams.test+'/'+$routeParams.param);
    //getAll
	
    $scope.information=allfbs.get();
	 
    var hj=$resource('http://natofamilynetwork.herokuapp.com/login/update/:user/:league/:team', {}, {
      query: {method:'PUT', params:{user:$rootScope.currentuser._id,league:$routeParams.test,team:$routeParams.param}, isArray:false}});
	  hj.query();
    
      
})

.controller("updateTodoCtrl",function($rootScope,$localStorage,$scope,$routeParams,$resource,todoFactory,$location){
    
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
 var id = $routeParams.id;
  $scope.todo = todoFactory.query({id: id});
   
    

   
    
       
    todoFactory.update({id: id}, $scope.todo, function() {
          $scope.todo.status="2";
      $location.path( "/todo" )
   
    })
  
	
   
    
    
  

    
})
    .controller("updateTodoneTodoCtrl",function($rootScope,$localStorage,$scope,$routeParams,$resource,tododoneFactory,$location){
    
  if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
 var id = $routeParams.id;
  $scope.todo = tododoneFactory.query({id: id});
   
   
   
    
       
    tododoneFactory.update({id: id}, $scope.todo, function() {
         
      $location.path( "/todo" )
       
    })
  
	
   
    
    
  

    
})
.controller('deleteTodoCtrl', function($rootScope,$localStorage, $routeParams, Deletetodo,$location, $route) {
   
   if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    Deletetodo.delete({id: $routeParams.id} ,$location.path( "/todo" ));
    $route.reload(); 
    
       
    
})
.controller('deleteAllTodoCtrl', function($localStorage,$rootScope,DeletetodoAll,$location, $route) {
      
   if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
    DeletetodoAll.delete({id: $rootScope.currentuser._id} ,$location.path( "/todo" ));
    
        
    $route.reload();
})


.controller('chatCtrl', function($localStorage,$scope,$rootScope) {
    if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
       $scope.chatid = $rootScope.currentuser._id;
        $scope.chatusername = $rootScope.currentuser.username;
    
        $scope.date = new Date();


})

.controller('mapTraceController',function($localStorage,$rootScope,$scope, $resource){

if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }

	var map=$resource('http://natofamilynetwork.herokuapp.com/map/affiche/'+$rootScope.currentuser.familyid);
    //getAll
    $scope.trace=map.query();
    $scope.trace.$promise.then(function(value) {
        console.log('ok');
        var tFather = new Array;
        var tMother = new Array;
        var tSon = new Array;
        var tDaughter = new Array;
        var c = new Array;
        var mother = new Array;
        var daughter = new Array;
        var father = new Array;
        var son = new Array;
        var count;
        var country;
        var state;
        var city;
		var x=new google.maps.LatLng(34.7406,10.7603);
        var j ;
        console.log(value[1].role);
        for(j=0;j<value.length;j++){
            if(value[j].role=="Mother"){
                mother.push(value[j]);
                
            }
            if(value[j].role=="Father"){
                father.push(value[j]);
                console.log(value[j])
            }
            if(value[j].role=="Son"){
                son.push(value[j]);
            }
            if(value[j].role=="Daughter"){
                daughter.push(value[j]);
            }
        }
/*function initialize()
{*/
var mapProp = {
  center:x,
  zoom:6,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  
var mapFather=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    for(var i=0 ;i<father.length; i++){
        tFather.push(new google.maps.LatLng (parseFloat(father[i].attitude),parseFloat(father[i].longitude)));
       
       }
    for(var i=0 ;i<mother.length; i++){
        tMother.push(new google.maps.LatLng (parseFloat(mother[i].attitude),parseFloat(mother[i].longitude)));
       
       }
        for(var i=0 ;i<daughter.length; i++){
        tDaughter.push(new google.maps.LatLng (parseFloat(daughter[i].attitude),parseFloat(daughter[i].longitude)));
       
       }
    for(var i=0 ;i<son.length; i++){
        tSon.push(new google.maps.LatLng (parseFloat(son[i].attitude),parseFloat(son[i].longitude)));

       }
    

    
var flightPath=new google.maps.Polyline({
  path:tFather,
  strokeColor:"#0000FF",
  strokeOpacity:0.8,
  strokeWeight:5
  });
var flightPath1=new google.maps.Polyline({
  path:tMother,
  strokeColor:"#FF0000",
  strokeOpacity:0.8,
  strokeWeight:5
  });
var flightPath2=new google.maps.Polyline({
  path:tSon,
  strokeColor:"#72ab88",
  strokeOpacity:0.8,
  strokeWeight:5
  });
        var flightPath3=new google.maps.Polyline({
  path:tDaughter,
  strokeColor:"#800080",
  strokeOpacity:0.8,
  strokeWeight:6
  });
       

flightPath.setMap(mapFather);
flightPath1.setMap(mapFather);
flightPath2.setMap(mapFather);
        flightPath3.setMap(mapFather);
/*}*/

/*google.maps.event.addDomListener(window, 'load', initialize);*/
        
	});    
	 
      

})
.controller('localisationController',function($localStorage,$rootScope,$scope, $http){
    
  if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
    // post
    var addd = function(){
         var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = 'date : '+mm+'/'+dd+'/'+yyyy+' time : '+h+' h '+m+' m '+s+' s ';
        console.log(today);
        var x= navigator.geolocation;
        x.getCurrentPosition(success, failure);
        function success(position){
            var mylat = position.coords.latitude;
            var mylong = position.coords.longitude;
            /* document.getElementById("mylat").value = mylat;
            document.getElementById("mylong").value = mylong;
            document.getElementById("date").value = today;*/
            var date = today;
            var userFK=$rootScope.currentuser._id;
            var family=$rootScope.currentuser.familyid;
            var role=$rootScope.currentuser.role;
            var name=$rootScope.currentuser.username;
            $scope.formData ={role,mylat,mylong,date,name,family,userFK };
            
            /*google api ready latitude and longitude*/
            var coords = new google.maps.LatLng(mylat, mylong);
            //setting up pir google map
            var mapOptions ={
                zoom: 16,
                center: coords,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            //creating the map
            var map = new google.maps.Map(document.getElementById("map"),mapOptions);
            //creating marker
            var marker = new google.maps.Marker({map: map, position: coords});
            
	$http.post('http://natofamilynetwork.herokuapp.com/map/addmap',$scope.formData).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    console.log($scope.formData);
    }
        
        function failure(){
            $('#lat').html("<p>it didn t work</p>")
        }
    }
    addd();
   
        
})

.controller('calendarController',function($localStorage,$rootScope,$scope, $resource, $http,$route){
    
    if($localStorage.loggedin)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    
    jQuery(function($) {

/* initialize the external events
	-----------------------------------------------------------------*/

	$('#external-events div.external-event').each(function() {

		// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim($(this).text()) // use the element's text as the event title
		};

		// store the Event Object in the DOM element so we can get to it later
		$(this).data('eventObject', eventObject);

		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
		
	});




	/* initialize the calendar
	-----------------------------------------------------------------*/

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
        var aa=new Array;  
        var cal=$resource('http://natofamilynetwork.herokuapp.com/calendar/'+$rootScope.currentuser.familyid);
        //getAll
        $scope.calendar=cal.query();
        $scope.calendar.$promise.then(function(value) {
            for(var i=0 ;i<value.length; i++){
                if (value[i].end=="null"){
                    value[i].end=null
                }
                aa.push({title:value[i].title, start: value[i].start,
			end: value[i].end,className:value[i].className});
               
            
                if(i+1 == value.length){
	var calendar = $('#calendar').fullCalendar({
		//isRTL: true,
		//firstDay: 1,// >> change first day of week 
		 buttonHtml: {
			prev: '<i class="ace-icon fa fa-chevron-left"></i>',
			next: '<i class="ace-icon fa fa-chevron-right"></i>'
		},
	
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},      
		events: 
            aa
		
		,
		
		/**eventResize: function(event, delta, revertFunc) {

			alert(event.title + " end is now " + event.end.format());

			if (!confirm("is this okay?")) {
				revertFunc();
			}

		},*/
		
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar !!!
		drop: function(date) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			var $extraEventClass = $(this).attr('data-class');
			
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = false;
			if($extraEventClass) copiedEventObject['className'] = [$extraEventClass];
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
            var title = "new event";
            var start = date;
            var end = null;
            var className = [$extraEventClass];
            var familyFK = $rootScope.currentuser.familyid;
			$scope.formEvent={title,start,end,className,familyFK };
                    $http.post('http://natofamilynetwork.herokuapp.com/calendar/addEvent',$scope.formEvent).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    $route.reload();
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
            
			
		}
		,
		selectable: true,
		selectHelper: true,
		select: function(start, end, allDay) {
			var className ='label-info' ;
			bootbox.prompt("New Event Title:", function(title) {
				if (title !== null) {
					calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: allDay,
							className: 'label-info'
						},
						true // make the event "stick"
                                          
					);
                    var familyFK = $rootScope.currentuser.familyid;
                    $scope.formEvent={title,start,end,className,familyFK };
                    $http.post('http://natofamilynetwork.herokuapp.com/calendar/addEvent',$scope.formEvent).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
   $route.reload();
				}
			});
			

			calendar.fullCalendar('unselect');
		}
		,
		eventClick: function(calEvent, jsEvent, view) {

			//display a modal
			var modal = 
			'<div class="modal fade">\
			  <div class="modal-dialog">\
			   <div class="modal-content">\
				 <div class="modal-body">\
				   <button type="button" class="close" data-dismiss="modal" style="margin-top:-10px;">&times;</button>\
				   <form class="no-margin">\
					  <label>Change event name &nbsp;</label>\
					  <input class="middle" autocomplete="off" type="text" value="' + calEvent.title + '" />\
					 <button type="submit" class="btn btn-sm btn-success"><i class="ace-icon fa fa-check"></i> Save</button>\
				   </form>\
				 </div>\
				 <div class="modal-footer">\
					<button type="button" class="btn btn-sm btn-danger" data-action="delete"><i class="ace-icon fa fa-trash-o"></i> Delete Event</button>\
					<button type="button" class="btn btn-sm" data-dismiss="modal"><i class="ace-icon fa fa-times"></i> Cancel</button>\
				 </div>\
			  </div>\
			 </div>\
			</div>';
		
		
			var modal = $(modal).appendTo('body');
			modal.find('form').on('submit', function(ev){
				ev.preventDefault();
var abbb = $(this).find("input[type=text]").val();
console.log(abbb);
                
                 for(var k=0;k<value.length;k++){
                if((calEvent.className == value[k].className) &&(calEvent.title==value[k].title)){
                /* var title=abbb;
                 var start= value[k].start;
                 var end= value[k].end;
                 var className=value[k].className;
                    $scope.formDat ={title,start,end,className};*/
                    var c = value[k].end;
                    if (c == null){
                    c="null";
                    }
                    console.log(abbb);
         var up=$resource('http://natofamilynetwork.herokuapp.com/calendar/:id/:title/:start/:end/:className', {}, {
      query: {method:'PUT', params:{id:value[k]._id,title:abbb,start:value[k].start,end:c,className:value[k].className}, isArray:false}});
                    console.log(abbb);
	  up.query();
           console.log('ok');
                }
                };
                
                
                
                
                
                
                calEvent.title= abbb;
                
				
                
				calendar.fullCalendar('updateEvent', calEvent);
                
				modal.modal("hide");
			});
			modal.find('button[data-action=delete]').on('click', function() {
				calendar.fullCalendar('removeEvents' , function(ev){
					return (ev._id == calEvent._id);
				})
                for(var j=0;j<value.length;j++){
                if((calEvent.className == value[j].className) &&(calEvent.title==value[j].title)){
                
                   
         var del=$resource('http://natofamilynetwork.herokuapp.com/calendar/:id', {}, {
      query: {method:'DELETE', params:{id:value[j]._id}, isArray:false}});
	  del.query();
           
                }
                };
                
				modal.modal("hide");
			});
			
			modal.modal('show').on('hidden', function(){
				modal.remove();
			});


			

			// change the border color just for fun
			//$(this).css('border-color', 'red');

		}
		
	});}
            };});


})
	})
    
    
    .controller('remainController',function($rootScope,$localStorage,$scope, $resource){
   if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
    var x = document.getElementById("myAudio"); 
function playAudio() { 
    x.play(); 
} 
     $scope.timeRemain = function(){
    var timeLeft= document.getElementById('time');
    var tache = document.getElementById('tache');
		var compteur= document.getElementById('compteur');
		var intervalID = setInterval(function() { 
		compteur.innerHTML = tache.value+" expire dans (" + --timeLeft.value + "s)";
        }, 1000);
        var timerID = setTimeout(function() { 
		clearInterval(intervalID);
          
		compteur.innerHTML = tache.value+" terminer";
            compteur.style.color="red";
		playAudio();
            //var message =  $resource('http://natofamilynetwork.herokuapp.com/sms/send/'+tache.value);
        //  $scope.envoie = message.query();
           

		}, 1000+(timeLeft.value*1000));};
	 
      
})

   
.controller('OnlineController', function ($rootScope,$resource,$translate, $scope) {
 
   
  var onlines=$resource('http://natofamilynetwork.herokuapp.com/login/all/online/');
    
        $rootScope.ons=onlines.query();

 
})

.controller('BigCtrl', function ($rootScope,$translate, $scope) {
 
    
    
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
 
})
.controller('MeineController', function ($location,$resource,$rootScope,$translate,$localStorage, $scope) {
 
  if($localStorage.loggedin && $localStorage.currentuser.familyid)
        {
            $rootScope.currentuser=$localStorage.currentuser;
            $rootScope.loggedin=$localStorage.loggedin;
            
        }
    if($localStorage.loggedin && !$localStorage.currentuser.familyid)
        {
            
            $location.path("/pending");
            
        }
    if(!$localStorage.loggedin)
        {
            
            $location.path("/");
            
        }
    
     var allfbs=$resource('http://natofamilynetwork.herokuapp.com/login/my/'+$localStorage.currentuser.familyid);
    //getAll
	
    $scope.fbs=allfbs.query();
  var x = $scope.fbs;
    
   // $scope.randomtest = x[Math.floor(Math.random()* x.length)];.
 
    
    var myprod=$resource('https://natofamilynetwork.herokuapp.com/needs/promote');
    
    $scope.myprod=myprod.query();
    
    
    
    $scope.bye= function(){
        
        if(confirm("Are you sure ? You won\'t be able to use Family Network again.") == true)
            {
        
	var del=$resource('http://natofamilynetwork.herokuapp.com/login/bye/:id', {}, {
        
      query: {method:'DELETE', params:{id:$localStorage.currentuser._id}, isArray:false}});
    
	  del.query();
        
        
       
        delete $localStorage.currentuser;
        delete $localStorage.panier;
        $localStorage.loggedin=false;
        $rootScope.currentuser = undefined;
        $location.path('/login');
              }

        
    }
    
    $scope.removeF = function(idd) {
        
        if(confirm("Are you sure you want to delete this member ?") == true){
            
             var hj=$resource('http://natofamilynetwork.herokuapp.com/login/remove/:id', {}, {
      query: {method:'PUT', params:{id:idd}, isArray:false}});
	  hj.query();
            
            $location.path("/me");
        }
        
        
    }
    
})

.controller('needController',function($localStorage,$rootScope,$scope, $http,$resource){
     
    
    
    $scope.needs = function(){
    var carrefour = new google.maps.LatLng(36.86663, 10.297448);
    var need = $resource('https://natofamilynetwork.herokuapp.com/map/need/'+$rootScope.currentuser.familyid);
    var distance = new Array;
    var name = new Array;
     $scope.needs=need.query();
    $scope.needs.$promise.then(function(value) {
         for(var i=0 ;i<value.length; i++){
        var position = new google.maps.LatLng(value[i].attitude, value[i].longitude);
          var distanceKm = google.maps.geometry.spherical.computeDistanceBetween(carrefour, position);
 distanceKm = distanceKm/1000;
        distance.push(distanceKm);
             name.push(value[i].name);
         }
        var lastPosition=distance[0];
        console.log(lastPosition);
        var lastName=name[0];
        for(var i=0 ;i<name.length; i++){
            if(distance[i]<lastPosition){
            lastPosition=distance[i];
                lastName=name[i];
            }
        }
        console.log(lastPosition);
        console.log(lastName);
        
        $scope.to = lastName;
      
         var message =  $resource('https://natofamilynetwork.herokuapp.com/sms/send/'+msg);
        $scope.envoie = message.query();
        
        
    })
    }
    
    if($localStorage.panier)
        {
     var chaine = "";
        
        for(var i=0;i<$localStorage.panier.length;i++)
            {
                chaine=chaine+"Item : \n"+$localStorage.panier[i].a+"\n Price : \n"+ $localStorage.panier[i].b+"\n"; 
            }
        
        var msg = " From : "+$localStorage.currentuser.username+"\n"+chaine;
        $scope.kadhia = chaine;
        console.log(msg);
          }
        
}); 
