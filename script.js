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
    if (!secretThemeActive) {
      var confirmation = confirm("Warning: This secret theme may include flashing colors or other visual effects that could potentially trigger seizures or other adverse reactions in some individuals. Proceed with caution. Do you want to activate the secret theme?");
      
      if (confirmation) {
        var bodyElement = document.querySelector('body');
        var themes = ['dark-red', 'dark-blue', 'dark-purple', 'light-pink', 'light-blue', 'light-yellow']; // Add more colors if desired
        var intervalId;
        
        intervalId = setInterval(function() {
          var randomTheme = themes[Math.floor(Math.random() * themes.length)];
          bodyElement.className = randomTheme;
        }, 1000);
        
        // Save the interval ID and theme status
        bodyElement.dataset.intervalId = intervalId;
        secretThemeActive = true;
      }
    } else {
      var bodyElement = document.querySelector('body');
      clearInterval(bodyElement.dataset.intervalId);
      bodyElement.className = '';
      secretThemeActive = false;
    }
  }
}

// Attach click event listener to the profile picture
var profilePicture = document.querySelector('img[alt="Cody\'s Profile Picture"]');
profilePicture.addEventListener('click', activateSecretTheme);
