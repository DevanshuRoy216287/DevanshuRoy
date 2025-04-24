function Validate() {

    var username=document.getElementById("username").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;

    if(username.length==0) {
        alert("Please provide username.");
        return false;
    }

    else if (username.length<=2) {
        alert("Username cannot have less than or equal to 2 characters.");
        return false;
    }
    
    else if (username.length>=10) {
        alert("Username cannot have more than 10 characters");
        return false;
    }

    else if (!email.match("gmail.com") && !email.match("outlook.com") && !email.match("yahoo.com") && !email.match("hotmail.com")) {
        alert("Please enter a valid email address");
        return false;
    }

    else if(password.length==0) {
        alert("Please provide a valid password");
        return false;
    }

    else if (password.length<=5) {
        alert("Password must have at least 6 characters");
        return false;
    }

    saveData();
    openPage();
    return true;

}


function saveData() {
    // Retrieve user inputs
    var notification = document.getElementById("notificationcheck");
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Check if the username already exists in localStorage
    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose another one.");
        return false;
    }

    // Create an object to hold user data
    var newUser = {
        username: username,
        email: email,
        password: password,
        notifications: notification.checked
    };

    // Save user data in localStorage using the username as the key
    localStorage.setItem(username, JSON.stringify(newUser));

    // Provide feedback or update UI (Optional)
    alert("User registered successfully!");

    return true;

}

function test() {
    var container=document.getElementById("data");
    container.innerHTML+=`<p>Working</p>`;
}

function openPage() {

    var notification=document.getElementById("notificationcheck");

    if (notification.checked) {
        window.location.href="premium.html";
    }

    else {
        alert("Confirm: You dont want to avail benefits. U will not be able to see notifications and projects etc.");
        window.location.href="index.html";
    }

}
