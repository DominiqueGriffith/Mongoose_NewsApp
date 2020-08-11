var express = require("express");

var router = express.Router();

router.get("/", function (req, res) {
    // Burger.all(function (data) {
    //   var hbsObject = {
    //     burgers: data
    //   };
      console.log(hbsObject);
      res.render("index", hbsObject);
    // });
  });

  


// Export routes for server.js to use.
module.exports = router;