// Character Gacha data with rarity levels
var Characters = [
  {
    name: "Mario (Nintendo)",
    description: "A common character known for being optimistic, energetic, and always willing to help others. Can be a bit reckless at times, but always bounces back.",
    image: "assets/images/characters/Mario.png",
    rarity: "Common"
  },
  {
    name: "Link (The Legend of Zelda)",
    description: "A common character renowned for his courage, kindness, and the unwavering determination to stand up for what he believes in. Can be a bit of a loner, but is always there for his friends.",
    image: "assets/images/characters/Link.png",
    rarity: "Common"
  },
  {
    name: "Samus Aran (Metroid)",
    description: "An rare character known for her independence, strong-willed nature, and a constant appetite for challenges. Can be a bit cold and distant, but is fiercely loyal to those she cares about.",
    image: "assets/images/characters/Samus.png",
    rarity: "Rare"
  },
  {
      name: "Pikachu (Pokémon)",
      description: "A common character adored for being friendly, cheerful, and always eager to make new friends. Can be a bit mischievous at times, but is always willing to help out.",
      image: "assets/images/characters/Pikachu.png",
      rarity: "Common"
  },
  {
      name: "Goku (Dragon Ball Z)",
      description: "An epic character characterized by his determination, hard work, and the perpetual pursuit of becoming the best. Can be a bit naive at times, but is always willing to fight for what he believes in.",
      image: "assets/images/characters/Goku.png",
      rarity: "Epic"
  },
  {
      name: "Naruto Uzumaki (Naruto)",
      description: "A rare character known for his optimism, energy, and unwavering determination to never give up on his dreams. Can be a bit of a klutz at times, but is always willing to help others.",
      image: "assets/images/characters/Naruto.png",
      rarity: "Rare"
  },
  {
      name: "Luffy (One Piece)",
      description: "A rare character who thrives on adventure, is carefree, and always seeking the next big thing. Can be a bit reckless at times, but is always loyal to his crew.",
      image: "assets/images/characters/Luffy.png",
      rarity: "Rare"
  },
  {
      name: "Edward Elric (Fullmetal Alchemist)",
      description: "An uncommon character known for his intelligence, determination, and the unwavering willingness to do whatever it takes to achieve his goals. Can be a bit arrogant at times, but is always willing to learn from his mistakes.",
      image: "assets/images/characters/Edward.png",
      rarity: "Uncommon"
  },
  {
      name: "Light Yagami (Death Note)",
      description: "An epic character marked by his intelligence, ambition, and the constant readiness to take risks. Can be a bit ruthless at times, but is always willing to do whatever it takes to achieve his goals.",
      image: "assets/images/characters/Light.png",
      rarity: "Epic"
  },
  {
      name: "Hermione Granger (Harry Potter)",
      description: "A common character known for her intelligence, studious nature, and the willingness to help others. Can be a bit of a know-it-all at times, but is always willing to learn new things.",
      image: "assets/images/characters/Hermione.png",
      rarity: "Common"
  },
  {
    name: "Captain America (Marvel Cinematic Universe)",
    description: "A epic character known for his bravery, honesty, and the unwavering commitment to stand up for what he believes in. Can be a bit of a stickler for the rules, but is always willing to fight for what is right.",
    image: "assets/images/characters/CapAmerica.png",
    rarity: "Epic"
  },
  {
    name: "Rey (Star Wars)",
    description: "An epic character characterized by her determination, resourcefulness, and the constant readiness to stand up for what she believes in. Can be a bit reckless at times, but is always willing to learn from her mistakes.",
    image: "assets/images/characters/Rey.png",
    rarity: "Epic"
  },
  {
    name: "Iron Man (Marvel Cinematic Universe)",
    description: "An legendary character known for his intelligence, wit, and the perpetual readiness to take on a challenge. Can be a bit arrogant at times, but is always willing to do what it takes to save the day.",
    image: "assets/images/characters/IronMan.png",
    rarity: "Legendary"
  },
  {
    name: "Black Panther (Marvel Cinematic Universe)",
    description: "An legendary character marked by his wisdom, compassion, and the constant willingness to protect his people. Can be a bit reserved at times, but is always willing to listen to others.",
    image: "assets/images/characters/Panther.png",
    rarity: "Legendary"
  },
  {
    name: "Wonder Woman (DC Extended Universe)",
    description: "A common character known for her strength, compassion, and the unwavering commitment to fight for justice. Can be a bit of a warrior at times, but is always willing to show mercy.",
    image: "assets/images/characters/WonderWoman.png",
    rarity: "Common"
  },
  {
    name: "Harley Quinn (DC Extended Universe)",
    description: "A rare character known for her chaotic and unpredictable nature, always up for a good time. Can be a bit dangerous at times, but is always willing to be herself.",
    image: "assets/images/characters/Harley.png",
    rarity: "Rare"
  },
  {
    name: "Totoro (My Neighbor Totoro)",
    description: "A rare character known for being gentle, wise, and always willing to help those in need. Can be a bit mysterious at times, but is always there to offer comfort and support.",
    image: "assets/images/characters/Totoro.png",
    rarity: "Rare"
  },
  {
    name: "WALL-E (WALL-E)",
    description: "A uncommon character known for being optimistic, hardworking, and always willing to do the right thing. Can be a bit lonely at times, but is always willing to make new friends.",
    image: "assets/images/characters/WALL-E.png",
    rarity: "Uncommon"
  },
  {
    name: "Golden Mario (Nintendo)",
    description: "A mythic character who is said to embody the purest form of heroism and determination. Possesses an aura of invincibility and is said to be able to overcome any obstacle.",
    image: "assets/images/characters/GoldenMario.png",
    rarity: "Mythic"
  }
  // Add more characters with their rarity levels
  // ...
];

// Function to generate the HTML for the character image
function generateCharacterHTML(imageUrl, altText) {
  return `<img src="${imageUrl}" alt="${altText}" class="character-image">`;
}

// Update Character info
var CharacterInfoDiv = document.getElementById("CharacterInfo");

function spinGacha() {
  // Generate a random number between 1 and 100
  const randomChance = Math.floor(Math.random() * 100) + 1;

  let randomIndex;
  if (randomChance <= 80) {
    // 80% chance for Common characters
    randomIndex = Math.floor(Math.random() * 2);
} else if (randomChance <= 95) {
    // 15% chance for Uncommon characters
    randomIndex = Characters.findIndex(character => character.rarity === "Uncommon");
} else if (randomChance <= 98) {
    // 3% chance for Epic characters
    randomIndex = Characters.findIndex(character => character.rarity === "Epic");
} else if (randomChance <= 100) {
    // 2% chance for Legendary characters
    randomIndex = Characters.findIndex(character => character.rarity === "Legendary");
} else {
    // 1% chance for Mythic characters
    randomIndex = Characters.findIndex(character => character.rarity === "Mythic");
}

  const randomCharacter = Characters[randomIndex];

  // Define CSS classes based on rarity
  const rarityClasses = {
    "Common": "common-rarity",
    "Uncommon": "uncommon-rarity",
    "Rare": "rare-rarity",
    "Epic": "epic-rarity",
    "Legendary": "legendary-rarity",
    "Mythic": "mythic-rarity",
  };

  CharacterInfoDiv.innerHTML = `
    <h2>${randomCharacter.name}</h2>
    ${generateCharacterHTML(randomCharacter.image, "Character Image")}
    <p class="${rarityClasses[randomCharacter.rarity]}">Rarity: ${randomCharacter.rarity}</p>
    <p>${randomCharacter.description}</p>
  `;
}