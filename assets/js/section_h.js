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

function hCalendarDoors() {
    for (let i = 1; i <= 31; i++) {
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
}

hCalendarDoors();

// Add Event Listener to Display Recipe

function hCellsListeners() {
    const doors = document.querySelectorAll('.door');
    doors.forEach((door, index) => {
        door.addEventListener('click', () => {
            const recipeId = `${index}`;
            hDisplayModal(recipeId);
        });
    });
}

hCellsListeners();

// Display JSON Data
async function hDisplayModal(recipeId) {
    const data = await hFetchCalendarData();

    // Prepare Data
    const contentTitle = data[recipeId].name || 'No content available for this door';
    const contentImage = data[recipeId].image_url || 'No content available for this door';
    const contentIngredients = data[recipeId].ingredients || 'No content available for this door';
    const contentInstructions = data[recipeId].instructions || 'No content available for this door';
    const contentCountry = data[recipeId].country || 'No content available for this door';

    // Display Data
    hTitleRecipe.innerHTML = `${contentTitle}`;
    hImageRecipe.setAttribute('src', `${contentImage}`);
    hCountryRecipe.innerHTML = `${contentCountry}`;

    let ingredientsHtml = '<h4>Ingredients</h4><ul>';
    contentIngredients.forEach((ingredient) => {
        ingredientsHtml += `<li>${ingredient}</li>`;
    });
    ingredientsHtml += '</ul>';
    hIngredientsRecipe.innerHTML = ingredientsHtml;

    let instructionsHtml = '<h4 class="text-justify">Instructions</h4>';
    contentInstructions.forEach((ingredient) => {
        instructionsHtml += `<p>${ingredient}</p>`;
    });
    hInstructionsRecipe.innerHTML = instructionsHtml;
}

// Fetch JSON data
async function hFetchCalendarData() {
    try {
        const response = await fetch('assets/data/recipies_food.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON data: ', error);
    }
}