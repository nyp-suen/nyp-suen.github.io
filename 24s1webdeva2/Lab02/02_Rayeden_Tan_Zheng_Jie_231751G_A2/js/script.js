

//target all elements to save to constants
const unselectedItems=document.querySelectorAll(".sideBar p");
const Choices=document.querySelectorAll(".responsive-menu ul li");
const allpages=document.querySelectorAll(".mainContent div.main");
const infopage = document.querySelectorAll(".mainContent .Storage div.storageimages img");
//select all subtopic pages
hideallmainpages();
show("Motherboard");
hidepages(document.querySelectorAll(".mainContent div.Storage div.info"));
document.querySelector(".responsive-menu ul").style.display = "none";





/*Listen for clicks on all side bar options*/
for(let item of unselectedItems) {
    item.addEventListener("click", sidebarFunc.bind(null));
}

//function is declared seprately to prevent
/*  "Functions declared within loops referencing an 
    outer scoped variable may lead to confusing 
    semantics." warning*/
function sidebarFunc (variable) {
    document.querySelector(".selected").classList.replace("selected","unselected");

    variable.target.classList.remove("unselected");
    variable.target.classList.add("selected"); 

    show(variable.target.id);
}





/*Listen for clicks on hmaburger menu options*/
for (let choice of Choices) {
    choice.addEventListener("click", hamburgerFunc.bind(null));
}

//function is declared seprately to prevent
/*  "Functions declared within loops referencing an 
    outer scoped variable may lead to confusing 
    semantics." warning*/
function hamburgerFunc(variable) {
    if (document.querySelector(".sideBar p.selected").id != variable.target.classList) {
        document.querySelector(".sideBar p.selected").classList.replace("selected","unselected");
        document.querySelector(".sideBar p#" + variable.target.classList).classList.replace("unselected","selected");
    }

    show(variable.target.classList);
}




//used to show the pros and cons of each storage devices type
//and update descriptor to show what player is hovering over
for (let page of infopage) {
    page.addEventListener("click", proconFunc.bind(null));
    page.addEventListener("mouseover", textUpdate.bind(null));
}

//function is declared seprately to prevent
/*  "Functions declared within loops referencing an 
    outer scoped variable may lead to confusing 
    semantics." warning*/
function proconFunc(variable) {
    hidepages(document.querySelectorAll(".mainContent div.Storage div.info"));
    let onepage=document.querySelector(".mainContent div.Storage div."+variable.target.classList);
    onepage.style.display="flex";
}

function textUpdate(variable) {
    document.querySelector(".mainContent .Storage div.descriptor p").innerHTML = variable.target.classList;
}



//used to hide or show the hamburger responsive menu
document.querySelector(".responsive-menu").addEventListener("click", function() {
    if (window.getComputedStyle(document.querySelector(".responsive-menu ul")).display == "none"){
        document.querySelector(".responsive-menu ul").style.display = "block";
    }
    else {
        document.querySelector(".responsive-menu ul").style.display = "none";
    }
});


//used to hide an array of pages
function hidepages(pages) { //function to hide all requested pages
    for(let onepage of pages) { //go through requested pages
        onepage.style.display="none"; //hide it
    }
}


//hides all of the main content pages
function hideallmainpages() { //function to hide all main pages
    for(let onepage of allpages) { //go through all mainpages
        onepage.style.display="none"; //hide it
    }
}

function show(page) { //function to show selected page no
    hideallmainpages();
    //select the page based on the parameter passed in
    let onepage=document.querySelector(".mainContent ."+page);
    //show the page
    onepage.style.display="block";

    //delat here to allow transition to     work when the block starts appearing for the first time
    setTimeout( function() {
         //opacity of image set to 0 when not shown
        for (let selected of document.querySelectorAll(".mainContent div")) {
            if (selected.classList.contains("selected")) {
               selected.classList.replace("selected","unselected");
               break;
           }else{
               continue;
          }
        }
        onepage.classList.replace("unselected","selected");
                  
    }, 50);
}
