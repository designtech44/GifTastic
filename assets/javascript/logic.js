// JavaScript Document

// Global Button variable
// Create array topics for games
var topics = ["Cats", "Siamese", "African Grey", "Amazon Parrot", "Macaw", "Cockatoo", "Jardine's Parrot", "Eclectus", "Conure", "Senegal Parrot", "Peregrine falcon", "Parakeet", "Persian", "Egyptian Mau", "Russian Blue"];


// Create the buttons for gaming buttons array.
function renderButtons() {
    // Empty the buttons panel in order to add the class, data, and each topic to the bittons
    $("#buttonPanel").empty();

    // Loop through the array of topics for the games
    for (var i = 0; i < topics.length; i++) {
        // Dynamicaly generate a button for each game in the array
        var button = $("<button>");
        button.addClass("gameButton");
        button.attr("data-game", topics[i]);
        button.text(topics[i]);

        // Add the button to the HTML page
        $("#buttonPanel").append(button);
    }
}

// ----- Event Handlers ----- //

// Create a click event function to trigger the AJAX Call
// the event.preventDefault() is used to prevent the event's default behavior.
// Here, it prevents the submit button from trying to submit a form when clicked
$("#add-game").on("click", function(event) {
    event.preventDefault();

    // Get the input from the input field
    var game = $("#game-input").val().trim();

    // The game text from the inputbox is then added to our topics array
    topics.push(game);
    $("#game-input").val("");

    // Add the gaming button to html page
    renderButtons();
});

//Generic function for capturing the game Gifs with the Giphy API from the data-attribute

function fetchGameGifs() {
    // Get the game name from the button clicked
    var gameName = $(this).attr("data-game");
    var gameStr = gameName.split(" ").join("+");

    // Construct the Giphy URL and set the response to 10 and set rating and topic
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gameStr + "&rating=pg-13&limit=10&api_key=ElpD6cJa9T70TeKQgYh4Y8SEu7cfa1o8";

    // Make the AJAX call to the Giphy API
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {

        // Get the data from the Ajax response and store the attributes in the html elements
        var dataArray = response.data;

        // Create and display div elements for each of the returned Gifs
        $("#gifPanel").empty();
        for (var i = 0; i < dataArray.length; i++) {
            var newDiv = $("<div>");
            newDiv.addClass("gameGif");

            var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
            newDiv.append(newRating);

            var newImg = $("<img>");
            newImg.attr("src", dataArray[i].images.fixed_height_still.url);
            newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
            newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
            newImg.attr("data-state", "still");
            newDiv.append(newImg);

            // Append the new Gifs to the gifPanel
            $("#gifPanel").append(newDiv);
        }
    });
}

// Create a function to animate the still game giphys when clicked and vice versa
function animateGameGif() {
    // The image state will be either "still" or "animated"
    var state = $(this).find("img").attr("data-state");

    // Make the game giphy either animated or still depending on the "data-state" value
    if (state === "still") {
        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        $(this).find("img").attr("data-state", "animate");
    } else {
        $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        $(this).find("img").attr("data-state", "still");
    }
}

//Render the initial game buttons when the HTML has finished loading
$(document).ready(function() {
    renderButtons();
});

//Add event click handler for the game buttons to apply the appropriate giphys
$(document).on("click", ".gameButton", fetchGameGifs);

//Add event click handler to make the giphy image animate and stop
$(document).on("click", ".gameGif", animateGameGif);
