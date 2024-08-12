
//Page Switcher
//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var pageTurnSound = document.querySelector("#pageTurnSound");
var allpages = document.querySelectorAll(".page");
//select all subtopic pages
//console.log(allpages);
//Hide all pages once
hideall();
show(1);
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        //onepage.style.display = "none"; //hide it
        onepage.classList.remove("active");
    }
}
function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    //show the page
    //onepage.style.display = "block";
    onepage.classList.add("active");
    //console.log("run");
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
    pageTurnSound.play();
});
page2btn.addEventListener("click", function () {
    show(2);
    pageTurnSound.play();
});
page3btn.addEventListener("click", function () {
    show(3);
    pageTurnSound.play();
});

const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);

/*Used to toggle the menu*/
const menuItemsList = document.querySelector("nav ul");
function toggleMenus() { /*open and close menu*/
    // if (menuItemsList.style.display == "flex")
    //     menuItemsList.style.display = "none";
    // else menuItemsList.style.display = "flex";

    //Toggle the classlist between active and inactive
    menuItemsList.classList.toggle("active");
}


/*Card flipping*/
// Select all elements with the class 'card-container'
var allcards = document.querySelectorAll(".card-container");

for (let onecard of allcards) {
    const tempcard = onecard;
    tempcard.addEventListener("click", function () {
        tempcard.classList.toggle('flipped');
    });
}

/*Scroll Animations */
const blockReveals = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        //Reveal the things that are hidden
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
        //Hide the things that are supposed to be hidden when not in view
        else {
            entry.target.classList.remove('reveal');
        }

    });
}, {
    threshold: [0.5, 0]
});
//
for (let i = 0; i < blockReveals.length; i++) {
    const element = blockReveals[i];

    observer.observe(element);
}


//Canvas drawing
//Get the canvas, color selector elements
var canvas = document.querySelector("#canvas");
//Drawing sfx
var drawingSound = document.getElementById('drawingSound');
//pen settings
var colorSetting = document.querySelector("#penColor");
var penWidthSetting = document.querySelector("#penWidth");
var clearCanvasBtn = document.querySelector("#clear");
var undoCanvasBtn = document.querySelector("#undo");
var downloadBtn = document.querySelector('#download-canvas');

//var heightRatio = 0.45;
//canvas.height = canvas.width * heightRatio;
canvas.height = 450;
canvas.width = 1000;

//Get the rendering context of the canvas
var ctx = canvas.getContext("2d", { willReadFrequently: true });
//Let the drawing space in the canvas be white colored
ctx.fillStyle = "white";
//Fill the rect given the space of the canvas
ctx.fillRect(0, 0, canvas.width, canvas.height);

//Pen settings
var pen_color = "black";
var pen_width = "0.1";
var isdrawing = false;

//Array for undo command
var undo_array = [];
//Variable to keep track of the undo index
var undo_index = -1;

//For mouse
canvas.addEventListener("mousedown", prepareToDraw);
canvas.addEventListener("mousemove", startDrawing);
//Add event listeners to stop drawing when the user stops pressing on mouse or mouse is outside of canvas
canvas.addEventListener("mouseup", stopDrawing);
//Add new image data for the undo array
canvas.addEventListener("mouseup", addNewImageData);

//Stop drawing when outside canvas
canvas.addEventListener("mouseout", stopDrawing);

//For drag on mobi;e
canvas.addEventListener("touchstart", prepareToTouchDraw);
canvas.addEventListener("touchmove", startTouchDrawing);
//Add event listeners to stop drawing when the user stops pressing on mouse or mouse is outside of canvas
canvas.addEventListener("touchend", stopDrawing);
//Add new image data for the undo array
canvas.addEventListener("touchend", addNewImageData);
canvas.addEventListener("touchcancel", stopDrawing);
canvas.addEventListener("touchcancel", addNewImageData);


//Change pen color
colorSetting.addEventListener("change", changeColor);
penWidthSetting.addEventListener("change", changeWidth);
//Canvas buttons
clearCanvasBtn.addEventListener("click", clearCanvas);
undoCanvasBtn.addEventListener("click", undoCanvasState);
downloadBtn.addEventListener("click", downloadImage);

//Get the true mouse Pos on the canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    };
}

function getTouchPos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

    return {
        x: (evt.touches[0].clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.touches[0].clientY - rect.top) * scaleY     // been adjusted to be relative to element
    };
}

//Function to call when changing colors
function changeColor() {
    pen_color = colorSetting.value;
}

//function to call to change width
function changeWidth() {
    pen_width = penWidthSetting.value;
}

//Function that is called when the mouse is down and user wants to draw
function prepareToDraw(event) {
    isdrawing = true;
    //Start drawing sfx
    drawingSound.play();
    drawingSound.loop = true;
    ctx.beginPath();
    var mousePos = getMousePos(canvas, event);
    //Set the context to correct position 
    ctx.moveTo(mousePos.x,
        mousePos.y
    );
    //Prevent any default event actions from occuring
    event.preventDefault();
}
//touch ver
function prepareToTouchDraw(event) {
    isdrawing = true;
    //Start drawing sfx
    drawingSound.play();
    drawingSound.loop = true;
    ctx.beginPath();
    var mousePos = getTouchPos(canvas, event);
    //Set the context to correct position 
    ctx.moveTo(mousePos.x,
        mousePos.y
    );

    //Prevent any default event actions from occuring
    event.preventDefault();
}

//Function to draw graphics on screen
function startDrawing(event) {

    if (isdrawing) {
        var mousePos = getMousePos(canvas, event);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.strokeStyle = pen_color;
        ctx.lineWidth = pen_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }

    //Prevent any default event actions from occuring
    event.preventDefault();
}
//Touch ver
function startTouchDrawing(event) {

    if (isdrawing) {
        var mousePos = getTouchPos(canvas, event);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.strokeStyle = pen_color;
        ctx.lineWidth = pen_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }

    //Prevent any default event actions from occuring
    event.preventDefault();
}

function stopDrawing(event) {
    if (isdrawing) {
        ctx.stroke();
        //Close the path and set is drawing to false to stop drawing
        ctx.closePath();
        isdrawing = false;
        drawingSound.pause();
        drawingSound.currentTime = 0;
    }
    //Prevent any default event actions from occuring
    event.preventDefault();
}

function addNewImageData() {
    //Save the image data
    undo_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    undo_index += 1;
}

function clearCanvas() {
    ctx.fillStyle = "white";
    //Clear what was previously drawn
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Fill it back with white
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Empty the array storing the canvas states
    undo_array = [];
    //Reset index
    undo_index = -1;
}

function undoCanvasState() {
    //If the canvas only was changed once
    if (undo_index <= 0) {
        clearCanvas();
    }
    //If it was done changed more than one time
    else {
        undo_index -= 1;
        undo_array.pop();
        ctx.putImageData(undo_array[undo_index], 0, 0);
    }
}

//Download canvas
function downloadImage() {
    // Convert the canvas into a data URL
    let canvasUrl = canvas.toDataURL();
    // Create an anchor, and set the href value to the URL
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;

    // This is the name of our downloaded file
    createEl.download = "canvas-image";

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
}

/*Product Recommender */
class Product {
    constructor(image, name, price, type, desc) {
        this.image = image;
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.type = type;
    }
}

//Product list to show recommendations
var productList = document.querySelector("#product-list");
var highestPrice = document.querySelector("#highest-price");
var lowestPrice = document.querySelector("#lowest-price");
var itemtype = document.querySelector("#item-type");

highestPrice.addEventListener("change", evaluateRecommendations);
lowestPrice.addEventListener("change", evaluateRecommendations);
itemtype.addEventListener("change", evaluateRecommendations);

highestPrice.addEventListener("change", scrollToRec);
lowestPrice.addEventListener("change", scrollToRec);
itemtype.addEventListener("change", scrollToRec);


var products = [];
//Push in clip studio
products.push(new Product("images/ClipStudioPaint.jpg",
    "Clip Studio", 140, "software", "A premium drawing software"));
products.push(new Product("images/Medibang.png",
    "Medibang", 0, "software", "A free drawing software"));
products.push(new Product("images/Krita.png",
    "Krita", 0, "software", "A free drawing software"));
products.push(new Product("images/HuionKamvas16Pro.jpg",
    "Huion Kamvas 16 Pro", 899, "tablet", "A premium value tablet"));
products.push(new Product("images/WacomIntuos.jpg",
    "Intuos Pro", 550, "tablet", "High Quality No-Screen tablet made by Wacom"));
products.push(new Product("images/IntuosS.jpg",
    "Intuos Small", 100, "tablet", "No-Screen tablet made by Wacom"));
products.push(new Product("images/Paperlike.jpg",
    "PaperLike", 50, "accessory", "Matte Screen Protector"));
products.push(new Product("images/DrawingGlove.jpg",
    "Drawing Glove", 20, "accessory", "A glove to prevent smudges on an LCD tablet"));
evaluateRecommendations();

function createNewRecommendation(product) {
    //Create a new container for the recommendation
    const recBox = document.createElement("div");
    recBox.classList.add("box--center");
    recBox.classList.add("shadow");
    recBox.classList.add("hidden");
    recBox.classList.add("reveal");

    const heading = document.createElement("h2");
    heading.appendChild(document.createTextNode("Recommended Product"));

    //Create the image
    const img = document.createElement("img");
    img.src = product.image;

    //Create the name
    const name = document.createElement("h2");
    name.appendChild(document.createTextNode(product.name));

    //Create the price
    const price = document.createElement("h3");
    price.appendChild(document.createTextNode("$" + product.price));

    //create description
    const desc = document.createElement("p");
    desc.appendChild(document.createTextNode(product.desc));

    //Append them all to the box
    recBox.appendChild(heading);
    recBox.appendChild(img);
    recBox.appendChild(name);
    recBox.appendChild(price);
    recBox.appendChild(desc);

    //Append it to the product list
    productList.appendChild(recBox);
}

function clearRecommendations() {
    productList.innerHTML = "";
}

function evaluateRecommendations() {
    clearRecommendations();
    for (let product of products) {
        let tempProduct = product;
        //Check if the product is of the same specified type else continue
        if (tempProduct.type != itemtype.value)
            continue;
        //If the product is less than the highest price
        if (tempProduct.price <= highestPrice.value && tempProduct.price >= lowestPrice.value) {
            createNewRecommendation(tempProduct);
        }
    }

    //Tell the user that there are no recommendations available
    if (productList.innerHTML == "") {
        const heading = document.createElement("h2");
        heading.appendChild(document.createTextNode("No Recommendations"));
        productList.appendChild(heading);
    }
}

//Scroll to the first recommendation
function scrollToRec() {
    productList.scrollIntoView(true);
}

