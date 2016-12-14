angular.module("add.service", [])
.factory("addService", ["$http", function($http) {
  // we will return this service
  var googleMapService = {};
  // array of locations from API calls
  var locations = [];
  // selected location (default to Kanzas)
  var selectedLat = 39.50;
  var selectedLong = -98.35;
  // public functions
  // refresh the map with new data
  googleMapService.refresh = function(latitude, longitude) {
    // clear locations
    locations = [];
    // set selected coordinates
    selectedLat = latitude;
    selectedLong = longitude;
    // do AJAX call to get all users
    $http.get("/users").success(function(response) {
      // extract coords to Google Maps format
      locations = convertToMapPoints(response);
      // init map
      initialize(latitude, longitude);
    }).error(function() {}); // do nothing
  };
  // private inner functions
  // convert a JSON of users into map points
  var convertToMapPoints = function(response) {
    var locations = [];
    for (var i = 0; i < response.length; i++) {
      var user = response[i];
      // create info popup for each record
      var contentString =
        '<p><b>Username</b>: ' + user.username +
        '<br><b>Age</b>: ' + user.age +
        '<br><b>Gender</b>: ' + user.gender +
        '<br><b>Favorite Language</b>: ' + user.favlang +
        '</p>';
      // converts each record into Google Maps Location format
      locations.push({
        // note format [Long, Lat]!
        latlon: new google.maps.LatLng(
          user.location[1],
          user.location[0]
        ),
        // info popup
        message: new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 320
        }),
        username: user.username,
        gender: user.gender,
        age: user.age,
        favlang: user.favlang
      });
    }
    return locations;
  };
  // initialize the map
  var initialize = function(latitude, longitude) {
    // use the selected lat, long as starting point
    var myCoords = {lat: selectedLat, lng: selectedLong};
    // if map has not been created already...
    if (!map) {
      // create a new map and place in the index.html page
      var map = new google.maps.map(document.getElementById('map'), {
        zoom: 3,
        center: myCoords
      });
    }
    // loop through each location in the array and place a marker
    locations.forEach(function(n, i) {
      var marker = new google.maps.Marker({
        map: map,
        title: "Big Map",
        position: n.latlon,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });
      // for each marker created, add a listener that checks for clicks
      google.maps.event.addListener(marker, "click", function(e) {
        // open the message on click
        currentSelectedMarker = n;
        n.message.open(map, marker);
      })
    });
    // set initial location as bouncing red marker
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
      map: map,
      position: initialLocation,
      animation: google.maps.Animation.BOUNCE,
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    });
    lastMarker = marker;
  };
  // refresh the page upon window load
  // use the initial latitude and longitude
  google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));
  return googleMapService;
}]);
