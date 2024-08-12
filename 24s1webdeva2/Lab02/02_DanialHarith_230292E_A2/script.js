//hamburger menu icon
const menuBtn = document.querySelector(".hamburger");
const menuItems = document.querySelector(".hamburgerItems");

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("is-active");
  menuItems.classList.toggle("is-active");
});

//target all menu buttons
const page1hambtn = document.querySelector("#hamMenuBtn1");
const page2hambtn = document.querySelector("#hamMenuBtn2");
const page4hambtn = document.querySelector("#hamMenuBtn4");

const page1mainbtn = document.querySelector("#mainMenuBtn1");
const page2mainbtn = document.querySelector("#mainMenuBtn2");
const page4mainbtn = document.querySelector("#mainMenuBtn4");

//target pages
const indexPage = document.querySelector("#indexContainer");
const leaguePage = document.querySelector("#leagueContainer");
const gamePage = document.querySelector("#gameContainer");

//hide all pages funtion
function hideAll() {
  indexPage.classList.remove("show");
  leaguePage.classList.remove("show");
  gamePage.classList.remove("show");
}

//function to show selected page no
function show(pageNo) {
  hideAll();
  //show the page
  if (pageNo == 1) indexPage.classList.add("show");
  if (pageNo == 2) leaguePage.classList.add("show");
  if (pageNo == 4) gamePage.classList.add("show");
}

//hide all other
hideAll();
show(1);

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1hambtn.addEventListener("click", function () {
  show(1);
});
page2hambtn.addEventListener("click", function () {
  show(2);
});
page4hambtn.addEventListener("click", function () {
  show(4);
});

page1mainbtn.addEventListener("click", function () {
  show(1);
});
page2mainbtn.addEventListener("click", function () {
  show(2);
});
page4mainbtn.addEventListener("click", function () {
  show(4);
});

//league slideshow

//target league containers
const league1 = document.getElementById("leagueContainer1");
const league2 = document.getElementById("leagueContainer2");
const league3 = document.getElementById("leagueContainer3");
const league4 = document.getElementById("leagueContainer4");
const league5 = document.getElementById("leagueContainer5");
const league6 = document.getElementById("leagueContainer6");

//var for current slide index
var currIndex = 1;

function hideSlides(){
  league1.classList.remove("is-active");
  league2.classList.remove("is-active");
  league3.classList.remove("is-active");
  league4.classList.remove("is-active");
  league5.classList.remove("is-active");
  league6.classList.remove("is-active");
}

function showSlides(){
  hideSlides();
  //toggles container
  if(currIndex == 1){
    league1.classList.add('is-active');
  }
  if(currIndex == 2){
    league2.classList.add('is-active');
  }
  if(currIndex == 3){
    league3.classList.add('is-active');
  }
  if(currIndex == 4){
    league4.classList.add('is-active');
  }
  if(currIndex == 5){
    league5.classList.add('is-active');
  }
  if(currIndex == 6){
    league6.classList.add('is-active');
  }
}

function changeSlide(n){
  //increase index by n (left if negative, right if pos)
  currIndex += n;
  if(currIndex > 6){
    currIndex = 1;
  }
  if(currIndex < 1){
    currIndex = 6;
  }
  console.log("BALLS");
}

hideSlides();
showSlides();

//target left and right buttons for switching slides
document.getElementById("leftButton").addEventListener("click", function () {
  changeSlide(-1);
  showSlides();
});
document.getElementById("rightButton").addEventListener("click", function () {
  changeSlide(1);
  showSlides();
});

//goalkeeper game
//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//players
let playerWidth = 80; //500 for testing, 80 normal
let playerHeight = 10;
let playerVelocityX = 10; //move 10 pixels each time

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX : playerVelocityX
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3; //15 for testing, 3 normal
let ballVelocityY = 2; //10 for testing, 2 normal

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}

//blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8; 
let blockRows = 3; //add more as game goesd  on
let blockMaxRows = 10; //limit how many rows
let blockCount = 0;

//starting block corners top left 
let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

window.onload = function() {
    board = document.getElementById("game");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw initial player
    context.fillStyle="skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    //create blocks
    createBlocks();
}

function update() {
    requestAnimationFrame(update);
    //stop drawing
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // player
    context.fillStyle = "red";
    context.fillRect(player.x, player.y, player.width, player.height);

    // ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //bounce the ball off player paddle
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;   // flip y direction up or down
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;   // flip x direction left or right
    }

    if (ball.y <= 0) { 
        // if ball touches top of canvas
        ball.velocityY *= -1; //reverse direction
    }
    else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
        // if ball touches left or right of canvas
        ball.velocityX *= -1; //reverse direction
    }
    else if (ball.y + ball.height >= boardHeight) {
        // if ball touches bottom of canvas
        context.font = "20px sans-serif";
        context.fillText("Game Over: Press 'Space' to Restart", 80, 400);
        gameOver = true;
    }

    //blocks
    context.fillStyle = "skyblue";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;     // block is broken
                ball.velocityY *= -1;   // flip y direction up or down
                score += 100;
                blockCount -= 1;
            }
            else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;     // block is broken
                ball.velocityX *= -1;   // flip x direction left or right
                score += 100;
                blockCount -= 1;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    //next level
    if (blockCount == 0) {
        score += 100*blockRows*blockColumns; //bonus points :)
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        createBlocks();
    }

    //score
    context.font = "20px sans-serif";
    context.fillText(score, 10, 25);
}

function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
    if (gameOver) {
        if (e.code == "Space") {
            resetGame();
            console.log("RESET");
        }
        return;
    }
    if (e.code == "ArrowLeft") {
        // player.x -= player.velocityX;
        let nextplayerX = player.x - player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    }
    else if (e.code == "ArrowRight") {
        let nextplayerX = player.x + player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
        // player.x += player.velocityX;    
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function topCollision(ball, block) { //a is above b (ball is above block)
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) { //a is above b (ball is below block)
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) { //a is left of b (ball is left of block)
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block) { //a is right of b (ball is right of block)
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockArray = []; //clear blockArray
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10, //c*10 space 10 pixels apart columns
                y : blockY + r*blockHeight + r*10, //r*10 space 10 pixels apart rows
                width : blockWidth,
                height : blockHeight,
                break : false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

function resetGame() {
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX : playerVelocityX
    }
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : ballVelocityX,
        velocityY : ballVelocityY
    }
    blockArray = [];
    blockRows = 3;
    score = 0;
    createBlocks();
}

