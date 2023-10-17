function mergeImages() {
  const frameSelection = document.getElementById('frameSelection');
  const selectedFrame = frameSelection.value;

  const imageSelection = document.getElementById('imageSelection');
  const selectedImage = imageSelection.files[0];

  if (selectedImage) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const frameImage = new Image();
      frameImage.src = selectedFrame;

      frameImage.onload = () => {
          // Set the canvas size to 400x400
          canvas.width = 400;
          canvas.height = 400;

          const userImage = new Image();
          userImage.src = URL.createObjectURL(selectedImage);

          userImage.onload = () => {
              // Draw the user-selected image
              context.drawImage(userImage, 0, 0, 400, 400);

              // Draw the frame on top of the user-uploaded image
              context.drawImage(frameImage, 0, 0, 400, 400);

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
