angular.module("query.ctrl", ["geolocation", "map.service"])
.controller("queryCtrl", [
  "$rootScope", "$scope", "$log",
  "$http", "$geolocation", "Map",
  function($rootScope, $scope, $log, $http, $geolocation, Map) {
  // init variables
  $scope.formData = {};
  var queryBody = {};
  // function
  // get user location based on HTML5 geolocation
  geolocation.getLocation().then(function(data) {
    coords = {lat: data.coords.latitude, long: data.coords.longitude};
    // set latitude and longitude
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
  });
  // get user coordinates based on mouse click
  $rootScope.$on("clicked", function() {
    $scope.apply(function() {
      $scope.formData.latitude = parseFloat(Map.clickLat).toFixed(3);
      $scope.formData.longitude = parseFloat(Map.clickLong).toFixed(3);
    });
  });
  // incorporate parameters into query body
  $scope.queryUsers = function() {
    // assemble query body
    queryBody = {
      longitude: parseFloat($scope.formData.longitude),
      latitude: parseFloat($scope.formData.latitude),
      distance: parseFloat($scope.formData.distance),
      male: $scope.formData.male,
      female: $scope.formData.female,
      other: $scope.formData.other,
      minAge: $scope.formData.minage,
      maxAge: $scope.formData.maxage,
      favlang: $scope.formData.favlang,
      reqVerified: $scope.formData.verified
    };
    $http.post("/query", queryBody)
    .success(function(queryResult) {
      // log result
      console.log("queryBody:");
      console.log(queryBody);
      console.log("queryResult:");
      console.log(queryResult);
      // count the number of records retrieved
      $scope.queryCount = queryResult.length;
    })
    .error(function(err) {
      console.log("Error " + err);
    });
  };
}]);
