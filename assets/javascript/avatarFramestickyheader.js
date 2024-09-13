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
    const frameURL = assets/images/splatfest/${currentFrame.species}/Team_${currentFrame.team}.png;

    // Update the frame image source
    const frameImage = frameContainer.querySelector('.frame-image');
    frameImage.src = frameURL;

    // Update the visibility based on the status property
    frameImage.style.display = currentFrame.status === 0 ? 'none' : 'block';
}

function updateStickyHeader(stickyHeaders) {
    const stickyHeaderContainer = document.getElementById('sticky-header');
    
    // Assuming you only have one sticky header for now
    const currentStickyHeader = stickyHeaders[0];

    // Check the status property to determine visibility
    if (currentStickyHeader.status === 0) {
        stickyHeaderContainer.style.display = 'none';
    } else {
        // Check if a cookie exists to override the status
        const cookieStatus = getCookie('stickyHeaderStatus');
        if (cookieStatus === 'hidden') {
            stickyHeaderContainer.style.display = 'none';
        } else {
            stickyHeaderContainer.style.display = 'block';

            // Update the text and link based on the JSON data
            stickyHeaderContainer.innerHTML = <span id="close-button" onclick="toggleHeader()">X</span><a href="${currentStickyHeader.link}" target="_blank" class="important">${currentStickyHeader.text}</a>;
        }
    }
}

function toggleHeader() {
    const stickyHeaderContainer = document.getElementById('sticky-header');

    // Toggle the visibility
    if (stickyHeaderContainer.style.display === 'none') {
        stickyHeaderContainer.style.display = 'block';
        // Set a cookie to remember the visible state
        setCookie('stickyHeaderStatus', 'visible', 365);
    } else {
        stickyHeaderContainer.style.display = 'none';
        // Set a cookie to remember the hidden state
        setCookie('stickyHeaderStatus', 'hidden', 365);
    }
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = ${name}=${value};expires=${expires.toUTCString()};path=/;
}

// Function to get a cookie value
function getCookie(name) {
    const cookieName = ${name}=;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return '';
}
