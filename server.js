var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

var databaseUrl = "Mongoose_NewsApp";
var collections = ["scraperData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

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
// var lunches = [
//   {
//     lunch: "Beet & Goat Cheese Salad with minestrone soup."
//   }, {
//     lunch: "Pizza, two double veggie burgers, fries with a Big Gulp"
//   }
// ];

// app.get("/home", function (req, res) {

//   // Burger.all(function (data) {
//   //   var hbsObject = {
//   //     burgers: data
//   //   };
   
//     res.render("index", lunches[0]);
//   });
// });

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.thedailybeast.com/").then(function(response) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(response.data);
    // For each element with a "title" class
    $(".HeadlineModule").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children("a").text();
      var link = $(element).children("a").attr("href");

      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert({
          title: title,
          link: link
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});




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

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


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





  