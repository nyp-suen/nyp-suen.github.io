
//Header picture transition
const pictures = document.querySelectorAll(".picture-holder img");
let bgindex = 0;

function picturetransition() {
    // Makes all unselected pictures hidden other than the bgindex
    pictures.forEach(function (picture) {
        picture.style.opacity = '0';
        picture.style.display = 'none';
    });


    // Show the current [bgindex] picture
    let onepicture = pictures[bgindex];
    onepicture.style.display = 'block';
    setTimeout(function () {
        onepicture.style.opacity = '0.5';
    }, 50);

    //  increment bgindex and prevent index from going out of picture-holder img length
    bgindex = (bgindex + 1) % pictures.length;

}

// set interval for picture transition to happen every 5 seconds
setInterval(picturetransition, 5000);
picturetransition(); // Show the first picture immediately




// For Domino's Pizza information Page interactivity
const dominobutton = document.querySelector("#dominobutton");
const dominospage = document.querySelector(".text#dominospage");
dominobutton.addEventListener('click', Dominos);
function Dominos() {
    // Hide Domino's page
    pizzahutpage.style.opacity = '0';
    pizzahutpage.style.display = 'none';

    dominospage.style.display = 'block';
    dominospage.style.opacity = '0'; // opacity is 0 at start
    setTimeout(function () {
        dominospage.style.opacity = '1';
    }, 50);// a slight delay to allow opacity transition after display is set to block

    window.scrollTo({
        top: window.scrollY = 1400, // control the scroll value for y-axis in pixels
        behavior: 'smooth' // scroll behaviour smooth makes the scroll not become instant
    });
}

// For Pizza Hut information Page interactivity
const pizzahutbutton = document.querySelector("#pizzahutbutton");
const pizzahutpage = document.querySelector(".text#pizzahutpage");
pizzahutbutton.addEventListener('click', PizzaHut);
function PizzaHut() {
    // Hide Domino's page
    dominospage.style.opacity = '0';
    dominospage.style.display = 'none';

    pizzahutpage.style.display = 'block';
    pizzahutpage.style.opacity = '0'; // opacity is 0 at start
    setTimeout(function () {
        pizzahutpage.style.opacity = '1';
    }, 50); // a slight delay to allow opacity transition after display is set to block  

    window.scrollTo({
        top: window.scrollY + 1500, // control the scroll value for y-axis in pixels
        behavior: 'smooth' // scroll behavior smooth makes the scroll not become instant
    });
}

//CONTENT
//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
console.log(allpages);
hideall();
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it
}}

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
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});

//show first page initally
show(1);


/* for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("#menu");

function toggleMenus() {
    /* open and close menu */
    menuItemsList.classList.toggle("menuHide");
}

/* for settings */
const settingBtn = document.querySelector("#settingIcon");
settingBtn.addEventListener("click", toggleSettings);
const settings = document.querySelector("#settings");

function toggleSettings() {
    /* open and close menu */
    settings.classList.toggle("settingHide");
}



/*enter fullscreen button */
const fullscreenBtn = document.querySelector("#screenbtnfullIcon");
fullscreenBtn.addEventListener("click", enterFullscreen);

/*exit fullscreen button */
const exitscreenBtn = document.querySelector("#screenbtnexitIcon");
exitscreenBtn.addEventListener("click", exitFullscreen);

// Function to enter fullscreen mode
function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}// Function to exit fullscreen mode
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}


// Button to restart game and reset all animation states
const restartBtn = document.querySelector("#restartBtn");
// control the game's win and lose
let priorityindex = 0;
let wrongchoice = 0;

// Function to restart game if its called
function RestartGame() {
    // Place Dough Animation Reset
    ResetDoughSize();
    ResetRoller();
    clearInterval(flattendough);
    clearInterval(step1);
    clearInterval(step2);
    clearInterval(step3);
    clearInterval(step4);
    clearInterval(step5);
    clearInterval(step6);
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);
    clearTimeout(timeout4);
    clearTimeout(timeout5);
    clearTimeout(timeout6);
    timeout1 = null;
    timeout2 = null;
    timeout3 = null;
    timeout4 = null;
    timeout5 = null;
    timeout6 = null;
    clearInterval(flattendough);


    // Place Tomato Sauce Animation Reset
    ResetScoopPos();
    clearInterval(scoop1);
    clearInterval(scoop2);
    clearInterval(scoop3);
    clearInterval(scoop4);
    clearInterval(scoop5);
    clearTimeout(scooptime1);
    clearTimeout(scooptime2);
    clearTimeout(scooptime3);
    clearTimeout(scooptime4);
    clearTimeout(scooptime5);
    scooptime1 = null;
    scooptime2 = null;
    scooptime3 = null;
    scooptime4 = null;
    scooptime5 = null;
    Sauce.style.opacity = '0';
    Sauce.style.display = 'none';

    // Place cheese animation reset
    clearInterval(grater1);
    clearInterval(grater2);
    clearInterval(grater3);
    clearInterval(grater4);
    clearTimeout(gratetime1);
    clearTimeout(gratetime2);
    clearTimeout(gratetime3);
    gratetime1 = null;
    gratetime2 = null;
    gratetime3 = null;
    cheese.style.opacity = '0';
    ResetGraterPos();

    // Place toppings animation reset
    clearInterval(boardmove1);
    clearInterval(boardmove2);
    clearInterval(boardmove3);
    clearInterval(boardmove4);
    clearTimeout(boardtime1);
    clearTimeout(boardtime2);
    clearTimeout(boardtime3);
    boardtime1 = null;
    boardtime2 = null;
    boardtime3 = null;
    boardpepperoni.style.opacity = '1';
    pepperoni.style.opacity = '0';
    pepperoni2.style.opacity = '0';
    pepperoni3.style.opacity = '0';
    pepperoni4.style.opacity = '0';
    pepperoni5.style.opacity = '0';
    ResetBoardPos();

    // set index and choice to 0
    priorityindex = 0;
    wrongchoice = 0;

    if (wrongchoice == 1) {
        restartBtn.style.display = 'block';
    }
    if (wrongchoice == 0) {
        restartBtn.style.display = 'none';
    }

    // Re enable eventlisteners
    addDoughBtn.addEventListener('click', AddDough);
    addTomatoSauceBtn.addEventListener('click', AddSauce);
    cheeseBtn.addEventListener('click', AddCheese);
    toppingBtn.addEventListener('click', AddToppings);

    restartBtn.removeEventListener('click', RestartGame);
    optionalrestart.removeEventListener('click', RestartGame);
    // Clear bake pizza animation
    clearInterval(spinpizza);
    bakedpizza.style.opacity ='0';   
    optionalrestart.style.display ='none';
}

// Add Dough Button
const addDoughBtn = document.querySelector("#doughBtn");

addDoughBtn.addEventListener('click', AddDough);


// For adding Dough
const dough = document.querySelector("#pizza-dough");
let doughwidth = 0;
let doughheight = 0;

function ResetDoughSize() {
    doughwidth = 0;
    doughheight = 0;
    UpdateDoughSize();
}

//Update Dough Size
function UpdateDoughSize() {
    dough.style.width = doughwidth + 'vw';
    dough.style.height = doughheight + 'vw';
}

// Resize Dough
function DoughSize(widthIncrement, heightIncrement) {

    if (doughwidth < 40 && doughheight < 40) {
        doughwidth += widthIncrement;
        doughheight += heightIncrement;
        UpdateDoughSize();
    }

}

// DoughSize increase value
function IncreaseDoughSize() {
    DoughSize(+0.1, +0.1);
}

let flattendough;
// Place and spreading Dough on table animation
function AddDough() {
    addDoughBtn.removeEventListener('click', AddDough);
    addTomatoSauceBtn.removeEventListener('click', AddSauce);
    cheeseBtn.removeEventListener('click', AddCheese);
    toppingBtn.removeEventListener('click', AddToppings);
    if (priorityindex != 0) {
        wrongchoice = 1;
    }
    if (wrongchoice == 1) {
        restartBtn.style.display = 'block';
        restartBtn.addEventListener('click', RestartGame);
    }
    if (wrongchoice == 0) {
        restartBtn.style.display = 'none';
    }

    // Increase size of dough continuously
    flattendough = setInterval(IncreaseDoughSize, 1);
    // Clear dough size increase after 2.5 seconds 
    timeout6 = setTimeout(function () {
        clearInterval(flattendough);
    }, 2500);

    // Set Roller Position
    rollerX = 25;
    rollerY = 10;
    UpdateRollerPos();

    // Start setting intervals for moving Pizza Dough Roller Up and Down
    step1 = setInterval(RollDown, 10);

    timeout1 = setTimeout(function () {
        clearInterval(step1);
        step2 = setInterval(RollUp, 10);
        step3 = setInterval(RollRight, 11);
    }, 100);


    timeout2 = setTimeout(function () {
        clearInterval(step2);
        step4 = setInterval(RollDown, 10);
    }, 200);

    timeout3 = setTimeout(function () {
        clearInterval(step4);
        step5 = setInterval(RollUp, 10);
    }, 600);

    timeout4 = setTimeout(function () {
        clearInterval(step5);
        step6 = setInterval(RollDown, 5);
    }, 1200);


    timeout5 = setTimeout(function () {
        clearInterval(step3);
        clearInterval(step6);
        ResetRoller();
        priorityindex = 1;
        if(wrongchoice == 0)
        {
        addTomatoSauceBtn.addEventListener('click', AddSauce);
        cheeseBtn.addEventListener('click', AddCheese);
        toppingBtn.addEventListener('click', AddToppings);
        }
    }, 1800);


}

// Animation variables
let step1;
let step2;
let step3;
let step4;
let step5;
let step6;
let timeout1;
let timeout2;
let timeout3;
let timeout4;
let timeout5;
let timeout6;
const roller = document.querySelector("#roller");
// For roller position
let rollerY = 5;
let rollerX = 5;

// Update Roller Position
function UpdateRollerPos() {
    roller.style.top = rollerY + '%';
    roller.style.left = rollerX + '%';
}

// Function to move Roller
function MoveRoller(Yincrement, Xincrement) {
    rollerY += Yincrement;
    rollerX += Xincrement;
    UpdateRollerPos();
}

// Move Roller Down
function RollDown() {
    MoveRoller(+1, 0);
}

// Move Roller Up
function RollUp() {
    MoveRoller(-1, 0);
}

// Move Roller to the right
function RollRight() {
    MoveRoller(0, +0.2);
}

// Reset Roller Position
function ResetRoller() {
    rollerX = 47;
    rollerY = 0;
    UpdateRollerPos();
}

let scoop1;
let scoop2;
let scoop3;
let scoop4;
let scoop5;
let scooptime1;
let scooptime2;
let scooptime3;
let scooptime4;
let scooptime5;
// Add sauce button
const addTomatoSauceBtn = document.querySelector("#sauceBtn");
// Get the sauce
const Sauce = document.querySelector("#tomato-sauce");

addTomatoSauceBtn.addEventListener('click', AddSauce);


// get scooper
const scooper = document.querySelector("#scooper");
let scoopY = 35;
let scoopX = 80;

// Update Scooper Position
function UpdateScooperPos() {
    scooper.style.top = scoopY + '%';
    scooper.style.left = scoopX + '%';
}

// Function to move Roller
function MoveScooper(YScoopincrement, XScoopincrement) {
    scoopY += YScoopincrement;
    scoopX += XScoopincrement;
    UpdateScooperPos();
}

// Move Scooper down
function MoveScoopDown() {
    MoveScooper(+0.1, 0);
}

// Move Scooper Up
function MoveScoopUp() {
    MoveScooper(-0.1, 0);
}

// Move Scooper to the Right
function MoveScoopRight() {
    MoveScooper(0, +0.1);
}

// Move Scooper to the left
function MoveScoopLeft() {
    MoveScooper(0, -0.1);
}

// Reset Scooper Position
function ResetScoopPos() {
    scoopY = 35;
    scoopX = 80;
    UpdateScooperPos();
}


// Animation of adding Tomato Sauce with Scooper
function AddSauce() {
    addDoughBtn.removeEventListener('click', AddDough);
    addTomatoSauceBtn.removeEventListener('click', AddSauce);
    cheeseBtn.removeEventListener('click', AddCheese);
    toppingBtn.removeEventListener('click', AddToppings);
    if (priorityindex != 1) {
        wrongchoice = 1;
    }

    if (wrongchoice == 1) {
        restartBtn.style.display = 'block';
        restartBtn.addEventListener('click', RestartGame);
    }
    if (wrongchoice == 0) {
        restartBtn.style.display = 'none';
    }
    scoop1 = setInterval(MoveScoopLeft, 1);

    Sauce.style.display = 'flex';
    scooptime1 = setTimeout(function () {
        clearInterval(scoop1);
        Sauce.style.opacity = '1';
        scoop2 = setInterval(MoveScoopUp, 1);
        scoop3 = setInterval(MoveScoopRight, 1);
    }, 2000);

    scooptime2 = setTimeout(function () {
        clearInterval(scoop2);
        clearInterval(scoop3);
        scoop4 = setInterval(MoveScoopLeft, 20);
        scoop5 = setInterval(MoveScoopDown, 1);
    }, 3000);

    scooptime3 = setTimeout(function () {
        clearInterval(scoop4);
        clearInterval(scoop5);
        ResetScoopPos();
        priorityindex = 2;
        if(wrongchoice == 0)
        {
        cheeseBtn.addEventListener('click', AddCheese);
        toppingBtn.addEventListener('click', AddToppings);
        }
    }, 5000);

}


// Add Cheese button
const cheeseBtn = document.querySelector("#cheeseBtn");
// Get the Cheese
const cheese = document.querySelector("#cheese-strip");
// Get the cheese grater
const grater = document.querySelector("#cheese-grater");
let graterX = 82;
let graterY = 70;

cheeseBtn.addEventListener('click', AddCheese);


// Update Grater Position
function UpdateGraterPos() {
    grater.style.top = graterY + '%';
    grater.style.left = graterX + '%';
}

// Function to move Grater
function MoveGrater(YGrateincrement, XGrateincrement) {
    graterY += YGrateincrement;
    graterX += XGrateincrement;
    UpdateGraterPos();
}

// Move Grater Down
function MoveGraterDown() {
    MoveGrater(+0.15, 0);
}

// Move Grater Up
function MoveGraterUp() {
    MoveGrater(-0.15, 0);
}

// Move Grater to the right
function MoveGraterRight() {
    MoveGrater(0, +0.143);
}

// Move Grater to the left
function MoveGraterLeft() {
    MoveGrater(0, -0.143);
}

// Reset Grater Position
function ResetGraterPos() {
    graterX = 82;
    graterY = 70;
    UpdateGraterPos();
}

//Variables for animation
let grater1;
let grater2;
let grater3;
let grater4;
let gratetime1;
let gratetime2;
let gratetime3;
// Animation of adding cheese
function AddCheese() {
    addDoughBtn.removeEventListener('click', AddDough);
    addTomatoSauceBtn.removeEventListener('click', AddSauce);
    cheeseBtn.removeEventListener('click', AddCheese);
    toppingBtn.removeEventListener('click', AddToppings);
    if (priorityindex != 2) {
        wrongchoice = 1;
    }

    if (wrongchoice == 1) {
        restartBtn.style.display = 'block';
        restartBtn.addEventListener('click', RestartGame);
    }
    if (wrongchoice == 0) {
        restartBtn.style.display = 'none';
    }

    grater1 = setInterval(MoveGraterUp, 1);
    grater2 = setInterval(MoveGraterLeft, 1);


    gratetime1 = setTimeout(function () {
        clearInterval(grater1);
        clearInterval(grater2);
        cheese.style.opacity = '1';
    }, 1000);

    gratetime2 = setTimeout(function () {
        grater3 = setInterval(MoveGraterDown, 1);
        grater4 = setInterval(MoveGraterRight, 1);
    }, 1500);

    gratetime3 = setTimeout(function () {
        clearInterval(grater3);
        clearInterval(grater4);
        ResetGraterPos();
        priorityindex = 3;
        if(wrongchoice == 0)
        {
        toppingBtn.addEventListener('click', AddToppings);
        }
    }, 2500);

}

// Add toppings button
const toppingBtn = document.querySelector("#toppingBtn");
// Get the Board
const board = document.querySelector("#board");

// Get the Pepperoni
const boardpepperoni = document.querySelector(".pepperoni");
// Get the Pepperoni-spread
const pepperoni = document.querySelector("#pepperoni-spread");
const pepperoni2 = document.querySelector("#pepperoni-spread2");
const pepperoni3 = document.querySelector("#pepperoni-spread3");
const pepperoni4 = document.querySelector("#pepperoni-spread4");
const pepperoni5 = document.querySelector("#pepperoni-spread5");
// Click event listener
let boardY = 11;
let boardX = 81;

toppingBtn.addEventListener('click', AddToppings);


// Animation variables for adding topping
let boardmove1;
let boardmove2;
let boardmove3;
let boardmove4;
let boardtime1;
let boardtime2;
let boardtime3;
// Animation of adding toppings
function AddToppings() {
    addDoughBtn.removeEventListener('click', AddDough);
    addTomatoSauceBtn.removeEventListener('click', AddSauce);
    cheeseBtn.removeEventListener('click', AddCheese);
    toppingBtn.removeEventListener('click', AddToppings);
    if (priorityindex != 3) {
        wrongchoice = 1;
    }
    if (wrongchoice == 1) {
        restartBtn.style.display = 'block';
        restartBtn.addEventListener('click', RestartGame);
    }
    if (wrongchoice == 0) {
        restartBtn.style.display = 'none';
    }

    boardmove1 = setInterval(MoveBoardDown, 1);
    boardmove2 = setInterval(MoveBoardLeft, 1);

    boardtime1 = setTimeout(function () {
        clearInterval(boardmove1);
        clearInterval(boardmove2);
        boardpepperoni.style.opacity = '0';
        pepperoni.style.opacity = '1';
        pepperoni2.style.opacity = '1';
        pepperoni3.style.opacity = '1';
        pepperoni4.style.opacity = '1';
        pepperoni5.style.opacity = '1';
    }, 1000);

    boardtime2 = setTimeout(function () {
        boardmove3 = setInterval(MoveBoardUp, 1);
        boardmove4 = setInterval(MoveBoardRight, 1);

    }, 1500);

    boardtime3 = setTimeout(function () {
        clearInterval(boardmove3);
        clearInterval(boardmove4);
        ResetBoardPos();      
        if(wrongchoice == 0)
        {
        bakeBtn.addEventListener('click', BakePizza);
        bakeBtn.addEventListener('click', PizzaRoll);
        }
    }, 2500);


}




// Update Board Position
function UpdateBoardPos() {
    board.style.top = boardY + '%';
    board.style.left = boardX + '%';
}

// Function to move Board
function MoveBoard(YBoardincrement, XBoardincrement) {
    boardY += YBoardincrement;
    boardX += XBoardincrement;
    UpdateBoardPos();
}

// Move board down
function MoveBoardDown() {
    MoveBoard(+0.12, 0);
}

// Move board up
function MoveBoardUp() {
    MoveBoard(-0.12, 0);
}

// Move board right
function MoveBoardRight() {
    MoveBoard(0, +0.137);
}

// Move board left
function MoveBoardLeft() {
    MoveBoard(0, -0.137);
}

// Move board
function ResetBoardPos() {
    boardY = 11;
    boardX = 81;
    UpdateBoardPos();
}

// Get the bake button
const bakeBtn = document.querySelector("#bakeBtn");
var angle = 0;
let spinpizza;
// Get the baked pizza
const bakedpizza = document.querySelector("#baked-pizza");

const optionalrestart = document.querySelector("#optionalrestartBtn");


// Animation to bake pizza
function BakePizza() {
    bakeBtn.removeEventListener('click', BakePizza);
    angle += 10;
    bakedpizza.style.opacity = '1';
    bakedpizza.style.transform = 'rotate(' + angle + 'deg)';
    optionalrestart.style.display ='block';
    optionalrestart.addEventListener('click',RestartGame);
}

// set interval for pizza roll
function PizzaRoll() {
    spinpizza = setInterval(BakePizza, 35);
    bakeBtn.removeEventListener('click', PizzaRoll);
}









