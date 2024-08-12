const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const hamBtn = document.querySelector("#hamicon");
const hamMenu_ul = document.querySelector("nav ul");
var pages = document.querySelectorAll(".page");

console.log(pages);

// Show 1 by default
HideAll()
window.onload = Show(1)

// add event listeners
page1btn.addEventListener("click", function () { Show(1); });
page2btn.addEventListener("click", function () { Show(2); });
page3btn.addEventListener("click", function () { Show(3); });

hamBtn.addEventListener("click", ToggleMenu);

// functions
function HideAll() {
  for (let p of pages) {
    p.style.display = "none";
  }
}

function Show(pgno) {
  HideAll();
  let p = document.querySelector("#page" + pgno);
  p.style.display = "block";
}

function ToggleMenu() {
  if (hamMenu_ul.style.display == "block")
    hamMenu_ul.style.display = "none";
  else hamMenu_ul.style.display = "block";
}

const submitbtn = document.querySelector("#submitbtn");
submitbtn.addEventListener("click", function() {Show(4);});
