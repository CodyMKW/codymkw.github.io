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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./codymkw-sw.js')
    .then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
}
