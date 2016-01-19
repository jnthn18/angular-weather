app.controller('MainController', ['$scope', 'weather', function($scope, weather) {
  weather.success(function(data) {
    $scope.forecast = data.forecast.simpleforecast.forecastday;
  });
}]);