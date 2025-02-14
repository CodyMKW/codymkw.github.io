function getQueryParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("channel") || "";
}

function loadTwitchStream(username) {
    if (!username) {
        username = document.getElementById("twitch-username").value;
    }
    if (username) {
        window.history.pushState({}, "", `?channel=${username}`);

        // Clear existing player before creating a new one
        document.getElementById("twitch-player").innerHTML = "";

        // Create Twitch Player using the official API
        const player = new Twitch.Embed("twitch-player", {
            width: 800,
            height: 480,
            channel: username,
            parent: [window.location.hostname], 
            autoplay: true, 
            layout: "video"
        });

        // Wait for the player to load, then unmute
        player.addEventListener(Twitch.Embed.VIDEO_READY, function() {
            player.getPlayer().setVolume(1.0); // Unmute stream
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const username = getQueryParam();
    if (username) {
        document.getElementById("twitch-username").value = username;
        loadTwitchStream(username);
    }
});
