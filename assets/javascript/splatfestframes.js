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

function displayFramePreview() {
  const frameSelection = document.getElementById('frameSelection');
  const selectedFrame = frameSelection.value;

  const framePreview = document.getElementById('framePreview');
  framePreview.src = selectedFrame;
}

function updateFrameOptions() {
  const frameTypeSelection = document.querySelector('input[name="frameType"]:checked').value;
  const frameSelection = document.getElementById('frameSelection');
  frameSelection.innerHTML = '';  // Clear existing options

  const frameOptions = {
      octopus: [
          "Team_Aliens.png",
          "Team_Nessie.png",
          "Team_Bigfoot.png",
          "Team_Frye.png",
          "Team_Shiver.png",
          "Team_BigMan.png",
          "Team_Love.png",
          "Team_Fame.png",
          "Team_Money.png",
          "Team_MintChip.png",
          "Team_Vanilla.png",
          "Team_Strawberry.png",
          "Team_Power.png",
          "Team_Wisdom.png",
          "Team_Courage.png",
          "Team_Sweet.png",
          "Team_Sour.png",
          "Team_Spicy.png",
          "Team_Water.png",
          "Team_Grass.png",
          "Team_Fire.png",
          "Team_WhiteChocolate.png",
          "Team_MilkChocolate.png",
          "Team_DarkChocolate.png",
          "Team_Zombie.png",
          "Team_Skeleton.png",
          "Team_Ghost.png",
          "Team_Handshake.png",
          "Team_Fistbump.png",
          "Team_Hug.png",
          "Team_Friends.png",
          "Team_Family.png",
          "Team_Solo.png",
          "Team_Drums.png",
          "Team_Guitar.png",
          "Team_Keyboard.png",
          "Team_Chicks.png",
          "Team_Li'l_Bunnies.png",
          "Team_Bear_Cubs.png",
          "Team_Same Ol'.png",
          "Team_Bucket_List.png",
          "Team_Save_the_Day.png",
          // Add more octopus frame options here
      ],
      squid: [
        "Team_Aliens.png",
        "Team_Nessie.png",
        "Team_Bigfoot.png",
        "Team_Frye.png",
        "Team_Shiver.png",
        "Team_BigMan.png",
        "Team_Love.png",
        "Team_Fame.png",
        "Team_Money.png",
        "Team_MintChip.png",
        "Team_Vanilla.png",
        "Team_Strawberry.png",
        "Team_Power.png",
        "Team_Wisdom.png",
        "Team_Courage.png",
        "Team_Sweet.png",
        "Team_Sour.png",
        "Team_Spicy.png",
        "Team_Water.png",
        "Team_Grass.png",
        "Team_Fire.png",
        "Team_WhiteChocolate.png",
        "Team_MilkChocolate.png",
        "Team_DarkChocolate.png",
        "Team_Zombie.png",
        "Team_Skeleton.png",
        "Team_Ghost.png",
        "Team_Handshake.png",
        "Team_Fistbump.png",
        "Team_Hug.png",
        "Team_Friends.png",
        "Team_Family.png",
        "Team_Solo.png",
        "Team_Drums.png",
        "Team_Guitar.png",
        "Team_Keyboard.png",
        "Team_Chicks.png",
        "Team_Li'l_Bunnies.png",
        "Team_Bear_Cubs.png",
        "Team_Same Ol'.png",
        "Team_Bucket_List.png",
        "Team_Save_the_Day.png",
        // Add more squid frame options here
      ]
  };

  frameOptions[frameTypeSelection].forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = `/assets/images/splatfest/${frameTypeSelection}/${option}`;
      optionElement.textContent = option.replace('.png', '').replace(/_/g, ' ');
      frameSelection.appendChild(optionElement);
  });

  // Display the preview of the first frame in the updated options
  displayFramePreview();
}

function handleImageSelection() {
  const imageSelection = document.getElementById('imageSelection');
  const selectedImage = imageSelection.files[0];

  if (selectedImage) {
    const framePreview = document.getElementById('framePreview');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Load the current frame preview
    const frameImage = new Image();
    frameImage.src = framePreview.src;

    frameImage.onload = () => {
      // Set canvas size to match frame and user image
      canvas.width = frameImage.width;
      canvas.height = frameImage.height;

      // Draw the user-selected image
      const userImage = new Image();
      userImage.src = URL.createObjectURL(selectedImage);

      userImage.onload = () => {
        context.drawImage(userImage, 0, 0, frameImage.width, frameImage.height);
        context.drawImage(frameImage, 0, 0, frameImage.width, frameImage.height);

        // Update the frame preview with the overlaid image
        framePreview.src = canvas.toDataURL('image/png');
      };
    };
  }
}

// Add an event listener for changes in the image selection
document.getElementById('imageSelection').addEventListener('change', handleImageSelection);

// Update the frame preview when the frame selection changes
document.getElementById('frameSelection').addEventListener('change', () => {
  displayFramePreview();
  handleImageSelection(); // Call the updated function to keep the user-selected image loaded
});

// Initialize frame options and preview on page load
document.addEventListener('DOMContentLoaded', () => {
  updateFrameOptions();
});
