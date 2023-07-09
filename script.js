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
    var themes = ['dark-red', 'dark-blue', 'dark-purple', 'light-pink', 'light-blue', 'light-yellow']; // Add more colors if desired
    
    setInterval(function() {
      var randomTheme = themes[Math.floor(Math.random() * themes.length)];
      bodyElement.className = randomTheme;
    }, 500);
  }
}

// Attach click event listener to the profile picture
var profilePicture = document.querySelector('img[alt="Cody\'s Profile Picture"]');
profilePicture.addEventListener('click', activateSecretTheme);
