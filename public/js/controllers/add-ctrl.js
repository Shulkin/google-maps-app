angular.module("add.ctrl", ["geolocation", "add.service"])
.controller("addCtrl", ["$scope", "$http", "geolocation", "addService" function(
  $scope, $http, geolocation, addService) {
  // init variables
  $scope.formData = {};
  var lat = 0;
  var long = 0;
  var coords = {};
  // set initial coordinates
  $scope.formData.latitude = 39.500;
  $scope.formData.longitude = -98.350;
  // default gender
  $scope.formData.gender = "Male";
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
      $scope.formData.gender = "Male"; // by default
      $scope.formData.age = "";
      $scope.formData.favlang = "";
      // refresh the map when user is created
      addService.refresh(
        $scope.formData.latitude,
        $scope.formData.longitude
      );
    })
    .error(function(err) {
      console.log("Error " + err);
    });
  };
}]);
