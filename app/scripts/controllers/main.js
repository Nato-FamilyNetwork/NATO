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



  .controller('registerController',function($rootScope,$scope, $http, $route, $location){
    
	
	
	// post
    $scope.add = function(ad,a){
	$http.post('http://127.0.0.1:3000/register',$scope.formData).
        success(function(data) {
            $rootScope.currentuser=data;
        //$location.path( "/login" );
        
        }).error(function(data) {
        $scope.error = "An error has occured please try again!";
            console.error("error in posting");
        })
    }
})
 .controller('loginController',function($rootScope, $scope, $http, $location){
    
	
	
	// post
    $scope.login = function(){
	$http.post('http://127.0.0.1:3000/login',$scope.user).
        success(function(data) {
            console.log("connected successfully");
        $rootScope.currentuser = data;
        
        $location.path( "/todo" );
    }).error(function(data) {
        $scope.error = "Error in connecting please try again!";
            console.error("error in connecting");
        })
    }
    
    
    
   
    
    
    
})


.controller('familyListController',function($rootScope,$resource, $scope, $http, $routeParams, $route){
    
    var allfbs=$resource('http://127.0.0.1:3000/login/all');
    //getAll
	
    $scope.fbs=allfbs.query();
	
    console.log($scope.fbs);
    
    
    $scope.addF = function(idd) {
         var hj=$resource('http://127.0.0.1:3000/login/add/:id/:fid', {}, {
      query: {method:'PUT', params:{id:idd,fid:$rootScope.currentuser.familyid}, isArray:false}});
	  hj.query();
    $route.reload();
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



























.controller('logoutController',function($rootScope,$http, $scope, $resource, $location){
    
	
	
	
	$http.get('http://127.0.0.1:3000/login/logout').
        success(function(data) {
            console.log("loggingout");
        $location.path('/login');
        $rootScope.currentuser=undefined;
        }).error(function(data) {
            console.error("error");
        })
    
   

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
	 
      
}).controller('refrecheCtrl', function($location, $route) {
    $route.reload(); 
        $location.path( "/todo" );
    
    
}).controller('userTodo', function($rootScope,$scope, $resource, $location, $route) {
    
    console.log("salut"+$rootScope.currentuser._id);
    $location.path( "/todo" );
     
       

    var done =  $resource('http://127.0.0.1:3000/todo/'+$rootScope.currentuser._id+'/3');
    var todo =  $resource('http://127.0.0.1:3000/todo/'+$rootScope.currentuser._id+'/1');
    var doing =  $resource('http://127.0.0.1:3000/todo/'+$rootScope.currentuser._id+'/2');
    
    
    
     $scope.done = done.query();
    $scope.todo = todo.query();
    $scope.doing = doing.query();
   
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
         $location.path( "/todo" );
  

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



.controller('needsController',function($scope, $resource){

	var allfbs=$resource('http://127.0.0.1:3000/needs');
    //getAll
	
    $scope.needs=allfbs.query();
    
   
	 
      
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
.controller('deleteTodoCtrl', function( $routeParams, Deletetodo,$location, $route) {
   
    Deletetodo.delete({id: $routeParams.id} ,$location.path( "/todo" ));
    $route.reload(); 
    
       
    
})
.controller('deleteAllTodoCtrl', function($rootScope,DeletetodoAll,$location, $route) {
      
   
    DeletetodoAll.delete({id: $rootScope.currentuser._id} ,$location.path( "/todo" ));
    
        
    $route.reload();
})


.controller('chatCtrl', function($scope,$rootScope) {
       $scope.chatid = $rootScope.currentuser._id;
        $scope.chatusername = $rootScope.currentuser.username;
    
        $scope.date = new Date();


})

.controller('mapTraceController',function($scope, $resource){



	var map=$resource('http://127.0.0.1:3000/map/afficher');
    //getAll
    $scope.trace=map.query();
    $scope.trace.$promise.then(function(value) {
        var t = new Array;
        var b = new Array;
        var c = new Array;
        var b = new Array;
        var count;
        var country;
        var state;
        var city;
		var x=new google.maps.LatLng(34.7406,10.7603);
/*function initialize()
{*/
var mapProp = {
  center:x,
  zoom:7,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    for(var i=0 ;i<value.length; i++){
        t.push(new google.maps.LatLng (parseFloat(value[i].attitude),parseFloat(value[i].longitude)));
        b.push(value[i].date);
        var geocoder;
geocoder = new google.maps.Geocoder();
var latlng = new google.maps.LatLng(value[i].attitude, value[i].longitude);
    
geocoder.geocode(
    {'latLng': latlng}, 
    function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  valuee=add.split(",");

                    count=valuee.length;
                   /* country=value[count-1];*/
                    state=valuee[count-2];
                   /* city=value[count-3];*/
                    c.push(state);
                    
                    /*alert("city name is: " + state);*/
                }
                else  {
                    alert("address not found");
                }
        }
         else {
            alert("Geocoder failed due to: " + status);
        }
        var total = new Array;
        for (i = 0; i < c.length; i++) {
            total.push(c[i]+' '+b[i]+'</br>');
        }
        document.getElementById("chemin").innerHTML =  total.join("");}
          
);}
    
    console.log(value);

    
var flightPath=new google.maps.Polyline({
  path:t,
  strokeColor:"#0000FF",
  strokeOpacity:0.8,
  strokeWeight:2
  });

flightPath.setMap(map);
/*}*/

/*google.maps.event.addDomListener(window, 'load', initialize);*/
        
	});    
	 
      

})
.controller('localisationController',function($scope, $http){
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
            $scope.formData ={mylat,mylong,date };
            
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
            
	$http.post('http://127.0.0.1:3000/map/addmap',$scope.formData).
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

.controller('calendarController',function($scope, $resource, $http,$route){
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
        var cal=$resource('http://127.0.0.1:3000/calendar/');
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
			$scope.formEvent={title,start,end,className };
                    $http.post('http://127.0.0.1:3000/calendar/addEvent',$scope.formEvent).
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
                    
                    $scope.formEvent={title,start,end,className };
                    $http.post('http://127.0.0.1:3000/calendar/addEvent',$scope.formEvent).
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
         var up=$resource('http://127.0.0.1:3000/calendar/:id/:title/:start/:end/:className', {}, {
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
                
                   
         var del=$resource('http://127.0.0.1:3000/calendar/:id', {}, {
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
	
      
});


