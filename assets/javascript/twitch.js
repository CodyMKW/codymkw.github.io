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

if (newChannels.length === 0) {
    alert("Those channels are already loaded.");
    return;
}

    const container = document.getElementById("twitch-players");
    
    newChannels.forEach((channel, index) => {
        activeChannels.add(channel);
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

    updateUrl();
    document.getElementById("twitch-usernames").value = '';
}

function copyShareLink() {
    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById("copy-link-btn");
        const oldText = btn.innerText;
        btn.innerText = "Copied!";
        setTimeout(() => (btn.innerText = oldText), 1500);
    });
}

function clearAllStreams() {
    activeChannels.clear();
    document.getElementById("twitch-players").innerHTML = "";
    updateUrl();
}

document.addEventListener("DOMContentLoaded", function() {
    const channels = getChannelsParam().split(',')
        .map(c => c.trim())
        .filter(c => c);
    
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

document.getElementById("twitch-usernames").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        loadTwitchStreams();
    }
});

document.addEventListener("paste", (e) => {
    const text = (e.clipboardData || window.clipboardData).getData("text");

    if (text.includes("twitch.tv")) {
        const match = text.match(/twitch\.tv\/([a-zA-Z0-9_]+)/);
        if (match) {
            document.getElementById("twitch-usernames").value = match[1];
            loadTwitchStreams();
        }
    }
});