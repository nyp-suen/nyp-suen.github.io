let text = document.getElementById('text'); 
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');

const links = document.querySelectorAll("nav ul li a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        // Remove active class from all links
        links.forEach(function(link) {
            link.classList.remove("active");
        });
        
        // Add active class to the clicked link
        this.classList.add("active");
    });
});

document.querySelectorAll('nav ul li a').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
    });
});

document.getElementById('hamIcon').addEventListener('click', function(event) {
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.parallax img, .parallax h2');
    const delays = [0, 300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700]; 

    elements.forEach(function(element, index) {
        const delay = delays[index]; // Get delay from the array

        setTimeout(function() {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    });
});

function movePandaDown() {
    const panda = document.getElementById('panda');
    const currentTop = parseInt(window.getComputedStyle(panda).top, 10);
    panda.style.top = (currentTop + 130) + 'px';
}

// Call the function to move the panda down
movePandaDown();

window.addEventListener('scroll', function() {
    let value = window.scrollY;

    text.style.marginTop = (value * 2) + 'px';
    leaf.style.top = (value * -1.5) + 'px';
    hill5.style.left = (value * 1.5) + 'px';
    hill4.style.left = (value * -1.5) + 'px';
    hill1.style.top = (value * 1.5) + 'px';
});

// Target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const allpages = document.querySelectorAll(".page");

// Select all subtopic pages
console.log(allpages);
hideall();
show(1); 

function hideall() {
    // Function to hide all pages
    allpages.forEach(function(onepage) {
        // Go through all subtopic pages
        onepage.style.display = "none"; // Hide it
    });
}

function show(pgno) {
    // Function to show selected page no
    hideall();
    // Select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    // Show the page
    onepage.style.display = "block";
}

// Listen for clicks on the buttons, assign anonymous
// event handler functions to call show function
page1btn.addEventListener("click", function() { 
    show(1); 
});
page2btn.addEventListener("click", function() { 
    show(2); 
});
page3btn.addEventListener("click", function() {
    show(3); 
});
page4btn.addEventListener("click", function() {
    show(4); 
});

const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
let isMenuVisible = false; // Track menu visibility state

// Function to toggle menu visibility
function toggleMenu() {
    menuItemsList.classList.toggle("menuHide");
    isMenuVisible = !isMenuVisible; // Update menu visibility state
}

// Event listener for hamburger icon click
hamBtn.addEventListener("click", function() {
    toggleMenu();
});

// Function to check and apply menuHide class based on viewport width
function checkViewportWidth() {
    const viewportWidth = window.innerWidth;

    // Adjust menu visibility based on viewport width
    if (viewportWidth > 750) {
        menuItemsList.classList.remove("menuHide"); // Hide menu on wider screens
        isMenuVisible = false; // Update menu visibility state
    } else if (viewportWidth <= 750 && isMenuVisible) {
        menuItemsList.classList.add("menuHide"); // Show menu on narrower screens if currently visible
    }
}

// Initial check on page load
checkViewportWidth();

// Listen for resize events to adjust menu visibility dynamically
window.addEventListener("resize", function() {
    checkViewportWidth();
});

document.querySelectorAll('.question').forEach(function(question) {
    var answers = question.querySelectorAll('.answer');

    answers.forEach(function(answer) {
        answer.addEventListener('click', function () {
            // Unselect all other answers in the same question
            answers.forEach(function(ans) { ans.classList.remove('selected'); });

            // Select the current answer
            this.classList.add('selected');
            
            var radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
});

document.getElementById('checkAnswers').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    var questions = document.querySelectorAll('.question');
    var submitButton = document.getElementById('checkAnswers');
    var retryButton = document.getElementById('retryBtn');
    var correctAnswers = 0;

    // Calculate the number of correct answers
    questions.forEach(function(question) {
        var correctAnswer = question.getAttribute('data-correct');
        var selectedOption = question.querySelector('input[type="radio"]:checked');

        if (selectedOption && selectedOption.value === correctAnswer) {
            correctAnswers++;
        }
    });

    // Update the results
    var totalQuestions = questions.length;
    var resultsDiv = document.getElementById('results');

    // Clear previous results and add new ones
    resultsDiv.innerHTML = ''; // Clear previous content

    // Add Title
    var resultTitle = document.createElement('h2');
    resultTitle.textContent = 'Result';
    resultsDiv.appendChild(resultTitle);

    // Add result message
    var resultMessage = document.createElement('p');
    resultMessage.textContent = 'You got ' + correctAnswers + ' out of ' + totalQuestions + ' correct.';
    resultsDiv.appendChild(resultMessage);

    // Add additional paragraph
    var additionalMessage = document.createElement('p');
    additionalMessage.textContent = 'Thank you for participating in the quiz!';
    resultsDiv.appendChild(additionalMessage);

    // Hide all questions and the submit button
    questions.forEach(function(question) {
        question.style.display = 'none';
    });
    submitButton.style.display = 'none';

    // Show results div and the retry button
    resultsDiv.style.display = 'block';
    retryButton.style.display = 'inline-block';
});

document.getElementById('retryBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Clear all selections
    document.querySelectorAll('.answer').forEach(function(answer) {
        answer.classList.remove('selected');
    });

    document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
        radio.checked = false;
    });

    // Show all questions and the submit button
    document.querySelectorAll('.question').forEach(function(question) {
        question.style.display = 'block';
    });
    document.getElementById('checkAnswers').style.display = 'inline-block';

    // Clear results
    var resultsDiv = document.getElementById('results');
    var retryButton = document.getElementById('retryBtn');
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';
    retryButton.style.display = 'none';
});

let currentSlide = 1;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

slides.forEach(function(slide, i) {
    slide.classList.remove('active');
    slide.style.order = (i - index + totalSlides) % totalSlides;
});

    const middleIndex = (index + Math.floor(totalSlides / 2)) % totalSlides;
    slides[middleIndex].classList.add('active');

    // Adjust the order of slides for circular behavior
    for (let i = 0; i < totalSlides; i++) {
        slides[i].style.order = ((i - currentSlide + totalSlides) % totalSlides) + 1;
    }
}

function prevSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
    showSlide(currentSlide);
}

function nextSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
    showSlide(currentSlide);
}

// Initialize the first slide
showSlide(currentSlide);

const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

if (document.documentElement.requestFullscreen) {
    // Function to enter fullscreen mode
const enterFullscreen = function() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
};

// Function to exit fullscreen mode
const exitFullscreen = function() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
};

// Add event listeners and other logic here
document.getElementById('fullscreen-button').addEventListener('click', function() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
});
}