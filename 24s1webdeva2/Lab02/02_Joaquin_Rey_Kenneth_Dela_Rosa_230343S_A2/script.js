// JavaScript Document

var PageIndex = 0; // Variable used to check what page the user is currently on, which is default to the about me page, index 0
// Page 0: About page
// Page 1: Emergence page
// Page 2: Simulation page

var PageList = document.querySelectorAll(".page"); // Gets an array of all the pages available

// About Page Variables
var TechniqueIndex = 0; // Variable used to check what technique the user is currently on in the about me page, which is default to the first technique, cellular automata, index 0
var TechniqueList = document.querySelectorAll(".technique"); // Gets an array of all the techniques available
//
// Loading Page and Techniques, making default visible
UpdateTechnique(); // runs the function to make everything's display to none except the technique with the index of TechniqueIndex. Ran it on load to be able to display only the default technique
UpdatePage();// runs the function to make everything's display to none except the page with the index of PageIndex. Ran it on load to be able to display only the default page
//

function openNav() { // This function is for when the user is at the first breakpoint, on iphone, and presses the menu button that is shone, so that it increases the width of the nav container so that its visible to the user.
  document.getElementById("MainNavContainer").style.width = "150px";
  document.getElementById("main").style.marginLeft = "150px";
}

function closeNav() { // Does the opposite of the function above
  document.getElementById("MainNavContainer").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function UpdateTechnique(numberadded = 0){ // This function takes in a number to be added to the technique index, so that the user can go see the other techniques
	TechniqueList[TechniqueIndex].style.display = "none"; // we set the the current technique to not be visible first before adding onto the TechniqueIndex
	TechniqueIndex += numberadded; // adds the argument, where this argument can be -1 and 1 to be able to go back and forth between techniques without needing to go only 1 direction
	if (TechniqueIndex > TechniqueList.length - 1){ // this is for when the technique index reaches the last technique and moves foward again, making it go back to the start, preventing issues
		TechniqueIndex = 0;
	}
	else if (TechniqueIndex < 0){ // this is for when the technique index reaches the first technique and moves backward again, making it go to the last technique, preventing issues
		TechniqueIndex = TechniqueList.length - 1;
	}
	TechniqueList[TechniqueIndex].style.display = "grid"; // finally makes the next technique chosen by the user, visbile.
}

function UpdatePage(numberchosen = 0){ // simpler version of the update technique function, just makes all pages display none, while the chosen page index to be displayed.
	for(let i = 0; i < PageList.length; i++){
		PageList[i].style.display = "none";
	}
	PageIndex = numberchosen;
	PageList[PageIndex].style.display = "inline";
}


// Function to enter fullscreen mode

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}


document.getElementById('full-screen-button').addEventListener('click', function() {
	toggleFullScreen();
});


document.getElementById('technique-left-button').addEventListener('click', function() {
	UpdateTechnique(-1);
});
document.getElementById('technique-right-button').addEventListener('click', function() {
	UpdateTechnique(1);
});




document.getElementById('linkpage1').addEventListener('click', function() {
	UpdatePage(0);
});
document.getElementById('linkpage2').addEventListener('click', function() {
	UpdatePage(1);
});
document.getElementById('linkpage3').addEventListener('click', function() {
	UpdatePage(2);
});

// Nav transition from menu icon, to X icon and vice versa
document.getElementById('nav-expand-button').addEventListener('click', function() {
	if (document.getElementById("MainNavContainer").style.width <= "0px"){
		openNav();
		document.getElementById('nav-expand-button').classList.toggle("change"); //just adds the .change class to the nav expand button, making the divs creating the menu, turn 45 degrees to form an x, whilst making one bar not visible
	}
	else{
		closeNav();
		document.getElementById('nav-expand-button').classList.toggle("change"); // turns it back to the menu icon sign
	}
});
//


window.addEventListener('resize', function() { // This event listener is when the user resizes, changing the window length to go from phone to computer layout and vice versa, this would cause problems, and that is where this event comes into play. This makes sure that when the user resizes from phone to desktop size, none of these issues would happen: The margin made to push the other content of the page way to make room for the sidebar doesnt go back when the sidebar was open when they resized it. Similar issue with the style width. Similar issue with the nav-expand-button (menu icon button)
	
	if (window.innerWidth > 800){
		document.getElementById('MainNavContainer').style.width = "100%";
	}
	else{
		document.getElementById('MainNavContainer').style.width = "0%";
	}
	document.getElementById("main").style.marginLeft= "0";
	
	
	if(document.getElementById('nav-expand-button').classList.contains("change")){
		document.getElementById('nav-expand-button').classList.remove("change");
	}
});

// Emergence Quiz
var Questions = ["Is flocking behavior in birds an example of emergence?", 
				 "Is the functioning of a mechanical clock an example of emergence?",
				 "Is an ant colony's behavior an example of emergence?",
				 "Is following a recipe to cook a dish an example of emergence?",
				 "Is market economy behavior an example of emergence?"
				]; // Array of random questions for the Emergence Quiz

// For this array of answers, how i stored it is that the first 4 indexes (0-3) are answers to be displayed and choices for the user to choose for the quiz. the 5th index (4) is a number that is the correct answer's index. For example, if the first answer is correct, it would be index 0.
var Answers = [
	["No, because the birds are following a leader.",
	 "Yes, because the coordinated group movement arises from simple local rules followed by each bird.",
	 "No, because the movement is pre-programmed in the birds' genetics.",
	 "Yes, because each bird independently knows the overall pattern to follow.",
	 1], 
	["Yes, because the parts work together to produce the time.",
	 "Yes, because the clock can keep time independently.",
	 "No, because each part's function is explicitly designed and predictable.",
	 "No, because the clock uses complex algorithms.",
	 2], 
	["No, because ants individually decide what to do based on personal needs.",
	 "No, because the queen ant controls the entire colony.",
	 "Yes, because each ant knows the overall plan of the colony.",
	 "Yes, because the colony's complex behaviors arise from simple interactions among ants.",
	 3], 
	["No, because the outcome is a direct result of combining ingredients in a specific way.",
	 "Yes, because the final dish has new properties not found in the individual ingredients.",
	 "Yes, because the ingredients interact to create something new.",
	 "No, because cooking is a complex process.",
	 0], 
	["No, because it is controlled by government regulations.",
	 "Yes, because the complex dynamics arise from individual decisions of buyers and sellers.",
	 "No, because prices are set by individual companies.",
	 "Yes, because the market follows predetermined economic models.",
	 1]];

var QuestionSlot = document.querySelector("#emergence-question-slot"); 
var AnswerSlots = document.querySelectorAll(".emergence-answer");
var ScoreSlot = document.querySelector("#emergence-score");
var ScorePercentageSlot = document.querySelector("#emergence-score-percentage");
var AmtOfQuestionSlot = document.querySelector("#emergence-question-count");
var SubmitButton = document.querySelector("#emergence-submit");


var RandomBag = []; // I added this variable because i wanted the questions to be shown randomly but at the same time, i want all questions to be shown in a set. Without this, there may be a chance that question 1 would randomly be chosen 5 times in a row, and i do not want that to happen.
var CurrentRandomBagIndex = 0;
var ChosenAnswer = false; // This variable is to tell the program whether or not the user chose an answer yet. This is so that the chosen answer index wouldn't continue having the background color green although the user already submitted their answer to the question

var ChosenAnswerIndex = 0;
var Score = 0;
var QuestionsDone = 0;

for (var i = 0; i < Questions.length; i++){ // I am putting in all available indexes in this random bag.
	RandomBag.push(i);
}

ShuffleArrray(RandomBag); // refer to function ShuffleArray comment

UpdateQuiz(); // refer to function UpdateQuiz comment

function ShuffleArrray(RandomArray){ // This function jumbles all the numbers in the array, swapping the numbers randomly across all the available indexes. After they are all swapped and random, The current random index would go through indexes 0 to the last index, all random when the player is doing the quiz. For example, it goes through questions 4,2,1,3, ending the set and reshuffling again. This is to make sure that all the numbers, which are actually acting as the indexes of the questions. All wont have a chance to repeatedly show up in a row.
	for (var i = 0; i < Questions.length; i++){
		var RandomNumber1 = Math.floor(Math.random() * Questions.length);
		var RandomNumber2 = Math.floor(Math.random() * Questions.length);
		var Copy = RandomArray[RandomNumber1];
		
		RandomArray[RandomNumber1] = RandomArray[RandomNumber2];
		RandomArray[RandomNumber2] = Copy;
	}
}
function UpdateQuiz(){ // Updates the inner html of the question slots and etc to the RandomBag[CurrentRandomBagIndex]. For example, if the RandomBag array = [1,3,2,0], if CurrentRandomBagIndex = 0 and RandomBag[CurrentRandomBagIndex] = 1, it would change the inner html to the second question
	QuestionSlot.innerHTML = Questions[RandomBag[CurrentRandomBagIndex]];
	for (let i = 0; i < AnswerSlots.length; i++){
		AnswerSlots[i].innerHTML = Answers[RandomBag[CurrentRandomBagIndex]][i];
	}
	UpdateQuizAnswerSelection(); // refer to function UpdateQuizAnswerSelection comment for explanation about function
	ScoreSlot.innerHTML = "Score: " + Score;
	AmtOfQuestionSlot.innerHTML = "Questions Done: " + QuestionsDone;
	if (QuestionsDone > 0 && Score > 0){
		ScorePercentageSlot.innerHTML = "Score Percentage: " + Math.floor(Score / QuestionsDone * 100) + "%";
	}
	else{
		ScorePercentageSlot.innerHTML = "Score Percentage: 0%";
	}
}
function UpdateQuizAnswerSelection(){ // This function changes the color of what answer slot the user has chosen to green whilst simultaneously changing all other slots to the default color, preventing making multiple answer slots being green.
	for(let i = 0; i < AnswerSlots.length; i++){
		AnswerSlots[i].style.backgroundColor = "#463738";
	}
	if (ChosenAnswer){
		AnswerSlots[ChosenAnswerIndex].style.backgroundColor = "green";
	}
}
function addClickListener(slot, index) { // event for when user clicks this answer slot and changes the chosen answer index to that answer slot's index
    slot.addEventListener('click', function() {
        ChosenAnswer = true;
        ChosenAnswerIndex = index;
        UpdateQuizAnswerSelection();
    });
}


for (let i = 0; i < AnswerSlots.length; i++) {
    addClickListener(AnswerSlots[i], i); // adds events to all answer slots.
}

SubmitButton.addEventListener('click', function() { // Event for when user clicks the submit button, increasing the random bag index, if the random bag index has reached its max, it would reset back to 0 and shuffle the bag. it also checks the chosen answer index with the 5th index of the answers array which is the correct answer's index to see if they are the same, if they are then they would increase the score. I also set the chosen answer to false after they press submit so that the answer slot they chose doesnt continue to be green even after the user moves on to the next question.
	if(ChosenAnswer){
		if (ChosenAnswerIndex == Answers[RandomBag[CurrentRandomBagIndex]][4]){
			Score++;
		}
		CurrentRandomBagIndex++;
		if (CurrentRandomBagIndex > Questions.length - 1){
			CurrentRandomBagIndex = 0; // change later to showing completed quiz or something
			ShuffleArrray(RandomBag);
		}
		QuestionsDone++;
		ChosenAnswer = false;
		UpdateQuiz();
	}
});




// ParticleLifeSimulation
const canvas = document.getElementById("ParticleLifeSimulation");
const ctx = canvas.getContext("2d");

var devicePixelRatio = window.devicePixelRatio || 1; // This is to prevent the particles from being blurry as some displays have more pixels per inch compared to standard displays

canvas.width = 550 * devicePixelRatio; // default canvas height and width is 550, will be changed later
canvas.height = 550 * devicePixelRatio;
ctx.scale(devicePixelRatio, devicePixelRatio); // Making sure the particles are not blur
var pariclesize = 2;

//canvas.width
//canvas.height are constant values even when the window is resized, the value remains the same, the elements within the canvas gets resized to fit the position and size of the canvas


class Vector2{
	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}
	VectorAddition(Vector2B){
		this.x = this.x + Vector2B.x;
		this.y = this.y + Vector2B.y;
	}
}

class Particle {

	//AttractionDistanceLimit = 100;
	constructor(x, y, c, AttractionDistance = 10000, RepulsionDistance = 150) {
    	this.AttractionDistance = AttractionDistance; // how far can a particle act on another particle
    	this.RepulsionDistance = RepulsionDistance; // how close can a particle get before it gets repulsed, this is to prevent multiple particles from getting to the same spot
	    this.pos = new Vector2(); // Position of the particle
    	this.force = new Vector2(); // Force of the particle
    	this.velocity = new Vector2(); // velocity of the particle
		this.pos.x = x;
		this.pos.y = y;
		this.c = c; // Color of the particle
	}

	RenderParticle(actx){ // Renders the particle
		actx.fillStyle = this.c;
		actx.fillRect(this.pos.x / devicePixelRatio - pariclesize, this.pos.y / devicePixelRatio - pariclesize, pariclesize, pariclesize); 
		// (/ devicePixelRatio) Adjusting the position coordinates according to the device pixel ratio.
		// (- pariclesize) Center the rectangle at this.pos by adjusting for particle size
		
	}
}
var LastUpdateTime = Date.now();
var ParticleAmt = 2500; // Starting Particle Amount
var EachParticleAmt;
var MouseParticle = []; // Created Mouse Particle for users to interact with the simulation by clicking or tapping. It is a particle no different than all other particles other than it is only specially appears when user clicks or tapps the screen, following the location, and placing the mouse particle there.
var Intensity = document.getElementById('Intensity').value; // This is the multiplier for the attraction/repulsion forces for all particles
var AirResistance = 0.3; // This is the multiplier that acts on the particle's previous velocity, multiplying with it to reduce its velocity, acting as air resistance
var dtMultiplier = document.getElementById('dtMultiplier').value; // Control's how big the delta time variable would be
var dtMax = 24; // Controls the max value of the basic delta time without the dtmultiplier variable. Preventing the delta time to be too big, making particles scatter everywhere because of the amount of force applied.
var SeenFirstTime = false;
var NumOfTypes = 0;
var TypeArray = []; // Where all different types of particle arrays would go
var ForceArray = []; // Where all the interactions between the different types of particles would go, 
/*
For example, if there are 3 different types of particles,
The force array would be storing forces something like this.

ForceArray = [
[type1 and type1interaction, type1 and type2interaction, type1 and type3interaction] // this is for particle type 1
[type2 and type1interaction, type2 and type2interaction, type2 and type3interaction] // this is for particle type 2 and etc
[type3 and type1interaction, type3 and type2interaction, type3 and type3interaction]
]
*/


var MousePos;
var MouseActive = false; // Variable to dictate whether or not the mouse particle should be present within the simulation currently.
var MouseAttractStrength = document.getElementById('MouseAttractionValue').value; // This variable is the force the mouse particle would act upon all other particles, the interaction with all of them.


function AdjustCanvasSize() {
	// since if the canvas.style.width = 100%, if we print it out, it would still be shown as 100% instead of the actual pixels that it has currently, so instead we use canvas.clientWidth to do that for us instead, helping to adjust the canvas size for the particles as well, instead of just the style, granting all particles more space or lesser space.
	const styleWidth = canvas.clientWidth;
	const styleHeight = canvas.clientHeight;
	devicePixelRatio = window.devicePixelRatio || 1;

	canvas.width = styleWidth * devicePixelRatio;
	canvas.height = styleHeight * devicePixelRatio;

	// Scale the canvas context to account for the device pixel ratio
	ctx.scale(devicePixelRatio, devicePixelRatio);
}

function RandomiseForces(){ // For the randomise forces button, goes through all the force values for the interactions between types of particles and randomises them.
	let TypeInteractionContainers = document.querySelectorAll(".TypeInteractionContainer");
	for (let i = 0; i < NumOfTypes; i++){
		for (let j = 0; j < NumOfTypes; j++){
			ForceArray[i][j] = RandomRange(1, -1);
			TypeInteractionContainers[i].querySelectorAll(".SingleForceContainer")[j].querySelector(".ForceAttraction").value = ForceArray[i][j];
		}
	}
}
function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
function RandomisePositions(particles){ // randomises the particles positions from 0 to the max of the canvas
	for (var i = 0; i < particles.length; i++){
		particles[i].pos.x = Math.random() * canvas.width;
		particles[i].pos.y = Math.random() * canvas.height;
	}
}

function RandomRange(Max, Min){
	return Math.random() * (Max - Min) + Min;
}


function Attraction(particles1, particlesarrays, attractionarray){
	if(particles1 == undefined){ // To prevent any errors with removing any particles if there is.
		return 0;
	}
	for (var i = 0; i < particles1.length; i++){
		particles1[i].force.x = 0; // reseting the force to 0 before getting the sum of all forces acting upon this particle
        particles1[i].force.y = 0;
		for (var j = 0; j < particlesarrays.length; j++){ // getting the sum of all forces acting upon this particle
			for (var v = 0; v < particlesarrays[j].length; v++){
				AddParticleForces(particles1[i], particlesarrays[j][v], attractionarray[j]);
			}
		}
	}
}

function AddParticleForces(particle1, particle2, attraction){
	var DiffX = particle1.pos.x - particle2.pos.x;
	var DiffY = particle1.pos.y - particle2.pos.y;
	var Distance = DiffX * DiffX + DiffY * DiffY; // i will not use sqrt here for now because sqrt is very expensive, so i would only use it when the not square rooted distance is verified.
	
	
	if (Distance < particle2.RepulsionDistance){ // so that if the particle is within the repulsion distance, the interaction between the 2 particles is witheld and instead focused on repelling the particle so that they wont be too close and be in the same position.
		let ActualDist;
		if(Distance > 0){
			ActualDist = Math.sqrt(Distance); // Since distance is verified, now it sqrt is used, saving quite alot.
		}
		else{
			ActualDist = 1; // incase the distance is 0, cannot sqrt a 0.
		}
		var AtomRepulsionForce = Math.abs(attraction * Intensity) * 3 * 1/ActualDist;
		// Getting the force according to Sir Isaac Newton's formula F = G * Mass/Distance
		particle1.force.x += AtomRepulsionForce * DiffX / ActualDist; // Dividing the DiffX by the actual dist to normalise it. Same with DiffY.
		particle1.force.y += AtomRepulsionForce * DiffY / ActualDist;
		
	}
	else if (Distance < particle2.AttractionDistance){ // similar comments as ones above
		let ActualDist;
		if(Distance > 0){
			ActualDist = Math.sqrt(Distance);
		}
		else{
			ActualDist = 1;
		}
		var AttractionForce = (attraction * Intensity) * 1/ActualDist;
		particle1.force.x += AttractionForce * DiffX / ActualDist;
		particle1.force.y += AttractionForce * DiffY / ActualDist;
	}
	// Will update the velocity and position later to gather the total forces of all particles at the current frame.
	
}
function UpdateParticlesVelPos(particle, dt){
	
	// Apply air resistance
    particle.velocity.x *= AirResistance;
    particle.velocity.y *= AirResistance;
	
	// Update velocity with force
    particle.velocity.x += particle.force.x  * dt;
    particle.velocity.y += particle.force.y  * dt;
	
	
	// Testing the waters with the current result so we make a new variable newpos first to check if the particle is within the borders before changing the true position, so that we can adjust it if it hits the borders.
	var NewPos = new Vector2(particle.pos.x + particle.velocity.x * dt, particle.pos.y +  particle.velocity.y * dt);
	
	if (NewPos.x > pariclesize && NewPos.x < canvas.width){ // if particle is within x axis borders
		particle.pos.x = NewPos.x; // lets particle change x axis
	}
	else{
		if (NewPos.x < pariclesize){ // for when the particle is below x 0
			particle.pos.x = pariclesize;
		}
		else{ // for when the particle is above max x
			particle.pos.x = canvas.width;
			particle.velocity.x = -particle.velocity.x;
		}
	}
	if (NewPos.y > pariclesize && NewPos.y < canvas.height){ //similar comments as x above
		particle.pos.y = NewPos.y;
	}
	else{
		if (NewPos.y < pariclesize){
			particle.pos.y = pariclesize;
		}
		else{
			particle.pos.y = canvas.height;
			particle.velocity.y = -particle.velocity.y;
		}
	}
}
function ParticleAmtChange(particles, amount){ // this function is to give the user the flexibility to change the amount of particles for a specific type if they want to. If the amount is lesser than the current amount, it just pops the particle array until it reaches that amount, if not, it pushes new particles in the array until it reaches the amount given.
	//var previouslength = particles.length;
	var lengthDiff = Math.abs(particles.length - amount);
	if (particles.length > amount){
		for (let i = 0; i < lengthDiff; i++){
			particles.pop();
		}
	}
	else{
		for (let i = 0; i < lengthDiff; i++){
			var newcolor;
			if (particles[0] == undefined){
				newcolor = getRandomRGBColor();
			}
			else{ // Makes sure all new particles will follow the same color as its peers.
				newcolor = particles[0].c;
			}
			particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, newcolor));
		}
	}
}

function CreateParticleForceInput(newvalue){ // this is for the input for the interaction between different types of particles
		let ForceAttraction = document.createElement("INPUT");
		ForceAttraction.classList.add("ForceAttraction");
		ForceAttraction.setAttribute("type", "number");
		ForceAttraction.value = newvalue;
		return(ForceAttraction);
}
function AddForceAttractionListener(ForceAttraction, ForceArray){
    ForceAttraction.addEventListener("change", function(){
		let TypeInteractionContainers = document.querySelectorAll(".TypeInteractionContainer");
		let ThisSingleForceContainer = ForceAttraction.parentNode;
		let ThisTypeInteractContainer = ThisSingleForceContainer.parentNode.parentNode;
		let SingleForceContainers = ThisTypeInteractContainer.querySelectorAll(".SingleForceContainer");
		
		// This whole section is trying to find the indexes/type this ForceAttraction input is related to. By checking its parents and whether or not they are equal to a element in the arrays of all other similar classes, and getting the index of that element.
		let FirstIndex;
		for (let find = 0; find < TypeInteractionContainers.length; find++){
			if(TypeInteractionContainers[find] == ThisTypeInteractContainer){
				FirstIndex = find;
			}
		}
		let SecondIndex;
		for (let find = 0; find < SingleForceContainers.length; find++){
			if(SingleForceContainers[find] == ThisSingleForceContainer){
				SecondIndex = find;
			}
		}
		//
		ForceArray[FirstIndex][SecondIndex] = ForceAttraction.value;
	});
}
function CreateNewParticleType(){ // This is the function to create a new particle types
	var ForceContainers = document.querySelectorAll(".ForceContainer");
	let NewIndex = TypeArray.push([]) - 1; //The .push() function returns the new length of the Array, so trying to find the new index whilst simultaneously pushing the array we are going to put the particles in.
	let newcolor = getRandomRGBColor();
	NumOfTypes++;
	for (let i = 0; i < EachParticleAmt; i++){ // Adds all the new particles into the new array that was made.
		TypeArray[NewIndex].push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, newcolor));
	}
	
	ForceArray.push([]); // the start of making all the new interactions with the new type of particle
	
	let TypeInteractionContainer = document.createElement("div"); // container for all interactions with for this type of particle
	let ForceContainer = document.createElement("div"); // container specifically for the force interactions for this type of particle.
	let CurrentTypeArray = TypeArray[NewIndex];
	let ParticleAmountText = document.createElement("p");
	let ParticleAmountInput = document.createElement("INPUT");
	ForceContainer.classList.add("ForceContainer");
	TypeInteractionContainer.classList.add("TypeInteractionContainer");
	//TypeInteractionContainer.classList.add("centered");
	
	ParticleAmountText.appendChild(document.createTextNode("Number: "));
	
	TypeInteractionContainer.appendChild(ParticleAmountText);
	TypeInteractionContainer.appendChild(ParticleAmountInput);
	
	
	let RemoveTypeButton = document.createElement("a");
	RemoveTypeButton.classList.add("TranslateButton");
	RemoveTypeButton.appendChild(document.createTextNode("X"));
	RemoveTypeButton.style.background = "red";
	RemoveTypeButton.style.padding = "0.5em";
	TypeInteractionContainer.appendChild(RemoveTypeButton);
	RemoveTypeButton.addEventListener('click', function() { // this is to remove everything related to this type of particle, the particles themselves and the interactions and other's interactions on that particle.
		let CurrentIndex = TypeArray.indexOf(CurrentTypeArray);
		TypeArray.splice(CurrentIndex, 1); // Removing the particles
		ForceArray.splice(CurrentIndex, 1); // Removing its force array.
		NumOfTypes--;
		TypeInteractionContainer.remove(); // Removing its interactivity
		ForceContainers = document.querySelectorAll(".ForceContainer");
		console.log("Start");
		for (let typenum = 0; typenum < NumOfTypes; typenum++){ // removing other's interactivity of that particle type
			console.log(typenum);
			ForceArray[typenum].splice(CurrentIndex, 1);
			console.log(ForceContainers[typenum].querySelectorAll(".SingleForceContainer"));
			ForceContainers[typenum].querySelectorAll(".SingleForceContainer")[CurrentIndex].remove();
			console.log(ForceContainers[typenum].querySelectorAll(".SingleForceContainer"));
			console.log(ForceContainers);
		}
	});
	
	TypeInteractionContainer.appendChild(ForceContainer);
	document.querySelector("#TypeInteractionWrapper").appendChild(TypeInteractionContainer);
	
	
	// Creating Particle Amount Input For Each Particle Type
	
	ParticleAmountInput.setAttribute("type", "number");
	ParticleAmountInput.value = EachParticleAmt;
	ParticleAmountInput.classList.add("ParticleAmount");
	ParticleAmountInput.addEventListener("change", function() {
		ParticleAmtChange(CurrentTypeArray, ParticleAmountInput.value);
	});
	
	
	// Creating Particle Interactivity for the new type with all other particle types
	for (let j = 0; j < NumOfTypes; j++) {
		console.log(j);
		let SingleForceContainer = document.createElement("div");
		SingleForceContainer.classList.add("SingleForceContainer");
		ForceContainer.appendChild(SingleForceContainer);
	
		let FirstColor = document.createElement("div"); // This is the particle's color
		FirstColor.style.background = newcolor;
		FirstColor.classList.add("ColorBlock");
		SingleForceContainer.appendChild(FirstColor);
		
		SingleForceContainer.appendChild(document.createElement("p").appendChild(document.createTextNode("X")));
		
		let SecondColor = document.createElement("div"); // This is the other particle's color
		console.log(document.querySelectorAll(".TypeInteractionContainer")[j]);
		SecondColor.style.background = document.querySelectorAll(".TypeInteractionContainer")[j].querySelector(".SingleForceContainer").querySelector(".ColorBlock").style.backgroundColor;
		SecondColor.classList.add("ColorBlock");
		SingleForceContainer.appendChild(SecondColor);
		
		// Creating the interaction between the new particle type with current TypeArray[j]'s particles
		ForceArray[NewIndex].push(RandomRange(1, -1));
		let ForceAttraction = CreateParticleForceInput(ForceArray[NewIndex][j]);
		SingleForceContainer.appendChild(ForceAttraction);
		AddForceAttractionListener(ForceAttraction, ForceArray);
		
		// Creating the Particle Interactivity for all other particle types with the new type and adding it to their force containers
		if (j < NumOfTypes - 1){
			ForceArray[j].push(RandomRange(1, -1));
			let OtherSingleForceContainer = document.createElement("div");
			OtherSingleForceContainer.classList.add("SingleForceContainer");
			
			let OtherFirstColor = document.createElement("div");
			OtherFirstColor.style.background = document.querySelectorAll(".TypeInteractionContainer")[j].querySelector(".SingleForceContainer").querySelector(".ColorBlock").style.backgroundColor;
			
			OtherFirstColor.classList.add("ColorBlock");
			OtherSingleForceContainer.appendChild(OtherFirstColor);

			OtherSingleForceContainer.appendChild(document.createElement("p").appendChild(document.createTextNode("X")));
			
			let OtherSecondColor = document.createElement("div");
			OtherSecondColor.style.background = newcolor;
			OtherSecondColor.classList.add("ColorBlock");
			OtherSingleForceContainer.appendChild(OtherSecondColor);
			
			
			let OtherForceAttraction = CreateParticleForceInput(ForceArray[j][NewIndex]);
			OtherSingleForceContainer.appendChild(OtherForceAttraction);
			ForceContainers[j].appendChild(OtherSingleForceContainer);
			AddForceAttractionListener(OtherForceAttraction, ForceArray);
		}
	}
}
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect(); // Getting canvas's size and position according to the viewport
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
	// computing the mouse position in the canvas's coordinates system
    let x = (event.clientX - rect.left) * scaleX;
    let y = (event.clientY - rect.top) * scaleY;
    return new Vector2(x, y);
}
// Function to get touch position
function getTouchPosition(canvas, touchEvent) {
    var rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
	let x = (touchEvent.touches[0].clientX - rect.left) * scaleX;
    let y = (touchEvent.touches[0].clientY - rect.top) * scaleY;
    return new Vector2(x, y);
}


canvas.addEventListener('mousedown', function(event) {
    MouseActive = true;
    MousePos = getMousePosition(canvas, event);
});

canvas.addEventListener('mouseup', function() {
    MouseActive = false;
});

canvas.addEventListener('mousemove', function(event) {
    if (MouseActive) {
        MousePos = getMousePosition(canvas, event);
    }
});



// Add touch event listeners
canvas.addEventListener('touchstart', function(event) {
    MouseActive = true;
    MousePos = getTouchPosition(canvas, event);
    event.preventDefault(); // prevent scrolling when touching the canvas
});

canvas.addEventListener('touchend', function() {
    MouseActive = false;
});

canvas.addEventListener('touchmove', function(event) {
    if (MouseActive) {
        MousePos = getTouchPosition(canvas, event);
        event.preventDefault();
    }
});


function Init(){
	// Starts off with 4 particle types
	EachParticleAmt = ParticleAmt / 4;
	for (let i = 0; i < 4; i++) {
		CreateNewParticleType();
	}
	MouseParticle.push(new Particle(0,0 ,"white", document.getElementById('MouseRangeValue').value, -1)); // creating the mouse particle
	

}
function Update(){
	if (PageList[2].style.display != "none"){ // so that the simulation wont affect the performance of all other pages unrelated to it
		var NewUpdateTime = Date.now();
		// getting the new dt by minusing the newupdatetime with the previousupdatetime, which results in the difference in time between update, hence dt
		var dt = Math.min(Math.max((NewUpdateTime - LastUpdateTime), 0), dtMax) * dtMultiplier;
		LastUpdateTime = NewUpdateTime;
		
		if (MouseActive){
			//MousePos = getMousePosition(canvas, e);
			MouseParticle[0].pos = MousePos;
			
			
			
			let MouseTypeArray = TypeArray.map(function(innerArray) { // applying .slice to each element of type array, creating a shallow copy, this is to separate the mouse particle from the real type array whilst at the same time still being able to interact with the simulation, if the mouse particle was in the real type array, even when the user lets go, the particles would still be affected by it regardless.
                return innerArray.slice();
            });
            let MouseForceArray = ForceArray.map(function(innerArray) { // same as above
                return innerArray.slice();
            });
			MouseTypeArray.push(MouseParticle);
			for (let i = 0; i < NumOfTypes + 1; i++){
				if (i < NumOfTypes){
					MouseForceArray[i].push(MouseAttractStrength);
				}
				Attraction(TypeArray[i], MouseTypeArray, MouseForceArray[i]);
			}
		}
		else{
			for (let i = 0; i < NumOfTypes; i++){
				Attraction(TypeArray[i], TypeArray, ForceArray[i]);
			}
		}
			
		for (let i = 0; i < NumOfTypes; i++){
			for (let j = 0; j < TypeArray[i].length; j++){
				UpdateParticlesVelPos(TypeArray[i][j], dt);
			}
		}

		
		Render();
		//MouseActive = false;
	}
	else{
		console.log("noton")
	}
	requestAnimationFrame(Update);
}
function Render(){
	AdjustCanvasSize();
	ctx.clearRect(0,0, canvas.width, canvas.height); // clearing the canvas for the next render
	
	// rendering every particle
	for (let i = 0; i < NumOfTypes; i++){
		for (let j = 0; j < TypeArray[i].length; j++){
			TypeArray[i][j].RenderParticle(ctx);
		}
	}
	if (MouseActive){
		MouseParticle[0].RenderParticle(ctx);
	}	
}
Init();
Update();

document.getElementById('randomise-forces-button').addEventListener('click', RandomiseForces);
document.getElementById('randomise-positions-button').addEventListener('click', function() {
	for (let i = 0; i < NumOfTypes; i++){
		RandomisePositions(TypeArray[i]);
	}
});
document.getElementById('add-new-type-button').addEventListener('click', function() {
	CreateNewParticleType();
});

document.getElementById('MouseAttractionValue').addEventListener("change", function() {
	MouseAttractStrength = document.getElementById('MouseAttractionValue').value;
});
document.getElementById('MouseRangeValue').addEventListener("change", function() {
	MouseParticle[0].AttractionDistance = document.getElementById('MouseRangeValue').value;
});
document.getElementById('Intensity').addEventListener("change", function() {
	Intensity = document.getElementById('Intensity').value;
});
document.getElementById('AirResistance').addEventListener("change", function() {
	AirResistance = document.getElementById('AirResistance').value;
});

document.getElementById('dtMultiplier').addEventListener("change", function() {
	dtMultiplier = document.getElementById('dtMultiplier').value;
});