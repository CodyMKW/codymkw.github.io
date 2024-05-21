const story = {
    start: {
        text: "You find yourself in a mysterious land where multiple universes collide. Where would you like to go first, {name}?",
        choices: [
            { text: "Inkopolis (Splatoon)", next: "inkopolis" },
            { text: "Mushroom Kingdom (Super Mario)", next: "mushroomKingdom" },
            { text: "Battle Bus (Fortnite)", next: "battleBus" },
            { text: "UA High School (My Hero Academia)", next: "uaHigh" },
            { text: "Animal Crossing Island", next: "animalCrossing" },
            { text: "Hyrule (Legend of Zelda)", next: "hyrule" },
            { text: "Minecraft World", next: "minecraft" },
            { text: "Dream Land (Kirby)", next: "dreamLand" },
            { text: "Fall Guys Arena", next: "fallGuys" },
            { text: "Net City (Megaman Battle Network)", next: "netCity" },
            { text: "Pokémon World", next: "pokemonWorld" },
        ]
    },
    inkopolis: {
        text: "Welcome to Inkopolis, {name}! The city is bustling with Inklings and Octolings. What would you like to do?",
        choices: [
            { text: "Join a Turf War", next: "turfWar" },
            { text: "Visit the shops", next: "shops" },
            { text: "Return to start", next: "start" }
        ]
    },
    turfWar: {
        text: "You join a Turf War and splat your opponents with colorful ink. It's exhilarating!",
        choices: [
            { text: "Return to Inkopolis", next: "inkopolis" }
        ]
    },
    shops: {
        text: "You explore the shops and buy some cool gear.",
        choices: [
            { text: "Return to Inkopolis", next: "inkopolis" }
        ]
    },
    mushroomKingdom: {
        text: "Welcome to the Mushroom Kingdom, {name}! You see Mario and friends having a party. What do you do?",
        choices: [
            { text: "Join the party", next: "party" },
            { text: "Explore the castle", next: "castle" },
            { text: "Return to start", next: "start" }
        ]
    },
    party: {
        text: "You join the party and have a great time with Mario and his friends!",
        choices: [
            { text: "Return to Mushroom Kingdom", next: "mushroomKingdom" }
        ]
    },
    castle: {
        text: "You explore Peach's Castle and find a hidden treasure!",
        choices: [
            { text: "Return to Mushroom Kingdom", next: "mushroomKingdom" }
        ]
    },
    battleBus: {
        text: "You jump onto the Battle Bus and prepare for an intense battle royale!",
        choices: [
            { text: "Fight bravely", next: "fight" },
            { text: "Hide and survive", next: "hide" },
            { text: "Return to start", next: "start" }
        ]
    },
    fight: {
        text: "You fight bravely but get eliminated. Better luck next time!",
        choices: [
            { text: "Return to Battle Bus", next: "battleBus" }
        ]
    },
    hide: {
        text: "You hide and manage to survive until the final rounds. Impressive!",
        choices: [
            { text: "Return to Battle Bus", next: "battleBus" }
        ]
    },
    uaHigh: {
        text: "You arrive at UA High School and meet the aspiring heroes.",
        choices: [
            { text: "Train with All Might", next: "train" },
            { text: "Attend a class", next: "class" },
            { text: "Return to start", next: "start" }
        ]
    },
    train: {
        text: "You train with All Might and feel your strength increase!",
        choices: [
            { text: "Return to UA High School", next: "uaHigh" }
        ]
    },
    class: {
        text: "You attend a class and learn about the quirks of your classmates.",
        choices: [
            { text: "Return to UA High School", next: "uaHigh" }
        ]
    },
    animalCrossing: {
        text: "You arrive on a peaceful Animal Crossing Island. What would you like to do, {name}?",
        choices: [
            { text: "Fish in the river", next: "fish" },
            { text: "Visit the museum", next: "museum" },
            { text: "Return to start", next: "start" }
        ]
    },
    fish: {
        text: "You spend a relaxing day fishing in the river and catch some rare fish.",
        choices: [
            { text: "Return to Animal Crossing Island", next: "animalCrossing" }
        ]
    },
    museum: {
        text: "You visit the museum and marvel at the collections.",
        choices: [
            { text: "Return to Animal Crossing Island", next: "animalCrossing" }
        ]
    },
    hyrule: {
        text: "You enter the kingdom of Hyrule and see Link preparing for a quest.",
        choices: [
            { text: "Join Link on his quest", next: "quest" },
            { text: "Explore the village", next: "village" },
            { text: "Return to start", next: "start" }
        ]
    },
    quest: {
        text: "You join Link on a thrilling quest and defeat some enemies together!",
        choices: [
            { text: "Return to Hyrule", next: "hyrule" }
        ]
    },
    village: {
        text: "You explore the village and help some villagers with their tasks.",
        choices: [
            { text: "Return to Hyrule", next: "hyrule" }
        ]
    },
    minecraft: {
        text: "You enter the blocky world of Minecraft. What would you like to do, {name}?",
        choices: [
            { text: "Mine for resources", next: "mine" },
            { text: "Build a house", next: "buildHouse" },
            { text: "Return to start", next: "start" }
        ]
    },
    mine: {
        text: "You mine for resources and find some diamonds!",
        choices: [
            { text: "Return to Minecraft World", next: "minecraft" }
        ]
    },
    buildHouse: {
        text: "You build an awesome house with the resources you collected.",
        choices: [
            { text: "Return to Minecraft World", next: "minecraft" }
        ]
    },
    dreamLand: {
        text: "You arrive in Dream Land and meet Kirby. What do you want to do, {name}?",
        choices: [
            { text: "Go on an adventure with Kirby", next: "kirbyAdventure" },
            { text: "Explore Dream Land", next: "exploreDreamLand" },
            { text: "Return to start", next: "start" }
        ]
    },
    kirbyAdventure: {
        text: "You and Kirby go on an exciting adventure and defeat some enemies together!",
        choices: [
            { text: "Return to Dream Land", next: "dreamLand" }
        ]
    },
    exploreDreamLand: {
        text: "You explore the beautiful landscapes of Dream Land.",
        choices: [
            { text: "Return to Dream Land", next: "dreamLand" }
        ]
    },
    fallGuys: {
        text: "You enter the chaotic world of Fall Guys. What would you like to do, {name}?",
        choices: [
            { text: "Compete in a round", next: "compete" },
            { text: "Watch other players", next: "watchPlayers" },
            { text: "Return to start", next: "start" }
        ]
    },
    compete: {
        text: "You compete in a round and manage to qualify to the next stage!",
        choices: [
            { text: "Return to Fall Guys Arena", next: "fallGuys" }
        ]
    },
    watchPlayers: {
        text: "You watch other players and learn some new strategies.",
        choices: [
            { text: "Return to Fall Guys Arena", next: "fallGuys" }
        ]
    },
    netCity: {
        text: "You arrive in Net City from Megaman Battle Network. What would you like to do, {name}?",
        choices: [
            { text: "Battle viruses", next: "battleViruses" },
            { text: "Explore Net City", next: "exploreNetCity" },
            { text: "Return to start", next: "start" }
        ]
    },
    battleViruses: {
        text: "You battle some viruses and win with your Battle Chips!",
        choices: [
            { text: "Return to Net City", next: "netCity" }
        ]
    },
    exploreNetCity: {
        text: "You explore Net City and find some hidden data.",
        choices: [
            { text: "Return to Net City", next: "netCity" }
        ]
    },
    pokemonWorld: {
        text: "You arrive in the world of Pokémon. What do you want to do, {name}?",
        choices: [
            { text: "Catch a Pokémon", next: "catchPokemon" },
            { text: "Battle a trainer", next: "battleTrainer" },
            { text: "Return to start", next: "start" }
        ]
    },
    catchPokemon: {
        text: "You catch a wild Pikachu! It's super effective!",
        choices: [
            { text: "Return to Pokémon World", next: "pokemonWorld" }
        ]
    },
    battleTrainer: {
        text: "You battle a trainer and win with your Pikachu!",
        choices: [
            { text: "Return to Pokémon World", next: "pokemonWorld" }
        ]
    }
};

function startGame() {
    const name = document.getElementById('name').value;
    if (name) {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('story').style.display = 'block';
        updateStory('start', name);
    }
}

function updateStory(scenario, name) {
    const storyText = story[scenario].text.replace(/{name}/g, name);
    document.getElementById('text').innerText = storyText;

    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    story[scenario].choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => updateStory(choice.next, name);
        choicesDiv.appendChild(button);
    });
}
