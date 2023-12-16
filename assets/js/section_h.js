"use strict";

// Calendar Variables from the DOM
const hCalendar = document.querySelector('#hCalendar');

// Model Data

const hTitleRecipe = document.querySelector('.hTitleRecipe');
const hIngredientsRecipe = document.querySelector('.hIngredientsRecipe');
const hImageRecipe = document.querySelector('.hImageRecipe');
const hDayRecipe = document.querySelector('.hDayRecipe');
const hCountryRecipe = document.querySelector('.hCountryRecipe');
const hTypeRecipe = document.querySelector('.hTypeRecipe');
const hVeganRecipe = document.querySelector('.hVeganRecipe');

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
    const contentImage = data[recipeId].image_name || 'No content available for this door';
    const contentIngredients = data[recipeId].instructions || 'No content available for this door';
    const contentDay = data[recipeId].day || 'No content available for this door';
    const contentCountry = data[recipeId].country || 'No content available for this door';
    const contentType = data[recipeId].type || 'No content available for this door';
    let contentVegan = data[recipeId].vegan || 'No content available for this door';

    if (contentVegan == false) {
        contentVegan = 'No';
    } else {
        contentVegan = 'Yes';
    }

    // Display Data
    hTitleRecipe.innerHTML = `#${recipeId} ${contentTitle}`;
    hImageRecipe.setAttribute('src', `${contentImage}`);
    hDayRecipe.innerHTML = `<strong>Day</strong>: ${contentDay} | `;
    hCountryRecipe.innerHTML = `<strong>Country</strong>: ${contentCountry}  | `;
    hTypeRecipe.innerHTML = `<strong>Type</strong>: ${contentType}  | `;
    hVeganRecipe.innerHTML = `<strong>Vegan</strong>: ${contentVegan}  | `;
    hIngredientsRecipe.innerHTML = `<strong>Ingredients</strong><br>${contentIngredients}`;
}

// Fetch JSON data
async function hFetchCalendarData() {
    try {
        const response = await fetch('assets/data/section_h.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON data: ', error);
    }
}