// avatarFrame.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.npoint.io/e48ee20c0a091f1b8963') // Update this path
        .then(response => response.json())
        .then(data => {
            updateAvatarFrame(data.avatarframe);
            updateStickyHeader(data.stickyheader);
        });
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

// On page load, check and set the header visibility
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('sticky-header');
    const headerVisibility = localStorage.getItem('headerVisibility');

    // Assuming you have the status property in your JSON data
    const statusFromJSON = /* retrieve the status from your JSON data */;

    // Check both local storage and JSON status to determine visibility
    if (headerVisibility && statusFromJSON === 1) {
        header.style.display = headerVisibility;
    } else {
        // If the status is 0 or not present in the JSON, hide the header
        header.style.display = 'none';
    }
});

function toggleHeader() {
    const header = document.getElementById('sticky-header');
    const newDisplay = header.style.display === 'none' || header.style.display === '' ? 'block' : 'none';

    header.style.display = newDisplay;
    localStorage.setItem('headerVisibility', newDisplay);
}

function updateStickyHeader(stickyHeaders) {
    const stickyHeaderContainer = document.getElementById('sticky-header');
    
    // Assuming you only have one sticky header for now
    const currentStickyHeader = stickyHeaders[0];

    // Check the status property to determine visibility
    if (currentStickyHeader.status === 0) {
        stickyHeaderContainer.style.display = 'none';
    } else {
        stickyHeaderContainer.style.display = 'block';

        // Update the text and link based on the JSON data
        stickyHeaderContainer.innerHTML = `<span id="close-button" onclick="toggleHeader()">X</span><a href="${currentStickyHeader.link}" target="_blank" class="important">${currentStickyHeader.text}</a>`;
    }
}
