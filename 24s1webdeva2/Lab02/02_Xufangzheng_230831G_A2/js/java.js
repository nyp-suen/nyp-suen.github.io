// alert("Hi");

//the noraml const of selectors
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");

const left_content = document.querySelectorAll(".Left_Content p");
const Description = document.querySelectorAll(".Description div");
const mobile = document.querySelectorAll(".Mobile_nav ul li");

const main = document.querySelectorAll(".main .Content");
const content_normal = document.querySelectorAll(".Rightnav ul li");

// for (let i = 0; i < main.length; i++) {
// 	mobile[i].addEventListener("click", function() {
// 		selection(mobile, main, i, 'flex');
// 		mobile[i].classList.remove("selected");
// 	});

// 	content_normal[i].addEventListener("click", function() {
// 		selection(content_normal, main, i, 'flex');
// 		content_normal[i].classList.remove("selected");
// 	});
// }

//due to js validator i need to maually do the hove effects
{
    mobile[0].addEventListener("click", function () {
        selection(mobile, main, 0, 'flex');
        mobile[0].classList.remove("selected");
    });

    mobile[1].addEventListener("click", function () {
        selection(mobile, main, 1, 'flex');
        mobile[1].classList.remove("selected");
    });

    mobile[2].addEventListener("click", function () {
        selection(mobile, main, 2, 'flex');
        mobile[2].classList.remove("selected");
    });

    content_normal[0].addEventListener("click", function () {
        selection(content_normal, main, 0, 'flex');
        content_normal[0].classList.remove("selected");
    });

    content_normal[1].addEventListener("click", function () {
        selection(content_normal, main, 1, 'flex');
        content_normal[1].classList.remove("selected");
    });

    content_normal[2].addEventListener("click", function () {
        selection(content_normal, main, 2, 'flex');
        content_normal[2].classList.remove("selected");
    });
}

// function hideall() { //function to hide all pages
// 	for (let onepage of Description) { //go through all subtopic pages
// 		onepage.style.display = "none"; //hide it
// 	}
// }

//to do showing of area which is selected
function selection(content_bar, Desc, pgno, styling) {
    for (var i = 0; i < content_bar.length; i++) {
        console.log(pgno);
        console.log(i);
        //if pgno is same as i then mean choosen
        if (pgno == i) {

            content_bar[i].classList.remove("none");
            content_bar[i].classList.add("selected");
            Desc[i].classList.add('active');
            Desc[i].style.display = styling;
            // Desc[i].classList.remove('Sector');
            // Desc[i].classList.add('Sector_Selected');
        } else {
            //else remove
            content_bar[i].classList.remove("selected");
            content_bar[i].classList.add("none");
            Desc[i].classList.remove('active');
            if (Desc[i] == Description[i]) {
                Desc[i].style.display = 'hidden';
            }
            else {
                Desc[i].style.display = 'none';
            }

            // Desc[i].classList.remove('Sector_Selected');
            // Desc[i].classList.add('Sector');
        }
    }
}

// function hover(hover, change) {
// 	for (let i = 0; i < hover.length; i++) {

// 		hover[i].addEventListener('mouseover', function() {
// 			hover[i].classList.add(change);

// 		});

// 		hover[i].addEventListener('mouseout', function() {
// 			hover[i].classList.remove(change);

// 		});
// 	}
// }

//hover for leftcontent(js validation does not like for loops)
{
    left_content[0].addEventListener('mouseover', function () {
        left_content[0].classList.add('hover');
    });

    left_content[0].addEventListener('mouseout', function () {
        left_content[0].classList.remove('hover');
    });

    left_content[1].addEventListener('mouseover', function () {
        left_content[1].classList.add('hover');
    });

    left_content[1].addEventListener('mouseout', function () {
        left_content[1].classList.remove('hover');
    });


    left_content[2].addEventListener('mouseover', function () {
        left_content[2].classList.add('hover');
    });

    left_content[2].addEventListener('mouseout', function () {
        left_content[2].classList.remove('hover');
    });

    left_content[3].addEventListener('mouseover', function () {
        left_content[3].classList.add('hover');
    });

    left_content[3].addEventListener('mouseout', function () {
        left_content[3].classList.remove('hover');
    });

}

//hover for phone
{
    mobile[0].addEventListener('mouseover', function () {
        mobile[0].classList.add('hover');
    });

    mobile[0].addEventListener('mouseout', function () {
        mobile[0].classList.remove('hover');
    });

    mobile[1].addEventListener('mouseover', function () {
        mobile[1].classList.add('hover');
    });

    mobile[1].addEventListener('mouseout', function () {
        mobile[1].classList.remove('hover');
    });


    mobile[2].addEventListener('mouseover', function () {
        mobile[2].classList.add('hover');
    });

    mobile[2].addEventListener('mouseout', function () {
        mobile[2].classList.remove('hover');
    });

}

// document.addEventListener('DOMContentLoaded', function() {
// 	hover(left_content, 'hover');
// });

// document.addEventListener('DOMContentLoaded', function() {
// 	hover(mobile, 'hover');
// });

//when click turn the description into block
page1btn.addEventListener("click", function () {
    selection(left_content, Description, 0, 'block');
});

page2btn.addEventListener("click", function () {
    selection(left_content, Description, 1, 'block');
});

page3btn.addEventListener("click", function () {
    selection(left_content, Description, 2, 'block');
});

page4btn.addEventListener("click", function () {
    selection(left_content, Description, 3, 'block');
});


// const Slider = document.querySelectorAll('background');
// var slider_index;

// function Initial() {

// }
const nav = document.querySelector('.topnav');

const hamberger_menu = document.querySelector(".Hamberger_menu");
const mobile_nav = document.querySelector(".Mobile_nav");

function MenuColorChange() {
    //change the color
    window.addEventListener('scroll', function () {
        IfScroll(nav);
    });
    window.addEventListener('resize', check);
}

function IfScroll(navigation) {
    //if window is scroll make nav solid
    if (window.scrollY > 0) {
        navigation.classList.add('solid-bg');
    }
    // else if (window.scrollY <= 0 && window.innerWidth < 800 && !mobile_nav.classList.contains('Sector')) {

    // }
    //if this happen do nothing
    else if (mobile_nav.classList.contains('Sector') == false && window.innerWidth < 800) {

    }
    //else remove the solid make it hollow
    else {
        navigation.classList.remove('solid-bg');
    }
}


// mobile_nav.classList.contains('Sector');

function Show_menu() {

    //if menue pressed the nav solid
    if (mobile_nav.classList.contains('Sector') == true) {
        mobile_nav.classList.remove('Sector');
        nav.classList.add('solid-bg');
        //else the hamberger menu is not pressed
    } else if (mobile_nav.classList.contains('Sector') == false) {
        mobile_nav.classList.add('Sector');
        //and also its not scrolled
        if (window.scrollY <= 0) {
            nav.classList.remove('solid-bg');
        }
        // nav.classList.remove('solid-bg');
    }

    // if(mobile_nav.style.display == 'none'){
    //     mobile_nav.style.display = 'flex';
    // }
    // else if(mobile_nav.style.display == 'flex'){
    //     mobile_nav.style.display = 'none';
    // }

}

function check() {
    if (window.scrollY > 0 || (window.innerWidth < 800 && !(mobile_nav.classList.contains('Sector')))) {
        nav.classList.add('solid-bg');
    } else {
        nav.classList.remove('solid-bg');
    }
}

const cards = document.querySelectorAll(".cards");
const inners = document.querySelectorAll(".cards_inner");
const front = document.querySelectorAll(".cards_front");
const back = document.querySelectorAll(".cards_back");

//need for js validation
for (let i = 0; i < cards.length; i++) {
    (function (i) {
        //when pressed flip the card 180
        cards[i].addEventListener('click', function () {
            //if statment if it fliped or not
            if (inners[i].style.transform == 'rotateY(180deg)') {
                //to change the opicity
                inners[i].style.transform = 'rotateY(0deg)';
                back[i].style.opacity = "0";
                back[i].style.display = 'none';
                front[i].style.opacity = "1";
            } else {
                inners[i].style.transform = 'rotateY(180deg)';
                back[i].style.opacity = "1";
                front[i].style.opacity = "0.5";
                back[i].style.display = 'block';
            }
        });
    })(i);
}

const guess = document.querySelector('#guess');
const diff = document.querySelector('#diff');
const quiz_button = document.querySelector('#quiz_button');
const form = document.querySelector('.Form');
const result = document.querySelector('.result');
const reset_button = document.querySelector('#Reset');
const quiz_sfx = document.querySelectorAll('.guess_sfx > audio');

function quiz_answer() {
    //see the difrentce
    let diffrence = 1804 - (1.0 * guess.value);
    //if no diffrence you correct
    if (diffrence == 0) {
        //play a sound
        quiz_sfx[0].play();
        diff.innerHTML = "You are Correct";
    }
    //higher
    else if (diffrence > 0) {
        //play a sound
        quiz_sfx[1].play();
        diff.innerHTML = "You are " + diffrence + " years more";
    }
    //lower
    else if (diffrence < 0) {
        quiz_sfx[1].play();
        diff.innerHTML = "You are " + Math.abs(diffrence) + " years less";
    }
}

quiz_button.addEventListener('click', function (event) {
    //so no refreash page when submit
    event.preventDefault();
    quiz_answer();
    form.style.display = 'none';
    result.style.display = 'flex';
});

reset_button.addEventListener('click', function () {
    // Reset value
    guess.value = "0";
    // change back
    result.style.display = 'none';
    form.style.display = 'block';
});

const sound = document.querySelectorAll(".panel > audio");
const soundbuttomn = document.querySelectorAll(".controll_button");
for (let i = 0; i < sound.length; i++) {
    (function (i) {
        //music play to button press
        soundbuttomn[i].addEventListener('click', function () {
            if (!sound[i].paused) {
                sound[i].pause();
                //reset sound to zero
                sound[i].currentTime = 0;
                soundbuttomn[i].classList.remove('playing');
            } else {
                sound[i].play();
                soundbuttomn[i].classList.add('playing');
            }
        });
    })(i);

}

let slider_index = 0;
show_pic(slider_index);

function plus_pic() {
    slider_index++;
    show_pic(slider_index);
}

// function current_pic(n){
//     show_pic(slider_index = n);
// }

function show_pic(n) {
    //change the slides
    let i;
    let backgrounds = document.querySelectorAll('.background-image-container img');

    //if max go to 0
    if (n >= backgrounds.length) {
        slider_index = 0;
    }

    //if go negative go to top
    if (n < 0) {
        slider_index = backgrounds.length - 1;
    }

    //remove everything
    for (i = 0; i < backgrounds.length; i++) {
        backgrounds[i].classList.remove('background-Selected');
    }
    console.log(slider_index);
    //add it only to the one which is selected
    backgrounds[slider_index].classList.add('background-Selected');

}

setInterval(plus_pic, 6000); // Change image every 6 seconds

document.addEventListener('DOMContentLoaded', check);
document.addEventListener('DOMContentLoaded', MenuColorChange);
hamberger_menu.addEventListener('click', Show_menu);
