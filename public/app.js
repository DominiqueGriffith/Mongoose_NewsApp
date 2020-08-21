

getAllArticles()

function getAllArticles() {

$.getJSON("/articles", function (data) {
    
    for (var i = 0; i < data.length; i++) {
        // var loop = data[i]
        console.log(data[i])
        if (data[i]._id && data[i].photoLink) {
            var newDiv = $("<div>");

            var photoLink = (data[i].photoLink);
            var newImg = $("<img>").attr("src", photoLink);
            
            $(newDiv).append(newImg);
            var bR = $("<br>");
            $(newDiv).append(bR)
          
            $("#articles").append(newDiv);


        }
        if (data[i]._id && data[i].title || data[i].link) {
            var newDivTwo = $("<div>");
            var idLink = $("<a href ='" + "https:/www.economist.com/"  + data[i].link + "'>" + "Article Link" + "</a>"); 
            // $(newDivTwo).append(idLink);
            console.log("This is the Link" + idLink);
            $(newDivTwo).append(idLink);
            var newTitle = $("<p style=cursor:pointer data-id='" + data[i]._id + "'>").text(data[i].title);
            $(newDivTwo).append(newTitle)
            $("#articles-two").append(newDivTwo);
            
        }
        
     
    }
});

}






// // Whenever someone clicks a p tag
$(document).on("click", "p", function () {
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
        .then(function (data) {
            console.log("ONE " + data);

            console.log("TWO " + data.title);
            console.log("THREE " + thisId);
            // The title of the article
            $("#notes").append("<h2>" + "Add Note for " + data.title + "</h2>");
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

// // When you click the savenote button
$(document).on("click", "#savenote", function () {
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
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

// When you click the savenote button

$(document).on("click", "#newarticles", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function(){
    getAllArticles()
    location.reload();

});
});



