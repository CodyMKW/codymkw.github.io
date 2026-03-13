document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api.npoint.io/e48ee20c0a091f1b8963")
        .then(r => r.json())
        .then(data => {
            if (data.stickyheader) {
                updateStickyHeader(data.stickyheader);
            }
        })
        .catch(err => console.error("Sticky header fetch failed:", err));
});

function updateStickyHeader(stickyHeaders) {
    const stickyHeaderContainer = document.getElementById('sticky-header');
    if (!stickyHeaderContainer || !Array.isArray(stickyHeaders) || stickyHeaders.length === 0) {
        return;
    }

    const currentStickyHeader = stickyHeaders[0];

    if (currentStickyHeader.status === 0) {
        stickyHeaderContainer.style.display = 'none';
        return;
    }

    const cookieStatus = getCookie('stickyHeaderStatus');
    if (cookieStatus === 'hidden') {
        stickyHeaderContainer.style.display = 'none';
        return;
    }

    stickyHeaderContainer.style.display = 'block';
    stickyHeaderContainer.innerHTML = `
        <span id="close-button" onclick="toggleHeader()">X</span>
        <a href="${currentStickyHeader.link}" target="_blank" class="important">
            ${currentStickyHeader.text}
        </a>
    `;
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
    expires.setTime(expires.getTime() + days * 86400000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookieName = name + "=";
    return document.cookie
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith(cookieName))
        ?.substring(cookieName.length) || "";
}
