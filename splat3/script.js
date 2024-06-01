const apiUrl = "https://api.npoint.io/113578b339e9986960e3";

const weaponElement = document.getElementById("weapon");
const headgearElement = document.getElementById("headgear");
const shirtElement = document.getElementById("shirt");
const shoeElement = document.getElementById("shoe");
const randomizeButton = document.getElementById("randomize-button");
const closeButton = document.getElementById('close-button');
const patchnotescloseButton = document.getElementById('patch-notes-close-button');
const patchnotesCard = document.querySelector('.patch-notes-card');
const patchnotesButton = document.getElementById('patch-notes-button');
const optionsCard = document.querySelector('.options-card');
const optionsButton = document.getElementById('options-button');
const hideAmiiboGearCheckbox = document.getElementById("hide-amiibo-gear");

let weapons = [];
let headgears = [];
let shirts = [];
let shoes = [];

// Fetch data from the JSON file
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    weapons = data.weapons;
    headgears = data.headgears;
    shirts = data.shirts;
    shoes = data.shoes;
  })
  .catch(error => console.error('Error fetching data:', error));

// Load the option value from localStorage if it exists
const hideAmiiboGearOption = localStorage.getItem("hideAmiiboGearOption");
if (hideAmiiboGearOption !== null) {
  hideAmiiboGearCheckbox.checked = JSON.parse(hideAmiiboGearOption);
}

// Listen for changes to the checkbox and save the value to localStorage
hideAmiiboGearCheckbox.addEventListener("change", () => {
  localStorage.setItem("hideAmiiboGearOption", hideAmiiboGearCheckbox.checked);
});

patchnotesButton.addEventListener("click", function() {
  // Toggle the display property of the patch notes card
  if (patchnotesCard.style.display === "none") {
    patchnotesCard.style.display = "block";
  } else {
    patchnotesCard.style.display = "none";
  }
});

optionsButton.addEventListener("click", function() {
  // Toggle the display property of the options card
  if (optionsCard.style.display === "none") {
    optionsCard.style.display = "block";
  } else {
    optionsCard.style.display = "none";
  }
});

patchnotescloseButton.addEventListener('click', function() {
  patchnotesCard.style.display = "none";
});

closeButton.addEventListener('click', function() {
  optionsCard.style.display = "none";
});

function randomize() {
  const randomweapon = weapons[Math.floor(Math.random() * weapons.length)];
  let randomheadgear, randomshirt, randomshoe;
  
  // Check if "Hide amiibo gear" is checked and filter out unwanted gear
  if (hideAmiiboGearCheckbox.checked) {
    const filteredHeadgears = headgears.filter(gear => {
      return ![
        "Boss Floss",
        "Chaos Helm",
        "Enchanted Hat",
        "Fresh Fish Head",
        "Marinated Headphones",
        "Pearlescent Crown L",
        "Pearlescent Crown S",
        "Power Mask Mk I",
        "Power Mask",
        "Samurai Helmet",
        "Squid Clip-Ons",
        "Squid Hairclip",
        "Squinja Mask Mk I",
        "Squinja Mask Mk II",
        "Steel Helm",
        "Sushi Sous-Chef Band",
        "Armor Helmet Replica",
        "Hero Headset Replica",
        "Hohojiro Mask",
        "Onaga Mask",
        "Manta Mask"
      ].includes(gear);
    });
    const filteredShirts = shirts.filter(gear => {
      return ![
        "Black-Belt Gi",
        "Chaos Commander Suit",
        "Enchanted Robe A",
        "Enchanted Robe B",
        "Fresh Fish Gloves",
        "Marinated Top",
        "Pearlescent Hoodie",
        "Power Armor Mk I",
        "Power Armor",
        "Samurai Jacket",
        "School Cardigan A",
        "School Cardigan B",
        "School Uniform A",
        "School Uniform B",
        "Schoolyard Scrap Jack",
        "Squinja Suit",
        "Steel Platemail",
        "Armor Jacket Replica",
        "Hero Jacket Replica",
        "Chomp Top",
        "Eelneck Tank",
        "Big Slick"
      ].includes(gear);
    });
    const filteredShoes = shoes.filter(gear => {
      return ![
        "Baggy-Sock Fringe Loafs",
        "Base Fringed Loafers",
        "Base School Shoes",
        "Chaos Kicks",
        "Enchanted Boots",
        "Fresh Fish Feet",
        "Kick Dampeners",
        "Knotty Bois",
        "Marinated Slip-Ons",
        "Pearlescent Kicks",
        "Power Boots Mk I",
        "Power Boots",
        "Samurai Shoes",
        "School Shoes + Hi Socks",
        "Squinja Boots",
        "Steel Greaves",
        "Armor Boot Replicas",
        "Hero Runner Replicas",
        "Faux Sharkskin Platfins",
        "Eel Heel Socks",
        "Big Muds"
      ].includes(gear);
    });
    randomheadgear = filteredHeadgears[Math.floor(Math.random() * filteredHeadgears.length)];
    randomshirt = filteredShirts[Math.floor(Math.random() * filteredShirts.length)];
    randomshoe = filteredShoes[Math.floor(Math.random() * filteredShoes.length)];
  } else {
    randomheadgear = headgears[Math.floor(Math.random() * headgears.length)];
    randomshirt = shirts[Math.floor(Math.random() * shirts.length)];
    randomshoe = shoes[Math.floor(Math.random() * shoes.length)];
  }
  
  weaponElement.textContent = randomweapon;
  headgearElement.textContent = randomheadgear;
  shirtElement.textContent = randomshirt;
  shoeElement.textContent = randomshoe;
}

const tweetButton = document.getElementById("tweet-button");
tweetButton.addEventListener("click", function() {
  const weapon = document.getElementById("weapon").textContent;
  const headgear = document.getElementById("headgear").textContent;
  const shirt = document.getElementById("shirt").textContent;
  const shoe = document.getElementById("shoe").textContent;
  const tweetMessage = `I just generated a random weapon & outfit using the #Splatoon3 Randomizer!\n\nResults:\nWeapon - ${weapon}\nHeadgear - ${headgear}\nShirt - ${shirt}\nShoes - ${shoe}\nhttps://codymkw.github.io/splat3`;
  
      navigator.clipboard.writeText(tweetMessage);
      alert("The message was copied to clipboard now you can go to twitter and post it or you can post it somewhere else it's up to you! :D");
});

randomizeButton.addEventListener('click', () => {
  tweetButton.removeAttribute('disabled');
});

randomizeButton.addEventListener("click", randomize);

   // Get the footer element
   var footer = document.querySelector('footer');

   // Get the start year
   var startYear = 2023; // Replace with the desired start year
   
   // Get the current year
   var currentYear = new Date().getFullYear();
   
   // Build the footer text
   var footerText = '&copy; ' + (startYear === currentYear ? startYear : startYear + ' - ' + currentYear) + ' CodyMKW. All rights reserved.';
   
   // Update the footer text
   footer.innerHTML = footerText;
