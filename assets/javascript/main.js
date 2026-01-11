function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchWithRetry(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            const fallbackUrl = url.split('?')[0]; 
            const fallbackResponse = await fetch(fallbackUrl);
            return await fallbackResponse.json();
        }
        
        return data;
    } catch (error) {
        const fallbackUrl = url.split('?')[0]; 
        const fallbackResponse = await fetch(fallbackUrl);
        return await fallbackResponse.json();
    }
}

async function updatePresence() {
    try {
        const data = await fetchWithRetry('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1');
        
        const onlineStatus = (data.friend.presence.state.toLowerCase() === 'playing') ? 'Online' : capitalizeFirstLetter(data.friend.presence.state.toLowerCase());
        const gameName = data.friend.presence.game.name || null;

        const statusContainer = document.getElementById('status-container');

        let statusColor = '';
        switch (onlineStatus.toLowerCase()) {
            case 'online':
            case 'playing':
                statusColor = '#00C900';
                break;
            case 'offline':
                statusColor = 'red';
                break;
            case 'inactive':
                statusColor = 'yellow';
                break;
            default:
                statusColor = 'white';
        }

        if (gameName) {
            statusContainer.innerHTML = `<p>Currently <span style="color: ${statusColor};">${onlineStatus}</span> playing ${gameName} <a id="check-switch-game-status">🔎</a></p>`;
        } else {
            statusContainer.innerHTML = `<p>Currently <span style="color: ${statusColor};">${onlineStatus.charAt(0)}${onlineStatus.slice(1).toLowerCase()}</span> <a id="check-switch-game-status">🔎</a></p>`;
        }

        document.getElementById('check-switch-game-status').addEventListener('click', openModal);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function openModal() {
  const currentTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = 'X';
  closeButton.onclick = closeModal;
  
  const pictureElement = document.createElement('picture');
  
  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('srcset', `https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5/embed?theme=${currentTheme}&friend-code=2549-4631-6600&transparent=1`);
  sourceElement.setAttribute('media', '(prefers-color-scheme: dark)');
  
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', `https://nxapi-presence.fancy.org.uk/api/presence/644cd5195/embed?theme=${currentTheme}&friend-code=2549-4631-6600&transparent=1`);
  imgElement.setAttribute('alt', 'Nintendo Switch presence');
  
  pictureElement.appendChild(sourceElement);
  pictureElement.appendChild(imgElement);
  modalContent.appendChild(closeButton);
  modalContent.appendChild(pictureElement);
  modalContainer.appendChild(modalContent);
  
  document.body.appendChild(modalContainer);
  
  document.body.classList.add('modal-open');

  const themeChangeHandler = (e) => {
    const newTheme = e.detail;
    sourceElement.setAttribute('srcset', sourceElement.srcset.replace(/theme=\w+/, `theme=${newTheme}`));
    imgElement.setAttribute('src', imgElement.src.replace(/theme=\w+/, `theme=${newTheme}`));
  };
  document.addEventListener('themeChanged', themeChangeHandler);

  modalContainer.addEventListener('click', function handler(e) {
    if (e.target === modalContainer) {
      document.removeEventListener('themeChanged', themeChangeHandler);
      modalContainer.removeEventListener('click', handler);
    }
  });
}

function closeModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.parentNode.removeChild(modalContainer);
  
  document.body.classList.remove('modal-open');
}

updatePresence();

setInterval(updatePresence, 5000);

var currentDate = new Date();

var birthday = new Date(currentDate.getFullYear(), 0, 17);

if (
  currentDate.getMonth() === birthday.getMonth() &&
  currentDate.getDate() === birthday.getDate()
) {
  var birthDate = new Date(1991, 0, 17);
  var age = currentDate.getFullYear() - birthDate.getFullYear();

  var codyHeading = document.getElementById("cody-heading");
  var codyHeading2 = document.getElementById("cody-heading2");
  codyHeading.innerHTML = "🎂 Cody 🎂";
  codyHeading2.innerHTML = "Happy " + age + getOrdinalSuffix(age) + " Birthday!! 🥳";

  codyHeading.classList.add("shimmer");
  codyHeading2.classList.add("shimmer");

  var headerBg = document.getElementById("cody-header-bg");
  if (headerBg) {
      headerBg.classList.add("cody-header-bg-visible");
  }

  var ageElement = document.getElementById('age');
  if (ageElement) {
    ageElement.textContent = age.toString();
  }
}

function getOrdinalSuffix(number) {
  var suffix = 'th';
  var lastDigit = number % 10;
  var lastTwoDigits = number % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    suffix = 'st';
  } else if (lastDigit === 2 && lastTwoDigits !== 12) {
    suffix = 'nd';
  } else if (lastDigit === 3 && lastTwoDigits !== 13) {
    suffix = 'rd';
  }

  return suffix;
}
  
  function changeLocation(url) {
    window.location.href = url;
  }
  
     var footer = document.querySelector('footer');
     var startYear = 2023; 
     var currentYear = new Date().getFullYear();
     var footerText = '&copy; ' + (startYear === currentYear ? startYear : startYear + ' - ' + currentYear) + ' CodyMKW. All rights reserved. | <a href="credits" onclick="showContent(\'creditsContent\')">Credits</a>';
     footer.innerHTML = footerText;

function updateTitleAndFavicon() {
  var currentUrl = window.location.href;

  if (isSpecificDomain(currentUrl, 'codymkw.netlify.app')) {
    document.title = '[PREVIEW] ' + document.title;

    var favicon = document.querySelector("link[rel='icon']");
    favicon.href = 'https://i.imgur.com/1Tttgz6.png';

    var betaIcon = document.createElement('div');
    betaIcon.className = 'beta-icon';
    betaIcon.id = 'beta-icon';
    var img = document.createElement('img');
    img.src = 'https://i.imgur.com/1Tttgz6.png';
    img.alt = 'Beta Icon';
    betaIcon.appendChild(img);
    document.body.appendChild(betaIcon);

    document.getElementById('beta-icon').addEventListener('click', openBetaModal);
  }
}

function openBetaModal() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = 'X';
    closeButton.onclick = closeModal;

    const betaText = document.createElement('p');
    betaText.innerHTML = '<h1 style="text-align: center;"><b><u>Preview Webpage</u></b></h1><br>This is a preview version of the webpage. It gets updates for testing before being pushed to the main version. <br>';

    const linkContainer = document.createElement('div');
    linkContainer.style.textAlign = 'center';

    const betaLink = document.createElement('a');
    betaLink.href = 'https://codymkw.github.io';
    betaLink.textContent = 'Click here to visit the main version.';
    linkContainer.appendChild(betaLink);

    betaText.appendChild(linkContainer);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(betaText);
    modalContainer.appendChild(modalContent);

    document.body.appendChild(modalContainer);
    document.body.classList.add('modal-open');
}

function isSpecificDomain(url, domain) {
  return url.includes(domain);
}

updateTitleAndFavicon();

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStyle = document.getElementById('theme-style');
    const siteTitleImage = document.getElementById('site-title-image');
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        setLightTheme();
    } else {
        setDarkTheme();
    }
    
    themeToggle.addEventListener('click', function() {
        if (themeStyle.getAttribute('href').includes('light')) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    });
    
    function setLightTheme() {
        themeStyle.href = 'assets/css/main-light.css';
        themeToggle.innerHTML = '<span>🌙</span> Dark Mode';
        localStorage.setItem('theme', 'light');

        if (siteTitleImage) {
            siteTitleImage.src = 'assets/images/Site_Title(light).png';
        }

        document.dispatchEvent(new CustomEvent('themeChanged', { detail: 'light' }));
    }

    function setDarkTheme() {
        themeStyle.href = 'assets/css/main.css';
        themeToggle.innerHTML = '<span>☀️</span> Light Mode';
        localStorage.setItem('theme', 'dark');

        if (siteTitleImage) {
            siteTitleImage.src = 'assets/images/Site_Title(dark).png';
        }

        document.dispatchEvent(new CustomEvent('themeChanged', { detail: 'dark' }));
    }
});