function mergeImages() {
  const frameSelection = document.getElementById('frameSelection');
  const selectedFrame = frameSelection.value;
  
  const imageSelection = document.getElementById('imageSelection');
  const selectedImage = imageSelection.files[0];

  if (selectedImage) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Create an image object for the frame
      const frameImage = new Image();
      frameImage.src = selectedFrame;

      frameImage.onload = () => {
          // Set the canvas size to 400x400
          canvas.width = 400;
          canvas.height = 400;

          // Draw the frame on the canvas
          context.drawImage(frameImage, 0, 0, 400, 400);

          // Create an image object for the user-selected image
          const userImage = new Image();
          userImage.src = URL.createObjectURL(selectedImage);

          userImage.onload = () => {
              // Draw the user-selected image on top of the frame
              context.drawImage(userImage, 0, 0, 400, 400);

              // Convert the merged image to a data URL
              const mergedImageURL = canvas.toDataURL('image/png');

              // Display the download link
              const downloadLink = document.getElementById('downloadLink');
              downloadLink.href = mergedImageURL;
              downloadLink.style.display = 'block';

              // Trigger the download
              downloadLink.click();
          };
      };
  }
}
