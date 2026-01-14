async function fetchLastWatchedAnime(username) {
  const query = `
    query ($username: String) {
      MediaListCollection(userName: $username, type: ANIME, sort: UPDATED_TIME_DESC) {
        lists {
          entries {
            progress
            score
            media {
              format
              title {
                english
                romaji
              }
            }
          }
        }
      }
    }
  `;
  const variables = { username };

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();

    let entries = [];
    if (result?.data?.MediaListCollection?.lists) {
      result.data.MediaListCollection.lists.forEach((list) => {
        if (list?.entries) entries = entries.concat(list.entries);
      });
    }

    if (entries.length > 0) {
      const entry = entries[0];
      const titles = entry.media?.title || {};
      const format = entry.media?.format;

      const animeName = titles.english || titles.romaji || "Unknown Anime";
      const episode = entry.progress || 0;
      const score = entry.score || 0;

      const displayEpisode =
         score > 0
         ? episode
         : Math.max(episode - 1, 1);

      const showEpisode = format !== "MOVIE" && episode > 0;


      const span = document.createElement("span");
      span.className = "anime-episode";
      span.textContent = showEpisode ? `(Ep ${displayEpisode})` : "";

      return { animeName, span };
    }

    return { animeName: "Nothing at the moment", span: null };
  } catch (e) {
    console.error("Anilist fetch error", e);
    return { animeName: "Error loading", span: null };
  }
}

function applyEpisodeColor() {
  const theme = localStorage.getItem("theme") || "light";
  const color = theme === "dark" ? "#00c900" : "#3B82F6";

  let style = document.getElementById("anime-episode-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "anime-episode-style";
    document.head.appendChild(style);
  }

  style.textContent = `
    .anime-episode {
      color: ${color};
      font-weight: 600;
      margin-left: 6px;
      display: inline-block;
      text-shadow: 0 0 6px ${theme === "dark" ? "rgba(0, 201, 0, 0.6)" : "rgba(59, 130, 246, 0.5)"};
      transition: all 0.3s ease-in-out;
    }

    .anime-episode:hover {
      color: ${theme === "dark" ? "#33ff33" : "#60A5FA"};
      text-shadow: 0 0 10px ${theme === "dark" ? "rgba(0, 255, 0, 0.8)" : "rgba(96, 165, 250, 0.9)"};
    }

    @media (max-width: 600px) {
      .anime-episode {
        font-size: 0.95em;
        display: inline;
      }
    }
  `;
}

function formatAgo(uts) {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - uts;

  const mins = Math.floor(diff / 60);
  if (mins < 1) return "- just now";
  if (mins < 60) return `- ${mins} mins ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs === 1) return "- 1 hr ago";
  if (hrs < 24) return `- ${hrs} hrs ago`;

  const days = Math.floor(hrs / 24);
  if (days === 1) return "- 1 day ago";
  if (days <= 6) return `- ${days} days ago`;

  const d = new Date(uts * 1000);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

async function fetchStatusCafe() {
  const username = "codymkw";

  try {
    const res = await fetch(`https://status.cafe/users/${username}/status.json?t=${Date.now()}`);
    if (!res.ok) throw new Error("status.cafe error");

    const data = await res.json();

    if (!data.content || data.content.length === 0) {
      return {
        author: username,
        content: "No status yet.",
        face: "",
        time: ""
      };
    }

    return {
      author: data.author,
      content: data.content,
      face: data.face || "",
      time: data.timeAgo || ""
    };

  } catch (err) {
    console.error("StatusCafe error:", err);
    return {
      author: username,
      content: "Unable to load status",
      face: "",
      time: ""
    };
  }
}

async function fetchLastFmTrack() {
  const username = "CodyMKW";
  const url = `https://lastfm-last-played.biancarosa.com.br/${username}/latest-song?t=${Date.now()}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const track = data?.track;
    if (!track) return { song: "Nothing recently", link: null, ago: "" };

    const songName = track.name;
    const songUrl = track.url;

    let ago = "";
    const isPlaying = track["@attr"] && track["@attr"].nowplaying === "true";

    if (isPlaying) {
      ago = "- now playing";
    } else if (track.date?.uts) {
      ago = formatAgo(parseInt(track.date.uts, 10));
    }

    return { song: songName, link: songUrl, ago };
  } catch (err) {
    console.error("LastFM error:", err);
    return { song: "Unable to load", link: null, ago: "" };
  }
}

async function loadCurrently() {
  try {
    const presenceRes = await fetch(`https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?t=${Date.now()}`);
    const presenceData = await presenceRes.json();

    let playing = "Nothing at the moment";
    const presence = presenceData?.friend?.presence;

    if (
      presence &&
      (presence.state === "ONLINE" || presence.state === "PLAYING") &&
      presence.game?.name
    ) {
      playing = presence.game.name;
    }

    const { animeName, span } = await fetchLastWatchedAnime('CodyMKW');
    const watchingContainer = document.createElement("span");
    watchingContainer.innerHTML = animeName;
    if (span) watchingContainer.appendChild(span);

    const lastFm = await fetchLastFmTrack();
    const statusCafe = await fetchStatusCafe();

    const cafeBox = document.getElementById("statuscafe-box");
    if (cafeBox) {
      cafeBox.innerHTML = `
        <div class="statuscafe-entry">
          <a href="https://status.cafe/users/${statusCafe.author}" target="_blank">
            <strong>${statusCafe.author}</strong>
          </a>
          ${statusCafe.face}
          <span style="opacity:0.7; margin-left:6px;">${statusCafe.time}</span>
          <p>${statusCafe.content}</p>
        </div>
      `;
    }

    const container = document.getElementById('currently-section');
    if (container) {
      container.innerHTML = `
        <ul class="currently-list">

          <li><strong>🎮 Playing:</strong><br> ${playing}</li>

          <li><strong>🎵 Listening:</strong><br>
            ${lastFm.link ? `<a href="${lastFm.link}" target="_blank">${lastFm.song}</a>` : lastFm.song}
            <span style="opacity:0.7; margin-left:6px;">${lastFm.ago}</span>
          </li>

          <li><strong>📺 Watching:</strong><br></li>
        </ul>
      `;

      const watchItem = container.querySelector("li:last-child");
      watchItem.appendChild(watchingContainer);

      const fullPageLink = document.createElement("a");
      fullPageLink.href = "/anime";
      fullPageLink.textContent = "View full anime list →";
      fullPageLink.className = "anime-full-link";

      watchItem.appendChild(document.createElement("br"));
      watchItem.appendChild(fullPageLink);
    }

  } catch (err) {
    console.error("Error loading currently section:", err);
  }
}

async function loadLatestPosts() {
  try {
    const response = await fetch("https://api.npoint.io/5ac2ef5dd46fbff62a02");
    const data = await response.json();

    const posts = data.posts.slice(-5).reverse();
    const list = document.getElementById("latest-posts-list");
    const now = new Date();

    if(list) {
        list.innerHTML = "";
        posts.forEach((post) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = `/blog?post=${post.index}`;
          link.textContent = post.title;

          const postDate = new Date(post.date);
          const diffTime = Math.abs(now - postDate);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          let timeText;

          if (diffDays <= 30) {
              if (diffDays === 0) {
                  timeText = "today";
              } else if (diffDays === 1) {
                  timeText = "1 day ago";
              } else {
                  timeText = `${diffDays} days ago`;
              }
          } 
          else {
              timeText = postDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
              });
          }

          const dateSpan = document.createElement("span");
          dateSpan.classList.add("post-date");
          dateSpan.textContent = ` · ${timeText}`;

          li.appendChild(link);
          li.appendChild(dateSpan);
          list.appendChild(li);
        });
    }
  } catch (error) {
    console.error("Error loading latest posts:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCurrently();
  loadLatestPosts();

  setInterval(loadCurrently, 15000);

  applyEpisodeColor();
  window.addEventListener("storage", (event) => {
    if (event.key === "theme") applyEpisodeColor();
  });
  setInterval(applyEpisodeColor, 1000);
});