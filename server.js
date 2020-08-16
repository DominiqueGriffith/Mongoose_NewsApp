var express = require("express");
var bodyParser = require("body-parser")
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// var useNewUrlParser = mongoose.set('useNewUrlParser', true);
// Initialize Express
var app = express();


// Configure middleware
var logger = require("morgan");
var mongoose = require("mongoose");
// Mongoose is mongodb ORM

var Promise = require("bluebird");

mongoose.Promise = Promise;

// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// Require all models
var db = require("./models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/HeadlineAppMongoose", { useNewUrlParser: true });
// Show any mongoose errors






// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;


// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.render("index");
  // You will put index.handlebars in send
});

// Retrieve data from the db
app.get("/all", function (req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function (error, found) {
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
app.get("/scrape", function (req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.economist.com/").then(function (response) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(response.data);
    // For each element with a "title" class
        $(".ImageModule").each(function(i,element){
    var photo = $(element).children("img").attr("src");
       });

    $("a.headline-link").each(function (i, element) {
      // var photoParsing = $("picture._1j0xu");
      // var photo = $(element, photoParsing).children("img").attr();
      // var byline = $(element).children("span").text();
      // var titleAndLink = $("h2.HeadlineModule");
       
      // Save an empty result object
       var result = {};

       result.title = $(this)
       .children("span")
       .text();
       result.link = $(this)
       .attr("href");


      // If this found element had both a title and a link
      // if (title && link) {
        // Insert the data in the scrapedData db
           // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
       
      });
    $(".teaser__image").each(function (i, element) {
      // var photoParsing = $("picture._1j0xu");

      var resultsTwo = {};

     
       resultsTwo.photoLink = $(this)
      .find("img")
      .attr("srcset")
      .split(",")[0].split(" ")[0];

      db.Article.create(resultsTwo)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });

      
    });




  });



  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {

  db.Article.find({})
    .then(function (allArticles) {
      res.json(allArticles);
    })
    .catch(function (err) {
      res.json(err)
    });
});




// Import routes and give the server access to them.
// var routes = require("./controllers/mongooseNewsApp_Controllers.js");




// app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/HeadlineAppMongoose";

mongoose.connect(MONGODB_URI);


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});







