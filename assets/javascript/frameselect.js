// Function to set the selected frame in the dropdown menu
function setSelectedFrame(selectedFrame) {
    const frameSelection = document.getElementById('frameSelection');
    frameSelection.value = selectedFrame;
  }
  
  // Function to save the selected frame
  function saveAvatarFrame() {
    const frameSelection = document.getElementById('frameSelection');
    const selectedFrame = frameSelection.value;
    
    const avatarFrame = document.getElementById('avatar-frame');
    const avatarImage = avatarFrame.querySelector('.avatar-image');
    
    // Load the selected frame image
    const frameImage = new Image();
    frameImage.src = `assets/images/splatfest/${selectedFrame}`;
    
    frameImage.onload = function () {
        const canvas = document.getElementById('avatar-canvas');
        const context = canvas.getContext('2d');
        
        // Set canvas size to match the frame image
        canvas.width = frameImage.width;
        canvas.height = frameImage.height;
        
        // Draw the frame image
        context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        
        // Draw the user's avatar on top
        const avatarImageWidth = canvas.width / 400; // Adjust this as needed
        const avatarImageHeight = canvas.height / 400; // Adjust this as needed
        context.drawImage(avatarImage, 0, 0, avatarImageWidth, avatarImageHeight);
        
        // Convert the canvas image to a data URL and set it as the download link href
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = canvas.toDataURL('image/png');
        
        // Trigger a click on the download link
        downloadLink.click();
    };
}
  
  document.addEventListener('DOMContentLoaded', () => {
    const storedFrame = localStorage.getItem('selectedFrame');
    if (storedFrame) {
        // Set the selected frame in the dropdown menu
        setSelectedFrame(storedFrame);
  
        // Set the avatar frame
        const avatarFrame = document.getElementById('avatar-frame');
        avatarFrame.innerHTML = `
            <img src="assets/images/splatfest/${storedFrame}" alt="Avatar Frame" class="frame-image">
            <img src="https://www.gravatar.com/avatar/5127de8a3a295a02ff3fc55bb6b2fabe?s=2048" alt="Cody's Avatar" class="avatar-image">
        `;
    }
  });
  
  // Function to display the preview of the selected avatar frame
  function displayPreview() {
    const frameSelection = document.getElementById('frameSelection');
    const selectedFrame = frameSelection.value;
    const previewImage = document.getElementById('preview-image');
    
    previewImage.src = `assets/images/splatfest/${selectedFrame}`;
  
    // Save the selected frame to localStorage
    localStorage.setItem('selectedFramePreview', selectedFrame);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the previously selected frame from localStorage
    const storedFrame = localStorage.getItem('selectedFramePreview');
    if (storedFrame) {
      // Set the selected frame in the dropdown menu
      setSelectedFrame(storedFrame);
  
      // Display the preview for the stored frame
      const previewImage = document.getElementById('preview-image');
      previewImage.src = `assets/images/splatfest/${storedFrame}`;
    }
  });
  
  // Attach event listener to the dropdown menu to trigger the preview function
  document.getElementById('frameSelection').addEventListener('change', displayPreview);
    