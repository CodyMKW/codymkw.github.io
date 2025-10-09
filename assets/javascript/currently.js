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
    const response = await fetch('https://api.npoint.io/3759d526872378d513c4');
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
          <li><strong>🎮 Playing:</strong> ${playing}</li>
          ${data.working_on ? `<li><strong>🛠 Working On:</strong> ${data.working_on}</li>` : ""}
          ${data.listening_to ? `<li><strong>🎧 Listening To:</strong> ${data.listening_to}</li>` : ""}
          <li><strong>📺 Watching:</strong> ${watching}</li>
        </ul>
      `;
    }
  } catch (err) {
    console.error("Error loading currently section:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCurrently);
