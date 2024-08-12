//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");
//select all subtopic pages

console.log(allpages);
hideall();
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

//Page 3 game content start
const cards = [
    { id: 1, src: "images/game/curry.jpg" }, { id: 1, src: "images/game/curry.jpg" },
    { id: 2, src: "images/game/chicken.jpg" }, { id: 2, src: "images/game/chicken.jpg" },
    { id: 3, src: "images/game/seafood.jpg" }, { id: 3, src: "images/game/seafood.jpg" },
    { id: 4, src: "images/game/mushroomchic.jpg" }, { id: 4, src: "images/game/mushroomchic.jpg" },
    { id: 5, src: "images/game/tomyamseafood.jpg" }, { id: 5, src: "images/game/tomyamseafood.jpg" },
    { id: 6, src: "images/game/kyushublack.jpg" }, { id: 6, src: "images/game/kyushublack.jpg" },
];

let flippedCards = [];
let matchedCards = [];
let boardLocked = false;

function shuffleArray(array) {
    //loops decrement from last array until 0
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCardElement(card) {
    const element = document.createElement('div');
    element.className = 'card';
    element.dataset.id = card.id;

    // Create and append the image element
    const img = document.createElement('img');
    img.src = card.src;
    img.className = 'card-image';
    img.style.display = 'none'; // Hide image initially

    element.appendChild(img);

    element.addEventListener('click', () => flipCard(element, img));

    return element;
}

function flipCard(cardElement, imgElement) {
    if (boardLocked || cardElement.classList.contains('flipped')) return;

    cardElement.classList.add('flipped');
    imgElement.style.display = 'block';
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) checkMatch();
}

//function for checking matching cards
function checkMatch() {
    //prevent players from interacting with board while checking
    boardLocked = true;

    //Get the two cards that were flipped
    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];

    //Get the images inside these cards
    const firstImg = firstCard.querySelector('img');
    const secondImg = secondCard.querySelector('img');

    //first and second card match
    if (firstCard.dataset.id === secondCard.dataset.id) {
        //if cards match add to matchedcards array
        matchedCards.push(firstCard.dataset.id);

        //clear flipped cards array
        flippedCards = [];

        //unlock board
        boardLocked = false;

        // win condition check if all cards are matching
        if (matchedCards.length === cards.length / 2) {
            //Display win condition
            const resultElement = document.getElementById('result');
    
            resultElement.innerHTML = 'Congratulations! You Won!';
            resultElement.classList.add('win-text');    
        }
    }
    else 
    {
        //wait 1000 ms (1s) if cards flipped are wrong
        //flip cards back
        setTimeout(() => {
            //remove flipped class to reset card state
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            //hide image display
            firstImg.style.display = 'none';
            secondImg.style.display = 'none';

            //clear flipped card array
            flippedCards = [];

            //unlock board
            boardLocked = false;
        }, 1000);
    }
}

function startGame() {
    document.getElementById('result').textContent = '';
    flippedCards = [];
    matchedCards = [];
    boardLocked = false;
    shuffleArray(cards);
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    cards.forEach(card => { gameContainer.appendChild(createCardElement(card)); });
}

const restartBtn = document.querySelector("#restartbtn")
restartBtn.addEventListener("click", startGame)

// Start the game on page load
startGame();
//Page 3 game content end


const koreanFlag = document.querySelector(".korean-flag-img");
const indoFlag = document.querySelector(".indo-flag-img");

koreanFlag.addEventListener("click", function () {
    moveAndFade(koreanFlag);

    koreanFlag.addEventListener('animationend', function () {
        koreanFlag.classList.add("hidden-page1");
    }, { once: true }); //event listener called once
});

indoFlag.addEventListener("click", function () {
    moveAndFade(indoFlag);

    indoFlag.addEventListener('animationend', function () {
        indoFlag.classList.add("hidden-page1");
    }, { once: true }); //event listener called once
});

function moveAndFade(e) {
    e.classList.add("moveAndFade");
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, { threshold: 0.0 }); // Correctly passing options as the second argument

const hiddenInfo = document.querySelectorAll('.hidden-page2');
hiddenInfo.forEach((info) => observer.observe(info));


const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");

function toggleMenus() { /*open and close menu*/
    menuItemsList.classList.toggle("menuHide");
}

function checkWidth() {
    if (window.innerWidth > 800) {
        menuItemsList.classList.remove("menuHide");
    }
}

hamBtn.addEventListener("click", toggleMenus);
window.addEventListener("resize", checkWidth);
checkWidth();
