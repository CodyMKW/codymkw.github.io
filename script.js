var clickCount = 0;
var leaderboardData = [
  { rank: 1, player: "FalconXD", score: 5000 },
  { rank: 2, player: "Cody", score: 5000 },
  { rank: 3, player: "Joseph", score: 5000 },
  { rank: 4, player: "Brandon", score: 5000 },
  { rank: 5, player: "Vic35000vr", score: 5000 },
  { rank: 6, player: "Believe", score: 5000 }
];
var leaderboardUpdated = false;

function showAbout() {
  document.getElementById('about').style.display = 'block';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('leaderboard').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}

function showSwitchFC() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'block';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('leaderboard').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}

function showNinNews() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'block';
  document.getElementById('leaderboard').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}

function showLeaderboard() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('leaderboard').style.display = 'block';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
  
    // Add daily points to player scores
  addDailyPoints();
    
    // Get current date
  var currentDate = new Date();

  // Check if current day is Friday (day index 5)
  if (currentDate.getDay() === 5 && !leaderboardUpdated) {
    // Update leaderboard if it's Friday and not already updated
    updateLeaderboard();
    leaderboardUpdated = true;
  }
}

function showWebApps() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('leaderboard').style.display = 'none';
  document.getElementById('webapps').style.display = 'block';
  document.getElementById('socialmedia').style.display = 'none';
}

function showSocialMedia() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('ninnews').style.display = 'none';
  document.getElementById('leaderboard').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'block';
}

function addDailyPoints() {
  leaderboardData.forEach(function (entry) {
    // Generate a random daily score increase (50 to 350)
    var dailyIncrease = Math.floor(Math.random() * 301) + 50;
    entry.score += dailyIncrease;
  });
}

function updateLeaderboard() {
  // Check if current day is Friday (day index 5)
  if (new Date().getDay() !== 5) {
    return; // Do not update if it's not Friday
  }

  // Update player scores randomly
  leaderboardData.forEach(function (entry) {
    // Generate a random score change (-500 to 500)
    var scoreChange = Math.floor(Math.random() * 1001) - 500;
    entry.score += scoreChange;
  });

  // Sort leaderboard based on scores
  leaderboardData.sort(function (a, b) {
    return b.score - a.score;
  });

  // Update leaderboard table
  var leaderboardTable = document.querySelector('#leaderboard tbody');

  // Clear existing rows
  leaderboardTable.innerHTML = '';

  // Create new rows based on the updated leaderboard data
  leaderboardData.forEach(function (entry) {
    var row = document.createElement('tr');
    row.innerHTML = '<td>' + entry.rank + '</td><td>' + entry.player + '</td><td>' + entry.score + '</td>';
    leaderboardTable.appendChild(row);
  });
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
