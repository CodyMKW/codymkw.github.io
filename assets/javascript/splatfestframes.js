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

    const userImage = new Image();
    userImage.src = URL.createObjectURL(selectedImage);

    Promise.all([loadImage(frameImage), loadImage(userImage)])
      .then(images => {
        canvas.width = 400;
        canvas.height = 400;

        context.drawImage(images[1], 0, 0, 400, 400); // Draw user-selected image
        context.drawImage(images[0], 0, 0, 400, 400); // Draw frame on top

        const mergedImageURL = canvas.toDataURL('image/png');

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = mergedImageURL;
        downloadLink.style.display = 'block';

        downloadLink.click();
      });
  }
}

function loadImage(img) {
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
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

// Initialize frame options and preview on page load
document.addEventListener('DOMContentLoaded', () => {
  updateFrameOptions();
});
