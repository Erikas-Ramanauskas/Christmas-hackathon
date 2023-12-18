"use strict";

// Calendar Variables from the DOM
const hCalendar = document.querySelector('#hCalendar');

// Model Data

const hTitleRecipe = document.querySelector('.hTitleRecipe');
const hIngredientsRecipe = document.querySelector('.hIngredientsRecipe');
const hInstructionsRecipe = document.querySelector('.hInstructionsRecipe');
const hImageRecipe = document.querySelector('.hImageRecipe');
const hCountryRecipe = document.querySelector('.hCountryRecipe');

// Calendar Doors

function hCalendarDoors(calendarContent) {
    for (let i = 1; i <= calendarContent.length; i++) {
        const door = document.createElement('div');
        door.setAttribute('type', 'button');
        door.setAttribute('class', 'btn btn-primary');
        door.setAttribute('data-bs-toggle', 'modal');
        door.setAttribute('data-bs-target', '#staticBackdrop');
        door.classList.add('m-1', 'door')
        door.id = `door${i}`;
        door.innerHTML = i;
        hCalendar.appendChild(door);
    }
    hCellsListeners(calendarContent);
}

function hCellsListeners(calendarContent) {
    const doors = document.querySelectorAll('.door');
    doors.forEach((door) => {
        door.removeEventListener('click', handleDoorClick);
        door.addEventListener('click', handleDoorClick);
    });

    function handleDoorClick() {
        const recipeId = this.id.replace('door', '') - 1;
        displayCalendarContent(calendarContent, recipeId);
    }
}

function displayCalendarContent(calendarContent, recipeId) {
    // Prepare Data
    console.log(`My IDs start from: ${recipeId}`);
    const contentTitle = calendarContent[recipeId].name || 'No content available for this door';
    const contentImage = calendarContent[recipeId].image_url || 'No content available for this door';
    const contentIngredients = calendarContent[recipeId].ingredients || 'No content available for this door';
    const contentInstructions = calendarContent[recipeId].instructions || 'No content available for this door';
    const contentCountry = calendarContent[recipeId].country || 'No content available for this door';

    // Display Data
    hTitleRecipe.innerHTML = `${contentTitle}`;
    hTitleRecipe.setAttribute('title', `${contentTitle}`); // Setting the title attribute for tooltip
    hImageRecipe.setAttribute('src', `${contentImage}`);
    hCountryRecipe.innerHTML = `${contentCountry}`;

    let ingredientsHtml = '<h4 class="recipe-subtitle">Ingredients</h4><ul>';
    contentIngredients.forEach((ingredient) => {
        ingredientsHtml += `<li>${ingredient}</li>`;
    });
    ingredientsHtml += '</ul>';
    hIngredientsRecipe.innerHTML = ingredientsHtml;

    let instructionsHtml = '<h4 class="recipe-subtitle">Instructions</h4>';
    contentInstructions.forEach((ingredient) => {
        instructionsHtml += `<p class="text-justify">${ingredient}</p>`;
    });
    hInstructionsRecipe.innerHTML = instructionsHtml;
}

// Sharing Buttons

document.getElementById('share-twitter').addEventListener('click', function () {
    const shareUrl = 'https://twitter.com/?lang=en';

    // Construct the Twitter sharing URL with the appropriate parameters
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;

    window.open(twitterShareUrl, '_blank');
});

// Get the sharing button element within the modal
const shareFacebook = document.querySelector('#share-facebook');
const shareTwitter = document.querySelector('#share-twitter');
const shareInstagram = document.querySelector('#share-instagram');
const copyLinkButton = document.getElementById('copyLinkButton');

// Add a click event listener to the sharing button
shareFacebook.addEventListener('click', function () {
    const recipeUrl = 'https://erikas-ramanauskas.github.io/Christmas-hackathon/';
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`;
    window.open(facebookShareUrl, '_blank');
});

shareTwitter.addEventListener('click', function () {
    const recipeUrl = 'https://erikas-ramanauskas.github.io/Christmas-hackathon/';
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(recipeUrl)}`;
    window.open(twitterShareUrl, '_blank');
});

shareInstagram.addEventListener('click', function () {
    // Provide instructions or a message guiding users to share on Instagram manually
    alert("To share on Instagram, please open the Instagram app and share this content.");
});