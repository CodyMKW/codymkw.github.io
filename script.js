var clickCount = 0;
var gamesData = [
  {
    name: "Animal Crossing: New Horizons",
    playtime: 6165,
    link: "https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch",
    cover: "https://art.gametdb.com/switch/coverHQ/US/ACBAA.jpg"
  },
  {
    name: "Splatoon 3",
    playtime: 380,
    link: "https://www.nintendo.com/store/products/splatoon-3-switch",
    cover: "https://art.gametdb.com/switch/coverM/US/AV5JA.jpg"
  },
  {
    name: "Ninjala",
    playtime: 230,
    link: "https://www.nintendo.com/store/products/ninjala-switch",
    cover: "https://art.gametdb.com/switch/coverM/JA/AJL5A.jpg"
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
