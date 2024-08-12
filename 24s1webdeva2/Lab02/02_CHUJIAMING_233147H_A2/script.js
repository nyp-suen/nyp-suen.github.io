


/**********BACKGROUND CHANGER********/

// array of bg images
let backgroundImages = [
    'images/sushi.jpg',
    'images/sushi2.jpg',
    'images/sushi3.jpg',
    'images/sushi4.jpg'

];
let bgIndex = 0; // set initial image to 0

//function to change bg
function changeBackground() {

    const imgElement = document.querySelector('.BGimg'); //select bg image element
    //loop loop through array
    bgIndex = (bgIndex + 1) % backgroundImages.length;
    const nextImage = backgroundImages[bgIndex];

    // Fade out current image
    imgElement.style.opacity = '0';

    // Change src and fade in next image after a short delay
    setTimeout(function() {
        imgElement.src = nextImage;
        imgElement.style.opacity = '0.6';
    }, 600);
}

setInterval(changeBackground, 4000); // Call changeBackground() every 4 seconds





//**********PAGE TOGGLE *************/

// Target all elements to save to constants
const page0btn = document.querySelector("#page0btn");
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
var allpages = document.querySelectorAll(".page");

// Select all subtopic pages
console.log(allpages);
hideall();

function hideall() { // Function to hide all pages
    for (let onepage of allpages) { // Go through all subtopic pages
        onepage.style.display = "none"; // Hide it
    }
}

function show(pgno) { // Function to show selected page no
    hideall();
    // Select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    // Show the page
    onepage.style.display = "block";
}

/* Listen for clicks on the buttons, assign anonymous
event handler functions to call show function */
page0btn.addEventListener("click", function () {
    show(0);
});
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});

// hamIcon menu js
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("nav ul");

function toggleMenus() {
    /* open and close menu */
    menuItemsList.classList.toggle("menuHide");
}








//***********Interactive image *******/

var imageTile = document.querySelector("#interactive-Img h2"); //select page 1 header
var imageText = document.querySelector("#interactive-Img p"); //select page 1 paragraph

//event listener, if button element clicked, change title and paragraph 
document.getElementById('image-button-1').addEventListener('click', function() {
    imageText.innerHTML = " rice seasoned with sweetened vinegar and often topped or filled with a variety of ingredients such as seafood (both raw and cooked) and vegetables. <a href='https://en.wikipedia.org/wiki/Sushi' target='_blank'>LEARN MORE</a>";
    imageTile.innerHTML = "SUSHI";
});

document.getElementById('image-button-2').addEventListener('click', function() {
    imageText.innerHTML = " Ginger served with sushi helps kill bloodborne parasites from raw fish. Pickled ginger is popular palate cleanser since the medical and agriculture industries have learned more about bacteria that live in raw seafood. <a href='https://www.allaboutsushiguide.com/sushi-ginger.html' target='_blank'>LEARN MORE</a>";
    imageTile.innerHTML = "GINGER";

});

document.getElementById('image-button-3').addEventListener('click', function() {
    imageText.innerHTML = "Soy sauce is often served with sushi as a dipping sauce. Soy sauce is a liquid condiment of Chinese origin, traditionally made from a fermented paste of soybeans, roasted grain, brine, and Aspergillus oryzae. <a href='https://en.wikipedia.org/wiki/Soy_sauce' target='_blank'>LEARN MORE</a>";
    imageTile.innerHTML = "SOY";

});

document.getElementById('image-button-4').addEventListener('click', function() {
    imageText.innerHTML = "This is wasabi, a paste often served with sushi. Wasabi is a plant of the family Brassicaceae, which also includes horseradish and mustard. The plant is native to Japan and East Russia. <a href='https://en.wikipedia.org/wiki/Wasabi' target='_blank'>LEARN MORE</a>" ;
    imageTile.innerHTML = "Wasabi";
});






/**********QUIZ GAME**********/  

//store questions, images, and MCQ options for quiz.
const questions = [
    {
     question: "In the image below, what is the following type of sushi?",
     imageSrc: "images/quiz/quiz1.png",
     answers: [
        {text: "Maki", correct: true},
        {text: "Nigiri", correct: false},
        {text: "Temaki", correct: false},
        {text: "Gunkan Maki", correct: false},
        ]
    },
    {
    
        question: "What is the pink meat in this nigiri sushi",
        imageSrc: "images/quiz/quiz2.png",
        answers: [
        {text: "Salmon", correct: true},
        {text: "Pork", correct: false},
        {text: "chicken", correct: false},
        {text: "beef", correct: false},
        ]
    },
    {
    
        question: "In the image below, what is the following type of sushi?",
        imageSrc: "images/quiz/quiz3.png",
        answers: [
        {text: "Maki", correct: false},
        {text: "Nigiri", correct: false},
        {text: "Temaki", correct: true},
        {text: "Gunkan Maki", correct: false},
        ]
    },
    {
        question: "What sauce is often served with this dish?",
        imageSrc: "images/quiz/quiz4.png",
        answers: [
        {text: "Chili sauce", correct: false},
        {text: "cheese sauce", correct: false},
        {text: "ranch sauce", correct: false},
        {text: "soy sauce", correct: true},
        ]
    },

    {
        question: "In the image below, what is the following type of sushi?",
        imageSrc: "images/quiz/quiz5.png",
        answers: [
            {text: "Maki", correct: false},
            {text: "Nigiri", correct: false},
            {text: "Temaki", correct: false},
            {text: "Gunkan Maki", correct: true},
        ]
    },
    
    {
        question: "What is a common ingredient in Gunkan Maki",
        imageSrc: "images/quiz/quiz6.png",
        answers: [
        {text: "ice cream", correct: false},
        {text: "banana", correct: false},
        {text: "pork", correct: false},
        {text: "salmon roe", correct: true},
        ]
    },

    {
        question: "In the image below, what is the following type of sushi?",
        imageSrc: "images/quiz/quiz7.png",
        answers: [
            {text: "Maki", correct: false},
            {text: "Nigiri", correct: true},
            {text: "Temaki", correct: false},
            {text: "Gunkan Maki", correct: false},
        ]
    }

];

//select quiz elements 
const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const answerbutton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//define variables for quiz
let currentQuestionIndex = 0;
let score = 0;

//init variables and start quiz, reset quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    //remove previous questions
    resetQuestions();

    //set displayed question as current question
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+ "." + currentQuestion.question;


    //display the image if hidden
    questionImage.style.display = "block";
    //change the image for the questions
   questionImage.src = currentQuestion.imageSrc;


   //loop through MCQ options and create buttons for each question
   currentQuestion.answers.forEach(function(answer) {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbutton.appendChild(button);

    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer); 
    });

}
//clean up options from previous questions 
function resetQuestions(){
    nextButton.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }

}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // check if option is correct
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;    //increase player score by 1
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerbutton.children).forEach(function(button) {
        if (button.dataset.correct === "true") {
            // add correct class to button to change to green color
            button.classList.add("correct");
        }
        button.disabled = true; //disable all buttons
    });
    nextButton.style.display = "block"; //display next button to go next question


}
// call if game ends
function showScore() {
    resetQuestions();
    // display score
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length + "!";
    
    // ask if player wants to restart
    nextButton.innerHTML = "Play Again";
    questionImage.style.display = "none";
    nextButton.style.display = "block";
}

function handleNextButton(){
    //increment question counter
    currentQuestionIndex++; 
    //if theres still questions, show questions, if no questions, show score
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
// when click on next button
nextButton.addEventListener("click", function() {
    if (currentQuestionIndex < questions.length) {
        // if there's still questions, go to next question
        handleNextButton();
    } else {
        // restart the quiz
        startQuiz();
    }
});

startQuiz();



//**************FRUIT CATCHER***************//
// Select fruit catcher elements
var game = document.querySelector(".gameArea");
var basket = document.querySelector(".basket");
var scorePoint = document.querySelector(".gameArea .score h1");
var scoreCounter = 0;
var startButton = document.querySelector(".gameButtons > button:nth-child(2)");
var leftButton = document.querySelector(".gameButtons > button:nth-child(1)");
var rightButton = document.querySelector(".gameButtons > button:nth-child(3)");
const audio = document.getElementById('gamebg');
const sfxaudio = document.getElementById('fruitsfx');
var gameInterval;
var gameEndTimeout;
var moveLeftInterval; 
var moveRightInterval; 

// Function to move basket left
function moveBasketLeft() {
    var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));

    //if not out of the gamearea move  
    if (basketLeft > 0) {
        basketLeft -= 15; // move by this number of pixles
        basket.style.left = basketLeft + 'px';
    }
}

// Function to move basket right
function moveBasketRight() {
    //get width for baasket and game area
    var gameAreaWidth = game.clientWidth;
    var basketWidth = basket.clientWidth; 
    var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));

    //check if basket is still in the game
    if (basketLeft + basketWidth < gameAreaWidth) {
        basketLeft += 15;
        basket.style.left = basketLeft + 'px';
    }
}

    // Function to start moving basket left continuously
    function startMovingLeft() {
        moveLeftInterval = setInterval(moveBasketLeft, 50); 
    }

    // Function to stop moving basket left
    function stopMovingLeft() {
        clearInterval(moveLeftInterval);
    }

        // Function to start moving basket right continuously
    function startMovingRight() {
        moveRightInterval = setInterval(moveBasketRight, 50); 
    }

        // Function to stop moving basket right
    function stopMovingRight() {
        clearInterval(moveRightInterval);
    }
        

// Event listener for keyboard controls
document.addEventListener("keydown", function(e) {
    if (e.key === "a" || e.key === "A") {
        moveBasketLeft();
    }
    if (e.key === "d" || e.key === "D") {
        moveBasketRight();
    }
});

// Event listeners for button controls
leftButton.addEventListener("mousedown", startMovingLeft);
leftButton.addEventListener("mouseup", stopMovingLeft);
leftButton.addEventListener("mouseleave", stopMovingLeft);

rightButton.addEventListener("mousedown", startMovingRight);
rightButton.addEventListener("mouseup", stopMovingRight);
rightButton.addEventListener("mouseleave", stopMovingRight);

// Event listeners for touch controls
leftButton.addEventListener("touchstart", startMovingLeft);
leftButton.addEventListener("touchend", stopMovingLeft);
leftButton.addEventListener("touchcancel", stopMovingLeft);

rightButton.addEventListener("touchstart", startMovingRight);
rightButton.addEventListener("touchend", stopMovingRight);
rightButton.addEventListener("touchcancel", stopMovingRight);


// Function to generate and drop fruits
function generateFruits() {
    var fruit = document.createElement('div'); //create new element
    fruit.setAttribute("class", "fruits"); // give it the fruit class
    var gameAreaWidth = game.clientWidth;
    var randomX = Math.floor(Math.random() * (gameAreaWidth - 30)); // Subtract fruit width
    fruit.style.left = randomX + 'px'; // spawn random x value
    game.appendChild(fruit);

    // Animate fruit falling
    var fruitFallInterval = setInterval(function() {
        var fruitTop = parseInt(window.getComputedStyle(fruit).getPropertyValue("top"));
        if (fruitTop < game.clientHeight - 45) { // Subtract fruit height and danger line height
            fruit.style.top = fruitTop + 2 + 'px';
        } else {
            clearInterval(fruitFallInterval);
            game.removeChild(fruit); // Remove fruit if it reaches the bottom
        }

        // Collision detection
        var fruitLeft = parseInt(window.getComputedStyle(fruit).getPropertyValue("left"));
        var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
        var basketTop = parseInt(window.getComputedStyle(basket).getPropertyValue("top"));
        var fruitBottom = fruitTop + 30;

        if (fruitBottom >= basketTop && fruitLeft >= basketLeft && fruitLeft <= basketLeft + basket.clientWidth) {
            // Fruit caught
            clearInterval(fruitFallInterval);
            game.removeChild(fruit); //delete fruits
            scoreCounter++; //increase points
            scorePoint.textContent = "Score: " + scoreCounter; //display score
            console.log("Fruit caught! Score: " + scoreCounter); 
            sfxaudio.play(); //play fruit audio
        }
    }, 10);
}

// Function to start the game
function startGame() {
    //init game variables
    scoreCounter = 0;
    scorePoint.textContent = "Score: " + scoreCounter;
    generateFruits();
    gameInterval = setInterval(generateFruits, 2000); //spawn fruit every 2 seconds
    gameEndTimeout = setTimeout(endGame, 30000); // End game after 30 seconds
    audio.play(); //play bg music
}

// Function to end the game
function endGame() {
    clearInterval(gameInterval); //stop the function
    clearTimeout(gameEndTimeout);
    alert("Game over! Your score is: " + scoreCounter);
    resetGame(); //restart game
}

// Function to reset the game
function resetGame() {
    var fruits = document.querySelectorAll('.fruits');
    fruits.forEach(function(fruit) {
        game.removeChild(fruit);
    });
    basket.style.left = '0px'; // Reset basket position
}

// Event listener for start start button
startButton.addEventListener("click", startGame);




// *********TOGGLE FULLSCREEN*********

// Function to enter fullscreen mode
function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { 
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { 
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { 
        document.documentElement.msRequestFullscreen();
    }
}

// Function to exit fullscreen mode
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
    }
}

// Toggle fullscreen mode
function toggleFullscreen() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

// event listener to the button
document.getElementById('toggle-button').addEventListener('click', toggleFullscreen);



// ********Back to top button*******

document.addEventListener("DOMContentLoaded", function() {
    // Get the button
    let mybutton = document.getElementById("back-top");

    // When the user scrolls down, show the button
    window.onscroll = function() { scrollFunction(); };

    function scrollFunction() {
        //scroll by 20px
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When click , scroll to the top 
    mybutton.onclick = function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    };
});













    


