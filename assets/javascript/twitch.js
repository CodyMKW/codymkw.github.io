function getChannelsParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("channels") || "";
}

function loadTwitchStreams() {
    const input = document.getElementById("twitch-usernames").value;
    const channels = input.split(',').map(c => c.trim()).filter(c => c);
    
    if (channels.length === 0) return;
    
    window.history.pushState({}, "", `?channels=${channels.join(',')}`);
    const container = document.getElementById("twitch-players");
    container.innerHTML = '';
    
    channels.forEach((channel, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'twitch-player-wrapper';
        wrapper.innerHTML = `<div id="twitch-player-${index}"></div>`;
        container.appendChild(wrapper);

        new Twitch.Embed(`twitch-player-${index}`, {
            width: '100%',
            height: '100%',
            channel: channel,
            parent: [window.location.hostname],
            autoplay: true,
            layout: 'video'
        }).addEventListener(Twitch.Embed.VIDEO_READY, (player) => {
            player.getPlayer().setVolume(1.0);
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const channels = getChannelsParam();
    if (channels) {
        document.getElementById("twitch-usernames").value = channels;
        loadTwitchStreams();
    }
});