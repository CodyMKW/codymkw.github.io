let activeVideos = new Set();
let players = new Map();
let isYouTubeAPIReady = false;
let pendingVideos = [];

// YouTube API callback
function onYouTubeIframeAPIReady() {
    isYouTubeAPIReady = true;
    // Process any pending videos from URL parameters
    if (pendingVideos.length > 0) {
        pendingVideos.forEach(videoID => createPlayer(videoID, true));
        pendingVideos = [];
    }
}

function getVideosParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("videos") || "";
}

function updateUrl() {
    const videos = Array.from(activeVideos).join(',');
    window.history.pushState({}, "", `?videos=${videos}`);
}

function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
}

function createPlayer(videoID, isFromUrl = false) {
    const wrapper = document.createElement('div');
    wrapper.className = 'youtube-player-wrapper';
    const playerId = `yt-player-${Date.now()}-${videoID}`;
    
    wrapper.innerHTML = `
        <button class="stream-close-button" onclick="
            this.parentElement.remove();
            activeVideos.delete('${videoID}');
            players.get('${videoID}').destroy();
            players.delete('${videoID}');
            updateUrl();
        ">×</button>
        <div id="${playerId}"></div>
    `;
    
    document.getElementById("youtube-players").appendChild(wrapper);

    const player = new YT.Player(playerId, {
        height: '100%',
        width: '100%',
        videoId: videoID,
        playerVars: {
            'autoplay': isFromUrl ? 0 : 1, // Don't autoplay for URL-loaded videos
            'controls': 1,
            'rel': 0,
            'modestbranding': 1,
            'enablejsapi': 1
        },
        events: {
            'onReady': (event) => {
                event.target.setVolume(100);
                // Set initial size based on container
                const container = event.target.a.parentElement;
                event.target.setSize(container.offsetWidth, container.offsetHeight);
                
                // Play only if not from URL parameters
                if (!isFromUrl) {
                    event.target.playVideo();
                }
            },
            'onStateChange': (event) => {
                if (event.data === YT.PlayerState.PLAYING) {
                    const container = event.target.a.parentElement;
                    event.target.setSize(container.offsetWidth, container.offsetHeight);
                }
            }
        }
    });
    
    players.set(videoID, player);
}

function loadYouTubeVideos() {
    const input = document.getElementById("youtube-videos").value;
    const videoIDs = input.split(',')
        .map(v => extractVideoID(v.trim()))
        .filter(v => v && !activeVideos.has(v));

    videoIDs.forEach(videoID => {
        activeVideos.add(videoID);
        if (isYouTubeAPIReady) {
            createPlayer(videoID);
        } else {
            pendingVideos.push(videoID);
        }
    });

    updateUrl();
    document.getElementById("youtube-videos").value = '';
}

document.addEventListener("DOMContentLoaded", function() {
    const videoIDs = getVideosParam().split(',')
        .map(v => v.trim())
        .filter(v => v);

    if (videoIDs.length) {
        activeVideos = new Set(videoIDs);
        videoIDs.forEach(videoID => {
            if (isYouTubeAPIReady) {
                createPlayer(videoID, true);
            } else {
                pendingVideos.push(videoID);
            }
        });
    }
});

// Proper resize handler using container dimensions
window.addEventListener('resize', () => {
    players.forEach((player, videoID) => {
        try {
            const iframe = document.getElementById(player.a.id);
            const container = iframe.parentElement;
            player.setSize(container.offsetWidth, container.offsetHeight);
        } catch (e) {
            console.log('Error resizing player:', e);
        }
    });
});