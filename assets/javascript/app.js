var currentChoice = "";

var gifTastic = {
    wordBank: ["luis suarez", "steven gerrard", "philippe coutinho", "roberto firmino"],
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
        var str = val//.replace(" ", "+");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + str + "&limit=10&api_key=dc6zaTOxFJmzC";

        $.ajax({
        url: queryURL,
        method: 'GET'
        }).done(function(response) {
            currentChoice = response;
            gifTastic.pushImgs()
        });
    },
    pushImgs: function(){
        var str = "";
        for(var i = 0; i < currentChoice.data.length; i++){
            // Iterate through the images array and then place in to the html containers on the index.html page
            str = str + "<div class=\"image-container\"><div class=\"rating\">Rating: " + currentChoice.data[i].rating + "</div>";
            str = str + "<a href=\"#\" id=\"click\" data-index=\"" + i + "\" data-animated=\"no\"><img class=\"image\"  src=\"" + currentChoice.data[i].images.fixed_height_still.url + "\" /></a></div>"
        }

        $("#images").html(str);
    }
}

$(document).ready(function(){
    
    gifTastic.createButtons();

    $("#submit").on("click", function(e){
        e.preventDefault();
        var input = $("#input").val();
        gifTastic.addOption(input);
    })

    $(".option").on("click", function(e){
        e.preventDefault();
        var val = $(this).data("query");
        gifTastic.runQuery(val);
    })

    $("#images").on("click", "#click", function(e){
        e.preventDefault();
        var index = $(this).data("index");
        var animated = $(this).data("animated");
        if(animated === "no") {
            $(this).find(".image").attr("src", currentChoice.data[index].images.fixed_height.url);
            $(this).data("animated", "yes");
        } else {
            $(this).find(".image").attr("src", currentChoice.data[index].images.fixed_height_still.url);
            $(this).data("animated", "no");
        }
    })

})

