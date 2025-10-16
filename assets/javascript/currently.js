async function fetchLastWatchedAnime(username) {
  const query = `
    query ($username: String) {
      MediaListCollection(userName: $username, type: ANIME, sort: UPDATED_TIME_DESC) {
        lists {
          entries {
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
    body: JSON.stringify({ query: query, variables: variables })
  });

  const result = await response.json();

  // Avoid optional chaining & flatMap for better mobile support
  let entries = [];
  if (
    result &&
    result.data &&
    result.data.MediaListCollection &&
    Array.isArray(result.data.MediaListCollection.lists)
  ) {
    result.data.MediaListCollection.lists.forEach(function (list) {
      if (list && Array.isArray(list.entries)) {
        entries = entries.concat(list.entries);
      }
    });
  }

  if (entries.length > 0 && entries[0].media && entries[0].media.title) {
    const titles = entries[0].media.title;
    return titles.english || titles.romaji;
  }

  return null;
}

async function loadCurrently() {
  try {
    const response = await fetch('https://api.npoint.io/e48ee20c0a091f1b8963');
    const data = await response.json();

    const presenceRes = await fetch('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5');
    const presenceData = await presenceRes.json();

    let playing = "Nothing at the moment";
    const presence = presenceData && presenceData.friend && presenceData.friend.presence;

    if (
      presence &&
      (presence.state === "ONLINE" || presence.state === "PLAYING") &&
      presence.game &&
      presence.game.name
    ) {
      playing = presence.game.name;
    }

    const lastAnime = await fetchLastWatchedAnime('CodyMKW');
    const watching = lastAnime || "Nothing at the moment";

    const container = document.getElementById('currently-section');
    if (container) {
      container.innerHTML = `
        <ul class="currently-list">
          <li><strong>🎮 Playing:</strong><br> ${playing}</li>
          ${data.currentlysection && data.currentlysection[0] && data.currentlysection[0].working_on 
  ? `<li><strong>🛠 Working On:</strong><br> ${data.currentlysection[0].working_on}</li>` 
  : ""}
          <li><strong>📺 Watching:</strong><br> ${watching}</li>
        </ul>
      `;
    }
  } catch (err) {
    console.error("Error loading currently section:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCurrently);

async function loadLatestPosts() {
  try {
    const response = await fetch("https://api.npoint.io/5ac2ef5dd46fbff62a02");
    const data = await response.json();

    const posts = data.posts.slice(-5).reverse(); // last 5 posts
    const list = document.getElementById("latest-posts-list");

    const now = new Date();

    posts.forEach(post => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `/blog?post=${post.index}`;
      link.textContent = post.title;

      // parse date from your JSON (assuming format like "9-22-2025")
      const postDate = new Date(post.date);
      const diffTime = Math.abs(now - postDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let timeText = "";
      if (diffDays === 0) timeText = "today";
      else if (diffDays === 1) timeText = "1 day ago";
      else timeText = `${diffDays} days ago`;

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