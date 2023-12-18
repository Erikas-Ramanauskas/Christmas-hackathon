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

        faqCard.innerHTML += `<div class="faqCard row card m-2">
        <button id="question${content.id}" class="btn card-header border-0 faq-question collapsed" type="button" data-bs-toggle="collapse"
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