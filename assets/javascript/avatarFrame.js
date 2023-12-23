// avatarFrame.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.npoint.io/e48ee20c0a091f1b8963') // Update this path
        .then(response => response.json())
        .then(data => updateAvatarFrame(data.avatarframe));
});

function updateAvatarFrame(avatarFrames) {
    const frameContainer = document.getElementById('avatar-frame');
    const avatarImage = frameContainer.querySelector('.avatar-image');

    // Assuming you only have one avatar frame for now
    const currentFrame = avatarFrames[0];

    // Construct the URL based on the JSON data
    const frameURL = `assets/images/splatfest/${currentFrame.species}/Team_${currentFrame.team}.png`;

    // Update the frame image source
    const frameImage = frameContainer.querySelector('.frame-image');
    frameImage.src = frameURL;

    // Update the visibility based on the status property
    frameImage.style.display = currentFrame.status === 0 ? 'none' : 'block';
}
