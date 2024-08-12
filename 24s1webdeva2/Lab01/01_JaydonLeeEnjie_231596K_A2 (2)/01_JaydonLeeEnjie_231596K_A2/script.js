document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("main section");
    const homeBtn = document.getElementById("home-btn");
    const quizBtn = document.getElementById("quiz-btn");
    const quizSection = document.getElementById("Quiz");
    const gameBtn = document.getElementById("game-btn");
    const gameSection = document.getElementById("Game");
    const nav = document.querySelector("nav");
    const quizForm = document.getElementById("quiz-form");
    let previouslyActiveLink = null;    
    let previouslyActiveSection = null;
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetSection = document.getElementById(link.dataset.tab);
            if (targetSection.style.display === "block") {
                return; // Do nothing if the section is already active
            }
            sections.forEach((section) => {
                if (section.style.display === "block") {
                    section.style.opacity = 0;
                    setTimeout(() => {
                        section.style.display = "none";
                    }, 500);
                }
            });
            targetSection.style.display = "block";
            targetSection.style.opacity = 0;
            setTimeout(() => {
                targetSection.style.opacity = 1;
            }, 100);
            navLinks.forEach((otherLink) => {
                otherLink.classList.remove("active");
            });
            link.classList.add("active");
            previouslyActiveLink = link;
            previouslyActiveSection = targetSection;
        });
    
    });
    
    

    homeBtn.addEventListener("click", () => {
        quizSection.style.display = "none"; // Hide the quiz section
        gameSection.style.display = "none";
        nav.style.display = "block"; // Show the navigation bar
        if (previouslyActiveSection) {
            sections.forEach((section) => {
                if (section.style.display === "block") {
                    section.style.opacity = 0;
                    setTimeout(() => {
                        section.style.display = "none";
                    }, 500);
                }
            });
            previouslyActiveSection.style.display = "block";
            previouslyActiveSection.style.opacity = 0;
            setTimeout(() => {
                previouslyActiveSection.style.opacity = 1;
            }, 100);
        }
        restartGame();

    });

    quizBtn.addEventListener("click", (event) => {
        gameSection.style.display = "none";
        event.preventDefault();
        sections.forEach((section) => {
            if (section.style.display === "block") {
                section.style.opacity = 0;
                setTimeout(() => {
                    section.style.display = "none";
                }, 500);
            }
        });
        quizSection.style.display = "block";
        quizSection.style.opacity = 0;
        setTimeout(() => {
            quizSection.style.opacity = 1;
        }, 100);
        nav.style.display = "none";
        restartGame();
  
    });

    gameBtn.addEventListener("click", (event) => {
        quizSection.style.display = "none"; // Hide the quiz section
        event.preventDefault();
        sections.forEach((section) => {
            if (section.style.display === "block") {
                section.style.opacity = 0;
                setTimeout(() => {
                    section.style.display = "none";
                }, 500);
            }
        });
        gameSection.style.display = "block";
        gameSection.style.opacity = 0;
        setTimeout(() => {
            gameSection.style.opacity = 1;
        }, 100);
        nav.style.display = "none";
    });

    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let score = 0;
        let allAnswersSelected = true;

        // Check if all answers are selected
        for (let i = 1; i <= 10; i++) {
            const question = `q${i}`;
            const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
            if (!selectedOption) {
                allAnswersSelected = false;
                break;
            }
        }

        if (!allAnswersSelected) {
            alert("Please select an answer for all questions before submitting.");
            return;
        }

        // Calculate score
        const answers = {
            q1: "a", // Correct answer for question 1
            q2: "a", // Correct answer for question 2
            q3: "a", // Correct answer for question 3
            q4: "c", // Correct answer for question 4
            q5: "c", // Correct answer for question 5
            q6: "c", // Correct answer for question 6
            q7: "a", // Correct answer for question 7
            q8: "b", // Correct answer for question 8
            q9: "b", // Correct answer for question 9
            q10: "a" // Correct answer for question 10
        };

        for (let i = 1; i <= Object.keys(answers).length; i++) {
            const question = `q${i}`;
            const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
            if (selectedOption && selectedOption.value === answers[question]) {
                score++;
            }
        }

        // Display score
        alert(`You scored ${score} out of ${Object.keys(answers).length}`);

        // Reset answers
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
            const label = radio.nextElementSibling;
            label.style.color = "";
        });
    });

    // Add event listener to radio buttons
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener("click", () => {
            const question = radio.name;
            const labels = document.querySelectorAll(`label[for="${question}"]`);
            labels.forEach(label => label.style.color = "");
            const selectedLabel = radio.nextElementSibling;
            selectedLabel.style.color = "orange";
            const otherRadios = document.querySelectorAll(`input[name="${question}"]`);
            otherRadios.forEach(otherRadio => {
                if (otherRadio !== radio) {
                    const otherLabel = otherRadio.nextElementSibling;
                    otherLabel.style.color = "";
                }
            });
        });
    });

    const flipCards = document.querySelectorAll(".flip-card-inner");
    flipCards.forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });

    const gameArea = document.getElementById("game-area");
    const startButton = document.getElementById("start-button");
    let timerDisplay = document.getElementById("timer-display");
    let timerInterval = null;
    let timeRemaining = 60; // 1 minute
    let fallingImages = [];
    let lives = 3;
    let movableImage;
    let gameOver = false;
    let spawnInterval = null; 
    
    
   
    
    startButton.addEventListener("click", startGame);
    
    function startGame() {
        startButton.disabled = true;
        startButton.style.display = "none"; 
        createMovableImage();
        document.addEventListener("mousemove", moveMovableImage);
        document.addEventListener("touchmove", moveMovableImage);
        lives = 3;
        updateLivesDisplay(); // update the lives display
        timeRemaining = 60; // reset the timer
        timerInterval = setInterval(updateTimer, 1000);//Update the timer
        spawnInterval = setInterval(spawnFallingImage, 1000); // spawn a falling image every 1 second
        gameOver = false;
      
    }
    
    function createMovableImage() {
        movableImage = document.createElement("img");
        movableImage.src = "images/brain.png"; // Replace with your movable image file name
        movableImage.className = "movable-image";
        movableImage.style.position = "absolute";
        movableImage.style.top = "85%";
        movableImage.style.left = "50%";
        gameArea.appendChild(movableImage);
    }
    let fallingImageInterval = null;
   
    function spawnFallingImage() {
        if (!gameOver){
            const img = document.createElement("img");
            img.src = "images/sexsymbol.png"; // Replace with your falling image file name
            img.className = "falling-image";
            img.style.width = "80px";
            img.style.position = "absolute";
            img.style.top = "0px"; // start at the top
            img.style.left = `${Math.random() * (gameArea.offsetWidth - 50)}px`; // random x position
            gameArea.appendChild(img);
            fallingImages.push(img);
            // Start the timer to move the image down
            let fallingImageInterval = setInterval(() => {
                moveFallingImageDown(img);
            }, 50); // update every 50ms
            // Remove the image after a certain amount of time
            setTimeout(() => {
                gameArea.removeChild(img);
                fallingImages = fallingImages.filter((i) => i!== img);
                clearInterval(fallingImageInterval); // stop the timer
            }, 10000); // remove after 5 seconds
        }
        
    }
      
    function moveFallingImageDown(img) {
        let top = parseInt(img.style.top, 10);
        top += 5; // move 3 pixels down
        img.style.top = `${top}px`;
        if (top > gameArea.offsetHeight + 175) {
          // remove the image when it reaches the bottom
          gameArea.removeChild(img);
          fallingImages = fallingImages.filter((i) => i!== img);
        }else {
            // Check for collision with movable image
            checkCollision(img);
        }
    }
    

      
    function checkCollision(fallingImage) {
        const movableImageRect = movableImage.getBoundingClientRect();
        const fallingImageRect = fallingImage.getBoundingClientRect();
        if (
            fallingImageRect.left <= movableImageRect.right &&
            fallingImageRect.right >= movableImageRect.left &&
            fallingImageRect.top <= movableImageRect.bottom &&
            fallingImageRect.bottom >= movableImageRect.top
        ) {
            // Collision detected, remove the falling image
            gameArea.removeChild(fallingImage);
            fallingImages = fallingImages.filter((i) => i!== fallingImage);
            lives--;
            updateLivesDisplay();
            if (lives <= 0) {
                // Time's up! You win!
                clearInterval(timerInterval);
                const winText = document.createElement("div");
                winText.textContent = "You Lose";
                winText.style.fontSize = "36px";
                winText.style.color = "red";
                winText.style.textAlign = "center";
                gameArea.appendChild(winText);
                const restartButton = document.createElement("button");
                restartButton.textContent = "Restart";
                restartButton.style.marginTop = "20px";
                restartButton.onclick = restartGame;
                gameArea.appendChild(restartButton);
                startButton.style.display = "none"; // hide the start button
                clearInterval(timerInterval);
                clearInterval(fallingImageInterval); // stop spawning falling images
                gameOver = true;
                fallingImages.forEach(img => {
                    clearInterval(img.interval); // stop moving existing falling images
                    gameArea.removeChild(img);
                });
            }
        }
    }
    function updateLivesDisplay() {
        const livesDisplay = document.getElementById("lives-display");
        livesDisplay.textContent = `Lives: ${lives}`;
    }
    function moveMovableImage(event) {
        let mouseX;
        if (event.type === "touchmove") {
            mouseX = event.touches[0].clientX;
        } else {
            mouseX = event.clientX;
        }
        const newLeft = Math.max(0, Math.min(gameArea.offsetWidth - 40, mouseX - 40)); // keep image within game area
        movableImage.style.left = `${newLeft}px`;
    }
    function updateTimer() {
        timeRemaining--;
        timerDisplay.textContent = `Time: ${formatTime(timeRemaining)}`;
        if (timeRemaining <= 0) {
            // Time's up! You win!
            clearInterval(timerInterval);
            const winText = document.createElement("div");
            winText.textContent = "You Win!";
            winText.style.fontSize = "36px";
            winText.style.color = "green";
            winText.style.textAlign = "center";
            gameArea.appendChild(winText);
            const restartButton = document.createElement("button");
            restartButton.textContent = "Restart";
            restartButton.style.marginTop = "20px";
            restartButton.onclick = restartGame;
            gameArea.appendChild(restartButton);
            startButton.disabled = false;
            startButton.style.display = "none"; // hide the start button
            clearInterval(fallingImageInterval); // stop spawning falling images
            gameOver = true;
            fallingImages.forEach(img => {
                clearInterval(img.interval); // stop moving existing falling images
                gameArea.removeChild(img);
            });
        }
    }

    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    function restartGame() {
        // reset the game state
        timeRemaining = 60;
        lives = 3;
        updateLivesDisplay();
        updateTimer();
        // Remove the restart button
        const restartButtons = document.querySelectorAll('.restart-button'); // get all elements with class 'restart-button'
        restartButtons.forEach(button => button.remove()); // remove each button
        // Show the start button
        startButton.disabled = false;
        startButton.style.display = "block";
        // Clear the game area
        gameArea.innerHTML = "";
        // Clear the intervals and timeouts
        clearInterval(timerInterval);
        timerInterval = null;
        clearInterval(spawnInterval); // clear the interval that calls spawnFallingImage
        spawnInterval = null;
        fallingImages.forEach(img => {
            clearInterval(img.interval); // stop moving existing falling images
            clearTimeout(img.timeout); // clear the timeout that removes the image
            img.remove(); // remove the image from the game area
        });
        fallingImages = [];
        // Reset the game over flag
        gameOver = false;
     
    }
    navLinks[0].click();

    
    
});