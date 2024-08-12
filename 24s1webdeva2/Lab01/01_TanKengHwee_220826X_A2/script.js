//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
var allpages = document.querySelectorAll(".page");



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

const menuItemsList = document.querySelector("nav ul");

function toggleMenus() { /*open and close menu*/
    menuItemsList.classList.toggle("menuHide");
}


let activeStepIndex = 0;
const steps = document.querySelectorAll("#progress-bar-container li");
const lineprogress = document.querySelector("#line-progress");
const timelinecontent = document.querySelectorAll(".TimelineContent");

steps.forEach((step, index) => {
    step.addEventListener("click", function () {
        steps.forEach((s, i) => {
            if (i <= index) {
              activeStepIndex=index;
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        showTimeline(index+1);
        const widthPercentage = (index) * (100 / steps.length);
        
        var windowWidth = window.innerWidth;
        if (windowWidth > 800) {
            lineprogress.style.width = `${widthPercentage}%`;
        } else {
            lineprogress.style.height = `${widthPercentage * 0.7}vw`;
        }
        

    });
    
});


var windowWidth = window.innerWidth;
if(windowWidth <800)
{
  lineprogress.style.backgroundImage = 'linear-gradient(180deg, purple 0%, #a02eb7 100%)';
}
//update page 1 when window resize;
window.addEventListener('resize', function () {

    const widthPercentage = (activeStepIndex) * (100 / steps.length);
    
    var windowWidth = window.innerWidth;
    if (windowWidth > 800) {
      lineprogress.style.backgroundImage = 'linear-gradient(90deg, purple 0%, #a02eb7 100%)';
      lineprogress.style.height = `${10}%`
      lineprogress.style.width = `${widthPercentage}%`;
    } else {
      lineprogress.style.backgroundImage = 'linear-gradient(180deg, purple 0%, #a02eb7 100%)';
      lineprogress.style.width = `${1.5}vw`
        lineprogress.style.height = `${widthPercentage * 0.7}vw`;
    }

});


hideallTimeline();
showTimeline("1");
function showTimeline(timelinenum) { //function to show selected page no
  hideallTimeline();
  //select the page based on the parameter passed in
  let onestep = document.querySelector("#stepcontent" + timelinenum);
  //show the page
  onestep.style.display = "block";
}
function hideallTimeline() { //function to hide all pages
  for (let onestep of timelinecontent) { //go through all subtopic pages
    onestep.style.display = "none"; //hide it
  }
}



const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('nav .mainMenu li a');

openMenu.addEventListener('click',shownav);
closeMenu.addEventListener('click',closenav);

// close menu when you click on a menu item 
menu_items.forEach(item => {
    item.addEventListener('click',function(){
      closenav();
    })
})

function shownav(){
    mainMenu.style.top = '0';
}
function closenav(){
    mainMenu.style.top = '-100%';
}
// Select all flip cards and their inner elements
const flipcards = document.querySelectorAll('.flip-card');
const cards = document.querySelectorAll('.flip-card-inner');

let cardPressed = false;

flipcards.forEach((flipcard, index) => {
    flipcard.addEventListener("click", () => flipCard(index));
    flipcard.addEventListener("mouseleave", () => hoverFlipBack(index));
});

function flipCard(index) {
    cardPressed = !cardPressed;
    cards[index].style.transform = cardPressed ? 'rotateY(180deg)' : 'rotateY(0deg)';
}

function hoverFlipBack(index) {
    if (cardPressed) {
        cardPressed = false;
        cards[index].style.transform = 'rotateY(0deg)';
    }
}




let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    
    let active = 3;
    function loadShow() {
        const viewportWidth = window.innerWidth;
    
        // Calculate perspective values based on viewport width
        const perspectiveValue = viewportWidth / 71.5 * 1.5;
    
        // Define translation value for next and previous items
        const translateValue = viewportWidth / 111;
    
        // Calculate scale value
        const scaleValue = 1.2 - viewportWidth / 3000;
    
        items.forEach((item) => {
            item.style.display = "none";
            item.style.transform = "none";
            item.style.zIndex = "";
            item.style.filter = "";
            item.style.opacity = "";
        });
    
        items[active].style.display = "block";
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
    
        let next = (active + 1) % items.length;
        let prev = (active + items.length - 1) % items.length;
    
        items[next].style.display = "block";
        items[next].style.zIndex = -1;
        items[next].style.filter = 'blur(5px)';
        items[next].style.opacity = 1;
        
        items[prev].style.display = "block";
        items[prev].style.zIndex = -1;
        items[prev].style.filter = 'blur(5px)';
        items[prev].style.opacity = 1;    }
        function changeActive() {
          if (!cardPressed) {
              active = (active + 1) % items.length;
              loadShow();
          }
      }

    function startInterval() {
          intervalId = setInterval(changeActive, 5000);
    }

    startInterval();
    loadShow();
    next.onclick = function(){
      clearInterval(intervalId);
      startInterval();
      active = (active + 1) % items.length;

      loadShow();
    }
    prev.onclick = function(){
      clearInterval(intervalId);
      startInterval();
      active = (active + items.length - 1) % items.length;


      loadShow();
    }



    const robot = document.getElementById('robot');
    const game = document.getElementById('gameContainer');
    const livesElement = document.getElementById('lives').querySelector('h2');
    const scoreElement = document.getElementById('score').querySelector('h2');
      const tables = document.querySelectorAll('.table');
      const Foodbelt = document.querySelector('.food-belt');
      let robotX = 275;
      let robotY = 175;

      let currentLives =10;
      let currentScore =0;
    let intervalTime = 4000; 
    let intervalIDSelectTable;

    let PlayerHasFood = false;

    let GameEnd = false;

      //player movement code
      const keys = new Set();

      function updatePressedKeys(event) {
          if (event.type === 'keydown') {
              keys.add(event.key);
          } else if (event.type === 'keyup') {
              keys.delete(event.key);
          }
      }
  
      function moveRobot() {
        let tempRoboty = robotY;
        let tempRobotx = robotX;
          if (keys.has('w') && robotY > 0 && !GameEnd) robotY -= 3;
          if (keys.has('s') && robotY < 346 && !GameEnd) robotY += 3;
          if (keys.has('a') && robotX > 0 && !GameEnd) robotX -= 3;
          if (keys.has('d') && robotX < 546 && !GameEnd) robotX += 3;
          robot.style.top = `${robotY}px`;
          robot.style.left = `${robotX}px`;
        if(checkCollision())
        {
          robotY=tempRoboty;
          robotX=tempRobotx;
          robot.style.top = `${robotY}px`;
          robot.style.left = `${robotX}px`;
        }
        else
        {
          robot.style.top = `${robotY}px`;
          robot.style.left = `${robotX}px`;
        }
      }
      window.addEventListener('keydown', updatePressedKeys);
      window.addEventListener('keyup', updatePressedKeys);
  
      setInterval(moveRobot, 10); // Move the robot every 100 milliseconds
        

      function checkCollision() {
        let collisionDetected = false;
          tables.forEach(table => {
            const tableRect = table.getBoundingClientRect();
            const foodbelt = Foodbelt.getBoundingClientRect();
            const robotRect = robot.getBoundingClientRect();
  
              if (robotRect.left < tableRect.right &&
                  robotRect.right > tableRect.left &&
                  robotRect.top < tableRect.bottom &&
                  robotRect.bottom > tableRect.top &&
                  PlayerHasFood&&
                  !GameEnd) {
                    if(table.style.backgroundColor == 'red')
                    {
                      currentScore+=1;
                      updateScore();
                      PlayerHasFood=false;
                    }
                  table.style.backgroundColor = '#0000ff';
              }
              if (robotRect.left < tableRect.right &&
                robotRect.right > tableRect.left &&
                robotRect.top < tableRect.bottom &&
                robotRect.bottom > tableRect.top )
                {
                  
                  collisionDetected = true; // Collision detected
                }
              if (robotRect.left < foodbelt.right &&
                robotRect.right > foodbelt.left &&
                robotRect.top < foodbelt.bottom &&
                robotRect.bottom > foodbelt.top) {
                  Foodbelt.style.backgroundColor = '#0000ff';
                  PlayerHasFood=true;
                  collisionDetected = true; // Collision detected
            }
          });

    return collisionDetected;
      }

      function selectRandomTable() {
        let randomIndex;
        let tableSelected = false;
        if(areAllTablesRed()&&
        !GameEnd)
        {
          currentLives-=1;
          updateLives();
        } if(areAllTablesRed())
        {
          tableSelected = true;
        }
    
    
        while (!tableSelected) {
            randomIndex = Math.floor(Math.random() * tables.length);
            if (tables[randomIndex].style.backgroundColor !== 'red') {
                tables[randomIndex].style.backgroundColor = 'red';
                tableSelected = true;
                if(areAllTablesRed()&&
                !GameEnd)
                  {
                    currentLives-=1;
                    updateLives();
                  }
            }
        }
    }
    function areAllTablesRed() {
      return Array.from(tables).every(table => table.style.backgroundColor === 'red');
  }
  
    function startSelectingTables() {
      intervalIDSelectTable = setInterval(() => {
          selectRandomTable();
          intervalTime = Math.max(1000, intervalTime - 500); 
          clearInterval(intervalIDSelectTable);
          startSelectingTables(); 
      }, intervalTime);
  }

  startSelectingTables(); 


  function updateLives() {
    if(currentLives<=0)
    {
      GameEnd=true;
    }
    livesElement.textContent = `Lives: ${currentLives}`;
}
updateLives(); 

function updateScore() {
    scoreElement.textContent = `Score: ${currentScore}`;
}
updateScore();

    
   
  