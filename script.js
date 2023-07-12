var clickCount = 0;
var gamesData = [
  {
    name: "Animal Crossing: New Horizons",
    playtime: 6175,
    link: "https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch",
    cover: "https://static-cdn.jtvnw.net/ttv-boxart/509538_IGDB-144x192.jpg"
  },
  {
    name: "Splatoon 3",
    playtime: 385,
    link: "https://www.nintendo.com/store/products/splatoon-3-switch",
    cover: "https://static-cdn.jtvnw.net/ttv-boxart/1158884259_IGDB-144x192.jpg"
  },
  {
    name: "Ninjala",
    playtime: 230,
    link: "https://www.nintendo.com/store/products/ninjala-switch",
    cover: "https://static-cdn.jtvnw.net/ttv-boxart/508259_IGDB-144x192.jpg"
  },
  {
    name: "Fall Guys",
    playtime: 145,
    link: "https://www.nintendo.com/store/products/fall-guys-switch",
    cover: "https://static-cdn.jtvnw.net/ttv-boxart/512980-144x192.jpg"
  },
  {
    name: "Fortnite",
    playtime: 2790,
    link: "https://www.nintendo.com/store/products/fortnite-switch",
    cover: "https://static-cdn.jtvnw.net/ttv-boxart/33214-144x192.jpg"
  }
];

// Sort games based on playtime in descending order
gamesData.sort(function (a, b) {
  return b.playtime - a.playtime;
});

// Function to generate the HTML for the cover art image
function generateCoverArtHTML(imageUrl, altText) {
  return '<img src="' + imageUrl + '" alt="' + altText + '" class="game-cover">';
}

// Update games table
var gamesTable = document.querySelector('#games-table tbody');

// Clear existing rows
gamesTable.innerHTML = '';

// Create new rows based on the updated games data
gamesData.forEach(function (game) {
  var row = document.createElement('tr');
  row.innerHTML = '<td>' + generateCoverArtHTML(game.cover, game.name) + '</td><td><a href="' + game.link + '" target="_blank">' + game.name + '</a></td><td>' + formatPlaytime(game.playtime) + ' hours</td>';
  gamesTable.appendChild(row);
});

// Function to format playtime with comma for thousands
function formatPlaytime(playtime) {
  return playtime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Add a tooltip with game name to the cover art image
function generateCoverArtHTML(coverURL, gameName) {
  return '<img src="' + coverURL + '" alt="Cover Art" title="' + gameName + '" style="max-width: 70px; margin-right: 10px; margin-right: 10px; border-radius: 4px;">';
}

function showAbout() {
  document.getElementById('about').style.display = 'block';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('most-played-games').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}

function showSwitchFC() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'block';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('most-played-games').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}

function showNinNews() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'block';
  document.getElementById('most-played-games').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}

function showMostPlayedGames() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('most-played-games').style.display = 'block';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}


function showWebApps() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('most-played-games').style.display = 'none';
  document.getElementById('webapps').style.display = 'block';
  document.getElementById('socialmedia').style.display = 'none';
}

function showSocialMedia() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('most-played-games').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'block';
}

function activateSecretTheme() {
  clickCount++;

  if (clickCount === 17) {
    var bodyElement = document.querySelector('body');
    var themes = ['alizarin-crimson', 'absolute-zero', 'amethyst', 'baby-pink', 'aquamarine', 'arylide-yellow', 'orange']; // Add more colors if desired

    secretThemeInterval = setInterval(function() {
      var randomTheme = themes[Math.floor(Math.random() * themes.length)];
      bodyElement.className = randomTheme;
    }, 900);

    // Show seizure warning popup
    alert("Seizure Warning: The secret theme may contain flashing lights or rapidly changing colors. If you have photosensitive epilepsy or any similar condition, please disable the secret theme immediately by clicking the profile picture again.");
  } else if (clickCount === 18) {
    clearInterval(secretThemeInterval); // Disable the secret theme
    document.querySelector('body').className = ''; // Remove any theme classes
    clickCount = 0; // Reset click count
  }
}

// Check the hash value in the URL and show the corresponding section
function showSectionFromHash() {
  var hash = window.location.hash;
  var sections = ['about', 'switchfc', 'ninnews', 'most-played-games', 'webapps', 'socialmedia'];

  // Hide all sections
  sections.forEach(function (section) {
    document.getElementById(section).style.display = 'none';
  });

  // Show the section corresponding to the hash value
  if (sections.includes(hash.substr(1))) {
    document.getElementById(hash.substr(1)).style.display = 'block';

    // Scroll to the "CodyMKW" text
    document.getElementById('cody-heading').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // If the hash value is not a valid section ID, show the default section (About)
    document.getElementById('about').style.display = 'block';

    // Scroll to the "CodyMKW" text
    document.getElementById('cody-heading').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Function to update the hash value in the URL and display the corresponding section
function updateHash(section) {
  // Remove the previous hash from the URL
  history.pushState('', document.title, window.location.pathname);

  // Add the new hash to the URL
  window.location.hash = section;

  // Show the corresponding section and scroll to the "CodyMKW" text
  showSectionFromHash();
}

// Call the function on page load
showSectionFromHash();

// Attach click event listener to the profile picture
var profilePicture = document.getElementById('profile-picture');
profilePicture.addEventListener('click', activateSecretTheme);

// Get the current date
    var currentDate = new Date();

    // Define the target date for the birthday (January 17th)
    var birthday = new Date(currentDate.getFullYear(), 0, 17);

    // Check if it's the birthday
    if (
      currentDate.getMonth() === birthday.getMonth() &&
      currentDate.getDate() === birthday.getDate()
    ) {
      // Add cake emojis and sparkle effect to the heading
      var codyHeading = document.getElementById("cody-heading");
      var codyHeading2 = document.getElementById("cody-heading2");
      codyHeading.innerHTML = "🎂 CodyMKW 🎂";
      codyHeading2.innerHTML = "Happy Birthday!! 🥳";

      // Add shimmer effect
      codyHeading.classList.add("shimmer");
      codyHeading2.classList.add("shimmer");
    }
