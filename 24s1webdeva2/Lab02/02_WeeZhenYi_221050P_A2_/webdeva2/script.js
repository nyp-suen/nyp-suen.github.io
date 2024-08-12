var currentPageID = "home"; /*Stores Which Page To Display (Start of website only home page would be set for display)*/
var slideIndex = 1; /*Variable To Store Which Slide To Show In The Slideshow*/

/*Initialize The Whole Website For The Starting Page For Display*/
function InitWebPage() {
    /*Sets The New Current Page For Display*/
    SetCurrentWebsitePage(currentPageID);
}

/* Sets the current page to be shown to user */
function SetCurrentWebsitePage(id) {

    // Sets The Id Section To Be Display
    let selector = document.getElementById(id);
    selector.style.display = "block";

    let selector2 = document.getElementsByClassName(id);

    // Give All The Rest That Have The Same Id Class To Be Displayed
    for (let i = 0; i < selector2.length; i++) {
        if (selector2[i].classList.contains("active-webpage") == false) {
            selector2[i].classList.add("active-webpage");
        }
    }
}

/* Assigns associated classes to all the "navigation links" as an identification */
function AddNavigationID() {
    let array = ["home", "history", "info"];

    let selector = document.querySelectorAll("header .nav-links a");

    // Loops Through All The Navigation Links And Give Them Their Respective Classes For Linking Display
    let j = 0;
    for (let i = 0; i < selector.length; i++, j++) {
        if (j > array.length - 1) {
            j = 0;
        }
        selector[i].classList += array[j];
    }
}

// Switches The Current Page To Be Displayed In the Website
function ChangeCurrentPageID() {
    // Sets The Old Page To Not Be Displayed
    let selector = document.getElementById(currentPageID);
    selector.style.display = "none";

    // Remove The Rest That Are In The Same Section To Not Be Displayed With An Underline By Removing Their Class
    let selector2 = document.getElementsByClassName(currentPageID);
    for (let i = 0; i < selector2.length; i++) {
        if (selector2[i].classList.contains("active-webpage") == true) {
            selector2[i].classList.remove("active-webpage");
        }
    }

    // Set The New Page To Be Displayed
    currentPageID = event.target.classList[0];

    SetCurrentWebsitePage(currentPageID);
}

// Add Add Click Function To All The Navigation Links In The Website
function AddOnClickToAllNavigation(selection) {
    let selector = document.querySelectorAll(selection);

    // Give All The Navigation The Ability To Change Page
    for (let i = 0; i < selector.length; i++) {
        selector[i].addEventListener("click", ChangeCurrentPageID);
    }
}

// Add The Respective & Necesary Navigation Links To Each Slide In The Slideshow
function AddNavigationInHomeSlideShow() {
    let selector = document.getElementsByClassName("slide");

    // List Of All The Links 
    let array = ["HOME", "HISTORY", "INFO"];

    for (let i = 0; i < selector.length; i++) {
        let navAddOn = document.createElement("nav");
        navAddOn.classList.add("navigation");

        // Create H1 With Text & Add It Into The Navigation As Name
        let h1AddOn = document.createElement("h1");
        let text = document.createTextNode("SKY PIONEER");
        h1AddOn.appendChild(text);

        navAddOn.appendChild(h1AddOn);

        let divAddOn = document.createElement("div");
        divAddOn.classList.add("nav-links");

        let div2AddOn = document.createElement("div");
        let a2AddOn = document.createElement("a");
        let text2AddOn = document.createTextNode("Navigation Menu");

        a2AddOn.appendChild(text2AddOn);
        div2AddOn.appendChild(a2AddOn);
        div2AddOn.classList.add("menu-button");
        navAddOn.appendChild(div2AddOn);

        // Create UL To Store All The Navigation Links Later As LI
        let ulAddOn = document.createElement("ul");

        // Loops To Create All The Navigation Links With LI & A And Then store It In UL
        for (let j = 0; j < array.length; j++) {
            let liAddOn = document.createElement("li");

            let aAddOn = document.createElement("a");
            text = document.createTextNode(array[j]);

            aAddOn.appendChild(text);
            liAddOn.appendChild(aAddOn);
            ulAddOn.appendChild(liAddOn);
        }

        divAddOn.appendChild(ulAddOn);
        navAddOn.appendChild(divAddOn);

        selector[i].appendChild(navAddOn);
    }
}

// Adds The Functionality Of The Arrow Buttons In the Slideshow Of The Home Page
function AddSlideShowArrowFunction() {
    let selector1 = document.querySelector(".prev");
    let selector2 = document.querySelector(".next");

    // Makes It Go To Previous Slide Base On Click
    selector1.addEventListener("click", function () {
        NextSlides(-1);
    });

    // Makes It Go To Next Slide Base On Click
    selector2.addEventListener("click", function () {
        NextSlides(1);
    });
}

// Increase Slide Index To Represent The Next Slide For Display
function NextSlides(n) {
    ShowSlides(slideIndex += n);
}

// Sets The Slide Index To N For Instant Switching Of Slide (Use By The Dots)
function CurrentSlide(n) {
    ShowSlides(slideIndex = n);
}

// Add The Footer Navigation Into The Website
function AddFooter(footer) {
    let selector = document.querySelectorAll("footer");

    // For Loops To Add The Footer Navigation To All The Seperate Webpages
    for (let i = 0; i < selector.length; i++) {
        let h3AddOn = document.createElement("h3");
        let text = document.createTextNode("SKY PIONEER");
        h3AddOn.appendChild(text);

        selector[i].appendChild(h3AddOn);

        let divAddOn = document.createElement("div");

        // For Loops All The Sections Of The Website To Create Their Respective DIV Section In The Footer
        for (let i = 0; i < footer.length; i++) {
            let ulAddOn = document.createElement("ul");

            // For Loop To Create Specific Sub Section Of The Main Section And Add It Into A UL To Represent That Section Entirely
            for (let j = 0; j < footer[i].length; j++) {
                let liAddOn = document.createElement("li");
                let aAddOn = document.createElement("a");

                let text = document.createTextNode(footer[i][j][0]);
                aAddOn.appendChild(text);

                let identification = footer[i][j][1];

                if (identification.includes("#") == true) {
                    aAddOn.href = identification;
                }
                else {
                    aAddOn.classList.add(identification);
                }

                liAddOn.appendChild(aAddOn);
                ulAddOn.appendChild(liAddOn);
            }

            divAddOn.appendChild(ulAddOn);
        }

        selector[i].appendChild(divAddOn);
    }
}

// Add The Dots In To The Slideshow Based On The Number Of Slides Added In the HTML
function AddSlideShowDots() {
    let selector1 = document.getElementById("dots");
    let selector2 = document.getElementsByClassName("slide");

    for (let i = 0; i < selector2.length; i++) {
        let addOn = document.createElement("span");
        addOn.classList.add("dot");

        selector1.appendChild(addOn);
    }
}

// Add The Functionality For The Dots In The Slideshow
function AddSlideShowDotFunction() {
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", createDotClickListener(i));
    }

    // Helper function to create a closure for each click event
    function createDotClickListener(index) {
        return function () {
            CurrentSlide(index + 1); // Call CurrentSlide with the correct index
        };
    }
}

// Display The New Slides And Hide The Old Ones In The Slideshow
function ShowSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    // If The Number Exceeds The Number Of Avaliable Slides Go Back To First Slide
    if (n > slides.length) {
        slideIndex = 1;
    }
    // If The Number Drops Below First Slide Go To Last
    else if (n < 1) {
        slideIndex = slides.length;
    }

    // Set All Slides To Not Display
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Make All Dots Unactive
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }

    // Set The Slide For Display To Display
    slides[slideIndex - 1].style.display = "block";

    // Set The Dot Corrosponding To The Active Slide To Be Active Also
    dots[slideIndex - 1].classList.add("active-dot");
}

function main() {

    // Array To Store All The Navigation Links (Name, ID)
    let footer = [
       /*Home Section*/[["HOME", "home"], ["Introduction", "#intro"], ["Mini Game", "#mini-game"]],
       /*History Section*/[["HISTORY", "history"], ["Information", "#information"]],
       /*Info Section*/[["INFO", "info"], ["Facts", "#facts"], ["Components", "#components"], ["Illustration", "#illustration"]]
    ];

    AddSlideShowArrowFunction();
    AddSlideShowDots();
    AddSlideShowDotFunction();

    AddNavigationInHomeSlideShow();
    AddNavigationID();
    AddOnClickToAllNavigation("header .nav-links a");

    ShowSlides(slideIndex);

    AddFooter(footer);
    AddOnClickToAllNavigation("footer ul li:first-of-type a");

    /* Sets the default starting page layout*/
    InitWebPage();
}

/* Runs functions when the website finish loading */
document.addEventListener("DOMContentLoaded", function () {
    main();


    var inFSMode = false;
    let fsButton = document.getElementById("fsButton");
    fsButton.addEventListener("click", function()
    {
        if (inFSMode == false)
        {
            enterFullscreen();
        }
        else
        {
            exitFullscreen();
        }
        inFSMode = !inFSMode;
    });

    // Function to enter fullscreen mode
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
    }// Function to exit fullscreen mode
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

    const planeName = document.querySelector("#game-name");
    const planeEngine = document.querySelector("#game-engine");
    const planeWing = document.querySelector("#game-wing");
    const planeDescription = document.querySelector("#game-description");

    const finalPlaneName = document.querySelector("#plane-name");
    const finalPlaneCost = document.querySelector("#plane-cost");
    const finalPlaneSpeed = document.querySelector("#plane-speed");
    const finalPlaneDescription = document.querySelector("#plane-description");

    const submitButton = document.querySelector("#game-submit");

    let engineArray = [
        ["20", "0.82"],
        ["15", "0.82"],
        ["18", "0.9"],
        ["30", "0.89"],
        ["25", "0.89"]
    ];

    let wingArray = [
        ["0.75", "0.9"],
        ["0.73", "0.82"],
        ["0.7", "0.89"],
        ["0.78", "0.89"],
        ["0.8", "0.82"]
    ];

    submitButton.addEventListener("click", function () {
        finalPlaneName.innerHTML = planeName.value;
        finalPlaneDescription.innerHTML = planeDescription.value;

        let engineNumeber = planeEngine.value;
        let wingNumeber = planeWing.value;

        finalPlaneCost.innerHTML = "$" + parseFloat(engineArray[parseInt(engineNumeber)][0]) + parseFloat(wingArray[parseInt(wingNumeber)][0]) + "M";
        finalPlaneSpeed.innerHTML = parseFloat(engineArray[parseInt(engineNumeber)][1]) + parseFloat(wingArray[parseInt(wingNumeber)][1]) + "KM/H";
    });

    var spawnTimer = 0.0;
    var gameTimer = 100;
    var points = 0;
    var gameState = false;
    var shootingGameBoard = document.querySelector("#shooting-game-inner");
    var timer = document.querySelector("#shooting-game-outer h3:first-of-type");
    var point = document.querySelector("#shooting-game-outer h3:nth-of-type(2)");
    var counter = document.querySelector("#shooting-game-outer h3:last-of-type");
    var gameButton = document.querySelector("#shooting-game-outer a");

    var ballArray = [];
    var gameLoop; // to store the interval ID for game loop
    var animationID; // to store the animation frame ID

    var one = false;

    gameButton.addEventListener("click", ChangeGameState);

    class Ball {
        constructor(velX, velY, positionX, positionY) {
            this.velX = velX;
            this.velY = velY;
            this.positionX = positionX;
            this.positionY = positionY;
        }
    }

    // To Change The State Of The Game
    function ChangeGameState() {
        gameState = !gameState;

        if (gameState) {
            StartGame();
            StartAutoMove();
        } else {
            ResetGame();
        }
    }

    // Reset The Game & All The Values To Its Default Value
    function ResetGame() {
        clearInterval(gameLoop);
        gameTimer = 100;
        spawnTimer = 0.0;
        points = 0;
        point.innerHTML = "Points: " + points;
        let balls = document.querySelectorAll(".ball");
        balls.forEach(function (ball) {
            ball.remove();
        });
        balls = document.querySelectorAll(".ball");
        counter.innerHTML = "Counter: " + balls.length;
        gameButton.innerHTML = "Start Game";
        timer.innerHTML = "Timer: " + gameTimer;
        ballArray.length = 0;
        one = false;

        window.cancelAnimationFrame(animationID); // Cancel animation frame
    }

    // Begins & Loop The Game
    function StartGame() {
        gameButton.innerHTML = "Reset Game";
        gameLoop = setInterval(function () {
            // Checks If The Game Duration Has Finish
            if (gameTimer > 0) {
                // When The Spawn Timer Reaches Spawn A Ball & Reset The Timer
                if (spawnTimer < 1.0) {
                    spawnTimer += 1.0;
                } else {
                    spawnTimer = 0.0;

                    // Spawn Ball
                    if (one == false) {
                        createBall();
                        countBall();
                        one = true;
                    }
                }
                gameTimer--;
                timer.innerHTML = "Timer: " + gameTimer;
            } else {
                clearInterval(gameLoop);
                gameState = false;
                gameButton.innerHTML = "Start Game";
            }
        }, 1000); // 1000 milliseconds = 1 second
    }

    // Function To Count The Number Of Ball In The Scene & Display It
    function countBall() {
        let balls = document.querySelectorAll(".ball");
        counter.innerHTML = "Counter: " + balls.length;
    }

    // Function Used By Each Ball Spawned When Clicked On Increase The Points The Player Has
    function getShot() {
        points++;
        this.remove(); // Remove the ball from DOM
        point.innerHTML = "Points: " + points;
        countBall();
        one = false;
    }

    // Randomizer
    function RandomMovementRange(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function createBall() {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        ball.style.backgroundRepeat = "no-repeat";
        ball.style.backgroundSize = "contain";
        ball.style.backgroundPositionX = "0.17vw";
        ball.style.backgroundImage = "url(Image/game.jpg)";
        ball.addEventListener("click", getShot);

        let board = document.getElementById("shooting-game-inner");

        // Random initial position within game board
        let initialPosX = RandomMovementRange(0, board.clientWidth / 16 - 2.5); // Adjusted width calculation
        let initialPosY = RandomMovementRange(0, board.clientHeight / 16 - 2.5); // Adjusted height calculation

        ballArray.push(new Ball(RandomMovementRange(-1, 1) / 10, RandomMovementRange(-1, 1) / 10, initialPosX, initialPosY));

        shootingGameBoard.appendChild(ball);
    }

    function StartAutoMove() {
        animationID = requestAnimationFrame(MoveWithCollision);
    }

    function MoveWithCollision() {
        let board = document.getElementById("shooting-game-inner");

        let balls = document.querySelectorAll(".ball");

        balls.forEach(function (ball, index) {
            let velX = ballArray[index].velX;
            let velY = ballArray[index].velY;
            let positionX = parseFloat(ballArray[index].positionX); // parse position to float
            let positionY = parseFloat(ballArray[index].positionY); // parse position to float

            positionX += velX;
            positionY += velY;

            // Handle collisions with game board boundaries
            if (positionX > board.clientWidth / 16 - 2.5) {
                velX = -velX;
                positionX = board.clientWidth / 16 - 2.5;
            }
            if (positionY > board.clientHeight / 16 - 2.5) {
                velY = -velY;
                positionY = board.clientHeight / 16 - 2.5;
            }
            if (positionX < 0) {
                velX = -velX;
                positionX = 0;
            }
            if (positionY < 0) {
                velY = -velY;
                positionY = 0;
            }

            ballArray[index].velX = velX;
            ballArray[index].velY = velY;
            ballArray[index].positionX = positionX;
            ballArray[index].positionY = positionY;

            ball.style.left = ballArray[index].positionX + "em"; // Adjusted to use px units
            ball.style.top = ballArray[index].positionY + "em"; // Adjusted to use px units
        });

        animationID = requestAnimationFrame(MoveWithCollision);
    }

    // Used To Keep Track Of Which Illustration The User Is Currently On
    var illustrationIndex = 0;

    // Array To Store All The Illustration Info
    let illustrationArray = [
        ["Image/airbus.jpg", "Phase 1", "Planning Phase", "Description: This phase involves thorough planning by the flight crew and ground operations. It includes route planning, weather assessment, fuel calculation, and other pre-flight preparations."],
        ["Image/boeing.jpg", "Phase 2", "Takeoff Phase", "Description: During takeoff, the aircraft accelerates along the runway, generating enough lift from its wings to become airborne. This phase requires precise coordination between the flight crew and air traffic control."],
        ["Image/history_photo.jpg", "Phase 3", "Climb Phase", "Description: After takeoff, the aircraft enters the climb phase where it ascends to its cruising altitude. During this phase, the aircraft gains altitude and adjusts its speed and configuration as per air traffic control instructions."],
        ["Image/history_title_image.png", "Phases 4", "Cruise Phase", "Description: In the cruise phase, the aircraft reaches its designated cruising altitude and maintains a steady speed. This phase is characterized by stable flight conditions and efficient fuel consumption."],
        ["Image/home_slide3.jpg", "Phases 5", "Descent Phase", "Description: During descent, the aircraft gradually reduces altitude to prepare for landing. Pilots follow air traffic control instructions and adjust speed and configuration to descend safely."],
        ["Image/home_slide2.jpg", "Phases 6", "Approach Phase", "Description: The approach phase begins as the aircraft nears the destination airport. Pilots follow a specific approach procedure, which includes descending to the final approach altitude and aligning with the runway for landing."],
        ["Image/home_slide3.jpg", "Phases 7", "Taxi Phase", "Description: After landing, the aircraft exits the runway and taxis to the terminal or designated parking area. This phase involves navigating on the ground under the direction of ground control or airport signage."],
    ];

    let selection = document.querySelector("#illustration-content img");
    let selection2 = document.querySelector("#illustration a");
    let selection3 = document.querySelectorAll("#illustration h3");
    let selection4 = document.querySelector("#illustration p");

    let progressBar = document.querySelector("#illustration-process-bar-inner");

    var newWidth;
    var id;

    selection2.addEventListener("click", function () {
        // Resets Everything 
        if (illustrationIndex == illustrationArray.length - 1) {
            illustrationIndex = 0;
            progressBar.style.width = "0%";
        }
        // Slowly Increments The Illustration Card & Progress Bar
        else if (illustrationIndex < illustrationArray.length) {
            illustrationIndex += 1;

            // Determines The New Length Of The Progress Bar
            newWidth = (illustrationIndex) / (illustrationArray.length - 1) * 100;
            id = window.requestAnimationFrame(frame);
        }

        // Displays The New Infomation
        selection.src = illustrationArray[illustrationIndex][0];
        for (let i = 0; i < selection3.length; i++) {
            selection3[i].innerHTML = illustrationArray[illustrationIndex][1 + i];
        }
        selection4.innerHTML = illustrationArray[illustrationIndex][3];
    });

    // Function Used To Slowly Increase & Change The Progress Bar Width
    function frame() {
        let width = parseFloat(progressBar.style.width) || 0;

        if (width >= newWidth) {
            progressBar.style.width = newWidth + '%';
            window.cancelAnimationFrame(id);
        } else {
            width += 0.25;
            progressBar.style.width = width + '%';
            id = window.requestAnimationFrame(frame);
        }
    }

    // Used To Toggle The Cards To Flip
    var cards = document.querySelectorAll('.flip-card');
    for (let card of cards) {
        card.addEventListener('click', flipCard(card));
    }

    function flipCard(card)
    {
        return function()
        {
            card.classList.toggle('is-flipped');
        };
    }

    // Used To Toggle (Hide & Show) The Top Navigation Bar When In Mobile Size
    let menuButtons = document.querySelectorAll(".menu-button");

    for (let i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener("click", ToggleNav);
    }

    function ToggleNav() {
        let selection = "#" + currentPageID + " .nav-links";

        let nav = document.querySelector(selection);

        nav.classList.toggle("nav-hide");
    }

    // Class To Store Information About An Airplane Model
    class AirplaneInfo {
        constructor(name, type, capacity, range, engine) {
            this.name = name;
            this.type = type;
            this.capacity = capacity;
            this.range = range;
            this.engine = engine;
        }
        getAllInfo() {
            let array = [];
            array.push(this.name);
            array.push(this.type);
            array.push(this.capacity);
            array.push(this.range);
            array.push(this.engine);
            return array;
        }
    }

    var airplaneInfos = [];

    // Init Of All The Displayed Models
    airplaneInfos.push(new AirplaneInfo("Airbus-A320", "Narrow-body, single-aisle aircraft primarily used for short to medium-haul flights.", "Typically seats around 150 passengers in a typical two-class configuration.", "Up to 6,480 km (3,500 nautical miles).", "Typically powered by CFM International CFM56 or International Aero Engines V2500 engines."));
    airplaneInfos.push(new AirplaneInfo("Airbus-A380", "Double-deck, wide-body aircraft designed for long-haul routes with high passenger capacity.", "Seats up to 525 passengers in a three-class configuration, or even more in an all-economy layout.", "Up to 15,200 km (8,200 nautical miles).", "Powered by Rolls-Royce Trent 900 or Engine Alliance GP7200 engines."));
    airplaneInfos.push(new AirplaneInfo("Airbus-A330", "Wide-body aircraft available in both medium-range and long-range variants, used for medium to long-haul flights.", "Capacity varies depending on the variant, typically seating around 250-300 passengers.", "Range varies by variant; for example, the A330-300 has a range of around 11,750 km (6,350 nautical miles).", "Powered by Rolls-Royce Trent 700, Pratt & Whitney PW4000, or General Electric CF6 engines."));
    airplaneInfos.push(new AirplaneInfo("Boeing-777-300ER", "Long-range, wide-body aircraft known for its extended range capability and high passenger capacity.", "Seats around 350-400 passengers in a typical three-class configuration.", "Up to 14,685 km (7,930 nautical miles).", "Powered by General Electric GE90 engines."));
    airplaneInfos.push(new AirplaneInfo("Boeing-737", "Narrow-body aircraft available in several variants (e.g., 737-800, 737 MAX), used for short to medium-haul flights.", "Capacity varies by variant; for example, the 737-800 seats around 160-180 passengers.", "Range varies by variant; for example, the 737-800 has a range of around 5,665 km (3,060 nautical miles).", "Engines vary by variant; for example, the 737-800 is powered by CFM International CFM56-7 engines."));
    airplaneInfos.push(new AirplaneInfo("Boeing-747", "Iconic wide-body aircraft with a distinctive hump, historically used for long-haul flights but now less common due to the rise of newer models.", "Historically seated up to 467 passengers in a three-class configuration, though configurations have varied widely over its operational history.", "Range varies by variant; for example, the 747-400 has a range of around 13,450 km (7,260 nautical miles).", "Engines vary by variant; for example, the 747-400 is powered by Pratt & Whitney PW4000 or General Electric CF6 engines."));

    let selector = document.querySelectorAll(".model > ul > li");
    let selector3 = document.querySelector("#models > ul:last-of-type");

    // Function To Add The Sliding Effect Into The Ul Even Clicked On Any Of The Panels
    function temp2() {
        let selector3 = document.querySelector("#models > ul:last-of-type");

        selector3.classList.add("slide-swipe");
        selector3.addEventListener('animationend', animationEndCallback);
    }

    // Function To Display The Models Info After Getting Clicked On 
    function temp(index) {
        return function () {
            let selector2 = document.querySelectorAll("#models > ul:last-of-type p");
            let array = ["Name: ", "Type & Class: ", "Capacity: ", "Range: ", "Engines: "];

            for (let j = 0; j < selector2.length; j++) {
                selector2[j].innerHTML = array[j] + airplaneInfos[index].getAllInfo()[j];
            }
        };
    }

    // Adds All The Add Clicked Events Into Each Of The Panels For Clicking For Info
    for (let i = 0; i < selector.length; i++) {
        selector[i].addEventListener("click", temp(i));
        selector[i].addEventListener("click", temp2);
    }

    // Used To Check If The Animation Has Finish Playing To Remove It
    function animationEndCallback() {
        selector3.removeEventListener('animationend', animationEndCallback);
        selector3.classList.remove("slide-swipe");
    }

    // Function To Play Audio Sound
    function playAudio(audio) {
        audio.play();
    }

    // Function To Pause Audio Sound
    function pauseAudio(audio) {
        audio.pause();
    }

    // Class To Store Data For Each Audio Button
    class AudioButton {
        constructor(active) {
            this.active = active;
        }
        setActive(newActive) {
            this.active = newActive;
        }
        getActive() {
            return this.active;
        }
    }

    let audioButton = document.querySelectorAll(".audio-button");
    let audioButtonArray = [];

    for (let i = 0; i < audioButton.length; i++) {
        let audio = audioButton[i].querySelector("audio");

        // Init All The Button Into An Array For Storing Data For Each Button
        audioButtonArray.push(new AudioButton(false));

        audioButton[i].addEventListener("click", temp3(i, audioButtonArray, audioButton, audio));

        audioButton[i].classList.add("audio-unactive");
        audioButton[i].classList.add("audio-normal");
    }

    // Function To Add In All The Functionality For The Audio Button
    function temp3(index, audioButtonArray, audioButton, audio) {
        return function () {
            if (audioButtonArray[index].getActive() == false) {
                playAudio(audio); // Play Audio
                audioButton[index].innerHTML = "Pause";

                // Change Style 
                audioButton[index].classList.add("audio-active");
                audioButton[index].classList.remove("audio-unactive");

                audioButtonArray[index].setActive(true);
            }
            else {
                pauseAudio(audio); // Pause Audio
                audioButton[index].innerHTML = "Play";

                // Change Style 
                audioButton[index].classList.remove("audio-active");
                audioButton[index].classList.add("audio-unactive");

                audioButtonArray[index].setActive(false);
            }
        };
    }
});