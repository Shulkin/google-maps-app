angular.module("add.ctrl", ["geolocation"])
.controller("addCtrl",["$scope", "$http", "geolocation", function(
  $scope, $http, geolocation) {
  // init variables
  $scope.formData = {};
  var lat = 0;
  var long = 0;
  var coords = {};
  // set initial coordinates
  $scope.formData.latitude = 39.500;
  $scope.formData.longitude = -98.350;
  // functions
  // create new user
  $scope.createUser = function() {
    // grab all data from inputs
    var userData = {
      username: $scope.formData.username,
      gender: $scope.formData.gender,
      age: $scope.formData.age,
      favlang: $scope.formData.favlang,
      location: [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverified
    };
    // save user to database
    $http.post("/users", userData)
    .success(function(data) {
      // clear the form, except location
      $scope.formData.username = "";
      $scope.formData.gender = "";
      $scope.formData.age = "";
      $scope.formData.favlang = "";
    })
    .error(function(err) {
      console.log("Error " + err);
    })
  };
}]);
