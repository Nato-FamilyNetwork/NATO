
angular.module('todo.Crtl', ['todo.fac','ngResource'])



    .controller('TodoCtrl2', function($scope, todoget) {
    
  
    $scope.todos = todoget.query();
        
        
  
});
