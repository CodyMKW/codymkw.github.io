function formatWeaponsList(weapons) {
    const weaponsArray = weapons.split(', ');
    const lastWeapon = weaponsArray.pop();
    return weaponsArray.join(', ') + (weaponsArray.length > 0 ? ', and ' : '') + lastWeapon;
}

async function fetchWithRetry(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) throw new Error('Fallback required');
        return data;
    } catch {
        const fallbackUrl = url.split('?')[0];
        const fallbackResponse = await fetch(fallbackUrl);
        return await fallbackResponse.json();
    }
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

function refreshPage() {
    location.reload();
}

async function fetchData() {
    try {
        const presenceUrl = 'https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1';
        const data = await fetchWithRetry(presenceUrl);

        const [subtextData, splatfestColorsData] = await Promise.all([
            fetch('https://api.npoint.io/f96cb06703bad4f850de').then(res => res.json()),
            fetch('https://api.npoint.io/f96cb06703bad4f850de').then(res => res.json())
        ]);

        const { acnh, fort, mhur } = subtextData.games;
        const splatfestColors = splatfestColorsData.splatfestColors;

        const { friend, title } = data;

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
            offline: `${friend.name} is not on the Nintendo Switch right now.`,
            inactive: `${friend.name} is chilling on the home menu.`,
            playing: `${friend.name} is currently playing:`,
            online: `${friend.name} is currently playing:`
        };

        statusElement.textContent = statusMap[status];
        statusElement.className = status;
        nameSpan.textContent = messageMap[status];

        if (title !== null) {
            document.getElementById('gameInfo').style.display = 'block';
            document.getElementById('gameName').textContent = title.name;

            const subtextMaps = {
                '01006f8002326000': {
                    value: acnh.subtext,
                    map: {
                        1: 'Having visitors over',
                        2: 'Visiting a friend',
                        3: 'Designing some Vacation Homes'
                    },
                    effect: true
                },
                '010025400aece000': {
                    value: fort.subtext,
                    map: {
                        1: 'Playing some Zero Build',
                        2: 'Messing around in Creative',
                        3: 'Tearing up the track in Rocket Racing',
                        4: 'Playing with some legos in Lego Fortnite'
                    }
                },
                '0100ba6013f0e000': {
                    value: mhur.subtext,
                    map: {
                        1: 'Battling it out in Unranked Battle',
                        2: 'Aiming for the top in Ranked Battle',
                        3: 'Fighting in Solo Battle',
                        4: 'Warming up in a CPU Battle',
                        5: 'Messing around in Training mode',
                        6: 'Learning the controls in the Tutorial'
                    }
                }
            };

            const game = subtextMaps[title.id];
            if (game) {
                if (game.effect) document.getElementById('gameInfo').classList.add('special-effect');
                setSubtext(game.value, game.map);
            } else {
                document.getElementById('gameInfo').classList.remove('special-effect');
                document.getElementById('subText').style.display = 'none';
            }

            document.getElementById('sysDescription').textContent = friend.presence.game.sysDescription;
            document.getElementById('gameImage').src = title.image_url;
            document.getElementById('gameID').textContent = title.id;
            document.getElementById('gameShopLink').href = title.url;

            const firstPlayed = new Date(friend.presence.game.firstPlayedAt * 1000);
            document.getElementById('firstPlayedTime').textContent = firstPlayed.toLocaleString();

            const totalTime = friend.presence.game.totalPlayTime;
            const totalHours = Math.floor(totalTime / 60);
            const totalMinutes = totalTime % 60;
            document.getElementById('totalPlayTime').textContent = `${totalHours} hours and ${totalMinutes} minutes`;

            const since = new Date(title.since).getTime();
            updatePlayingTime(since);

            const desc = `Currently playing: ${title.name}. Total playtime: ${totalHours} hours and ${totalMinutes} minutes.`;
            setMetaDescriptions(desc);
        } else {
            document.getElementById('gameInfo').style.display = 'none';
            setMetaDescriptions("Not currently playing a game.");
        }

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

            if (vsSetting?.vsStages) {
                const stageNames = vsSetting.vsStages.map(s => s.name).join(' and ');
                document.getElementById('splatoonStagesLabel').style.display = 'block';
                document.getElementById('splatoonStages').textContent = stageNames;
            }

            const modeColors = {
                'Splatfest Battle': `linear-gradient(to right, ${splatfestColors[0]}, ${splatfestColors[1]}, ${splatfestColors[2]})`,
                'Tricolor Battle': `linear-gradient(to right, ${splatfestColors[0]}, ${splatfestColors[1]}, ${splatfestColors[2]})`,
                'Tableturf Battle': '#0534a3',
                'Private Battle': '#c21786',
                'Regular Battle': '#20c927',
                'Anarchy Battle': '#d17d02',
                'Challenge': '#d10263'
            };

            const color = modeColors[vsMode?.name] || '#FFFFFF';
            if (color.includes('linear-gradient')) {
                splatoonMode.style.background = color;
                splatoonMode.style.webkitBackgroundClip = 'text';
                splatoonMode.style.webkitTextFillColor = 'transparent';
            } else {
                splatoonMode.style.color = color;
            }
            
            // Fallback: if vsMode is not available but Tableturf Battle is showing, still set its color
            if ((!vsMode || !vsMode.name) && splatoonMode.textContent === 'Tableturf Battle') {
                splatoonMode.style.color = modeColors['Tableturf Battle'];
            }
        }

        const coop = data.splatoon3_coop_setting;
        if (coop) {
            document.getElementById('splatoonInfo').style.display = 'none';
            document.getElementById('SRmodeLabel').style.display = 'block';
            document.getElementById('splatoonSRMode').textContent = 'Salmon Run';
            document.getElementById('salmonRunStage').textContent = coop.coopStage.name;
            document.getElementById('salmonRunBoss').textContent = coop.boss.name;

            document.getElementById('splatoonSRMode').style.color =
                coop.coopStage.name !== 'Salmon Run' ? '#e05e0d' : '#FFFFFF';

            const weaponList = formatWeaponsList(coop.weapons.map(w => w.name).join(', '));
            document.getElementById('salmonRunWeapons').textContent = weaponList;
            document.getElementById('salmonRunInfo').style.display = 'block';
        } else {
            document.getElementById('salmonRunInfo').style.display = 'none';
            document.getElementById('SRmodeLabel').style.display = 'none';
        }
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

// Load on page load + auto refresh every 3 minutes
fetchData();
setInterval(refreshPage, 180000);