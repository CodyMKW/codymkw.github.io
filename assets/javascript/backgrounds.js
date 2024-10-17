var backgrounds = [
    'assets/images/backgrounds/bg.webp',
    'assets/images/backgrounds/bg2.webp',
    'assets/images/backgrounds/bg3.webp',
    'assets/images/backgrounds/bg4.webp',
    'assets/images/backgrounds/bg5.webp',
    'assets/images/backgrounds/bg6.webp',
    'assets/images/backgrounds/bg7.webp',
    'assets/images/backgrounds/bg8.webp',
    'assets/images/backgrounds/bg9.webp',
    'assets/images/backgrounds/bg10.webp'
  ];
  
  var randomIndex = Math.floor(Math.random() * backgrounds.length);
  var imageUrl = 'url(' + backgrounds[randomIndex] + ')';
  
  // Set the background image for the separate background element
  var backgroundElement = document.getElementById('background-image');
  backgroundElement.style.backgroundImage = imageUrl;
  
  // Apply blur effect only to the separate background element
  backgroundElement.style.backgroundSize = 'cover';
  backgroundElement.style.position = 'fixed';
  backgroundElement.style.top = '0';
  backgroundElement.style.left = '0';
  backgroundElement.style.right = '0';
  backgroundElement.style.bottom = '0';
  backgroundElement.style.filter = 'blur(5px)';
  backgroundElement.style.zIndex = '-1';