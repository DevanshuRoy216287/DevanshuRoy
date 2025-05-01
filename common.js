document.addEventListener('DOMContentLoaded', function() {
    // Loading and sidebar logic
    const loadingOverlay = document.getElementById('loadingOverlay');
    const content = document.querySelector('.content');
    const sidebar = document.getElementById('sidebar');
    const surveyButton = document.getElementById('surveyButton');
    const iframeContainer = document.getElementById('Iframe');

    // Ensure sidebar and survey iframe are closed on page load
    if (sidebar) sidebar.classList.remove('open');
    if (iframeContainer) iframeContainer.style.display = 'none';

    // Timeout to hide the loading overlay and show the content
    setTimeout(function() {
        loadingOverlay.style.display = 'none';
        content.style.display = 'flex';
        document.body.classList.remove('loading');
    }, 2000);

    document.body.classList.add('loading');

    // Toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('open');
    }

    // Toggle dropdown menu
    function toggleDropdown() {
        document.getElementById('dropdownContent').classList.toggle('show');
    }

    // Toggle survey iframe
    function toggleIframe() {
        iframeContainer.style.display = (iframeContainer.style.display === 'block') ? 'none' : 'block';
    }

    surveyButton.addEventListener('click', toggleIframe);

    window.toggleSidebar = toggleSidebar;
    window.toggleDropdown = toggleDropdown;

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const itemsList = document.getElementById('itemsList');
    const items = itemsList.getElementsByTagName('li');

    function searchItems() {
        const input = searchInput.value.toLowerCase().trim();

        // Show all items if input is empty
        if (!input) {
            for (let item of items) item.style.display = '';
            itemsList.style.border = 'solid 0.5px rgb(191, 191, 191)';
            return;
        }

        let found = false;
        for (let item of items) {
            const text = item.textContent || item.innerText;
            if (text.toLowerCase().includes(input)) {
                item.style.display = '';
                found = true;
            } else {
                item.style.display = 'none';
            }
        }

        itemsList.style.border = found ? 'solid 0.5px rgb(191, 191, 191)' : 'none';
    }

    // Search in real-time while typing
    searchInput.addEventListener('input', searchItems);

    // Ensure search works when search button is clicked
    searchButton.addEventListener('click', searchItems);

    // Show list when input is focused
    searchInput.addEventListener('focus', () => {
        itemsList.classList.add('show');
        searchItems(); // Ensure items are visible when focused
    });

    // Hide list when clicking outside
    window.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !itemsList.contains(event.target) && !searchButton.contains(event.target)) {
            itemsList.classList.remove('show');
            itemsList.style.border = 'none';
            for (let item of items) item.style.display = 'none';
        }
    });

    // Slideshow functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    let slideInterval;

    function showSlide(index) {
        clearInterval(slideInterval);
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
            setTimeout(() => slide.style.opacity = i === index ? "1" : "0", 10);
            dots[i].classList.toggle("active", i === index);
        });
        currentSlide = index;
        setTimeout(() => slideInterval = setInterval(nextSlide, 3000), 5000);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    slideInterval = setInterval(nextSlide, 3000);
    dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
    showSlide(0);
});

function seeMore(option) {
    if (option === 0) {
        alert("Full portfolio is accessible as a premium feature. Sign up or sign in to an existing account, to access.");
        setTimeout(function() {
            window.location.href = "sign-in.html";
        }, 500); // Redirect after 5 seconds
    } else if (option === 1) {
        window.location.href = "portfolio-premium.html"; // Redirect immediately
    }
}

function updateTimeSent() {
    const timeElements = document.querySelectorAll('.time-sent'); // Get all elements with class "time-sent"
    const today = new Date(); // Get current date
    console.log("Today's Date:", today.toISOString().split('T')[0]); // Print today's date

    timeElements.forEach(element => {
        const pastDate = new Date(element.textContent.trim()); // Get date from <p> and convert to Date object
        if (isNaN(pastDate)) return; // Skip if the date is invalid

        const differenceInTime = today - pastDate; // Difference in milliseconds
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Convert to days

        element.textContent = differenceInDays === 0 ? "Today" : `${differenceInDays} days ago`; // Update text
    });
}

updateTimeSent(); // Run function on page load

let votes = {
    guitar: 25,
    piano: 15,
    violin: 10,
    drums: 10,
    indian: 35,
    other: 5
};

let userSelectedOption = null;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".percentage").forEach(percent => {
        percent.style.opacity = "0"; // Hide percentage text initially
    });

    // Set initial bar background (white) with 0% blue fill
    document.querySelectorAll(".poll-bar").forEach(bar => {
        bar.style.width = "0%"; // Start from 0 width
        bar.style.backgroundColor = "#f0f0f0"; // Light gray (empty bar)
    });
});

function selectPoll(option) {
    // Show percentage text once a user clicks
    document.querySelectorAll(".percentage").forEach(percent => {
        percent.style.opacity = "1"; // Show percentages
    });

    if (userSelectedOption === option) return;

    if (userSelectedOption !== null) {
        votes[userSelectedOption] = Math.max(votes[userSelectedOption] - 1, 0);
    }

    votes[option] += 1;
    userSelectedOption = option;

    // Reset all selections
    document.querySelectorAll(".custom-radio").forEach(radio => {
        radio.style.backgroundColor = "transparent";
        radio.classList.remove("selected");
        let img = radio.querySelector("img");
        if (img) {
            img.style.display = "none";
        }
    });

    // Highlight selected radio
    const selectedRadio = document.getElementById(`${option}-radio`);
    selectedRadio.style.backgroundColor = "#4CAF50";
    selectedRadio.querySelector("img").style.display = "block";
    selectedRadio.classList.add("selected");

    // Update bars and percentages with animation
    Object.keys(votes).forEach(key => {
        let widthPercentage = Math.min((votes[key] / 100) * 100, 100);
        let bar = document.getElementById(`${key}-bar`);
        
        bar.style.transition = "width 1s ease-in-out"; // Smooth animation
        bar.style.width = widthPercentage + "%"; // Gradually increase width
        bar.style.backgroundColor = "#2196F3"; // Fill color blue

        document.getElementById(`${key}-percent`).textContent = votes[key]; 
    });
}

document.getElementById("send").addEventListener("click", function () {
    document.getElementById("Community-respond").value = ""; // Clear input box
});

function moreUpdates(number) {
    if (number==0) {
        alert("All updates are accessible as a premium feature. Sign up or sign in to an existing account, to access.");
        setTimeout(function() {
            window.location.href = "sign-in.html";
        }, 500); // Redirect after 5 seconds
    }

    else if (number==1) {
        window.location.href = "community.html"; // Redirect immediately
    }

    else {
        alert("Something went wrong. Please try again.");
    }
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    const offset = 50; // Adjust this value if needed (for headers/margins)
    
    if (section) {
        window.scrollTo({
            top: section.offsetTop - offset,
            behavior: "smooth"
        });
    }
}
