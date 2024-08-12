// Scroll to top of screen
function scrollToTop() {
    window.scrollTo({
        top: 0
    });
}
// Scroll to top of screen (smooth)
function scrollToTopSmooth() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTopBtn');
    backToTop.addEventListener('click', function() {
        scrollToTopSmooth();
    });
});

// Page changer
function showSubpage(subpageId) {
    // Hide all pages
    var subpages = document.querySelectorAll('.subpage');
    subpages.forEach(function(subpage) {
        subpage.style.display = 'none';
    });

    // Show only selected page
    var selectedSubpage = document.getElementById(subpageId);
    selectedSubpage.style.display = 'block';
    scrollToTop();
}
document.addEventListener('DOMContentLoaded', function() {
    // Show home page by default
    showSubpage('home');

    // Pages navigation buttons (PC)
    const homeButton = document.getElementById('homeBtn');
    const mustKnowButton = document.getElementById('mustKnowBtn');
    const placesButton = document.getElementById('placesBtn');
    const beforeTravelButton = document.getElementById('beforeTravelBtn');
    homeButton.addEventListener('click', function() {
        showSubpage('home');
    });
    mustKnowButton.addEventListener('click', function() {
        showSubpage('mustknow');
    });
    placesButton.addEventListener('click', function() {
        showSubpage('places');
    });
    beforeTravelButton.addEventListener('click', function() {
        showSubpage('beforetravel');
    });

    // Pages navigation buttons (Mobile)
    const navMenuButton = document.getElementById('navBtn');
    const navMenu = document.getElementById('navMenu');
    const homeButtonMob = document.getElementById('homeBtnMob');
    const mustKnowButtonMob = document.getElementById('mustKnowBtnMob');
    const placesButtonMob = document.getElementById('placesBtnMob');
    const beforeTravelButtonMob = document.getElementById('beforeTravelBtnMob');
    navMenuButton.addEventListener('click', function() {
        if (navMenu.style.display === 'block') {
            navMenu.style.display = 'none';
        }
        else {
            navMenu.style.display = 'block';
        }
    });
    homeButtonMob.addEventListener('click', function() {
        showSubpage('home');
        navMenu.style.display = 'none';
    });
    mustKnowButtonMob.addEventListener('click', function() {
        showSubpage('mustknow');
        navMenu.style.display = 'none';
    });
    placesButtonMob.addEventListener('click', function() {
        showSubpage('places');
        navMenu.style.display = 'none';
    });
    beforeTravelButtonMob.addEventListener('click', function() {
        showSubpage('beforetravel');
        navMenu.style.display = 'none';
    });

    // Show navbar only when user has scrolled down
    const headerDiv = document.getElementById('navBar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            headerDiv.classList.add('show');
            backToTopBtn.classList.add('show');
        } else {
            headerDiv.classList.remove('show');
            backToTopBtn.classList.remove('show');
        }
    });
});

function showTab(tabId) {
    // Hide all pages
    var subpages = document.querySelectorAll('.tab');
    subpages.forEach(function(subpage) {
        subpage.style.display = 'none';
    });

    // Show only selected page
    var selectedSubpage = document.getElementById(tabId);
    selectedSubpage.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
    // Show Tokyo tab by default
    showTab('tokyo');

    // Places tabs navigation buttons
    const toykoButton = document.getElementById('tokyoBtn');
    const yokohamaButton = document.getElementById('yokohamaBtn');
    const osakaButton = document.getElementById('osakaBtn');
    const kyotoButton = document.getElementById('kyotoBtn');
    const hiroshimaButton = document.getElementById('hiroshimaBtn');
    toykoButton.addEventListener('click', function() {
        showTab('tokyo');
    });
    yokohamaButton.addEventListener('click', function() {
        showTab('yokohama');
    });
    osakaButton.addEventListener('click', function() {
        showTab('osaka');
    });
    kyotoButton.addEventListener('click', function() {
        showTab('kyoto');
    });
    hiroshimaButton.addEventListener('click', function() {
        showTab('hiroshima');
    });
});

// Photo gallery
document.addEventListener('DOMContentLoaded', function() {
    var gallery = document.getElementById('gallery');
    var scrollLeftBtn = document.getElementById('galleryLeftBtn');
    var scrollRightBtn = document.getElementById('galleryRightBtn');
    var indicatorsContainer = document.getElementById('indicators');
    var images = gallery.getElementsByTagName('img');
    var imageCount = images.length;
    var currentIndex = 0;
    var autoScrollInterval = 3000; // Interval in milliseconds
    var autoScrollTimer;

    // Create indicators
    for (var i = 0; i < imageCount; i++) {
        var indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === currentIndex) {
            indicator.classList.add('active');
        }
        indicatorsContainer.appendChild(indicator);
    }

    var indicators = indicatorsContainer.getElementsByClassName('indicator');

    function updateGalleryPosition() {
        var imageWidth = images[0].clientWidth + 10; // Include margin-right
        gallery.style.transform = 'translateX(' + (-currentIndex * imageWidth) + 'px)';

        // Update indicators
        for (var i = 0; i < indicators.length; i++) {
            if (i === currentIndex) {
                indicators[i].classList.add('active');
            } else {
                indicators[i].classList.remove('active');
            }
        }
    }

    function scrollRight() {
        currentIndex = (currentIndex + 1) % imageCount;
        updateGalleryPosition();
    }

    function scrollLeft() {
        currentIndex = (currentIndex - 1 + imageCount) % imageCount;
        updateGalleryPosition();
    }

    function resetAutoScrollTimer() {
        clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(scrollRight, autoScrollInterval);
    }

    scrollLeftBtn.addEventListener('click', function() {
        scrollLeft();
        resetAutoScrollTimer();
    });

    scrollRightBtn.addEventListener('click', function() {
        scrollRight();
        resetAutoScrollTimer();
    });

    // Initialize auto-scroll
    autoScrollTimer = setInterval(scrollRight, autoScrollInterval);

    // Initialize gallery position
    updateGalleryPosition();
});

// Mario Game
document.addEventListener('DOMContentLoaded', function() {
    var startButton = document.getElementById('start-button');
    var restartButton = document.getElementById('restart-button');
    var marioGame = document.getElementById('mario-game');
    var mario = document.getElementById('mario');
    var tower = document.getElementById('tower');
    var scoreDisplay = document.getElementById('score');
    var score = 0;
    var isJumping = false;
    var isGameOver = false;
    var jumpInterval, fallInterval, scoreInterval;

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);

    function startGame() {
        document.getElementById('start-menu').style.display = 'none';
        marioGame.style.display = 'flex';
        score = 0;
        scoreDisplay.textContent = 'Score: ' + score;
        tower.style.animation = 'moveTower 2s infinite linear';
        document.addEventListener('keydown', handleJump);
        document.addEventListener('touchstart', handleJump);
        updateScore();
        checkCollision();
        isGameOver = false;
    }

    function restartGame() {
        restartButton.style.display = 'none';
        score = 0;
        scoreDisplay.textContent = 'Score: ' + score;
        tower.style.right = '0';
        tower.style.animation = 'moveTower 2s infinite linear';
        document.addEventListener('keydown', handleJump);
        document.addEventListener('touchstart', handleJump);
        updateScore();
        checkCollision();
        isGameOver = false;
    }

    function handleJump(event) {
        if ((event.type === 'keydown' && event.keyCode === 32) || event.type === 'touchstart') {
            if (!isJumping && !isGameOver) {
                isJumping = true;
                var jumpHeight = 0;
                clearInterval(fallInterval);
                jumpInterval = setInterval(function() {
                    if (jumpHeight < 150) {
                        mario.style.bottom = (jumpHeight += 10) + 'px';
                    } else {
                        clearInterval(jumpInterval);
                        fallInterval = setInterval(function() {
                            if (jumpHeight > 0) {
                                mario.style.bottom = (jumpHeight -= 10) + 'px';
                            } else {
                                clearInterval(fallInterval);
                                isJumping = false;
                            }
                        }, 30); 
                    }
                }, 30);
            }
        }
    }

    function updateScore() {
        clearInterval(scoreInterval);
        scoreInterval = setInterval(function() {
            if (!isGameOver) {
                score++;
                scoreDisplay.textContent = 'Score: ' + score;
            }
        }, 1000);
    }

    function checkCollision() {
        var collisionInterval = setInterval(function() {
            var towerRect = tower.getBoundingClientRect();
            var marioRect = mario.getBoundingClientRect();

            if (marioRect.right > towerRect.left &&
                marioRect.left < towerRect.right &&
                marioRect.bottom > towerRect.top &&
                marioRect.top < towerRect.bottom) {
                tower.style.animation = 'none';
                restartButton.style.display = 'block';
                document.removeEventListener('keydown', handleJump);
                document.removeEventListener('touchstart', handleJump);
                isGameOver = true;
                clearInterval(collisionInterval);
                clearInterval(scoreInterval);
            }
        }, 10);
    }
});

// Cost calculator
const budgetAirline = document.getElementById('budget');
const fullAirline = document.getElementById('full');
const daysInJapan = document.getElementById('duration');
const citiesVisit = document.getElementById('cities');

const flightValue = document.getElementById('flightsCost');
const hotelValue = document.getElementById('hotelCost');
const shoppingValue = document.getElementById('shoppingCost');
const foodValue = document.getElementById('foodCost');
const shinkansenValue = document.getElementById('shinkansenCost');
const totalValue = document.getElementById('totalCost');
const totalValueSGD = document.getElementById('totalCostSGD');

budgetAirline.addEventListener("change", doCalculate);
fullAirline.addEventListener("change", doCalculate);
daysInJapan.addEventListener("change", doCalculate);
citiesVisit.addEventListener("change", doCalculate);

function doCalculate() {
    let flightCost = 0;

    if (budgetAirline.checked) {
        flightCost = 60000;
    }
    else if (fullAirline.checked) {
        flightCost = 100000;
    }

    let hotelCost = (1.0 * daysInJapan.value) * 12000;
    let shoppingCost = (1.0 * daysInJapan.value) * 10000;
    let foodCost = (1.0 * daysInJapan.value) * 1500 * 3;
    let shinkansenCost = ((1.0 * citiesVisit.value) - 1) * 10000;
    let totalCost = flightCost + hotelCost + shoppingCost + foodCost + shinkansenCost;
    let totalCostSGD = totalCost / 100;

    flightValue.innerHTML = flightCost;
    hotelValue.innerHTML = hotelCost;
    shoppingValue.innerHTML = shoppingCost;
    foodValue.innerHTML = foodCost;
    shinkansenValue.innerHTML = shinkansenCost;
    totalValue.innerHTML = totalCost;
    totalValueSGD.innerHTML = totalCostSGD;
}