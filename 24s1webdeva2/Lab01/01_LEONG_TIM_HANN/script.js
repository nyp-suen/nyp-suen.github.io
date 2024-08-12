function Test(num){
    alert(num);
}

//References
var BackgroundImage;

//Variables
var navbar;
var navbarHidden = true;

var Sections = Array();
var cheesedToMeetYou = false;
var cheeseData;
var cheeseGallery;

var popup;
var popupImage;
var popupName;
var popupText;

//init
window.addEventListener("DOMContentLoaded", (event) => {
    navbar = document.getElementById("Navbar");

    for(let i = 0; i < 4; i++){
        Sections.push(
            document.getElementById("Section"+i.toString())
        );
        Sections[i].style.visibility='hidden';
    }

    cheeseGallery = document.getElementById("CheeseGallery");

    popup = document.getElementById("Popup");
    popupImage = document.getElementById("PopupImage");
    popupName = document.getElementById("PopupName");
    popupText = document.getElementById("PopupText");
    popup.style.visibility = 'hidden';

    cheesedToMeetYou = false;


});

//Events
function DivSelected(num){

    if(num == 3 && !cheesedToMeetYou){ //user wants cheese gallery, cheese gallery not initalized
        CheesedToMeetYou();
        cheesedToMeetYou = true;
    }

    for(let i = 0; i < 4; i++){
        if(i == num) Sections[i].style.visibility='visible';
        else Sections[i].style.visibility='hidden';
    }
}

function CheesedToMeetYou(){ //Initialize cheese gallery from json
    //const cheeseData = JSON.parse(fetch("../assets/json/Cheeses.json"));
    fetch("assets/json/Cheeses.json")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error
                            (`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => 
                      InitializeCheeseGallery(data))
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
}

function InitializeCheeseGallery(data){
    console.log(data);
    cheeseData = data;

    for(let i = 0; i < data.length; i++){
        cheeseGallery.innerHTML +=
        "<div class=\"CheeseGalleryCheese\" onclick = \"ShowPopup(" + i.toString() + ")\">" +
        "<img class=\"FullWidth\" src=\"" + cheeseData[i].ImagePath + "\">" +
        cheeseData[i].Name + 
        "</div>"
    }

}

function ShowPopup(dataIndex){
    popupImage.src = cheeseData[dataIndex].ImagePath;
    popupName.innerHTML = cheeseData[dataIndex].Name;
    popupText.innerHTML = cheeseData[dataIndex].Description;
    
    popup.style.visibility = 'visible';
}

function HidePopup(){
    popup.style.visibility = 'hidden';
}

function NavbarToggle(){
    //alert("he");
    navbar.classList.toggle("MobileHide");
}