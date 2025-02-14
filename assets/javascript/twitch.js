function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const channelsParam = params.get('channels');
    if (channelsParam) {
        return channelsParam.split(',').map(channel => channel.trim()).filter(channel => channel);
    }
    // Backward compatibility for old 'channel' parameter
    const oldChannel = params.get('channel');
    return oldChannel ? [oldChannel.trim()] : [];
}

function addStream(username) {
    // Check for existing stream
    const existing = Array.from(document.querySelectorAll('.stream-container'))
        .some(div => div.dataset.channel === username);
    if (existing) return;

    const containerId = `twitch-player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create container div
    const container = document.createElement('div');
    container.className = 'stream-container';
    container.dataset.channel = username;
    container.innerHTML = `
        <div id="${containerId}" class="twitch-embed"></div>
        <div class="close-button" onclick="removeStream('${username}', this.parentElement)">×</div>
    `;

    document.getElementById('streams-container').appendChild(container);

    // Create Twitch embed
    new Twitch.Embed(containerId, {
        width: 400,
        height: 225,
        channel: username,
        parent: [window.location.hostname],
        autoplay: true,
        layout: "video"
    });
}

function addStreams() {
    const input = document.getElementById("twitch-username").value;
    const usernames = input.split(',').map(name => name.trim()).filter(name => name !== "");
    
    usernames.forEach(username => addStream(username));
    updateURL();
}

function removeStream(username, element) {
    element.remove();
    updateURL();
}

function updateURL() {
    const channels = Array.from(document.querySelectorAll('.stream-container'))
        .map(div => div.dataset.channel)
        .filter(channel => channel);
    
    const params = new URLSearchParams();
    if (channels.length > 0) {
        params.set('channels', channels.join(','));
    }
    
    const newUrl = window.location.pathname + (channels.length > 0 ? `?${params.toString()}` : '');
    window.history.pushState({}, "", newUrl);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
    const channels = getQueryParams();
    channels.forEach(channel => addStream(channel));
    document.getElementById("twitch-username").value = channels.join(', ');
});