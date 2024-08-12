var breadtype = {
    imageUrl: "",
    name: "",
    description: "",
    origin: "",
    mainIngredients: [],
    bakingMethod: "",
};

var ingredient = {
    spriteUrl: "",
    name: "",
};

var cookingMethod = {
    spriteUrl: "",
    name: "",
};

var breadRecipe = {
    breadName: "",
    ingredients: [],
    bakingMethod: "",
};

var breads = [
    Object.assign(Object.create(breadtype), { imageUrl: "images/baguette.jpg", name: "Baguette", description: "A long thin bread.", origin: "France", mainIngredients: ["Flour", "Water", "Yeast", "Salt"], bakingMethod: "Regular Oven" }),
    Object.assign(Object.create(breadtype), { imageUrl: "images/sourdoughbread.jpg", name: "Sourdough", description: "Bread with a sour taste.", origin: "Switzerland", mainIngredients: ["Flour", "Water", "Sourdough starter", "Salt"], bakingMethod: "Regular Oven" }),
    Object.assign(Object.create(breadtype), { imageUrl: "images/brioche.jpg", name: "Brioche", description: "A pastry of rich and tender crumb.", origin: "France", mainIngredients: ["Flour", "Eggs", "Butter", "Milk", "Water", "Cream"], bakingMethod: "Regular Oven" }),
    Object.assign(Object.create(breadtype), { imageUrl: "images/pita.jpg", name: "Pita", description: "A flatbread baked from wheat flour", origin: "Middle East", mainIngredients: ["Flour", "Water", "Yeast", "Salt"], bakingMethod: "High Temp Oven" }),
    Object.assign(Object.create(breadtype), { imageUrl: "images/whitebread.jpg", name: "White Bread", description: "Bread made from wheat flour.", origin: "Ancient Egypt", mainIngredients: ["Flour"], bakingMethod: "Regular Oven" }),
    Object.assign(Object.create(breadtype), { imageUrl: "images/crepe.jpg", name: "Crêpe", description: "Bread that is cooked on a frying pan", origin: "France", mainIngredients: ["Flour", "Milk", "Eggs"], bakingMethod: "Frying Pan" }),
    Object.assign(Object.create(breadtype), { imageUrl: "images/englishmuffin.jpg", name: "English Muffin", description: "Bread that is not a muffin.", origin: "England", mainIngredients: ["Flour", "Butter", "Milk", "Sugar", "Salt", "Eggs", "Yeast"], bakingMethod: "Frying Pan" }),
];

var ingredients = [];
var cookingMethods = [];
var breadRecipes = [];

var selectedIngredients = [];
var selectedUtensil = null;
var breadOrder = null;

function ingredientExists(name) {
    return ingredients.some(function (item) {
        return item.name === name;
    });
}

function cookingMethodExists(name) {
    return cookingMethods.some(function (item) {
        return item.name === name;
    });
}

function generateSpriteName(name) {
    // Convert the name to lowercase and replace spaces with hyphens
    var spriteName = name.toLowerCase().replace(/\s+/g, '-').replace("ê", "e");
    return spriteName;
}

// Iterate through each bread and add its ingredients to the ingredients array
breads.forEach(function (bread) {
    bread.mainIngredients.forEach(function (item) {
        if (!ingredientExists(item)) {
            ingredients.push(Object.assign(Object.create(ingredient), { name: item, spriteUrl: "images/" + generateSpriteName(item) + ".png" }));
        }
    });
    if (!cookingMethodExists(bread.bakingMethod)) {
        cookingMethods.push(Object.assign(Object.create(cookingMethod), { name: bread.bakingMethod, spriteUrl: "images/" + generateSpriteName(bread.bakingMethod) + ".png" }));
    }
});

function EqualArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort();
    arr2.sort();
    return arr1.every(function (value, index) {
        return generateSpriteName(value) === arr2[index].toLowerCase();
    });
}

function CreateRecipes() {
    breads.forEach(function (bread) {
        var breadIngredients = [];

        bread.mainIngredients.forEach(function (ing) {
            breadIngredients.push(generateSpriteName(ing));
        });

        breadRecipes.push(
            Object.assign(Object.create(breadRecipe), {
                breadName: bread.name,
                ingredients: breadIngredients,
                bakingMethod: bread.bakingMethod,
            })
        );
    });
}

function CreateInteractables() {
    const ingredientList = document.querySelector('.ingredientList');
    const bakingMethods = document.querySelector('.bakingMethods');
    const makeBread = document.querySelector('#makeBread');
    const nextOrder = document.querySelector('#nextOrder');

    ingredients.forEach(function (ing) {
        var item = document.createElement('div');
        item.className = 'ingredient';
        item.innerHTML = '<img src="' + ing.spriteUrl + '" class="sprite">' + ing.name + '</img>';

        item.addEventListener('click', function () {
            item.classList.toggle('selected');
            if (item.classList.contains('selected')) {
                selectedIngredients.push(ing.name);
            } else {
                var index = selectedIngredients.indexOf(ing.name);
                if (index !== -1) {
                    selectedIngredients.splice(index, 1);
                }
            }
            console.log(selectedIngredients);
        });
        ingredientList.append(item);
    });

    cookingMethods.forEach(function (method) {
        var item = document.createElement('div');
        item.className = 'bakingMethod';
        item.innerHTML = '<img src="' + method.spriteUrl + '" class="sprite"><br><p>' + method.name + '</p></img>';

        item.addEventListener('click', function () {
            var allItems = document.querySelectorAll('.bakingMethod');
            allItems.forEach(function (i) {
                i.classList.remove('selected');
            });
            item.classList.toggle('selected');

            if (item.classList.contains('selected')) {
                selectedUtensil = method.name;
            } else {
                selectedUtensil = null;
            }
            /*console.log(selectedUtensil);*/
        });
        bakingMethods.append(item);
    });

    makeBread.addEventListener('click', function () {
        var result = document.querySelector('#result');
        var successful = false;
        /*console.log("Making..");*/
        breadRecipes.forEach(function (recipe) {
            /*var recipe = breadRecipes[bread];*/
            /*console.log(recipe);*/
            if (EqualArrays(selectedIngredients, recipe.ingredients) && recipe.bakingMethod === selectedUtensil) {
                var spriteUrl = "images/" + generateSpriteName(recipe.breadName) + ".png";
                result.innerHTML = '<img src="' + spriteUrl + '" class="sprite"><br><p>' + recipe.breadName + '</p></img>';
                CheckOrder(recipe.breadName);
                successful = true;
                return;
            }
        });
        if (!successful) result.innerHTML = '<img src="images/badbread.png" class="sprite"><br><p>Bad Bread</p></img>';
    });

    nextOrder.addEventListener('click', function () {
        var orderresultbox = document.querySelector('#orderresultbox');
        orderresultbox.classList.remove('correct');
    
        var ingredients = document.querySelectorAll('.ingredient');
        var bakingMethods = document.querySelectorAll('.bakingMethod');
        ingredients.forEach(function (ing) {
            ing.classList.remove('selected');
        });
        bakingMethods.forEach(function (method) {
            method.classList.remove('selected');
        });
        selectedIngredients = [];
        selectedUtensil = null;
    
        var result = document.querySelector('#result');
        result.innerHTML = '';
    
        GenerateOrder();
    });
}

function GenerateOrder() {
    var previousOrder = breadOrder;
    var order = document.querySelector('#order');
    breadOrder = breadRecipes[
        Math.floor(Math.random() * breadRecipes.length)
    ];
    if (breadOrder === previousOrder) GenerateOrder();

    var spriteUrl = "images/" + generateSpriteName(breadOrder.breadName) + ".png";
    order.innerHTML = '<img src="' + spriteUrl + '" class="sprite"><br><p>' + breadOrder.breadName + '</p></img>';
}

function CheckOrder(breadName) {
    if (breadOrder.breadName === breadName) {
        var orderresultbox = document.querySelector('#orderresultbox');
        orderresultbox.classList.add('correct');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    CreateRecipes();
    CreateInteractables();
    GenerateOrder();
    console.log(breadRecipes);
    // Create Grid with the Bread
    CreatePanels();
    var panels = document.querySelectorAll('.panel');
    // Add button to toggle size when clicked
    panels.forEach(function (panel) {
        panel.addEventListener('click', function () {
            panels.forEach(function (otherPanels) {
                otherPanels.classList.remove('expanded');
            });
            panel.classList.add('expanded');
        });
    });

    // Add Navbar buttons and Togglable tabs
    var buttons = document.querySelectorAll('.navbar button');
    var pages = document.querySelectorAll('.page');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var targetPage = this.id.replace('pagebtn', 'page');

            pages.forEach(function (page) {
                if (page.id === targetPage) {
                    page.classList.add('active');
                    page.classList.add('animated-element');
                } else {
                    page.classList.remove('active');
                    page.classList.add('animated-element');
                }
            });
        });
    });

    // Show the first page by default
    pages[0].classList.add('active');

    // Feedback "backend"
    document.getElementById('feedbackForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the form values
        const email = document.getElementById('email').value;
        const thoughts = document.getElementById('thoughts').value;

        if (email === "" || thoughts === "") {
            alert("Please fill out all fields.");
            return;
        }

        // Display thank you message
        document.getElementById('thankYouMessage').style.display = 'block';

        // Clear the form
        document.getElementById('feedbackForm').reset();
    });
});

function CreatePanels() {
    var grid = document.getElementById('grid');

    breads.forEach(function (item) {

        // Generate html unordered list
        var ingredientList = "<h3>Ingredients</h3><ul>";
        item.mainIngredients.forEach(function (ingredient) {
            ingredientList += "<li>" + ingredient + "</li>";
        });
        ingredientList += "</ul>";

        // Create panel
        var panel = document.createElement('div');
        panel.className = 'panel';

        var content = document.createElement('div');
        content.innerHTML =
            '<h2>' + item.name + '</h2>' +
            '<h3>Origin - ' + item.origin + '</h3>' +
            '<p>' + item.description + '</p>' +
            ingredientList;
        content.style.padding = '5%';
        var gradient = document.createElement('div');
        gradient.className = 'pickgradient';

        // Set the background image
        panel.style.backgroundImage = 'url(' + item.imageUrl + ')';
        panel.style.backgroundSize = 'cover';
        panel.style.backgroundPosition = 'center';
        panel.style.padding = '0%';

        // If successful add the panel into the grid
        if (panel != null) {
            grid.appendChild(panel);
            panel.appendChild(gradient);
            gradient.appendChild(content);
        }

    });
}
