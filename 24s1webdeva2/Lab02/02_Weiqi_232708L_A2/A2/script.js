//Hamburger menu
const menu = document.querySelector("#menu");

//Show the content for the 3 types on button press
//get buttons for content
const total = document.querySelector("#total");
const partial = document.querySelector("#partial");
const legal = document.querySelector(".container");

//get window size
var width = window.innerWidth;

//codes for visual impairment simulation and minigame
//checking if sim is active, position for "looking around"
var glaucomaactive = false;
var macularactive = false;
var lookactive = false;

const glaucoma = document.querySelector("#glaucoma");
const macular = document.querySelector("#macular");
const glaucomaBtn = document.querySelector("#glaucomaBtn");
const macularBtn = document.querySelector("#macularBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const controls = document.querySelector(".controls");
var move;
//Coords for looking around
var lookX = 50;
var lookY = 50;
//Minigame stuff
var clicktimer;
const target = document.querySelector("#target");
const gamestart = document.querySelector("#gamestart");
const gamemessage = document.querySelector("#gamemessage");
var gameactive = false;
var spawn;

//toggle sidebar on mobile
function togglemenu(){
    let sidebar = document.querySelector("#anchors");
    if(sidebar.style.display == "none") sidebar.style.display = "block";
    else sidebar.style.display = "none";
}
//toggle showing of content on mobile
function toggleshow(contentpage) {
	if (width < 801) {
		let allpages = document.querySelectorAll(contentpage);
		for (let onepage of allpages) {
			if (onepage.style.display == "none") {
				onepage.style.display = "flex";
			} else {
				onepage.style.display = "none";
			}
			console.log(onepage.style);
		}
	}
}
//toggling the blindness simulations
function setglaucomaactive() {
	if (glaucomaactive) {
		glaucoma.style.display = "none";
		glaucomaactive = false;
	} else {
		glaucoma.style.display = "block";
		glaucomaactive = true;
		if (macularactive) setmacularactive();
	}
	checklookactive();
}
function setmacularactive() {
	if (macularactive) {
		macular.style.display = "none";
		macularactive = false;
	} else {
		macular.style.display = "block";
		macularactive = true;
		if (glaucomaactive) setglaucomaactive();
	}
	checklookactive();
}
function resetsim() {
	if (glaucomaactive) setglaucomaactive();
	if (macularactive) setmacularactive();
}
function checklookactive() {
	if (glaucomaactive || macularactive) {
		lookactive = true;
		if (width < 801) {
			leftBtn.style.display = "block";
			rightBtn.style.display = "block";
			upBtn.style.display = "block";
			downBtn.style.display = "block";
			resetBtn.style.display = "block";
		}
        else controls.style.display = "block";
	} else {
		lookactive = false;
		leftBtn.style.display = "none";
		rightBtn.style.display = "none";
		upBtn.style.display = "none";
		downBtn.style.display = "none";
		resetBtn.style.display = "none";
        controls.style.display = "none";
	}
}
//looking around with the simulations on
function ResetPos() {
    lookX=lookY=50; 
    UpdateLook();
}
function MovePos(leftInc, topInc) {
    lookX += leftInc;   
    lookY += topInc;
    UpdateLook();
}
function UpdateLook(){
    if(glaucomaactive){
        glaucoma.style.background = 
        'radial-gradient(circle 200px at ' + lookX+'% ' + lookY+'%, transparent 5%, rgba(0,0,0,0.99)'; 
    }
    else if(macularactive){
        macular.style.background = 
        'radial-gradient(circle 525px at ' + lookX+'% ' + lookY+'%, black, rgba(0,0,0,0.98), transparent';
    }
}
//Game functions
function RandomNumber(max){
	return Math.floor(Math.random() * max);
}
function BeginGame(){
	if(gameactive){
		console.log(target);
		target.style.display = "none";
		gamemessage.style.display = "block";
		spawn = setInterval(SpawnTarget, 100);
		
	}
	else{
		target.style.display = "none";
		clearInterval(spawn);
	}
}
function SpawnTarget(){
	if(target.style.display == "none"){
		console.log("spawn");
		clicktimer = new Date().getTime();
		target.style.display = "block";
		target.style.left = RandomNumber(80) + "%";
		target.style.top = RandomNumber(80) + "%";
	}
}

window.onresize = function() {
	width = window.innerWidth;
	console.log(width);
};

//minigame listeners
target.addEventListener("click", function(){
	let currenttime = new Date().getTime();
	let timetaken = (currenttime - clicktimer) / 1000; 
	gamemessage.textContent = "Took " + timetaken + "s to click.";
	target.classList.add("targetAnim");
});
target.addEventListener("animationend", function() {
	target.style.display = "none";
	target.classList.remove("targetAnim");
});

gamestart.addEventListener("click", function() {
	gameactive = !gameactive;
	gamemessage.style.display = "none";
	BeginGame();
});



//Hamburger menu event
menu.addEventListener("click", function() {
    togglemenu();
});

//Collapse/show content on mobile
total.addEventListener("click", function() {
	toggleshow(".totalBcontent");
});
partial.addEventListener("click", function() {
	toggleshow(".partialBcontent");
});
legal.addEventListener("click", function() {
	toggleshow(".legalBcontent");
});

//buttons to activate simulations
glaucomaBtn.addEventListener("click", function() {
	setglaucomaactive();
});
macularBtn.addEventListener("click", function() {
	setmacularactive();
});

//PC controls
document.addEventListener('keydown', function(e) {
    if(lookactive){
        console.log(e.key);
        switch(e.key){
            case "w":
                MovePos(0,-2);
                break;
            case "a":
                MovePos(-2,0);
                break;
            case "s":
                MovePos(0,2);
                break;
            case "d":
                MovePos(2,0);
                break;
            case "Escape":
				ResetPos();
                resetsim();
                break;
        }
    }
});

//mobile controls
resetBtn.addEventListener("click", function() {
	ResetPos();
	resetsim();
	clearInterval(move);
});
upBtn.addEventListener("mousedown", function() {
    MovePos(0,-5);
});
downBtn.addEventListener("mousedown", function() {
    MovePos(0,5);
});
leftBtn.addEventListener("mousedown", function() {
    MovePos(-5,0);
});
rightBtn.addEventListener("mousedown", function() {
    MovePos(5,0);
});

