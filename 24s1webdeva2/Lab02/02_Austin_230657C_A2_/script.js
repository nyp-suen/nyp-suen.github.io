/* jshint esversion: 6 */

// Function helpers
// Create a function to securely pass into the forloop of add listeners
function CreateChangeSlideListener(index) {
    return function () { ChangeSlide(index); };
}
function CreateSlideScrollingFunction(index) {
    return function(e) {
        e.preventDefault();
        document.querySelector(slideButtons[index].getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
    };
}
function CreateCardAnimTimeoutFunction(card) {
    return function() {
        card.style.transitionDelay = "0s";
    };
}       
function CreateCardEnterFunction(index) {
    return function () { introCards[index].classList.add("card_hover"); };
}
function CreateCardLeaveFunction(index) {
    return function () { introCards[index].classList.remove("card_hover"); };
}
function CreateCardClickFunction(index) {
    return function () {
        // Individual links
        // Grand
        if (introCards[index].classList.contains("card1")) {
            window.open("https://en.wikipedia.org/wiki/Grand_Piano_(disambiguation)");
        }
        // Upright
        else if (introCards[index].classList.contains("card2")) {
            window.open("https://en.wikipedia.org/?title=Upright_piano&redirect=no");
        }
        // Digital
        else if (introCards[index].classList.contains("card3")) {
            window.open("https://en.wikipedia.org/wiki/Digital_piano");
        }
    };
}
function CreateTimePeriodClickFunction(index) {
    return function() {
        UpdateTimePeriodDisplay(index);
    };
}
function CreateKeyClickFunction(index) {
    return function() {
        // Play the audio based on the key index that is pressed
        PlayNote(index);
    };
}

// Title slideshow
// Changeing of slides
var currentSlide = 0;
var slides = document.querySelectorAll(".title_slide");
var navLinks = document.querySelectorAll(".nav_links ul li");
ChangeSlide(currentSlide);

function NextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) { currentSlide = 0; }
    ChangeSlide(currentSlide);
}
function PreviousSlide() {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    ChangeSlide(currentSlide);
}
function ChangeSlide(slideNum) {
    // Update slide display
    currentSlide = slideNum;
    // Toggle off all existing slide displays
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    // Display the selected slide
    slides[currentSlide].style.display = "block";

    // Update navigation links
    // Toggle off al; existing navigation bars
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("nav_link_active");
    }

    // Add the active class to the current active page
    navLinks[currentSlide].classList.add("nav_link_active");
}

// Navs click
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", CreateChangeSlideListener(i));
}

var prevSlideBtn = document.querySelector(".large_title_screen .prev_slide_button");
var nextSlideBtn = document.querySelector(".large_title_screen .next_slide_button");
prevSlideBtn.addEventListener("click", PreviousSlide);
nextSlideBtn.addEventListener("click", NextSlide);

// When user presses the start button on each slide
var slideButtons = document.querySelectorAll(".btn.slide_button");
for (let i = 0; i < slideButtons.length; i++) {
    slideButtons[i].addEventListener("click", CreateSlideScrollingFunction(i));  
}

// Section transitions
var documentObserver = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
            // Element entered the screen
            // Individual scroll animation
            if (entries[i].target.className == "section_title") {
                // Title for each section
                entries[i].target.classList.add("animate");
            }
            else if (entries[i].target.className == "sub_content") {
                entries[i].target.classList.add("animate");
            }
            else if (entries[i].target.className == "main_content" && entries[i].target.parentElement.className.includes("introduction_section")) {
                // Card flip animation
                let containers = entries[i].target.children;
                for (let j = 0; j < containers.length; j++) {
                    containers[j].querySelector(".card").classList.add("animate");

                    // Remove transition delay after animation is finished playing
                    let delay = getComputedStyle(containers[j].querySelector(".card")).transitionDelay;
                    setTimeout(CreateCardAnimTimeoutFunction(containers[j].querySelector(".card")), delay * 1000);
                }
            }
            else if (entries[i].target.className == "time_periods") {
                // Fade each display
                let displays = entries[i].target.children;
                for (let j = 0; j < displays.length; j++) {
                    displays[j].classList.add("animate");
                }
            }
            else if (entries[i].target.className == "interactive_piano") {
                pianoInView = true;
            }
        }
        else {
            // Element left the screen
            if (entries[i].target.className == "interactive_piano") {
                pianoInView = false;
            }
        }
    }
},
{
    threshold: 0.4, // element must be 40% inside the section for the animation to play
    root: document.body
}
);
// Sections to observe
var sectionTitles = document.querySelectorAll(".content_section .section_title");
var subContents = document.querySelectorAll(".sub_content");
var introCardContent = document.querySelector(".introduction_section.content_section .main_content");
var interactivePiano = document.querySelector(".interactive_piano");
var timePeriodDisplaysDiv = document.querySelector(".time_periods");
var pianoInView = false;

documentObserver.observe(interactivePiano);

for (let i = 0; i < sectionTitles.length; i++) {
    var sectionTitle = sectionTitles[i];
    documentObserver.observe(sectionTitle);
}
for (let i = 0; i < subContents.length; i++) {
    var subContent = subContents[i];
    documentObserver.observe(subContent);
}
documentObserver.observe(introCardContent);
documentObserver.observe(timePeriodDisplaysDiv);

// Intro card mouse inputs
var introCards = document.querySelectorAll(".card");
for (let i = 0; i < introCards.length; i++) {
    // Hover enter animation
    introCards[i].addEventListener("mouseenter", CreateCardEnterFunction(i));

    // Hover leave animation
    introCards[i].addEventListener("mouseleave", CreateCardLeaveFunction(i));

    // Clicked
    introCards[i].addEventListener("click", CreateCardClickFunction(i));
}

// History section
var timePeriodDisplays = document.querySelectorAll(".time_period_display");
var currentTimePeriodDisplayIndex = 0;
var currentTimePeriodDisplay = timePeriodDisplays[currentTimePeriodDisplayIndex];
var previousTimePeriodDisplay = null; // The time period display the user was at before the current one
var periodDescription = document.querySelector(".history_section.content_section #period_desc");

var previousTimeDisplayButton = document.querySelector(".history_section .prev_display_button");
var nextTimeDisplayButton = document.querySelector(".history_section .next_display_button");

// Func to change the time period using prev/next arrows on mobile
function PrevTimeDisplay() {
    currentTimePeriodDisplayIndex--;
    if (currentTimePeriodDisplayIndex < 0) {
        currentTimePeriodDisplayIndex = timePeriodDisplays.length;
    }

    UpdateTimePeriodDisplay(currentTimePeriodDisplayIndex);
}
function NextTimeDisplay() {
    currentTimePeriodDisplayIndex++;
    if (currentTimePeriodDisplayIndex >= timePeriodDisplays.length) {
        currentTimePeriodDisplayIndex = 0;
    }

    UpdateTimePeriodDisplay(currentTimePeriodDisplayIndex);
}
function UpdateTimePeriodDisplay(index) {
    // Set current display
    previousTimePeriodDisplay = currentTimePeriodDisplay;
    currentTimePeriodDisplay = timePeriodDisplays[index];

    // Change the description
    if (previousTimePeriodDisplay != null) {
        previousTimePeriodDisplay.classList.remove("selected");
    }
    currentTimePeriodDisplay.classList.add("selected");

    periodDescription.querySelector("h2").innerHTML = currentTimePeriodDisplay.querySelector("p").innerHTML;
    periodDescription.querySelector("p").innerHTML = currentTimePeriodDisplay.getAttribute("data-text");
}

previousTimeDisplayButton.addEventListener("click", PrevTimeDisplay);
nextTimeDisplayButton.addEventListener("click", NextTimeDisplay);

for (let i = 0; i < timePeriodDisplays.length; i++) {
    timePeriodDisplays[i].addEventListener("click", CreateTimePeriodClickFunction(i));
}

// Update the current time display on start
UpdateTimePeriodDisplay(currentTimePeriodDisplayIndex);

// Interactive piano
var pianoKeys = document.querySelectorAll(".interactive_piano .key");
var noteArr = [
    { note: "C",     filePath: "Sound/note_c.wav" },
    { note: "C# D♭", filePath: "Sound/note_cs.wav" },
    { note: "D",     filePath: "Sound/note_d.wav" },
    { note: "D# E♭", filePath: "Sound/note_ds.wav" },
    { note: "E",     filePath: "Sound/note_e.wav" },
    { note: "F",     filePath: "Sound/note_f.wav" },
    { note: "F# G♭", filePath: "Sound/note_fs.wav" },
    { note: "G",     filePath: "Sound/note_g.wav" },
    { note: "G# A♭", filePath: "Sound/note_gs.wav" },
    { note: "A",     filePath: "Sound/note_a.wav" },
    { note: "A# B♭", filePath: "Sound/note_as.wav" },
    { note: "B",     filePath: "Sound/note_b.wav" },
];
var audio = new Audio(noteArr[0].filePath); // Load the audio source beforehand
audio.load();

function PlayNote(index) {
    if (pianoInView == false) { return; }

    if (audio != null) {
        audio.pause();
    }

    // Play the sound
    audio.src = noteArr[index].filePath;
    audio.play();

    // Change the display
    ChangeKeyPressedText(noteArr[index].note);
}

// Click to play sound
for (let i = 0; i < pianoKeys.length; i++) {
    // Create audio and add to array
    pianoKeys[i].addEventListener("click", CreateKeyClickFunction(i));
}

// Sound through keyboard presses
var isKeyPressed = false;
document.onkeydown = function(key) {
    if (isKeyPressed == true) { return; }

    isKeyPressed = true;
    let noteIndex = null;

    switch (key.key) {
        case "a":
            noteIndex = 0;
        break;
        case "w":
            noteIndex = 1;
        break;
        case "s":
            noteIndex = 2;
        break;
        case "e":
            noteIndex = 3;
        break;
        case "d":
            noteIndex = 4;
        break;
        case "f":
            noteIndex = 5;
        break;
        case "t":
            noteIndex = 6;
        break;
        case "g":
            noteIndex = 7;
        break;
        case "y":
            noteIndex = 8;
        break;
        case "h":
            noteIndex = 9;
        break;
        case "u":
            noteIndex = 10;
        break;
        case "j":
            noteIndex = 11;
        break;
        default:
            break;
    }

    if (noteIndex != null) {
        PlayNote(noteIndex);
    }
};

document.onkeyup = function() {
    if (isKeyPressed == true) {
        isKeyPressed = false;
    }
};

// Volume slider
var volumeSlider = document.querySelector(".interactive_piano .volume_slider");
volumeSlider.addEventListener("input", function(sliderValue) {
    audio.volume = sliderValue.target.value;
});

// Show keybindings checkbox
var keybindsCheckbox = document.querySelector(".interactive_piano .show_keys");
keybindsCheckbox.addEventListener("input", function() {
    for (let i = 0; i < pianoKeys.length; i++) {
        pianoKeys[i].classList.toggle("hide_piano_keys");
    }
});

// Show the user what key they played
function ChangeKeyPressedText(newText) {
    pianoToolTipKey.innerHTML = newText;
}
var pianoToolTipKey = document.querySelector(".piano_tooltips span");