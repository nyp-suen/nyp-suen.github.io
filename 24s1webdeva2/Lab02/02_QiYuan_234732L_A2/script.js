//functions
var menu = false;
var tree = true;
function changeImg(){
    // change image between tre and paper
    const img = document.getElementById("change_img");
    if (tree == true){
        img.src='images/paper.png';
        img.style.height='100px';
    }
    else{
        img.src='images/tree.png';
        img.style.height='100px';
    }
    tree=!tree;
}
// do changeimg every 1 second
setInterval(changeImg,1000);
function menuclick(){
    menu = !menu;
    var menuImage = document.getElementById("menu");

    if (menu == true){
        // show buttons
        document.getElementById("page1btn").style.display = 
        document.getElementById("page2btn").style.display = 
        document.getElementById("page3btn").style.display = "block";
        menuImage.src = "images/menu_close.png";
    }
    else{
        // hide buttons
        document.getElementById("page1btn").style.display = 
        document.getElementById("page2btn").style.display = 
        document.getElementById("page3btn").style.display = "none";
        menuImage.src = "images/menu.png";
    }
}

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
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});

