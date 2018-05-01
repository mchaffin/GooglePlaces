// Initial array of movies
var buttonArr = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

// Function for displaying movie data
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#search-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < buttonArr.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("searchButton");

        a.attr("id", "thebutton");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", buttonArr[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(buttonArr[i]);
        // Adding the button to the HTML
        $("#search-view").append(a);
    }
}

 function searchGooglePlaces(searchString) {
    //var searchString = searchString;
    // Constructing a queryURL using the search term   
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
    searchString + "&key=AIzaSyD0QSfHIgzXIakE7DMJpdq18X6A8X4OHy4";

    // Performing an AJAX request with the queryURL
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // After data comes back from the request
    .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.results;


        for (var j = 0; j < results.length; j++){
            var result = results[j];
            var placeDiv = $("<div class='card'>");
            //adds image
            placeDiv.append("<div class='card-image'><img src='" + result.photos[0] + "' alt='place image'></div>");
            //adds name and type
            placeDiv.append("<header class='card-header'><p class='card-header-title'>" + result.name + "</p><p class='title is-6'>" + result.types);
            //adds other content
            placeDiv.append("<div class='card-content'><div class='content'>Rating: " + result.rating + "<br>Address: " + result.formatted_address + "<br><a href='" + result.website + "'>Website</a></div></div>");
            $("#google-places-here").append(placeDiv);
            console.log("Getting Gere");
        }

    //     // Looping through each result item
    //     for (var i = 0; i < results.length; i++) {

    //     // Creating and storing a div tag
    //     var gplacesDiv = $("<div>");

    //     // Creating a paragraph tag with the result item's rating
    //     var p = $("<p>").text("Rating: " + results[i].rating);

    //     // Creating and storing an image tag
    //     var giphyImage = $("<img>");
    //     // Setting the src attribute of the image to a property pulled off the result item
    //     giphyImage.attr("src", results[i].images.fixed_height.url);

    //     // Appending the paragraph and image tag to the animalDiv
    //     gplacesDiv.append(p);
    //     gplacesDiv.append(giphyImage);

    //    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
    //     $("#google-places-here").prepend(gplacesDiv);
        //console.log("Getting Gere");
       // }
    });    
 }

 $(function() {
// This function handles events where one button is clicked
$("#search-button").on("click", function() {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var newButton = $("#search-input").val().trim();
    // The movie from the textbox is then added to our array
    buttonArr.push(newButton);
    // calling renderButtons which handles the processing of our movie array
    renderButtons();
    // sarchGiphy with newButton value
    searchGooglePlaces(newButton);
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

 // Adding click event listen listener to search button class
$(".container").on("click", ".searchButton", function() {
    // Grabbing and storing the data-animal property value from the button
    //var animal = $("#search-input").val().trim();
    var searchButton = $(this).attr("data-name");
    console.log(searchButton);
    console.log("getting here");
    searchGooglePlaces(searchButton);

});
});
