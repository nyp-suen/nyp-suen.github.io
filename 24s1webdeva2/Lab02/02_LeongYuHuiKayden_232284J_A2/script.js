
// Info
{
    let info_more = document.querySelectorAll('.info-more'); // selects all elements with the class .info-more and stores them in the info_more NodeList.

    for (let i = 0; i < info_more.length; i++) {
        info_more[i].addEventListener('click', function () {
            let info_card = info_more[i].parentNode; // find the parent info-card element and retrieves the parent element of the clicked .info-more button
            let info_content = info_card.querySelector('.info-content'); // find the info-content within the info-card
            let maxHeight = info_content.scrollHeight + 'px'; // calculates the full height of the .info-content element, converting it to a string with px units

            info_card.classList.toggle('active'); // Toggle the 'active' class on the info card, indicating whether it's expanded or collapsed

            if (info_card.classList.contains('active')) {
                // Expand smoothly by setting max-height explicitly
                info_content.style.maxHeight = maxHeight;
            } else {
                // Collapse smoothly to initial height
                info_content.style.maxHeight = '215px'; // or whatever the initial height is (which is 215px)
            }

            // Force reflow to ensure the transition is triggered immediately after setting 'maxHeight'
            void info_content.offsetWidth;
        });
    }
}


// Clubs
{
    let clubs_filter_btn = document.querySelectorAll('.clubs-filter-btn'); // selects all elements with the class name .clubs-filter-btn and stores them in the variable clubs_clubs_filter_btn
    let clubs_tab_items = document.querySelectorAll('.clubs-tab-item'); // selects all elements with the class name .clubs-tab-item and stores them in the variable clubs_tab_items

    // iterates through each element in the clubs_filter_btn collection
    // for each button (clubs_filter_btn[i]), it adds an event listener that triggers when the button is clicked ('click')
    for (let i = 0; i < clubs_filter_btn.length; i++) {
        clubs_filter_btn[i].addEventListener('click', function () {
            for (let j = 0; j < clubs_filter_btn.length; j++) {
                clubs_filter_btn[j].classList.remove('active');
                // it removes the class active from each button (clubs_filter_btn[j].classList.remove('active'))
                // ensuring that only the currently clicked button will have the active class, visually indicating it as active
            }
            // retrieves the value of the data-tab attribute from the currently clicked filter button (clubs_filter_btn[i].getAttribute('data-tab'))
            let select_tab = clubs_filter_btn[i].getAttribute('data-tab');
            clubs_filter_btn[i].classList.add('active'); // adds the class active to the currently clicked filter button (clubs_filter_btn[i].classList.add('active')) (marks it visually)
            for (let t = 0; t < clubs_tab_items.length; t++) {
                document.querySelector('.clubs-tab-filter-item-container').style.height =
                    clubs_tab_items[t].scrollHeight + 'px'; // It adjusts the height of the container dynamically to match the height of each tab item
                if (clubs_tab_items[t].classList.contains(select_tab)) {
                    clubs_tab_items[t].classList.add('select_tab'); // it adds the class select_tab to make it visible 
                } else {
                    clubs_tab_items[t].classList.remove('select_tab'); // else it removes the select_tab class to hide it 
                }
            }
        });
    }

    // outside of any event listener, this loop iterates through all clubs_tab_items.
    for (let th = 0; th < clubs_tab_items.length; th++) {
        // it sets the height of the tab container to match the height of each tab item
        document.querySelector('.clubs-tab-filter-item-container').style.height = clubs_tab_items[th].scrollHeight + 'px';
        // which ensures that when the page loads initially, the tab container is sized appropriately to fit the content of the first tab item
    }
}

// Home
{
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    let homeSections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    // Function to handle scroll-based navigation state
    window.onscroll = () => {
        if (!navbar.classList.contains('NavActive')) {
            homeSections.forEach(sec => {
                let top = window.scrollY;
                let offset = sec.offsetTop - 150;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');

                console.log(`Section ID: ${id}, Top: ${top}, Offset: ${offset}, Height: ${height}`);

                if (top >= offset && top < offset + height) {
                    navLinks.forEach(links => {
                        links.classList.remove('NavActive');
                    });
                    let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                    if (activeLink) {
                        activeLink.classList.add('NavActive');
                    }
                }
            });
        }
    };

    // Toggle mobile menu and handle navigation link clicks
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('NavActive');
    };

    // Handle clicks on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove NavActive class from all links
            navLinks.forEach(links => {
                links.classList.remove('NavActive');
            });
            // Add NavActive class to the clicked link
            link.classList.add('NavActive');

            // Prevent default navigation behavior
            //e.preventDefault();

            // Do not close the mobile menu if it's already NavActive
            if (navbar.classList.contains('NavActive')) {
                return;
            }

            // Close mobile menu immediately
            navbar.classList.add('NavActive');
            menuIcon.classList.add('bx-x');
        });
    });

}

            // Transfer simulator
{
    // Declaring stuff to be used later
    const playersContainer = document.querySelector('.players__container');
    const totalPlayers = document.querySelector('#selected');
    const moneyLeft = document.querySelector('#money');
    const playersLeft = document.querySelector('#left');
    const totalCost = document.querySelector('#cost');
    const moneyError = document.querySelector('#money__error');
    const playersError = document.querySelector('#players__error');
    const selectionError = document.querySelector('#selection__error');

    // When a click event occurs anywhere within playersContainer, the event handler function is executed.
    // If the element does not have the selected class, it will add it; if it already has it, it will remove it
    playersContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('player')) {
            e.target.classList.toggle('selected');
        } else if (e.target.closest('.player')) {
            e.target.closest('.player').classList.toggle('selected');
        }
        updatePlayersCount(); // Responsible for updating various counts and displays related to the player selection
    });

    function updatePlayersCount() {
        const selectedPlayers = document.querySelectorAll('.player.selected'); // Selects all elements with both classes .player and .selected and stores them in selectedPlayers.
        const playersCount = selectedPlayers.length;
        totalPlayers.innerText = playersCount; // Updates the text content of an element with id totalPlayers to show the count of selected players

        const salarySelected = document.querySelectorAll('.player.selected .salary'); // Selects all elements with class .salary that are children of elements with both classes .player and .selected
        const salaryCount = [...salarySelected].map(item => +item.getAttribute('data-salary'));
        const salarySum = salaryCount.reduce(function (a, b) {
            return a + b;
        }, 0);

        totalCost.innerText = formatNumber(salarySum); // Updates the text content of an element with id totalCost to display the total salary using the formatNumber function

        const playersLeftPick = 11 - playersCount; // Calculates the remaining number of players that can still be selected (which is 11 duh)
        playersLeft.innerText = playersLeftPick; // Updates the text content of an element to show the number of players left to pick

        const moneyLeftSpend = 90000000 - salarySum; // Calculates the remaining budget
        moneyLeft.innerText = formatNumber(moneyLeftSpend); // Updates the text content of an element with id moneyLeft to display the remaining budget using the formatNumber function

        // Money error message
        if (moneyLeftSpend < 0) {
            moneyError.style.visibility = 'visible'; // Controls the visibility of an element (moneyError) based on whether the budget (moneyLeftSpend) is negative
        } else {
            moneyError.style.visibility = 'hidden';
        }

        // Players error message
        if (playersLeftPick < 0) {
            playersError.style.visibility = 'visible'; // Controls the visibility of an element (playersError) based on whether too many players (playersLeftPick) have been selected
        } else {
            playersError.style.visibility = 'hidden';
        }

        let goalkeepers = 0, defenders = 0, midfielders = 0, forwards = 0;

        selectedPlayers.forEach(player => {
            const position = player.querySelector('.player__info small').textContent;
            if (position.includes('Goalkeeper')) goalkeepers++;
            else if (position.includes('Defender')) defenders++;
            else if (position.includes('Midfielder')) midfielders++;
            else if (position.includes('Forward')) forwards++;
        });

        // Selection error message
        if (goalkeepers === 1 && defenders === 4 && midfielders === 3 && forwards === 3) {
            selectionError.style.visibility = 'hidden';
        } else {
            selectionError.style.visibility = 'visible';
        }
    }

    // Format number
    function formatNumber(num) {
        return '$' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // Initialize the money left display on page load
    document.addEventListener('DOMContentLoaded', () => {
        moneyLeft.innerText = formatNumber(90000000);
    });
}

// Trade simulator
{
    document.addEventListener('DOMContentLoaded', (event) => {
        // Function to allow dropping items
        window.allowDrop = function (event) {
            event.preventDefault();
        }

        // Function to handle dragging items
        window.drag = function (event) {
            event.dataTransfer.setData("text", event.target.id);
        }

        // Function to handle dropping items
        window.drop = function (event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text");
            var tradePlayer = document.getElementById(data);
            var tradeBox = event.target.closest('.trade__box');

            // Restricting the drop to the respective boxes
            if (tradePlayer.dataset.team === 'your' && tradeBox.id === 'left__trade') {
                tradeBox.appendChild(tradePlayer);
            } else if (tradePlayer.dataset.team === 'opponent' && tradeBox.id === 'right__trade') {
                tradeBox.appendChild(tradePlayer);
            }

            // Update total selected count
            updateTotalSelected();

            // Update salaries difference immediately
            updateSalaries();
        }

        // Function to update total selected count
        function updateTotalSelected() {
            // Uses querySelectorAll to count all elements with the class .trade-player within the leftcont and rightcont containers
            // Updates the text content of elements with IDs totallakers and totalnets to display the respective counts
            var totalLakers = document.getElementById('left__cont').querySelectorAll('.trade-player').length;
            var totalNets = document.getElementById('right__cont').querySelectorAll('.trade-player').length;

            document.getElementById('total__lakers').textContent = totalLakers;
            document.getElementById('total__nets').textContent = totalNets;
        }

        // Function to update salaries difference
        function updateSalaries() {
            var leftTradeBox = document.getElementById('left__trade');
            var rightTradeBox = document.getElementById('right__trade');

            var leftSalary = Array.from(leftTradeBox.children).slice(1).reduce((total, tradePlayer) => {
                return total + parseInt(tradePlayer.querySelector('.salary').dataset.value); // Changed here
            }, 0);

            var rightSalary = Array.from(rightTradeBox.children).slice(1).reduce((total, tradePlayer) => {
                return total + parseInt(tradePlayer.querySelector('.salary').dataset.value); // Changed here
            }, 0);

            var difference = Math.abs(leftSalary - rightSalary);

            document.getElementById('difference').textContent = difference.toLocaleString(); // Display difference with commas
        }

        // Function to perform trade
        window.performTrade = function () {
            var leftTradeBox = document.getElementById('left__trade');
            var rightTradeBox = document.getElementById('right__trade');

            if (leftTradeBox.children.length > 1 && rightTradeBox.children.length > 1) {
                var leftPlayers = Array.from(leftTradeBox.children).slice(1);
                var rightPlayers = Array.from(rightTradeBox.children).slice(1);
                var leftSalary = leftPlayers.reduce((total, tradePlayer) => total + parseInt(tradePlayer.querySelector('.salary').dataset.value), 0); // Changed here
                var rightSalary = rightPlayers.reduce((total, tradePlayer) => total + parseInt(tradePlayer.querySelector('.salary').dataset.value), 0); // Changed here
                var difference = Math.abs(leftSalary - rightSalary);

                console.log("Left Players:", leftPlayers.map(tradePlayer => tradePlayer.querySelector('h3').innerText), "Total Salary:", leftSalary);
                console.log("Right Players:", rightPlayers.map(tradePlayer => tradePlayer.querySelector('h3').innerText), "Total Salary:", rightSalary);
                console.log("Salary Difference:", difference);

                // Update salaries difference
                document.getElementById('difference').textContent = difference.toLocaleString(); // Display difference with commas

                if (difference <= 10000000) {
                    // Move players to the new teams
                    var yourTeam = document.getElementById('left__cont');
                    var opponentTeam = document.getElementById('right__cont');

                    // Store data-team before moving players
                    var leftPlayerTeams = leftPlayers.map(tradePlayer => tradePlayer.dataset.team);
                    var rightPlayerTeams = rightPlayers.map(tradePlayer => tradePlayer.dataset.team);

                    // Move players visually
                    leftPlayers.forEach(tradePlayer => opponentTeam.appendChild(tradePlayer));
                    rightPlayers.forEach(tradePlayer => yourTeam.appendChild(tradePlayer));

                    // Update data-team attribute after moving players
                    leftPlayers.forEach((tradePlayer, index) => tradePlayer.dataset.team = leftPlayerTeams[index] === 'your' ? 'opponent' : 'your');
                    rightPlayers.forEach((tradePlayer, index) => tradePlayer.dataset.team = rightPlayerTeams[index] === 'opponent' ? 'your' : 'opponent');

                    // Clear the trade boxes
                    leftTradeBox.innerHTML = '<h4>Your Team\'s Player</h4>';
                    rightTradeBox.innerHTML = '<h4>Opponent\'s Player</h4>';

                    // Add dragstart event listeners to all players again
                    var players = document.querySelectorAll('.trade-player');
                    players.forEach(tradePlayer => {
                        tradePlayer.addEventListener('dragstart', window.drag);
                    });

                    // Update total selected count after trade
                    updateTotalSelected();

                    // Successful trade message
                    document.getElementById('success').style.display = 'block';
                } else {
                    // Unsuccessful trade message
                    document.getElementById('error').style.display = 'block';

                    // Restore players to their original positions
                    var yourTeam = document.getElementById('left__cont');
                    var opponentTeam = document.getElementById('right__cont');

                    leftPlayers.forEach(tradePlayer => yourTeam.appendChild(tradePlayer));
                    rightPlayers.forEach(tradePlayer => opponentTeam.appendChild(tradePlayer));

                    // Clear the trade boxes
                    leftTradeBox.innerHTML = '<h4>Your Team\'s Player</h4>';
                    rightTradeBox.innerHTML = '<h4>Opponent\'s Player</h4>';

                    // Add dragstart event listeners to all players again
                    var players = document.querySelectorAll('.trade-player');
                    players.forEach(tradePlayer => {
                        tradePlayer.addEventListener('dragstart', window.drag);
                    });

                    // Update total selected count after restore
                    updateTotalSelected();
                }
            }
        }

        // Hide success and error messages
        document.getElementById('success__btn').addEventListener('click', function () {
            document.getElementById('success').style.display = 'none';
        });

        document.getElementById('error__btn').addEventListener('click', function () {
            document.getElementById('error').style.display = 'none';

            // Restore players to their original positions
            var yourTeam = document.getElementById('left__cont');
            var opponentTeam = document.getElementById('right__cont');
            var leftTradeBox = document.getElementById('left__trade');
            var rightTradeBox = document.getElementById('right__trade');

            // Move players back from trade boxes to their original teams
            var leftPlayers = Array.from(leftTradeBox.children).slice(1);
            var rightPlayers = Array.from(rightTradeBox.children).slice(1);

            leftPlayers.forEach(tradePlayer => yourTeam.appendChild(tradePlayer));
            rightPlayers.forEach(tradePlayer => opponentTeam.appendChild(tradePlayer));

            // Clear the trade boxes
            leftTradeBox.innerHTML = '<h4>Your Team\'s Player</h4>';
            rightTradeBox.innerHTML = '<h4>Opponent\'s Player</h4>';

            // Add dragstart event listeners to all players again
            var tradeplayers = document.querySelectorAll('.trade-player');
            tradeplayers.forEach(tradePlayer => {
                tradePlayer.addEventListener('dragstart', window.drag);
            });

            // Update total selected count after restore
            updateTotalSelected();
        });

        // Add dragstart event listeners to all players initially
        var tradeplayers = document.querySelectorAll('.trade-player');
        tradeplayers.forEach(tradePlayer => {
            tradePlayer.addEventListener('dragstart', window.drag);
        });

        // Initial update of total selected count
        updateTotalSelected();
    });
}