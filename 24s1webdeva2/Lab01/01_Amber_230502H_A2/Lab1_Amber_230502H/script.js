// JavaScript source code

/* Global variables */
const mobile = window.innerWidth <= 800;
var gameCtrlEvent, dragEvent, dragendEvent;
var colourNow = "purple"; //"pink" "blue"
if (mobile) {
    document.querySelector("h3+ul").classList.add("collapsed");
    gameCtrlEvent = dragendEvent = "touchend";
    dragEvent = "touchmove";
}
else {
    gameCtrlEvent = "keyup";
    dragEvent = "drag";
    dragendEvent = "dragend";
}
var mouseoverEvent;
if (mobile)
    mouseoverEvent = "touchstart";
else
    mouseoverEvent = "mouseover";
const settingsbtn = document.querySelector("#settings img");
settingsbtn.setAttribute("draggable", false);
const soundCtrl = document.querySelector("#soundCtrl");
const screenCtrl = document.querySelector("#screenCtrl");
const canFull = document.documentElement.requestFullscreen;

const colourables = document.querySelectorAll(".colourable");
//Setting up things for form
for (let colourable of colourables) {
    colourable.classList.add(colourNow);
}
const colourInputs = document.querySelectorAll("#theme input");
const bgm = document.querySelector("#bgm");
bgm.loop = true;
bgm.muted = false;

const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");
//JS for home button
const homeButton = document.querySelector("footer>button");
//JS for hamMenu
const hamBtn = document.querySelector("#hamIcon");
//Pg 0
const styledBtns = document.querySelectorAll("button");
//Page 1 variables
const sections = allpages[1].querySelectorAll("h3");
//Page 3 variables
const dimension = 4;
const board = document.querySelector("#board");
const cells = document.querySelectorAll(".cell");
var lefts = [];
var tops = [];
var size;
var gameOverTO;
var count = 0;
const replayBtn = allpages[3].querySelector("button");
var dir = [0, 0];
var fingerX, fingerY;

for (var row = 1; row <= 4; row++) {
    for (var col = 1; col <= 4; col++) {
        cells[count].style.gridArea = row + "/" + col + "/" + (row + 1) + "/" + (col + 1);
        count++;
    }
}
class block {
    constructor(element, x, y, value) {
        this.element = element;
        element.addEventListener("transitionstart", disableKeyboard);
        element.addEventListener("transitionend", updateBlock);
        this.x = x;
        this.y = y;
        this.currX = x;
        this.currY = y;
        this.value = value;
        this.currValue = value;
    }
    setPos(dirX, dirY) {
        if (dirX > 0)
            this.x = Math.min(this.x + dirX, dimension - 1);
        else if (dirX < 0)
            this.x = Math.max(0, this.x + dirX);
        if (dirY > 0)
            this.y = Math.min(this.y + dirY, dimension - 1);
        else if (dirY < 0)
            this.y = Math.max(0, this.y + dirY);
    }
    move() {
        this.element.style.left = lefts[this.x] + "px";
        this.element.style.top = tops[this.y] + "px";
        this.currX = this.x;
        this.currY = this.y;
    }
    selfSize() {
        this.element.style.height =
            this.element.style.width = size + "px";
        this.element.style.left = lefts[this.currX] + "px";
        this.element.style.top = tops[this.currY] + "px";
    }
}
var blocks = [];

//page 2
const stainSize = 5;
const overlay = document.querySelector("#stainOverlay");
const equips = document.querySelectorAll(".equip");
const equipCells = document.querySelectorAll(".equipCell");
var step = 0;
const clouds = document.querySelectorAll(".cloud");
for (var i = 0; i < clouds.length; i++) {
    var cloud = clouds[i];
    cloud.style.gridArea = "2/" + (i + 2) + "/3/" + (i + 3);
    cloud.style.animationName = "cloud" + i;
}
for (let img of allpages[2].querySelectorAll("img")) {
    img.setAttribute("draggable", (img.classList.contains("equip")));
}
for (var row = 0; row < 100 / stainSize; row++) {
    for (var col = 0; col < 100 / stainSize; col++) {
        if (row >= 30 / stainSize && col != 50 / stainSize)
            continue;
        var stain = document.createElement("div");
        stain.classList.add("particle");
        stain.classList.add("particle");
        stain.style.backgroundColor = "saddlebrown";
        stain.style.left = (col * stainSize) + "%";
        stain.style.top = (row * stainSize) + "%";
        overlay.appendChild(stain);
    }
}
for (let equip of equips) {
    equip.addEventListener(dragEvent, followMouse);
    equip.addEventListener("animationstart", function (e) {
        e.target.removeEventListener("dragstart", followMouse);
    });
    equip.addEventListener("animationend", function () {
        step++;
    });
    equip.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.setDragImage(e.target, window.outerWidth, window.outerHeight);
    });
    equip.addEventListener(dragendEvent, equipDragEnd);
}
/* End global variables */

/* Event listeners */
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
homeButton.addEventListener("click", function () {
    show(0);
});

hamBtn.addEventListener("click", function () {
    document.querySelector("h3+ul").classList.toggle("collapsed");
    document.querySelector("h3+ul").classList.toggle("collapsable");
});

//Page 1 listeners
for (let section of sections) {
    //Make collapsable
    section.addEventListener("click", function () {
        section.nextElementSibling.classList.toggle("collapsed");
    });
}

for (let btn of styledBtns) {
    btn.addEventListener(mouseoverEvent, function (e) {
        e.target.classList.add("buttonClick");
    });
    btn.addEventListener("click", function (e) {
        e.target.classList.remove("buttonClick");
    });
    if(!mobile){
        btn.addEventListener("mouseleave", function (e) {
            e.target.classList.remove("buttonClick");
        });
    }
}
//settings listeners
settingsbtn.addEventListener("click", function () {
    document.querySelector("#options").classList.toggle("collapsed");
    document.querySelector("#options").classList.toggle("collapsable");
});
for (let input of colourInputs)
    input.addEventListener("change", changeTheme);
soundCtrl.addEventListener("click", function () {
    var src, alt;
    if (!bgm.paused) {
        bgm.pause();
        src = "image/mute.png";
        alt = "muted";
    }
    else {
        bgm.play();
        src = "image/unmute.png";
        alt = "unmuted";
    }
    soundCtrl.src = src;
    soundCtrl.alt = alt;
});
screenCtrl.addEventListener("click", function () {
    var src, alt;
    if (document.fullscreenElement || document.mozFullScreenElement ||
        document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreen();
        src = "image/minimise.png";
        alt = "minimised";
    }
    else {
        enterFullscreen();
        src = "image/maximise.png";
        alt = "maximised";
    }
    screenCtrl.src = src;
    screenCtrl.alt = alt;
});
replayBtn.addEventListener("click", function () {
    enableKeyboard();
    resetGame();
});
/* End event listeners */

show(0);

//functions
//show/hide elements with correct display (flex, block)
function showHide(element, forceHide = false, forceShow = false) {
    if (forceHide) {
        if (element.classList.contains("showBlock")) {
            element.classList.remove("showBlock");
            if (!element.classList.contains("hideBlock"))
                element.classList.add("hideBlock");
        }
        else if (element.classList.contains("showFlex")) {
            element.classList.remove("showFlex");
            if (!element.classList.contains("hideFlex"))
                element.classList.add("hideFlex");
        }
    }
    else if (forceShow) {
        if (element.classList.contains("hideBlock")) {
            element.classList.remove("hideBlock");
            if (!element.classList.contains("showBlock"))
                element.classList.add("showBlock");
        }
        else if (element.classList.contains("hideFlex")) {
            element.classList.remove("hideFlex");
            if (!element.classList.contains("showFlex"))
                element.classList.add("showFlex");
        }
    }
    else {
        if (element.classList.contains("showBlock") || element.classList.contains("hideBlock")) {
            element.classList.toggle("showBlock");
            element.classList.toggle("hideBlock");
        }
        else if (element.classList.contains("showFlex") || element.classList.contains("hideFlex")) {
            element.classList.toggle("showFlex");
            element.classList.toggle("hideFlex");
        }
    }
}
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        showHide(onepage, true);
    }
    resetPg1();
    resetPg3();
    resetPg2();
}
function show(pgno) { //function to show selected page no
    hideall();
    //move the title to the header
    var title = document.querySelector("#title");
    if (pgno != 0) {
        document.querySelector("#page0").removeChild(title);
        document.querySelector("header").appendChild(title);
        if (!document.querySelector("#pagecontainer").classList.contains("autoMargin"))
            document.querySelector("#pagecontainer").classList.add("autoMargin");
    }
    else {
        document.querySelector("header").removeChild(title);
        document.querySelector("#page0").insertBefore(title, document.querySelector("h2"));
        if (document.querySelector("#pagecontainer").classList.contains("autoMargin"))
            document.querySelector("#pagecontainer").classList.remove("autoMargin");
    }
    showHide(document.querySelector("header"));
    showHide(document.querySelector("footer"));
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    //show the page
    showHide(onepage);

    //setup the page
    if (pgno == 1) {
        alignPg1();
        window.addEventListener("resize", alignPg1);
    }
    else if (pgno == 3) {
        sizePg3();
        window.addEventListener("resize", sizePg3);
        enableKeyboard();
        startTO();
    }
    else if (pgno == 2) {
        sizeAlignPg2();
        window.addEventListener("resize", sizeAlignPg2);
    }
}

function alignPg1() {
    for (let section of sections) {
        var divEle = section.nextElementSibling;
        var pEles = divEle.querySelectorAll("p");
        pEles[0].style.height = pEles[1].style.height = "unset";
        pEles[0].style.height = pEles[1].style.height =
            Math.max(pEles[0].offsetHeight, pEles[1].offsetHeight) + "px";
    }
}
function resetPg1() {
    //uncollapse everything
    for (let section of allpages[1].querySelectorAll("h3")) {
        section.nextElementSibling.classList.remove("collapsed");
        showHide(section.nextElementSibling, false, true);
    }
    //remove unneeded listener
    window.removeEventListener("resize", alignPg1);
}

function sizePg3() {
    size = cells[0].getBoundingClientRect().height;
    for (var col = 0, row = (dimension - 1) * dimension;
        col < dimension; col++, row -= dimension) {
        var rect = cells[col].getBoundingClientRect();
        lefts[col] = rect.left;
        rect = cells[row].getBoundingClientRect();
        tops[col] = rect.top;
    }
    for (let b of blocks)
        b.selfSize();
}
function resetPg3() {
    //remove unneeded listener
    window.removeEventListener("resize", sizePg3);
    //reset game variavles and clear winlose checker
    dir = [0, 0];
    clearTimeout(gameOverTO);
    resetGame();
}
function updateBlock(e) {
    //find the block
    for (let b of blocks) {
        if (e.target == b.element) {
            //check for merging
            if (b.currValue != b.value) {
                b.currValue = b.value;
                //update the image
                var img = b.element.querySelector("img");
                img.src = "image/" + Math.min(b.currValue, 2048) + ".jpg";
                img.alt = "value " + b.currValue;

                for (let otherB of blocks) {
                    if (otherB != b && otherB.x == b.x &&
                        otherB.y == b.y && otherB.value < b.value) {
                        b.element.style.zIndex = "unset";
                    }
                }
            }
            enableKeyboard();
        }
    }

    var del = document.querySelectorAll(".deleteBlock");
    for (var i = del.length - 1; i >= 0; i--) {
        for (let b of blocks) {
            if (b.element == del[i])
                blocks = blocks.filter(function (thing) {
                    return thing != b;
                });
        }
        del[i].remove();
    }
}
function startTO() {
    gameOverTO = setTimeout(gameWinLose, 1);
}
function gameWinLose() {
    //check for game over
    //are all cells filled? or is there a 2048?
    var win = false;
    for (let b of blocks) {
        if (b.value >= 2048) {
            win = true;
            break;
        }
    }

    var lose = (blocks.length >= dimension * dimension) && (document.querySelectorAll(".deleteBlock").length == 0) && !win;
    if (lose) {
        //do any blocks have adjacent identical values?
        for (let b of blocks) {
            if (b.currValue >= 2048) {
                win = true;
                break;
            }
            for (let otherB of blocks) {
                if (b == otherB)
                    continue;
                if (b.value == otherB.value &&
                    ((Math.abs(b.x - otherB.x) == 1 && otherB.y == b.y) ||
                        (Math.abs(b.y - otherB.y) == 1 && otherB.x == b.x))) {
                    lose = false;
                    break;
                }
            }
        }
    }

    if (lose || win) {
        disableKeyboard();
        var goScreen = document.querySelector("#gameOver");
        var goTxt = goScreen.querySelector("h3");
        goScreen.classList.remove("hideGameOver");
        goScreen.classList.add("showGameOver");
        if (lose) {
            goTxt.style.color = "rgb(255,0,0)";
            goTxt.innerHTML = "Game Over";
        }
        else {
            goTxt.style.color = "rgb(0,255,0)";
            goTxt.innerHTML = "Game Win";
        }
    }

    setTimeout(gameWinLose, 1);
}

//Game
function disableKeyboard() {
    if (mobile) {
        board.removeEventListener("touchstart", getFingerStart);
        board.removeEventListener(gameCtrlEvent, onInput);
    }
    else
        document.removeEventListener(gameCtrlEvent, onInput);
}
function enableKeyboard() {
    if (mobile) {
        board.addEventListener("touchstart", getFingerStart, true);
        board.addEventListener(gameCtrlEvent, onInput, true);
    }
    else
        document.addEventListener(gameCtrlEvent, onInput);
}
function getFingerStart(e) {
    fingerX = e.touches[0].clientX;
    fingerY = e.touches[0].clientY;
}
function createBlock(value, x, y) {
    var ele = document.createElement("div");
    ele.style.left = lefts[x] + "px";
    ele.style.top = tops[y] + "px";
    ele.classList.add("block");
    var img = document.createElement("img");
    img.src = "image/" + Math.min(value, 2048) + ".jpg";
    img.alt = "value " + value;
    ele.appendChild(img);
    allpages[3].appendChild(ele);
    blocks.push(new block(ele, x, y, value));
    ele.style.height = ele.style.width = size + "px";
}
function onInput(e) {
    //get input direction
    dir = handleInput(e);
    if (dir == [0, 0])
        return;

    //check if cannot move
    var stuck = true;
    for (let b of blocks) {
        if (b.x + dir[0] < 0 || b.x + dir[0] >= dimension || b.y + dir[1] < 0 || b.y + dir[1] >= dimension)
            continue;
        var next = blockAt(b.x + dir[0], b.y + dir[1]);
        if (next == null || next.value == b.value) {
            stuck = false;
            break;
        }
    }
    if (stuck)
        return;

    var rowStart, colStart;
    var rowIt = -dir[1];
    var colIt = -dir[0];
    //move right: check row 0 -> 3, col 2 -> 0
    if (dir[0] > 0)
        colStart = dimension - 2;
    //move left: check row 0 -> 3, col 1 -> 3
    else if (dir[0] < 0)
        colStart = 1;
    else {
        colStart = 0;
        colIt = 1;
    }
    //move up: check row 2 -> 0, col 0 -> 3
    if (dir[1] > 0)
        rowStart = dimension - 2;
    //move down: check row 1 -> 3, col 0 -> 3
    else if (dir[1] < 0)
        rowStart = 1;
    else {
        rowStart = 0;
        rowIt = 1;
    }

    //set new positions
    var col = colStart;
    var row = rowStart;
    while (col >= 0 && col < dimension && row >= 0 && row < dimension) {
        if (blockAt(col, row) != null)
            moveBlock(blockAt(col, row));
        row += rowIt;
        if (row < 0 || row >= dimension) {
            row = rowStart;
            col += colIt;
        }
    }
    //move the blocks
    for (let b of blocks)
        b.move();

    //spawn new block at random empty position
    var emptyCells = [];
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            if (blockAt(j, i) == null)
                emptyCells.push([j, i]);
        }
    }
    if (emptyCells.length > 0) {
        var idx = Math.floor(Math.random() * emptyCells.length);
        var newValue = Math.floor(Math.random() * 3) + 1;
        newValue = Math.pow(2, newValue);
        createBlock(newValue, emptyCells[idx][0], emptyCells[idx][1]);
    }
}
function handleInput(e) {
    if (mobile) {
        //touchend event
        var diffX = e.changedTouches[0].clientX - fingerX;
        var diffY = fingerY - e.changedTouches[0].clientY;
        var absX = Math.abs(diffX);
        var absY = Math.abs(diffY);
        //small buffer
        if (absX < 5)
            diffX = 0;
        if (absY < 5)
            diffY = 0;

        if (diffX == 0 && diffY == 0)
            return [0, 0]; //no dir
        else if (absX < absY)
            return [0, diffY / absY]; //vertical if y>x
        else
            return [diffX / absX, 0]; //default to horixontal if x>y || x==y
    }
    else {
        if (e.key == ("ArrowLeft") || e.key == ("a"))
            return [-1, 0];
        else if (e.key == ("ArrowRight") || e.key == ("d"))
            return [1, 0];
        else if (e.key == ("ArrowUp") || e.key == ("w"))
            return [0, 1];
        else if (e.key == ("ArrowDown") || e.key == ("s"))
            return [0, -1];
        else
            return [0, 0];
    }
}
function blockAt(x, y) {
    //want to return greatest value block
    var v = [];
    for (let b of blocks)
        if (b.x == x && b.y == y)
            v.push(b);
    //no blocks at position
    if (v.length < 1)
        return null;
    else {
        var v2 = v[0];
        for (let b of v) {
            if (b.value >= v2.value)
                v2 = b;
        }
        return v2;
    }
}
function moveBlock(block) {
    //keep checking until block at edge or next block cannot merge
    while (block.x + dir[0] >= 0 && block.x + dir[0] < dimension &&
        block.y + dir[1] >= 0 && block.y + dir[1] < dimension) {
        var next = blockAt(block.x + dir[0], block.y + dir[1]);
        //next one is empty --> just move
        if (next == null)
            block.setPos(dir[0], dir[1]);
        //next one not same value --> end
        else if (next.value != block.value)
            break;
        //next one same value --> merge
        else {
            //increase this block's value
            block.value += block.value;
            //set this block to the top most
            block.element.style.zIndex = block.value;
            //mark other block for deletion
            next.element.classList.add("deleteBlock");
            //move it on top of the next block
            block.setPos(dir[0], dir[1]);
        }
    }
}
function startGame() {
    createBlock(2, 0, 1);
    createBlock(2, 1, 1);
}
function resetGame() {
    document.querySelector("#gameOver").classList.remove("showGameOver");
    document.querySelector("#gameOver").classList.add("hideGameOver");
    blocks = [];
    var eles = document.querySelectorAll(".block");
    for (let ele of eles)
        ele.remove();
    startGame();
}

//page 2
//interactable
function resetCleaning() {
    //make the cup dirty again
    for (let p of document.querySelectorAll(".particle"))
    {
        p.style.backgroundColor = "saddlebrown";
        p.style.opacity = 1;
    }

    sizeAlignPg2();
    //hide the "well done" image
    document.querySelector("#star").style.display = "none";

    for (let equip of equips) {
        equip.classList.remove("equipAnim");
    }

    step = 0;
}
function equipDragEnd(e) {
    var rect2 = overlay.getBoundingClientRect();
    var id = e.target.id;
    var last = id[id.length - 1];

    var x, y;
    if (mobile) {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
    }
    else {
        x = e.clientX;
        y = e.clientY;
    }

    var validX = x >= rect2.left && x <= rect2.right; 
    var validY = y >= rect2.top && y <= rect2.bottom; 
    var valid = validY && validX && id == "equip" + step;
    if (step == 2) {
        var cleanedAll = true;
        for (let p of document.querySelectorAll(".particle")) {
            if (p.style.opacity != 0) {
                cleanedAll = false;
                break;
            }
        }
        valid = valid && cleanedAll;
    }

    if (!valid)
        putBack(last);
    else {
        followMouse(e, true);
        e.target.classList.add("equipAnim");
        for (let p of document.querySelectorAll(".particle")) {
            if (last == 0)
                p.style.backgroundColor = "deepskyblue";
            else if (last == 1)
                p.style.backgroundColor = "lightgrey";
            else {
                document.querySelector("#star").style.display = "block";
                break;
            }
        }
    }
}
function followMouse(e, touchend=false) {
    var rect = e.target.getBoundingClientRect();
    var x, y;
    if (mobile) {
        if (touchend) {
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
        }
        else {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        }
    }
    else {
        x = e.pageX;
        y = e.pageY;
    }

    e.target.style.left = x - rect.width * 0.5 + "px";
    e.target.style.top = y - rect.height * 0.5 + "px";

    if (e.target.id == "equip2" && step == 2)
        cleanStain();
}

//collision check between draggable sponge and particles
function cleanStain() {
    var spongeRect = document.querySelector("#equip2").getBoundingClientRect();
    var allowance = Math.max(window.innerWidth, window.innerHeight) * 0.05;
    for (let p of document.querySelectorAll(".particle")) {
        var x = p.getBoundingClientRect().x;
        var y = p.getBoundingClientRect().y;
        var diffX1 = Math.abs(x - spongeRect.x);
        var diffY1 = Math.abs(y - spongeRect.y);
        var diffX2 = Math.abs(x - (spongeRect.x + spongeRect.width));
        var diffY2 = Math.abs(y - (spongeRect.y + spongeRect.height));
        var diffX = Math.min(diffX1, diffX2);
        var diffY = Math.min(diffY1, diffY2);
        if (diffX <= allowance && diffY <= allowance)
            p.style.opacity = 0;
    }
}

//align the position: absolute images
function putBack(numEquip) {
    var equipWidth = equipCells[0].querySelector("img").offsetWidth;
    equips[numEquip].style.left = equipCells[numEquip].querySelector("img").offsetLeft + "px";
    equips[numEquip].style.top = equipCells[numEquip].querySelector("img").offsetTop + "px";
    equips[numEquip].style.width = equipWidth + "px";
}
function sizeAlignPg2() {
    for (var i = 0; i < equips.length; i++) {
        putBack(i);
    }
}
function resetPg2() {
    window.removeEventListener("resize", sizeAlignPg2);
    resetCleaning();
}


//settings
function enterFullscreen() {
    if (!canFull)
        return;
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

function exitFullscreen() {
    if (!canFull)
        return;
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

function changeTheme() {
    var prev = colourNow;
    for (let input of colourInputs) {
        if (input.checked) {
            colourNow = input.value;
            break;
        }
    }
    for (let colourable of colourables) {
        colourable.classList.remove(prev);
        colourable.classList.add(colourNow);
    }
}