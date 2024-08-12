/*jshint esversion: 6 */

//0 = introduction, 1 = periods, 2 = evolution of homo, 3 = mini game
var sections = [
    document.querySelector("#intro"),
    document.querySelector("#periods"),
    document.querySelector("#humanEVO"),
    document.querySelector("#miniGame")
];

//fold nav button
var foldNav = [
    document.querySelector("#foldNavButton"),
    document.querySelector("#foldNav")
];

//nav buttons
var navButtonsList = document.querySelector("#topNav");

// when the value of the fold button been change
foldNav[1].addEventListener("change", function () {

    //if the button is not selected, change it to selected
    if (foldNav[0].value == "radioButton") {
        foldNav[0].className = ("radioButtonSelected");
    }
    else {
        //if the button is selected, change it to not selected
        foldNav[0].className = ("radioButton");
    }

    //change the nav button list between hide and not hide
    navButtonsList.classList.toggle("hide");
});

//use to store section that on display
var sectionDisplay = 0;

//array all navigation button in the web, odd index = label, even index = radio button
var navButtons = document.querySelectorAll("#topNav .radioButton, #topNav  .radioButtonSelected");

//add event listener to radio, to moniter the change event of the button
for (var i = 1; i < navButtons.length; i += 2) {

    //set index attr
    navButtons[i].setAttribute("index", (i - 1));

    //add event listener
    navButtons[i].addEventListener("change", changeSectionDisplay);
}

function changeSectionDisplay() {

    //get the index it represented
    var temp = event.target.getAttribute("index");

    if (navButtons[temp].className == "radioButton") {

        navButtons[temp].className = "radioButtonSelected";

        // the section page to hide 
        sections[sectionDisplay].classList.toggle("hide");

        //update the index of page currently display
        sectionDisplay = temp / 2;

        // show the section on display
        sections[sectionDisplay].classList.toggle("hide");
    }

    //set the previous selected button to not selected
    for (var i = 0; i < navButtons.length; i += 2) {
        if (i == temp) {
            continue;
        }

        navButtons[i].className = "radioButton";
    }
}

//time slot in time table
var timeTableSlots = document.querySelectorAll("#periods div.timeTable ul.timeTableSlot li.timeSlot");

//the period divs in the periods page
var periods = document.querySelectorAll("#periods div.period");

//the index of period that currently display
var periodShow = 0;

for (var i = 0; i < timeTableSlots.length; ++i) {

    //set index attr
    timeTableSlots[i].setAttribute("index", i);

    //in default only the first periods will show
    if (i != 0) {
        periods[i].classList.add("hide");
    }

    //when time slot been click, change the period that currently show
    timeTableSlots[i].addEventListener("click", changePeriodDisplay);
}
function changePeriodDisplay()
{
    timeTableSlots[periodShow].classList.remove("selected");
    periods[periodShow].classList.add("hide");

    periodShow = event.target.getAttribute("index");

    timeTableSlots[periodShow].classList.add("selected");
    periods[periodShow].classList.remove("hide");
}


//time line bar
var timeRangeBar = document.querySelector("div#humanEVO>div#timeLine>form>input[type=range]");

//time number input
var timeNum = document.querySelector("div#humanEVO>div#timeLine>form>div>input[type=number]");

//go button in the time line nav
var goButton = document.querySelector("div#humanEVO>div#timeLine>form>button");

//evolution stages div
var evoStages = document.querySelectorAll("div#humanEVO>div#stageDetail>div.evoStage");

//time enter in time line nav
var timeEnter = -542000000;

//when time enter, update both time line and time number input
timeRangeBar.addEventListener("input", function (event) {
    updateTimeAgo(event);
});

timeNum.addEventListener("input", function (event) {
    updateTimeAgo(event);
});


//function to update both time line and number time
function updateTimeAgo(event) {

    if (event.target.type == "range") {

        // convert percentage to number 
        timeEnter = -5420000 * (100 - event.target.value);
        timeNum.value = timeEnter;
    }
    else if (event.target.type == "number") {

        // convert number to percentage 
        timeEnter = event.target.value;
        timeRangeBar.value = (-542000000 - timeEnter) / -5420000;
        console.log((-542000000 - timeEnter) / -5420000);
    }
}

goButton.addEventListener("click", function () {

    // when click on go button, according to the time enter, scroll to according stage 
    if (timeEnter >= -542000000 && timeEnter < -485000000) {

        scrollToElement(evoStages[0]);
    }
    else if (timeEnter >= -485000000 && timeEnter < -440000000) {

        scrollToElement(evoStages[1]);
    }
    else if (timeEnter >= -440000000 && timeEnter < -419000000) {

        scrollToElement(evoStages[2]);
    }
    else if (timeEnter >= -419000000 && timeEnter < -358000000) {

        scrollToElement(evoStages[3]);
    }
    else if (timeEnter >= -358000000 && timeEnter < -200000000) {

        scrollToElement(evoStages[4]);
    }
    else if (timeEnter >= -358000000 && timeEnter < -65000000) {

        scrollToElement(evoStages[5]);
    }
    else if (timeEnter >= -65000000 && timeEnter < -2700000) {

        scrollToElement(evoStages[6]);
    }
    else if (timeEnter >= -2700000 && timeEnter < -300000) {

        scrollToElement(evoStages[7]);
    }
    else if (timeEnter >= -300000 && timeEnter <= 0) {

        scrollToElement(evoStages[8]);
    }
});

// function to scroll to specific element 
function scrollToElement(element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
}


//return top button
var returnTop = document.querySelector("#returnTop");

//when return top button been click, scroll to very top
returnTop.addEventListener("click", function () {
    scrollToY(0);
});

returnTop.addEventListener("animationend", function () {

    if (returnTop.style.animationDirection == "reverse") {
        returnTop.classList.add("hide");
        returnTop.classList.remove("animationComplete");
    }

    returnTop.style.animation = null;

});

//function to scroll to the give y position
function scrollToY(y) {
    window.scrollTo({ top: y, behavior: "smooth" });
}

//when the web been scrolled
document.addEventListener("scroll", function () {

    hideShowReturnTop();

    hideShowEvoStage();

});

// function to show and hide return top button 
function hideShowReturnTop() {
    //if scroll down, show the return top button
    if (window.scrollY > 0 && !returnTop.classList.contains("animationComplete")) {
        returnTop.classList.remove("hide");
        returnTop.classList.add("animationComplete");

        returnTop.style.animation = "returnTopEnter 0.5s forwards running";
    }
    else if (window.scrollY == 0) {    //if scroll up to top, hide the return top button
        returnTop.style.animation = "returnTopEnter 0.5s reverse forwards running";
    }
}

// functon to show and hide evo stages accroding to y scrolling
function hideShowEvoStage() {
    //scroll distance in y
    var scrollDistance = window.scrollY;

    // the top of the display zone
    var viewPortTop = scrollDistance;

    //the bottom of the display zone
    var viewPortBottom = (window.innerHeight * (3 / 4)) + scrollDistance;

    for (var i = 0; i < evoStages.length; ++i) {
        //if the stage is higher than view port bottom, show it
        if (evoStages[i].offsetTop < viewPortBottom) {
            evoStages[i].style.animation = "fadeIn 1s forwards";
        }
        else if ((evoStages[i].offsetTop + evoStages[i].clientHeight) < viewPortTop || (evoStages[i].offsetTop) > viewPortBottom) //if the stage is higher than view port top, hide it
        {
            evoStages[i].style.animation = null;
        }
    }
}




//game field
var gameField = document.querySelector("div#miniGame>div#gameField");

//player element
var player = document.querySelector("div#miniGame>div#gameField>div#player");

//food elements
var foods = document.querySelectorAll("div#miniGame>div#gameField>div.food");

//player and enemy circle collider size
var playerColliderSize = 2;
var foodColliderSize = 1;

//player position
var posX = 48;
var posY = 48;

//player moving destination
var desX = 48;
var desY = 48;

//player movement direction
var dirX = 0;
var dirY = 0;

//the stage game in
var stage = 0;

var haveEatenFood = false;

//count down of respawn food
var countDown = 0;

//index of creature player currently in
var creatureIndex = 0;

//three game period 
var gamePeriods = ["before cambrain", "cambrain", "devonian"];

//array of creatures 
var creatures = ["Single-celled organisms", "Arthropoda", "Chordate", "Malacostraca", "Insect", "Ostracoderm", "Sarcopterygii"];

//array of link of img of creatures
var creatureImgs = ["unicell.jpeg", "trilobita.jpeg", "yunnanozoon.jpg", "carb.jpeg", "insect.webp", "agnatha.jpg", "devonian_fish_onland.jpg"];

//array of information of creature.
var creatureIntros = [
    "you are a organism form by only one cell.",
    "you choose to grow your shall and bone outside of the body, this protect you from any attack.",
    "you choose to grow your bone inside your body, this give you strong flexibility.",
    "you choose to continue stay in water, in the future, most of your fellows extinct, some of the survivors become the creature like carb and shrimp.",
    "you choose to move to land, in the future you evoluted into the insect.",
    "you choose to grow hard shall outside of your body, this make you become the top predator in devonian, but in the great extinction at the end of the devonian you and all your fellow extinct.",
    "you choose to grow flesh fin, this support you to move on land, in the future, you and your fellow will be move to land and form a kingdow of chordate"
];

//label of evolute button
var leftButtonLabels = [
    "grow bone outside",
    "stay in water",
    "grow hard shall"

];
var rightButtonLabels = [
    "grow bone inside",
    "move to land",
    "grow flesh fin"
];

//game process
var game = null;

//game for each stage
var goals = [100, 300];

//current progress of the stage
var progress = 0;

//if game end
var gameEnd = true;

//if game paused
var gamePause = false;

//progress bar ui
var progressBar = document.querySelector("div#miniGame>div#gameStatus>div#progress>p:nth-child(2)");

//current period ui
var currentPeriod = document.querySelector("div#miniGame>div#gameStatus>div#currentPeriod>p:nth-child(2)");

//current creature ui
var currentCreature = document.querySelector("div#miniGame>div#gameStatus>div#currentCreature>p:nth-child(2)");

//current creature intro ui
var currentCreatureIntro = document.querySelector("div#miniGame>div#creatureIntro>div>p:nth-child(2)");

//current creature img ui
var currentCreatureImg = document.querySelector("div#miniGame>div#creatureImage>img");

//evolute buttons
var evoluteButtons = document.querySelector("div#miniGame>div#gameField>div#evoluteButtons");

//left evolute button
var leftButton = document.querySelector("div#miniGame>div#gameField>div#evoluteButtons>button:first-child");

//right evolute button
var rightButton = document.querySelector("div#miniGame>div#gameField>div#evoluteButtons>button:last-child");

//game start button
var startButton = document.querySelector("div#miniGame>div#gameControl>div>button:first-child");

//pause game button
var pauseButton = document.querySelector("div#miniGame>div#gameControl>div>button:last-child");

//load sfxs
var coinPickupSFX = new Audio("./sfx/coin_pickup.mp3");
var evolute = new Audio("./sfx/level_up.mp3");
var gameStart = new Audio("./sfx/game_start.mp3");

//vector 2 class use to store position
class vector2 {
    constructor(x, y, x_offset, y_offset) {
        this.x = x + x_offset;
        this.y = y + y_offset;

        this.x_offset = x_offset;
        this.y_offset = y_offset;
    }

    setX(x) {
        this.x = x + this.x_offset;
    }

    setY(y) {
        this.y = y + this.y_offset;
    }

}

//create the food elements
var foods = Array();
var foodPositions = Array();
for (var i = 0; i < 10; ++i) {

    //create the food element and store to food array, create the food position and store to food position array
    foodPositions[i] = new vector2(0, 0, 0, -(67 + (i * 2)));
    foods[i] = document.createElement("div");
    foods[i].classList.add("food");
    foods[i].style.visibility = "hidden";

    //set the position of the food
    foods[i].style.left = foodPositions[i].x + "%";
    foods[i].style.top = foodPositions[i].y + "%";

    //attach to the game field
    gameField.append(foods[i]);
}

//when click on start game button, start a new game
startButton.addEventListener("click", startGame);
function startGame() {

    //end the previous game process
    endGame();

    //reset player transition variable
    posX = 48;
    posY = 48;

    desX = 48;
    desY = 48;

    dirX = 0;
    dirY = 0;

    //rest the foods
    for (var i = 0; i < 10; ++i) {

        foods[i].style.visibility = "hidden";
    }

    //rest the progress of the game
    stage = 0;
    progress = 0;
    creatureIndex = 0;

    //rest the food respawn count down
    countDown = 0;

    //hide the evolute buttons
    evoluteButtons.style.visibility = "hidden";

    //reset the ui
    updateCreature();
    updateGameStage();
    updateProgressBar();

    //set game end to false;
    gameEnd = false;

    //reset the game pause status 
    gamePause = true;
    pauseGame();

    gameStart.play();

    //start a new game process
    game = setInterval(gameLoop, 16);
}

//add click event listener to pause button
pauseButton.addEventListener("click", pauseGame);
function pauseGame() {

    if (gameEnd == false) {
        //set the oppposite of the game pause status
        gamePause = !gamePause;

        //update the label of the button
        if (gamePause) {
            pauseButton.innerHTML = "Continue";
        }
        else {
            pauseButton.innerHTML = "Pause";
        }
    }
}

//function that end the game
function endGame() {

    if (gameEnd == false) {

        //set game end to true
        gameEnd = true;

        //end current game process
        clearInterval(game);
    }
}

gameField.addEventListener("click", function (event) {

    //only run if the game is not on pause
    if (gamePause == false) {

        //new destination of player
        setPlayerDestination(event);
    }

});

function setPlayerDestination(event) {

    //get the game field element
    var target = event.target;

    //if player click on the other element on game field
    if (target.id != "gameField") {
        target = target.parentElement;
    }

    //get the rect data of the game field
    var rect = target.getBoundingClientRect();

    //calculate the new destination of the player to relative percentage of game field
    desX = (event.clientX - rect.left) / rect.width;
    desX -= 0.02;
    desX *= 100;

    desY = (event.clientY - rect.top) / rect.height;
    desY -= 0.02;
    desY *= 100;
}

function playerMovement() {
    //calculate the direction of the movemnet
    dirX = desX - posX;
    dirY = desY - posY;

    //normalize the moving direction
    var mag = calMag(posX, posY, desX, desY);
    if (mag > 0) {
        dirX = dirX / mag;
        dirY = dirY / mag;
    }

    //update the position
    posX += dirX * 0.0166 * 20;
    posY += dirY * 0.0166 * 20;

    player.style.left = posX + "%";
    player.style.top = posY + "%";
}

// update current game stage ui
function updateGameStage() {
    currentPeriod.innerHTML = gamePeriods[stage];
}

// update current stage progress ui
function updateProgressBar() {
    progressBar.style.width = ((progress / goals[stage]) * 100) + "%";
}


function gameLoop() {

    // if the evolute button been showed the game is force to pause
    if (evoluteButtons.style.visibility == "visible") {
        gamePause = false;
        pauseGame();
    }

    //only run when the game is not on pause status
    if (gamePause == false) {

        //if there is eaten food do the respawn countdown
        if (haveEatenFood) {
            countDown -= 1;
        }

        playerMovement();

        for (var i = 0; i < 10; ++i) {

            //check collision between player and foods
            if (checkCollision(posX + playerColliderSize, posY + playerColliderSize, foodPositions[i].x - foodPositions[i].x_offset + foodColliderSize, foodPositions[i].y - foodPositions[i].y_offset + foodColliderSize, playerColliderSize, foodColliderSize)) {

                //if the foods haven't beent eaten
                if (foods[i].style.visibility != "hidden") {

                    coinPickupSFX.play();

                    //increase the progress and update ui
                    progress += 50;
                    updateProgressBar();

                    //the set the food to eaten
                    foods[i].style.visibility = "hidden";
                }

                //if the progress reach the goal of the stage
                if (progress >= goals[stage] && stage < 2) {

                    //update game current game progress
                    stage++;
                    progress = 0;

                    //update the ui of the game
                    updateProgressBar();
                    updateGameStage();
                    updateButtonLabel();
                    evoluteButtons.style.visibility = "visible";

                    //if player reach the final stage end the game process
                    if (stage == 2) {
                        endGame();
                    }
                }
            }

            //if there is eaten food update the status
            if (haveEatenFood == false && foods[i].style.visibility == "hidden") {

                haveEatenFood = true;
            }


            if (foods[i].style.visibility == "hidden" && countDown <= 0) {

                //randomize a new position
                foodPositions[i].setX(Math.random() * 100);
                foodPositions[i].setY(Math.random() * 100);

                foods[i].style.left = foodPositions[i].x + "%";
                foods[i].style.top = foodPositions[i].y + "%";

                //reset the visibilirty to visible
                foods[i].style.visibility = "visible";

                //reset the respawn countdown
                countDown = 120;
                haveEatenFood = false;
            }
        }
    }
}

//update the evolute button label, according to creature index
function updateButtonLabel() {
    leftButton.innerHTML = leftButtonLabels[creatureIndex];
    rightButton.innerHTML = rightButtonLabels[creatureIndex];
}

leftButton.addEventListener("click", leftEvoluteButton);
rightButton.addEventListener("click", rightEvoluteButton);

//update the creature information
function updateCreature() {

    //update the creature name ui
    currentCreature.innerHTML = creatures[creatureIndex];

    //update the creature img ui
    currentCreatureImg.src = "img/" + creatureImgs[creatureIndex];

    //update the creature intro ui
    currentCreatureIntro.innerHTML = creatureIntros[creatureIndex];

    //hide the evolute button after update
    evoluteButtons.style.visibility = "hidden";
}

function leftEvoluteButton() {

    //change the creature index according to current creature index
    switch (creatureIndex) {
        case 0:
            {
                creatureIndex = 1;
                break;
            }
        case 1:
            {
                creatureIndex = 3;
                break;
            }
        case 2:
            {
                creatureIndex = 5;
                break;
            }
    }

    //update creature information
    updateCreature();

    //play evolute sfx
    evolute.play();

    //continue the game when player make evolution decision
    gamePause = true;
    pauseGame();
}

function rightEvoluteButton() {

    //change the creature index according to current creature index
    switch (creatureIndex) {
        case 0:
            {
                creatureIndex = 2;
                break;
            }
        case 1:
            {
                creatureIndex = 4;
                break;
            }
        case 2:
            {
                creatureIndex = 6;
                break;
            }
    }


    //update creature informations
    updateCreature();

    //play evolute sfx
    evolute.play();

    //continue the game when player make evolution decision
    gamePause = true;
    pauseGame();
}

//function use to calculate magnitude
function calMag(pos_X_1, pos_Y_1, pos_X_2, pos_Y_2) {
    var x = pos_X_1 - pos_X_2;
    var y = pos_Y_1 - pos_Y_2;

    var mag = Math.sqrt((x * x) + (y * y));

    return mag;
}

//function use to check circle collision
function checkCollision(pos_X_1, pos_Y_1, pos_X_2, pos_Y_2, collider_rad_1, collider_rad_2) {
    var distance = calMag(pos_X_1, pos_Y_1, pos_X_2, pos_Y_2);

    return (distance <= (collider_rad_1 + collider_rad_2));
}

//calculate the margin of mini game when loaded
window.addEventListener("load", function () {

    calMiniGameMargin();
});

//realculate the margin of mini game when window been resize
window.addEventListener("resize", function () {

    calMiniGameMargin();
});

//function to calculate the mini game margin
function calMiniGameMargin() {
    var emptySpace = ((window.innerWidth - 1000) / 2);
    if (emptySpace > 0) {
        sections[3].style.marginLeft = ((window.innerWidth - 1000) / 2) + "px";
    }
}