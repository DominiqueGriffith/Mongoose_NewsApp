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

    //     for (var j = 0; j < loop[5]; j++) {
    //         console.log(loop[i])
    //     }
        // console.log(data[i].title)
        // console.log(data[i].link)


        //         console.log(data[0].title);
        //         console.log(data[1].title);
        //         console.log(data[2].title);
        //         console.log(data[3].title);
        //         console.log(data[4].title);

        //     var firstA = (data[0].title)

        // $(firstA).append("#first-article");

        // console.log(data[0].link);
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