var pcs = angular.module("pcs", []);
var imps = angular.module("imps", []);
var tablettes = angular.module("tablettes", []);
var foods = angular.module("foods", []);

pcs.factory('pcListFromFactory',function($resource)
         {
    var allfbs=$resource('http://natofamilynetwork.herokuapp.com/pcs');
    return allfbs.query();
            }
        )

imps.factory('impListFromFactory',function($resource)
         {
    var allfbs=$resource('http://natofamilynetwork.herokuapp.com/imprimantes');
    return allfbs.query();
            }
        )

tablettes.factory('tablettesListFromFactory',function($resource)
         {
    var allfbs=$resource('http://natofamilynetwork.herokuapp.com/tablettes');
    return allfbs.query();
            }
        )
foods.factory('foodsListFromFactory',function($localStorage,$resource,$rootScope)
         {
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
   //var allfbs=$resource('http://127.0.0.1:3000/league/'+$routeParams.test+'/'+$routeParams.param);
	var allfbs=$resource('http://natofamilynetwork.herokuapp.com/foods/'+$rootScope.currentuser.familyid);

    return allfbs.query();
            }
        )
