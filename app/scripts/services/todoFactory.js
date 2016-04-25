var app = angular.module('todo.fac', ["ngResource"]);

                       app.factory('todoget',function($resource) {
             return $resource('natofamilynetwork.herokuapp.com/todo');
    });


app.factory('todoFactory3', function($resource){
    return {
       resource : function()
        {
        
return $resource('http://natofamilynetwork.herokuapp.com/todo/f/:id',{ id: '@_id' }, {
    update: {
      method: 'PUT' ,isArray:false// this method issues a PUT request
    }
  });      
            
        
        }
    }
                    
});

app.factory('todoFactory', function($resource) {
  return $resource('http://natofamilynetwork.herokuapp.com/todo/:id',{ id: '@_id' }, {update: {method: 'PUT'}});
});
app.factory('tododoneFactory', function($resource) {
  return $resource('http://natofamilynetwork.herokuapp.com/todo/done/:id',{ id: '@_id' }, {update: {method: 'PUT'}});
});
app.factory('Deletetodo', function ($resource) {
    return $resource('http://natofamilynetwork.herokuapp.com/todo/:id');
   
   
});
app.factory('DeletetodoAll', function ($resource) {
    return $resource('http://natofamilynetwork.herokuapp.com/todo/all/:id');
   
   
});

