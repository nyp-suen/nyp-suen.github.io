

const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
var allpages=document.querySelectorAll(".page");
var moveableItems = document.querySelectorAll(".moveable");
var popsound = document.getElementById("PopAudio");
var jumpsound = document.getElementById("JumpAudio");
var meowsound = document.getElementById("MeowAudio");
var clicksound = document.getElementById("ClickAudio");

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
clicksound.play();
});
page2btn.addEventListener("click", function () {
randomAll();
show(2);
clicksound.play();
});
page3btn.addEventListener("click", function () {
show(3);
clicksound.play();
});
page4btn.addEventListener("click", function () {
    show(4);
    clicksound.play();
    });
//JS for hamMenu
const hamBtn=document.querySelector("#hamIcon");
hamBtn.addEventListener("click",toggleMenus);
const menuItemsList=document.querySelector("nav div");
function toggleMenus(){ /*open and close menu*/
    menuItemsList.classList.toggle("menuHide");

}

//JS CODE FOR PAGE 3

//code for moving between different cat pages

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let countItem = items.length; //number of pages
let itemActive = 0; //index for pages

next.onclick = function(){ //increasing index 
    itemActive = itemActive +1;
    if (itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
    
};

prev.onclick = function(){ //decreasing index
    itemActive = itemActive -1;
    if (itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
    
};

function showSlider(){ //changing page by adding and removing "active" class from page
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    
    itemActiveOld.classList.remove('active');

    items[itemActive].classList.add('active');

    meowsound.play();
    

}


//Code for cat breed mix form 
const catBreedButton = document.querySelectorAll(".catBreedCheck");
var parentButton;


catBreedButton.forEach(function(button) {
    button.addEventListener("click", function() {
        parentButton = button.parentElement;
        getOption();
    });
});


var output;
var output2;

//checking through the two options the player selects and checking through all the pages if their class contains those options 
function getOption() {
    var selectElement;
    var selectElement2;
        selectElement = parentButton.querySelector('.Catbreed');
        output = selectElement.value;
        
        selectElement2 = parentButton.querySelector('.CatBreed2');
        console.log(selectElement + " " + selectElement2 + " " + parentButton.id);
        output2 = selectElement2.value;
        console.log("-----------BREAK-----------");
        clicksound.play();
        if (output == output2){
            output2 = "Pure";
        }
    
        const item = document.querySelectorAll('.content');
        let containsOutput = false;
        let containsOutput2 = false;

        var itemCount = 0;

        for (let items of item){
            console.log(output + " " + output2 + items.classList);
            containsOutput = false;
            containsOutput2 = false;
            if (items.classList.contains(output)){
                console.log(output);
                containsOutput = true;
            }
            if (items.classList.contains(output2)){
                console.log(output2);
                containsOutput2 = true;
            }
            if (containsOutput && containsOutput2){
                console.log(itemCount);
                console.log("confirm");
    
    
    
                itemActive = itemCount;
                if (itemActive >= item.length){
                    itemActive = 0;
                }
                showSlider();
            }else{
                itemCount++;
            }
        }

 

}
//JS CODE FOR PAGE 2
//making the text in the centre
function chnageMiddle(){

    document.querySelector("#catbehavior").style.left = "50%";
    var leftofthing = parseInt(window.getComputedStyle(document.querySelector("#catbehavior")).getPropertyValue("left"));
    var sizeofwidth = (document.querySelector("#catbehavior")).scrollWidth/2;

    var newLeft = leftofthing - sizeofwidth;

    document.querySelector("#catbehavior").style.left = newLeft.toString() + "px";
   
}
setInterval(chnageMiddle,100);


var prevObject = "";
var clickObject = "";
var currentX,currentY,prevX,prevY;

var clickableItems = document.querySelectorAll(".clickable");

//randomly placing the items in random locations of the screen
function randomAll(){
    console.log("random");
    for (let oneItem of moveableItems){
        oneItem.style.top = Math.floor(Math.random() * 60) + 30 + '%';
        oneItem.style.left = Math.floor(Math.random() * 90) + '%';
        console.log(oneItem.style.top.toString() + " " + oneItem.style.left.toString());
    }
}

//clicking the item and storing its previous position before placing it in it's new position. 
//objects which are "movable" can only be placed in classes deemed as "clickable" (sofa and destination)
clickableItems.forEach(function(oneItem){
    oneItem.addEventListener("click",function(e){
        clicksound.play();
       prevX = currentX;
       prevY = currentY;
       currentX = e.clientX;
       currentY = e.clientY;
       prevObject = clickObject;
       clickObject = oneItem.id;

       if (prevObject == "") return;
       if (document.querySelector("#" + prevObject).classList.contains("moveable") && oneItem.classList.contains("contain")){
           var test = "#" + prevObject.toString();
           console.log("move " + test +  " " + clickObject);
           let prevObj = document.querySelector(test);
   
           let newX = prevX - e.clientX;
           let newY = prevY - e.clientY;
           
           prevObj.style.top = (prevObj.offsetTop - newY) + 'px';
           prevObj.style.left = (prevObj.offsetLeft - newX) + 'px';
           if (checkAllItems()){
               console.log("Win");
               let text = document.getElementById("text");
               text.innerText="Imagine experiencing this everyday...";
           }

       }
               
   });
});

//checking the collision for all the movable items
function checkAllItems(){
    var isAllOkay = true;
    for(let oneItem of moveableItems){
            let itemcard = document.getElementById(oneItem.id);
            var idContainer;
            if (itemcard.classList.contains("trashObj")){
                idContainer = "trashcan";
            }else if (itemcard.classList.contains("sofaObj")){
                idContainer = "sofa";
            } 
            let destination = document.getElementById(idContainer); 
            var itemcardtop = parseInt(window.getComputedStyle(itemcard).getPropertyValue("top")); 
            var destinationtop = parseInt(window.getComputedStyle(destination).getPropertyValue("top")); 
            var itemcardleft = parseInt(window.getComputedStyle(itemcard).getPropertyValue("left")); 
            var destinationleft = parseInt(window.getComputedStyle(destination).getPropertyValue("left")); 
            var itemcardbottom = parseInt(window.getComputedStyle(itemcard).getPropertyValue("bottom")); 
            var destinationbottom = parseInt(window.getComputedStyle(destination).getPropertyValue("bottom")); 
            var itemcardright = parseInt(window.getComputedStyle(itemcard).getPropertyValue("right"));
            var destinationright = parseInt(window.getComputedStyle(destination).getPropertyValue("right")); 

            
            if (itemcardtop > destinationtop && itemcardleft > destinationleft && itemcardbottom > destinationbottom && itemcardright > destinationright){
               
            }else{
                isAllOkay = false;
            }
    }
    return isAllOkay;
}

//JS code for Start screen
  var menunav = document.querySelector("nav");
var character = document.getElementById("cat");
var block = document.getElementById("obstacle");
const gamestartinfo = document.getElementById("gamestartinfo");
var gamestarted = false;
menunav.style.display = "none";
const score = document.createElement("h3");
const catinfo = document.createElement("p");

var Score = 1;


function jump(){
    //only starting to animate when player clicks left click
    if (gamestarted == false){
        block.classList.add("moveobstacle");
        gamestarted = true;
        gamestartinfo.remove();
        jumpsound.play();
        
     //once game start, player will animate (jump) when clicked
    }else{
        if (character.classList != "animate"){
            jumpsound.play();
            score.innerText = "Score: " + Score  ;
            document.getElementById("title").appendChild(score);
            character.classList.add("animate");
            Score++;
            
            
            //when player reaches a certain score, a fact will appear 
            if (Score > 10 && Score < 15){
                catinfo.innerText = "did you know that if a cat scratches a dog, the dog will become scared of them";
                
                document.getElementById("title").appendChild(catinfo);
            }
            else{
                catinfo.remove();
            }
        }
       
        setTimeout(function(){
            character.classList.remove("animate");
        },500);
    }
   
}


    document.addEventListener('mousedown', jump);



setInterval(checkDead,10);
   
//checking for collision if player collides with the enemy, they die
function checkDead(){
     var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); 
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left")); 

    if (blockleft < 20 && blockleft > 0 && characterTop>=130){ //calculating top of character and left of block to see if its hitting each other
        block.style.animation = "none";
        block.style.display = "none";
    
        const element = document.getElementById('mainpagediv');
        element.remove('mainpage');
        show(1);
        menunav.style.display = "block";
        document.removeEventListener('mousedown', jump);
    }
 }


 //JS CODE FOR PAGE 1
const Ball = document.querySelectorAll(".ball");
console.log(Ball);
//setting positions for the bubbles (ball) when in desktop
var ballX = ["5vw","25vw","40vw", "55vw", "70vw"];
var ballY = ["20vh","60vh","20vh", "60vh", "20vh"];
var ballSize = ["20vw","20vw","20vw","20vw","20vw"];   
var minsize = [300,300,300,300,300]; 
var maxballsize = [500,500,500,500,500];



//initialise bubbles and set px to variables (responsive)

var checkQuerey = window.matchMedia("(max-width: 800px)");



// when in mobile, the size and positions changes 

function mobileVersion(x){
    if(x.matches){
        //mobile
        ballX = ["30vw","2.5vw","40vw", "2.5vw", "40vw"];
        ballY = ["10vh","30vh","30vh", "50vh", "50vh"];
        ballSize = ["40vw","40vw","40vw","40vw","40vw"];   

    }else{
        ballX = ["5vw","25vw","40vw", "55vw", "70vw"];
        ballY = ["20vh","60vh","20vh", "60vh", "20vh"];
        ballSize = ["20vw","20vw","20vw","20vw","20vw"];  
    }
    for (let i = 0; i < Ball.length;i++){
        Ball[i].style.left = ballX[i];
        Ball[i].style.top = ballY[i];
        ballX[i] = parseInt(window.getComputedStyle(Ball[i]).getPropertyValue("left"));
        ballY[i] = parseInt(window.getComputedStyle(Ball[i]).getPropertyValue("top"));
    
        Ball[i].style.width = ballSize[i];
        Ball[i].style.height = ballSize[i];
        ballSize[i] = parseInt(window.getComputedStyle(Ball[i]).getPropertyValue("width"));
        minsize[i] = ballSize[i];
        maxballsize[i] = minsize[i]*1.5;
        console.log(ballSize[i]);
    }
}

mobileVersion(checkQuerey);

checkQuerey.addEventListener("change",function(){
    mobileVersion(checkQuerey);
});

//cat facts for each bubble
var catfacts = ["Unique Nose Prints:\n Just like human fingerprints, \na cat's nose print is unique. No two \ncats have the same nose pattern, \nmaking each cat's nose as \nindividual as a human's fingerprint.",
    "Communication: \nCats have a wide range of vocalizations. \nThey can produce over 100 different \nsounds, ranging from meows and \npurrs to hisses and growls.",
    "Whisker Sensitivity: \nA cat's whiskers are highly sensitive \nand can detect even the slightest changes \nin their environment. They help \ncats measure the width of openings, \ndetect nearby objects, and \neven sense changes in the air currents",
    "Flexible Spine:\n Cats are incredibly agile and have \na unique skeletal structure that \ncontributes to their flexibility. \nTheir spine contains more \nvertebrae than most other mammals. ",
    "Self-Grooming and Hygiene: \nCats spend a significant portion \nof their day grooming themselves. \nThis behavior helps them keep their fur \nclean, remove parasites, and regulate \ntheir body temperature. "];
var catfactheader = ["Unique Nose Prints", "Communication", "Whisker Sensitivity", "Flexible Spine", "Self-Grooming and Hygiene"];

//increase size on hover
function increasesize(num){
    ballX[num] -= maxballsize[num]/4;
    ballY[num] -=maxballsize[num]/4;
    ballSize[num] = maxballsize[num];
    UpdateBallStyle();
    Ball[num].innerText = catfactheader[num];
    
}

//decrease size on hover
function decreasesize(num){
   
    ballX[num] += maxballsize[num]/4;
    ballY[num] += maxballsize[num]/4;
    ballSize[num] = minsize[num];
    Ball[num].innerText = " ";
    UpdateBallStyle();

}

//show info on click
function addinfo(num){
    Ball[num].innerText = catfacts[num];
    popsound.play();
}


//event listeners for bubbles
Ball[0].addEventListener("mouseover", function() {
    increasesize(0);
});
Ball[0].addEventListener("mouseout", function() {
    decreasesize(0);
});
Ball[0].addEventListener("click", function() {
    addinfo(0);
 
});

Ball[1].addEventListener("mouseover", function() {
    increasesize(1);
});
Ball[1].addEventListener("mouseout", function() {
    decreasesize(1);
});
Ball[1].addEventListener("click", function() {
    addinfo(1);
   
});

Ball[2].addEventListener("mouseover", function() {
    increasesize(2);
});
Ball[2].addEventListener("mouseout", function() {
    decreasesize(2);
});
Ball[2].addEventListener("click", function() {
    addinfo(2);
 
});

Ball[3].addEventListener("mouseover", function() {
    increasesize(3);
});
Ball[3].addEventListener("mouseout", function() {
    decreasesize(3);
});
Ball[3].addEventListener("click", function() {
    addinfo(3);
  
});

Ball[4].addEventListener("mouseover", function() {
    increasesize(4);
});
Ball[4].addEventListener("mouseout", function() {
    decreasesize(4);
});
Ball[4].addEventListener("click", function() {
    addinfo(4);

});






//updating size and position of each bubble
function UpdateBallStyle(){
    for (let i =0; i<Ball.length;i++){
        Ball[i].style.left = ballX[i]+"px"; //set left property to ball x variable
        Ball[i].style.top = ballY[i]+"px"; //set top property to ball x variable
        Ball[i].style.width = ballSize[i]+"px";
        Ball[i].style.height = ballSize[i]+"px";
       
    }
   
}
//JS CODE FOR PAGE 4
var submitAttribute = document.querySelector("#submitAttribute");

//redirecting the user to the most suitable cat in the "cat breeds" page based on the attribute they chose in the form
submitAttribute.addEventListener("click",function(){
    var lazy = document.querySelector('input[name="lazy"]:checked').value;
    var affectionate = document.querySelector('input[name="affectionate"]:checked').value;
    var fluffy = document.querySelector('input[name="fluffy"]:checked').value;
    var social = document.querySelector('input[name="social"]:checked').value;
    var intelligent = document.querySelector('input[name="intelligent"]:checked').value;
    console.log(lazy + " " + affectionate + " " + fluffy + " " + social + " " + intelligent);

    //Persion : lazy fluffy
    //Mainecoon : fluffy intelligent social
    //Siamese : affectionate social
    show(3);
    clicksound.play();
    var output2 = "Pure";
    
    var output;
    if(lazy == "true" && fluffy  == "true"){
        output = "Persian";
    }
    else if (fluffy  == "true" && intelligent  == "true" && social  == "true"|| fluffy  == "true" && social  == "true"){
        output = "Mainecoon";
    }
    else if (affectionate  == "true" && social  == "true"){
        output = "Siamese";
    }
    else if (lazy == "true" || fluffy == "true"){
        output = "Persian";
    }
    else if(intelligent  == "true" || social=="true"){
        output = "Mainecoon";
    }
    else if(affectionate  == "true" || social=="true"){
        output = "Siamese";
    }

    const item = document.querySelectorAll('.content');
    let containsOutput = false;
    let containsOutput2 = false;
    var itemCount = 0;

    for (let items of item){
            console.log(output + " " + output2 + items.classList);
            containsOutput = false;
            containsOutput2 = false;
            if (items.classList.contains(output)){
                console.log(output);
                containsOutput = true;
            }
            if (items.classList.contains(output2)){
                console.log(output2);
                containsOutput2 = true;
            }
            if (containsOutput && containsOutput2){
                console.log(itemCount);
                console.log("confirm");
    
    
    
                itemActive = itemCount;
                if (itemActive >= item.length){
                    itemActive = 0;
                }
                showSlider();
                break;
            }else{
                itemCount++;
            }
        }
});