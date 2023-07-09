var clickCount = 0;

function showAbout() {
  document.getElementById('about').style.display = 'block';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}

function showSwitchFC() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'block';
  document.getElementById('webapps').style.display = 'none';
  document.getElementById('socialmedia').style.display = 'none';
}

function showWebApps() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
  document.getElementById('webapps').style.display = 'block';
  document.getElementById('socialmedia').style.display = 'none';
}

function showSocialMedia() {
  document.getElementById('about').style.display = 'none';
  document.getElementById('switchfc').style.display = 'none';
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

   // Calculate the age based on the difference in years
    var age = currentDate.getFullYear() - targetDate.getFullYear();

    // Check if it's the birthday
    if (
      currentDate.getMonth() === birthday.getMonth() &&
      currentDate.getDate() === birthday.getDate()
    ) {
      // Add cake emojis and sparkle effect to the heading
      var codyHeading = document.getElementById("cody-heading");
      codyHeading.innerHTML = "🎂 CodyMKW 🎂";

      // Add sparkle effect
      codyHeading.classList.add("sparkle-effect");
    }

if (currentDate < birthday) {
    age -= 1; // Subtract 1 if the birthday hasn't occurred yet
  }
// Update the age element in the HTML
  document.getElementById("age").textContent = age;
