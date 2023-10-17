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
    avatarFrame.innerHTML = `
        <img src="assets/images/splatfest/${selectedFrame}" alt="Avatar Frame" class="frame-image">
        <img src="https://www.gravatar.com/avatar/5127de8a3a295a02ff3fc55bb6b2fabe?s=2048" alt="Cody's Avatar" class="avatar-image">
    `;
  
    localStorage.setItem('selectedFrame', selectedFrame);

      // Add a green success message
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Selection successfully saved!';
  successMessage.style.color = '#00C900';
  document.getElementById('ChangeSplatfestFrameContent').appendChild(successMessage);

  // Remove the success message after a few seconds
  setTimeout(() => {
    successMessage.remove();
  }, 3000); // 3000 milliseconds (3 seconds)

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
    