app.factory('weather', ['$http', function($http) { 
  return $http.get('http://api.wunderground.com/api/5b494ca3d635225a/forecast/q/MI/Ann_Arbor.json') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);