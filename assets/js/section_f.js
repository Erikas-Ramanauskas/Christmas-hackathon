"use strict";

// Define FAQ container element variable in the DOM.
const faqCard = document.querySelector('#faqJson');

/**
 * Asynchronously fetches FAQ data from a JSON file.
 * This function tries to fetch FAQ data from 'assets/data/faq.json'.
 * In case of an error during fetching, it logs the error to the console.
 * 
 * @async
 * @returns {Promise<Array>} A promise that resolves to the array of FAQ data.
 */
async function fetchFaqData() {
    try {
        const response = await fetch('assets/data/faq.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON data: ', error);
    }
}

/**
 * Asynchronously fetches and displays FAQ content on the page.
 * This function calls 'fetchFaqData' to retrieve FAQ data and then iterates 
 * over the data to create and append HTML content for each FAQ item 
 * to the 'faqCard' element in the DOM.
 *
 * @async
 */
async function displayFaqContent() {
    const data = await fetchFaqData();

    for (let i = 0; i < data.length; i++) {
        const content = data[i] || {
            question: 'No question available',
            answer: 'No answer available'
        };

        faqCard.innerHTML += `<div id="faqCard" class="row card m-2">
        <button id="question${content.id}" class="btn btn-primary card-header border-0 faq-question" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapse${content.id}" aria-expanded="false" aria-controls="#collapse${content.id}">
        ${content.id}. ${content.question}</button>
    <div class="col-12">
        <div class="collapse multi-collapse" id="collapse${content.id}">
            <div class="card-body faq-answer">
            ${content.answer}
            </div>
        </div>
    </div>
    </div>`;
    }
}

displayFaqContent();

// FAQ Button Toggle

const seeAllButton = document.querySelector('#faqButton')
seeAllButton.textContent = 'Open All'
let buttonState = 0;

seeAllButton.addEventListener('click', () => {

    if (buttonState === 0) {
        seeAllButton.textContent = 'Close All';
        buttonState = 1;

        seeAllButton.classList.remove('btn-primary')
        seeAllButton.classList.add('btn-danger')

    } else if (buttonState === 1) {
        seeAllButton.textContent = 'Open All';
        buttonState = 0;

        seeAllButton.classList.remove('btn-danger')
        seeAllButton.classList.add('btn-primary')
    }
})