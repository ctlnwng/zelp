var express = require("express");
var app = express();

// var session = require("express-session");

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: "any string"
//   })
// );

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/message/:theMessage", function(req, res) {
  var theMessage = req.params["theMessage"];
  res.send(theMessage);
});

app.listen(4000);
