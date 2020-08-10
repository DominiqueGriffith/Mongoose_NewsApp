var express = require("express");
var exphbs  = require('express-handlebars');
// var logger = require("morgan");
var mongoose = require("mongoose");


// Initialize Express
var app = express();

// Require all models
// var db = require("./models");

var PORT =  process.env.PORT || 3000;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Import routes and give the server access to them.
var routes = require("/");

router.get("/", function (req, res) {
  // Burger.all(function (data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
    console.log(hbsObject);
    res.render("index", hbsObject);
  // });
});

app.use(routes);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });






// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));


// Make public a static folder
// app.use(express.static("public"));



// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoosenewsapp";
mongoose.connect(MONGODB_URI);





  