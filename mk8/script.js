const tracks = [
  "Mario Kart Stadium",
  "Water Park",
  "Sweet Sweet Canyon",
  "Thwomp Ruins",
  "Mario Circuit",
  "Toad Harbor",
  "Twisted Mansion",
  "Shy Guy Falls",
  "Sunshine Airport",
  "Dolphin Shoals",
  "Electrodrome",
  "Mount Wario",
  "Cloudtop Cruise",
  "Bone-Dry Dunes",
  "Bowser's Castle",
  "Rainbow Road",
  "Excitebike Arena",
  "Dragon Driftway",
  "Mute City",
  "(GCN) Baby Park",
  "(GBA) Cheese Land",
  "Wild Woods",
  "Animal Crossing",
  "(Wii) Moo Moo Meadows",
  "(GBA) Mario Circuit",
  "(DS) Cheep Cheep Beach",
  "(N64) Toad's Turnpike",
  "(GCN) Dry Dry Desert",
  "(SNES) Donut Plains 3",
  "(N64) Royal Raceway",
  "(3DS) DK Jungle",
  "(DS) Wario Stadium",
  "(GCN) Sherbet Land",
  "(3DS) Music Park",
  "(N64) Yoshi Valley",
  "(DS) Tick-Tock Clock",
  "(3DS) Piranha Plant Slide",
  "(Wii) Grumble Volcano",
  "(N64) Rainbow Road",
  "(Wii) Wairo's Gold Mine",
  "(SNES) Rainbow Road",
  "Ice Ice Outpost ",
  "Hyrule Circuit",
  "(3DS) Neo Bowser City",
  "(GBA) Ribbon Road",
  "Super Bell Subway",
  "Big Blue",
  "(Tour) Paris Promenade",
  "(3DS) Toad Circuit",
  "(N64) Choco Mountain",
  "(Wii) Coconut Mall",
  "(Tour) Tokyo Blur",
  "(DS) Shroom Ridge",
  "(GBA) Sky Garden",
  "Ninja Hideaway",
  "(Tour) New York Minute",
  "(SNES) Mario Circuit 3",
  "(N64) Kalimari Desert",
  "(DS) Waluigi Pinball",
  "(Tour) Sydney Sprint",
  "(GBA) Snow Land",
  "(Wii) Mushroom Gorge",
  "Sky-High Sundae",
  "(Tour) London Loop",
  "(GBA) Boo Lake",
  "(3DS) Rock Rock Mountain",
  "(Wii) Maple Treeway",
  "(Tour) Berlin Byways",
  "(DS) Peach Gardens",
  "Merry Mountain",
  "(3DS) Rainbow Road",
  "(Tour) Armsterdam Drift",
  "(GBA) Riverside Park",
  "(Wii) DK Summit",
  "Yoshi Island",
  "(Tour) Bangkok Rush",
  "(DS) Mario Circuit",
  "(GCN) Waluigi Stadium",
  "(Tour) Singapore Speedway",
  "(Wii) Koopa Cape",
  "(Tour) Los Angeles Laps",
  "(Wii) Moonview Highway",
  "Squeaky Clean Sprint",
  "(Tour) Athens Dash",
  "(GCN) Daisy Cruiser",
  "(GBA) Sunset Wilds",
  "(Tour) Vancouver Velocity",
  "(Wii) Daisy Circuit",
  "(Wii) Rainbow Road",
  "(Tour) Madrid Drive",
  "(Tour) Piranha Plant Cove",
  "(GCN) DK Mountain",
  "(SNES) Bowser Castle 3",
  "(Tour) Rome Avanti",
  "(3DS) Rosalina's Ice World"
];

const vehicles = [
  "Standard Kart",
  "Pipe Frame",
  "Mach 8",
  "Steel Driver",
  "Cat Cruiser",
  "Circuit Special",
  "Tri-Speeder",
  "Badwagon",
  "Prancer",
  "Biddybuggy",
  "Landship",
  "Sneeker",
  "Sports Coupe",
  "Gold Standard",
  "GLA",
  "W 25 Silver Arrow",
  "300 SL Roadster",
  "Blue Falcon",
  "Tanooki Kart",
  "B Dasher",
  "Streetle",
  "P-Wing",
  "Koopa Clown",
  "Standard Bike",
  "The Duke",
  "Flame Rider",
  "Varmint",
  "Mr. Scooty",
  "Master Cycle Zero",
  "City Tripper",
  "Comet",
  "Sport Bike",
  "Jet Bike",
  "Yoshi Bike",
  "Master Cycle",
  "Standard ATV",
  "Wild Wiggler",
  "Teddy Buggy",
  "Bone Rattler",
  "Splat Buggy",
  "Inkstriker"
];

const wheels = [
  "Standard",
  "Monster",
  "Roller",
  "Slim",
  "Slick",
  "Metal",
  "Button",
  "Off-Road",
  "Sponge",
  "Wood",
  "Cushion",
  "Blue Standard",
  "Hot Monster",
  "Azure Roller",
  "Crimson Slim",
  "Cyber Slick",
  "Retro Off-Road",
  "Gold Tires",
  "GLA Tires",
  "Triforce Tires",
  "Anicent Tires",
  "Leaf Tires"
];

const gliders = [
  "Super Glider",
  "Cloud Glider",
  "Wario Wing",
  "Waddle Wing",
  "Peach Parasol",
  "Parachute",
  "Parafoil",
  "Flower Glider",
  "Bowser Kite",
  "Plane Glider",
  "MKTV Parafoil",
  "Gold Glider",
  "Hylian Kite",
  "Paraglider",
  "Paper Glider"
];

const characters = [
  "Mario",
  "Luigi",
  "Peach",
  "Daisy",
  "Rosalina",
  "Tanooki Mario",
  "Cat Peach",
  "Birdo",
  "Birdo (Light Blue)",
  "Birdo (Black)",
  "Birdo (Red)",
  "Birdo (Yellow)",
  "Birdo (White)",
  "Birdo (Blue)",
  "Birdo (Green)",
  "Birdo (Orange)",
  "Yoshi",
  "Yoshi (Light Blue)",
  "Yoshi (Black)",
  "Yoshi (Red)",
  "Yoshi (Yellow)",
  "Yoshi (White)",
  "Yoshi (Blue)",
  "Yoshi (Pink)",
  "Yoshi (Orange)",
  "Toad",
  "Koopa Troopa",
  "Shy Guy",
  "Shy Guy (Light Blue)",
  "Shy Guy (Black)",
  "Shy Guy (Green)",
  "Shy Guy (Yellow)",
  "Shy Guy (White)",
  "Shy Guy (Blue)",
  "Shy Guy (Pink)",
  "Shy Guy (Orange)",
  "Lakitu",
  "Toadette",
  "King Boo",
  "Baby Mario",
  "Baby Luigi",
  "Baby Peach",
  "Baby Daisy",
  "Baby Rosalina",
  "Metal Mario",
  "Gold Mario",
  "Pink Gold Peach",
  "Wario",
  "Waluigi",
  "Donkey Kong",
  "Bowser",
  "Dry Bones",
  "Bowser Jr",
  "Dry Bowser",
  "Lemmy",
  "Larry",
  "Wendy",
  "Ludwig",
  "Iggy",
  "Roy",
  "Morton",
  "Inkling Girl",
  "Inkling Girl (Lime Green)",
  "Inkling Girl (Magenta)",
  "Inkling Boy",
  "Inkling Boy (Purple)",
  "Inkling Boy (Teal)",
  "Link",
  "Link (Champion's Tunic)",
  "Villager (Male)",
  "Villager (Female)",
  "Isabelle",
  "Mii",
  "Petey Piranha",
  "Wiggler",
  "Kamek",
  "Diddy Kong",
  "Funky Kong",
  "Pauline",
  "Peachette"
];

const trackElement = document.getElementById("track");
const vehicleElement = document.getElementById("vehicle");
const wheelElement = document.getElementById("wheel");
const gliderElement = document.getElementById("glider");
const characterElement = document.getElementById("character");
const randomizeButton = document.getElementById("randomize-button");
const hideGoldPartsCheckbox = document.getElementById("hide-gold-parts");
const hideGoldMarioCheckbox = document.getElementById("hide-gold-mario");
const hideAlternateCostumesCheckbox = document.getElementById("hide-alternate-costumes");
const hideTrackCheckbox = document.getElementById("hide-track");
const optionsButton = document.getElementById('options-button');
const closeButton = document.getElementById('close-button');
const patchnotescloseButton = document.getElementById('patch-notes-close-button');
const optionsCard = document.querySelector('.options-card');
const patchnotesCard = document.querySelector('.patch-notes-card');
const patchnotesButton = document.getElementById('patch-notes-button');

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
  if (patchnotesCard.style.display === "none") {
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
  let filteredVehicles = vehicles;
  let filteredWheels = wheels;
  let filteredGliders = gliders;
  let filteredCharacters = characters;
  
  // Check if "Hide Gold Parts" is checked and filter out unwanted parts
  if (hideGoldPartsCheckbox.checked) {
    filteredVehicles = vehicles.filter(vehicle => !vehicle.includes("Gold Standard"));
    filteredWheels = wheels.filter(wheel => !wheel.includes("Gold Tires"));
    filteredGliders = gliders.filter(glider => !glider.includes("Gold Glider"));
  }
  
  // Check if "Hide Gold Mario" is checked and filter out unwanted character
  if (hideGoldMarioCheckbox.checked) {
    filteredCharacters = characters.filter(character => !character.includes("Gold Mario"));
  }
  
  // Check if "Alternate costumes" is checked and filter out unwanted character
  if (hideAlternateCostumesCheckbox.checked) {
    filteredCharacters = filteredCharacters.filter(character => {
      return ![
        "Birdo (Light Blue)",
        "Birdo (Black)",
        "Birdo (Red)",
        "Birdo (Yellow)",
        "Birdo (White)",
        "Birdo (Blue)",
        "Birdo (Green)",
        "Birdo (Orange)",
        "Yoshi (Light Blue)",
        "Yoshi (Black)",
        "Yoshi (Red)",
        "Yoshi (Yellow)",
        "Yoshi (White)",
        "Yoshi (Blue)",
        "Yoshi (Pink)",
        "Yoshi (Orange)",
        "Shy Guy (Light Blue)",
        "Shy Guy (Black)",
        "Shy Guy (Green)",
        "Shy Guy (Yellow)",
        "Shy Guy (White)",
        "Shy Guy (Blue)",
        "Shy Guy (Pink)",
        "Shy Guy (Orange)",
        "Inkling Girl (Lime Green)",
        "Inkling Girl (Magenta)",
        "Inkling Boy (Purple)",
        "Inkling Boy (Teal)",
        "Link (Champion's Tunic)"
      ].includes(character);
    });
  }
  
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
  const randomCharacter = filteredCharacters[Math.floor(Math.random() * filteredCharacters.length)];
  const randomVehicle = filteredVehicles[Math.floor(Math.random() * filteredVehicles.length)];
  const randomWheel = filteredWheels[Math.floor(Math.random() * filteredWheels.length)];
  const randomGlider = filteredGliders[Math.floor(Math.random() * filteredGliders.length)];
  
  trackElement.textContent = randomTrack;
  characterElement.textContent = randomCharacter;
  vehicleElement.textContent = randomVehicle;
  wheelElement.textContent = randomWheel;
  gliderElement.textContent = randomGlider;
}


const tweetButton = document.getElementById("tweet-button");
tweetButton.addEventListener("click", function() {
  const track = document.getElementById("track").textContent;
  const character = document.getElementById("character").textContent;
  const vehicle = document.getElementById("vehicle").textContent;
  const wheel = document.getElementById("wheel").textContent;
  const glider = document.getElementById("glider").textContent;
  const tweetMessage = `I just generated a random track & combo using the #MarioKart8Deluxe Randomizer!\n\nResults:\nTrack - ${track}\nCharacter - ${character}\nVehicle - ${vehicle}\nWheel - ${wheel}\nGlider - ${glider}\nhttps://codymkw.github.io/mk8/`;
  const tweetMessage2 = `I just generated a random combo using the #MarioKart8Deluxe Randomizer!\n\nResults:\nCharacter - ${character}\nVehicle - ${vehicle}\nWheel - ${wheel}\nGlider - ${glider}\nhttps://codymkw.github.io/mk8/`;
  
  if (document.getElementById("hide-track").checked) {
    navigator.clipboard.writeText(tweetMessage2);
  } else
  navigator.clipboard.writeText(tweetMessage);
  alert("The message was copied to clipboard now you can go to twitter and post it or you can post it somewhere else it's up to you! :D");
});

function hideTrack() {
  if (hideTrackCheckbox.checked) {
    document.querySelector('.track-card').style.display = 'none';
  } else {
    document.querySelector('.track-card').style.display = 'block';
  }
}

// Save the state of the checkboxes in localStorage when they are checked/unchecked
hideGoldPartsCheckbox.addEventListener('change', () => {
  localStorage.setItem('hideGoldParts', hideGoldPartsCheckbox.checked);
});

hideGoldMarioCheckbox.addEventListener('change', () => {
  localStorage.setItem('hideGoldMario', hideGoldMarioCheckbox.checked);
});

hideAlternateCostumesCheckbox.addEventListener('change', () => {
  localStorage.setItem('hideAlternateCostumes', hideAlternateCostumesCheckbox.checked);
});

hideTrackCheckbox.addEventListener('change', () => {
  localStorage.setItem('hideTrack', hideTrackCheckbox.checked);
});

function loadOptionsState() {
  // Load the state of the checkboxes from localStorage
  const hideGoldParts = localStorage.getItem('hideGoldParts');
  const hideGoldMario = localStorage.getItem('hideGoldMario');
  const hideAlternateCostumes = localStorage.getItem('hideAlternateCostumes');
  const hideTrack = localStorage.getItem('hideTrack');

  // Set the checkboxes to their saved state
  if (hideGoldParts !== null) {
    hideGoldPartsCheckbox.checked = JSON.parse(hideGoldParts);
  }
  if (hideGoldMario !== null) {
    hideGoldMarioCheckbox.checked = JSON.parse(hideGoldMario);
  }
  if (hideAlternateCostumes !== null) {
    hideAlternateCostumesCheckbox.checked = JSON.parse(hideAlternateCostumes);
  }
  if (hideTrack !== null) {
    hideTrackCheckbox.checked = JSON.parse(hideTrack);
    // If Hide tracks is checked, hide the track card
    if (hideTrackCheckbox.checked) {
      document.querySelector('.track-card').style.display = 'none';
    }
  }
}

// Call the loadOptionsState function when the page is loaded
loadOptionsState();

randomizeButton.addEventListener('click', () => {
  tweetButton.removeAttribute('disabled');
});

randomizeButton.addEventListener("click", randomize);
hideTrackCheckbox.addEventListener("change", hideTrack);

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
