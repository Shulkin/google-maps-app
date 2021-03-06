// grab npm modules
var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// config app
var app = express();
var port = process.env.PORT || 3000;
// connect to mongoose
mongoose.connect("mongodb://localhost:27017/maps")
// set up express
app.use(express.static(__dirname + "/public")); // index.html by default
app.use("/bower_components",  express.static(__dirname + "/bower_components"));
app.use(morgan("dev")); // log with morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(methodOverride());
// set up routes
require('./app/routes/routes.js')(app);
// start server
app.listen(port);
console.log("Server started at port " + port);
