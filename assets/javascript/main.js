function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function fetchWithRetry(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.error) {
        var fallbackUrl = url.split('?')[0];
        return fetch(fallbackUrl).then(function (fallbackResponse) {
          return fallbackResponse.json();
        });
      }
      return data;
    })
    .catch(function () {
      var fallbackUrl = url.split('?')[0];
      return fetch(fallbackUrl).then(function (fallbackResponse) {
        return fallbackResponse.json();
      });
    });
}

function updatePresence() {
  fetchWithRetry('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1')
    .then(function (data) {
      var state = data.friend.presence.state.toLowerCase();
      var onlineStatus = state === 'playing'
        ? 'Online'
        : capitalizeFirstLetter(state);

      var gameName = data.friend.presence.game.name || null;
      var statusContainer = document.getElementById('status-container');

      var statusColor = '';
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
        statusContainer.innerHTML =
          '<p>Currently <span style="color: ' + statusColor + ';">' +
          onlineStatus +
          '</span> playing ' + gameName +
          ' <a id="check-switch-game-status">🔎</a></p>';
      } else {
        statusContainer.innerHTML =
          '<p>Currently <span style="color: ' + statusColor + ';">' +
          onlineStatus.charAt(0) + onlineStatus.slice(1).toLowerCase() +
          '</span> <a id="check-switch-game-status">🔎</a></p>';
      }

      document
        .getElementById('check-switch-game-status')
        .addEventListener('click', openModal);
    })
    .catch(function (error) {
      console.error('Error fetching data:', error);
    });
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
  
var startYear = 2023;
var currentYear = new Date().getFullYear();
var yearText = startYear === currentYear ? startYear : startYear + ' - ' + currentYear;
var yearSpan = document.getElementById('copyrightYears');
yearSpan.innerHTML = '&copy; ' + yearText + ' ';

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