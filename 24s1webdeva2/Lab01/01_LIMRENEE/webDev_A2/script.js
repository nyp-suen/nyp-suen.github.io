//the function to add cursor effect from the css, made into a function cus I don't like seeing all the lines of codes
function cursorEffect() {
    //setting a variable to select the cursor class that effects the mouse pointer design
    const cursor = document.querySelector(".cursor");

    //add event "mousemove" to show what the mouse does when it's moving.
    document.addEventListener("mousemove", (mouseEvent) => {
        //x and y in the page and then adjusts the top and left positions of the mouse cursor so that the design moves where the mouse moves
        let x = mouseEvent.pageX;
        let y = mouseEvent.pageY;
    
        cursor.style.top = y + "px";
        cursor.style.left = x + "px";
        //set display style to block when it moves while in css it stays as none so that the cursor is hidden until the cursor enters the screen
        cursor.style.display = "block";

        
    });
    
    //add event "mouseout" to show what the mouse does it's out of screen
    document.addEventListener("mouseout", ()=>{
        //sets the display to none so that it doesnt stick to the edges of the screen when the mouse leaves the screen
        cursor.style.display = "none";
    });
};

//the function to handle the page changing
function pageChanger(){

    //setting the elements for the <a> links
    const pageSharks = document.querySelector("#pageSharks");
    const pageFacts = document.querySelector("#pageFacts");
    const pageBio = document.querySelector("#pageBiology");
    const pageHistory = document.querySelector("#pageHistory");

    const sharkTypeButton = document.querySelector("#showTypes");
    const sharkSpeciesButton = document.querySelector("#showSpecies");

    function dispSharkBtns(){
        sharkTypeButton.style.display = "block";
        sharkSpeciesButton.style.display = "block";
    }

    function noDispSharkBtns(){
        let typeText = document.querySelector("#typeText");
        let speciesText = document.querySelector("#speciesText");

        sharkTypeButton.style.display = "none";
        sharkSpeciesButton.style.display = "none";
        
        //so other pages do not display the text
        typeText.style.display = "none";
        speciesText.style.display = "none";
    }
    
    //display the shark content
    function dispSharkContent(){
        let sharkText = document.querySelector("#sharkPage");
        let factText = document.querySelector("#factsPage");
        let bioText = document.querySelector("#biologyPage");
        let historyText = document.querySelector("#historyPage");
    
        sharkText.style.display = "block";
        factText.style.display = "none";
        bioText.style.display = "none";
        historyText.style.display = "none";

        //display the buttons for the type
        dispSharkBtns();
    }

    function dispTypeSubCont(){
        let sharkTypeTxt = document.querySelector("#typeText");
        let sharkSpeciesTxt = document.querySelector("#speciesText");

        sharkTypeTxt.style.display = "block";
        sharkSpeciesTxt.style.display = "none";
    }

    function dispSpeciesSubCont(){
        let sharkTypeTxt = document.querySelector("#typeText");
        let sharkSpeciesTxt = document.querySelector("#speciesText");

        sharkTypeTxt.style.display = "none";
        sharkSpeciesTxt.style.display = "block";
    }
    
    //display the facts content
    function dispFactsContent(){
        let sharkText = document.querySelector("#sharkPage");
        let factText = document.querySelector("#factsPage");
        let bioText = document.querySelector("#biologyPage");
        let historyText = document.querySelector("#historyPage");
    
        sharkText.style.display = "none";
        factText.style.display = "block";
        bioText.style.display = "none";
        historyText.style.display = "none";

        noDispSharkBtns();
    }

    //display the biology content
    function dispBioContent(){
        let sharkText = document.querySelector("#sharkPage");
        let factText = document.querySelector("#factsPage");
        let bioText = document.querySelector("#biologyPage");
        let historyText = document.querySelector("#historyPage");
    
        sharkText.style.display = "none";
        factText.style.display = "none";
        bioText.style.display = "block";
        historyText.style.display = "none";

        noDispSharkBtns();
    }
    
    //display the history content
    function dispHistoryContent(){
        let sharkText = document.querySelector("#sharkPage");
        let factText = document.querySelector("#factsPage");
        let bioText = document.querySelector("#biologyPage");
        let historyText = document.querySelector("#historyPage");
    
        sharkText.style.display = "none";
        factText.style.display = "none";
        bioText.style.display = "none";
        historyText.style.display = "block";

        noDispSharkBtns();
    }

    //call the shark page to show content
    pageSharks.addEventListener("click", function(){
        dispSharkContent();
    });

    sharkTypeButton.addEventListener("click", function(){
        dispTypeSubCont();
    });

    sharkSpeciesButton.addEventListener("click", function(){
        dispSpeciesSubCont();
    });

    //call the facts page to show content
    pageFacts.addEventListener("click", function(){
        dispFactsContent();
    });

    //call the biology page to show content
    pageBio.addEventListener("click", function(){
        dispBioContent();
    });

    //call the history page to show content
    pageHistory.addEventListener("click", function(){
        dispHistoryContent();
    });
    
    
}

function factsQuiz(){
    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submit');
    const retryButton = document.getElementById('retry');
    const showAnswerButton = document.getElementById('showAnswer');

    let currentQuestion = 0;
    let score = 0;
    let incorrectAnswers = [];

    const quizData = [
    {
        question: "What is the largest species of shark currently living?",
        options: ["Great White Shark", "Hammerhead Shark", "Whale Shark", "Tiger Shark"],
        answer: "Whale Shark"
    },
    {
        question: "How do sharks differ from fish in terms of their skeletons?",
        options: ["Sharks have bony skeletons", "Sharks have cartilage skeletons", "Sharks have no skeletons", "Sharks have wooden skeletons"],
        answer: "Sharks have cartilage skeletons"
    },
    {
        question: "How do sharks detect prey in the water?",
        options: ["By sight only", "By echolocation", "By detecting electrical fields", "By taste"],
        answer: "By detecting electrical fields"
    },
    {
        question: "What is unique about the way sharks reproduce compared to other fish?",
        options: ["They lay eggs in nests", "They give live birth", "They clone themselves", "They reproduce through budding"],
        answer: "They give live birth"
    },
    {
        question: "What adaptation helps sharks maintain buoyancy in the water?",
        options: ["Swim bladders", "Hollow bones", "Large livers filled with oil", "Air sacs"],
        answer: "Large livers filled with oil"
    },
    {
        question: "How do some shark species rest without sinking?",
        options: ["By swimming continuously", "By inflating their swim bladders", "By lying on the ocean floor", "By attaching to rocks"],
        answer: "By swimming continuously"
    },
    {
        question: "What is the smallest species of shark?",
        options: ["Dwarf Lanternshark", "Pygmy Shark", "Spined Pygmy Shark", "Cookiecutter Shark"],
        answer: "Dwarf Lanternshark"
    },
    {
        question: "How do shark populations impact the health of coral reefs?",
        options: ["They have no impact", "They help maintain the balance of marine species", "They destroy coral reefs", "They increase algae growth"],
        answer: "They help maintain the balance of marine species"
    },
    {
        question: "What is the primary threat to shark populations worldwide?",
        options: ["Natural predators", "Disease", "Overfishing and habitat loss", "Climate change"],
        answer: "Overfishing and habitat loss"
    },
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function displayQuestion() {
        const questionData = quizData[currentQuestion];

        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = questionData.question;

        const optionsElement = document.createElement('div');
        optionsElement.className = 'options';

        const shuffledOptions = [...questionData.options];
        shuffleArray(shuffledOptions);

        for (let i = 0; i < shuffledOptions.length; i++) {
            const option = document.createElement('label');
            option.className = 'option';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'quiz';
            radio.value = shuffledOptions[i];

            const optionText = document.createTextNode(shuffledOptions[i]);

            option.appendChild(radio);
            option.appendChild(optionText);
            optionsElement.appendChild(option);
        }

        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsElement);
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="quiz"]:checked');

        if (selectedOption) {
            const answer = selectedOption.value;
            if (answer === quizData[currentQuestion].answer){
                score++;
            } 
            else {
                incorrectAnswers.push({
                    question: quizData[currentQuestion].question,
                    incorrectAnswer: answer,
                    correctAnswer: quizData[currentQuestion].answer,
                });
            }

            currentQuestion++;
            selectedOption.checked = false;

            if (currentQuestion < quizData.length) {
            displayQuestion();
            } 
            else {
            displayResult();
            }
        }
    }

    function displayResult() {
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'inline-block';
        resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    }

    function retryQuiz() {
        currentQuestion = 0;
        score = 0;
        incorrectAnswers = [];
        quizContainer.style.display = 'block';
        submitButton.style.display = 'inline-block';
        retryButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        resultContainer.innerHTML = '';
        displayQuestion();
    }

    function showAnswer() {
        quizContainer.style.display = 'none';
        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'none';

        let incorrectAnswersHtml = '';

        for (let i = 0; i < incorrectAnswers.length; i++) {
            incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    resultContainer.innerHTML = `
            <p>You scored ${score} out of ${quizData.length}!</p>
            <p>Incorrect Answers:</p>
            ${incorrectAnswersHtml}
        `;
    }

    submitButton.addEventListener('click', checkAnswer);
    retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);

    displayQuestion();
};

function feedbackForm(){
    function feedbackFormSubmission(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const shark = document.getElementById('shark').value;
        
        const feedbackResult = document.getElementById('feedbackResult');
        feedbackResult.innerHTML = `
            <p>Thank you for your feedback, ${username}!</p>
            <p>Your favorite shark is: ${shark}</p>
        `;
        feedbackResult.style.display = 'block';
    
        document.getElementById('feedbackForm').reset();
    }
    
    document.getElementById('feedbackForm').addEventListener('submit', handleFeedbackFormSubmission);
    
}


pageChanger();

factsQuiz();

feedbackForm()

