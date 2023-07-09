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

<!-- Secret theme code below -->
  let clickCount = 0;
    const profilePic = document.getElementById("profile-pic");

    profilePic.addEventListener("click", function() {
      clickCount++;

      if (clickCount === 17) {
        activateRainbowTheme();
      }
    });

    function activateRainbowTheme() {
      const container = document.querySelector(".container");
      container.classList.add("rainbow-theme");
    }
