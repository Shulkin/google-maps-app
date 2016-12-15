var mongoose = require("mongoose");
var User = require("../models/user.js");
module.exports = function(app) {
  app.get("/users", function(req, res) {
    var query = User.find({}); // find all
    query.exec(function(err, users) {
      if (err) res.send(err);
      // if no error, respond with the list of all users
      res.json(users);
    });
  });
  app.post("/users", function(req, res) {
    // create new user
    var newUser = new User(req.body);
    // save to database
    newUser.save(function(err, user) {
      if (err) res.send(err);
      res.json(user); // return new user
    })
  });
  // get JSON records of users who met certain query conditions
  app.post("/query", function(req, res) {
    // grab query params from request body
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var distance = req.body.distance;
    // gender params
    var male = req.body.male;
    var female = req.body.female;
    var other = req.body.other;
    // age
    var minAge = req.body.minAge;
    var maxAge = req.body.maxAge;
    var favLang = req.body.favlang;
    // verified
    var reqVerified = req.body.reqVerified;
    // opens a generic mongoose query
    var query = User.find({});
    // include filter by max distance
    if (distance) {
      // notice MongoDB geospatial query!
      query = query.where("location").near({
        center: {type: "point", coordinates: [long, lat]},
        maxDistance: distance, // meters
        spherical: true // evaluate distances across the globe
      });
    }
    // other filters
    if (male || female || other) {
      query.or([{"gender": male}, {"gender": female}, {"gender": other}]);
    }
    if (minAge) {
      // greater than
      query = query.where("age").gte(minAge);
    }
    if (maxAge) {
      // lower than
      query = query.where("age").lte(maxAge);
    }
    if (favLang) {
      query = query.where("favlang").equals(favLang);
    }
    // filter for HTML5 Verified Locations
    if (reqVerified) {
      query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
    }
    // execute query
    query.exec(function(err, users) {
      if (err) res.send(err);
      // return all users who met criteria
      res.json(users);
    });
  });
};
