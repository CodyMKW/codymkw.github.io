document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.npoint.io/e48ee20c0a091f1b8963') // Update this path
        .then(response => response.json())
        .then(data => {
            updateAvatarFrame(data.avatarframe, data.grandfestmode);
            updateStickyHeader(data.stickyheader);
        });
});

function updateAvatarFrame(avatarFrames, grandfestMode) {
    const frameContainer = document.getElementById('avatar-frame');
    const avatarImage = frameContainer.querySelector('.avatar-image');
    let currentFrame;

    // Check if Grandfest mode is enabled
    if (grandfestMode && grandfestMode.enabled === 1) {
        // Use Grandfest mode team
        currentFrame = {
            team: grandfestMode.team,
            status: 1 // Grandfest mode is always on when enabled
        };
    } else {
        // Use normal frame details
        currentFrame = avatarFrames[0];
    }

    // Construct the URL based on the team (without species for Grandfest mode)
    const frameURL = `assets/images/splatfest/Team_${currentFrame.team}.png`;

    // Update the frame image source
    const frameImage = frameContainer.querySelector('.frame-image');
    frameImage.src = frameURL;

    // Update the visibility based on the status property
    frameImage.style.display = currentFrame.status === 0 ? 'none' : 'block';
}

function updateStickyHeader(stickyHeaders) {
    const stickyHeaderContainer = document.getElementById('sticky-header');

    const currentStickyHeader = stickyHeaders[0];

    if (currentStickyHeader.status === 0) {
        stickyHeaderContainer.style.display = 'none';
    } else {
        const cookieStatus = getCookie('stickyHeaderStatus');
        if (cookieStatus === 'hidden') {
            stickyHeaderContainer.style.display = 'none';
        } else {
            stickyHeaderContainer.style.display = 'block';
            stickyHeaderContainer.innerHTML = `<span id="close-button" onclick="toggleHeader()">X</span><a href="${currentStickyHeader.link}" target="_blank" class="important">${currentStickyHeader.text}</a>`;
        }
    }
}

function toggleHeader() {
    const stickyHeaderContainer = document.getElementById('sticky-header');
    if (stickyHeaderContainer.style.display === 'none') {
        stickyHeaderContainer.style.display = 'block';
        setCookie('stickyHeaderStatus', 'visible', 365);
    } else {
        stickyHeaderContainer.style.display = 'none';
        setCookie('stickyHeaderStatus', 'hidden', 365);
    }
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
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
