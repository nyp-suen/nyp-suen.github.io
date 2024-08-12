/* audio */
const audio = new Audio();
audio.src = "audio/buttonpress.mp3";

/* toggle fullscreen */
const fullscreenBtn = document.querySelector("#fullscreenToggle");

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

  fullscreenBtn.addEventListener("click",function()
  {
    audio.play();
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  });

//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
var allpages=document.querySelectorAll(".page");

hideall();
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

page4btn.addEventListener("click", function()
{
show(4);
}
);

/* animation and changing of images of famous chess players */
const body = document.querySelector("body"); /* this is very useful for checking viewport width */
const leftarrow = document.querySelector("#leftarrow");
const rightarrow = document.querySelector("#rightarrow");
var famImages = [];
var famMobileImages = [];
var descriptiontexts = [];
var i = 0;

famImages[0] = "images/carlsen.png";
famImages[1] = "images/anand.png";
famImages[2] = "images/liren.png";

famMobileImages[0] = "images/carlsen-mobile.png";

famMobileImages[1] = "images/anand-mobile.png";

famMobileImages[2] = "images/liren-mobile.png";

descriptiontexts[0] = '<p>Name: <b>Magnus Carlsen</b></p> <p>Age: 33</p> <p>Ranked No 1 in the world</p> <p>ELO: 2832</p> <p>Famous Quote</p> <p><i>"Without the element of enjoyment, it is not worth trying to excel at anything"</i></p>';

descriptiontexts[1] = '<p>Name: <b>Anand</b></p> <p>Age: 54</p> <p>Ranked No 11 in the world</p> <p>ELO: 2751</p> <p>Famous Quote</p> <p><i>"Chess is like a language.It is very beautiful once you have played for a while."</i></p>';

descriptiontexts[2] = '<p>Name: <b>Ding Liren</b> </p> <p>Age: 31</p> <p>Ranked No 13 in the world</p> <p>ELO: 2745</p> <p>Famous Quote</p> <p><i>"The meaning of life is in those sparkling moments"<i></p>';

/* to change images for left arrow */
leftarrow.addEventListener("click",function()
{
    var imgBox = document.querySelector(".img-box"); /* Have to be assigned here so that after the first time right arrow is pressed the function will still work since the new imgBox is the clone of the original imgBox*/

    var famText = document.querySelector(".description-txt"); /* Have to be assigned here so that after the first time right arrow is pressed the function will still work since the new famText is the clone of the original famText*/

    imgBox.classList.remove("fadein"); /* remove fadein first so clone don't have fadein class*/

    famText.classList.remove("fadein"); /* remove fadein first so clone don't have fadein class*/

    var clone = imgBox.cloneNode(true);

    var descriptiontxtbox = famText.cloneNode(false);

    imgBox.parentNode.replaceChild(clone,imgBox); /* replacing original imgBox with clone to retrigger fade in animation */

    famText.parentNode.replaceChild(descriptiontxtbox,famText);  /* replacing original famText with clone to retrigger fade in animation */

    var famImg = document.querySelector("#famousimg"); /* intentionally placed here so to find the famImg from the clone of imgBox */

    if(i > 0 && i < famImages.length) /* make sure that the user cannot go behind first image */
    {
    i--;
    if(body.clientWidth > 900)
    {
      famImg.src = famImages[i];
    }
    else
    {
      famImg.src = famMobileImages[i];
    }
    descriptiontxtbox.innerHTML = descriptiontexts[i];
    }
    else
    {
        i += 2; /* backtrack to last image if user press left arrow when they are at first image */
      if(body.clientWidth > 900)
      {
        famImg.src = famImages[i];
      }
      else
      {
        famImg.src = famMobileImages[i];
      }
        descriptiontxtbox.innerHTML = descriptiontexts[i];
    }
    /* readd fade in class to trigger animation again */
    clone.classList.add("fadein"); 
    descriptiontxtbox.classList.add("fadein");
   }
);

/* to change images for the right arrow */
rightarrow.addEventListener("click",function()
{
    var imgBox = document.querySelector(".img-box"); /* Have to be assigned here so that after the first time right arrow is pressed the function will still work since the new imgBox is the clone of the original imgBox*/

    var famText = document.querySelector(".description-txt"); /* Have to be assigned here so that after the first time right arrow is pressed the function will still work since the new famText is the clone of the original famText*/
    
    imgBox.classList.remove("fadein"); /* remove fadein first so clone don't have fadein class*/

    famText.classList.remove("fadein");  /* remove fadein first so clone don't have fadein class*/

    var clone = imgBox.cloneNode(true); /* clone image inside imgBox */

    var descriptiontxtbox = famText.cloneNode(false); /* no child in famText */

    imgBox.parentNode.replaceChild(clone,imgBox);

    famText.parentNode.replaceChild(descriptiontxtbox,famText);

    var famImg = document.querySelector("#famousimg"); /* intentionally placed here so to find the famImg from the clone of imgBox */

    if(i < famImages.length - 1)
    {
    i++;
    if(window.innerWidth > 900)
    {
    famImg.src = famImages[i];
    }
    else
    {
      famImg.src = famMobileImages[i];
    }
    descriptiontxtbox.innerHTML = descriptiontexts[i];
    }
    else /* reset back to first image */
    {
    i = 0;
    if(window.innerWidth > 900)
    {
    famImg.src = famImages[i];
    }
    else
    {
      famImg.src = famMobileImages[i];
    }
    descriptiontxtbox.innerHTML = descriptiontexts[i];
    }
    /* readd fade in class to trigger animation again */
    clone.classList.add("fadein"); 
    descriptiontxtbox.classList.add("fadein");
}
);

const menuItemsList=document.querySelector("nav ul");

const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click",toggleMenus);

function toggleMenus()
{
    /*open and close menu*/
    menuItemsList.classList.toggle("menuHide");
    
    hamBtn.classList.toggle("is-active");
}

/* for dot clicking in image for history page */
const pawnBtns = document.querySelectorAll(".pawn"); 
const horseBtns = document.querySelectorAll(".horse");
const bishopBtns = document.querySelectorAll(".bishop");
const queenBtn = document.querySelector("#queen");
const kingBtn = document.querySelector("#king");
const rookBtns = document.querySelectorAll(".rook"); 

var piecedescriptions = [];
var clicked = false;
var clickedpawn = false;
var clickedhorse = false;
var clickedbishop = false;
var clickedqueen = false;
var clickedking = false;
var clickedrook = false;

piecedescriptions[0] = '<p><b>Pawn</b></p> <img src = "images/pawn.png" alt = "image of pawn"> <p>Movement:</p> <p>Only moves fowards and captures diagonally(unless special case like en-passant)</p>';
piecedescriptions[1] = '<p><b>Rook</b></p> <img src = "images/rook.png" alt = "image of rook"> <p>Movement:</p> <p>Only moves and captures in a straight line</p>';
piecedescriptions[2] = '<p><b>Knight</b></p> <img src = "images/knight.png" alt = "image of knight(chess piece)"> <p>Movement:</p> <p>Only moves and captures in a L-shape</p>';
piecedescriptions[3] = '<p><b>Bishop</b></p> <img src = "images/bishop.png" alt = "image of bishop"> <p>Movement:</p> <p>Only moves and captures diagonally</p>';
piecedescriptions[4] = '<p><b>Queen</b></p> <img src = "images/queen.png" alt = "image of queen"> <p>Strongest piece in the game</p> <p>Movement:</p> <p>Moves and captures in both straight lines and diagonals</p>';
piecedescriptions[5] = '<p><b>King</b></p> <img src = "images/king.png" alt = "image of king"> <p>Most important piece in the game as if it has no where to go and is in check(aka an enemy piece line of sight) the player with the king that has no where to go loses</p> <p>Movement:</p> <p>Moves 1 square in any direction from its current position</p>';

hidehistorytxtbox();
function hidehistorytxtbox()
{
    var historytxtbox = document.querySelector("#historytxtbox"); /* txt box that appears after clicking of button */
    historytxtbox.style.display = "none";
}

pawnBtns.forEach((pawnBtn) => { pawnBtn.addEventListener("click",function()
{
    var historytxtbox = document.querySelector("#historytxtbox"); /* txt box that appears after clicking of button */

    if(!clicked)
    {
      clicked = true;
      clickedpawn = true;
      historytxtbox.innerHTML = piecedescriptions[0];
      historytxtbox.classList.add("fadeup");
      historytxtbox.style.display = "block";
    }
    else
    {
        if(clickedpawn)
        {
        clicked = false;
        clickedpawn = false;
        historytxtbox.innerHTML = '';
        historytxtbox.classList.remove("fadeup");
        historytxtbox.style.display = "none";
        }
        else
        {
            historytxtbox.classList.remove("fadeup");

            historytxtbox.innerHTML = '';

            historytxtbox.style.display = "none";
            
            var clone = historytxtbox.cloneNode(true);

            historytxtbox.parentNode.replaceChild(clone,historytxtbox);

            clone.innerHTML = piecedescriptions[0];

            clone.classList.add("fadeup");

            clone.style.display = "block";

            clickedpawn = true;

            clickedhorse = false;

            clickedrook = false;

            clickedbishop = false;

            clickedqueen = false;

            clickedking = false;
        }
    }
  });
});

horseBtns.forEach((horseBtn) => { horseBtn.addEventListener("click",function()
        {
            var historytxtbox = document.querySelector("#historytxtbox"); /* txt box that appears after clicking of button */
        
            if(!clicked)
            {
              clicked = true;
              clickedhorse = true;
              historytxtbox.innerHTML = piecedescriptions[2];
              historytxtbox.classList.add("fadeup");
              historytxtbox.style.display = "block";
            }
            else
            {
                if(clickedhorse)
                {
                clicked = false;
                clickedhorse = false;
                historytxtbox.innerHTML = '';
                historytxtbox.classList.remove("fadeup");
                historytxtbox.style.display = "none";
                }
                else
                {
                    historytxtbox.classList.remove("fadeup");
        
                    historytxtbox.innerHTML = '';
        
                    historytxtbox.style.display = "none";
                    
                    var clone = historytxtbox.cloneNode(true);
        
                    historytxtbox.parentNode.replaceChild(clone,historytxtbox);
        
                    clone.innerHTML = piecedescriptions[2];
        
                    clone.classList.add("fadeup");
        
                    clone.style.display = "block";
        
                    clickedhorse = true;

                    clickedpawn = false;
        
                    clickedrook = false;

                    clickedbishop = false;

                    clickedqueen = false;

                    clickedking = false;
                }
       }
    });
}); 

bishopBtns.forEach((bishopBtn) => { bishopBtn.addEventListener("click",function()
    {
        var historytxtbox = document.querySelector("#historytxtbox"); /* txt box that appears after clicking of button */
    
        if(!clicked)
        {
          clicked = true;
          clickedbishop = true;
          historytxtbox.innerHTML = piecedescriptions[3];
          historytxtbox.classList.add("fadeup");
          historytxtbox.style.display = "block";
        }
        else
        {
            if(clickedbishop)
            {
            clicked = false;
            clickedbishop = false;
            historytxtbox.innerHTML = '';
            historytxtbox.classList.remove("fadeup");
            historytxtbox.style.display = "none";
            }
            else
            {
                historytxtbox.classList.remove("fadeup");
    
                historytxtbox.innerHTML = '';
    
                historytxtbox.style.display = "none";
                
                var clone = historytxtbox.cloneNode(true);
    
                historytxtbox.parentNode.replaceChild(clone,historytxtbox);
    
                clone.innerHTML = piecedescriptions[3];
    
                clone.classList.add("fadeup");
    
                clone.style.display = "block";
    
                clickedbishop = true;

                clickedpawn = false;
    
                clickedrook = false;

                clickedhorse = false;

                clickedqueen = false;

                clickedking = false;
            }
   }
});
}); 

queenBtn.addEventListener("click",function()
{
    var historytxtbox = document.querySelector("#historytxtbox"); /* txt box that appears after clicking of button */

    if(!clicked)
        {
          clicked = true;
          clickedqueen = true;
          historytxtbox.innerHTML = piecedescriptions[4];
          historytxtbox.classList.add("fadeup");
          historytxtbox.style.display = "block";
        }
        else
        {
            if(clickedqueen) /* check if the historytextbox is currently having rook description on it */
            {
            clicked = false;
            clickedqueen = false;
            historytxtbox.innerHTML = '';
            historytxtbox.classList.remove("fadeup");
            historytxtbox.style.display = "none";
            }
            else
            {
                historytxtbox.classList.remove("fadeup");
    
                historytxtbox.innerHTML = '';
    
                historytxtbox.style.display = "none";
                
                var clone = historytxtbox.cloneNode(true);
    
                historytxtbox.parentNode.replaceChild(clone,historytxtbox);
    
                clone.innerHTML = piecedescriptions[4];
    
                clone.classList.add("fadeup");
    
                clone.style.display = "block";
    
                clickedqueen = true;
    
                clickedhorse = false;
    
                clickedpawn = false;
    
                clickedbishop = false;

                clickedrook = false;

                clickedking = false;
            }
        }
});

kingBtn.addEventListener("click",function()
{
    var historytxtbox = document.querySelector("#historytxtbox"); /* txt box that appears after clicking of button */

    if(!clicked)
        {
          clicked = true;
          clickedking = true;
          historytxtbox.innerHTML = piecedescriptions[5];
          historytxtbox.classList.add("fadeup");
          historytxtbox.style.display = "block";
        }
        else
        {
            if(clickedking) /* check if the historytextbox is currently having rook description on it */
            {
            clicked = false;
            clickedking = false;
            historytxtbox.innerHTML = '';
            historytxtbox.classList.remove("fadeup");
            historytxtbox.style.display = "none";
            }
            else
            {
                historytxtbox.classList.remove("fadeup");
    
                historytxtbox.innerHTML = '';
    
                historytxtbox.style.display = "none";
                
                var clone = historytxtbox.cloneNode(true);
    
                historytxtbox.parentNode.replaceChild(clone,historytxtbox);
    
                clone.innerHTML = piecedescriptions[5];
    
                clone.classList.add("fadeup");
    
                clone.style.display = "block";
    
                clickedking = true;
    
                clickedhorse = false;
    
                clickedpawn = false;
    
                clickedbishop = false;

                clickedqueen = false;

                clickedrook = false;
            }
        }
});

rookBtns.forEach((rookbtn) => {
    rookbtn.addEventListener("click",function()
   {

    var historytxtbox = document.querySelector("#historytxtbox"); /* txt box that appears after clicking of button */

    if(!clicked)
    {
      clicked = true;
      clickedrook = true;
      historytxtbox.innerHTML = piecedescriptions[1];
      historytxtbox.classList.add("fadeup");
      historytxtbox.style.display = "block";
    }
    else
    {
        if(clickedrook) /* check if the historytextbox is currently having rook description on it */
        {
        clicked = false;
        clickedrook = false;
        historytxtbox.innerHTML = '';
        historytxtbox.classList.remove("fadeup");
        historytxtbox.style.display = "none";
        }
        else
        {
            historytxtbox.classList.remove("fadeup");

            historytxtbox.innerHTML = '';

            historytxtbox.style.display = "none";
            
            var clone = historytxtbox.cloneNode(true);

            historytxtbox.parentNode.replaceChild(clone,historytxtbox);

            clone.innerHTML = piecedescriptions[1];

            clone.classList.add("fadeup");

            clone.style.display = "block";

            clickedrook = true;

            clickedhorse = false;

            clickedpawn = false;

            clickedbishop = false;

            clickedqueen = false;

            clickedking = false;
        }
     }
    });
 });


 show(1); // by default it shows the first page

/* handles logic for html form */

const QuizContainer = document.querySelector("#QuizContainer");
const FormPage = document.querySelector("#FormPage");
const form = document.querySelector("form");
var answer = document.querySelector("form input");
const submitBtn = document.querySelector("#HideFormBtn");
const backendPage = document.querySelector("#Backend"); 
const errortxt = document.querySelector("#FormPage p");

hideBackend();
function hideBackend()
{
  backendPage.style.display = "none";
}

submitBtn.addEventListener("click",hideForm);

function hideForm()
{
  audio.play();
  if(answer.value == "Queen" || answer.value == "queen")
  {
   FormPage.style.display = "none"; /* hide the form page */
   
   if(body.clientWidth < 480) /* resize Quiz Container in mobile to accomodate for text */
   {
     QuizContainer.style.height = "880px";
   }

   backendPage.style.display = "block"; /* show backendPage */
   
  }
  else
  {
    showError();
  }
}

function showError() 
{
  errortxt.innerHTML = 'Wrong Answer!';
  setTimeout(hideError,500);
}

function hideError() 
{
  errortxt.innerHTML = '';
}

 /* chessboard */
let legalSquares = [];
let isWhiteTurn = true;
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.querySelectorAll(".piece img");
const chessboard = document.querySelector(".chessboard");

setUpBoardSquares();
setUpPieces();

function setUpBoardSquares()
{
  for(let i = 0; i < boardSquares.length; i++)
  {
    /* makes all board squares to be drop zones */
    boardSquares[i].addEventListener("dragover",allowDrop);
    boardSquares[i].addEventListener("drop",drop);
    let row = 8 - Math.floor(i/8);
    let column = String.fromCharCode(97+(i%8));
    let square = boardSquares[i];
    square.id = column + row;
  }
}

function setUpPieces()
{
  for(let i = 0; i<pieces.length;i++)
  {
    /* allows all pieces to be draggable */
    pieces[i].addEventListener("dragstart",drag);
    pieces[i].setAttribute("draggable",true);
    pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
  }
  for(let i = 0;i<piecesImages.length;i++)
  {
    /* ensures that the images of the chess pieces cannot be dragged */
    piecesImages[i].setAttribute("draggable",false);
  }
}

function allowDrop(ev)
{
  ev.preventDefault();
}

function drag(ev)
{
  const piece = ev.target; /* gets piece being dragged */
  const pieceColor = piece.getAttribute("color");
  if(isWhiteTurn && pieceColor == "white" || !isWhiteTurn && pieceColor == "black")
  {
    ev.dataTransfer.setData("text",piece.id); /* this is so that data of piece can be transferred when dropped */
    const startingSquareId = piece.parentNode.id;

    getPossibleMoves(startingSquareId,piece);
  }
}

function drop(ev)
{
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  const piece = document.getElementById(data);
  const destinationSquare = ev.currentTarget;
  let destinationSquareId = destinationSquare.id;
  if(isSquareOccupied(destinationSquare) == "blank" && legalSquares.includes(destinationSquareId) ) /* checks if square that piece is being dropped on is not occupied */
  {
    destinationSquare.appendChild(piece);
    isWhiteTurn = !isWhiteTurn;
    legalSquares.length = 0;
    return;
  }
  if(isSquareOccupied(destinationSquare) != "blank" && legalSquares.includes(destinationSquareId)) /* if square is occupied */
  {
    while(destinationSquare.firstChild)
    {
      destinationSquare.removeChild(destinationSquare.firstChild); /* removes current chess piece on destination square */
    }
    destinationSquare.appendChild(piece);
    isWhiteTurn = !isWhiteTurn;
    legalSquares.length = 0;
    return;
  }
}

function getPossibleMoves(startingSquareId,piece)
 {
  const pieceColor = piece.getAttribute("color");
  if(piece.classList.contains("pawnPiece"))
  {
    getPawnMoves(startingSquareId,pieceColor);
  }
  if(piece.classList.contains("knightPiece"))
  {
    getKnightMoves(startingSquareId,pieceColor);
  }
  if(piece.classList.contains("rookPiece"))
  {
    getRookMoves(startingSquareId,pieceColor);
  }
  if(piece.classList.contains("bishopPiece"))
  {
    getBishopMoves(startingSquareId,pieceColor);
  }
  if(piece.classList.contains("queenPiece"))
  {
    getQueenMoves(startingSquareId,pieceColor);
  }
  if(piece.classList.contains("kingPiece"))
  {
    getKingMoves(startingSquareId,pieceColor);
  }
 }

function isSquareOccupied(square)
{
  if(square != null)
  {
  if(square.querySelector(".piece"))
  {
    const color = square.querySelector(".piece").getAttribute("color");
    return color;
  }else
  {
    return "blank";
  }
  }
  console.log(square);
}

function getPawnMoves(startingSquareId,pieceColor)
{
  checkPawnDiagonalCaptures(startingSquareId,pieceColor);
  checkPawnForwardMoves(startingSquareId,pieceColor);
}

function checkPawnDiagonalCaptures(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNum = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNum;
  let currentSquareId = currentFile + currentRank;
  let currentSquare=document.getElementById(currentSquareId);
  let squareContent = isSquareOccupied(currentSquare);
  var direction = 0;
  if(pieceColor == "white")
  direction = 1;
  else
  direction = -1;
  currentRank += direction;
  for(let i = -1; i <= 1; i+=2)
  {
    currentFile=String.fromCharCode(file.charCodeAt(0)+i);
    if(currentFile >= "a" && currentFile <= "h")
    {
    currentSquareId = currentFile + currentRank;
    currentSquare = document.getElementById(currentSquareId);
    squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent != pieceColor)
    {
      legalSquares.push(currentSquareId);
    }
    }
  }
}

function checkPawnForwardMoves(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNum = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNum;
  let currentSquareId = currentFile + currentRank;
  let currentSquare= document.getElementById(currentSquareId);
  let squareContent = isSquareOccupied(currentSquare);
  var direction = 0;
  if(pieceColor == "white")
  direction = 1;
  else
  direction = -1;
  currentRank += direction;
  currentSquareId = currentFile + currentRank;
  currentSquare = document.getElementById(currentSquareId);
  squareContent = isSquareOccupied(currentSquare);
  if(squareContent != "blank")
  return;
  legalSquares.push(currentSquareId);
  if(rankNum != 2 && rankNum != 7) /* checks if pawn is at starting position (because if pawn is at starting position can move twice) */
  return;
  currentRank += direction;
  currentSquareId = currentFile + currentRank;
  currentSquare = document.getElementById(currentSquareId);
  squareContent = isSquareOccupied(currentSquare);
  if(squareContent != "blank")
  return;
  legalSquares.push(currentSquareId);
}

function getKnightMoves(startingSquareId,pieceColor)
{
  const file = startingSquareId.charCodeAt(0)-97;
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rank;

  const moves = [
    [-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1]
  ];

  moves.forEach((move) => {
    currentFile = file + move[0];
    currentRank = rankNumber + move[1];
    if(currentFile >= 0 && currentFile <= 7 && currentRank > 0 && currentRank <= 8)
    {
      let currentSquareId = String.fromCharCode(currentFile+97)+currentRank;
      let currentSquare = document.getElementById(currentSquareId);
      let squareContent = isSquareOccupied(currentSquare);
      if(squareContent != "blank" && squareContent == pieceColor)
      return;
      legalSquares.push(String.fromCharCode(currentFile+97)+currentRank);
    }
  });
}

function getRookMoves(startingSquareId,pieceColor)
{
  moveToEigthRank(startingSquareId,pieceColor); // check top
  moveToFirstRank(startingSquareId,pieceColor); // check bottom
  moveToAFile(startingSquareId,pieceColor); // check left
  moveToHFile(startingSquareId,pieceColor); // check right
}

function getBishopMoves(startingSquareId,pieceColor)
{
  moveToEighthRankHFile(startingSquareId,pieceColor);
  moveToFirstRankHFile(startingSquareId,pieceColor);
  moveToEighthRankAFile(startingSquareId,pieceColor);
  moveToFirstRankAFile(startingSquareId,pieceColor);
}

function getQueenMoves(startingSquareId,pieceColor)
{
  moveToEigthRank(startingSquareId,pieceColor); // check top
  moveToFirstRank(startingSquareId,pieceColor); // check bottom
  moveToAFile(startingSquareId,pieceColor); // check left
  moveToHFile(startingSquareId,pieceColor); // check right
  moveToEighthRankHFile(startingSquareId,pieceColor);
  moveToFirstRankHFile(startingSquareId,pieceColor);
  moveToEighthRankAFile(startingSquareId,pieceColor);
  moveToFirstRankAFile(startingSquareId,pieceColor);
}

function getKingMoves(startingSquareId,pieceColor)
{
  const file = startingSquareId.charCodeAt(0)-97;
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rank;

  const moves = [
    [0,1],[0,-1],[1,1],[1,-1],[-1,0],[1,-1],[-1,1],[1,0]
  ];

  moves.forEach((move) => {
    currentFile = file + move[0];
    currentRank = rankNumber + move[1];
    if(currentFile >= 0 && currentFile <= 7 && currentRank > 0 && currentRank <= 8)
    {
      let currentSquareId = String.fromCharCode(currentFile+97)+currentRank;
      let currentSquare = document.getElementById(currentSquareId);
      let squareContent = isSquareOccupied(currentSquare);
      if(squareContent != "blank" && squareContent == pieceColor)
      return;
      legalSquares.push(String.fromCharCode(currentFile+97)+currentRank);
    }
  });
}

function moveToEigthRank(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  while(currentRank != 8)
  {
    currentRank++;
    let currentSquareId = file + currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent == pieceColor)
      return;
    legalSquares.push(currentSquareId);
    if(squareContent != "blank" && squareContent != pieceColor)
      return;
  }
  return;
}

function moveToFirstRank(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  while(currentRank != 1)
  {
    currentRank--;
    let currentSquareId = file + currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent == pieceColor)
      return;
    legalSquares.push(currentSquareId);
    if(squareContent != "blank" && squareContent != pieceColor)
      return;
  }
  return;
}

function moveToAFile(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  let currentFile = file;
  while(currentFile != "a")
  {
    currentFile = String.fromCharCode(currentFile.charCodeAt(currentFile.length-1)-1);
    let currentSquareId = currentFile + rank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent == pieceColor)
      return;
    legalSquares.push(currentSquareId);
    if(squareContent != "blank" && squareContent != pieceColor)
      return;
  }
  return;
}

function moveToHFile(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  let currentFile = file;
  while(currentFile != "h")
  {
    currentFile = String.fromCharCode(currentFile.charCodeAt(currentFile.length-1)+1);
    let currentSquareId = currentFile + rank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent == pieceColor)
      return;
    legalSquares.push(currentSquareId);
    if(squareContent != "blank" && squareContent != pieceColor)
      return;
  }
  return;
}

function moveToEighthRankAFile(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let currentFile = file;
  while(!(currentRank == "a" || currentRank == 8))
  {
    currentFile = String.fromCharCode(currentFile.charCodeAt(currentFile.length-1)-1);
    currentRank++;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent == pieceColor)
      return;
    legalSquares.push(currentSquareId);
    if(squareContent != "blank" && squareContent != pieceColor)
      return;
  }
}

function moveToEighthRankHFile(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let currentFile = file;
  while(!(currentRank == "h" || currentRank == 8))
  {
    currentFile = String.fromCharCode(currentFile.charCodeAt(currentFile.length-1)+1);
    currentRank++;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent == pieceColor)
      return;
    legalSquares.push(currentSquareId);
    if(squareContent != "blank" && squareContent != pieceColor)
      return;
  }
}

function moveToFirstRankAFile(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let currentFile = file;
  while(!(currentRank == "a" || currentRank == 1))
  {
    currentFile = String.fromCharCode(currentFile.charCodeAt(currentFile.length-1)-1);
    currentRank--;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent == pieceColor)
      return;
    legalSquares.push(currentSquareId);
    if(squareContent != "blank" && squareContent != pieceColor)
      return;
  }
}

function moveToFirstRankHFile(startingSquareId,pieceColor)
{
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  let currentFile = file;
  while(!(currentRank == "h" || currentRank == 1))
  {
    currentFile = String.fromCharCode(currentFile.charCodeAt(currentFile.length-1)+1);
    currentRank--;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if(squareContent != "blank" && squareContent == pieceColor)
      return;
    legalSquares.push(currentSquareId);
    if(squareContent != "blank" && squareContent != pieceColor)
      return;
  }
 }
