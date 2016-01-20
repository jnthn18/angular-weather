var app = angular.module("weatherApp", []);

app.controller('MainController', ['$scope', 'weatherFactory', function($scope, weatherFactory) {
  $scope.location = "Ann Arbor, MI";
  $scope.forecast = {};

  getWeather();

  function getWeather() {
    weatherFactory.getWeather()
      .success(function (weather) {
        $scope.forecast = weather.forecast.simpleforecast.forecastday;
      })
      .error(function (err) {
        console.log(err);
      });
  }

  $scope.newLocation = function(location) {
    weatherFactory.updateLocation(location)
      .success(function (weather) {
          $scope.forecast = weather.forecast.simpleforecast.forecastday;
      })
      .error(function (err) {
        console.log(err);
      });
  };

}]);

app.factory('weatherFactory', ['$http', function($http) { 

  var baseUrl = 'http://api.wunderground.com/api/5b494ca3d635225a/forecast/q/';
  var weatherFactory = {};
  
  weatherFactory.getWeather = function() {
    return $http.get(baseUrl+'MI/Ann_Arbor.json');
  };

  weatherFactory.updateLocation = function(location) {
    var state = location.split(',')[1].trim();
    var city = location.split(',')[0].replace(/ /g,"_");
    return $http.get(baseUrl+state+"/"+city+".json");
  };

  return weatherFactory;

}]);