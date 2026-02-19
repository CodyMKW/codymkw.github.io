let activeVideos = new Set();

function getVideosParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("videos") || "";
}

function updateUrl() {
  const videos = Array.from(activeVideos).join(",");
  window.history.pushState({}, "", `?videos=${videos}`);
}

function extractYouTubeVideoID(input) {
  const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = input.match(urlPattern);
  return match ? match[1] : input; 
}

function loadYouTubeVideos() {
  const input = document.getElementById("youtube-video-ids").value;
  const newVideos = input
    .split(",")
    .map((v) => extractYouTubeVideoID(v.trim()))
    .filter((v) => v && !activeVideos.has(v));


if (newVideos.length === 0) {
  alert("Those videos are already loaded.");
  return;
}

  const container = document.getElementById("youtube-players");

  newVideos.forEach((videoId) => {
    activeVideos.add(videoId);
    const wrapper = document.createElement("div");
    wrapper.className = "youtube-player-wrapper";

    const uniqueId = `youtube-player-${Date.now()}-${videoId}`;

    wrapper.innerHTML = `
      <button class="stream-close-button" onclick="
          this.parentElement.remove();
          activeVideos.delete('${videoId}');
          updateUrl();
        ">×</button>
      <div id="${uniqueId}"></div>
    `;
    container.appendChild(wrapper);

    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    wrapper.querySelector("div").appendChild(iframe);
  });

  updateUrl();
  document.getElementById("youtube-video-ids").value = "";
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

function clearAllVideos() {
  activeVideos.clear();
  document.getElementById("youtube-players").innerHTML = "";
  updateUrl();
}

document.addEventListener("DOMContentLoaded", function () {
  const videos = getVideosParam()
    .split(",")
    .map((v) => extractYouTubeVideoID(v.trim()))
    .filter((v) => v);

  if (videos.length) {
    activeVideos = new Set(videos);
    const container = document.getElementById("youtube-players");
    videos.forEach((videoId) => {
      const wrapper = document.createElement("div");
      wrapper.className = "youtube-player-wrapper";
      const uniqueId = `youtube-player-${Date.now()}-${videoId}`;
      wrapper.innerHTML = `
        <button class="stream-close-button" onclick="
            this.parentElement.remove();
            activeVideos.delete('${videoId}');
            updateUrl();
          ">×</button>
        <div id="${uniqueId}"></div>
      `;
      container.appendChild(wrapper);

      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      wrapper.querySelector("div").appendChild(iframe);
    });
  }
});

document.getElementById("youtube-video-ids").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    loadYouTubeVideos();
  }
});

document.addEventListener("paste", (e) => {
  const text = (e.clipboardData || window.clipboardData).getData("text");

  if (text.includes("youtube.com") || text.includes("youtu.be")) {
    document.getElementById("youtube-video-ids").value = text;
    loadYouTubeVideos();
  }
});
