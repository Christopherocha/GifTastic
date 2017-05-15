var currentChoice = "";

var gifTastic = {
    wordBank: ["luis suarez", "steven gerrard", "philippe countinho", "roberto firmino"],
    createButtons: function(){
        var htmlString = ""
        for(var i = 0; i < this.wordBank.length; i++){
            htmlString += "<button class=\"option\" data-query=\"" + this.wordBank[i] + "\">" + this.wordBank[i] + "</button>"
        }
        $("#word-bank").html(htmlString);
    },
    addOption: function(val){
        this.wordBank.push(val);
        this.createButtons();
    },
    runQuery: function(val){
        var str = val.replace(" ", "+");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + str + "&limit=10&api_key=dc6zaTOxFJmzC";

        $.ajax({
        url: queryURL,
        method: 'GET'
        }).done(function(response) {
            currentChoice = response;
            this.pushImgs()
        });
    },
    pushImgs: function(){
        var str = "";
        for(var i = 0; i < currentChoice.length; i++){
            // Iterate through the images array and then place in to the html containers on the index.html page
            str = str + "<div class=\"image-container\"><div class\"rating\">Rating: " + currentChoice[i].rating + "</div>";
            str = str + "<img class\"image\" src=\"" + currentChoice[i].images.fixed_height_still.url + " /></div>"
        }

        $("#images").html(str);
    }
}

$(document).ready(function(){
    
    gifTastic.createButtons();

    $("#submit").on("click", function(e){
        e.preventDefault
        var input = $("#input").val();
        gifTastic.addOption(input);
    })

})

