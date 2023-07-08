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
