angular.module("add.ctrl", ["geolocation", "map.service"])
.controller("addCtrl", ["$rootScope", "$scope", "$http", "geolocation", "Map", function(
  $rootScope, $scope, $http, geolocation, Map) {
  // init variables
  $scope.formData = {};
  var lat = 0;
  var long = 0;
  var coords = {};
  // set initial coordinates
  $scope.formData.latitude = 39.500;
  $scope.formData.longitude = -98.350;
  // get user's actual coordinates based on HTML5 at window load
  geolocation.getLocation().then(function(data) {
    // set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat: data.coords.latitude, long: data.coords.longitude};
    // display coordinates in textboxes rounded to three decimal points
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    // display message confirming that the coordinates verified
    $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
    // refresh map
    Map.refresh($scope.formData.latitude, $scope.formData.longitude);
  });
  // default gender
  $scope.formData.gender = "Male";
  // functions
  // when click is detected, get coordinates of mouse
  $rootScope.$on("clicked", function() {
    // get coordinates from service
    $scope.$apply(function() {
      $scope.formData.latitude = parseFloat(Map.clickLat).toFixed(3);
      $scope.formData.longitude = parseFloat(Map.clickLong).toFixed(3);
      $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
    });
  });
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
      Map.refresh(
        $scope.formData.latitude,
        $scope.formData.longitude
      );
    })
    .error(function(err) {
      console.log("Error " + err);
    });
  };
}]);
