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
    var inkSplatterContainer = document.querySelector('.ink-splatter-container');
  
    function createInkSplatter(event) {
      var inkSplatter = document.createElement('div');
      inkSplatter.classList.add('ink-splatter');
      inkSplatter.style.left = event.clientX - 50 + 'px';
      inkSplatter.style.top = event.clientY - 50 + 'px';
      inkSplatterContainer.appendChild(inkSplatter);
  
      setTimeout(function() {
        inkSplatter.remove();
      }, 1000);
    }
  
    document.addEventListener('click', createInkSplatter);
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
  