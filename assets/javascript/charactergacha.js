// Character Gacha data
var characters = [
    {
      name: "Mario (Nintendo)",
      description: "The iconic plumber from the Mushroom Kingdom, known for his red cap and overalls.",
      image: "assets/images/characters/Mario.png",
      rarity: "Common"
    },
    {
      name: "Link (The Legend of Zelda)",
      description: "The courageous hero of Hyrule, often seen wielding a sword and shield.",
      image: "assets/images/characters/Link.png",
      rarity: "Common"
    },
    {
      name: "Samus Aran (Metroid)",
      description: "A skilled bounty hunter known for her power armor and her missions against space pirates.",
      image: "assets/images/characters/Samus.png",
      rarity: "Rare"
    },
    {
        name: "Pikachu (Pokémon)",
        description: "The electric-type Pokémon and mascot of the Pokémon franchise.",
        image: "assets/images/characters/Pikachu.png",
        rarity: "Common"
    },
    {
        name: "Goku (Dragon Ball Z)",
        description: "A Saiyan warrior with immense power, known for his spiky hair and energy attacks.",
        image: "assets/images/characters/Goku.png",
        rarity: "Epic"
    },
    {
        name: "Naruto Uzumaki (Naruto)",
        description: "A ninja with dreams of becoming Hokage, recognized by his headband and orange jumpsuit.",
        image: "assets/images/characters/Naruto.png",
        rarity: "Rare"
    },
    {
        name: "Luffy (One Piece)",
        description: "The rubber-powered pirate captain from the Straw Hat Pirates.",
        image: "assets/images/characters/Luffy.png",
        rarity: "Rare"
    },
    {
        name: "Edward Elric (Fullmetal Alchemist)",
        description: "A talented alchemist with a metal arm and leg in search of the Philosopher's Stone.",
        image: "assets/images/characters/Edward.png",
        rarity: "Uncommon"
    },
    {
        name: "Light Yagami (Death Note)",
        description: "A high school student who gains the power to control life and death with the Death Note.",
        image: "assets/images/characters/Light.png",
        rarity: "Epic"
    },
    {
        name: "Hermione Granger (Harry Potter)",
        description: "A brilliant witch and one of Harry Potter's closest friends at Hogwarts.",
        image: "assets/images/characters/Hermione.png",
        rarity: "Common"
    },
    {
        name: "Captain America (Marvel Cinematic Universe)",
        description: "The super-soldier and patriotic hero, wielding his iconic shield.",
        image: "assets/images/characters/CapAmerica.png",
        rarity: "Epic"
    },
    {
        name: "Rey (Star Wars)",
        description: "A scavenger turned Jedi, seeking her place in the Force.",
        image: "assets/images/characters/Rey.png",
        rarity: "Epic"
    },
    {
        name: "Iron Man (Marvel Cinematic Universe)",
        description: "A genius billionaire, inventor, and philanthropist who becomes the armored hero, Iron Man.",
        image: "assets/images/characters/IronMan.png",
        rarity: "Legendary"
    },
    {
        name: "FalconXD (Thunderbirds Gaming)",
        description: "A skilled Smash Bros player who hosts tournaments and has a fondness for playing as R.O.B.",
        image: "assets/images/characters/Falcon.jpg",
        rarity: "Legendary"
    },
    {
        name: "Black Panther (Marvel Cinematic Universe)",
        description: "The king of Wakanda, known for his advanced suit and enhanced abilities.",
        image: "assets/images/characters/Panther.png",
        rarity: "Legendary"
    },
    {
        name: "Wonder Woman (DC Extended Universe)",
        description: "An Amazonian warrior princess with superhuman abilities.",
        image: "assets/images/characters/WonderWoman.png",
        rarity: "Common"
    },
    {
        name: "Harley Quinn (DC Extended Universe)",
        description: "The Joker's partner-in-crime, known for her chaotic and unpredictable nature.",
        image: "assets/images/characters/Harley.png",
        rarity: "Rare"
    },
    {
        name: "Totoro (My Neighbor Totoro)",
        description: "A friendly forest spirit from Studio Ghibli's 'My Neighbor Totoro'.",
        image: "assets/images/characters/Totoro.png",
        rarity: "Rare"
    },
    {
        name: "WALL-E (WALL-E)",
        description: "A lovable robot designed to clean up a polluted Earth.",
        image: "assets/images/characters/WALL-E.png",
        rarity: "Uncommon"
    },
    {
        name: "Golden Mario (Nintendo)",
        description: "A special, golden version of the iconic plumber, Mario.",
        image: "assets/images/characters/GoldenMario.png",
        rarity: "Mythic"
    },
    {
        name: "CodyMKW (Owner of this page your on)",
        description: "A Nintendo gamer who adores Animal Crossing and anime.",
        image: "https://www.gravatar.com/avatar/5127de8a3a295a02ff3fc55bb6b2fabe?s=2048",
        rarity: "Mythic"
    }
  ];

  // Define CSS classes based on rarity
  const rarityClasses = {
    "Common": "common-rarity",
    "Uncommon": "uncommon-rarity",
    "Rare": "rare-rarity",
    "Epic": "epic-rarity",
    "Legendary": "legendary-rarity",
    "Mythic": "mythic-rarity",
};
  
// Function to generate the HTML for displaying a character
function generateCharacterHTML(character) {
  return `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" class="character-image">
      <div class="character-info-box"><p class="${rarityClasses[character.rarity]}">${character.rarity}</p>
      <p>${character.description}</p></div>
  `;
}

// Update the Character Gacha info
var characterInfoDiv = document.getElementById("CharacterInfo");

function generateCharacter() {
  // Generate a random index to select a character
  var randomIndex = Math.floor(Math.random() * characters.length);
  var randomCharacter = characters[randomIndex];

  // Display the randomly selected character
  characterInfoDiv.innerHTML = generateCharacterHTML(randomCharacter);
}