//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
var allpages=document.querySelectorAll(".page");
document.addEventListener('keydown', handleKeydown);
const ball = document.querySelector("#ball");
const box = document.querySelector("#box");
var ballX = 0;
var ballY = 0;
const confirmButton = document.querySelector('#confirmButton');
confirmButton.addEventListener('click', checkCollision);

/*HamMenu */
const hamBtn=document.querySelector("#hamIcon");
hamBtn.addEventListener("click",toggleMenus);
const menuItemsList=document.querySelector("nav ul");
function toggleMenus(){ /*open and close menu*/
    menuItemsList.classList.toggle("menuHide");
}

//select all subtopic pages
console.log(allpages);
hideall();
show(1);
function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
        onepage.style.display="none"; //hide it
    }
}
function show(pgno){ //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
    //show the page
    onepage.style.display="block";
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
if (menuItemsList.classList.contains("menuHide")) /*If menu open, close menu*/
    toggleMenus();
//showProfile(1);
});
page2btn.addEventListener("click", function () {
show(2);
toggleMenus();
});
page3btn.addEventListener("click", function () {
show(3);
toggleMenus();
});
page4btn.addEventListener("click", function () {
show(4);
toggleMenus();
});

// Function to handle keydown events - NEW
function handleKeydown(event) {
    const speed = 10; // Adjust the speed as needed

    // Check which key was pressed
    switch (event.key) {
        case 'a':   // Move the ball left
            if (ballX <= 0)
                break;
            updateBallPosition(-speed, 0);
            break;
        case 'd':   // Move the ball right
            if (ballX >= (box.offsetWidth-60))
                break;
            updateBallPosition(speed, 0);
            break;
        case 'w':   // Move the ball up
            if (ballY <= 0)
                break;
            updateBallPosition(0, -speed);
            break;
        case 's':   // Move the ball down
            if (ballY >= (box.offsetHeight-60))
                break;
            updateBallPosition(0, speed);
            break;
        case 'r':   // Reset the ball's position
            resetBallPosition();
            document.getElementById('win-message').style.display = 'none';
            document.getElementById('lose-message').style.display = 'none';
            break;
    }
}

function updateBallPosition(dx, dy) {
    ballX += dx;
    ballY += dy;

    // Check if the ball is within the game area boundaries
    if (ballX < 0) {
        ballX = 0;
      } else if (ballX > box.offsetWidth - ball.offsetWidth) {
        ballX = box.offsetWidth - ball.offsetWidth;
      }
    
      if (ballY < 0) {
        ballY = 0;
      } else if (ballY > box.offsetHeight - ball.offsetHeight) {
        ballY = box.offsetHeight - ball.offsetHeight;
      }
    
    // Update transform
    ball.style.transform = "translate(" + ballX + "px, " + ballY + "px)";
}

function resetBallPosition() {
    ballX = 0;
    ballY = 0;
    updateBallPosition(0, 0);
}

// Add touchstart event listener on the ball or game area
ball.addEventListener('touchstart', handleTouchStart);

function handleTouchStart(event) {
  // Get the touch coordinates
  let touchX = event.touches[0].clientX;
  let touchY = event.touches[0].clientY;

  // Check if the touch coordinates are within the game area
  if (touchX >= 0 && touchX <= box.offsetWidth && touchY >= 0 && touchY <= box.offsetHeight) {
    // Update the ball's position to the touch coordinates
    ballX = touchX - ball.offsetWidth / 2;
    ballY = touchY - ball.offsetHeight / 2;
    updateBallPosition(0, 0);
  }
}

function checkCollision() {
    // Get the current positon of ball
    const ballRect = ball.getBoundingClientRect();

    // Get all the city divs
    const cityDivs = document.querySelectorAll('.city');

    // Check if the ball is colliding with  city divs
    for (let i = 0; i < cityDivs.length; i++) {
        const cityRect = cityDivs[i].getBoundingClientRect();
        if (
            ballRect.left < cityRect.right &&
            ballRect.right > cityRect.left &&
            ballRect.top < cityRect.bottom &&
            ballRect.bottom > cityRect.top
        ) {
            document.getElementById('win-message').style.display = 'none';
            document.getElementById('lose-message').style.display = 'block';
            console.log("YOU LOSE");
            return;
        }
    }
    document.getElementById('win-message').style.display = 'block';
    document.getElementById('lose-message').style.display = 'none';
    console.log("YOU WIN");
}