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
app.use(express.static("views"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// var databaseUrl = "Mongoose_NewsApp";
// var collections = ["scraperData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function (error) {
//   console.log("Database Error:", error);
// });

// Require all models
var db = require("./models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/Mongoose_NewsApp", { useNewUrlParser: true });
// Show any mongoose errors






// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;




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
app.get("/", function (req, res) {
  res.send("Hello world");
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
    //     $(".ImageModule").each(function(i,element){
    // var photo = $(element).children("img").attr("src");
    //    });

    $("a.headline-link").each(function (i, element) {
      // var photoParsing = $("picture._1j0xu");
      // var photo = $(element, photoParsing).children("img").attr();
      // var byline = $(element).children("span").text();
      // var titleAndLink = $("h2.HeadlineModule");
      var title = $(element).children("span").text();
      var link = $(element).attr("href");


      // If this found element had both a title and a link
      if (title && link) {
        // Insert the data in the scrapedData db
        db.Article.create({
          // photo: photo,
          title, link
          // byline: byline
        },
          function (err, inserted) {
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

      // db.Article.create(result)
    });

    $(".teaser__image").each(function (i, element) {
      // var photoParsing = $("picture._1j0xu");
      var photoLink = $(element).find("img").attr("srcset").split(",")[0].split(" ")[0];


      // If this found element had both a title and a link
      if (photoLink) {
        // Insert the data in the scrapedData db
        db.Article.create({
          // photo: photo,
          photoLink

          // byline: byline
        },
          function (err, inserted) {
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
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


// Start the server
app.listen(PORT, function () {
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





