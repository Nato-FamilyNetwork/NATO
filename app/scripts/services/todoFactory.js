var app = angular.module('todo.fac', ["ngResource"]);

                       app.factory('todoget',function($resource) {
             return $resource('http://127.0.0.1:3000/todo');
    });


app.factory('todoFactory3', function($resource){
    return {
       resource : function()
        {
        
return $resource('http://localhost:3000/todo/f/:id',{ id: '@_id' }, {
    update: {
      method: 'PUT' ,isArray:false// this method issues a PUT request
    }
  });      
            
        
        }
    }
                    
});

app.factory('todoFactory', function($resource) {
  return $resource('http://localhost:3000/todo/:id',{ id: '@_id' }, {update: {method: 'PUT'}});
});
app.factory('tododoneFactory', function($resource) {
  return $resource('http://localhost:3000/todo/done/:id',{ id: '@_id' }, {update: {method: 'PUT'}});
});
app.factory('Deletetodo', function ($resource) {
    return $resource('http://localhost:3000/todo/:id');
   
   
});
app.factory('DeletetodoAll', function ($resource) {
    return $resource('http://localhost:3000/todo/all/:id');
   
   
});

