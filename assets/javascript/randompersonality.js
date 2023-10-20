// Personality Generator data
var characters = [
    {
      name: "Mario (Nintendo)",
      description: "The iconic plumber from the Mushroom Kingdom, known for his red cap and overalls.",
      image: "assets/images/personalitys/Mario.png"
    },
    {
      name: "Link (The Legend of Zelda)",
      description: "The courageous hero of Hyrule, often seen wielding a sword and shield.",
      image: "assets/images/personalitys/Link.png"
    },
    {
      name: "Samus Aran (Metroid)",
      description: "A skilled bounty hunter known for her power armor and her missions against space pirates.",
      image: "assets/images/personalitys/Samus.png"
    },
    {
        name: "Pikachu (Pokémon)",
        description: "The electric-type Pokémon and mascot of the Pokémon franchise.",
        image: "assets/images/personalitys/Pikachu.png"
    },
    {
        name: "Goku (Dragon Ball Z)",
        description: "A Saiyan warrior with immense power, known for his spiky hair and energy attacks.",
        image: "assets/images/personalitys/Goku.png"
    },
    {
        name: "Naruto Uzumaki (Naruto)",
        description: "A ninja with dreams of becoming Hokage, recognized by his headband and orange jumpsuit.",
        image: "assets/images/personalitys/Naruto.png"
    },
    {
        name: "Luffy (One Piece)",
        description: "The rubber-powered pirate captain from the Straw Hat Pirates.",
        image: "assets/images/personalitys/Luffy.png"
    },
    {
        name: "Edward Elric (Fullmetal Alchemist)",
        description: "A talented alchemist with a metal arm and leg in search of the Philosopher's Stone.",
        image: "assets/images/personalitys/Edward.png"
    },
    {
        name: "Light Yagami (Death Note)",
        description: "A high school student who gains the power to control life and death with the Death Note.",
        image: "assets/images/personalitys/Light.png"
    },
    {
        name: "Hermione Granger (Harry Potter)",
        description: "A brilliant witch and one of Harry Potter's closest friends at Hogwarts.",
        image: "assets/images/personalitys/Hermione.png"
    },
    {
        name: "Captain America (Marvel Cinematic Universe)",
        description: "The super-soldier and patriotic hero, wielding his iconic shield.",
        image: "assets/images/personalitys/CapAmerica.png"
    },
    {
        name: "Rey (Star Wars)",
        description: "A scavenger turned Jedi, seeking her place in the Force.",
        image: "assets/images/personalitys/Rey.png"
    },
    {
        name: "Iron Man (Marvel Cinematic Universe)",
        description: "A genius billionaire, inventor, and philanthropist who becomes the armored hero, Iron Man.",
        image: "assets/images/personalitys/IronMan.png"
    },
    {
        name: "Black Panther (Marvel Cinematic Universe)",
        description: "The king of Wakanda, known for his advanced suit and enhanced abilities.",
        image: "assets/images/personalitys/Panther.png"
    },
    {
        name: "Wonder Woman (DC Extended Universe)",
        description: "An Amazonian warrior princess with superhuman abilities.",
        image: "assets/images/personalitys/WonderWoman.png"
    },
    {
        name: "Harley Quinn (DC Extended Universe)",
        description: "The Joker's partner-in-crime, known for her chaotic and unpredictable nature.",
        image: "assets/images/personalitys/Harley.png"
    },
    {
        name: "Totoro (My Neighbor Totoro)",
        description: "A friendly forest spirit from Studio Ghibli's 'My Neighbor Totoro'.",
        image: "assets/images/personalitys/Totoro.png"
    },
    {
        name: "WALL-E (WALL-E)",
        description: "A lovable robot designed to clean up a polluted Earth.",
        image: "assets/images/personalitys/WALL-E.png"
    },
    {
        name: "Golden Mario (Nintendo)",
        description: "A special, golden version of the iconic plumber, Mario.",
        image: "assets/images/personalitys/GoldenMario.png"
    }
  ];
  
// Function to generate the HTML for displaying a character
function generateCharacterHTML(character) {
  return `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" class="character-image">
      <p>${character.description}</p>
  `;
}

// Update the Character Gacha info
var characterInfoDiv = document.getElementById("PersonalityInfo");

function generateCharacter() {
  // Generate a random index to select a character
  var randomIndex = Math.floor(Math.random() * characters.length);
  var randomCharacter = characters[randomIndex];

  // Display the randomly selected character
  characterInfoDiv.innerHTML = generateCharacterHTML(randomCharacter);
}