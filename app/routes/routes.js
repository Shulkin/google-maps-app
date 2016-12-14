var mongoose = require("mongoose");
var User = require("./models/user.js");
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
  })
};
