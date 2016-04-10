'use strict';

/**
 * @ngdoc function
 * @name familyNetworkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the familyNetworkApp
 */
angular.module('familyNetworkAppc', ["ngResource"])
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
    $scope.add = function(ad,a,m){
	$http.post('http://127.0.0.1:3000/register',$scope.formData).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    }
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
.controller('leagueController',function($scope, $resource){

	var allfbs=$resource('http://127.0.0.1:3000/league');
    //getAll
	
    $scope.league=allfbs.query();
	 
      
})
.controller('calendarController',function($scope, $resource){

			jQuery(function($) {
                var start;

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
		events: [
		  {
			title: 'All Day Event',
			start: new Date(y, m, 1),
			className: 'label-important'
		  },
		  {
			title: 'Long Event',
			start: moment().subtract(5, 'days').format('YYYY-MM-DD'),
			end: moment().subtract(1, 'days').format('YYYY-MM-DD'),
			className: 'label-success'
		  }
		]
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

				calEvent.title = $(this).find("input[type=text]").val();
				calendar.fullCalendar('updateEvent', calEvent);
				modal.modal("hide");
			});
			modal.find('button[data-action=delete]').on('click', function() {
				calendar.fullCalendar('removeEvents' , function(ev){
					return (ev._id == calEvent._id);
				})
				modal.modal("hide");
			});
			
			modal.modal('show').on('hidden', function(){
				modal.remove();
			});


			//console.log(calEvent.id);
			//console.log(jsEvent);
			//console.log(view);
			// change the border color just for fun
			//$(this).css('border-color', 'red');

		}
	
	});


})
		
	 
      
})
 .controller('teamController',function($scope, $resource,$routeParams){
    
	
	
	//console.log($routeParams.param);
	var allfbs=$resource('http://127.0.0.1:3000/league/'+$routeParams.param);
    //getAll
	
    $scope.team=allfbs.query();
	 
      
})



;


