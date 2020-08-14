// AJAX Function 



function getAllArticles() {

    $.getJSON("/articles", function (data) {
        console.log(JSON.stringify(data));
        
        for (var i = 0; i < data.length; i++) {

            console.log(data[i].title);
            console.log(data[i].link);
            console.log(data[i].photoLink);

        }


    });

}

getAllArticles();