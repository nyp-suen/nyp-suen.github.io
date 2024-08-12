const page1btn=document.querySelector("#k1");
const page2btn=document.querySelector("#k2");
const page3btn=document.querySelector("#k4");
const page4btn=document.querySelector("#c1");
const page5btn=document.querySelector("#c2");

var allpages=document.querySelectorAll(".boat-page");
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
    onepage.style.display="flex";

}

show(1);



/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function 

i.e, BUTTONS*/
page1btn.addEventListener("click", function () { 
    show(1); 
});
page2btn.addEventListener("click", function () { 
    show(2); 
});
page3btn.addEventListener("click", function () {
    show(3); 
});

page4btn.addEventListener("click", function () {
    show(4); 
});

page5btn.addEventListener("click", function () {
    show(5); 
});
