async function fetchLastWatchedAnime(username) {
  const query = `
    query ($username: String) {
      MediaListCollection(userName: $username, type: ANIME, sort: UPDATED_TIME_DESC, status: COMPLETED) {
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
    body: JSON.stringify({ query, variables })
  });

  const result = await response.json();
  const entries = result?.data?.MediaListCollection?.lists?.flatMap(list => list.entries) || [];

  if (entries.length > 0) {
    const titles = entries[0].media.title;
    return titles.english || titles.romaji; // prefer English, fallback to Romaji
  }
  return null;
}

async function loadCurrently() {
  try {
    // Fetch your other JSON (for working on, listening to, etc.)
    const response = await fetch('https://api.npoint.io/3759d526872378d513c4');
    const data = await response.json();

    // Fetch Switch presence
    const presenceRes = await fetch('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1');
    const presenceData = await presenceRes.json();

    let playing = "Nothing at the moment";
    const state = presenceData?.friend?.presence?.state;
    if (state === "ONLINE" && presenceData.friend.presence.game?.name) {
      playing = presenceData.friend.presence.game.name;
    }

    // Fetch last watched anime from AniList
    const lastAnime = await fetchLastWatchedAnime('CodyMKW');
    let watching = lastAnime || "Nothing at the moment";

    // Build section
    const container = document.getElementById('currently-section');
    container.innerHTML = `
      <ul class="currently-list">
        <li><strong>🎮 Playing:</strong> ${playing}</li>
        ${data.working_on ? `<li><strong>🛠 Working On:</strong> ${data.working_on}</li>` : ""}
        ${data.listening_to ? `<li><strong>🎧 Listening To:</strong> ${data.listening_to}</li>` : ""}
        <li><strong>📺 Watching:</strong> ${watching}</li>
      </ul>
    `;
  } catch (err) {
    console.error("Error loading currently section:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCurrently);
