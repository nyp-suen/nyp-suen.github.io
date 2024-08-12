//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const funpagebtn = document.querySelector("#funbtn");
var allpages = document.querySelectorAll(".page");
//select all subtopic pages
show(1);

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

function getRandom(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}

function getRndCol() {
	let rndCol = 'rgb(' + getRandom(0, 255) + ',' + getRandom(0, 255) + ',' + getRandom(0, 255) + ')';
	return rndCol;
}

//fullscreen toggle
const fstoggle = document.querySelector("#fstoggle");
var togglefs = false;
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
}
// Function to exit fullscreen mode
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
function toggleFS()
{
	if (togglefs)
	{
		togglefs = false;
		exitFullscreen();
	}
	else
	{
		togglefs = true;
		enterFullscreen();
	}
}
fstoggle.addEventListener("click",toggleFS);
fstoggle.addEventListener("touchstart", toggleFS);

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function() {
	show(1);
});
page1btn.addEventListener("touchstart", function() {
	show(1);
});

page2btn.addEventListener("click", function() {
	show(2);
});
page2btn.addEventListener("touchstart", function() {
	show(2);
});

page3btn.addEventListener("click", function() {
	show(3);
});
page3btn.addEventListener("touchstart", function() {
	show(3);
});

funpagebtn.addEventListener("click", function() {
	show(4);
});
funpagebtn.addEventListener("touchstart", function() {
	show(4);
	funpagebtn.style.background = getRndCol();
});
funpagebtn.addEventListener("mouseover", function() {
	funpagebtn.style.background = getRndCol();
});
var submited = false;
const triviaform = document.querySelector("#trivia");
triviaform.addEventListener("submit", function(event) { //Reveal answer when quiz is submitted
	if (submited == false) {
		submited = true;

		var qn1 = document.querySelector("#qn1");
		var ans1 = document.querySelector("#ans1");
		ans1.innerHTML = "Your Answer: " + qn1.value;

		var qn2 = document.querySelector("#qn2");
		var ans2 = document.querySelector("#ans2");
		ans2.innerHTML = "Your Answer: " + qn2.value;

		var qn3optn1 = document.querySelector("#qn3optn1");
		var qn3optn2 = document.querySelector("#qn3optn2");
		var qn3optn3 = document.querySelector("#qn3optn3");
		var ans3 = document.querySelector("#ans3");
		if (qn3optn1.checked) {
			ans3.innerHTML = "Your Answer: " + qn3optn1.value;
		} else if (qn3optn2.checked) {
			ans3.innerHTML = "Your Answer: " + qn3optn2.value;
		} else if (qn3optn3.checked) {
			ans3.innerHTML = "Your Answer: " + qn3optn3.value;
		}

		var qn4optn1 = document.querySelector("#qn4optn1");
		var qn4optn2 = document.querySelector("#qn4optn2");
		var ans4 = document.querySelector("#ans4");
		if (qn4optn1.checked && qn4optn2.checked) {
			ans4.innerHTML = "Your Answer: Both statements are correct";
		} else if (qn4optn1.checked) {
			ans4.innerHTML = "Your Answer: Only statement 1 is correct";
		} else if (qn4optn2.checked) {
			ans4.innerHTML = "Your Answer: Only statement 2 is correct";
		} else {
			ans4.innerHTML = "Your Answer: None of the statements are correct";
		}

		var ansSheet = document.querySelector("#AnsSheet");
		ansSheet.classList.toggle("hideAns");
	}
	event.preventDefault();
});

/*JS for hamMenu */
var hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
hamBtn.addEventListener("touchstart", toggleMenus);
var menuItemsList = document.querySelector("nav div");

function toggleMenus() { /*open and close menu*/
	menuItemsList.classList.toggle("menuHide");
}

//Hamster Pet Simulator
var prevFrame = Date.now();
var hamsterGame = document.querySelector("#hamsterGame");
var ctx = hamsterGame.getContext("2d");

var imgTag = new Image();
imgTag.src = "images/Hampter.jpg";
var hamsterIconSize = 100;
var gameObjects = [
	[0, hamsterGame.height - hamsterIconSize]
];
var hamsterInv = [];
var grabbed = false;
var graboffset = [0, 0];
const foodLifespan = 5;
var mouseX, mouseY;
//Click events
hamsterGame.addEventListener("mousedown", ClickHandler);
hamsterGame.addEventListener("mouseup", function() {
	grabbed = false;
});

hamsterGame.addEventListener("mousemove", MouseMoveHandler);

function ClickHandler() {
	if (mouseX > gameObjects[0][0] && mouseX < gameObjects[0][0] + hamsterIconSize && mouseY > gameObjects[0][1] && mouseY < gameObjects[0][1] + hamsterIconSize) {
		grabbed = true;
		graboffset = [gameObjects[0][0] - mouseX, gameObjects[0][1] - mouseY]; //offset to maintain when dragging the hamster around
	} else {
		gameObjects.push([mouseX, mouseY, foodLifespan]);
	} //Spawn food for the hamster
}

function MouseMoveHandler(e) {
	var rect = hamsterGame.getBoundingClientRect();
	mouseX = e.clientX - rect.left; // x position within the canvas
	mouseY = e.clientY - rect.top; // y position within the canvas
}

//Touch events
hamsterGame.addEventListener("touchstart", ClickHandler);
hamsterGame.addEventListener("touchend", function() {
	grabbed = false;
});
hamsterGame.addEventListener("touchmove", TouchMoveHandler);

function TouchMoveHandler(e) {
	var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	var rect = hamsterGame.getBoundingClientRect();
	mouseX = touch.pageX - rect.left; // x position within the canvas
	mouseY = touch.pageY - rect.top; // y position within the canvas
}

const hamsterSpeed = 100;
const gravScale = 200;
var spitTimer = 0;
var imgTag = new Image();
imgTag.src = "images/Hampter.jpg";
requestAnimationFrame(Update);

function Update() {
	//Resize canvas
	hamsterGame.width = window.innerWidth;
	ctx.clearRect(0, 0, hamsterGame.width, hamsterGame.height); // clear canvas

	//Update the rendering of the hamster
	ctx.drawImage(imgTag, gameObjects[0][0], gameObjects[0][1], hamsterIconSize, hamsterIconSize);
	// ctx.clearRect(0, 0, hamsterGame.width, hamsterGame.height);  // clear canvas
	var dt = (Date.now() - prevFrame) / 1000;
	prevFrame = Date.now();
	var hamsterTarget = gameObjects[0][0] + hamsterIconSize / 2;

	if (gameObjects.length > 1 && gameObjects[1][1] > gameObjects[0][1]) {
		hamsterTarget = gameObjects[1][0];
	}
	//Update the rendering of food particles
	for (let i = 1; i < gameObjects.length; i++) {
		var obj = gameObjects[i];
		if (obj[1] > gameObjects[0][1] && Math.abs(obj[0] - (gameObjects[0][0] + hamsterIconSize / 2)) < Math.abs(hamsterTarget - (gameObjects[0][0] + hamsterIconSize / 2))) {
			hamsterTarget = obj[0];
		}
		if (obj[1] < hamsterGame.height - 5) {
			obj[1] += dt * gravScale;
		}
		ctx.beginPath();
		ctx.arc(obj[0], obj[1], 5, 0, 2 * Math.PI);
		ctx.fillStyle = "orange";
		ctx.fill();
		ctx.strokeStyle = "orange";
		ctx.stroke();
		obj[2] -= dt;
		if (obj[2] <= 0) {
			gameObjects.splice(i, 1);
		}
		if (obj[1] >= gameObjects[0][1] + hamsterIconSize - 5 && Math.abs(obj[0] - (gameObjects[0][0] + hamsterIconSize / 2)) <= 5 && obj[0] == hamsterTarget && grabbed == false && gameObjects[0][1] == hamsterGame.height - hamsterIconSize) {
			hamsterInv.push(foodLifespan);
			gameObjects.splice(i, 1);
		}
	}
	for (let i = 0; i < hamsterInv.length; i++) {
		hamsterInv[i] -= dt;
		if (hamsterInv[i] <= 0) {
			hamsterInv.splice(i, 1);
		}
	}

	//Hamster AI
	if (grabbed == false) {
		if (gameObjects[0][1] < hamsterGame.height - hamsterIconSize) {
			gameObjects[0][1] += dt * gravScale;
		}
		if (gameObjects[0][1] > hamsterGame.height - hamsterIconSize) {
			gameObjects[0][1] = hamsterGame.height - hamsterIconSize;
		}
		if (gameObjects[0][1] == hamsterGame.height - hamsterIconSize) {
			if (gameObjects[0][0] + hamsterIconSize / 2 > hamsterTarget) {
				gameObjects[0][0] -= dt * hamsterSpeed;
			}
			if (gameObjects[0][0] + hamsterIconSize / 2 < hamsterTarget) {
				gameObjects[0][0] += dt * hamsterSpeed;
			}
		}

	} else {
		gameObjects[0] = [mouseX + graboffset[0], mouseY + graboffset[1]];
		if (hamsterInv.length > 0 && spitTimer <= 0) {
			spitTimer = 0.1;
			hamsterInv.pop();
			gameObjects.push([gameObjects[0][0] + hamsterIconSize / 2, gameObjects[0][1] + hamsterIconSize, foodLifespan]);
		}
	}
	if (spitTimer > 0) {
		spitTimer -= dt;
	}
	requestAnimationFrame(Update);
}