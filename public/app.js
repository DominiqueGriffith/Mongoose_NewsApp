// getJSON Function 



// function getAllArticles() {

$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {
        
        console.log(data[i].title)

    }

    // console.log(data[329].title);
    // console.log(data[330].title);
    // console.log(data[331].title);
    // console.log(data[332].title);

    // console.log(data[136].title);


    // console.log(data[i].link);
    // console.log(data[i].photoLink);




});

// }

// getAllArticles();