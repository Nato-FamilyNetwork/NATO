var app=angular.module('todo.fac', ["ngResource"]);
                       app.factory('todoget',function($resource) {
             return $resource('http://127.0.0.1:3000/todo');
    });