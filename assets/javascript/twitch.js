let activeChannels = new Set();

function getChannelsParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("channels") || "";
}

function updateUrl() {
    const channels = Array.from(activeChannels).join(',');
    window.history.pushState({}, "", `?channels=${channels}`);
}

function loadTwitchStreams() {
    const input = document.getElementById("twitch-usernames").value;
    const newChannels = input.split(',')
        .map(c => c.trim())
        .filter(c => c && !activeChannels.has(c));

    if (newChannels.length === 0) return;

    const container = document.getElementById("twitch-players");
    
    newChannels.forEach((channel, index) => {
        activeChannels.add(channel);
        const wrapper = document.createElement('div');
        wrapper.className = 'twitch-player-wrapper';
        
        // Add close button with proper cleanup
        wrapper.innerHTML = `
            <button class="stream-close-button" onclick="
                this.parentElement.remove();
                activeChannels.delete('${channel}');
                updateUrl();
            ">×</button>
            <div id="twitch-player-${Date.now()}-${channel}"></div>
        `;
        
        container.appendChild(wrapper);

        new Twitch.Embed(wrapper.querySelector('div').id, {
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

    updateUrl();
    document.getElementById("twitch-usernames").value = '';
}

document.addEventListener("DOMContentLoaded", function() {
    const channels = getChannelsParam().split(',')
        .map(c => c.trim())
        .filter(c => c);
    
    // Initial load with existing channels
    if (channels.length) {
        activeChannels = new Set(channels);
        const container = document.getElementById("twitch-players");
        channels.forEach(channel => {
            const wrapper = document.createElement('div');
            wrapper.className = 'twitch-player-wrapper';
            wrapper.innerHTML = `
                <button class="stream-close-button" onclick="
                    this.parentElement.remove();
                    activeChannels.delete('${channel}');
                    updateUrl();
                ">×</button>
                <div id="twitch-player-${Date.now()}-${channel}"></div>
            `;
            container.appendChild(wrapper);

            new Twitch.Embed(wrapper.querySelector('div').id, {
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
});