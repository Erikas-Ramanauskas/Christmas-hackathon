"use strict";

// EmailJS Integration
function sendMail(contactForm, event) { // from id="contactForm"
    event.preventDefault();

    // API interaction
    emailjs.send("service_esx4qk2", "template_lz29zt7", {
        "from_name": contactForm.from_name.value,
        "emailaddress": contactForm.emailaddress.value,
        "the_subject": contactForm.the_subject.value,
        "the_idea": contactForm.the_idea.value,

    }).then( // Promise
        function (response) {
            console.log('Success', response);

            // Frontend Success Message
            const successAlert = document.querySelector('#email_sent')
            successAlert.innerHTML = `
        <div class="alert alert-success alert-dismissible text-center" role="alert" tabindex="-1">
            <div>Your email has been sent successfully we'll be in touch with you shortly!</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
            const focusSuccessAlert = document.querySelector('.alert')
            focusSuccessAlert.focus()
            
            // Defensive Programming
            const disableSendButton = document.querySelector('#send_button')
            disableSendButton.disabled = 'true'
            disableSendButton.innerHTML = 'Message Sent!'
        },
        function (error) {
            console.log('Failed', error);

            // Frontend Error message
            const errorAlert = document.querySelector('#email_sent')
            errorAlert.innerHTML = `<div class="alert alert-danger alert-dismissible text-center" role="alert" tabindex="-1">
       <div>STATUS: ${error.status} and ERROR: ${error.text}</div>
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>`;
            const focusErrorAlert = document.querySelector('.alert')
            focusErrorAlert.focus()

            // Defensive Programming
            const disableSendButton = document.querySelector('#send_button')
            disableSendButton.disabled = 'true'
            disableSendButton.innerHTML = 'Ups something failed! Refresh your page!'
        }
    );
}