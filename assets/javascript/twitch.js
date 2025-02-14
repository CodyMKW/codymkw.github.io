let streams = new Set();

function getChannelsFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("channels") ? params.get("channels").split(',') : [];
}

function updateURL() {
    const params = new URLSearchParams();
    if (streams.size > 0) {
        params.set('channels', Array.from(streams).join(','));
    }
    window.history.replaceState({}, "", `?${params.toString()}`);
}

function createStreamElement(username) {
    const container = document.createElement('div');
    container.className = 'stream-wrapper';
    container.id = `stream-${username}-${Date.now()}`;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-stream';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => removeStream(username, container);

    const playerDiv = document.createElement('div');
    playerDiv.className = 'twitch-player';

    container.appendChild(closeBtn);
    container.appendChild(playerDiv);
    
    return { container, playerDiv };
}

function addStream(username) {
    if (!username) {
        username = document.getElementById('twitch-username').value.trim().toLowerCase();
    }
    if (!username || streams.has(username)) return;

    streams.add(username);
    
    const { container, playerDiv } = createStreamElement(username);
    document.getElementById('streams-container').appendChild(container);

    new Twitch.Embed(playerDiv.id, {
        width: '100%',
        height: 400,
        channel: username,
        parent: [window.location.hostname],
        autoplay: true,
        layout: 'video'
    });

    updateURL();
}

function removeStream(username, element) {
    streams.delete(username);
    element.remove();
    updateURL();
}

// Initialize streams from URL on page load
document.addEventListener("DOMContentLoaded", () => {
    const channels = getChannelsFromURL();
    channels.forEach(channel => addStream(channel));
});