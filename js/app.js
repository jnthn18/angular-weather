var app = angular.module("weatherApp", []);

app.controller('MainController', ['$scope', 'weatherFactory', function($scope, weatherFactory) {
  $scope.location = {name: "Ann Arbor, MI", editing: false};
  $scope.forecast = {};
  $scope.editedLocation = null;

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

  $scope.startEditing = function(location){
    location.editing = true;
    $scope.editedLocation = location;
  }

  $scope.doneEditing = function(location){
    $scope.newLocation(location);
    location.editing = false;
    $scope.editedLocation = null;
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

//Credit for ngBlur and ngFocus to https://github.com/addyosmani/todomvc/blob/master/architecture-examples/angularjs/js/directives/
app.directive('ngBlur', function() {
  return function( scope, elem, attrs ) {
    elem.bind('blur', function() {
      scope.$apply(attrs.ngBlur);
    });
  };
});

app.directive('ngFocus', function( $timeout ) {
  return function( scope, elem, attrs ) {
    scope.$watch(attrs.ngFocus, function( newval ) {
      if ( newval ) {
        $timeout(function() {
          elem[0].focus();
        }, 0, false);
      }
    });
  };
})

app.factory('weatherFactory', ['$http', function($http) { 

  var baseUrl = 'http://api.wunderground.com/api/5b494ca3d635225a/forecast/q/';
  var weatherFactory = {};
  
  weatherFactory.getWeather = function() {
    return $http.get(baseUrl+'MI/Ann_Arbor.json');
  };

  weatherFactory.updateLocation = function(location) {
    var state = location.name.split(',')[1].trim();
    var city = location.name.split(',')[0].replace(/ /g,"_");
    return $http.get(baseUrl+state+"/"+city+".json");
  };

  return weatherFactory;

}]);