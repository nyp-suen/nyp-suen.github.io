
document.getElementById('js-button').addEventListener('click', () => {
    alert("E-mail submitted!");
});

//target all elements to save to constants
// const homebtn=document.querySelector("homebtn");
const page1btn=document.querySelector("#section1btn");
const page2btn=document.querySelector("#section2btn");
const page3btn=document.querySelector("#section3btn");
var allpages=document.querySelectorAll(".section");
var alltitles=document.querySelectorAll(".title");
var footericons=document.querySelectorAll(".footer-icons");
var submitbutton=document.querySelector("#js-button");


function tentacleClicked()
{
    alert("This is one of eight of the octopuses' arm! It lets the octopus forage for food and navigate the sea floor.");
}
function headClicked()
{
    alert("The head includes the mouth and the brain and contains the visceral hump that contains most of the vital organs!");
}
//select all subtopic pages
console.log(allpages);
hideall();
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it
}
for(let onetitle of alltitles){
    onetitle.style.display="none";
}
for(let onefootericons of footericons){
    onefootericons.style.display="none";
}
submitbutton.style.display="none";
}

function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#section"+pgno+"-content");
let onetitle=document.querySelector("#title"+pgno);
let onefootericons=document.querySelector("#footer-icons"+1);
if (pgno == 1)
{
    
    onefootericons.style.display="flex";
}
submitbutton.style.display="";
//show the page
onepage.style.display="flex";
onetitle.style.display="flex";

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