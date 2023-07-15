window.addEventListener('DOMContentLoaded', function() {
    var chatContainer = document.querySelector('.chat-container');
    var chatFrame = chatContainer.querySelector('.chat-frame');
    var chatWarning = chatContainer.querySelector('#chat-warning');
  
    function checkChatContainerSize() {
      if (chatContainer.clientWidth < chatFrame.offsetWidth) {
        chatFrame.style.display = 'none';
        chatWarning.style.display = 'block';
      } else {
        chatFrame.style.display = 'block';
        chatWarning.style.display = 'none';
      }
    }
  
    function observeResize() {
      var resizeObserver = new ResizeObserver(checkChatContainerSize);
      resizeObserver.observe(chatContainer);
    }
  
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', checkChatContainerSize);
    } else {
      observeResize();
    }
  
    checkChatContainerSize();
  });
  