const page1btn = document.querySelector("#button1");
const page2btn = document.querySelector("#button2");
const page3btn = document.querySelector("#button3");

// Array of survey answers
const answers = [2, 4, 4, 1, 3];

// Array of questions and their relevent options
const qtext = [
    ["What is the function of the ALU?",
        "Following instructions and deciding when data should be stored, received or transmitted by different parts of the computer", "Processing data by performing basic mathematical and logical operations",
        "Temporarily storing data and instructions so that they can be quickly accessed by the processor when needed", "Transporting data that is going to be processed to the CPU, as well as data that has already been processed from the CPU"],

    ["What is the disadvantage of Solid State storage devices?",
        "It is easily damaged and will eventually break over time", "It is vulnerable to scratches and fingerprints",
        "Data can only be written once for some non-rewritable formats", "It is more expensive then other storage types"],

    ["What is the function of the Data Bus?",
        "Following instructions and decideing when data should be stored, received or transmitted by different parts of the computer", "Processing data by performing basic mathematical and logical operations",
        "Temporarily storing data and instructions so that they can be quickly accessed by the processor when needed", "Transporting data that is going to be processed to the CPU, as well as data that has already been processed from the CPU"],

    ["What is the advantage of Magnetic storage devices?",
        "Large storage capacity of up to terabytes (TB) of data", "Much faster than other storage types",
        "Smaller in size and lighter in weight than other storage types", "Uses very little power and produces no noise"],

    ["What is the function of RAM?",
        "Following instructions and decideing when data should be stored, received or transmitted by different parts of the computer", "Processing data by performing basic mathematical and logical operations",
        "Temporarily storing data and instructions so that they can be quickly accessed by the processor when needed", "Transporting data that is going to be processed to the CPU, as well as data that has already been processed from the CPU"]
]

// Arrays containing elements from Page 1. Each array is named after the computer part it's elements contain information on
const cpu = [document.querySelector("#cput"), document.querySelector("#cpub")];
const alu = [document.querySelector("#alut"), document.querySelector("#alub")];
const ram = [document.querySelector("#ramt"), document.querySelector("#ramb")];
const db = [document.querySelector("#dbt"), document.querySelector("#dbb")];
const ab = [document.querySelector("#abt"), document.querySelector("#abb")];

// Arrays containing elements from Page 1. Each array is named after the storage type it's elements contain information on
const mag = [document.querySelector("#mt"), document.querySelector("#mb")];
const opt = [document.querySelector("#ot"), document.querySelector("#ob")];
const ss = [document.querySelector("#sst"), document.querySelector("#ssb")];

const button_text = [page1btn.innerHTML, page2btn.innerHTML, page3btn.innerHTML];

var is_mobile = false;
var pageno = 1;

var score = 0;

var allpages = document.querySelectorAll(".page");

var currentquestion = 1;

const maxquestions = 5;

const question = document.getElementById("question");

const quizbtn1 = document.querySelector("#qbutton1");
const quizbtn2 = document.querySelector("#qbutton2");
const quizbtn3 = document.querySelector("#qbutton3");
const quizbtn4 = document.querySelector("#qbutton4");

const resetquiz = document.querySelector("#rbutton");

initialize();

// Various event listeners
quizbtn1.addEventListener("click", function () {
    checkanswer(1);
}
);

quizbtn2.addEventListener("click", function () {
    checkanswer(2);
}
);

quizbtn3.addEventListener("click", function () {
    checkanswer(3);
}
);

quizbtn4.addEventListener("click", function () {
    checkanswer(4);
}
);

rbutton.addEventListener("click", function () {
    resetsurvey();
    hideresults();
}
);

page1btn.addEventListener("click", function () {
    if (is_mobile) {
        if (pageno - 1 <= 0) {
            pageno = 3;
            change(pageno);
        }
        else {
            pageno--;
            change(pageno);
        }
    }
    else {
        change(1);
    }
    }
);
page2btn.addEventListener("click", function () {
    if (!is_mobile) {
        change(2);
    }
    }
);
page3btn.addEventListener("click", function () {
    if (is_mobile) {
        if (pageno + 1 >= 4) {
            pageno = 1;
            change(pageno);
        }
        else {
            pageno++;
            change(pageno);
        }
    }
    else {
        change(3);
    }
    }
);

cpu[0].addEventListener("click", function () {
    if (cpu[1].style.display == "none") {
        cpu[1].style.display = "inline-block";
    }
    else {
        cpu[1].style.display = "none";
    }
}
);

alu[0].addEventListener("click", function () {
    if (alu[1].style.display == "none") {
        alu[1].style.display = "inline-block";
    }
    else {
        alu[1].style.display = "none";
    }
}
);

ram[0].addEventListener("click", function () {
    if (ram[1].style.display == "none") {
        ram[1].style.display = "inline-block";
    }
    else {
        ram[1].style.display = "none";
    }
}
);

db[0].addEventListener("click", function () {
    if (db[1].style.display == "none") {
        db[1].style.display = "inline-block";
    }
    else {
        db[1].style.display = "none";
    }
}
);

ab[0].addEventListener("click", function () {
    if (ab[1].style.display == "none") {
        ab[1].style.display = "inline-block";
    }
    else {
        ab[1].style.display = "none";
    }
}
);

mag[0].addEventListener("click", function () {
    if (mag[1].style.display == "none") {
        mag[1].style.display = "inline-block";
    }
    else {
        mag[1].style.display = "none";
    }
}
);

opt[0].addEventListener("click", function () {
    if (opt[1].style.display == "none") {
        opt[1].style.display = "inline-block";
    }
    else {
        opt[1].style.display = "none";
    }
}
);

ss[0].addEventListener("click", function () {
    if (ss[1].style.display == "none") {
        ss[1].style.display = "inline-block";
    }
    else {
        ss[1].style.display = "none";
    }
}
);

// Function to hide the 3 main pages
function hideall() {
    for (let page of allpages) { //go through all subtopic pages
        page.style.display = "none";
    }
}

//function to show selected page
function show(int) {
    hideall();
    //select the page based on the parameter passed in
    let page = document.getElementById("#page" + int);
    //show the page
    page.style.display = "flex";
}

// Function to reset the background colours of each page button
function reset() {
    page1btn.style.backgroundColor = "#909090";
    page2btn.style.backgroundColor = "#909090";
    page3btn.style.backgroundColor = "#909090";
}

//Function to change the background colour of a selected page button
function change(int) {
    if (!is_mobile) {
        reset();
        switch (int) {
            case 1:
                page1btn.style.backgroundColor = "#808080";
                show(1);
                break;
            case 2:
                page2btn.style.backgroundColor = "#808080";
                show(2);
                break;
            case 3:
                page3btn.style.backgroundColor = "#808080";
                show(3);
                break;
        }
    }
    else {
        page2btn.innerHTML = button_text[pageno - 1];
        switch (int) {
            case 1:
                show(1);
                break;
            case 2:
                show(2);
                break;
            case 3:
                show(3);
                break;
        }
    }
}

// Function to check if there is a next question, if there is not, show the results
function changequestion() {
    currentquestion++;
    if (currentquestion <= maxquestions) {
        showquestion();
    }
    else {
        showresults;
        showresults();
    }
}

// Function to change the text of the questions and the buttons
function showquestion() {
    quizbtn1.innerHTML = qtext[currentquestion - 1][1];
    quizbtn2.innerHTML = qtext[currentquestion - 1][2];
    quizbtn3.innerHTML = qtext[currentquestion - 1][3];
    quizbtn4.innerHTML = qtext[currentquestion - 1][4];

    question.innerHTML = qtext[currentquestion - 1][0];
}

// Function to check if the answer given is correct
function checkanswer(int) {
    if (answers[currentquestion - 1] == int) {
        score++;
    }
    changequestion();
}

// Function to restart the survey
function resetsurvey() {
    score = 0;
    currentquestion = 1;

    quizbtn1.style.display = "inline-block";
    quizbtn2.style.display = "inline-block";
    quizbtn3.style.display = "inline-block";
    quizbtn4.style.display = "inline-block";
    showquestion();
}

//Function to hide the question buttons and show the results
function showresults() {
    quizbtn1.style.display = "none";
    quizbtn2.style.display = "none";
    quizbtn3.style.display = "none";
    quizbtn4.style.display = "none";

    var percentage = score / maxquestions * 100;
    question.innerHTML = "You scored " + percentage + "%";
    resetquiz.style.display = "inline-block";
}

// Function to hide the restart button
function hideresults() {
    resetquiz.style.display = "none";
}

// Function to be called when starting the website
function initialize() {
    cpu[1].style.display = "none";
    alu[1].style.display = "none";
    ram[1].style.display = "none";
    db[1].style.display = "none";
    ab[1].style.display = "none";

    mag[1].style.display = "none";
    opt[1].style.display = "none";
    ss[1].style.display = "none";

    mobile();
    hideresults();
    showquestion();
    hideall();
    reset();
    change(1);
}

function mobile() {
    if (screen.width <= 800) {
        page1btn.classList.add("minibutton");
        page1btn.innerHTML = "<";
        page3btn.classList.add("minibutton");
        page3btn.innerHTML = ">";

        is_mobile = true;
    }
}