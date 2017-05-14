var gifTastic = {
    wordbank: [],
    createButtons: function(){
        var htmlString = ""
        for(var i = 0; i < wordBank.length; i++){
            htmlString += "<button class=\"option\" data-query=\"" + wordBank[i] + "\">" + wordBank[i] + "</button>"
        }
        $("#word-bank").html(htmlString);
    },
    addOption: function(val){

    },
    runQuery: function(){

    }
}