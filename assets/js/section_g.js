"use strict";

/**
 * This function integrates EmailJS to send an email from a contact form. 
 * It prevents the default form submission event, constructs the email data 
 * from the form inputs, and sends it using EmailJS. It also handles the 
 * response or error from the EmailJS API and updates the UI accordingly.
 * 
 * @param {HTMLFormElement} contactForm - The form element containing email data.
 * @param {Event} event - The form submission event.
 */
function sendMail(contactForm, event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Sending the email using EmailJS API
    emailjs.send("service_esx4qk2", "template_lz29zt7", {
        "from_name": contactForm.from_name.value,
        "emailaddress": contactForm.emailaddress.value,
        "the_subject": contactForm.the_subject.value,
        "the_idea": contactForm.the_idea.value,
    }).then(
        function (response) {
            // Log success message
            console.log('Success', response);

            // Display success message on the frontend
            const successAlert = document.querySelector('#email_sent');
            successAlert.innerHTML = `
                <div class="alert alert-success alert-dismissible text-center" role="alert" tabindex="-1">
                    <div>Your email has been sent successfully we'll be in touch with you shortly!</div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            successAlert.focus();

            // Disable the send button as a form of defensive programming
            const disableSendButton = document.querySelector('#send_button');
            disableSendButton.disabled = true;
            disableSendButton.innerHTML = 'Message Sent!';
        },
        function (error) {
            // Log error message
            console.log('Failed', error);

            // Display error message on the frontend
            const errorAlert = document.querySelector('#email_sent');
            errorAlert.innerHTML = `
                <div class="alert alert-danger alert-dismissible text-center" role="alert" tabindex="-1">
                    <div>STATUS: ${error.status} and ERROR: ${error.text}</div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            errorAlert.focus();

            // Disable the send button as a form of defensive programming
            const disableSendButton = document.querySelector('#send_button');
            disableSendButton.disabled = true;
            disableSendButton.innerHTML = 'Ups something failed! Refresh your page!';
        }
    );
}