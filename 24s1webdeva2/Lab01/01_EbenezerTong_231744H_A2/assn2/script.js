/*jslint browser:true */
/*jshint esversion: 6 */

//target all elements to save to constants
const page1btn=document.querySelector("#maintopic");
const page2btn=document.querySelector("#suptopic1");
const page3btn=document.querySelector("#subtopic2");
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
show(1);
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

// form variables
var txt1 = document.getElementById("tbuser");
var btn1 = document.getElementById("send");
var out1 = document.getElementById("output1");

btn1.addEventListener("click", CalculateResult);

// calculating the result
function CalculateResult() {
  let result1 = Math.round(540000 / txt1.value);
  let result2 = Math.round(690000 / txt1.value);
  let result3 = Math.round(1088000 / txt1.value);
  out1.innerHTML = `You will take about ${result1} months in order to earn enough
  for a Aston Martin v8 Vantage, ${result2} months for an Aston Martin DBS and ${result3} months for 
  an Aston Martin Vanquish`;
}

// quiz variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

// start quiz and next question event listeners
startButton.addEventListener("click", StartGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  SetNextQuestion();
})

// starting the quiz
function StartGame() {
  console.log("started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  SetNextQuestion();
}

// setting the next question
function SetNextQuestion() {
  ResetState();
  ShowQuestion(shuffledQuestions[currentQuestionIndex]);
}

// showing the next question
function ShowQuestion(question) {
questionElement.innerText = question.question;
question.answers.forEach(answer => {
  const button = document.createElement('button');
  button.innerText = answer.text;
  button.classList.add('btn');
  if (answer.correct) {
    button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", SelectAnswer);
  answerButtonsElement.appendChild(button);
})
}

// resetting the state, which is called everytime the next question button is pressed
function ResetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild);
  }
}

// when the user chooses an answer, make the correct answer green and the wrong answers red, let them go to the  next question 
function SelectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  SetStatusClass(document.body, correct);
  /* Live collection, so need to convert to array for foreach loop */
  Array.from(answerButtonsElement.children).forEach(button =>{
    SetStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  }
  else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

// set whether an element is correct or wrong
function SetStatusClass(element, correct) {
  ClearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  }
  else {
    element.classList.add("wrong");
  }
}

// removing an element's status
function ClearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// array of questions
const questions = [
  {
    question: "What year did the Aston Martin v8 Vantage first release?",
    answers: [
      {text: "2002", correct: false},
      {text: "2006", correct: false},
      {text: "2005", correct: true},
      {text: "2010", correct: false}
    ]
  },
  {
    question: "What does GT stand for?",
    answers: [
      {text: "Growtopia", correct: false},
      {text: "Grand Tourer", correct: true},
      {text: "Grand Touring", correct: false},
      {text: "Great Tourer", correct: false}
    ]
  },
  {
    question: "What isn't part of a v8 Vantage's interior?",
    answers: [
      {text: "Leather material", correct: false},
      {text: "Rear parking sensors", correct: false},
      {text: "Six-CD autochanger", correct: false},
      {text: "Lightning cable port", correct: true}
    ]
  },
  {
    question: "What model is the Aston Martin DBS based on?",
    answers: [
      {text: "DB9", correct: true},
      {text: "2005 v8 vantage", correct: false},
      {text: "DB7", correct: false},
      {text: "DBS Volante", correct: false}
    ]
  }, 
  {
    question: "When did deliveries for the Vanquish start?",
    answers: [
      {text: "Late 2012", correct: false},
      {text: "2021", correct: false},
      {text: "2010", correct: false},
      {text: "Late 2013", correct: true}
    ]
  }
]

// Get the modal
var modal = document.getElementById("modal1");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("dimensionsimg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption1");


img.onclick = function () {
    "use strict";
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
};


var modal = document.getElementById("modal2");


var img = document.getElementById("modelimg");
var modalImg = document.getElementById("img02");
var captionText = document.getElementById("caption2");
img.onclick = function() {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
};


var span = document.getElementsByClassName("close")[1];

span.onclick = function() { 
  modal.style.display = "none";
};

var modal = document.getElementById("modal3");


var img = document.getElementById("interiorimg");
var modalImg = document.getElementById("img03");
var captionText = document.getElementById("caption3");
img.onclick = function() {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
};


var span = document.getElementsByClassName("close")[2];

span.onclick = function() { 
  modal.style.display = "none";
};

var modal = document.getElementById("modal4");


var img = document.getElementById("engineimg");
var modalImg = document.getElementById("img04");
var captionText = document.getElementById("caption4");
img.onclick = function() {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
};


var span = document.getElementsByClassName("close")[3];

span.onclick = function() { 
  modal.style.display = "none";
};

var modal = document.getElementById("modal5");


var img = document.getElementById("endimg");
var modalImg = document.getElementById("img05");
var captionText = document.getElementById("caption5");
img.onclick = function() {
  modal.style.display = "block";
  modalImg.src = "images/secret.jpeg";
  captionText.innerHTML = this.alt;
};

var span = document.getElementsByClassName("close")[4];

span.onclick = function() { 
  modal.style.display = "none";
};

// Getting references to the audio clip and button which activates it
const audio = new Audio("audio/aston_martin_sound.mp3");
const audioButton = document.getElementById("audioButton");

audioButton.addEventListener("click", PlayAudio);

function PlayAudio() {
  console.log("audio");
  audio.play();
}

