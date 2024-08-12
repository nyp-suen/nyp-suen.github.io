// Target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");
// Select all subtopic pages
console.log(allpages);
hideall();
function hideall() { // Function to hide all pages
    for (let onepage of allpages) { // Go through all subtopic pages
        onepage.style.display = "none"; // Hide it
    }
}
function show(pgno) { // Function to show selected page no
    hideall();
    // Select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    // Show the page
    onepage.style.display = "block";
}
/* Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function */
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
/* JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("nav ul");

function toggleMenus() { /* Open and close menu */
    menuItemsList.classList.toggle("menuhide");
}

var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX, snakeY, snakeBody, velocityX, velocityY, gameOver;

const img = new Image();
img.src = 'image/fish.jpeg'; // Provide the path to your image

function initializeGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    gameOver = false;
    spawnPrata();
}

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    document.addEventListener("keyup", direction);

    document.getElementById("button1").addEventListener("click", () => changeDirection("up"));
    document.getElementById("button2").addEventListener("click", () => changeDirection("down"));
    document.getElementById("button3").addEventListener("click", () => changeDirection("left"));
    document.getElementById("button4").addEventListener("click", () => changeDirection("right"));

    // Add touch event listeners for mobile
    document.getElementById("button1").addEventListener("touchstart", () => changeDirection("up"));
    document.getElementById("button2").addEventListener("touchstart", () => changeDirection("down"));
    document.getElementById("button3").addEventListener("touchstart", () => changeDirection("left"));
    document.getElementById("button4").addEventListener("touchstart", () => changeDirection("right"));

    // Add reset button event listener
    document.getElementById("resetButton").addEventListener("click", resetGame);

    setInterval(update, 1000 / 10);

    initializeGame();
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Prata 
    const pattern = context.createPattern(img, 'repeat'); // 'repeat' can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'
    
    // Set the pattern as the fill style
    context.fillStyle = pattern;
    context.fillRect(prataX, prataY, blockSize, blockSize);

    // Check for collision between prata and snake
    if (snakeX == prataX && snakeY == prataY) {
        snakeBody.push([prataX, prataY]);
        spawnPrata();
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    // Make snake
    context.fillStyle = "brown";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Check if game is over
    if (snakeX < 0 || snakeX >= rows * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function direction(e) {
    if (e.code == "KeyW" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "KeyS" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "KeyA" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "KeyD" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function changeDirection(direction) {
    if (direction == "up" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (direction == "down" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (direction == "left" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (direction == "right" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function resetGame() {
    initializeGame();
    alert("Game Reset");
}

// Spawn prata
function spawnPrata() {
    prataX = Math.floor(Math.random() * cols) * blockSize;
    prataY = Math.floor(Math.random() * rows) * blockSize;
}
