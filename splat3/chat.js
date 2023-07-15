window.addEventListener('DOMContentLoaded', function() {
    var chatContainer = document.querySelector('.chat-container');
    var chatFrame = chatContainer.querySelector('.chat-frame');
    var chatWarning = chatContainer.querySelector('#chat-warning');
  
    function checkChatContainerSize() {
      if (chatContainer.clientWidth < chatContainer.scrollWidth) {
        chatFrame.style.display = 'block';
        chatWarning.style.display = 'none';
      } else {
        chatFrame.style.display = 'none';
        chatWarning.style.display = 'block';
      }
    }
  
    window.addEventListener('resize', checkChatContainerSize);
    checkChatContainerSize();
  });
  