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
  