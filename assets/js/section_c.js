"use strict";

function cHandleRecipeForm(){
  let recipeForm = document.getElementById("form-recipe");
  recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let title = recipeForm.elements["title"].value
    let ingredients = recipeForm.elements["ingredients"].value
    let instructions = recipeForm.elements["instructions"].value
    console.log(title);
    console.log(ingredients);
    console.log(instructions);
  });
}


cHandleRecipeForm();