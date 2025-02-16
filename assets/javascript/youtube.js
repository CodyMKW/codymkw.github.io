let activeVideos = new Set();
let players = new Map();

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

function loadYouTubeVideos() {
    const input = document.getElementById("youtube-videos").value;
    const videoIDs = input.split(',')
        .map(v => extractVideoID(v.trim()))
        .filter(v => v && !activeVideos.has(v));

    if (videoIDs.length === 0) return;

    const container = document.getElementById("youtube-players");
    
    videoIDs.forEach(videoID => {
        activeVideos.add(videoID);
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
        
        container.appendChild(wrapper);

        const player = new YT.Player(playerId, {
            height: '315',
            width: '100%',
            videoId: videoID,
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                'rel': 0,
                'modestbranding': 1,
                'enablejsapi': 1
            },
            events: {
                'onReady': (event) => {
                    event.target.setVolume(100);
                    event.target.setSize(window.innerWidth, window.innerHeight);
                },
                // Add resize handler
                'onStateChange': (event) => {
                   if (event.data === YT.PlayerState.PLAYING) {
                       event.target.setSize(window.innerWidth, window.innerHeight);
                    }
                }
            }
        });
        
        players.set(videoID, player);
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
        const container = document.getElementById("youtube-players");
        
        videoIDs.forEach(videoID => {
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
            
            container.appendChild(wrapper);

            const player = new YT.Player(playerId, {
                height: '100%',
                width: '100%',
                videoId: videoID,
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'rel': 0
                },
                events: {
                    'onReady': (event) => {
                        event.target.setVolume(100);
                    }
                }
            });
            
            players.set(videoID, player);
        });
    }
});

window.addEventListener('resize', () => {
    players.forEach(player => {
        try {
            player.setSize(window.innerWidth, window.innerHeight);
        } catch (e) {
            console.log('Error resizing player:', e);
        }
    });
});