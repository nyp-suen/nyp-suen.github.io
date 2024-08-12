// Question Datasets as an Array string literal
let bodybuildingDataset = [
  {
    "QID": "1",
    "QuestionStem": "Which muscle is primarily responsible for flexing the elbow joint?",
    "OptionA": "Biceps brachii",
    "OptionB": "Triceps brachii",
    "OptionC": "Deltoid",
    "OptionD": "Latissimus dorsi",
    "CorrectAns": "Biceps brachii"
  },
  {
    "QID": "2",
    "QuestionStem": "Which of the following actions is primarily performed by the triceps brachii muscle?",
    "OptionA": "Elbow flexion",
    "OptionB": "Shoulder abduction",
    "OptionC": "Elbow extension",
    "OptionD": "Forearm supination",
    "CorrectAns": "Elbow extension"
  },
  {
    "QID": "3",
    "QuestionStem": "Which muscle is primarily responsible for shoulder adduction, extension, and internal rotation?",
    "OptionA": "Trapezius",
    "OptionB": "Latissimus dorsi",
    "OptionC": "Rhomboid major",
    "OptionD": "Supraspinatus",
    "CorrectAns": "Latissimus dorsi"
  },
  {
    "QID": "4",
    "QuestionStem": "Which muscle is involved in scapular retraction and is commonly targeted in exercises like rows and scapular squeezes?",
    "OptionA": "Latissimus dorsi",
    "OptionB": "Trapezius",
    "OptionC": "Supraspinatus",
    "OptionD": "Subscapularis",
    "CorrectAns": "Trapezius"
  },
  {
    "QID": "5",
    "QuestionStem": "Which of the following movements is primarily controlled by the deltoid muscle?",
    "OptionA": "Shoulder abduction",
    "OptionB": "Scapular retraction",
    "OptionC": "Elbow extension",
    "OptionD": "Hip flexion",
    "CorrectAns": "Shoulder abduction"
  }
];

let nutritionDataset = [
  {
    "QID": "1",
    "QuestionStem": "Which of the following nutrients is primarily responsible for providing energy to the body?",
    "OptionA": "Carbohydrates",
    "OptionB": "Protein",
    "OptionC": "Fats",
    "OptionD": "Fiber",
    "CorrectAns": "Carbohydrates"
  },
  {
    "QID": "2",
    "QuestionStem": "Which of the following foods is a significant source of omega-3 fatty acids?",
    "OptionA": "Beef",
    "OptionB": "Salmon",
    "OptionC": "White bread",
    "OptionD": "Rice",
    "CorrectAns": "Salmon"
  },
  {
    "QID": "3",
    "QuestionStem": "Which food group is the primary source of carbohydrates?",
    "OptionA": "Meat and alternatives",
    "OptionB": "Dairy products",
    "OptionC": "Fruits and vegetables",
    "OptionD": "Grains and cereals",
    "CorrectAns": "Grains and cereals"
  },
  {
    "QID": "4",
    "QuestionStem": "Which of the following statements about protein and weight loss is true?",
    "OptionA": "High-protein diets have been shown to decrease metabolism.",
    "OptionB": "Protein helps increase feelings of fullness and satiety.",
    "OptionC": "Protein is primarily stored as fat in the body.",
    "OptionD": "Low-protein diets are more effective for maintaining muscle mass during weight loss.",
    "CorrectAns": "Protein helps increase feelings of fullness and satiety."
  },
  {
    "QID": "5",
    "QuestionStem": "What role does protein play in a weight loss diet?",
    "OptionA": "Provides a quick source of energy",
    "OptionB": "Increases water retention in the body",
    "OptionC": "Helps preserve lean muscle mass",
    "OptionD": "Reduces absorption of vitamins and minerals",
    "CorrectAns": "Helps preserve lean muscle mass"
  }
];


// Display home page upon landing
displayPage(1, "Home", "url(images/home/home-banner.jpg)");
// displayPage(2, "Bodybuilding", "url(images/bodybuilding/bodybuilding-banner.jpg)");
// displayPage(3, "Nutrition", "url(images/nutrition/nutrition-banner.jpg)");

// Target event listeners elements
const hamIcon = document.getElementById("hamIcon");
const footerLink1 = document.getElementById("footerLink1");
const footerLink2 = document.getElementById("footerLink2");

hamIcon.addEventListener("click", function(){
  displayElement('hamburger-menu', 'grid', false);
});

footerLink1.addEventListener("click", function(){
  displayElement('MFooterL1', 'flex', true);
});

footerLink2.addEventListener("click", function(){
  displayElement('MFooterL2', 'flex', true);
});

// Add all the questions to relevant forms
addQns(nutritionDataset, 'nutrition-form', 'nutrition_', 'nutrition-results');
addQns(bodybuildingDataset, 'bodybuilding-form', 'bodybuilding_', 'bodybuilding-results');

preventFormRedirect();

addPageListener();
addImageMapListeners();

// CSS Finishing Touches
alternateBGColour();




// Function to enter fullscreen mode
if (document.documentElement.requestFullscreen) {
  // Add event listeners to enter/exit fullscreen on button click
  var fullscreenButton = document.querySelectorAll('.fullscreen-button');
  fullscreenButton[0].addEventListener('click', function() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  });

  fullscreenButton[1].addEventListener('click', function() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  });
}


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
}

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


function updateAnatomyMap(headerID, descriptionID, headerText, descriptionText)
{
  const anatomyPartHeader = document.getElementById(headerID);
  const anatomyPartDescription = document.getElementById(descriptionID);

  anatomyPartHeader.innerText = headerText;
  anatomyPartDescription.innerText = descriptionText;

  playAnimation(anatomyPartHeader, "fade-in", 1000);
  playAnimation(anatomyPartDescription, "fade-in", 1000);
}

function addImageMapListeners()
{
  const armBtn1 = document.getElementById('arm-01');
  const armBtn2 = document.getElementById('arm-02');
  const armBtn3 = document.getElementById('arm-03');
  const armBtn4 = document.getElementById('arm-04');
  armBtn1.addEventListener('click', function(){updateAnatomyMap('arms-header', 'arms-description', 'Biceps', "The primary function of the biceps brachii is to flex (bend) the elbow joint. This action is crucial for movements such as lifting, curling, and pulling objects towards the body." + " The biceps also assists in supination of the forearm, which is the movement that turns the palm of the hand upward or forward.");});
  armBtn2.addEventListener('click', function(){updateAnatomyMap('arms-header', 'arms-description', 'Triceps', "The primary function of the triceps brachii is to extend (straighten) the elbow joint. This action is crucial for movements such as pushing, lifting, and extending the arm.");});
  armBtn3.addEventListener('click', function(){updateAnatomyMap('arms-header', 'arms-description', 'Delts', "The deltoid muscles are responsible for several movements of the shoulder joint, including lifting the arm forward, lifting the arm sideways away from the body, moving the arm backward." + " The deltoid muscles help stabilize the shoulder joint during arm movements, providing support and preventing dislocations.");});
  armBtn4.addEventListener('click', function(){updateAnatomyMap('arms-header', 'arms-description', 'Forearms', "The forearm muscles play a crucial role in flexing, extending, and rotating the wrist joint. These movements are essential for tasks that require precise manipulation, such as writing, typing, and playing musical instruments." + " Forearm muscles contribute to overall arm strength and stability, supporting activities like lifting, carrying, and pushing objects.");});

  const backsBtn1 = document.getElementById('back-01');
  const backsBtn2 = document.getElementById('back-02');
  const backsBtn3 = document.getElementById('back-03');
  const backsBtn4 = document.getElementById('back-04');
  const backsBtn5 = document.getElementById('back-05');
  backsBtn1.addEventListener('click', function(){updateAnatomyMap('backs-header', 'backs-description', 'Trapezius', "The trapezius muscle plays a crucial role in movements involving the shoulder and neck, including lifting the shoulder toward the ear, pulling the shoulder blades together toward the spine," + " and tilting and turning the head.");});
  backsBtn2.addEventListener('click', function(){updateAnatomyMap('backs-header', 'backs-description', 'Rotator Cuff', "The primary function of the rotator cuff muscles is to stabilize the shoulder joint, keeping the head of the humerus (upper arm bone) securely within the shallow socket of the scapula (glenoid cavity)." + " They contribute to both internal and external rotation of the arm, which are essential for various activities like reaching overhead, throwing, and lifting objects.");});
  backsBtn3.addEventListener('click', function(){updateAnatomyMap('backs-header', 'backs-description', 'Rhomboids', "The rhomboids muscle pulls the scapula towards the spine, which helps to bring the shoulder blades closer together." + " It also assists in stabilizing the scapula during movements of the shoulder and arm." + " They also aid in maintaining proper posture by counteracting the forward pull of muscles in the chest and shoulders.");});
  backsBtn4.addEventListener('click', function(){updateAnatomyMap('backs-header', 'backs-description', 'Latissimus dorsi', "The primary function of the latissimus dorsi (lats) muscle is shoulder adduction, extension, and internal rotation." + " It also assists in various movements involving the shoulder and upper limb, such as pulling the shoulder downward and backward (shoulder extension), rotating the shoulder internally (medial rotation), and aiding in arm adduction (bringing the arm towards the body).");});
  backsBtn5.addEventListener('click', function(){updateAnatomyMap('backs-header', 'backs-description', 'Spine', "The spine allows for a wide range of movements, including bending forward (flexion), bending backward (extension), twisting (rotation), and bending sideways (lateral flexion). These movements are facilitated by the joints between adjacent vertebrae and the flexibility of the spinal column.");});
  
  const legsBtn1 = document.getElementById('legs-01');
  const legsBtn2 = document.getElementById('legs-02');
  const legsBtn3 = document.getElementById('legs-03');
  const legsBtn4 = document.getElementById('legs-04');
  legsBtn1.addEventListener('click', function(){updateAnatomyMap('legs-header', 'legs-description', 'Quadriceps', "The quadriceps muscles work together to extend (straighten) the knee joint. They are powerful extensors of the knee, allowing movements such as kicking, jumping, and running." + " The rectus femoris also assists in flexing the hip joint, which is important for activities like walking and climbing stairs.");});
  legsBtn2.addEventListener('click', function(){updateAnatomyMap('legs-header', 'legs-description', 'Adductors', "The adductor muscles contribute to stabilizing the hip joint, especially during movements that involve weight-bearing and changes in direction." + " It also brings the thigh towards the midline of the body and may also assist in flexion (bending) and extension (straightening) of the thigh.");});
  legsBtn3.addEventListener('click', function(){updateAnatomyMap('legs-header', 'legs-description', 'Hamstrings', "The hamstrings muscles assist in extending (moving the thigh backward) the hip joint." + " It also flex (bend) the knee joint, pulling the lower leg backward and also assist in medial (inward) and lateral (outward) rotation of the knee joint.");});
  legsBtn4.addEventListener('click', function(){updateAnatomyMap('legs-header', 'legs-description', 'Calves', "The calf muscles help stabilize the ankle joint, especially during weight-bearing activities." + " The gastrocnemius also assists in bending the knee joint (knee flexion) when the foot is lifted off the ground.");});
}

/************************************************************************************************/
/*@brief: This function shows a different page of the website based on their ID.*****************/
/*@param - pageNum: What page number to display.*************************************************/
/*@param - bannerText: What text to be displayed on the page banner.*****************************/
/*@param - bannerImg: Relative path to image file.***********************************************/
/************************************************************************************************/
function displayPage(pageNum, bannerText, bannerImg)
{
  // Hide all pages
  const web_pages = document.querySelectorAll(".page");
  for (let i = 0; i < web_pages.length; i++){
    web_pages[i].style.display = "none";
  }

  const page_selected = document.querySelector("#page"+pageNum);
  const banner_box = document.getElementById("banner-context");

  // Modify the contents of the page's banner
  page_selected.style.display = "grid";

  banner_box.querySelector("h1").innerText = bannerText;
  banner_box.style.backgroundImage = bannerImg;

  // Hide mobile hamburger-menu to show page changed in mobile.
  document.getElementById("hamburger-menu").style.display = "none";

  // Play loading animation
  playLoading();
}


/***************************************************************************************************/
/*@brief: This is a generic function that plays CSS animation.**************************************/
/*@param - HTMLelement: The HTML element to target for animation.***********************************/
/*@param - animationClass: The CSS animation class to play for the HTML element.********************/
/*@param - removeAnimationTime: The time required before the CSS animation class gets removed.******/
/***************************************************************************************************/
function playAnimation(HTMLelement, animationClass, removeAnimationTime) {

  function removeAnimation() {
    HTMLelement.classList.toggle(animationClass);
  }

  // Enable animation for targeted HTML element.
  HTMLelement.classList.toggle(animationClass);
  // Remove animation after x amount of seconds.
  setTimeout(function(){removeAnimation();}, removeAnimationTime);
}

/***************************************************************************************************/
/*@brief: This is a function that plays the Loading Screen Animation.*******************************/
/***************************************************************************************************/
function playLoading(){

  function removeLoading(){
    screenBuffer.classList.toggle("loading-screen");
    screenBuffer.removeChild(screenBuffer.firstElementChild);
    // Make the content re-appear again.
    document.getElementById("view-context").style.display = 'grid';
  }

  // Make the background of the entire screen black.
  const screenBuffer = document.getElementById("loading-screen");
  screenBuffer.classList.toggle("loading-screen");

  // Create and append the loading square to the screen.
  const loading_square = document.createElement("div");
  loading_square.classList.add("loading-square");
  screenBuffer.append(loading_square);

  // Add animation to square. 
  loading_square.classList.toggle("loading-in");
  // Make the content disappear temporarily for 'Loading' effect immersion.
  document.getElementById("view-context").style.display = 'none';
  // Remove animation after x seconds.
  setTimeout(function(){removeLoading();}, 990);
}

/***************************************************************************************************/
/*@brief: This is a generic function that hides/unhides HTML elements based on their ID.************/
/*@param - id: identification of the HTML element.**************************************************/
/*@param - intendedDisplay: the display format at which you want the element to be in.**************/
/*@param - isAnimationPlayed: true or false*********************************************************/
/***************************************************************************************************/
function displayElement(id, intendedDisplay, isAnimationPlayed)
{
  const selected = document.getElementById(id);
  if (selected.style.display == intendedDisplay) {
    selected.style.display = "none";
  }
  else {
    selected.style.display = intendedDisplay;

    if (isAnimationPlayed)
      playAnimation(selected, "fade-in", 1000);
  }
}

/***************************************************************************************************/
/*@brief: This function alternates background colours through CSS class bg.*************************/
/***************************************************************************************************/
function alternateBGColour()
{
  const containers = document.getElementsByClassName("bg");
  for (let i = 0; i < containers.length; i++){
    if (i % 2 == 0) {
      containers[i].style.backgroundColor = "white";
    }
    else {
      containers[i].style.backgroundColor = "#f4f4f5";
    }
  }
}

/***************************************************************************************************/
/*@brief: This function adds event listeners to page buttons, so users can navigate in the website.*/
/***************************************************************************************************/
function addPageListener()
{
  // NOTE: There is a "better" way to do this, but to satisfy JAVASCRIPT VALIDATOR, it has to be this way.
  // Target all page 1, 2 and 3 buttons.
  let page1btn = document.getElementById("page1btn1");
  page1btn.addEventListener("click", function(){displayPage(1, "Home", "url(images/home/home-banner.jpg)");});
  page1btn = document.getElementById("page1btn2");
  page1btn.addEventListener("click", function(){displayPage(1, "Home", "url(images/home/home-banner.jpg)");});
  page1btn = document.getElementById("page1btn3");
  page1btn.addEventListener("click", function(){displayPage(1, "Home", "url(images/home/home-banner.jpg)");});
  page1btn = document.getElementById("page1btn4");
  page1btn.addEventListener("click", function(){displayPage(1, "Home", "url(images/home/home-banner.jpg)");});

  let page2btn = document.getElementById("page2btn1");
  page2btn.addEventListener("click", function(){displayPage(2, "Bodybuilding", "url(images/bodybuilding/bodybuilding-banner.jpg)");});
  page2btn = document.getElementById("page2btn2");
  page2btn.addEventListener("click", function(){displayPage(2, "Bodybuilding", "url(images/bodybuilding/bodybuilding-banner.jpg)");});
  page2btn = document.getElementById("page2btn3");
  page2btn.addEventListener("click", function(){displayPage(2, "Bodybuilding", "url(images/bodybuilding/bodybuilding-banner.jpg)");});
  page2btn = document.getElementById("page2btn4");
  page2btn.addEventListener("click", function(){displayPage(2, "Bodybuilding", "url(images/bodybuilding/bodybuilding-banner.jpg)");});

  let page3btn = document.getElementById("page3btn1");
  page3btn.addEventListener("click", function(){displayPage(3, "Nutrition", "url(images/nutrition/nutrition-banner.jpg)");});
  page3btn = document.getElementById("page3btn2");
  page3btn.addEventListener("click", function(){displayPage(3, "Nutrition", "url(images/nutrition/nutrition-banner.jpg)");});
  page3btn = document.getElementById("page3btn3");
  page3btn.addEventListener("click", function(){displayPage(3, "Nutrition", "url(images/nutrition/nutrition-banner.jpg)");});
  page3btn = document.getElementById("page3btn4");
  page3btn.addEventListener("click", function(){displayPage(3, "Nutrition", "url(images/nutrition/nutrition-banner.jpg)");});

  // const pages = [page1btn, page2btn, page3btn];
  // // Loop through all pages of the website.
  // for (let i = 0; i < pages.length; i++)
  // {
    // // Loop through all button elements that are related to a specific page. 
    // for (let c = 0; c < pages[i].length; c++)
    // {
      // // Add event listeners with banner styles specific to their corresponding page number.
      // switch (i)
      // {
        // case 0:
          // pages[i][c].addEventListener("click", function(){
            // displayPage(1, "Home", "url(images/home/home-banner.jpg)");
          // });
          // break;

        // case 1:
          // pages[i][c].addEventListener("click", function(){
            // displayPage(2, "Bodybuilding", "url(images/bodybuilding/bodybuilding-banner.jpg)");
          // });
          // break;

        // case 2:
          // pages[i][c].addEventListener("click", function(){
            // displayPage(3, "Nutrition", "url(images/nutrition/nutrition-banner.jpg)");
          // });
          // break;
      // }
    // }
  // }

}

/********************************************************************************************************/
/*@brief: This function prevents forms from redirecting to another html page. (Mainly only used for JS).*/
/********************************************************************************************************/
function preventFormRedirect()
{
  function handleForm(event)
  {
    event.preventDefault();
  }
  const form = document.getElementsByTagName('form');
  for (let i = 0; i < form.length; i++)
    form[i].addEventListener('submit', handleForm);
}

/*************************************************************************************/
/*@brief: This is a generic function that adds questions to a HTML form.**************/
/*@param - dataset: An array that contains all the questions for a form.**************/
/*@param - formID: the identification of the HTML form element.***********************/
/*@param - optionName: name of the option input for labelling*************************/
/*@param - resultsID: identification of the element to display results in.************/
/*************************************************************************************/
function addQns(dataset, formID, optionName, resultsID)
{
  // Loop through all the questions in the dataset
  for (let i = 0; i < dataset.length; i++)
  {
    // Add a wrapper that will contain the entire question.
    const qnWrapper = document.createElement('div');
    qnWrapper.classList.add("question-box");

    const qnHeader = document.createElement('h3');
    qnHeader.innerText = "Q" + (i+1).toString() + ": " + dataset[i].QuestionStem;

    const optionWrapper = document.createElement('div');
    
    //Select a number from 1 - 4 for randomise loop.
    let randomNum = Math.floor(Math.random() * 4) + 1;
    let randOptions = ['A', 'B', 'C', 'D'];
    let randOptionAns = [dataset[i].OptionA, dataset[i].OptionB, dataset[i].OptionC, dataset[i].OptionD];
    let tempOption = ' ';
    let tempAns = ' ';

    //Randomise Option Sequence for each question.
    for (let r = 0; r < randomNum; r++){
      tempOption = randOptions[0];
      randOptions[0] = randOptions[1];
      randOptions[1] = randOptions[2];
      randOptions[2] = randOptions[3];
      randOptions[3] = tempOption;

      tempAns = randOptionAns[0];
      randOptionAns[0] = randOptionAns[1];
      randOptionAns[1] = randOptionAns[2];
      randOptionAns[2] = randOptionAns[3];
      randOptionAns[3] = tempAns;
    }
  
    // Loop through all the options available for one question.
    for (let c = 0; c < 4; c++){
      const option = document.createElement('input');
      option.type = "radio";
      option.name = optionName + dataset[i].QID;
      option.required = true;
      let identification = ' ';
      let optionLabel = document.createElement('LABEL');

      identification = randOptions[c] + i.toString() + formID;
      option.value = randOptionAns[c];
      optionLabel.innerText = randOptionAns[c];

      option.id = identification;
      optionLabel.setAttribute("for", identification);

      // Append the available choices to its own option container.
      optionWrapper.append(option);
      optionWrapper.append(optionLabel);
    }

    // Append the option container to its own question container.
    qnWrapper.append(qnHeader);
    qnWrapper.append(optionWrapper);

    // Append the question to the form
    document.getElementById(formID).append(qnWrapper);
  }
  // Repeat until all questions are pinned.
  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  document.getElementById(formID).append(submitBtn);

  // Add form validation
  document.getElementById(formID).addEventListener('submit', function(){
    validateForm(dataset, formID, optionName, resultsID);
  });
}


/*************************************************************************************/
/*@brief: This is a generic function that validates HTML forms based on their ID.*****/
/*@param - dataset: An array that contains all the questions for a form.**************/
/*@param - formID: identification of the HTML form element.***************************/
/*@param - optionName: name of the option input for labelling*************************/
/*@param - resultsID: identification of the element to display results in.************/
/*This is already called in addQns(), so no need to call it manually.*****************/
/*************************************************************************************/
function validateForm(dataset, formID, optionName, resultsID)
{
  const displayResults = document.getElementById(resultsID);
  // Reset result texts if there is any previous attempts.
  if (displayResults.hasChildNodes()){
    for (let i = 0; i < displayResults.childElementCount + 1; i++){
      displayResults.removeChild(displayResults.lastChild);
    }
  }

  // Set-up variables for grading quiz.
  const questions = document.querySelectorAll("#" + formID + " > div");
  let totalQns = questions.length;
  let correctAns = 0;
  const totalGrade = document.createElement('p');
  const qnsWrong = document.createElement('p');
  let wrongQns = [];

  // Grade Quiz
  for (let i = 0; i < totalQns; i++)
  {
    const qnID = optionName + (i + 1).toString();
    const answer = document.querySelector('input[name="' + qnID + '"]:checked').value;
    if (answer == dataset[i].CorrectAns) { correctAns++;}
    else { wrongQns.push((i+1).toString());}
  }

  // Check if user has made any previous mistakes
  if (wrongQns.length > 0)
  {
    qnsWrong.innerText = "However, you still can improve by checking your answers for Question ";
    for (let i = 0; i < wrongQns.length; i++)
    {
      // Text Formatting
      qnsWrong.innerText += wrongQns[i];
      if (wrongQns.length > 1)
      {
          if (i == wrongQns.length - 2){
            qnsWrong.innerText += " and ";
          }
          else if (i != wrongQns.length - 1){
            qnsWrong.innerText += ", ";
          }
      }
    }

    // Display Results
    totalGrade.innerText = "You got " + correctAns.toString() + " / " + totalQns.toString() + " correct!";

    qnsWrong.innerText += " again!";
    totalGrade.classList.add("fade-in");
    qnsWrong.classList.add("fade-in");

    displayResults.append(totalGrade);
    displayResults.append(qnsWrong);
  }
  // Reset all form inputs
  document.getElementById(formID).reset();
}