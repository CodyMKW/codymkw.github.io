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
  // Regular expression to match typical YouTube URL patterns
  const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = input.match(urlPattern);
  return match ? match[1] : input; // If match found, return the ID; else return the input as-is
}

// Function to check and load autoplay preference
function checkAutoplayConsent() {
  const consent = localStorage.getItem("autoplayConsent");
  document.getElementById("autoplay-consent").checked = consent === "true";
}

// Function to save user preference
function saveAutoplayConsent() {
  const isChecked = document.getElementById("autoplay-consent").checked;
  localStorage.setItem("autoplayConsent", isChecked);
}

function loadYouTubeVideos() {
  const input = document.getElementById("youtube-video-ids").value;
  const newVideos = input
    .split(",")
    .map((v) => extractYouTubeVideoID(v.trim()))
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
    const autoplayEnabled = localStorage.getItem("autoplayConsent") === "true";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = `https://www.youtube.com/embed/${videoId}${autoplayEnabled ? "?autoplay=1" : ""}`;
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
      checkAutoplayConsent();
    });
  }
});
