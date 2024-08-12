// Target all button elements
const page1btn = document.querySelector("#Homebtn");
const page2btn = document.querySelector("#Historybtn");
const page3btn = document.querySelector("#Breedsbtn");
const page5btn = document.querySelector("#Quizbtn");
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.searchBar input');
    const boxes = document.querySelectorAll('.Boxes');

    searchBar.addEventListener('input', function() {
        const searchTerm = searchBar.value.trim().toLowerCase();

        boxes.forEach(box => {
            const boxName = box.dataset.name.toLowerCase();

            if (boxName.includes(searchTerm)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
    const bgm = document.querySelector("#bgm");
bgm.loop = true;
bgm.load();
//window.addEventListener("load",function(){
window.onload = function () {
console.log("Working");
    setTimeout(function(){
        bgm.play();
        console.log("Working2");
    },3000);
};

    searchBar.addEventListener('keyup', function(e) {
        const searchTerm = searchBar.value.trim().toLowerCase();

        if (searchTerm === '') {
            boxes.forEach(box => {
                box.style.display = 'block';
            });
        } else if (e.key === 'Enter') {
            boxes.forEach(box => {
                const boxName = box.dataset.name.toLowerCase();

                if (boxName.includes(searchTerm)) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        }
    });
});
// Select all subtopic pages
var allpages = document.querySelectorAll(".page");

hideall();

function hideall() {
    // Function to hide all pages
    for (let onepage of allpages) { // Go through all subtopic pages
        onepage.style.display = "none"; // Hide it
    }
}

function show(pgno) {
    // Function to show selected page no
    hideall();
    // Select the page based on the parameter passed in
    let onepage = document.querySelector("#" + pgno);
    // Show the page
    onepage.style.display = "block";

    // Check if the current page is "Quiz" and then start the game
    if (pgno === "Quiz") {
        
        console.log("Game started!");
       
    }
}

/* Listen for clicks on the buttons, assign anonymous
   event handler functions to call show function */
page1btn.addEventListener("click", function () {
    show("Home");
    gameSpeed = 0;
    gravity = 0;
});
page2btn.addEventListener("click", function () {
    show("History");
    gameSpeed = 0;
    gravity = 0;
});
page3btn.addEventListener("click", function () {
    show("Breeds");
    gameSpeed = 0;
    gravity = 0;
});
page5btn.addEventListener("click", function () {
    show("Quiz");
    gameSpeed = 2;
    gravity =  2;
    birdY = canvas.height/2;
});
// Set the default page to be shown when the page loads
show("Home"); // Change "Home" to the ID of the default page you want to show

// Initialize game
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    birdX = 50;
    birdY = canvas.height / 2;
    gravity = 2.0;
    pipeWidth = 50;
    pipeGap = 150;
    pipeX = canvas.width;
    score = 0;gameSpeed = 0;
    const sharkImage = new Image();
    sharkImage.src = 'Images/FlappyShark.png';
    
    // Randomize pipe gap position
    pipeGapPosition = getRandomInt(50, canvas.height - 200); // Adjust range as needed
    
    // Event listener
    canvas.addEventListener('click', () => {
      birdY -= 50; // Bird jumps
    });
    
    // Start game loop
    setInterval(gameLoop, 20);
  }
// Function to get random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FF5733';
    ctx.fillRect(birdX, birdY, 30, 30);
    
    // Apply gravity
    birdY += gravity;
    
    // Draw pipes
    pipeX -= gameSpeed; // Adjust speed based on gameSpeed
    if (pipeX <= -pipeWidth) {
      pipeX = canvas.width;
      score++; // Increase score when passing pipes
      
      // Increase game speed every 10 points (adjust as needed)
      if (score % 1 === 0) {
        gameSpeed += 1; // Increase speed by 1 unit
      }
      
      // Randomize pipe gap position for next set of pipes
      pipeGapPosition = getRandomInt(50, canvas.height - 200); // Adjust range as needed
    }
    
    // Upper pipe
    ctx.fillStyle = '#008000';
    ctx.fillRect(pipeX, 0, pipeWidth, pipeGapPosition);
    
    // Lower pipe
    ctx.fillRect(pipeX, pipeGapPosition + pipeGap, pipeWidth, canvas.height - pipeGapPosition - pipeGap);
    
    // Collision detection
    if (birdX + 30 > pipeX && birdX < pipeX + pipeWidth) {
      if (birdY < pipeGapPosition || birdY + 30 > pipeGapPosition + pipeGap) {
        gameOver();
      }
    }
    
    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
  }
  
// Game over
function gameOver() {
    alert(`Game Over! Score: ${score}`);
    location.reload(); // Reload the page to restart the game
  }
  
// Start game
init();

// Listen for beforeunload event to reset game state when user navigates away
window.addEventListener('beforeunload', function(event) {
  resetGame();
});

// Function to reset game state
function resetGame() {
  pipeX = canvas.width; // Reset pipe position
  birdY = canvas.height / 2; // Reset bird position
  score = 0; // Reset score to zero
}

  