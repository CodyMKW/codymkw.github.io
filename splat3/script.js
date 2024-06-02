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
const weaponFilters = document.getElementsByName("weapon-type");

let weapons = [];
let headgears = [];
let shirts = [];
let shoes = [];
let filteredAmiiboGear = {
  headgears: [],
  shirts: [],
  shoes: []
};

// Fetch data from the JSON file
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    weapons = data.weapons;
    headgears = data.headgears;
    shirts = data.shirts;
    shoes = data.shoes;
    filteredAmiiboGear = data.filteredAmiiboGear;
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
  let randomweapon, randomheadgear, randomshirt, randomshoe;
  const selectedFilter = Array.from(weaponFilters).find(filter => filter.checked)?.value || "All";
  
  const filteredWeapons = selectedFilter === "All" ? weapons : weapons.filter(weapon => weapon.type === selectedFilter);

  if (filteredWeapons.length === 0) {
    weaponElement.textContent = "No weapons found";
    randomweapon = null;
  } else {
    randomweapon = filteredWeapons[Math.floor(Math.random() * filteredWeapons.length)].name;
  }

  // Check if "Hide amiibo gear" is checked and filter out unwanted gear
  if (hideAmiiboGearCheckbox.checked) {
    const filteredHeadgears = headgears.filter(gear => !filteredAmiiboGear.headgears.includes(gear));
    const filteredShirts = shirts.filter(gear => !filteredAmiiboGear.shirts.includes(gear));
    const filteredShoes = shoes.filter(gear => !filteredAmiiboGear.shoes.includes(gear));
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
