// Add a function to format the weapons list
function formatWeaponsList(weapons) {
    const weaponsArray = weapons.split(', ');
    const lastWeapon = weaponsArray.pop();
    return weaponsArray.join(', ') + (weaponsArray.length > 0 ? ', and ' : '') + lastWeapon;
}
        
async function fetchData() {
    try {
        const response = await fetch('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1');
        const data = await response.json();
        // Fetch the additional JSON file
        const subtextResponse = await fetch('https://api.npoint.io/f96cb06703bad4f850de');
        const subtextData = await subtextResponse.json();

        // Update HTML with fetched subtext data
        const acnhSubtext = subtextData.games.acnh.subtext;
        const fortSubtext = subtextData.games.fort.subtext;
        const mhurSubtext = subtextData.games.mhur.subtext;

        // Update HTML with fetched data
        document.getElementById('avatarImage').src = data.friend.imageUri;
        document.getElementById('playerName').textContent = data.friend.name;

        const onlineStatusElement = document.getElementById('onlineStatus');
        const onlineStatusText = data.friend.presence.state.toLowerCase();
        const playerNameElement = document.getElementById('playerName');
        const playingStatusElement = document.querySelector('h1 span#playerName');

// Set class for styling based on online status
if (onlineStatusText === 'offline') {
    onlineStatusElement.textContent = 'Offline';
    onlineStatusElement.className = 'offline';
    playingStatusElement.textContent = `${data.friend.name} is not on the Nintendo Switch right now.`;
} else if (onlineStatusText === 'inactive') {
    onlineStatusElement.textContent = 'Inactive';
    onlineStatusElement.className = 'inactive';
    playingStatusElement.textContent = `${data.friend.name} is chilling on the home menu.`;
} else {
    onlineStatusElement.textContent = onlineStatusText.charAt(0).toUpperCase() + onlineStatusText.slice(1);
    onlineStatusElement.className = data.friend.presence.state === 'ONLINE' ? 'online' : 'offline';
    playingStatusElement.textContent = `${data.friend.name} is currently playing:`;
}
// Update additional data when title is not null
if (data.title !== null) {
    document.getElementById('gameInfo').style.display = 'block'; // Show gameInfo div
    document.getElementById('gameName').textContent = data.title.name;
// Check if playing Animal Crossing: New Horizons
if (data.title.id === '01006f8002326000' && acnhSubtext !== undefined) {
    // Apply the special effect class
    document.getElementById('gameInfo').classList.add('special-effect');
    // Display subtext for Animal Crossing
    const subtextContainer = document.getElementById('subText');

    // Choose subtext based on the value from the JSON file
    switch (acnhSubtext) {
        case 1:
            subtextContainer.textContent = 'Having visitors over';
            subtextContainer.style.display = 'block';
            break;
        case 2:
            subtextContainer.textContent = 'Visiting a friend';
            subtextContainer.style.display = 'block';
            break;
        case 3:
            subtextContainer.textContent = 'Designing some Vacation Homes';
            subtextContainer.style.display = 'block';
            break;
        default:
            // If subtext is 0 or undefined, clear the subtext
            subtextContainer.style.display = 'none';
            break;
    }
} else if (data.title.id === '010025400aece000' && fortSubtext !== undefined) {
    // Check if playing Fortnite
    // Display subtext for Fortnite
    const subtextContainer = document.getElementById('subText');

    // Choose subtext based on the value from the JSON file
    switch (fortSubtext) {
        case 1:
            subtextContainer.textContent = 'Playing some Zero Build';
            subtextContainer.style.display = 'block';
            break;
        case 2:
            subtextContainer.textContent = 'Messing around in Creative';
            subtextContainer.style.display = 'block';
            break;
        case 3:
            subtextContainer.textContent = 'Tearing up the track in Rocket Racing';
            subtextContainer.style.display = 'block';
            break;
        case 4:
            subtextContainer.textContent = 'Playing with some legos in Lego Fortnite';
            subtextContainer.style.display = 'block';
            break;
        default:
            // If subtext is 0 or undefined, clear the subtext
            subtextContainer.style.display = 'none';
            break;
    }
} else if (data.title.id === '0100ba6013f0e000' && mhurSubtext !== undefined) {
    // Check if playing My Hero Ultra Rumble
    // Display subtext for My Hero Ultra Rumble
    const subtextContainer = document.getElementById('subText');

    // Choose subtext based on the value from the JSON file
    switch (mhurSubtext) {
        case 1:
            subtextContainer.textContent = 'Battling it out in Unranked Battle';
            subtextContainer.style.display = 'block';
            break;
        case 2:
            subtextContainer.textContent = 'Aiming for the top in Ranked Battle';
            subtextContainer.style.display = 'block';
            break;
        case 3:
            subtextContainer.textContent = 'Warming up in a CPU Battle';
            subtextContainer.style.display = 'block';
            break;
        case 4:
            subtextContainer.textContent = 'Messing around in Training mode';
            subtextContainer.style.display = 'block';
            break;
        case 5:
            subtextContainer.textContent = 'Learning the controls in the Tutorial';
            subtextContainer.style.display = 'block';
            break;
        default:
            // If subtext is 0 or undefined, clear the subtext
            subtextContainer.style.display = 'none';
            break;
    }
} else {
    // Remove the special effect class if not playing Animal Crossing, My Hero Ultra Rumble, or Fortnite
    document.getElementById('gameInfo').classList.remove('special-effect');
    document.getElementById('subText').style.display = 'none';
}
    document.getElementById('sysDescription').textContent = data.friend.presence.game.sysDescription;
    document.getElementById('gameImage').src = data.title.image_url;
    document.getElementById('gameID').textContent = data.title.id;
    const firstPlayedDate = new Date(data.friend.presence.game.firstPlayedAt * 1000);
    document.getElementById('firstPlayedTime').textContent = firstPlayedDate.toLocaleString();
    document.getElementById('gameShopLink').href = data.title.url;

       // Display total play time
        const totalPlayTimeHours = Math.floor(data.friend.presence.game.totalPlayTime / 60);
        const totalPlayTimeMinutes = data.friend.presence.game.totalPlayTime % 60;
        document.getElementById('totalPlayTime').textContent = `${totalPlayTimeHours} hours and ${totalPlayTimeMinutes} minutes`;

       // Display time playing now
        const sinceTimestamp = new Date(data.title.since).getTime();
        updatePlayingTime(sinceTimestamp);
        
    // Update metadata description with game name and total playtime (even when not playing a game)
    const metaDescription = `Currently playing: ${data.title.name}. Total playtime: ${totalPlayTimeHours} hours and ${totalPlayTimeMinutes} minutes.`;
    document.querySelector('meta[name="description"]').setAttribute('content', metaDescription);
    // Update Twitter description
    const twitterDescription = `Currently playing: ${data.title.name}. Total playtime: ${totalPlayTimeHours} hours and ${totalPlayTimeMinutes} minutes.`;
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', twitterDescription);
    // Update OG description
    const ogDescription = `Currently playing: ${data.title.name}. Total playtime: ${totalPlayTimeHours} hours and ${totalPlayTimeMinutes} minutes.`;
    document.querySelector('meta[property="og:description"]').setAttribute('content', ogDescription);

    
// Display additional Splatoon 3 info
if (data.splatoon3) {
    const vsMode = data.splatoon3.vsMode;
    const vsSetting = data.splatoon3_vs_setting;
    const onlineState = data.splatoon3.onlineState;
        
    // Display mode name only when playing a mode
    if (vsMode && vsMode.name !== 'N/A') {
        document.getElementById('modeLabel').style.display = 'block'; // Show the "Mode:" label
        document.getElementById('splatoonMode').textContent = vsMode.name;
        document.getElementById('splatoonInfo').style.display = 'block'; // Show Splatoon 3 info
    } else if (onlineState === 'MINI_GAME_PLAYING') {
        // Show "Tableturf Battle" when playing mini-game
        document.getElementById('modeLabel').style.display = 'block'; // Show the "Mode:" label
        document.getElementById('splatoonMode').textContent = 'Tableturf Battle';
        document.getElementById('splatoonInfo').style.display = 'block'; // Show Splatoon 3 info
    }

    // Display vs stages
    if (vsSetting && vsSetting.vsStages) {
        // Show "Stages" label only when not playing Salmon Run
        document.getElementById('splatoonStagesLabel').style.display = 'block';
        const stageNames = vsSetting.vsStages.map(stage => stage.name).join(' and ');
        document.getElementById('splatoonStages').textContent = stageNames;
    }

// Mode name colors for Splatoon 3
const splatoonModeElement = document.getElementById('splatoonMode');
if (vsMode && vsMode.name) {
    switch (vsMode.name) {
        case 'Tableturf Battle':
            splatoonModeElement.style.color = '#0534a3';
            break;
        case 'Private Battle':
            splatoonModeElement.style.color = '#c21786';
            break;
        case 'Regular Battle':
            splatoonModeElement.style.color = '#20c927';
            break;
        case 'Anarchy Battle':
            splatoonModeElement.style.color = '#d17d02';
            break;
        default:
            // Set a default color if the mode name doesn't match any case
            splatoonModeElement.style.color = '#FFFFFF'; // Choose the desired default color
            break;
    }
} else {
    // Handle the case when vsMode or vsMode.name is null
    splatoonModeElement.style.color = '#FFFFFF'; // Choose the desired default color
}
}
    // Display additional Salmon Run info
    const salmonRunInfo = data.splatoon3_coop_setting;
    if (salmonRunInfo) {
        document.getElementById('splatoonInfo').style.display = 'none'; // Hide Splatoon 3 info
        document.getElementById('SRmodeLabel').style.display = 'block'; // Show Salmon Run mode
        document.getElementById('splatoonSRMode').textContent = 'Salmon Run';

        // Update Salmon Run stage
        const salmonRunStage = salmonRunInfo.coopStage.name;
        const salmonRunBoss = salmonRunInfo.boss.name;
        document.getElementById('salmonRunStage').textContent = salmonRunStage;
        document.getElementById('salmonRunBoss').textContent = salmonRunBoss;
        
// SR Mode name color
const splatoonSRModeElement = document.getElementById('splatoonSRMode');
if (salmonRunStage.name !== 'Salmon Run') {
    splatoonSRModeElement.style.color = '#e05e0d';
} else {
    // Set a default color if the mode name is 'Salmon Run'
    splatoonSRModeElement.style.color = '#FFFFFF'; // Choose the desired default color
}

        // Update Salmon Run weapons
        const salmonRunWeapons = salmonRunInfo.weapons.map(weapon => weapon.name).join(', ');
        const formattedSalmonRunWeapons = formatWeaponsList(salmonRunWeapons);
        document.getElementById('salmonRunWeapons').textContent = formattedSalmonRunWeapons;
        document.getElementById('salmonRunInfo').style.display = 'block'; // Show Salmon Run info
    }
} else {
    document.getElementById('gameInfo').style.display = 'none'; // Hide gameInfo div
    document.getElementById('splatoonInfo').style.display = 'none'; // Hide Splatoon 3 info
    document.getElementById('salmonRunInfo').style.display = 'none'; // Hide Salmon Run info
    document.getElementById('SRmodeLabel').style.display = 'none'; // Hide Salmon Run mode
    
    // Update metadata description when not playing a game
    const metaDescription = "Not currently playing a game.";
    document.querySelector('meta[name="description"]').setAttribute('content', metaDescription);
    
    // Update Twitter description when not playing a game
    const twitterNoGameDescription = "Not currently playing a game.";
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', twitterNoGameDescription);

    // Update OG description when not playing a game
    const ogNoGameDescription = "Not currently playing a game.";
    document.querySelector('meta[property="og:description"]').setAttribute('content', ogNoGameDescription);
}
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updatePlayingTime(sinceTimestamp) {
    const timePlayingNowElement = document.getElementById('timePlayingNow');

    // Update time every second
    setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - sinceTimestamp;

        const hours = Math.floor(timeDifference / 3600000);
        const minutes = Math.floor((timeDifference % 3600000) / 60000);
        const seconds = Math.floor((timeDifference % 60000) / 1000);

        timePlayingNowElement.textContent = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }, 1000);
}

// Function to refresh the page every 3 minutes
function refreshPage() {
    location.reload();
}

// Fetch data when the page loads
fetchData();

// Refresh the page every 3 minutes (180,000 milliseconds)
setInterval(refreshPage, 180000);
