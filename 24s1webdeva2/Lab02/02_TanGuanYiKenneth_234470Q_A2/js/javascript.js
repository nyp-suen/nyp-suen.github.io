//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
var allpages = document.querySelectorAll(".page");
//select all subtopic pages
//console.log(allpages);
hideall();
show(1);

/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("nav ul");

/*audio*/
var audioTrack1 = new Audio('music/snowflake_dance.ogg');
audioTrack1.loop = true;
const audioButton = document.querySelector("#audioButton");

/*fields for quiz*/
const gamescreen = document.querySelector("#gamescreen");
const answerscreen = document.querySelector("#answerscreen");
const submitquiz = document.querySelector("#submitquiz");

function toggleMenus() { /*open and close menu*/
    /*
    if (menuItemsList.style.display == "block")
        menuItemsList.style.display = "none";
    else menuItemsList.style.display = "block";
    */
   menuItemsList.classList.toggle("menuHide");
}

function hideall() 
{ //function to hide all pages
    for (let onepage of allpages) 
    { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(pgno) 
{ //function to show selected page no
    hideall();

    //transition effect
    //transition

    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    //show the page
    onepage.style.display = "block";
}

//function to play audio
function playAudio()
{
    audioTrack1.play();
}

function showAnswer()
{
    gamescreen.style.display = "none";
    answerscreen.style.display = "block";
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () 
{
    show(1);
});

page2btn.addEventListener("click", function () 
{
    show(2);
});

page3btn.addEventListener("click", function () 
{
    show(3);
});

page4btn.addEventListener("click", function () 
{
    show(4);
});

//audio event listener
audioButton.addEventListener("click",function()
{
    audioButton.innerHTML="Music: on <br> Music by: Crescendo";   
    playAudio();
});

//quiz event listener
submitquiz.addEventListener("click",function(){
    showAnswer();
});