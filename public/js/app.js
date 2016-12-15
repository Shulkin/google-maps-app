angular.module("google.maps.app", [
  "add.ctrl", // controller for addUserForm
  "query.ctrl", // controller for queryForm
  "map.service", // corresponding data service
  "geolocation", // HTML5 verified location
  "ngRoute" // application routing
])
.config(function($routeProvider) {
  // show the relevant view and controller when needed
  $routeProvider
  .when("/join", {
    controller: "addCtrl",
    templateUrl: "views/add-form.html"
  })
  .when("/find", {
    templateUrl: "views/query-form.html"
  })
  .otherwise({redirectTo: "/join"});
});
