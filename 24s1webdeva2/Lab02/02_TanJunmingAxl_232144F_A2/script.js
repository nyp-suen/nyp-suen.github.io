let currBeltTile;
let currEnemyTile;
let score = 0;
let gameOver = false;

window.onload = function () {
    setGame();
}

function setGame() {
    //Set up grid for game board
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    //This function is called every two seconds
    setInterval(setMole, 800);
    setInterval(setPlant, 1000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currBeltTile) {
        currBeltTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "images/ufcbelt.jpg";

    let num = getRandomTile();
    if (currEnemyTile && currEnemyTile.id == num) {
        return;
    }
    currBeltTile = document.getElementById(num);
    currBeltTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }

    if (currEnemyTile) {
        currEnemyTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "images/mcgregorface.jpg";

    let num = getRandomTile();
    if (currBeltTile && currBeltTile.id == num) {
        return;
    }
    currEnemyTile = document.getElementById(num);
    currEnemyTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }

    //updates the score
    if (this == currBeltTile) {
        score += 1;
        document.getElementById("score").innerText = score.toString();
    }

    //checks if player dies
    else if (this == currEnemyTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    }
}

//Retrieve elements by the ID given to them above
var content1 = document.getElementById("content1");
var content1pt2 = document.getElementById("content1pt2");
var content1pt3 = document.getElementById("content1pt3");
var content2 = document.getElementById("content2");
var content2pt2 = document.getElementById("content2pt2");
var content2pt3 = document.getElementById("content2pt3");
var content3 = document.getElementById("content3");
var content3pt2 = document.getElementById("content3pt2");
var content3pt3 = document.getElementById("content3pt3");
var content3pt4 = document.getElementById("content3pt4");
var content3pt5 = document.getElementById("content3pt5");
var content4 = document.getElementById("content4");
var content4pt2 = document.getElementById("content4pt2");
var content5 = document.getElementById("content5");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var btn5 = document.getElementById("btn5");

//Function to open first tab
function history() {
    //Moves content of first tab to the screen
    content1.style.transform = "translateX(0)";
    content1pt2.style.transform = "translateY(300px)";
    content1pt3.style.transform = "translateY(600px)";
    content2.style.transform = "translateX(100%)";
    content2pt2.style.transform = "translateX(100%)";
    content2pt3.style.transform = "translateX(100%)";
    content3.style.transform = "translateX(100%)";
    content3pt2.style.transform = "translateX(100%)";
    content3pt3.style.transform = "translateX(100%)";
    content3pt4.style.transform = "translateX(100%)";
    content3pt5.style.transform = "translateX(100%)";
    content4.style.transform = "translateX(100%)";
    content4pt2.style.transform = "translateX(100%)";
    content5.style.transform = "translateX(10000px)";
    //Changes colour of buttons to indicate which tab the user is on
    btn1.style.color = "#bba53d";
    btn2.style.color = "#fff";
    btn3.style.color = "#fff";
    btn4.style.color = "#fff";
    btn5.style.color = "#fff";
    content1.style.transitionDelay = "0.3s";
    content1pt2.style.transitionDelay = "0.3s";
    content1pt3.style.transitionDelay = "0.3s";
    content2.style.transitionDelay = "0s";
    content2pt2.style.transitionDelay = "0s";
    content2pt3.style.transitionDelay = "0s";
    content3.style.transitionDelay = "0s";
    content3pt2.style.transitionDelay = "0s";
    content3pt3.style.transitionDelay = "0s";
    content3pt4.style.transitionDelay = "0s";
    content3pt5.style.transitionDelay = "0s";
    content4.style.transitionDelay = "0s";
    content4pt2.style.transitionDelay = "0s";
    content5.style.transitionDelay = "0s";
}

//Function to open second tab
function styles() {
    //Moves content of second tab to the screen
    content1.style.transform = "translateX(100%)";
    content1pt2.style.transform = "translateX(100%)";
    content1pt3.style.transform = "translateX(300%)";
    content2.style.transform = "translateX(0)";
    content2pt2.style.transform = "translateY(300px)";
    content2pt3.style.transform = "translateY(600px)";
    content3.style.transform = "translateX(100%)";
    content3pt2.style.transform = "translateX(100%)";
    content3pt3.style.transform = "translateX(100%)";
    content3pt4.style.transform = "translateX(100%)";
    content3pt5.style.transform = "translateX(100%)";
    content4.style.transform = "translateX(100%)";
    content4pt2.style.transform = "translateX(100%)";
    content5.style.transform = "translateX(10000px)";
    //Changes colour of buttons to indicate which tab the user is on
    btn1.style.color = "#fff";
    btn2.style.color = "#bba53d";
    btn3.style.color = "#fff";
    btn4.style.color = "#fff";
    btn5.style.color = "#fff";
    content1.style.transitionDelay = "0s";
    content1pt2.style.transitionDelay = "0s";
    content1pt3.style.transitionDelay = "0s";
    content2.style.transitionDelay = "0.3s";
    content2pt2.style.transitionDelay = "0.3s";
    content2pt3.style.transitionDelay = "0.3s";
    content3.style.transitionDelay = "0s";
    content3pt2.style.transitionDelay = "0s";
    content3pt3.style.transitionDelay = "0s";
    content3pt4.style.transitionDelay = "0s";
    content3pt5.style.transitionDelay = "0s";
    content4.style.transitionDelay = "0s";
    content4pt2.style.transitionDelay = "0s";
    content5.style.transitionDelay = "0s";
}

//Function to open third tab
function superstars() {
    //Moves content of third tab to the screen
    content1.style.transform = "translateX(100%)";
    content1pt2.style.transform = "translateX(100%)";
    content1pt3.style.transform = "translateX(300%)";
    content2.style.transform = "translateX(100%)";
    content2pt2.style.transform = "translateX(100%)";
    content2pt3.style.transform = "translateX(100%)";
    content3.style.transform = "translateX(0)";
    content3pt2.style.transform = "translateY(300px)";
    content3pt3.style.transform = "translateY(600px)";
    content3pt4.style.transform = "translateY(900px)";
    content3pt5.style.transform = "translateY(1200px)";
    content4.style.transform = "translateX(100%)";
    content4pt2.style.transform = "translateX(100%)";
    content5.style.transform = "translateX(10000px)";
    //Changes colour of buttons to indicate which tab the user is on
    btn1.style.color = "#fff";
    btn2.style.color = "#fff";
    btn3.style.color = "#bba53d";
    btn4.style.color = "#fff";
    btn5.style.color = "#fff";
    content1.style.transitionDelay = "0s";
    content1pt2.style.transitionDelay = "0s";
    content1pt3.style.transitionDelay = "0s";
    content2.style.transitionDelay = "0s";
    content2pt2.style.transitionDelay = "0s";
    content2pt3.style.transitionDelay = "0s";
    content3.style.transitionDelay = "0.3s";
    content3pt2.style.transitionDelay = "0.3s";
    content3pt3.style.transitionDelay = "0.3s";
    content3pt4.style.transitionDelay = "0.3s";
    content3pt5.style.transitionDelay = "0.3s";
    content4.style.transitionDelay = "0s";
    content4pt2.style.transitionDelay = "0s";
    content5.style.transitionDelay = "0s";
}

//Function to open fourth tab
function events() {
    //Moves content of fourth tab to the screen
    content1.style.transform = "translateX(100%)";
    content1pt2.style.transform = "translateX(100%)";
    content1pt3.style.transform = "translateX(300%)";
    content2.style.transform = "translateX(100%)";
    content2pt2.style.transform = "translateX(100%)";
    content2pt3.style.transform = "translateX(100%)";
    content3.style.transform = "translateX(100%)";
    content3pt2.style.transform = "translateX(100%)";
    content3pt3.style.transform = "translateX(100%)";
    content3pt4.style.transform = "translateX(100%)";
    content3pt5.style.transform = "translateX(100%)";
    content4.style.transform = "translateX(0)";
    content4pt2.style.transform = "translateY(300px)";
    content5.style.transform = "translateX(10000px)";
    //Changes colour of buttons to indicate which tab the user is on
    btn1.style.color = "#fff";
    btn2.style.color = "#fff";
    btn3.style.color = "#fff";
    btn4.style.color = "#bba53d";
    btn5.style.color = "#fff";
    content1.style.transitionDelay = "0s";
    content1pt2.style.transitionDelay = "0s";
    content1pt3.style.transitionDelay = "0s";
    content2.style.transitionDelay = "0s";
    content2pt2.style.transitionDelay = "0s";
    content2pt3.style.transitionDelay = "0s";
    content3.style.transitionDelay = "0s";
    content3pt2.style.transitionDelay = "0s";
    content3pt3.style.transitionDelay = "0s";
    content3pt4.style.transitionDelay = "0s";
    content3pt5.style.transitionDelay = "0s";
    content4.style.transitionDelay = "0.3s";
    content4pt2.style.transitionDelay = "0.3s";
    content5.style.transitionDelay = "0s";
}

//Function to open fifth tab
function game() {
    //Moves content of fourth tab to the screen
    content1.style.transform = "translateX(100%)";
    content1pt2.style.transform = "translateX(100%)";
    content1pt3.style.transform = "translateX(300%)";
    content2.style.transform = "translateX(100%)";
    content2pt2.style.transform = "translateX(100%)";
    content2pt3.style.transform = "translateX(100%)";
    content3.style.transform = "translateX(100%)";
    content3pt2.style.transform = "translateX(100%)";
    content3pt3.style.transform = "translateX(100%)";
    content3pt4.style.transform = "translateX(100%)";
    content3pt5.style.transform = "translateX(100%)";
    content4.style.transform = "translateX(100%)";
    content4pt2.style.transform = "translateX(100%)";
    content5.style.transform = "translateX(0)";
    //Changes colour of buttons to indicate which tab the user is on
    btn1.style.color = "#fff";
    btn2.style.color = "#fff";
    btn3.style.color = "#fff";
    btn4.style.color = "#fff";
    btn5.style.color = "#bba53d";
    content1.style.transitionDelay = "0s";
    content1pt2.style.transitionDelay = "0s";
    content1pt3.style.transitionDelay = "0s";
    content2.style.transitionDelay = "0s";
    content2pt2.style.transitionDelay = "0s";
    content2pt3.style.transitionDelay = "0s";
    content3.style.transitionDelay = "0s";
    content3pt2.style.transitionDelay = "0s";
    content3pt3.style.transitionDelay = "0s";
    content3pt4.style.transitionDelay = "0s";
    content3pt5.style.transitionDelay = "0s";
    content4.style.transitionDelay = "0s";
    content4pt2.style.transitionDelay = "0s";
    content5.style.transitionDelay = "0.3s";
}

const hamburgerMenu = document.querySelector(".hamburger-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

//Allows hamburger dropdown menu to be interacted with through clicking
hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
});