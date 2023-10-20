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
        rarity: "Exotic"
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
        rarity: "Exotic"
    },
    {
        name: "Mickey Mouse (Disney)",
        description: "The iconic cartoon character created by Walt Disney, known for his red shorts and large yellow shoes.",
        image: "assets/images/characters/Mickey.png",
        rarity: "Common"
    },
    {
        name: "Solid Snake (Metal Gear)",
        description: "A legendary soldier and spy known for his stealth tactics and gruff demeanor.",
        image: "assets/images/characters/Snake.png",
        rarity: "Rare"
    },
    {
        name: "Princess Peach (Nintendo)",
        description: "The ruler of the Mushroom Kingdom and Mario's frequent damsel in distress.",
        image: "assets/images/characters/Peach.png",
        rarity: "Uncommon"
    },
    {
        name: "Sailor Moon (Sailor Moon)",
        description: "A magical girl with the power to protect the world, known for her sailor suit and tiara.",
        image: "assets/images/characters/SailorMoon.png",
        rarity: "Rare"
    },
    {
        name: "Doraemon (Doraemon)",
        description: "A robotic cat from the future with a pocket full of gadgets to help his owner, Nobita.",
        image: "assets/images/characters/Doraemon.png",
        rarity: "Uncommon"
    },
    {
        name: "Superman (DC Comics)",
        description: "The Man of Steel with superhuman abilities, known for his iconic 'S' symbol.",
        image: "assets/images/characters/Superman.png",
        rarity: "Legendary"
    },
    {
        name: "SpongeBob SquarePants (SpongeBob SquarePants)",
        description: "The cheerful and spongey inhabitant of Bikini Bottom, known for his pineapple house.",
        image: "assets/images/characters/Sponge.png",
        rarity: "Common"
    },
    {
        name: "Darth Vader (Star Wars)",
        description: "The Sith Lord and former Jedi Anakin Skywalker, known for his black armor and deep voice.",
        image: "assets/images/characters/Vader.png",
        rarity: "Epic"
    },
    {
        name: "Winnie the Pooh (Winnie the Pooh)",
        description: "The lovable bear with a penchant for honey and adventures in the Hundred Acre Wood.",
        image: "assets/images/characters/Pooh.png",
        rarity: "Rare"
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
    "Exotic": "exotic-rarity", // For those Cody deems worthy
};
  
// Function to generate the HTML for displaying a character
function generateCharacterHTML(character) {
  return `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" class="character-image">
      <div class="character-info-box"><p>Rarity: <b class="${rarityClasses[character.rarity]}">${character.rarity}</b></p>
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

// Function to generate a batch of 10 characters in two rows
function generateCharacterBatch() {
    let characterBatch = [];
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      characterBatch.push(characters[randomIndex]);
    }
  
    // Display the randomly selected characters in two rows
    let characterBatchDiv = document.getElementById("CharacterBatch");
    characterBatchDiv.innerHTML = `
      <div class="character-row">
        ${generateCharacterBatchHTML(characterBatch.slice(0, 5))}
      </div>
      <div class="character-row">
        ${generateCharacterBatchHTML(characterBatch.slice(5))}
      </div>
    `;
  }
  
  
  // Function to generate HTML for displaying a character batch in two rows
  function generateCharacterBatchHTML(characterBatch) {
    let characterBatchHTML = '<div class="character-row">';
    for (let i = 0; i < characterBatch.length; i++) {
      if (i === 5) {
        characterBatchHTML += '</div><div class="character-row">';
      }
      characterBatchHTML += generateCharacterHTML(characterBatch[i]);
    }
    characterBatchHTML += '</div>';
    return characterBatchHTML;
  }
  
  