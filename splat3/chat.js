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

  window.addEventListener('DOMContentLoaded', function() {
    var container = document.querySelector('.container');
  
    function createInkSplatter(event) {
      var splatter = document.createElement('div');
      splatter.classList.add('ink-splatter');
      splatter.style.left = event.clientX + 'px';
      splatter.style.top = event.clientY + 'px';
  
      container.appendChild(splatter);
  
      // Animate the ink splatter
      setTimeout(function() {
        splatter.style.opacity = '1';
        splatter.style.transform = 'scale(1)';
        splatter.style.animation = 'ink-splatter 1s ease-out';
      }, 10);
  
      // Remove the ink splatter after animation completes
      setTimeout(function() {
        splatter.remove();
      }, 1000);
    }
  
    document.addEventListener('mousemove', createInkSplatter);
  });
    
  window.addEventListener('DOMContentLoaded', function() {
    // Get the footer element
    var footer = document.querySelector('footer');
  
    // Get the start year
    var startYear = 2023; // Replace with the desired start year
  
    // Get the current year
    var currentYear = new Date().getFullYear();
  
    // Build the footer text
    var footerText = '&copy; ' + (startYear === currentYear ? startYear : startYear + ' - ' + currentYear) + ' CodyMKW. All rights reserved.';
  
    // Update the footer text
    if (footer) {
      footer.innerHTML = footerText;
    }
  });
  