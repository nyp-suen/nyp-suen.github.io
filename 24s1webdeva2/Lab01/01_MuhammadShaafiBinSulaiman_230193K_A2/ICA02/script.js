/*jshint esversion: 6 */

//target all elements to save to constants
const uniquenessOfRacingPage = document.querySelector("#UniquenessOfRacingButton");
const differentMotorsportsPage = document.querySelector("#DifferentMotorsportsButton");
const gamePage = document.querySelector("#GameButton");
const calculatorPage = document.querySelector("#CalculateButton");
const topNav = document.getElementsByClassName("topPart");
const car = document.querySelector("#Game>div>img:last-of-type");
const trafficCone = document.querySelector("#Game>div>img:first-of-type");
const game = document.getElementById("Game");
const allPages = document.querySelectorAll(".page");
const Formula1Button = document.querySelector("#DifferentMotorsports>div>ul>li:first-of-type>button");
const Formula1Content = document.querySelector("#DifferentMotorsports>div>ul>li:first-of-type>div");
const NascarButton = document.querySelector("#DifferentMotorsports>div>ul>li:nth-of-type(2)>button");
const NascarContent = document.querySelector("#DifferentMotorsports>div>ul>li:nth-of-type(2)>div");
const WRCButton = document.querySelector("#DifferentMotorsports>div>ul>li:nth-of-type(3)>button");
const WRCContent = document.querySelector("#DifferentMotorsports>div>ul>li:nth-of-type(3)>div");
const WECButton = document.querySelector("#DifferentMotorsports>div>ul>li:last-child>button");
const WECContent = document.querySelector("#DifferentMotorsports>div>ul>li:last-child>div");
const calculatorForm = document.querySelector("form");
const goFS = document.querySelector("body>button:first-of-type");
let gameRunning = false;


//Swipe Function
let touchStart = 0;
let touchEnd = 0;

//select all subtopic pages
hideAll();
document.querySelector("#qrcode").style.display = "block";
function hideAll(){ //function to hide all pages
    for (let onepage of allPages){ //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(id, mobileDisplay, desktopDisplay){ //function to show selected page no
    let onepage = document.querySelector(id);
    if (onepage.style.display !== "none"){
        onepage.style.display = "none";
        document.querySelector("#qrcode").style.display = "block";
        return;
    }
    hideAll();
    //select the page based on the parameter passed in

    //show the page
    if(window.innerWidth >= 800){
        onepage.style.display = desktopDisplay;
    }
    else{
        onepage.style.display = mobileDisplay;
    }

    onepage.style.display = getComputedStyle(onepage).display;
}

function changeDisplay(id, mobileDisplay, desktopDisplay){
    window.addEventListener('resize', () => {


    let onepage = document.querySelector(id);

    if (onepage.style.display === "none"){
        return;
    }

    if (window.matchMedia("(min-width: 800px)").matches) { // If media query matches
        onepage.style.display = desktopDisplay;
    } else {
        onepage.style.display = mobileDisplay;
    }

    });
}


function VWtoPx(vw){ //Convert value from VW to pixels
    return (vw / 100) * Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

function PxtoVW(px){ //Convert value from pixels to VW
    return (px/Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)) * 100;
}

function MovePos(horizontalMovement){ //Move the position of the car based on input

    if (!gameRunning) return;
    const style = window.getComputedStyle(car);
    const matrix = new DOMMatrix(style.transform);
    const horizontalPos = matrix.m41 + VWtoPx(horizontalMovement);
    console.log(PxtoVW(matrix.m41));
    if (matrix.m41 < VWtoPx(-0.1) && horizontalMovement < 0){
        return;
    }

    if (matrix.m41 > VWtoPx(0.1) && horizontalMovement > 0){
        return;
    }

    car.style.transform = "translate(" + PxtoVW(horizontalPos) + "vw, 25vw)";
}

function MoveCone(){ //Move Position of Cone

    if (!gameRunning) return;

    const style = window.getComputedStyle(trafficCone);
    const matrix = new DOMMatrix(style.transform);

    var verticalPos = matrix.m42 + VWtoPx(1);
    var horizontalPos = matrix.m41;

    if (PxtoVW(verticalPos) > 40){
        verticalPos = 0;
        const rand = Math.floor(Math.random() * 3 + 1);
        switch (rand){
            case 1:
                horizontalPos = VWtoPx(-15);
                break;
            case 2:
                horizontalPos = VWtoPx(0);
                break;
            case 3:
                horizontalPos = VWtoPx(15);
                break;
        }
    }

    trafficCone.style.transform = "translate(" + PxtoVW(horizontalPos) + "vw, " + PxtoVW(verticalPos) + "vw)";
    checkCollision();
}

function checkCollision(){ //Check for collision between the car and the cone
    const trafficConeStyle = window.getComputedStyle(trafficCone);
    const carStyle = window.getComputedStyle(car);
    const trafficConeMatrix = new DOMMatrix(trafficConeStyle.transform);
    const carMatrix = new DOMMatrix(carStyle.transform);
    const tolerance = 1; // You can adjust this tolerance value as needed

    if (Math.abs(carMatrix.m41 - trafficConeMatrix.m41) < tolerance){


        if (trafficConeMatrix.m42 > VWtoPx(25)){
            gameRunning = false;
        }
    }
}

function checkDirection() { //Check direction for swipe input
    if (touchEnd < touchStart)
        MovePos(-15);
    if (touchEnd > touchStart)
        MovePos(15);
}

function rotateButton(button, content){ // rotate '>' when pressed
    if (button.style.rotate === "90deg"){
        button.style.rotate = "0deg";
        content.style.display = "none";
    }
    else{
        button.style.rotate = "90deg";
        content.style.display = "block";
    }
}

function calculateLapTimes(){ //Calculator for laptimes
    let lapTimes = [];
    for (let i = 1; i <= 5; i++){
        let min = parseFloat(document.getElementById('lap' + i + 'min').value);
        let sec = parseFloat(document.getElementById('lap' + i + 'sec').value);
        let ms = parseFloat(document.getElementById('lap' + i + 'ms').value);
        let totalSeconds = (min * 60) + sec + (ms / 1000);
        lapTimes.push(totalSeconds);
    }

    let total = lapTimes.reduce((a, b) => a + b, 0);
    let average = total / lapTimes.length;
    let fastest = Math.min(...lapTimes);
    let slowest = Math.max(...lapTimes);

    function setTime(seconds){
        let min = Math.floor(seconds / 60);
        seconds = seconds % 60;
        let milliseconds = Math.round((seconds - Math.floor(seconds)) * 1000);
        seconds = Math.floor(seconds);
        return `${min}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }

    document.getElementById('results').innerHTML = `
                <p>Total Time: ${setTime(total)}</p>
                <p>Average Time: ${setTime(average)}</p>
                <p>Fastest Lap: ${setTime(fastest)}</p>
                <p>Slowest Lap: ${setTime(slowest)}</p>
            `;
}

/*Listen for clicks on the buttons,  assign anonymous eventhandle functions to call show functions*/
uniquenessOfRacingPage.addEventListener("click", function() {
    show("#UniquenessOfRacing", "block", "flex");
});

differentMotorsportsPage.addEventListener("click", function() {
    show("#DifferentMotorsports", "block", "block");
});

gamePage.addEventListener("click", function() {
    show("#Game", "block", "block");
    gameRunning = true;
});

calculatorPage.addEventListener("click", function() {
    show("#Calculate", "block", "block");
});

Formula1Button.addEventListener("click", function (){
    rotateButton(Formula1Button, Formula1Content);
});

NascarButton.addEventListener("click", function (){
    rotateButton(NascarButton, NascarContent);
});

WRCButton.addEventListener("click", function (){
    rotateButton(WRCButton, WRCContent);
});

WECButton.addEventListener("click", function (){
    rotateButton(WECButton, WECContent);
});

goFS.addEventListener(
    'click',
    function () {
        document.body.requestFullscreen();
    },
    false
);

uniquenessOfRacingPage.style.height = 'calc(100vh - ' + topNav[0].style.height + 'px)';

changeDisplay("#UniquenessOfRacing", "block", "flex");
changeDisplay("#DifferentMotorsports", "block", "block");
changeDisplay("#Game", "block", "block");
changeDisplay("#Calculate", "block", "block");
document.addEventListener('keydown', function (e) {
    if (e.code === "ArrowRight") {
        MovePos(15);
    }

    if (e.code === "ArrowLeft") {
        MovePos(-15);
    }
});

game.addEventListener("touchstart", (e) => {
    touchStart = e.changedTouches[0].screenX;
});

game.addEventListener("touchend", (e) => {
    touchEnd = e.changedTouches[0].screenX;
    checkDirection();
});

calculatorForm.addEventListener('change', function (){
    calculateLapTimes();
});


setInterval(MoveCone, 100);

