function getQueryParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("") || "";
}

function loadTwitchStream(username) {
    if (!username) {
        username = document.getElementById("twitch-username").value;
    }
    if (username) {
        window.history.pushState({}, "", `?=${username}`);
        document.getElementById("twitch-player").innerHTML = `
            <iframe 
                src="https://player.twitch.tv/?channel=${username}&parent=${window.location.hostname}" 
                height="480" width="800" muted="false"
                allowfullscreen>
            </iframe>`;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const username = getQueryParam();
    if (username) {
        document.getElementById("twitch-username").value = username;
        loadTwitchStream(username);
    }
});
