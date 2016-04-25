angular.module('familyNetworkApp.services', []).factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
		
            OAuth.initialize('kgWIP9pNqk7xy14Izcm3mOff0IQ', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
            authResult= OAuth.create('instagram');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function () {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        },
        
        
        
        
        
         connectInstagram: function() {
            var deferred = $q.defer();
            OAuth.popup('instagram', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authResult = result;
                    console.log(result);
                    deferred.resolve();
                } else {
                    console.log(error);
                }
            });
            return deferred.promise;
        },
        
        
        
        
        getMyImg: function () {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authResult.get('https://api.instagram.com/v1/users/self/media/recent?access_token='+authResult.access_token).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        }
        
        
        
        
        
       /* 
        
        connectInstagram: function() {
            var deferred = $q.defer();
            OAuth.popup('instagram', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    deferred.resolve();
                    console.log(result);
                    authResult = result;
                    var deferred = $q.defer();
                    
            var promise = result.get('https://api.instagram.com/v1/users/self/media/recent?access_token='+result.access_token).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                console.log(data);
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
                } else {
                    console.log('ERROR '+error);
                }
            
        
        
        });
                                     
                                     }*/
    }
    
});