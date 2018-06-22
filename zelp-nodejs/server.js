var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var passport = require("passport");

require("dotenv").config({ path: "./.env" });

const CONNECTION_URI =
  process.env.MONGODB_URI || "mongodb://localhost/webdev-summer1-2018";

mongoose.connect(CONNECTION_URI);

var app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  var allowedOrigins = [
    "https://cs4550-zelp-angular.herokuapp.com",
    "http://localhost:4200"
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var session = require("express-session");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "any string"
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/message/:theMessage", function(req, res) {
  var theMessage = req.params["theMessage"];
  res.send(theMessage);
});

app.get("/api/session/set/:name/:value", setSession);
app.get("/api/session/get/:name", getSession);

function setSession(req, res) {
  var name = req.params["name"];
  var value = req.params["value"];
  req.session[name] = value;
  res.send(req.session);
}

function getSession(req, res) {
  var name = req.params["name"];
  var value = req.session[name];
  res.send(value);
}

var userService = require("./services/user.service.server");
userService(app);
var responseService = require("./services/response.service.server");
responseService(app);
var postService = require("./services/post.service.server");
postService(app);
var restaurantService = require("./services/restaurant.service.server");
restaurantService(app);
var yelpService = require("./services/yelp.service.server");
yelpService(app);

app.listen(PORT);
