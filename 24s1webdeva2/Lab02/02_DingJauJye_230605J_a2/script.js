// script.js

// Function to show a specific section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    // Special handling for showing the home page sections
    if (sectionId === 'home') {
        document.querySelector('.banner').style.display = 'block';
        document.querySelectorAll('.content-section').forEach(section => section.style.display = 'block');
    }
}

// Function to show the Trivia Quiz section
function showQuiz() {
    showSection('game-container');
    startGame(); // Start the game when the quiz tab is shown
}

// Function to show the Wire Game section
function showWireGame() {
    showSection('wire-game-container');
    startWireGame(); // Function to initialize the wire game
}

// Function to show the QR Code section
function showQRCode() {
    showSection('qr-code-container');
}

// Slideshow functions
let slideIndex = 0;
showSlides();

// Function to display slideshow images
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Toggle content visibility for read more/read less
function toggleContent(listId, buttonId) {
    const list = document.getElementById(listId);
    const button = document.getElementById(buttonId);

    if (list.classList.contains('collapsed')) {
        list.classList.remove('collapsed');
        button.innerText = '- (read less)';
    } else {
        list.classList.add('collapsed');
        button.innerText = '+ (read more)';
    }
}

// Trivia Quiz functions
const levels = [
    {
        question: "What should you do if an electrical appliance catches fire?",
        answers: [
            { text: "Throw water on it", correct: false, explanation: "Water conducts electricity and can make the situation worse. Use a fire extinguisher instead." },
            { text: "Use a fire extinguisher", correct: true, explanation: "Using a fire extinguisher specifically rated for electrical fires is the correct action." },
            { text: "Ignore it", correct: false, explanation: "Ignoring an electrical fire is dangerous and can lead to severe damage or injury." },
            { text: "Cover it with a blanket", correct: false, explanation: "Covering an electrical fire with a blanket is not safe as it can catch fire itself." }
        ]
    },
    {
        question: "Is it safe to use a damaged power cord?",
        answers: [
            { text: "Yes", correct: false, explanation: "Damaged power cords can cause electric shocks or fires and should not be used." },
            { text: "No", correct: true, explanation: "No, it is not safe to use a damaged power cord as it poses a significant risk of electric shock or fire." },
            { text: "Only if it's not sparking", correct: false, explanation: "Even if a damaged cord is not sparking, it is still dangerous and should be replaced." },
            { text: "Only if it's a small damage", correct: false, explanation: "Any damage to a power cord is unsafe and requires immediate attention." }
        ]
    },
    {
        question: "What should you do before plugging in a new appliance?",
        answers: [
            { text: "Read the manual", correct: true, explanation: "Reading the manual helps you understand the proper usage and safety instructions for the appliance." },
            { text: "Just plug it in", correct: false, explanation: "Plugging in an appliance without understanding its specifications can be hazardous." },
            { text: "Check the voltage", correct: true, explanation: "Ensuring the appliance matches the voltage of your outlet is crucial for safe operation." },
            { text: "Test the plug", correct: false, explanation: "Testing the plug is not a standard safety procedure before use." }
        ]
    },
    {
        question: "Can you use electrical devices near water?",
        answers: [
            { text: "Yes", correct: false, explanation: "Using electrical devices near water increases the risk of electric shock." },
            { text: "No", correct: true, explanation: "No, you should avoid using electrical devices near water to prevent electric shock." },
            { text: "Only if they are waterproof", correct: false, explanation: "Even waterproof devices should be used with caution near water." },
            { text: "Only if you are careful", correct: false, explanation: "Being careful is not enough to mitigate the risks associated with using electrical devices near water." }
        ]
    },
    {
        question: "What is the first thing you should do if someone gets an electric shock?",
        answers: [
            { text: "Pull them away from the source", correct: false, explanation: "Pulling someone away from the source can put you at risk. Instead, turn off the power first." },
            { text: "Call emergency services", correct: true, explanation: "Calling emergency services ensures professional medical help is on the way." },
            { text: "Throw water on them", correct: false, explanation: "Throwing water on someone who has received an electric shock is dangerous." },
            { text: "Give them CPR", correct: false, explanation: "CPR may be necessary, but only after ensuring the power source is turned off and calling emergency services." }
        ]
    },
    {
        question: "How should you unplug an electrical device?",
        answers: [
            { text: "Pull the cord", correct: false, explanation: "Pulling the cord can damage it and cause electric shock. Always pull the plug itself." },
            { text: "Pull the plug", correct: true, explanation: "Pulling the plug, not the cord, is the correct way to unplug an electrical device." },
            { text: "Jerk the cord quickly", correct: false, explanation: "Jerking the cord quickly can cause damage and is not safe." },
            { text: "Use a tool to pry it out", correct: false, explanation: "Using tools to pry out a plug is unsafe and should be avoided." }
        ]
    },
    {
        question: "What should you do if you see exposed wires?",
        answers: [
            { text: "Ignore them", correct: false, explanation: "Ignoring exposed wires is dangerous. They should be repaired immediately." },
            { text: "Repair them yourself", correct: false, explanation: "Repairing exposed wires yourself can be risky if you are not a qualified electrician." },
            { text: "Call an electrician", correct: true, explanation: "Calling a qualified electrician is the safest way to deal with exposed wires." },
            { text: "Cover them with tape", correct: false, explanation: "Covering exposed wires with tape is a temporary fix and not a safe solution." }
        ]
    },
    {
        question: "How often should you check your smoke alarms?",
        answers: [
            { text: "Every month", correct: true, explanation: "Checking your smoke alarms every month ensures they are functioning properly." },
            { text: "Once a year", correct: false, explanation: "Checking your smoke alarms only once a year is not sufficient for safety." },
            { text: "When they start beeping", correct: false, explanation: "Waiting for smoke alarms to beep before checking them can be too late." },
            { text: "Every 6 months", correct: false, explanation: "Smoke alarms should be checked more frequently than every 6 months." }
        ]
    },
    {
        question: "Can you overload a power strip?",
        answers: [
            { text: "Yes", correct: false, explanation: "Overloading a power strip can cause overheating and potentially start a fire." },
            { text: "No", correct: true, explanation: "No, overloading a power strip is dangerous and should be avoided." },
            { text: "Only if it has a surge protector", correct: false, explanation: "Even with a surge protector, overloading a power strip is unsafe." },
            { text: "Only if it's temporary", correct: false, explanation: "Even temporarily overloading a power strip can be dangerous." }
        ]
    },
    {
        question: "What is the safest way to use extension cords?",
        answers: [
            { text: "Use them permanently", correct: false, explanation: "Extension cords should not be used as a permanent solution." },
            { text: "Use them temporarily", correct: true, explanation: "Extension cords are designed for temporary use and should not replace permanent wiring." },
            { text: "Use multiple together", correct: false, explanation: "Using multiple extension cords together increases the risk of overheating and fire." },
            { text: "Use them for heavy appliances", correct: false, explanation: "Heavy appliances should be plugged directly into wall outlets, not extension cords." }
        ]
    }
];

let currentLevel = 0;
let score = 0;
let wrongAnswers = [];

// Function to start the quiz game
function startGame() {
    currentLevel = 0;
    score = 0;
    wrongAnswers = [];
    document.getElementById('next-button').disabled = true;
    document.getElementById('results').style.display = 'none';
    document.getElementById('game-container-inner').style.display = 'block';
    showLevel();
}

// Function to display the current quiz level
function showLevel() {
    const level = levels[currentLevel];
    document.getElementById('level-info').innerText = `Level ${currentLevel + 1}`;
    document.getElementById('question').innerText = level.question;
    const answersElement = document.getElementById('answers');
    answersElement.innerHTML = '';
    level.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answersElement.appendChild(button);
    });
}

// Function to handle the selection of an answer
function selectAnswer(answer, button) {
    const answersElement = document.getElementById('answers');
    Array.from(answersElement.children).forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === answer.text) {
            btn.classList.add(answer.correct ? 'correct' : 'incorrect');
        }
    });
    if (!answer.correct) {
        wrongAnswers.push({ question: levels[currentLevel].question, selected: answer.text, explanation: answer.explanation });
    } else {
        score++;
    }
    document.getElementById('next-button').disabled = false;
}

// Function to move to the next quiz level
function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        showLevel();
    } else {
        endGame();
    }
}

// Function to end the quiz game and show results
function endGame() {
    document.getElementById('game-container-inner').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('score').innerText = `Your score: ${score} out of ${levels.length}`;
    const explanationsElement = document.getElementById('explanations');
    explanationsElement.innerHTML = '';
    wrongAnswers.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('explanation');
        div.innerHTML = `<strong>Question:</strong> ${item.question}<br><strong>Your answer:</strong> ${item.selected}<br><strong>Explanation:</strong> ${item.explanation}`;
        explanationsElement.appendChild(div);
    });
}

// Function to retry the quiz game
function retry() {
    startGame();
}

// Wire game functions
let selectedWire = null;
let canvas, ctx;
let connectedWires = [];

// Function to initialize the wire game
function startWireGame() {
    const wires = document.querySelectorAll('.wire');
    let sockets = document.querySelectorAll('.socket');

    wires.forEach(wire => {
        wire.addEventListener('mousedown', () => selectWire(wire));
    });

    document.addEventListener('mouseup', connectWire);

    document.addEventListener('mousemove', drawWire);

    canvas = document.getElementById('wire-canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Shuffle sockets
    sockets = Array.from(sockets);
    shuffleArray(sockets);
    const panelRight = document.getElementById('panel-right');
    panelRight.innerHTML = '';
    sockets.forEach(socket => {
        panelRight.appendChild(socket);
    });

    // Reset game state
    resetWireGame();
}

// Function to select a wire
function selectWire(wire) {
    selectedWire = {
        element: wire,
        color: wire.dataset.color,
        startX: wire.getBoundingClientRect().left + wire.clientWidth / 2,
        startY: wire.getBoundingClientRect().top + wire.clientHeight / 2
    };
    wire.classList.add('selected');
}

// Function to connect a wire to a socket
function connectWire(event) {
    if (selectedWire) {
        const sockets = document.querySelectorAll('.socket');
        sockets.forEach(socket => {
            const socketRect = socket.getBoundingClientRect();
            if (
                event.clientX > socketRect.left &&
                event.clientX < socketRect.right &&
                event.clientY > socketRect.top &&
                event.clientY < socketRect.bottom &&
                socket.dataset.color === selectedWire.color
            ) {
                socket.style.backgroundColor = selectedWire.color;
                selectedWire.element.classList.add('connected');
                connectedWires.push({
                    color: selectedWire.color,
                    startX: selectedWire.startX,
                    startY: selectedWire.startY,
                    endX: socketRect.left + socket.clientWidth / 2,
                    endY: socketRect.top + socket.clientHeight / 2
                });
            }
        });
        selectedWire.element.classList.remove('selected');
        selectedWire = null;
        redrawWires();
        checkWinCondition();
    }
}

// Function to draw a wire following the mouse
function drawWire(event) {
    if (selectedWire) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawWires();
        ctx.strokeStyle = selectedWire.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(selectedWire.startX, selectedWire.startY);
        ctx.lineTo(event.clientX, event.clientY);
        ctx.stroke();
    }
}

// Function to redraw connected wires
function redrawWires() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    connectedWires.forEach(wire => {
        ctx.strokeStyle = wire.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(wire.startX, wire.startY);
        ctx.lineTo(wire.endX, wire.endY);
        ctx.stroke();
    });
}

// Function to check if all wires are connected correctly
function checkWinCondition() {
    const connectedWires = document.querySelectorAll('.wire.connected');
    if (connectedWires.length === 4) {
        showCongratulations();
    }
}

// Function to display congratulations screen
function showCongratulations() {
    document.getElementById('wire-game-inner').style.display = 'none';
    document.getElementById('congratulations').style.display = 'block';
}

// Function to reset the wire game
function resetWireGame() {
    const wires = document.querySelectorAll('.wire');
    const sockets = document.querySelectorAll('.socket');

    wires.forEach(wire => {
        wire.classList.remove('connected', 'selected');
    });

    sockets.forEach(socket => {
        socket.style.backgroundColor = '';
    });

    selectedWire = null;
    connectedWires = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('wire-game-inner').style.display = 'block';
    document.getElementById('congratulations').style.display = 'none';
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize the home section when the page loads
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

// Toggle navigation menu for mobile view
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});
