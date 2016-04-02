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
.controller('facebookListController',function($scope, $resource){
    
	
	
	
	var allfbs=$resource('http://127.0.0.1:3000/final/fbs');
    //getAll
	
    $scope.fbs=allfbs.get();
	
    console.log($scope.fbs);
      
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
      
          $location.path( "/refreche" );
         
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
.controller('refrecheCtrl', function($location) {
    
        $location.path( "/todo" );
    
})


;


