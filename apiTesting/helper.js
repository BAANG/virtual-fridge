// import axios from "axios"

//65fdffe480f1407ea6a4a3b80c3df511

var link = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=bread,+lettuce,+chicken&apiKey=65fdffe480f1407ea6a4a3b80c3df511";

$.ajax({
    url: link,
    method: "GET"
})
    .then(function(response) {
        console.log(response);
    })

// console.log(result);