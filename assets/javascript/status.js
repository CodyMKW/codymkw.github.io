function formatWeaponsList(weapons) {
    const weaponsArray = weapons.split(', ');
    const lastWeapon = weaponsArray.pop();
    return weaponsArray.join(', ') + (weaponsArray.length > 0 ? ', and ' : '') + lastWeapon;
}

function fetchWithRetry(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.error) throw new Error('Fallback required');
      return data;
    })
    .catch(function () {
      const fallbackUrl = url.split('?')[0];
      return fetch(fallbackUrl)
        .then(function (fallbackResponse) {
          return fallbackResponse.json();
        });
    });
}

function setSubtext(subtextValue, map) {
    const container = document.getElementById('subText');
    const text = map[subtextValue];
    if (text) {
        container.textContent = text;
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

function setMetaDescriptions(description) {
    document.querySelector('meta[name="description"]').setAttribute('content', description);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
}

function updatePlayingTime(sinceTimestamp) {
    const element = document.getElementById('timePlayingNow');
    setInterval(() => {
        const diff = Date.now() - sinceTimestamp;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        element.textContent = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }, 1000);
}

function getTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return count + ' ' + interval.label + (count > 1 ? 's' : '') + ' ago';
    }
  }

  return 'just now';
}

function refreshPage() {
    location.reload();
}

const accountUrls = {
  us: 'https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1',
  uk: 'https://nxapi-presence.fancy.org.uk/api/presence/c63e17d19d140c06?include-splatoon3=1'
};

function getSelectedAccount() {
  return localStorage.getItem('selectedAccount') || 'us';
}

function saveSelectedAccount(account) {
  localStorage.setItem('selectedAccount', account);
}

function fetchData() {
  try {
    const selectedAccount = getSelectedAccount();
    document.getElementById('accountSelect').value = selectedAccount;

    const presenceUrl = accountUrls[selectedAccount];

    return fetchWithRetry(presenceUrl)
      .then(function (data) {
        const friend = data.friend;
        const title = data.title;

        document.getElementById('avatarImage').src = friend.imageUri;
        document.getElementById('playerName').textContent = friend.name;

        const status = friend.presence.state.toLowerCase();
        const statusElement = document.getElementById('onlineStatus');
        const nameSpan = document.querySelector('h1 span#playerName');

        const statusMap = {
          offline: 'Offline',
          inactive: 'Inactive',
          playing: 'Online',
          online: 'Online'
        };

        const messageMap = {
          offline: friend.name + ' is not on the Nintendo Switch right now.',
          inactive: friend.name + ' is chilling on the home menu.',
          playing: friend.name + ' is currently playing:',
          online: friend.name + ' is currently playing:'
        };

        statusElement.textContent = statusMap[status];
        statusElement.className = status;
        nameSpan.textContent = messageMap[status];

        const updatedAt = friend.presence.updatedAt;
        const updatedAgo = getTimeAgo(updatedAt);
        document.getElementById('lastUpdated').textContent = updatedAgo;

        if (title !== null) {
          document.getElementById('gameInfo').style.display = 'block';
          document.getElementById('gameName').textContent = title.name;

          document.getElementById('sysDescription').textContent = friend.presence.game.sysDescription;
          document.getElementById('gameImage').src = title.image_url;
          document.getElementById('gameID').textContent = title.id;
          document.getElementById('gameShopLink').href = title.url;

          const firstPlayed = new Date(friend.presence.game.firstPlayedAt * 1000);
          document.getElementById('firstPlayedTime').textContent = firstPlayed.toLocaleString();

          const totalTime = friend.presence.game.totalPlayTime;
          const totalHours = Math.floor(totalTime / 60);
          const totalMinutes = totalTime % 60;
          document.getElementById('totalPlayTime').textContent =
            totalHours + ' hours and ' + totalMinutes + ' minutes';

          const since = new Date(title.since).getTime();
          updatePlayingTime(since);

          const desc =
            'Currently playing: ' + title.name +
            '. Total playtime: ' + totalHours +
            ' hours and ' + totalMinutes + ' minutes.';
          setMetaDescriptions(desc);
        } else {
          document.getElementById('gameInfo').style.display = 'none';
          setMetaDescriptions('Not currently playing a game.');
        }

        return data;
      })
      .then(function (data) {
        if (data.splatoon3) {
          const vsMode = data.splatoon3.vsMode;
          const vsSetting = data.splatoon3_vs_setting;

          const splatoonInfo = document.getElementById('splatoonInfo');
          const splatoonMode = document.getElementById('splatoonMode');
          const modeLabel = document.getElementById('modeLabel');

          if (vsMode && vsMode.name !== 'N/A') {
            splatoonMode.textContent = vsMode.name;
            splatoonInfo.style.display = 'block';
            modeLabel.style.display = 'block';
          } else if (data.splatoon3.onlineState === 'MINI_GAME_PLAYING') {
            splatoonMode.textContent = 'Tableturf Battle';
            splatoonInfo.style.display = 'block';
            modeLabel.style.display = 'block';
          }

          if (vsSetting && vsSetting.vsStages) {
            const stageNames = vsSetting.vsStages.map(function (s) {
              return s.name;
            }).join(' and ');
            document.getElementById('splatoonStagesLabel').style.display = 'block';
            document.getElementById('splatoonStages').textContent = stageNames;
          }

          const modeColors = {
            'Splatfest Battle': 'linear-gradient(to right, #1a22f7, #ffba11, #4f4a55)',
            'Tricolor Battle': 'linear-gradient(to right, #1a22f7, #ffba11, #4f4a55)',
            'Tableturf Battle': '#0534a3',
            'Private Battle': '#c21786',
            'Regular Battle': '#20c927',
            'Anarchy Battle': '#d17d02',
            'Challenge': '#d10263'
          };

          const color = (vsMode && modeColors[vsMode.name]) || '#FFFFFF';

          if (color.indexOf('linear-gradient') !== -1) {
            splatoonMode.style.background = color;
            splatoonMode.style.webkitBackgroundClip = 'text';
            splatoonMode.style.webkitTextFillColor = 'transparent';
          } else {
            splatoonMode.style.color = color;
          }
        }

        const coop = data.splatoon3_coop_setting;
        if (coop) {
          document.getElementById('splatoonInfo').style.display = 'none';
          document.getElementById('SRmodeLabel').style.display = 'block';
          document.getElementById('splatoonSRMode').textContent = 'Salmon Run';
          document.getElementById('salmonRunStage').textContent = coop.coopStage.name;
          document.getElementById('salmonRunBoss').textContent = coop.boss.name;

          const weaponList = formatWeaponsList(
            coop.weapons.map(function (w) { return w.name; }).join(', ')
          );
          document.getElementById('salmonRunWeapons').textContent = weaponList;
          document.getElementById('salmonRunInfo').style.display = 'block';
        } else {
          document.getElementById('salmonRunInfo').style.display = 'none';
          document.getElementById('SRmodeLabel').style.display = 'none';
        }
      })
      .catch(function (err) {
        console.error('Error fetching data:', err);
      });

  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

document.getElementById('accountSelect').addEventListener('change', function () {
  const selected = document.getElementById('accountSelect').value;
  saveSelectedAccount(selected);
  fetchData();
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('accountSelect').value = getSelectedAccount();
  fetchData();
});

setInterval(function () {
  fetchData();
}, 180000);