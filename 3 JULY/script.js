function SendMail(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var params = {
        from_name: document.getElementById("name").value,
        name: document.getElementById("name").value,
        email_id: document.getElementById("email_id").value,
        phone_no: document.getElementById("phone_no").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_ih321y4", "template_jjxb75f", params)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Email sent successfully!");
            document.getElementById("contactForm").reset(); // Reset the form after successful submission
        }, function(error) {
            console.log('FAILED...', error);
            alert("Failed to send email. Please try again.");
        });

    return false; // Prevent the form from submitting
}