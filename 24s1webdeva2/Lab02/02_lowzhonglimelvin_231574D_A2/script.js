//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");

//select all subtopic pages
hideall();

function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}
function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    //show the page
    onepage.style.display = "block";
}

function showMenu() {//function to show full menu
    //select 
    let ul = document.querySelector("ul");

    if (ul.style.display == "block") {//show menu
        ul.style.display = "none";
    }
    else
        ul.style.display = "block";
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


/*for hamMenu */
const menuItemsList = document.querySelector("ul li ");

function toggleMenus() { /*open and close menu*/
    menuItemsList.classList.toggle("menuShow");

}//can optimize using toggle class with css transitions

const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
hamBtn.addEventListener("click", showMenu);

function playAudio(id) {
    let audio = document.getElementById(id);
    audio.play();
}

//for game
//select html components
const pointsScore = document.getElementById("points");
const goodfood = document.getElementsByClassName("good")[0];
const badfood = document.getElementsByClassName("bad")[0];

//create variables
var points = 0;

//function to update the points
function updatepoints() {
    pointsScore.innerHTML = "Points: " + points;
}

//function to add points
function addpoints() {
    points++;
    updatepoints();
    playAudio("yum");
}

//function to remove points
function removepoints() {
    points--;
    updatepoints();
    playAudio("vomit");
}

//add onclick events to add/remove points
goodfood.addEventListener("click", addpoints);
badfood.addEventListener("click", removepoints);

toggleMenus();

