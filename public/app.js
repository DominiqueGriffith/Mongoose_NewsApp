// getJSON Function 



// function getAllArticles() {

$.getJSON("/articles", function (data) {
    console.log(data[0].title);
    console.log(data[1].title);
    console.log(data[2].title);
    console.log(data[3].title);
    console.log(data[4].title);

    console.log(data[20].photoLink);

    // article one
    var articleOne = data[0].title;
    var idOne;
    var linkOne;
    var photoLinkOne = (data[20].photoLink);

    var newImg = $("<img>").attr("src", photoLinkOne);
    $("#first-article-photo").append(newImg);
    $("#first-article").append("<p data-id='" + data[0]._id + "'>" + data[0].title + "<br />" + data[0].link + "</p>")

    // article two
    var articleTwo = data[1].title;
    var idtwo;
    var linktwo;
    var photoLinkTwo = (data[21].photoLink);
console.log(data)
    var newImgTwo = $("<img>").attr("src", photoLinkTwo);
    $("#second-article-photo").append(newImgTwo);
    $("#second-article").append("<p data-id='" + data[1]._id + "'>" + data[1].title + "<br />" + data[1].link + "</p>")


    // article three
    var articleThree = data[2].title;
    var idOne;
    var linkOne;
    var photoLinkThree = (data[22].photoLink);
    var newImgThree = $("<img>").attr("src", photoLinkThree);
    $("#third-article-photo").append(newImgThree);
    $("#third-article").append("<p data-id='" + data[2]._id + "'>" + data[2].title + "<br />" + data[2].link + "</p>")


    // article Four
    var articleFour = data[3].title;
    var idOne;
    var linkOne;
    var photoLinkFour = (data[23].photoLink);
    var newImgFour = $("<img>").attr("src", photoLinkFour);
    $("#fourth-article-photo").append(newImgFour);
    $("#fourth-article").append("<p data-id='" + data[3]._id + "'>" + data[3].title + "<br />" + data[3].link + "</p>")

    // article Five
    var articleFive = data[4].title;
    var idOne;
    var linkOne;
    var photoLinkFive = (data[24].photoLink);
    var newImgFive = $("<img>").attr("src", photoLinkFive);
    $("#fifth-article-photo").append(newImgFive);
    $("#fifth-article").append("<p data-id='" + data[4]._id + "'>" + data[4].title + "<br />" + data[4].link + "</p>")



    for (var i = 0; i < data.length; i++) {
      var loop =  data[i] 


    }



});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });

});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });


