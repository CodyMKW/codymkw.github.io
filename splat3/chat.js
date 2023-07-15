window.addEventListener('DOMContentLoaded', function() {
    var chatContainer = document.querySelector('.chat-container');
    var chatFrame = chatContainer.querySelector('.chat-frame');
    var chatWarning = chatContainer.querySelector('#chat-warning');
  
    function checkChatContainerSize() {
      if (window.matchMedia("(max-width: 728px)").matches) {
        chatFrame.style.display = 'none';
        chatWarning.style.display = 'block';
      } else {
        chatFrame.style.display = 'block';
        chatWarning.style.display = 'none';
      }
    }
  
    window.addEventListener('resize', checkChatContainerSize);
    checkChatContainerSize();
  });
  
     // Get the footer element
var footer = document.querySelector('footer');

// Get the start year
var startYear = 2023; // Replace with the desired start year

// Get the current year
var currentYear = new Date().getFullYear();

// Build the footer text
var footerText = '&copy; ' + (startYear === currentYear ? startYear : startYear + ' - ' + currentYear) + ' CodyMKW. All rights reserved.';

// Update the footer text
footer.innerHTML = footerText;
