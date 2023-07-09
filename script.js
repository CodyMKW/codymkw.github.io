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
var counter = 0;
var colors = ["red", "blue", "green", "yellow", "purple"];

function clickProfilePicture() {
  counter++;
  if (counter === 17) {
    document.querySelector("#secret").classList.add("secret-theme");
    setInterval(function() {
      var randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.querySelector("#secret").style.color = randomColor;
      document.querySelector("#secret").style.backgroundColor = randomColor;
    }, 1000);
  }
}
