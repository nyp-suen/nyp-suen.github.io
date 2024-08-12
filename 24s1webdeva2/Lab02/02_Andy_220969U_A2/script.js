// Target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");
var allPages = document.querySelectorAll(".page");
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
const ball = document.querySelector("#player");
const gameContainer = document.getElementById('page4game'); // Game container element
const scoreDisplay = document.createElement('div'); // Score display element
scoreDisplay.id = 'score';
ball.appendChild(scoreDisplay); // Add scoreDisplay to player element
let score = 0;
let foodCount = 0;
var ballX = 0;
var ballY = 0; // Assign initial position of ball
var playerX = 0;
var playerY = 0; // Initial position of player

// Select all subtopic pages and hide them initially
console.log(allPages);
hideAll();

function hideAll() { // Function to hide all pages
	for (let onePage of allPages) { // Go through all subtopic pages
		onePage.style.display = "none"; // Hide it
	}
}

function show(pgno) { // Function to show selected page no
	hideAll();
	let onePage = document.querySelector("#page" + pgno); // Select the page based on the parameter passed in
	onePage.style.display = "block"; // Show the page
}

// Listen for clicks on the buttons and show the corresponding page
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
	resetGame(); // Reset the game when game page is pressed
});
page5btn.addEventListener("click", function() {
	show(5);
});
// JS for hamMenu
hamBtn.addEventListener("click", toggleMenus);

function toggleMenus() { // Function to open and close menu
	menuItemsList.classList.toggle("menuHide");
}

// Functions to update variables to control ball position
function resetPos() {
	ballX = ballY = playerX = playerY = 0; // Reset positions to zero
	updateBallStyle();
	updatePlayerPosition();
}

function movePos(leftInc, topInc) {
	ballX += leftInc;
	ballY += topInc;
	updateBallStyle();
}

function updateBallStyle() {
	ball.style.left = ballX + "px"; // Set left property to ball x variable
	ball.style.top = ballY + "px"; // Set top property to ball y variable
}

function moveLeft() { // Function just to move left (decrease left style)
	movePos(-10, 0);
}

// Event listeners to activate movePos
document.querySelector("#leftBtn").addEventListener("click", moveLeft);
document.querySelector("#rightBtn").addEventListener("click", function() {
	movePos(10, 0);
});
document.querySelector("#upBtn").addEventListener("click", function() {
	movePos(0, -10);
});
document.querySelector("#downBtn").addEventListener("click", function() {
	movePos(0, 10);
});
document.querySelector("#resetBtn").addEventListener("click", resetPos);

function updatePlayerPosition() {
	ball.style.left = playerX + "px";
	ball.style.top = playerY + "px";
}

// Function to create a food item with random position
function createFood() {
	const food = document.createElement('div');
	food.className = 'food';

	// Generate random positions within the game container
	const randomLeft = Math.random() * (gameContainer.offsetWidth - 40); // Subtract 40 to keep food within bounds
	const randomTop = Math.random() * (gameContainer.offsetHeight - 40); // Subtract 40 to keep food within bounds

	food.style.left = randomLeft + 'px';
	food.style.top = randomTop + 'px';

	gameContainer.appendChild(food);
	foodCount++;
}

// Function to handle food collection
function collectFood(food) {
	foodCount--;
	score++;
	food.remove();
	updateScore();

	// Respawn food after 5 seconds
	setTimeout(createFood, Math.random() * 5000);
}

// Function to update score display
function updateScore() {
	scoreDisplay.innerText = 'Score: ' + score; // Update score display
}

// Collision detection function
function checkCollisions() {
	const foods = document.getElementsByClassName('food');

	Array.from(foods).forEach(function(food) {
		if (isCollision(ball, food)) {
			collectFood(food);
		}
	});

	// Check collision with game container boundaries
	if (ball.offsetLeft < 0) {
		ball.style.left = '0px';
	}
	if (ball.offsetTop < 0) {
		ball.style.top = '0px';
	}
	if (ball.offsetLeft + ball.offsetWidth > gameContainer.offsetWidth) {
		ball.style.left = gameContainer.offsetWidth - ball.offsetWidth + 'px';
	}
	if (ball.offsetTop + ball.offsetHeight > gameContainer.offsetHeight) {
		ball.style.top = gameContainer.offsetHeight - ball.offsetHeight + 'px';
	}
}


// Helper function to check collision between two elements
function isCollision(element1, element2) {
	const rect1 = element1.getBoundingClientRect();
	const rect2 = element2.getBoundingClientRect();

	return !(rect1.right < rect2.left ||
		rect1.left > rect2.right ||
		rect1.bottom < rect2.top ||
		rect1.top > rect2.bottom);
}

// Event listeners for arrow key controls
document.addEventListener('keydown', function(e) {
	switch (e.code) {
		case "ArrowLeft":
			moveLeft();
			break;
		case "ArrowRight":
			movePos(10, 0);
			break;
		case "ArrowUp":
			movePos(0, -10);
			break;
		case "ArrowDown":
			movePos(0, 10);
			break;
	}
	// Collision detection and boundary checking on each movement
	checkCollisions();
});
// Things to load after the page has fully loaded
document.addEventListener("DOMContentLoaded", function() {
	show("1"); // Show the home page

	// Game loop to check collisions periodically
	setInterval(checkCollisions, 100);

	// Generate initial food items
	for (let i = 0; i < 10; i++) {
		createFood();
	}


	// Initial player position
	updatePlayerPosition();

});

// Function to reset the game
function resetGame() {
	// Reset player position
	resetPos();

	// Reset score
	score = 0;
	updateScore(); // Update score display

	// Remove existing food items
	const foods = document.querySelectorAll('.food');
	foods.forEach(function(food) {
		food.remove();
	});

	foodCount = 0;

	// Generate initial food items
	for (let i = 0; i < 10; i++) {
		createFood();
	}


}


function calculateFeeding() {
	const species = document.getElementById('species').value;
	const age = parseInt(document.getElementById('age').value);
	const size = parseInt(document.getElementById('size').value);

	let resultText = '';

	if (species === 'omnivorous') {
		resultText += 'For an omnivorous turtle:<br>';
		resultText += ' - Feed more than 50% plant material.<br>';
		resultText += ' - Around 25% turtle pellets.<br>';
		resultText += ' - Around 25% live animal protein.<br>';
	} else if (species === 'carnivorous') {
		resultText += 'For a carnivorous turtle:<br>';
		resultText += ' - About 10–20% plant material.<br>';
		resultText += ' - Around 50% carnivorous turtle pellets.<br>';
		resultText += ' - Around 30–40% live animal protein.<br>';
	} else if (species === 'herbivorous') {
		resultText += 'For a herbivorous turtle:<br>';
		resultText += ' - Feed primarily plant material.<br>';
		resultText += ' - Minimal or no animal protein.<br>';
	}

	if (age < 2) {
		resultText += ' - Juveniles typically eat daily.<br>';
	} else {
		resultText += ' - Adults should be offered food every 2-3 days.<br>';
	}

	if (size < 10) {
		resultText += ' - Smaller turtles may need more frequent feeding.<br>';
	} else {
		resultText += ' - Larger turtles can eat larger amounts less frequently.<br>';
	}

	document.getElementById('feedingResults').innerHTML = resultText;
}