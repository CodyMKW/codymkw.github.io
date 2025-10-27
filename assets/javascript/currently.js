async function fetchLastWatchedAnime(username) {
  const query = `
    query ($username: String) {
      MediaListCollection(userName: $username, type: ANIME, sort: UPDATED_TIME_DESC) {
        lists {
          entries {
            progress
            media {
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

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });

  const result = await response.json();

  let entries = [];
  if (
    result &&
    result.data &&
    result.data.MediaListCollection &&
    Array.isArray(result.data.MediaListCollection.lists)
  ) {
    result.data.MediaListCollection.lists.forEach((list) => {
      if (list && Array.isArray(list.entries)) {
        entries = entries.concat(list.entries);
      }
    });
  }

  if (entries.length > 0 && entries[0].media && entries[0].media.title) {
    const titles = entries[0].media.title;
    const episode = entries[0].progress || 0;
    const animeName = titles.english || titles.romaji || "Unknown Anime";

    const span = document.createElement("span");
    span.className = "anime-episode";
    span.textContent = episode > 0 ? `(Ep ${episode})` : "";

    return { animeName, span };
  }

  return { animeName: "Nothing at the moment", span: null };
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

async function loadCurrently() {
  try {
    applyEpisodeColor();

    const response = await fetch('https://api.npoint.io/e48ee20c0a091f1b8963');
    const data = await response.json();

    const presenceRes = await fetch('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5');
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

    const container = document.getElementById('currently-section');
    if (container) {
      container.innerHTML = `
        <ul class="currently-list">
          <li><strong>🎮 Playing:</strong><br> ${playing}</li>
          ${
            data.currentlysection?.[0]?.working_on
              ? `<li><strong>🛠 Working On:</strong><br> ${data.currentlysection[0].working_on}</li>`
              : ""
          }
          <li><strong>📺 Watching:</strong><br></li>
        </ul>
      `;

      const watchItem = container.querySelector("li:last-child");
      watchItem.appendChild(watchingContainer);
    }

    window.addEventListener("storage", (event) => {
      if (event.key === "theme") {
        applyEpisodeColor();
      }
    });

    setInterval(applyEpisodeColor, 1000);
  } catch (err) {
    console.error("Error loading currently section:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCurrently);

async function loadLatestPosts() {
  try {
    const response = await fetch("https://api.npoint.io/5ac2ef5dd46fbff62a02");
    const data = await response.json();

    const posts = data.posts.slice(-5).reverse();
    const list = document.getElementById("latest-posts-list");
    const now = new Date();

    posts.forEach((post) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/blog?post=${post.index}`;
      link.textContent = post.title;

      const postDate = new Date(post.date);
      const diffTime = Math.abs(now - postDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      const timeText =
        diffDays === 0
          ? "today"
          : diffDays === 1
          ? "1 day ago"
          : `${diffDays} days ago`;

      const dateSpan = document.createElement("span");
      dateSpan.classList.add("post-date");
      dateSpan.textContent = ` · ${timeText}`;

      li.appendChild(link);
      li.appendChild(dateSpan);
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading latest posts:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadLatestPosts);
