function Validate() {

    event.preventDefault();

    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;

    if(username.length==0) {
        alert("Please enter username.");
        return false;
    }

    else if (password.length==0) {
        alert("Please enter password.");
        return false;
    }

    validateSignIn();
    return true;

}

function validateSignIn() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var notification = document.getElementById("notificationcheck");

    // Check if the user exists in localStorage
    var storedData = localStorage.getItem(username);

    if (storedData) {
        // If user data exists, parse the stored data
        var userData = JSON.parse(storedData);

        // Compare the entered password with the stored one
        if (userData.password === password) {
            // If the notification preference has changed, update it
            if (userData.notifications !== notification.checked) {
                // Update the stored user data with the new notification preference
                userData.notifications = notification.checked;
                localStorage.setItem(username, JSON.stringify(userData)); // Save updated data
            }

            alert("Sign-in successful! Welcome, " + username);

            // Redirect based on notification preference
            if (notification.checked) {
                window.location.href = "premium.html"; // Redirect to premium page if checkbox is ticked
            } else {
                window.location.href = "index.html"; // Redirect to index page if checkbox is not ticked
            }
        } else {
            alert("Incorrect password. Please try again.");
        }
    } else {
        alert("Username not found. Please sign up first.");
    }
}
