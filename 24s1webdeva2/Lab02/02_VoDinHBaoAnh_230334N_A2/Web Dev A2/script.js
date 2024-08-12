var container = document.querySelector('.main-nav')
var button = document.querySelector('.nav-toggle')

button.addEventListener('click', () => {

    /* Toggle navigation bar animation*/
  if (!container.classList.contains('active')) {
    /* Navigation sliding up*/
    /** Show the container. */
    container.classList.add('active')
    container.style.height = "auto"

    /** Get the computed height of the container. */
    var height = container.clientHeight + "px"

    /** Set the height of the content as 0px, */
    container.style.height = "0px"

    /** Do this after the 0px has applied. */
    setTimeout(() => {
      container.style.height = height
    }, 0)
  } 
  
  else {
    /* Navigation sliding Down*/
    /** Set the height as 0px to trigger the slide up animation. */
    container.style.height = "0px"

    /** Remove the `active` class when the animation ends. */
    container.addEventListener('transitionend', () => {
      container.classList.remove('active')
    }, {
      once: true
    })
  }


})

// Select all map markers and tooltips
const mapMarkers = document.querySelectorAll('.map-marker');
const tooltips = document.querySelectorAll('.tooltip');

// Function to close all tooltips except the one that is clicked
function closeAllTooltipsExcept(clickedIndex) {
    tooltips.forEach((tooltip, index) => {
        if (index !== clickedIndex && tooltip.classList.contains('active')) {
            tooltip.classList.remove('active');
            mapMarkers[index].classList.remove('active');
        }
    });
}

// Add click event listeners to each map marker
mapMarkers.forEach((marker, index) => {
    marker.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from propagating to document

        // Toggle active class for the clicked marker and its corresponding tooltip
        marker.classList.toggle('active');
        tooltips[index].classList.toggle('active');

        // Close all other tooltips except the clicked one
        closeAllTooltipsExcept(index);
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', (event) => {
        // Check if the click target is not the current marker or its tooltip
        if (!marker.contains(event.target)) {
            tooltips[index].classList.remove('active');
            marker.classList.remove('active');
        }
    });

    // For touch devices, close tooltip when tapping outside
    document.addEventListener('touchstart', (event) => {
        // Check if the touch target is not the current marker or its tooltip
        if (!marker.contains(event.target)) {
            tooltips[index].classList.remove('active');
            marker.classList.remove('active');
        }
    });
});




var myIndex = 0;
var imageTimeInterval = 4000; // Time between image change in milliseconds
AutoSlideshow();

function AutoSlideshow() {
  var i;
  var x = document.getElementsByClassName("auto_slide_image");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(AutoSlideshow, imageTimeInterval); 
}


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("manual_slide_text");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

