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
          canvas.width = 400;
          canvas.height = 400;

          const userImage = new Image();
          userImage.src = URL.createObjectURL(selectedImage);

          userImage.onload = () => {
              context.drawImage(userImage, 0, 0, 400, 400);
              context.drawImage(frameImage, 0, 0, 400, 400);

              const mergedImageURL = canvas.toDataURL('image/png');

              const downloadLink = document.getElementById('downloadLink');
              downloadLink.href = mergedImageURL;
              downloadLink.style.display = 'block';

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
  frameSelection.innerHTML = ''; 

  const frameOptions = {
      octopus: [
          "Team_Aliens.avif",
          "Team_Nessie.avif",
          "Team_Bigfoot.avif",
          "Team_Frye.avif",
          "Team_Shiver.avif",
          "Team_BigMan.avif",
          "Team_Love.avif",
          "Team_Fame.avif",
          "Team_Money.avif",
          "Team_Mint_Chip.avif",
          "Team_Vanilla.avif",
          "Team_Strawberry.avif",
          "Team_Power.avif",
          "Team_Wisdom.avif",
          "Team_Courage.avif",
          "Team_Sweet.avif",
          "Team_Sour.avif",
          "Team_Spicy.avif",
          "Team_Water.avif",
          "Team_Grass.avif",
          "Team_Fire.avif",
          "Team_White_Chocolate.avif",
          "Team_Milk_Chocolate.avif",
          "Team_Dark_Chocolate.avif",
          "Team_Zombie.avif",
          "Team_Skeleton.avif",
          "Team_Ghost.avif",
          "Team_Handshake.avif",
          "Team_Fistbump.avif",
          "Team_Hug.avif",
          "Team_Friends.avif",
          "Team_Family.avif",
          "Team_Solo.avif",
          "Team_Drums.avif",
          "Team_Guitar.avif",
          "Team_Keyboard.avif",
          "Team_Chicks.avif",
          "Team_Li'l_Bunnies.avif",
          "Team_Bear_Cubs.avif",
          "Team_Same Ol'.avif",
          "Team_Bucket_List.avif",
          "Team_Save_the_Day.avif",
          "Team_Palace.avif",
          "Team_Theme_Park.avif",
          "Team_Beach.avif",
          "Team_Pasta.avif",
          "Team_Rice.avif",
          "Team_Bread.avif",
          "Team_Wizard.avif",
          "Team_Ninja.avif",
          "Team_Knight.avif",
          "Team_Money_(2025).avif",
          "Team_Experiences.avif",
          "Team_Presents.avif",
          "Team_Afternoon.avif",
          "Team_Morning.avif",
          "Team_Night.avif",
          "Team_Land.avif",
          "Team_Sea.avif",
          "Team_Air.avif",

      ],
      squid: [
        "Team_Aliens.avif",
        "Team_Nessie.avif",
        "Team_Bigfoot.avif",
        "Team_Frye.avif",
        "Team_Shiver.avif",
        "Team_BigMan.avif",
        "Team_Love.avif",
        "Team_Fame.avif",
        "Team_Money.avif",
        "Team_Mint_Chip.avif",
        "Team_Vanilla.avif",
        "Team_Strawberry.avif",
        "Team_Power.avif",
        "Team_Wisdom.avif",
        "Team_Courage.avif",
        "Team_Sweet.avif",
        "Team_Sour.avif",
        "Team_Spicy.avif",
        "Team_Water.avif",
        "Team_Grass.avif",
        "Team_Fire.avif",
        "Team_White_Chocolate.avif",
        "Team_Milk_Chocolate.avif",
        "Team_Dark_Chocolate.avif",
        "Team_Zombie.avif",
        "Team_Skeleton.avif",
        "Team_Ghost.avif",
        "Team_Handshake.avif",
        "Team_Fistbump.avif",
        "Team_Hug.avif",
        "Team_Friends.avif",
        "Team_Family.avif",
        "Team_Solo.avif",
        "Team_Drums.avif",
        "Team_Guitar.avif",
        "Team_Keyboard.avif",
        "Team_Chicks.avif",
        "Team_Li'l_Bunnies.avif",
        "Team_Bear_Cubs.avif",
        "Team_Same Ol'.avif",
        "Team_Bucket_List.avif",
        "Team_Save_the_Day.avif",
        "Team_Palace.avif",
        "Team_Theme_Park.avif",
        "Team_Beach.avif",
        "Team_Pasta.avif",
        "Team_Rice.avif",
        "Team_Bread.avif",
        "Team_Wizard.avif",
        "Team_Ninja.avif",
        "Team_Knight.avif",
        "Team_Money_(2025).avif",
        "Team_Experiences.avif",
        "Team_Presents.avif",
        "Team_Afternoon.avif",
        "Team_Morning.avif",
        "Team_Night.avif",
        "Team_Land.avif",
        "Team_Sea.avif",
        "Team_Air.avif",

      ]
  };

  frameOptions[frameTypeSelection].forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = `/assets/images/splatfest/${frameTypeSelection}/${option}`;
      optionElement.textContent = option.replace('.avif', '').replace(/_/g, ' ');
      frameSelection.appendChild(optionElement);
  });

  displayFramePreview();
}

function handleImageSelection() {
  const imageSelection = document.getElementById('imageSelection');
  const selectedImage = imageSelection.files[0];

  if (selectedImage) {
    const framePreview = document.getElementById('framePreview');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const frameImage = new Image();
    frameImage.src = framePreview.src;

    frameImage.onload = () => {
      canvas.width = frameImage.width;
      canvas.height = frameImage.height;

      const userImage = new Image();
      userImage.src = URL.createObjectURL(selectedImage);

      userImage.onload = () => {
        context.drawImage(userImage, 0, 0, frameImage.width, frameImage.height);
        context.drawImage(frameImage, 0, 0, frameImage.width, frameImage.height);

        framePreview.src = canvas.toDataURL('image/avif');
      };
    };
  }
}

document.getElementById('imageSelection').addEventListener('change', handleImageSelection);

document.getElementById('frameSelection').addEventListener('change', () => {
  displayFramePreview();
  handleImageSelection(); 
});

document.addEventListener('DOMContentLoaded', () => {
  updateFrameOptions();
});

function toggleGrandfestMode() {
    const grandfestToggle = document.getElementById('grandfestToggle').checked;
    const frameTypeSelection = document.getElementById('frameTypeSelection');
    const frameSelection = document.getElementById('frameSelection');
    
    if (grandfestToggle) {
        frameTypeSelection.style.display = 'none';

        frameSelection.innerHTML = ''; 
        const grandfestOptions = [
            { value: "Team_Past.avif", text: "Team Past" },
            { value: "Team_Present.avif", text: "Team Present" },
            { value: "Team_Future.avif", text: "Team Future" }
        ];

        grandfestOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = `/assets/images/splatfest/grandfest/${option.value}`;
            optionElement.textContent = option.text;
            frameSelection.appendChild(optionElement);
        });

        displayFramePreview();
    } else {
        frameTypeSelection.style.display = 'block';

        updateFrameOptions();
    }
}
