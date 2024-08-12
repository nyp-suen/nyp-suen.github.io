document.addEventListener("DOMContentLoaded", function() {
    var menuBtn = document.getElementById("menuBtn");
    var menu = document.getElementById("menu");

    menuBtn.addEventListener("click", function() {
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var menuBtn = document.getElementById("menuBtn2");
    var menu = document.getElementById("menu2");

    menuBtn.addEventListener("click", function() {
        menu.classList.toggle("hidden");
    });
});

var page1btn = document.querySelector("#page1btn");
var page2btn = document.querySelector("#page2btn");
var page3btn = document.querySelector("#page3btn");
var page4btn = document.querySelector("#page4btn");
var page1btn2 = document.querySelector("#page1btn2");
var page2btn2 = document.querySelector("#page2btn2");
var page3btn2 = document.querySelector("#page3btn2");
var page4btn2 = document.querySelector("#page4btn2");
var allpages = document.querySelectorAll(".page");

console.log(allpages);
hideall();

function hideall() {
    for (var i = 0; i < allpages.length; i++) {
        var onepage = allpages[i];
        onepage.style.display = "none";
    }
}

function show(pgno) {
    hideall();
    var onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block";
}

page1btn.addEventListener("click", function() {
    show(1);
});
page2btn.addEventListener("click", function() {
    show(2);
});
page3btn.addEventListener("click", function() {
    show(3);
});
page4btn.addEventListener("click", function() {
    show(4);
});
page1btn2.addEventListener("click", function() {
    show(1);
});
page2btn2.addEventListener("click", function() {
    show(2);
});
page3btn2.addEventListener("click", function() {
    show(3);
});
page4btn2.addEventListener("click", function() {
    show(4);
});

document.addEventListener('DOMContentLoaded', function() {
    var game = document.getElementById('game');
    var scoreElement = document.getElementById('score');
    var startButton = document.getElementById('startButton');
    var difficultyButtons = document.querySelectorAll('.difficultyButton');
    var reactionMessage = document.getElementById('reactionMessage');
    var startReactionButton = document.getElementById('startReactionButton');
    var reactionTest = document.getElementById('reactionTest');

    var score = 0;
    var isGameRunning = false;
    var targetInterval;
    var spawnInterval = 1000;
    var totalClicks = 0;
    var missedClicks = 0;

    var reactionStartTime;
    var reactionTimeout;

    startButton.addEventListener('click', startGame);
    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener('click', function() {
            setDifficulty(this.getAttribute('data-difficulty'));
        });
    }

    startReactionButton.addEventListener('click', startReactionTest);

    function setDifficulty(difficulty) {
        switch (difficulty) {
            case 'easy':
                spawnInterval = 1500;
                break;
            case 'medium':
                spawnInterval = 1000;
                break;
            case 'hard':
                spawnInterval = 500;
                break;
        }
        for (let i = 0; i < difficultyButtons.length; i++) {
            difficultyButtons[i].style.display = 'none';
        }
        startButton.style.display = 'block';
    }

    function startGame() {
        score = 0;
        totalClicks = 0;
        missedClicks = 0;
        scoreElement.textContent = 'Score: 0';
        startButton.style.display = 'none';
        isGameRunning = true;
        spawnTarget();
        targetInterval = setInterval(spawnTarget, spawnInterval);
        setTimeout(endGame, 30000);
    }

    function spawnTarget() {
        if (!isGameRunning) return;

        var target = document.createElement('div');
        target.classList.add('target');
        target.style.top = Math.random() * (game.clientHeight - 50) + 'px';
        target.style.left = Math.random() * (game.clientWidth - 50) + 'px';
        target.addEventListener('click', function() {
            score++;
            totalClicks++;
            scoreElement.textContent = 'Score: ' + score;
            target.remove();
        });
        game.appendChild(target);

        setTimeout(function() {
            if (target.parentElement) {
                missedClicks++;
                target.remove();
            }
        }, spawnInterval);
    }

    game.addEventListener('click', function(event) {
        if (isGameRunning && !event.target.classList.contains('target')) {
            totalClicks++;
        }
    });

    function endGame() {
        isGameRunning = false;
        startButton.style.display = 'block';
        clearInterval(targetInterval);
        var accuracy = totalClicks > 0 ? (score / totalClicks * 100).toFixed(2) : 0;
        alert('Game over! Your score is ' + score + '. Your accuracy is ' + accuracy + '%.');
    }

    function startReactionTest() {
        reactionMessage.textContent = 'Get ready...';
        startReactionButton.disabled = true;

        var delay = Math.random() * 3000 + 2000;

        reactionTimeout = setTimeout(function() {
            reactionMessage.textContent = 'Click now!';
            reactionTest.style.backgroundColor = 'green';
            reactionStartTime = Date.now();
            document.body.addEventListener('click', recordReactionTime);
        }, delay);
    }

    function recordReactionTime() {
        var reactionTime = Date.now() - reactionStartTime;
        reactionMessage.textContent = 'Your reaction time is ' + reactionTime + ' ms. Click the button to try again.';
        startReactionButton.disabled = false;
        document.body.removeEventListener('click', recordReactionTime);
        clearTimeout(reactionTimeout);
        reactionTest.style.backgroundColor = '#38bdff';
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var currentIndex = 0;
    var images = document.querySelectorAll(".carousel-image");
    var nextButton = document.getElementById("nextButton");

    function showImage(index) {
        for (var i = 0; i < images.length; i++) {
            images[i].classList.toggle("active", i === index);
        }
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    nextButton.addEventListener("click", nextImage);

    setInterval(nextImage, 3000);

    showImage(currentIndex);
});

window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 150) {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }
});
