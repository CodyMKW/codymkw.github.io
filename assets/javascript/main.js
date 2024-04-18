// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to fetch data from the API and update HTML content
function updatePresence() {
  // Fetch JSON data from the API
  fetch('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1')
    .then(response => response.json())
    .then(data => {
      // Extract online status and game name from the JSON data
      const onlineStatus = capitalizeFirstLetter(data.friend.presence.state.toLowerCase());
      const gameName = data.friend.presence.game.name || null;

      // Select the element where the content will be updated
      const statusContainer = document.getElementById('status-container');

      // Define colors based on the online status
      let statusColor = '';
      switch (onlineStatus.toLowerCase()) {
        case 'online':
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

      // Update HTML content based on whether a game is being played or not
      if (gameName) {
        statusContainer.innerHTML = `<p>Currently <span style="color: ${statusColor};">${onlineStatus.charAt(0)}${onlineStatus.slice(1).toLowerCase()}</span> playing ${gameName} <a id="check-switch-game-status">🔎</a></p>`;
      } else {
        statusContainer.innerHTML = `<p>Currently <span style="color: ${statusColor};">${onlineStatus.charAt(0)}${onlineStatus.slice(1).toLowerCase()}</span> <a id="check-switch-game-status">🔎</a></p>`;
      }

      // Add event listener to the link to open modal
      document.getElementById('check-switch-game-status').addEventListener('click', openModal);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to open modal
function openModal() {
  // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  
  // Create close button
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = 'X';
  closeButton.onclick = closeModal;
  
  // Create picture element
  const pictureElement = document.createElement('picture');
  
  // Create source element
  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('srcset', 'https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5/embed?include-splatoon3=1&theme=dark&scale=2&friend-code=2549-4631-6600&transparent=1&width=630&show-splatoon3-fest-team=1');
  sourceElement.setAttribute('media', '(prefers-color-scheme: dark)');
  
  // Create img element
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', 'https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5/embed?include-splatoon3=1&theme=dark&scale=2&friend-code=2549-4631-6600&transparent=1&width=630&show-splatoon3-fest-team=1');
  imgElement.setAttribute('alt', 'Nintendo Switch presence');
  
  // Append elements
  pictureElement.appendChild(sourceElement);
  pictureElement.appendChild(imgElement);
  modalContent.appendChild(closeButton);
  modalContent.appendChild(pictureElement);
  modalContainer.appendChild(modalContent);
  
  // Append modal container to body
  document.body.appendChild(modalContainer);
  
  // Add class to body to dim the screen
  document.body.classList.add('modal-open');
}

// Function to close modal
function closeModal() {
  // Remove modal container
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.parentNode.removeChild(modalContainer);
  
  // Remove class to body to undim the screen
  document.body.classList.remove('modal-open');
}

// Call the function initially to update the content
updatePresence();

// Update presence every 5 seconds
setInterval(updatePresence, 5000);

// Birthday code
// Get the current date
var currentDate = new Date();

// Define the target date for the birthday (January 17th)
var birthday = new Date(currentDate.getFullYear(), 0, 17);

// Check if it's the birthday
if (
  currentDate.getMonth() === birthday.getMonth() &&
  currentDate.getDate() === birthday.getDate()
) {
  // Calculate age based on birthdate
  var birthDate = new Date(1991, 0, 17);
  var age = currentDate.getFullYear() - birthDate.getFullYear();

  // Add cake emojis and sparkle effect to the heading
  var codyHeading = document.getElementById("cody-heading");
  var codyHeading2 = document.getElementById("cody-heading2");
  codyHeading.innerHTML = "🎂 CodyMKW 🎂";
  codyHeading2.innerHTML = "Happy " + age + getOrdinalSuffix(age) + " Birthday!! 🥳";

  // Add shimmer effect
  codyHeading.classList.add("shimmer");
  codyHeading2.classList.add("shimmer");

  // Update age in the HTML code
  var ageElement = document.getElementById('age');
  if (ageElement) {
    ageElement.textContent = age.toString();
  }
}

// Function to get the ordinal suffix for the age
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
  
  // Function to change the location to the specified URL
  function changeLocation(url) {
    window.location.href = url;
  }
  
     // Get the footer element
     var footer = document.querySelector('footer');
  
     // Get the start year
     var startYear = 2023; // Replace with the desired start year
     
     // Get the current year
     var currentYear = new Date().getFullYear();
     
     // Build the footer text
     var footerText = '&copy; ' + (startYear === currentYear ? startYear : startYear + ' - ' + currentYear) + ' CodyMKW. All rights reserved. | <a href="credits" onclick="showContent(\'creditsContent\')">Credits</a>';
     
     // Update the footer text
     footer.innerHTML = footerText;

// Function to change the title and favicon based on the URL
function updateTitleAndFavicon() {
  // Get the current URL
  var currentUrl = window.location.href;

  // Check if the URL matches the desired domain
  if (isSpecificDomain(currentUrl, 'codymkw.netlify.app')) {
    // Add [BETA] before the existing title
    document.title = '[BETA] ' + document.title;

    // Change the favicon
    var favicon = document.querySelector("link[rel='icon']");
    favicon.href = 'https://i.imgur.com/1Tttgz6.png';

    // Add the beta icon to the page
    var betaIcon = document.createElement('div');
    betaIcon.className = 'beta-icon';
    betaIcon.id = 'beta-icon';
    var img = document.createElement('img');
    img.src = 'https://i.imgur.com/1Tttgz6.png';
    img.alt = 'Beta Icon';
    betaIcon.appendChild(img);
    document.body.appendChild(betaIcon);

    // Add event listener to the link to beta modal
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

    // Add text indicating beta version and link to the public version
    const betaText = document.createElement('p');
    betaText.textContent = 'This is a beta version of the webpage. Click ';
    const betaLink = document.createElement('a');
    betaLink.href = 'https://codymkw.github.io';
    betaLink.textContent = 'here';
    betaText.appendChild(betaLink);
    betaText.innerHTML += ' to visit the public version.';

    modalContent.appendChild(closeButton);
    modalContent.appendChild(betaText);
    modalContainer.appendChild(modalContent);

    document.body.appendChild(modalContainer);
    document.body.classList.add('modal-open');
}

// Function to check if the URL matches a specific domain
function isSpecificDomain(url, domain) {
  return url.includes(domain);
}

// Call the function to update title and favicon
updateTitleAndFavicon();
