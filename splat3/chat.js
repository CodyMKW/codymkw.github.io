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
    var particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-container');
  
    for (var i = 0; i < 50; i++) {
      var particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particleContainer.appendChild(particle);
    }
  
    document.body.appendChild(particleContainer);
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
  