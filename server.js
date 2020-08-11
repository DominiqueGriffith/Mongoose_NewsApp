var express = require("express");
var exphbs = require("express-handlebars");

// Initialize Express
var app = express();

var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("views"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// // Routes

// var router = express.Router();

// Data
var lunches = [
  {
    lunch: "Beet & Goat Cheese Salad with minestrone soup."
  }, {
    lunch: "Pizza, two double veggie burgers, fries with a Big Gulp"
  }
];

app.get("/home", function (req, res) {

  // Burger.all(function (data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
   
    res.render("index", lunches[0]);
  });
// });


// A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with axios
//   axios.get("http://www.echojs.com/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//   });
// });
// var express = require("express");
// var exphbs  = require('express-handlebars');
// // var logger = require("morgan");
// var mongoose = require("mongoose");


// // Initialize Express
// var app = express();

// Require all models
// var db = require("./models");

// var PORT =  process.env.PORT || 3000;

// // Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("public"));

// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// Import routes and give the server access to them.
// var routes = require("./controllers/mongooseNewsApp_Controllers.js");




// app.use(routes);


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
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoosenewsapp";
// mongoose.connect(MONGODB_URI);





  