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

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function filterAmiiboGear() {
  filteredAmiiboGear.headgears = headgears.filter(item => !item.isAmiibo);
  filteredAmiiboGear.shirts = shirts.filter(item => !item.isAmiibo);
  filteredAmiiboGear.shoes = shoes.filter(item => !item.isAmiibo);
}

function getSelectedWeaponType() {
  for (let filter of weaponFilters) {
    if (filter.checked) {
      return filter.value;
    }
  }
  return "All";
}

function filterWeaponsByType() {
  const selectedWeaponType = getSelectedWeaponType();
  if (selectedWeaponType === "All") {
    return weapons;
  }
  return weapons.filter(weapon => weapon.class === selectedWeaponType);
}

function randomize() {
  const filteredWeapons = filterWeaponsByType();
  const randomWeapon = getRandomItem(filteredWeapons);
  const randomHeadgear = getRandomItem(hideAmiiboGearCheckbox.checked ? filteredAmiiboGear.headgears : headgears);
  const randomShirt = getRandomItem(hideAmiiboGearCheckbox.checked ? filteredAmiiboGear.shirts : shirts);
  const randomShoe = getRandomItem(hideAmiiboGearCheckbox.checked ? filteredAmiiboGear.shoes : shoes);

  const weaponLink = `https://splatoonwiki.org/wiki/${randomWeapon.name.replace(/ /g, "_")}`;
  const headgearLink = `https://splatoonwiki.org/wiki/${randomHeadgear.name.replace(/ /g, "_")}`;
  const shirtLink = `https://splatoonwiki.org/wiki/${randomShirt.name.replace(/ /g, "_")}`;
  const shoeLink = `https://splatoonwiki.org/wiki/${randomShoe.name.replace(/ /g, "_")}`;

  weaponElement.innerHTML = `<a href="${weaponLink}" target="_blank">${randomWeapon.name}</a>`;
  headgearElement.innerHTML = `<a href="${headgearLink}" target="_blank">${randomHeadgear.name}</a>`;
  shirtElement.innerHTML = `<a href="${shirtLink}" target="_blank">${randomShirt.name}</a>`;
  shoeElement.innerHTML = `<a href="${shoeLink}" target="_blank">${randomShoe.name}</a>`;
}

randomizeButton.addEventListener("click", randomize);
closeButton.addEventListener("click", () => optionsCard.style.display = 'none');
optionsButton.addEventListener("click", () => optionsCard.style.display = 'block');
patchnotescloseButton.addEventListener("click", () => patchnotesCard.style.display = 'none');
patchnotesButton.addEventListener("click", () => patchnotesCard.style.display = 'block');

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    weapons = data.weapons;
    headgears = data.headgears;
    shirts = data.shirts;
    shoes = data.shoes;

    filterAmiiboGear();

    randomize();
  })
  .catch(error => console.error("Error fetching data:", error));

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
