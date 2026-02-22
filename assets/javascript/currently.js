function fetchLastWatchedAnime(username) {
  var query = `
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
  var variables = { username: username };

  return fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: query, variables: variables })
  })
    .then(function (response) {
      if (!response.ok) throw new Error("AniList error");
      return response.json();
    })
    .then(function (result) {
      var entries = [];
      if (result && result.data && result.data.MediaListCollection && result.data.MediaListCollection.lists) {
        result.data.MediaListCollection.lists.forEach(function (list) {
          if (list && list.entries) entries = entries.concat(list.entries);
        });
      }

      if (entries.length > 0) {
        var entry = entries[0];
        var titles = (entry.media && entry.media.title) || {};
        var format = entry.media && entry.media.format;

        var animeName = titles.english || titles.romaji || "Unknown Anime";
        var episode = entry.progress || 0;
        var score = entry.score || 0;

        var displayEpisode = score > 0 ? episode : Math.max(episode - 1, 1);
        var showEpisode = format !== "MOVIE" && episode > 0;

        var span = document.createElement("span");
        span.className = "anime-episode";
        span.textContent = showEpisode ? "(Ep " + displayEpisode + ")" : "";

        return { animeName: animeName, span: span };
      }

      return { animeName: "Nothing at the moment", span: null };
    })
    .catch(function () {
      return { animeName: "Error loading", span: null };
    });
}

function applyEpisodeColor() {
  var theme = localStorage.getItem("theme") || "light";
  var color = theme === "dark" ? "#00c900" : "#3B82F6";

  var style = document.getElementById("anime-episode-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "anime-episode-style";
    document.head.appendChild(style);
  }

  style.textContent =
    ".anime-episode {" +
    "color:" + color + ";" +
    "font-weight:600;margin-left:6px;display:inline-block;" +
    "text-shadow:0 0 6px " + (theme === "dark" ? "rgba(0,201,0,0.6)" : "rgba(59,130,246,0.5)") + ";" +
    "transition:all 0.3s ease-in-out;}" +
    ".anime-episode:hover {" +
    "color:" + (theme === "dark" ? "#33ff33" : "#60A5FA") + ";" +
    "text-shadow:0 0 10px " + (theme === "dark" ? "rgba(0,255,0,0.8)" : "rgba(96,165,250,0.9)") + ";}" +
    "@media (max-width:600px){.anime-episode{font-size:0.95em;display:inline;}}";
}

function formatAgo(uts) {
  var now = Math.floor(Date.now() / 1000);
  var diff = now - uts;

  var mins = Math.floor(diff / 60);
  if (mins < 1) return "- just now";
  if (mins < 60) return "- " + mins + " mins ago";

  var hrs = Math.floor(mins / 60);
  if (hrs === 1) return "- 1 hr ago";
  if (hrs < 24) return "- " + hrs + " hrs ago";

  var days = Math.floor(hrs / 24);
  if (days === 1) return "- 1 day ago";
  if (days <= 6) return "- " + days + " days ago";

  var d = new Date(uts * 1000);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function fetchStatusCafe() {
  var username = "codymkw";

  return fetch("https://status.cafe/users/" + username + "/status.json?t=" + Date.now())
    .then(function (res) {
      if (!res.ok) throw new Error("status.cafe error");
      return res.json();
    })
    .then(function (data) {
      if (!data || !data.content) {
        return { author: username, content: "No status yet.", face: "", time: "" };
      }
      return {
        author: data.author || username,
        content: data.content,
        face: data.face || "",
        time: data.timeAgo || ""
      };
    })
    .catch(function () {
      return { author: username, content: "Unable to load status", face: "", time: "" };
    });
}

function fetchLastFmTrack() {
  var username = "CodyMKW";
  var apiKey = "88561a92f2907fa9c0de40b325d81db1";
  var url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
            username +
            "&api_key=" + apiKey +
            "&limit=1&format=json&t=" + Date.now();

  return fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error("LastFM API error");
      return res.json();
    })
    .then(function (data) {
      var tracks = data && data.recenttracks && data.recenttracks.track;
      if (!tracks || !tracks[0]) return { song: "Nothing recently", link: null, ago: "" };

      var track = tracks[0];
      var songName = track.name + " — " + track.artist["#text"];
      var songUrl = track.url || null;
      var ago = "";

      var isPlaying = track["@attr"] && track["@attr"].nowplaying === "true";

      if (isPlaying) {
        ago = "- now playing";
      } else if (track.date && track.date.uts) {
        ago = formatAgo(parseInt(track.date.uts, 10));
      }

      return { song: songName, link: songUrl, ago: ago };
    })
    .catch(function () {
      return { song: "Unable to load", link: null, ago: "" };
    });
}

function loadCurrently() {
  return fetch("https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?t=" + Date.now())
    .then(function (presenceRes) {
      if (!presenceRes.ok) throw new Error("Presence error");
      return presenceRes.json();
    })
    .then(function (presenceData) {
      var playing = "Nothing at the moment";
      var presence = presenceData && presenceData.friend && presenceData.friend.presence;

      if (presence && (presence.state === "ONLINE" || presence.state === "PLAYING") && presence.game && presence.game.name) {
        playing = presence.game.name;
      }

      return fetchLastWatchedAnime("CodyMKW").then(function (animeData) {
        return { playing: playing, animeData: animeData };
      });
    })
    .then(function (data) {
      var watchingContainer = document.createElement("span");
      watchingContainer.innerHTML = data.animeData.animeName;
      if (data.animeData.span) watchingContainer.appendChild(data.animeData.span);

      return fetchLastFmTrack().then(function (lastFm) {
        return { playing: data.playing, watchingContainer: watchingContainer, lastFm: lastFm };
      });
    })
    .then(function (data) {
      return fetchStatusCafe().then(function (statusCafe) {
        data.statusCafe = statusCafe;
        return data;
      });
    })
    .then(function (data) {
      var cafeBox = document.getElementById("statuscafe-box");
      if (cafeBox) {
        cafeBox.innerHTML =
          '<div class="statuscafe-entry"><a href="https://status.cafe/users/' + data.statusCafe.author + '" target="_blank"><strong>' +
          data.statusCafe.author + '</strong></a> ' +
          data.statusCafe.face +
          '<span style="opacity:0.7; margin-left:6px;">' + data.statusCafe.time +
          '</span><p>' + data.statusCafe.content + '</p></div>';
      }

      var container = document.getElementById("currently-section");
      if (container) {
        container.innerHTML =
          '<ul class="currently-list">' +
          '<li><strong>🎮 Playing:</strong><br> ' + data.playing + '</li>' +
          '<li><strong>🎵 Listening:</strong><br>' +
          (data.lastFm.link ? '<a href="' + data.lastFm.link + '" target="_blank">' + data.lastFm.song + '</a>' : data.lastFm.song) +
          '<span style="opacity:0.7; margin-left:6px;">' + data.lastFm.ago + '</span></li>' +
          '<li><strong>📺 Watching:</strong><br></li></ul>';

        var watchItem = container.querySelector("li:last-child");
        if (watchItem) {
          watchItem.appendChild(data.watchingContainer);
          var fullPageLink = document.createElement("a");
          fullPageLink.href = "/anime";
          fullPageLink.textContent = "View full anime list →";
          fullPageLink.className = "anime-full-link";
          watchItem.appendChild(document.createElement("br"));
          watchItem.appendChild(fullPageLink);
        }
      }
    })
    .catch(function () {});
}

function parseFrontmatter(md) {
  var fm = {};
  var content = md;
  if (md.indexOf('---') === 0) {
    var end = md.indexOf('---', 3);
    if (end !== -1) {
      var raw = md.slice(3, end).trim().split('\n');
      raw.forEach(function (line) {
        var i = line.indexOf(':');
        if (i !== -1) {
          var key = line.slice(0, i).trim();
          var value = line.slice(i + 1).trim();
          fm[key] = value;
        }
      });
      content = md.slice(end + 3).trim();
    }
  }
  return { frontmatter: fm, content: content };
}

function loadLatestPosts() {
  return fetch("/posts/index.json?t=" + Date.now())
    .then(function (response) {
      if (!response.ok) throw new Error("Posts error");
      return response.json();
    })
    .then(function (data) {
      return Promise.all(data.posts.map(function (file, i) {
        return fetch("/posts/" + file + "?t=" + Date.now())
          .then(function (res) {
            if (!res.ok) throw new Error("Post load error");
            return res.text();
          })
          .then(function (md) {
            var parsed = parseFrontmatter(md);
            var fm = parsed.frontmatter;
            return {
              index: i + 1,
              title: fm.title || file.replace('.md', ''),
              date: fm.date || ''
            };
          });
      }));
    })
    .then(function (posts) {
      posts.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      var latest = posts.slice(0, 5);
      var list = document.getElementById("latest-posts-list");
      var now = new Date();
      if (!list) return;

      list.innerHTML = "";
      latest.forEach(function (post) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.href = "/blog?post=" + post.index;
        link.textContent = post.title;

        var postDate = new Date(post.date);
        var diffDays = Math.floor(Math.abs(now - postDate) / 86400000);

        var timeText;
        if (diffDays <= 30) {
          if (diffDays === 0) timeText = "today";
          else if (diffDays === 1) timeText = "1 day ago";
          else timeText = diffDays + " days ago";
        } else {
          timeText = postDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        }

        var dateSpan = document.createElement("span");
        dateSpan.className = "post-date";
        dateSpan.textContent = " · " + timeText;

        li.appendChild(link);
        li.appendChild(dateSpan);
        list.appendChild(li);
      });
    })
    .catch(function () {});
}

document.addEventListener("DOMContentLoaded", function () {
  loadCurrently();
  loadLatestPosts();
  setInterval(loadCurrently, 15000);
  applyEpisodeColor();
  window.addEventListener("storage", function (event) {
    if (event.key === "theme") applyEpisodeColor();
  });
  setInterval(applyEpisodeColor, 1000);
});