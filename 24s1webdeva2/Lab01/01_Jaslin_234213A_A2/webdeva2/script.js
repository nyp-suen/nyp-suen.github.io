const mainB = document.querySelector("#mainBtn");
const rulesB = document.querySelector("#rulesandmechanicsBtn");
const historyB = document.querySelector("#historyandevolutionBtn");
const playB = document.querySelector("#playBtn");

const rulesCB = document.querySelector("#rulesCardBtn");
const historyCB = document.querySelector("#historyCardBtn");
const playCB = document.querySelector("#playCardBtn");

var allP = document.querySelectorAll("section");

const offlineB = document.querySelector("#offlineBtn");
const onlineB = document.querySelector("#onlineBtn");
var rulesP = document.querySelectorAll(".page");

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", function () {
    menu.classList.toggle("active");
});

// button to section indexes
var buttonToIndex = {
    mainBtn: 0,
    rulesandmechanicsBtn: 1,
    historyandevolutionBtn: 2,
    playBtn: 3
};

// button to page IDs
const buttonToPageId = {
    offlineBtn: "offlinePage",
    onlineBtn: "onlinePage"
};

// buttons event listener
mainB.addEventListener("click", function () {
    showP(buttonToIndex.mainBtn);
});
rulesB.addEventListener("click", function () {
    showP(buttonToIndex.rulesandmechanicsBtn);
});
rulesCB.addEventListener("click", function () {
    showP(buttonToIndex.rulesandmechanicsBtn);
});
historyB.addEventListener("click", function () {
    showP(buttonToIndex.historyandevolutionBtn);
});
historyCB.addEventListener("click", function () {
    showP(buttonToIndex.historyandevolutionBtn);
});
playB.addEventListener("click", function () {
    showP(buttonToIndex.playBtn);
});
playCB.addEventListener("click", function () {
    showP(buttonToIndex.playBtn);
});

offlineB.addEventListener("click", function () {
    toggleRulesP(buttonToPageId.offlineBtn);
});

onlineB.addEventListener("click", function () {
    toggleRulesP(buttonToPageId.onlineBtn);
});

// touch events
function addTouchEvents(element, callback) {
    element.addEventListener("touchstart", function (event) {
        event.preventDefault();
        callback();
    });
}

addTouchEvents(mainB, function () {
    showP(buttonToIndex.mainBtn);
});
addTouchEvents(rulesB, function () {
    showP(buttonToIndex.rulesandmechanicsBtn);
});
addTouchEvents(historyB, function () {
    showP(buttonToIndex.historyandevolutionBtn);
});
addTouchEvents(playB, function () {
    showP(buttonToIndex.playBtn);
});

addTouchEvents(rulesCB, function () {
    showP(buttonToIndex.rulesandmechanicsBtn);
});
addTouchEvents(historyCB, function () {
    showP(buttonToIndex.historyandevolutionBtn);
});
addTouchEvents(playCB, function () {
    showP(buttonToIndex.playBtn);
});


addTouchEvents(offlineB, function () {
    toggleRulesP(buttonToPageId.offlineBtn);
});
addTouchEvents(onlineB, function () {
    toggleRulesP(buttonToPageId.onlineBtn);
});

function showP(index) {
    // hide page
    hideP();
    // if index in bound
    if (index >= 0 && index < allP.length) {
        // show page
        allP[index].style.display = "block";
    }

    // header visability
    var header = document.querySelector("header");
    if (header) {
        if (index === 0) {
            header.style.display = "none";
        } else {
            header.style.display = "flex";
        }
    }
}

function hideP() {
    for (let onepage of allP) {
        onepage.style.display = "none";
    }
}

// hide all visible page with fade-out animation
function hideRulesP(callback) {
    // find page that are visible
    let pagesToHide = Array.from(rulesP).filter(function (page) {
        return page.style.display === "block";
    });
    // keep track of hidden pages
    let pagesHidden = 0;

    // if visible, apply fade-out animation
    pagesToHide.forEach(function(onepage) {
    onepage.classList.remove("fade-in");
    onepage.classList.add("fade-out");
    // event listener for end of animation
    onepage.addEventListener("animationend", function() {
        onepage.style.display = "none";
        onepage.classList.remove("fade-out");
        pagesHidden++;
        // call callback function if all pages are hidden
        if (pagesHidden === pagesToHide.length && callback) {
            // executes after another function finishes executing
            callback();
        }
    }, { once: true });
});

    if (pagesToHide.length === 0 && callback) {
        callback();
    }
}

// toggles visibility
function toggleRulesP(id) {
    var page = document.getElementById(id);
    if (page.style.display === "block") {
        page.classList.remove("fade-in");
        page.classList.add("fade-out");
        // event listener for end of animation
        page.addEventListener("animationend", function () {
            page.style.display = "none";
            page.classList.remove("fade-out");
        }, { once: true });
    } else {
        hideRulesP(function () {
            page.style.display = "block";
            page.classList.add("fade-in");
        });
    }
}

// main page and card handling
const mainPage = document.querySelector("#mainpageDiv");
const cards = Array.from(document.querySelectorAll(".card"));

function handleCardClick(card) {
    const cardId = card.id;
    // get page index
    const index = buttonToIndex[cardId];
    if (index !== undefined) {
        showP(index);
    }
}

// card event listener
cards.forEach(function (card) {
    card.addEventListener("click", function() {
        // hide mainpage
        mainPage.style.display = "none";
        // show other pages
        handleCardClick(card);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    showP(buttonToIndex.mainBtn);

    const audio = document.getElementById("bgm");
    const startMusicButton = document.getElementById("startMusicButton");
    const pauseMusicButton = document.getElementById("pauseMusicButton");

    function playAudio() {
        audio.play();
    }

    function pauseAudio() {
        audio.pause();
    }

    startMusicButton.addEventListener("click", playAudio);
    pauseMusicButton.addEventListener("click", pauseAudio);

    const flipContainer = document.querySelector(".flip-container");
    const flip = document.querySelector(".flip");

    function handleFlip() {
        flip.classList.toggle("flip-active");
    }

    function addEventListeners() {
        flipContainer.addEventListener("touchstart", handleFlip);
    }

    function removeEventListeners() {
        flipContainer.removeEventListener("touchstart", handleFlip);
    }

    if (window.innerWidth < 800) {
        addEventListeners();
    }

    window.addEventListener("resize", function () {
        if (window.innerWidth < 800) {
            addEventListeners();
        } else {
            removeEventListeners();
        }
    });
});

// animation fade in when scroll
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});


var hiddenRight = document.querySelectorAll(".hidden-right");
hiddenRight.forEach(function (el) {
    observer.observe(el);
});

var hiddenLeft = document.querySelectorAll(".hidden-left");
hiddenLeft.forEach(function (el) {
    observer.observe(el);
});

let gameStarted = false;

// board
const board = [
    ["w3", "", "", "l2", "", "", "", "w3", "", "", "", "l2", "", "", "w3"],
    ["", "w2", "", "", "", "l3", "", "", "", "l3", "", "", "", "w2", ""],
    ["", "", "w2", "", "", "", "l2", "", "l2", "", "", "", "w2", "", ""],
    ["l2", "", "", "w2", "", "", "", "l2", "", "", "", "w2", "", "", "l2"],
    ["", "", "", "", "w2", "", "", "", "", "", "w2", "", "", "", ""],
    ["", "l3", "", "", "", "l3", "", "", "", "l3", "", "", "", "l3", ""],
    ["", "", "l2", "", "", "", "l2", "", "l2", "", "", "", "l2", "", ""],
    ["w3", "", "", "l2", "", "", "", "star", "", "", "", "l2", "", "", "w3"],
    ["", "", "l2", "", "", "", "l2", "", "l2", "", "", "", "l2", "", ""],
    ["", "l3", "", "", "", "l3", "", "", "", "l3", "", "", "", "l3", ""],
    ["", "", "", "", "w2", "", "", "", "", "", "w2", "", "", "", ""],
    ["l2", "", "", "w2", "", "", "", "l2", "", "", "", "w2", "", "", "l2"],
    ["", "", "w2", "", "", "", "l2", "", "l2", "", "", "", "w2", "", ""],
    ["", "w2", "", "", "", "l3", "", "", "", "l3", "", "", "", "w2", ""],
    ["w3", "", "", "l2", "", "", "", "w3", "", "", "", "l2", "", "", "w3"]
];

var styleMapping = {
    w2: "background: rgba(254, 112, 77, 0.4);",
    w3: "background: #fe704d;",
    l2: "background: rgba(4, 147, 181, 0.4);",
    l3: "background: #0493b5;",
    star: "background-color: #d4ccaf;" +
        "background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"%3E%3Cpath fill=\"%23b1a26d\" d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/%3E%3C/svg%3E');" +
        "background-size: cover;"
};

// game board set up
function setUp() {
    const table = document.createElement("table");
    table.classList.add("board");

    // implement board
    board.forEach(function (rowData) {
        var row = document.createElement("tr");
        rowData.forEach(function (cellData) {
            var cell = document.createElement("td");
            if (cellData) {
                cell.style.cssText = styleMapping[cellData];
            }
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    const boardBox = document.querySelector(".board-container");
    boardBox.appendChild(table);

    makeTilesDraggable();
    enableCells();
}

setUp();

// Tile pool setup
const tiles = [
    { letter: "A", value: 1, quantity: 9 },
    { letter: "B", value: 3, quantity: 2 },
    { letter: "C", value: 3, quantity: 2 },
    { letter: "D", value: 2, quantity: 4 },
    { letter: "E", value: 1, quantity: 12 },
    { letter: "F", value: 4, quantity: 2 },
    { letter: "G", value: 2, quantity: 3 },
    { letter: "H", value: 4, quantity: 2 },
    { letter: "I", value: 1, quantity: 9 },
    { letter: "J", value: 8, quantity: 1 },
    { letter: "K", value: 5, quantity: 1 },
    { letter: "L", value: 1, quantity: 4 },
    { letter: "M", value: 3, quantity: 2 },
    { letter: "N", value: 1, quantity: 6 },
    { letter: "O", value: 1, quantity: 8 },
    { letter: "P", value: 3, quantity: 2 },
    { letter: "Q", value: 10, quantity: 1 },
    { letter: "R", value: 1, quantity: 6 },
    { letter: "S", value: 1, quantity: 4 },
    { letter: "T", value: 1, quantity: 6 },
    { letter: "U", value: 1, quantity: 4 },
    { letter: "V", value: 4, quantity: 2 },
    { letter: "W", value: 4, quantity: 2 },
    { letter: "X", value: 8, quantity: 1 },
    { letter: "Y", value: 4, quantity: 2 },
    { letter: "Z", value: 10, quantity: 1 },
    { letter: "", value: 0, quantity: 2 }
];

const tilePool = [];
tiles.forEach(function (tile) {
    for (var i = 0; i < tile.quantity; i++) {
        tilePool.push({ letter: tile.letter, value: tile.value });
    }
});


// get random tiles ranging from a-""
function getRandomTile() {
    const randomIndex = Math.floor(Math.random() * tilePool.length);
    return tilePool.splice(randomIndex, 1)[0];
}

const tileElements = document.querySelectorAll(".rack .tile");

// get random tiles
tileElements.forEach(function (tileElement) {
    var randomTile = getRandomTile();
    tileElement.setAttribute("data-id", randomTile.letter + randomTile.value);
    tileElement.setAttribute("letter", randomTile.letter);
    tileElement.setAttribute("value", randomTile.value);
    tileElement.textContent = randomTile.letter;
});



// being able to drag tiles
function makeTilesDraggable() {
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach(function (tile, index) {
        tile.setAttribute("draggable", gameStarted);
        tile.setAttribute("data-id", index);
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragend", dragEnd);
        //tile.addEventListener("click", function () {
        //    selectTile(tile);
        //});
    });

}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.getAttribute("data-id"));
    event.dataTransfer.effectAllowed = "move";
    setTimeout(function () {
        event.target.style.display = "none";
    }, 0);
}

function dragEnd(event) {
    event.target.style.display = "block";
    if (!document.querySelector(".board").contains(event.target)) {
        moveTileToRack(event.target);
    }
}

// enable cells to accept drops
function enableCells() {
    const cells = document.querySelectorAll(".board td");
    cells.forEach(function (cell) {
        cell.addEventListener("dragover", dragOver);
        cell.addEventListener("drop", drop);
        cell.addEventListener("dragleave", dragLeave);
    });

}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    event.target.classList.add("cell-hover");
}

function dragLeave(event) {
    event.target.classList.remove("cell-hover");
}

// Modify the drop function to include placement rules
function drop(event) {
    event.preventDefault();
    const tileId = event.dataTransfer.getData("text/plain");
    var tile = document.querySelector('.tile[data-id="' + tileId + '"]');
    const targetCell = event.target;

    // Ensure the target is a cell (td)
    if (targetCell.tagName === "TD") {
        const targetCoords = getCellCoordinates(targetCell);

        if (canPlaceTile(targetCoords.x, targetCoords.y)) {
            if (targetCell.classList.contains("cell-occupied")) {
                moveTileToRack(tile);
                return;
            }

            const previousCell = tile.closest("td");
            if (previousCell) {
                previousCell.classList.remove("cell-occupied");
                previousCell.removeChild(tile);
            }

            targetCell.appendChild(tile);
            tile.style.display = "block";
            tile.style.position = "absolute";
            tile.style.top = "0";
            tile.style.left = "0";
            targetCell.classList.add("cell-occupied");
            tile.classList.add("tile-occupier");
            tile.classList.remove("tile-free");
            tile.classList.add("tile-activeWord");
            tile.setAttribute("draggable", false);
        } else {
            moveTileToRack(tile);
        }
    } else {
        moveTileToRack(tile);
    }
}
function moveTileToRack(tile) {
    const rack = document.querySelector(".rack");
    if (!rack) {
        console.error("Rack not found.");
        return;
    }

    const rackItems = rack.querySelectorAll(".rack-items");
    var emptyRackItem = Array.from(rackItems).find(function (item) {
        return !item.querySelector(".tile");
    });


    if (emptyRackItem) {
        emptyRackItem.appendChild(tile);
        tile.style.display = "block";
        tile.classList.remove("tile-occupier");
        tile.classList.add("tile-free");
        tile.setAttribute("draggable", true);
        tile.style.top = "0";
        tile.style.left = "0";
    }
}

var sec = 30;
function timer() {
    var timer = setInterval(function () {
        document.getElementById("timer").innerHTML = "00:" + (sec < 10 ? "0" : "") + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "00:00";
            endGame();
        }
    }, 1000);
}

function endGame() {
    const scoreElement = document.querySelector(".point");
    const score = parseInt(scoreElement.textContent, 10);

    // Clear the board and show the message
    const board = document.querySelector(".board");
    board.innerHTML = "";

    var message = score > 200 ? "YOU WIN" : "YOU LOSE";
    var messageContainer = document.createElement("div");
    messageContainer.className = "message-container";
    messageContainer.innerHTML =
        '<p>' + message + '</p>' +
        '<div class="button-style button-container" id="restartBtn">' +
        '<div class="circle"></div>' +
        '<p>Restart</p>' +
        '</div>' +
        '<form id="scoreReportForm" class="score-report-form">' +
        '<label for="playerName">Player Name:</label>' +
        '<input type="text" id="playerName" name="playerName" required>' +

        '<label for="rating">Rating (1-5 stars):</label>' +
        '<select id="rating" name="rating" required>' +
        '<option value="" disabled selected>Select Rating</option>' +
        '<option value="1">1 Star</option>' +
        '<option value="2">2 Stars</option>' +
        '<option value="3">3 Stars</option>' +
        '<option value="4">4 Stars</option>' +
        '<option value="5">5 Stars</option>' +
        '</select>' +

        '<label for="feedback">Feedback Comments:</label>' +
        '<textarea id="feedback" name="feedback" rows="4" required></textarea>' +

        '<label for="suggestions">Suggestions for Improvement:</label>' +
        '<textarea id="suggestions" name="suggestions" rows="4"></textarea>' +

        '<button type="submit" class="button-style">Submit</button>' +
        '</form>';
    board.appendChild(messageContainer);


    // Add event listener to restart button
    document.getElementById("restartBtn").addEventListener("click", function () {
        location.reload(); // Reload the page to restart the game
    });

    // Handle form submission
    document.getElementById("scoreReportForm").addEventListener("submit", function (event) {
        event.preventDefault(); 
        alert("Thank you for your feedback!");
        this.reset();
    });

    console.log(200);
}

const startB = document.getElementById("startBtn");
const shuffleB = document.getElementById("shuffleBtn");
const swapB = document.getElementById("swapBtn");
const submitB = document.getElementById("submitBtn");

// start btn
startB.addEventListener("click", function () {
    gameStarted = true;
    timer();
    makeTilesDraggable();
    enableCells();
});

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function shuffleRack() {
    const rack = document.querySelector(".rack");
    if (!rack) {
        console.error("Rack not found.");
        return;
    }

    // get all rack items
    var rackItems = Array.prototype.slice.call(rack.querySelectorAll(".rack-items"));

    // collect all tiles from rack items
    let allTiles = [];
    rackItems.forEach(function (item) {
        var tiles = Array.prototype.slice.call(item.querySelectorAll(".tile"));
        allTiles = allTiles.concat(tiles);
    });


    // shuffle tiles
    const shuffledTiles = shuffle(allTiles);

    // clear all rack items but not the rack itself
    rackItems.forEach(function (item) {
        item.innerHTML = "";
    });

    // place shuffled tiles bck to rack
    shuffledTiles.forEach(function (tile) {
        var rackItem = rackItems.find(function (item) {
            return !item.querySelector(".tile");
        });
        if (rackItem) {
            rackItem.appendChild(tile);
        }
    });

    makeTilesDraggable();
}

// Shuffle button event listener
shuffleB.addEventListener("click", shuffleRack);

swapB.addEventListener("click", function () {
    for (let i = 1; i <= 7; i++) {
        let randomTile = tiles[Math.floor(Math.random() * tiles.length)];

        var rackSpot = document.querySelector('.rack-items:nth-child(' + i + ')');
        if (rackSpot) {
            rackSpot.innerHTML = '<div class="tile" letter="' + randomTile.letter + '" value="' + randomTile.value + '"></div>';
        }

    }
    makeTilesDraggable();
});

// gameplay
const centerBoard = { x: 7, y: 7 };
// Function to check if a tile can be placed
function canPlaceTile(x, y) {
    var board = document.querySelector(".board");
    var targetCell = board.querySelector('tr:nth-child(' + (y + 1) + ') td:nth-child(' + (x + 1) + ')');

    if (!targetCell) return false; // Check if the target cell is on the board

    // Center cell
    if (x === centerBoard.x && y === centerBoard.y) return true;

    // Check if the center cell or adjacent cells are occupied
    const adjacentCells = [
        { x: centerBoard.x - 1, y: centerBoard.y },
        { x: centerBoard.x + 1, y: centerBoard.y },
        { x: centerBoard.x, y: centerBoard.y - 1 },
        { x: centerBoard.x, y: centerBoard.y + 1 },
    ];

    if (!document.querySelector('tr:nth-child(' + (centerBoard.y + 1) + ') td:nth-child(' + (centerBoard.x + 1) + ')').hasChildNodes()) {
        return adjacentCells.some(function (cell) {
            var cellElement = board.querySelector('tr:nth-child(' + (cell.y + 1) + ') td:nth-child(' + (cell.x + 1) + ')');
            return cellElement && cellElement.hasChildNodes();
        });
    }


    const neighbors = [
        { x: x - 1, y: y },
        { x: x + 1, y: y },
        { x: x, y: y - 1 },
        { x: x, y: y + 1 }
    ];

    return neighbors.some(function (cell) {
        var cellElement = board.querySelector('tr:nth-child(' + (cell.y + 1) + ') td:nth-child(' + (cell.x + 1) + ')');
        return cellElement && cellElement.hasChildNodes();
    });

}

function getCellCoordinates(cell) {
    const rowIndex = Array.from(cell.parentNode.parentNode.children).indexOf(cell.parentNode);
    const colIndex = Array.from(cell.parentNode.children).indexOf(cell);
    return { x: colIndex, y: rowIndex };
}

function getLetterValue(letter) {
    var tile = tiles.find(function (tile) {
        return tile.letter === letter.toUpperCase();
    });
    return tile ? tile.value : 0;
}


// Function to identify tiles on the board
function getTilesOnBoard() {
    const tiles = [];
    document.querySelectorAll(".board-container td.cell-occupied").forEach(function (cell) {
        tiles.push({
            letter: cell.textContent.trim().toUpperCase(),
            value: getLetterValue(cell.textContent.trim().toUpperCase()),
            x: parseInt(cell.getAttribute("data-x"), 10),
            y: parseInt(cell.getAttribute("data-y"), 10)
        });
    });

    return tiles;
}

function getWordsFromTiles(tiles) {
    const words = [];
    // to track and avoid duplications
    const seenWords = new Set(); 

    function addWord(word, tiles) {
        if (word.length > 0 && !seenWords.has(word)) {
            words.push({
                word,
                tiles
            });
            seenWords.add(word);
        }
    }

    // horizontal check - sort by row then col
    tiles.sort(function (a, b) {
        if (a.y !== b.y) {
            return a.y - b.y;
        }
        return a.x - b.x;
    });

    let currentWord = "";
    let currentTiles = [];
    let lastY = -1;
    tiles.forEach(function (tile) {
        if (currentWord.length > 0 && tile.y !== lastY) {
            // end of horizontal
            addWord(currentWord, currentTiles);
            currentWord = "";
            currentTiles = [];
        }
        currentWord += tile.letter;
        currentTiles.push(tile);
        lastY = tile.y;
    });

    if (currentWord.length > 0) {
        // end of last horizontal word
        addWord(currentWord, currentTiles);
    }

    currentWord = "";
    currentTiles = [];
    let lastX = -1;
    // vertical check - sort by col then row
    tiles.sort(function (a, b) {
        if (a.x !== b.x) {
            return a.x - b.x;
        }
        return a.y - b.y;
    });

    tiles.forEach(function (tile) {
        if (currentWord.length > 0 && tile.x !== lastX) {
            // end of vertical 
            addWord(currentWord, currentTiles);
            currentWord = "";
            currentTiles = [];
        }
        currentWord += tile.letter;
        currentTiles.push(tile);
        lastX = tile.x;
    });

    if (currentWord.length > 0) {
        // end of last vertical word
        addWord(currentWord, currentTiles);
    }

    return words;
}

function updatePointsAndWords() {
    // get tiles on board
    const tiles = getTilesOnBoard(); 
    // get words from tiles
    const words = getWordsFromTiles(tiles); 
    const wordPoints = [];

    words.forEach(function (item) {
        var word = item.word;
        var tiles = item.tiles;
        var wordValue = 0;
        var multiplier = 1;

        tiles.forEach(function (tile) {
            var letterValue = getLetterValue(tile.letter);
            wordValue += letterValue;
            // multiplier
            if (tile.special === "w2") multiplier *= 2;
            if (tile.special === "w3") multiplier *= 3;
            if (tile.special === "l2") wordValue += letterValue;
            if (tile.special === "l3") wordValue += 2 * letterValue;
        });

        wordPoints.push({
            word: word,
            value: wordValue * multiplier
        });
    });
    words.forEach(function (item) {
        var word = item.word;
        var tiles = item.tiles;
        var wordValue = 0;
        var multiplier = 1;

        tiles.forEach(function (tile) {
            var letterValue = getLetterValue(tile.letter);
            wordValue += letterValue;
            // multiplier
            if (tile.special === "w2") multiplier *= 2;
            if (tile.special === "w3") multiplier *= 3;
            if (tile.special === "l2") wordValue += letterValue;
            if (tile.special === "l3") wordValue += 2 * letterValue;
        });

        wordPoints.push({
            word: word,
            value: wordValue * multiplier
        });
    });


    var totalScore = wordPoints.reduce(function (total, wordPoint) {
        return total + wordPoint.value;
    }, 0);

    var scoreElement = document.querySelector(".point");
    scoreElement.textContent = totalScore;

}

submitB.addEventListener("click", function () {
    updatePointsAndWords();
});