let activeVideos = new Set();

function getVideosParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("videos") || "";
}

function updateUrl() {
  const videos = Array.from(activeVideos).join(",");
  window.history.pushState({}, "", `?videos=${videos}`);
}

function loadYouTubeVideos() {
  const input = document.getElementById("youtube-video-ids").value;
  const newVideos = input
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v && !activeVideos.has(v));

  if (newVideos.length === 0) return;

  const container = document.getElementById("youtube-players");

  newVideos.forEach((videoId) => {
    activeVideos.add(videoId);
    const wrapper = document.createElement("div");
    wrapper.className = "youtube-player-wrapper";

    // Create a unique ID for the player container
    const uniqueId = `youtube-player-${Date.now()}-${videoId}`;

    // Add a close button and a container for the iframe
    wrapper.innerHTML = `
      <button class="stream-close-button" onclick="
          this.parentElement.remove();
          activeVideos.delete('${videoId}');
          updateUrl();
        ">×</button>
      <div id="${uniqueId}"></div>
    `;
    container.appendChild(wrapper);

    // Create and configure the YouTube iframe
    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    wrapper.querySelector("div").appendChild(iframe);
  });

  updateUrl();
  document.getElementById("youtube-video-ids").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const videos = getVideosParam()
    .split(",")
    .map((v) => v.trim())
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
