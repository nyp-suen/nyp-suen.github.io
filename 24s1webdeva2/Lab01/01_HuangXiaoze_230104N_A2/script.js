/* jshint esversion: 6 */

// ---------------- Header Function ------------------------
const homeBtn = document.querySelector("#homeBtn");
const typeBtn = document.querySelector("#typeBtn");
const gameBtn = document.querySelector("#gameBtn");
const aboutBtn = document.querySelector("#aboutBtn");
// const sideBar = document.querySelector(".sideBar");

var allpages = document.querySelectorAll(".content");

hideAll();

// Show landing pages by default
allpages[0].style.display = "flex";

function hideAll() {

    //go through all subtopic pages
    for (let page of allpages) {
        //hide it
        page.style.display = "none";
    }
}

//function to show selected page no
function show(pageNumber) {
    hideAll();
    allpages[pageNumber].style.display = "flex";
}

// Event for each btn to show when clicked
homeBtn.addEventListener("click", function () {
    show(0);
});
typeBtn.addEventListener("click", function () {
    show(1);
});
gameBtn.addEventListener("click", function () {
    show(2);
});
aboutBtn.addEventListener("click", function () {
    show(3);
});

// ---------------- Main Content Function ------------------------

//------------------ Type Section ----------------------//

// Get the back, previous and next btn element
let previousBtn = document.getElementById("previous");
let backBtn = document.getElementById("back");
let nextBtn = document.getElementById("next");

let seeMoreBtn = document.querySelectorAll(".see-more");
// let pageType = document.querySelector("#pageType");
let itemsList = document.querySelector(".items-list");

let clickableTimer;

previousBtn.onclick = function () {
    showNextItems("previous");
};
nextBtn.onclick = function () {
    showNextItems("next");
};

// Pass in the type to determine which items to show next
function showNextItems(type) {

    previousBtn.style.pointerEvents = "none";
    nextBtn.style.pointerEvents = "none";

    let items = document.querySelectorAll(".items");
    let lastItems = items.length - 1;

    if (items.length === 0) return;

    if (type === "next") {
        itemsList.appendChild(items[0]);
    }
    else {

        itemsList.prepend(items[lastItems]);
    }

    items = document.querySelectorAll(".items");

    clearTimeout(clickableTimer);

    clickableTimer = setTimeout(function () {
        previousBtn.style.pointerEvents = "auto";
        nextBtn.style.pointerEvents = "auto";
    }, 1100);

}

// Add to all the see-more button in the list
seeMoreBtn.forEach(function (button) {

    button.onclick = function () {
        console.log('See More Button clicked');
        itemsList.classList.add("showDetails");
        backBtn.style.pointerEvents = "auto";
    };
});

backBtn.onclick = function () {
    console.log('Back Button clicked');
    itemsList.classList.remove("showDetails");
};


//------------------ Game Section ----------------------//

// Message board function
document.getElementById("submitBtn").addEventListener("click", function () {
    // Get user name and message content
    var username = document.getElementById("userName").value;
    var message = document.getElementById("message").value;

    if (message === '') {
        alert("Please enter something!");
        return;
    }

    if (username === '') {
        username = 'Anonymous';
    }

    // Get the content of message board and current time
    var messageBoard = document.querySelector("#feedBackBoard");
    var newMessage = document.createElement('div');
    newMessage.classList.add('feedbacks');

    // Format the message content with username and current time
    newMessage.innerHTML = '<div class="feedBack-info"><div class="info"><img src="">' +
        '<strong>' + username + '</strong></div><span>Time: ' + getCurrentTime() + '</span></div>' +
        '<div class="feedback-comment">' + message + '</div>';

    // Insert the new message at the top of message board
    messageBoard.insertBefore(newMessage, messageBoard.firstChild);

    // Clear current user's input
    document.getElementById('userName').value = '';
    document.getElementById('message').value = '';
});

// Get the current date when user leave feedback
function getCurrentTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var day = ('0' + now.getDate()).slice(-2);
    var hour = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);
    return year + '/' + month + '/' + day + ' ' + hour + ':' + minutes + ':' + seconds;
}

// Get the game element
var player = document.getElementById("mc");
var coffee = document.getElementById("coffee");
var jumpBtn = document.getElementById("jumpBtn");
var gameBackground = document.querySelector("#pageGame .gameWindow");
var startBtn = document.querySelector(".startBtn");

const energyDisplay = document.querySelector(".energy");

var energy = 0;
var speed = 3;
var gameRunning = false;

// Start game button event
startBtn.addEventListener("click", function () {
    coffee.classList.add("coffeeAnim");
    gameBackground.classList.add("backgroundAnim");
    gameRunning = true;
    updateEnergyDisplay();
});

// Jump button event
jumpBtn.addEventListener('click', function () {

    if (player.classList != 'jump') {
        player.classList.add('jump');
    }

    setTimeout(function () {
        player.classList.remove('jump');
    }, 600);

});

// Add another 'W' key to jump
document.addEventListener('keydown', function (event) {
    if (event.key === 'w' || event.key === 'W') {
        jumpBtn.click();
    }
});


// Constantly check for collision
var checkHit;
checkHit = setInterval(function () {
    var playerRect = player.getBoundingClientRect();
    var coffeeRect = coffee.getBoundingClientRect();

    // Check if player is on the ground
    var characterTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    var isOnGround = characterTop >= 400;

    if (isOnGround &&
        playerRect.left < coffeeRect.left + coffeeRect.width &&
        playerRect.left + playerRect.width > coffeeRect.left &&
        playerRect.top < coffeeRect.top + coffeeRect.height &&
        playerRect.top + playerRect.height > coffeeRect.top
    ) {
        addScore(1);
        updateEnergyDisplay();
    } else if (characterTop < 300) {
        console.log("Jump");
    }

    if (energy >= 20) {
        gameOver();
    }

}, 400);

// Score increment
function addScore(no) {
    energy += no;
    console.log("Score: " + energy);
}

// Update the current amount of energy
function updateEnergyDisplay() {
    energyDisplay.textContent = `Energy: ${energy}/20`;
}

// Reset all the var back to default
function gameOver() {
    speed = 3;
    energy = 0;
    gameRunning = false;
    energyDisplay.textContent = `You Had Overdose the coffee!`;
    coffee.classList.remove('coffeeAnim');
    gameBackground.classList.remove("backgroundAnim");
}