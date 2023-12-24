  function showContent(page) {
    const contentTabs = document.querySelectorAll('.tabContent');
    contentTabs.forEach(tab => {
      tab.style.display = 'none';
    });
  
    if (page) {
      const contentElement = document.getElementById(page + 'Content');
      if (contentElement) {
        contentElement.style.display = 'block';
      } else {
        // If the requested page doesn't exist, show a custom 404 message
        const errorElement = document.getElementById('errorContent');
        if (errorElement) {
          errorElement.style.display = 'block';
        }
      }
    } else {
      // Default to the "About" tab if no specific page is provided
      document.getElementById('aboutContent').style.display = 'block';
    }
  }
  
  // Parse the URL to get the page parameter
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  showContent(pageParam);
  
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
  
  // Random dumb countdown timer code
  const countdownTitle = document.querySelector('#countdown-title');
  const countdownDays = document.querySelector('.countdown-days .countdown-value');
  const countdownHours = document.querySelector('.countdown-hours .countdown-value');
  const countdownMinutes = document.querySelector('.countdown-minutes .countdown-value');
  const countdownSeconds = document.querySelector('.countdown-seconds .countdown-value');
  let countdownInterval;
  
  function startCountdown(event) {
    event.preventDefault();
  
    const countdownDate = new Date(event.target.elements['countdown-date'].value);
    const countdownTitleValue = event.target.elements['countdown-title'].value.trim();
    const customMessage = event.target.elements['custom-message'].value.trim();
    const currentTime = new Date();
    const countdownTime = countdownDate.getTime() - currentTime.getTime();
  
    if (countdownTime <= 0) {
      alert('Please enter a future date');
      return;
    }
  
    clearInterval(countdownInterval);
  
    countdownInterval = setInterval(() => {
      const currentTime = new Date();
      const remainingTime = countdownDate.getTime() - currentTime.getTime();
  
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        updateCountdown(0, 0, 0, 0);
  
        // Display custom message or default message
        countdownTitle.textContent = customMessage || 'Time is up!';
  
        // Set the title based on whether custom message was provided
        updateCountdownTitle(customMessage ? 'Time is up!' : countdownTitleValue);
  
        // Store custom message in localStorage if provided
        if (customMessage) {
          localStorage.setItem('customMessage', customMessage);
        } else {
          localStorage.removeItem('customMessage');  // Remove custom message from localStorage
        }
        
        localStorage.removeItem('countdownDate');
        localStorage.removeItem('countdownTitle');
      } else {
        const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
        updateCountdown(remainingDays, remainingHours, remainingMinutes, remainingSeconds);
      }
    }, 1000);
  
    updateCountdownTitle(countdownTitleValue);
    localStorage.setItem('countdownDate', countdownDate);
    localStorage.setItem('countdownTitle', countdownTitleValue);
  }    
  
  function updateCountdown(days, hours, minutes, seconds) {
    countdownDays.textContent = days;
    countdownHours.textContent = hours.toString().padStart(2, '0');
    countdownMinutes.textContent = minutes.toString().padStart(2, '0');
    countdownSeconds.textContent = seconds.toString().padStart(2, '0');
  }
  
  function updateCountdownTitle(title) {
    const countdownTitle = document.querySelector('.countdown-title');
    countdownTitle.textContent = title;
  }
  
  function loadCountdown() {
    const countdownDate = new Date(localStorage.getItem('countdownDate'));
    const countdownTitleValue = localStorage.getItem('countdownTitle');
  
    if (countdownDate && countdownTitleValue) {
      const currentTime = new Date();
      const countdownTime = countdownDate.getTime() - currentTime.getTime();
  
      if (countdownTime > 0) {
        const remainingDays = Math.floor(countdownTime / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((countdownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((countdownTime % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((countdownTime % (1000 * 60)) / 1000);
  
        updateCountdown(remainingDays, remainingHours, remainingMinutes, remainingSeconds);
        updateCountdownTitle(countdownTitleValue);
        countdownInterval = setInterval(() => {
          const currentTime = new Date();
          const remainingTime = countdownDate.getTime() - currentTime.getTime();
  
          if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            updateCountdown(0, 0, 0, 0);
            countdownTitle.textContent = '';
            localStorage.removeItem('countdownDate');
            localStorage.removeItem('countdownTitle');
          } else {
            const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
            updateCountdown(remainingDays, remainingHours, remainingMinutes, remainingSeconds);
            updateCountdownTitle(countdownTitleValue);
          }
        }, 1000);
      } else {
        countdownTitle.textContent = localStorage.getItem('customMessage') || '';
        localStorage.removeItem('countdownDate');
        localStorage.removeItem('countdownTitle');
        localStorage.removeItem('customMessage');
      }
    }
  }
  
  // Event listener to trigger the countdown on form submission
  document.querySelector('.countdown-form').addEventListener('submit', startCountdown);
  
  loadCountdown();
  
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
     var footerText = '&copy; ' + (startYear === currentYear ? startYear : startYear + ' - ' + currentYear) + ' CodyMKW. All rights reserved. | <a href="?page=credits" onclick="showContent(\'creditsContent\')">Credits</a>';
     
     // Update the footer text
     footer.innerHTML = footerText;
