/******************************Web Dev Assignment 2******************************************/
/******************************By Lim Wei jie, 230711S******************************************/

/******************************JS for Top OF Webpage******************************************/
//Transitioning Image Slideshow
var imageNum = 0;
var images = [];
var time = 5000;

//Image List
images[0] = 'IncinerationPlant.png';
images[1] = 'PowerGrid.jpg';
images[2] = 'RefineryPlant.jpg';
images[3] = 'SolarPanelsOnRooftop.jpg';

function changeImg() {
    //Set current image
    document.querySelector('.HeaderBackground').src = 'img/' + images[imageNum];
    //change Image
    if (imageNum < images.length - 1) {
        imageNum++
    }
    else {
        imageNum = 0;
    }
    //Call Function recursively to change image
    setTimeout("changeImg()", time);

}
window.onload = changeImg;
/******************************JS for Menu******************************************/
const MenuBtn = document.querySelector("#Menubtn");
MenuBtn.addEventListener("click", toggleMenus);
const menuItemsList = document.querySelector("nav ul");
function toggleMenus() { /*open and close menu*/
    if (menuItemsList.style.display == "block")
        menuItemsList.style.display = "none";
    else menuItemsList.style.display = "block";
}

//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");
//select all subtopic pages
console.log(allpages);
hideall();
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

function toggleMenus() {/* open/close menu */
    menuItemsList.classList.toggle("menuHide");

}
/******************************JS for Current Energy Source******************************************/

/*interactive image map*/
//Assign buttons
const Coalbtn = document.querySelector("#SCoal");
const Gasbtn = document.querySelector("#SGas");
const Solarbtn = document.querySelector("#SSolar");
const Wastebtn = document.querySelector("#SWaste");
const FuelOilbtn = document.querySelector("#SFuelOil");
var alldescs = document.querySelectorAll(".sourcedesc");/*description for each part*/
function hidealldesc(alldata) { //function to hide all pages
    for (let data of alldata) {
        //Set description display to "none"
        data.style.display = "none";
    }
}
function showdesc(alldata, pgno) { //function to show selected page no
    //hide descriptions
    hidealldesc(alldata);
    //select page to show
    let onedesc = alldata[pgno];
    //show the page
    onedesc.style.display = "block";

}

/*Event Listener*/
Coalbtn.addEventListener("click", function () {
    showdesc(alldescs, 0);
});
Gasbtn.addEventListener("click", function () {
    showdesc(alldescs, 1);
});
Solarbtn.addEventListener("click", function () {
    showdesc(alldescs, 2);
});
Wastebtn.addEventListener("click", function () {
    showdesc(alldescs, 3);
});
FuelOilbtn.addEventListener("click", function () {
    showdesc(alldescs, 4);
});

hidealldesc(alldescs);/*hide descriptions first*/

/******************************JS for Future Energy Plans******************************************/
//Declare Slide Elements 
const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

//Scroll Slide to the left
nextButton.addEventListener("click", (event) => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft += slideWidth;
});
//Scroll Slide to the right
prevButton.addEventListener("click", () => {
    const slideWidth = slide.clientWidth;
    slidesContainer.scrollLeft -= slideWidth;
});
/******************************JS for Electric Bill Calculator******************************************/
/*To do: Change Values to suit A2*/
// fields   
const EleUsed = document.querySelector("#ElectricUsed");

// elements
const eb = document.querySelector("#eb");
const hta = document.querySelector("#hta");
const stat = document.querySelector("#stat");

// listeners when fields change
const inputColl = document.querySelectorAll("#type,#ElectricUsed"); //to select all the input boxes
for (let item of inputColl) { // loop each item
    item.addEventListener("change", doCalculate);
}

function doCalculate() {
    //Calculate Electric Bill
    let ElectricBill = (EleUsed.value) * 32.57 * 0.01;

    //Calculate House Type Average bill
    let housetype = document.querySelector("#type");
    let housetypeValue = housetype.value;
    let HouseTypeAverage;
    switch (housetypeValue) {
        case '1-Room':
            HouseTypeAverage = 149;
            break;
        case '2-Room':
            HouseTypeAverage = 195;
            break;
        case '3-Room':
            HouseTypeAverage = 277;
            break;
        case '4-Room':
            HouseTypeAverage = 383;
            break;
        case '5-Room':
            HouseTypeAverage = 488;
            break;
        case 'Bungalow':
            HouseTypeAverage = 2266;
            break;
        case 'Terrance':
            HouseTypeAverage = 872;
            break;
        case 'Semi-Detatched':
            HouseTypeAverage = 1170;
            break;
        default:
            HouseTypeAverage = 1;
            
    };
    let HouseAverageBill = HouseTypeAverage * 32.57 * 0.01;
    //Compare user's Bill to house type average
    let Billstatus;

    if (ElectricBill < HouseAverageBill) {
        Billstatus = "Below Average Cost"
    }
    else if (ElectricBill === HouseAverageBill) {
        Billstatus = "Same As Average Cost"
    }
    else {
        Billstatus = "Above Average Cost"
    }
    //update Elements
    eb.innerHTML = ElectricBill.toFixed(2);
    hta.innerHTML = HouseAverageBill.toFixed(2);
    stat.innerHTML = Billstatus;
}