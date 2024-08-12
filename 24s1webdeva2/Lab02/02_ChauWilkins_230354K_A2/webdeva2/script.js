/* jshint esversion: 6 */

// hamburger menu code
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
	hamMenu.classList.toggle("active"); // toggles the span from hamburger symbol to X
	offScreenMenu.classList.toggle("active"); // toggles the menu sliding from off screen
});

// japanese music history code
const japaneseHistory = document.getElementById("japaneseHistory");
const historyTabs = japaneseHistory.querySelectorAll("ul li");
const historyBackground = japaneseHistory.querySelector("div");

//changes what they are displaying based on tab
let historyIndex = 0;
const historyBackgroundImages = [
    "images/Taiko_drum.jpg",
    "images/arrivalOfWesternMusic.jpg",
    "images/modernMusic.jpg"
];

const historyContent = [
    `Traditional Japanese music is the folk or traditional music of Japan.<br><br>
    Japan's Ministry of Education classifies hōgaku (邦楽, lit. 'Japanese music')
     as a category separate from other traditional forms of music, such as gagaku 
     (court music) or shōmyō (Buddhist chanting), but most ethnomusicologists view 
     hōgaku, in a broad sense, as the form from which the others were derived.<br><br>
     Outside of ethnomusicology, however, hōgaku usually refers to Japanese music 
     from around the 17th to the mid-19th century.
     Within this framework, there are three types of traditional music in Japan: theatrical, court music, and 
     instrumental.`,

    `Due to the effects of westernization, western music has influenced many 
     musical cultures around the world.<br><br>
     Japan's unique music styles were impacted by this phenomenon prior to the Second World War.
     Japan's traditional melodic and instrumental music is now less popular than the emergent genres, such as 
     J-Rock and J-Pop.
     The westernization of Japan has also included the increase of the English language and guitars in musical composition.`,

    `In the modern days, Japan enjoys music such as J-Pop and Idol music.<br><br><h1>J-Pop</h1>
     J-pop, an abbreviation for Japanese pop is a loosely defined musical genre that entered 
     the musical mainstream of Japan in the 1990s.
     J-pop has its roots in 1960s pop and rock music, such as the Beatles, which 70s rock bands fused rock with 
     Japanese music.
     J-pop was further defined by Japanese new wave bands such as Southern All Stars in the late 1970s.<br><br><h1>Idol Music</h1>
     Japanese idol musical artists are a significant part of the market, with girl groups and boy bands regularly 
     topping the singles chart.
     These include boy band Arashi, which had the best-selling singles of 2008 and 2009, and girl group AKB48, which have had 
     the best-selling singles each year of the 2010s.`
];

// initialise innerHTML
historyBackground.innerHTML = historyContent[0];


// Function to change the background image with animation + transition
function changeBackgroundImage(index) {
    // add fade-out transition
    historyBackground.classList.add("fade-out");

    setTimeout(() => {
    // reflow by reading a property before changing the background image
	void historyBackground.offsetHeight; // This forces the reflow

    // Before changing the background image, trigger a reflow
    historyBackground.style.backgroundImage = 'radial-gradient(circle, rgba(0, 0, 0, 0.4), rgba(0,0,0,0.9)), url("' + historyBackgroundImages[index] + '")';

    //remove fade-out and add fade-in
    historyBackground.classList.remove("fade-out");
    historyBackground.classList.add("fade-in");
    historyBackground.innerHTML = historyContent[index];

    }, 500); // set duration based on transition duration
}

//changes the tab
historyTabs.forEach(function(tab, index) {
    tab.addEventListener("click", function() {
        historyTabs[historyIndex].classList.remove("active");
        historyIndex = index;
        historyTabs[historyIndex].classList.add("active");


        changeBackgroundImage(historyIndex);
    });
});

// remove the fade-in class after the transition ends to reset for next transition
historyBackground.addEventListener('transitionend', function() {
    historyBackground.classList.remove('fade-in');
});

// music playlist code initialisation
const leftButton = document.querySelector(".leftButton");
const rightButton = document.querySelector(".rightButton");
const audio = document.querySelector("#musicAudio");
const audioSource = document.querySelector("#audioSource");
const musicTitle = document.querySelector("#musicTitle");
const musicThumbnail = document.querySelector("#musicThumbnail");
const musicIndexDiv = document.getElementById('musicIndex');
const musicIndexChildren = musicIndexDiv.querySelectorAll('span');
const musicBackground = document.querySelector(".musicPlaylistContainer");
const audioLinks = ["audios/IntoTheNight.mp3", "audios/ComparedChild.mp3", "audios/Lemon.mp3", "audios/Fukakouryoku.mp3", "audios/GoodbyeDeclaration.mp3"];
const audioTitles = ["YOASOBI - Into The Night「夜に駆ける」", "TUYU - Compared Child「くらべられっ子」", "Kenshi Yonezu - Lemon", "Vaundy - Fukakouryoku「不可幸力」", "Chinozo - Goodbye Declaration feat. flower"];
const audioThumbnails = ["images/IntoTheNight.jpeg", "images/ComparedChild.jpg", "images/Lemon.jpg", "images/Fukakouryoku.jpeg", "images/GoodbyeDeclaration.jpg"];
const audioBackgroundColour = ["rgba(246, 87,117, 0.5)", "rgba(203,223,234, 0.5)", "rgba(91, 99, 99, 0.5)", "rgba(173,251,251, 0.5)", "rgba(253,223,150, 0.5)"];
const audioBackgroundShadow = ["0 0 15px 30px rgba(246, 87,117, 0.5)", "0 0 15px 30px rgba(203,223,234, 0.5)", "0 0 15px 30px rgba(91, 99, 99, 0.5)", "0 0 15px 30px rgba(173,251,251, 0.5)", "0 0 15px 30px rgba(253,223,150, 0.5)", ];
let playlistIndex = 0;

leftButton.addEventListener("click", function() {
	changeAudio(playlistIndex - 1); //shift song to left
});
rightButton.addEventListener("click", function() {
	changeAudio(playlistIndex + 1); // shift song to right
});
musicIndexChildren.forEach(function(child, index) {
    child.addEventListener("click", function() {
        changeAudio(index); //change song depending on the circle they clicked
    });
});

function changeAudio(num) {

    //make prev song inactive
	musicIndexChildren[playlistIndex].classList.remove("active");
    //set new index for song
    playlistIndex = num;

	// Ensure the index stays within bounds
	if(playlistIndex < 0) {
		playlistIndex = audioLinks.length - 1; // wrap around to the last audio
	} else if(playlistIndex >= audioLinks.length) {
		playlistIndex = 0; // wrap around to the first audio
	}

	// Temporarily remove the animation class to re-trigger it
	musicThumbnail.classList.remove("music-thumbnail-animation");
	void musicThumbnail.offsetWidth; // Trigger reflow
	musicThumbnail.classList.add("music-thumbnail-animation");
	musicThumbnail.style.backgroundImage = 'url(' + audioThumbnails[playlistIndex] + ')';

	audioSource.src = audioLinks[playlistIndex]; //set new audio source
	audio.load(); // reload the audio element to apply the new source
	audio.play(); // play the new audio

	//changes music title and thumbnail and background
	musicTitle.textContent = audioTitles[playlistIndex];
	musicIndexChildren[playlistIndex].classList.add("active");
	musicBackground.style.backgroundColor = audioBackgroundColour[playlistIndex];
	musicBackground.style.boxShadow = audioBackgroundShadow[playlistIndex];
}

// music quiz/survey code
const surveyButton = document.querySelector("#musicSurvey button");
const musicSurvey = document.getElementById("musicSurvey");
const musicResult = document.getElementById("musicResult");

surveyButton.addEventListener("click", function submitSurvey()
{
    const radios = document.getElementsByName('song');
    let selectedValue;
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    if (selectedValue) {
        //makes the question fade into nothing for 0.5s
        musicSurvey.classList.add('fade-out');
        setTimeout(() => {
            musicSurvey.style.display = 'none';
            musicResult.style.display = 'grid';
        }, 500);

        setTimeout(() => {
            //makes the results pop out
            musicResult.classList.add('fade-in');

            // Increase the width of the spans
            document.getElementById('song1Bar').style.width = 'calc(80% * 276 / 870)';
            document.getElementById('song2Bar').style.width = 'calc(80% * 52.2 / 870)';
            document.getElementById('song3Bar').style.width = '80%';
            document.getElementById('song4Bar').style.width = 'calc(80% * 106 / 870)';
            document.getElementById('song5Bar').style.width = 'calc(80% * 132 / 870)';
			
			let musicAnswer = document.createElement("div");
			musicAnswer.id = "musicAnswer";
			musicResult.appendChild(musicAnswer);
			//cases for what option they choose
			switch (selectedValue) {
				case 'Song 1':
					musicAnswer.innerHTML = "Views are sourced from YouTube (17 July 2024).<br>❌ That's Wrong!<br><br>Fun fact: This song sparked popularity known for its upbeat yet dark lyrics. Not to mention, YOASOBI held a concert in Singapore on 12 Jan 2024! (I was lucky enough to be there >w<)";
					break;
				case 'Song 2':
					musicAnswer.innerHTML = "Views are sourced from YouTube (17 July 2024).<br>❌ That's Wrong!<br><br>Not so fun fact: TUYU had unfortunately disbanded on June 2024. :(<br>Their songs are well known in the rhythm game community.";
					break;
				case 'Song 3':
					musicAnswer.innerHTML = "Views are sourced from YouTube (17 July 2024).<br>&#x2705; That's Correct!<br><br>Fun fact: Kenshi Yonezu is also known to produce Anime Openings, with the most recent being Kick Back for Chainsaw Man!";
					break;
				case 'Song 4':
					musicAnswer.innerHTML = "Views are sourced from YouTube (17 July 2024).<br>❌ That's Wrong!<br><br>Fun fact: One of Vaundy's songs had peaked to #2 on Billboard Japan Hot 100.";
					break;
				case 'Song 5':
					musicAnswer.innerHTML = "Views are sourced from YouTube (17 July 2024).<br>❌ That's Wrong!<br><br>Fun fact: This song is the first Vocaloid song to reach 100M views on Youtube, and is currently the most popular Vocaloid song.";
					break;
			}
		}, 850);
    }


});

let colourIndex = 0;
const wotageiColourSpan = document.querySelectorAll("#wotageiSettings span");
for(let i = 0; i < wotageiColourSpan.length; i++) {
	wotageiColourSpan[i].index = i; //funny thing is I have to give them index attribute for them to work
}
const wotageiArea = document.querySelector("#wotageiArea");
const rect = wotageiArea.getBoundingClientRect(); //defines the boundaries of where the trail can go
const fixedRect = {
	top: rect.top + window.scrollY,
	right: rect.right + window.scrollX,
	bottom: rect.bottom + window.scrollY,
	left: rect.left + window.scrollX
};
const circles = document.querySelectorAll(".glow"); //circle init
const coords = {
	x: undefined,
	y: undefined
};
const velocity = {
	x: 0,
	y: 0
};
let isMobile = false;
if(window.innerWidth <= 800) { // boolean to enable mobile actions (easier to read as well)
	isMobile = true;
}
if(isMobile) {
	coords.x = window.innerWidth / 2;
	coords.y = rect.height / 2 + fixedRect.top;
} else {
	coords.x = 0;
	coords.y = 0;
}
//all the colour gradients
const colours = [
	[ //red
		"#ff6666", "#fc6463", "#f86160", "#f55f5e", "#f25c5b", "#ee5a58", "#eb5855", "#e85553", "#e45350", "#e1514d", "#de4e4b", "#da4c48", "#d74a46", "#d44743", "#d04540", "#cd433e", "#ca403b", "#c73e39", "#c33b36", "#c03934", "#bd3731", "#ba342f", "#b6322c", "#b32f2a", "#b02d27", "#ad2b25", "#a92822", "#a62620", "#a3231d", "#a0201b", "#9c1e19", "#991b16", "#961814", "#931511", "#90120f", "#8d0f0c", "#890b0a", "#860706", "#830303", "#800000"
	],
	[ // orange
		"#ffc966", "#ffc764", "#ffc661", "#ffc45f", "#ffc25c", "#ffc15a", "#ffbf57", "#febd55", "#febc53", "#feba50", "#feb84e", "#feb64b", "#feb549", "#feb347", "#feb144", "#feaf42", "#feae40", "#feac3d", "#feaa3b", "#fea839", "#fea636", "#fea434", "#fea331", "#fea12f", "#fe9f2d", "#fe9d2a", "#fe9b28", "#fe9925", "#fe9723", "#fe9520", "#ff931e", "#ff911b", "#ff8f18", "#ff8d15", "#ff8b12", "#ff890f", "#ff870b", "#ff8407", "#ff8204", "#ff8000"
	],
	[ //yellow
		"#ffff66", "#fffd64", "#fffb61", "#fffa5f", "#fff85d", "#fff65a", "#fff458", "#fff356", "#fff153", "#ffef51", "#ffed4f", "#ffeb4d", "#ffea4a", "#ffe848", "#ffe646", "#ffe443", "#ffe241", "#ffe13f", "#ffdf3d", "#ffdd3a", "#ffdb38", "#ffd936", "#ffd733", "#ffd531", "#ffd42f", "#ffd22c", "#ffd02a", "#ffce27", "#ffcc25", "#ffca22", "#ffc820", "#ffc61d", "#ffc51a", "#ffc317", "#ffc114", "#ffbf11", "#ffbd0d", "#ffbb08", "#ffb904", "#ffb700"
	],
	[ //green
		"#66ff66", "#69ff64", "#6cff62", "#6fff61", "#72ff5f", "#75ff5d", "#78ff5b", "#7bff59", "#7dff57", "#80ff56", "#83ff54", "#86ff52", "#88ff50", "#8bff4e", "#8eff4c", "#90ff4a", "#93ff48", "#96ff46", "#98ff44", "#9bff42", "#9dff40", "#a0ff3e", "#a2ff3b", "#a5ff39", "#a7ff37", "#aaff35", "#acff32", "#afff30", "#b1ff2d", "#b4ff2b", "#b6ff28", "#b9ff25", "#bbff22", "#bdff1f", "#c0ff1b", "#c2ff17", "#c5ff13", "#c7ff0e", "#caff07", "#ccff00"
	],
	[ //cyan
		"#66ffde", "#5bfddf", "#50fae1", "#43f8e3", "#33f5e4", "#1df3e6", "#00f0e8", "#00eeea", "#00ebec", "#00e8ed", "#00e5ef", "#00e2f0", "#00dff1", "#00dbf2", "#00d8f2", "#00d5f3", "#00d2f3", "#00cff3", "#00cbf3", "#00c8f3", "#00c5f4", "#00c2f4", "#00bff4", "#00bcf4", "#00b9f4", "#00b6f4", "#00b3f4", "#00b0f4", "#00adf4", "#00a9f5", "#00a6f5", "#00a3f6", "#00a0f8", "#009cf9", "#0099fb", "#0095fe", "#0090ff", "#008cff", "#0088ff", "#0084ff"
	],
	[ //blue
		"#3347ff", "#3245fa", "#3143f6", "#3042f1", "#2f40ed", "#2e3ee8", "#2c3ce4", "#2b3bdf", "#2a39db", "#2937d7", "#2836d2", "#2734ce", "#2532c9", "#2431c5", "#232fc1", "#222dbd", "#202cb8", "#1f2ab4", "#1e28b0", "#1c27ac", "#1b25a7", "#1a24a3", "#18229f", "#17209b", "#161f97", "#141d93", "#131c8f", "#111a8b", "#101987", "#0e1783", "#0c167f", "#0b147b", "#091377", "#071173", "#06106f", "#050f6b", "#030d67", "#020c64", "#010a60", "#00095c"
	],
	[ //purple
		"#6666ff", "#6664fc", "#6562fa", "#655ff7", "#645df4", "#645bf2", "#6359ef", "#6357ed", "#6254ea", "#6252e7", "#6150e5", "#614ee2", "#604bdf", "#6049dd", "#5f47da", "#5f45d8", "#5e42d5", "#5e40d2", "#5d3ed0", "#5c3ccd", "#5c39ca", "#5b37c8", "#5a35c5", "#5a32c3", "#5930c0", "#582ebd", "#572bbb", "#5729b8", "#5626b5", "#5523b3", "#5421b0", "#541eae", "#531bab", "#5218a8", "#5115a6", "#5011a3", "#500da1", "#4f099e", "#4e049c", "#4d0099"
	],
	[ //pink
		"#ff66ff", "#fe64fc", "#fe62f9", "#fd60f6", "#fd5ef3", "#fc5cf0", "#fc5aed", "#fb58eb", "#fa56e8", "#fa54e5", "#f951e2", "#f84fdf", "#f74ddc", "#f64bd9", "#f649d6", "#f547d4", "#f445d1", "#f343ce", "#f241cb", "#f13ec8", "#f03cc5", "#ef3ac3", "#ee38c0", "#ed35bd", "#ec33ba", "#eb31b8", "#ea2eb5", "#e92cb2", "#e829af", "#e727ad", "#e624aa", "#e521a7", "#e41ea5", "#e21ba2", "#e1189f", "#e0149d", "#df109a", "#de0b97", "#dc0595", "#db0092"
	]
];
circles.forEach(function(circle, index) { //set the position to center of area for mobile, offscreen for desktop
	if(isMobile) {
		circle.x = coords.x;
		circle.y = coords.y;
	} else {
		circle.x = 0;
		circle.y = 0;
	}
	circle.style.backgroundColor = colours[colourIndex][index % 40];
	circle.style.boxShadow = "0 0 15px 7px " + colours[colourIndex][index % 40];
});

function changeColour(num) { //change colour when user clicks on a new colour
	colourIndex = num;
	circles.forEach(function(circle, index) {
		circle.style.backgroundColor = colours[colourIndex][index % 40];
		circle.style.boxShadow = "0 0 15px 7px " + colours[colourIndex][index % 40];
	});
}
wotageiColourSpan.forEach(function(colourObject) {
	colourObject.addEventListener("click", function() {
		changeColour(colourObject.index);
	});
});

const buttons = document.querySelectorAll("#wotageiMovements div");
//move circle stuff [desktop]
if(!isMobile) {
	//move based on cursor location
	wotageiArea.addEventListener("mousemove", function(e) {
		coords.x = e.clientX;
		coords.y = e.clientY + window.scrollY;
	});
} //mobile version
else {
	buttons.forEach(function(button) {
		let holdInterval;
		button.addEventListener("touchstart", function(e) {
			e.preventDefault(); // Prevent text selection and default behavior
			holdInterval = setInterval(function() {
				// Trigger continuous hold action
				console.log(coords.y);
				// increase velocity leftwards
				if(button.getAttribute("data-direction") === "top-left" || button.getAttribute("data-direction") === "left" || button.getAttribute("data-direction") === "bottom-left") {
					velocity.x -= 2;
				}
				//rightwards
				else if(button.getAttribute("data-direction") === "top-right" || button.getAttribute("data-direction") === "right" || button.getAttribute("data-direction") === "bottom-right") {
					velocity.x += 2;
				}
				// increase velocity upwards
				if(button.getAttribute("data-direction") === "top-left" || button.getAttribute("data-direction") === "up" || button.getAttribute("data-direction") === "top-right") {
					velocity.y -= 2;
				}
				//downwards
				else if(button.getAttribute("data-direction") === "bottom-left" || button.getAttribute("data-direction") === "down" || button.getAttribute("data-direction") === "bottom-right") {
					velocity.y += 2;
				}
				//stops the circles from going off the area
				if(coords.x + velocity.x > fixedRect.right) {
					velocity.x = 0;
					coords.x = fixedRect.right;
				} else if(coords.x + velocity.x < fixedRect.left) {
					velocity.x = 0;
					coords.x = fixedRect.left;
				}
				if(coords.y + velocity.y < fixedRect.top) {
					velocity.y = 0;
					coords.y = fixedRect.top;
				} else if(coords.y + velocity.y > fixedRect.bottom) {
					velocity.y = 0;
					coords.y = fixedRect.bottom;
				}
				// kinematics of the trail
				coords.x += velocity.x;
				coords.y += velocity.y;
				//reset trail position to the center
				if(button.getAttribute("data-direction") === "reset") {
					coords.x = window.innerWidth / 2;
					coords.y = rect.height / 2 + fixedRect.top;
					velocity.x = 0;
					velocity.y = 0;
				}
			}, 25); //intervals in ms
		});
		button.addEventListener("touchend", function() {
			clearInterval(holdInterval); // clear the interval if touch is released
			velocity.x = 0;
			velocity.y = 0;
		});
	});
}

// make the circles move smoothly
function animateCircles() {
	let x = coords.x;
	let y = coords.y;
	circles.forEach(function(circle, index) { //set the location of circle to current location
		circle.style.left = x + "px";
		circle.style.top = y + "px";
		if(isMobile) {
			circle.style.left = x - 12 + "px";
			circle.style.top = y - 12 + "px";
		}
		//decrease scale of circle
		circle.style.scale = (circles.length - index) / circles.length + 0.5;
		circle.x = x;
		circle.y = y;
		// delay circles
		const nextCircle = circles[index + 1] || circles[0];
		x += (nextCircle.x - x) * 0.3;
		y += (nextCircle.y - y) * 0.3;
	});
	requestAnimationFrame(animateCircles);
}
//moves in animation frame
requestAnimationFrame(animateCircles);


/* jshint ignore:start */
//youtube API code (not considered external library) since its provided through a link, not a library
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//gets the video from html
const videoObj = document.querySelector("#player");
let player;

//loads the youtube api
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: videoObj.style.height,
        width: videoObj.style.width,
        videoId: 'MuvJR2Pc9Vc',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

// debug onPlayerReady
function onPlayerReady() {
    console.log('Player is ready');
}
// load the video
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        setInterval(checkTime, 1000); // Check time every second
    }
}

//debug purpose for error
function onPlayerError(event) {
    console.error('Error occurred: ', event);
}

//go to this timestamp in the video
function seekTo(timeInSeconds) {
    if (player && player.seekTo) {
        player.seekTo(timeInSeconds, true);
    }
}

//section to move towards the timestamp of waza(techniques)
document.getElementById('OAD').addEventListener('click', function() {
    seekTo(17); // Set to OAD waza
});

document.getElementById('Rosario').addEventListener('click', function() {
    seekTo(47); // Set to Rosario Waza
});

document.getElementById('Thundersnake').addEventListener('click', function() {
    seekTo(55); // Set to Thundersnake Waza
});

document.getElementById('Romance').addEventListener('click', function() {
    seekTo(67); // Set to Romance Waza
});

//get the timestamp of current video
function checkTime() {
    const currentTime = player.getCurrentTime();
    highlightButton(currentTime);
}

//timestamp buttons
function highlightButton(currentTime) {
    const buttons = [
        { id: 'OAD', time: 17, length: 22 },
        { id: 'Rosario', time: 47, length: 4 },
        { id: 'Thundersnake', time: 55.5, length: 11.5 },
        { id: 'Romance', time: 67, length: 13 }
    ];
	//get element in each button then go to this timestamp lasting with current length given
    buttons.forEach(button => {
        const waza = document.getElementById(button.id);
        if (currentTime >= button.time && currentTime < button.time + button.length) { // Highlight for 10 seconds
            waza.classList.add('highlight');
        } else {
            waza.classList.remove('highlight');
        }
    });
}
/* jshint ignore:end */

// fullscreen code section
//set fullscreen to false at first bc mobile is always in windowed initially
let isFullScreen = false;
const fullscreenButton = document.getElementById("fullscreenButton");

function enterFullscreen() {
	if (document.documentElement.requestFullscreen) { // other browsers
	document.documentElement.requestFullscreen();
	isFullScreen = true;
	} else if (document.documentElement.mozRequestFullScreen) { // Firefox
	document.documentElement.mozRequestFullScreen();
	isFullScreen = true;
	} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
	document.documentElement.webkitRequestFullscreen();
	isFullScreen = true;
	} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
	document.documentElement.msRequestFullscreen();
	isFullScreen = true;
	}
}

function exitFullscreen() {
	if (document.exitFullscreen) { // other browsers
	document.exitFullscreen();
	isFullScreen = false;
	} else if (document.mozCancelFullScreen) { // Firefox
	document.mozCancelFullScreen();
	isFullScreen = false;
	} else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
	document.webkitExitFullscreen();
	isFullScreen = false;
	} else if (document.msExitFullscreen) { // IE/Edge
	document.msExitFullscreen();
	isFullScreen = false;
	}
}

// when player click fullscreen button, enter/exit fullscreen depending on isFullScreen
fullscreenButton.addEventListener("click", () => {
	if (isFullScreen) {
		exitFullscreen();
	}
	else {
		enterFullscreen();
	}
});