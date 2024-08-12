


//target all elements to save to constants
const page1btn=document.querySelector("#Button1");
const page2btn=document.querySelector("#Button2");
const page3btn=document.querySelector("#Button3");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
console.log(allpages);
hideall();
//home page should be visible right off the bat
show(1);
function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
        onepage.style.display="none"; //hide it
    }
}
function show(pgno){ //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
    //show the page
    onepage.style.display="block";
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

/*HamMenu */
const hamBtn=document.querySelector(".hamburger-menu");
hamBtn.addEventListener("click",toggleMenus);
const menuItemsList=document.querySelector(".ham-menu ");
function toggleMenus(){ /*open and close menu*/
    menuItemsList.classList.toggle("menuHide");
}
//additional hamburger menu suffering
const hamMenu = document.querySelector('.hamburger-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
hamMenu.addEventListener('click',()=>{
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});



var splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',()=>{
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add('hidden')
  },610)
})
//randomly generated text every time you boot up the website.
const splashtext = ["handling in almost overdue assignments since 2023.", "why did this take 2 hours to code", "subscribe to @Haaam on youtube he's cool",
"idk", "why'd you put me on the spot", "Utter to me what you think the ideal is.", "Faust knows all outcomes.", "Gallop on Rocinante! Justice shall prevail!",
"O.S.H.A.R.E.","The multitude tightens its hold.", "Let's visit the world of wonders.","You'll...get shoved in this bag too!","This is how I will chart my own path.",
"I couldn't undo a thing.","If I can sever it by my own hands...", "The odyssey had a purpose...", "My arm... had changed.", "cher if ur reading this i'm sorry for all the references you don't get",
"my friends suggested some of these, never asking them again.", "hi i'm hdxd2009", "MICHAEL DON'T LEAVE ME HERE!!!! MICHAEL!!!!", "This splash text has nothing to do with the website whatsoever.",
"Hi I play limbus company","look behind you", "finite amounts of freddy", "oppenheier style"]
// Get the reference to the splash header element
var splashHeader = document.querySelector('.splash');

// Create a new H2 element
var splashTextElement = document.createElement('h2');

// Get a random index from the splashtext array
const random = Math.floor(Math.random() * splashtext.length);

// Set the text of the new H2 element
splashTextElement.textContent = splashtext[random];



// Get all the child elements of the splash header
var splashHeaderChildren = splashHeader.children;

// Get the middle index
var middleIndex = Math.floor(splashHeaderChildren.length / 2);

// Insert the new H2 element at the middle index
splashHeader.insertBefore(splashTextElement, splashHeaderChildren[middleIndex]);

//check for mobile or desktop
if (window.innerWidth < 800) {
  // Display mobile message
  var devicestring = "Since you're on mobile, you can navigate using the hamburger menu on the top right.";
//find highlighted words
const highlight = ["mobile","hamburger","menu"]

highlight.forEach(str => {
  devicestring = devicestring.replaceAll(str, `<span id = "highlight">${str}</span>`)
})

root.innerHTML = devicestring
} else if (window.innerWidth > 800) {
  // Display desktop message
  var devicestring = "Since you're on desktop, you can navigate using the buttons on the top right.";

  const highlight = ["desktop","buttons"]
  
  highlight.forEach(str => {
    devicestring = devicestring.replaceAll(str, `<span id = "highlight">${str}</span>`)
  })
  
  root.innerHTML = devicestring
}

//scrolling background
const backgroundContainer = document.querySelector('.background-container');

function scrollBackground() {
  let backgroundPosition = backgroundContainer.style.backgroundPositionX;
  if (!backgroundPosition) {
    backgroundPosition = '0px';
  }
  let position = parseFloat(backgroundPosition.replace('px', ''));
  position -= 0.2; // Adjust the speed of the scroll

  // Loop the background when it reaches the end
  if (position < -3900) {
    backgroundContainer.style.backgroundPositionX = '0px';
  } else {
    backgroundContainer.style.backgroundPositionX = `${position}px`;
  }

  requestAnimationFrame(scrollBackground);
}

scrollBackground();


// Define an array of "not so fun facts"
const notSoFunFacts = [
  "COVID-19 can survive on surfaces for around 3 days before it dies out.",
  "COVID-19 has caused over 6 million deaths worldwide.",
  "Bet you didn't know that the virus can spread through airborne transmission! A simple cough can infect many people if you're not wearing a mask!",
  "Did you know that some people with COVID-19 can be asymptomatic? This means they don't show any symptoms, so stay safe.",
  "COVID-19 has mutated into multiple variants, some of which include Omicron, which is the most infectious variant by far."
];

// Function to randomly select and display a "not so fun fact"
function displayNotSoFunFact() {
  // Get the "Not so fun fact" section
  const notSoFunFactSection = document.querySelector('.box:nth-child(4)');

  // Remove the previous paragraph element, if it exists
  const previousFactElement = notSoFunFactSection.querySelector('p');
  if (previousFactElement) {
    notSoFunFactSection.removeChild(previousFactElement);
  }

  // Randomly select a fact from the array
  const randomIndex = Math.floor(Math.random() * notSoFunFacts.length);
  const selectedFact = notSoFunFacts[randomIndex];

  // Create a new paragraph element and set its text content
  const factElement = document.createElement('p');
  factElement.textContent = selectedFact;

  // Add the new paragraph to the "Not so fun fact" section
  notSoFunFactSection.appendChild(factElement);
}

// Select the first button
const button1 = document.getElementById('Button1');

// Add event listener to the first button
button1.addEventListener('click', displayNotSoFunFact);

// Call the function to display a "not so fun fact" when the page loads
window.onload = displayNotSoFunFact;



//box fade in anims
//find the boxes
document.querySelectorAll(".box").forEach(box => {
  box.classList.add("fade-in");
});

// Create a new Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
      } else {
          entry.target.classList.remove("in-view");
      }
  });
});

// Observe the boxes
document.querySelectorAll(".fade-in").forEach(box => {
  observer.observe(box);
});

// Select the list elements
const listItems = document.querySelectorAll('.box li');

//tips for page 3
// Array of tips
const tips = [
  `Wear a mask. It stops your particles from traveling farther, and also prevents other particles from reaching your mouth and nose!`,
  `Wash your hands after touching anything. Covid could be anywhere!`,
  `When you have to cough or sneeze, aim towards your elbow or stomach to prevent the virus from travelling far!`,
  `Stay far away from anyone if you're infected, and if you see someone coughing, step away from them to minimize spread.`,
  `Stay at home if you're feeling sick, and inform your superior that you are going to the doctors as soon as possible.`
];

// Select the button
const button3 = document.getElementById('Button3');

// Add event listener to the button
button3.addEventListener('click', () => {
  // Shuffle the tips array
  let shuffledTips = tips.sort(() => Math.random() - 0.5);

  // Remove any duplicates
  let uniqueTips = new Set(shuffledTips);
  let uniqueTipsArray = Array.from(uniqueTips);

  // Assign the unique tips to the list items
  uniqueTipsArray.forEach((tip, index) => {
    listItems[index].textContent = tip;
  });
});

let currentIndex = 0;
const mapData = [
  { lat: 34, lng: 67 }, // China
  { lat: 26, lng: 35 }, // North America
  { lat: 19, lng: 55 }, // Europe
  { lat: 67, lng: 73 }, // Australia
  { lat: 53, lng: 55 }, // Africa
  { lat: 60, lng: 40 } // South America
];

const dates = [
  "2019-12-12", // China
  "2020-01-23", // North America
  "2020-01-24", // Europe
  "2020-01-25", // Australia
  "2020-02-14", // Africa
  "2020-02-26" // South America
];

const texts = [
  `First case detected in China. A cluster of patients in China’s Hubei Province, in the city of Wuhan, begin to experience the symptoms of an atypical pneumonia-like illness that does not respond well to standard treatments.`,
  `First case detected in North America. The first cases of the COVID-19 pandemic of coronavirus disease 2019 in North America were reported in the United States on 23 January 2020.`,
  `First case detected in Europe. The global COVID-19 pandemic arrived in Europe with its first confirmed case in Bordeaux, France, on 24 January 2020, and subsequently spread widely across the continent. `,
  `First case detected in Australia. The first confirmed case in Australia was identified on 25 January 2020, in Victoria, when a man who had returned from Wuhan, Hubei Province, China, tested positive for the virus.`,
  `First case detected in Africa. On 14 February 2020, the Minister of Health and Population of Egypt, Dr Hala Zayed, confirmed the first case of the coronavirus disease (COVID-19) in Egypt.  In her statement, she confirmed that the patient is male, 33 years old, of foreign origin and is currently receiving treatment at an isolation centre in Egypt. The 17 contacts of the patient have tested negative, and all of them are under home isolation for 14 days. They are being followed up by the Ministry of Health and Population.`,
  `First case detected in South America. The COVID-19 pandemic was confirmed to have reached South America on 26 February 2020 when Brazil confirmed a case in São Paulo.`
];

const redSquare = document.getElementById('red-square');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dateElement = document.getElementById('date');
const textElement = document.getElementById('text');

prevBtn.addEventListener('click', () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateRedSquare();
});

nextBtn.addEventListener('click', () => {
  currentIndex = Math.min(currentIndex + 1, mapData.length - 1);
  updateRedSquare();
});

function updateRedSquare() {
  const { lat, lng } = mapData[currentIndex];
  redSquare.style.left = `${lng}%`;
  redSquare.style.top = `${lat}%`;

  // Update the date and text
  dateElement.textContent = dates[currentIndex];
  textElement.textContent = texts[currentIndex];

  // Check which position the square is in
  console.log(`The square is now in position ${currentIndex + 1}! `);
}

// Call updateRedSquare once to set the initial position
updateRedSquare();


// Check if the device is in standalone mode (added to home screen)
if (window.navigator.standalone) {
  // Set the viewport to be the same size as the device's screen
  let viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");
}