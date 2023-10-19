// Personality Generator data
var Personalitys = [
    {
      name: "Mario (Nintendo)",
      description: "Optimistic, energetic, and always willing to help others. Can be a bit reckless at times, but always bounces back.",
      image: "assets/images/personalitys/Mario.png"
    },
    {
      name: "Link (The Legend of Zelda)",
      description: "Courageous, kind, and always willing to stand up for what he believes in. Can be a bit of a loner, but is always there for his friends.",
      image: "assets/images/personalitys/Link.png"
    },
    {
      name: "Samus Aran (Metroid)",
      description: "Independent, strong-willed, and always up for a challenge. Can be a bit cold and distant, but is fiercely loyal to those she cares about.",
      image: "assets/images/personalitys/Samus.png"
    },
    {
        name: "Pikachu (Pokémon)",
        description: "Friendly, cheerful, and always eager to make new friends. Can be a bit mischievous at times, but is always willing to help out.",
        image: "assets/images/personalitys/Pikachu.png"
    },
    {
        name: "Goku (Dragon Ball Z)",
        description: "Determined, hardworking, and always striving to be the best. Can be a bit naive at times, but is always willing to fight for what he believes in.",
        image: "assets/images/personalitys/Goku.png"
    },
    {
        name: "Naruto Uzumaki (Naruto)",
        description: "Optimistic, energetic, and never gives up on his dreams. Can be a bit of a klutz at times, but is always willing to help others.",
        image: "assets/images/personalitys/Naruto.png"
    },
    {
        name: "Luffy (One Piece)",
        description: "Adventurous, carefree, and always looking for the next big thing. Can be a bit reckless at times, but is always loyal to his crew.",
        image: "assets/images/personalitys/Luffy.png"
    },
    {
        name: "Edward Elric (Fullmetal Alchemist)",
        description: "Intelligent, determined, and always willing to do whatever it takes to achieve his goals. Can be a bit arrogant at times, but is always willing to learn from his mistakes.",
        image: "assets/images/personalitys/Edward.png"
    },
    {
        name: "Light Yagami (Death Note)",
        description: "Intelligent, ambitious, and always willing to take risks. Can be a bit ruthless at times, but is always willing to do whatever it takes to achieve his goals.",
        image: "assets/images/personalitys/Light.png"
    }
  ];
  
  // Function to generate the HTML for the personality image
  function generatePersonalityHTML(imageUrl, altText) {
    return `<img src="${imageUrl}" alt="${altText}" class="personality-image">`;
  }
  
  // Update Personality info
  var PersonalityInfoDiv = document.getElementById("PersonalityInfo");
  
  function generatePersonality() {
    const randomIndex = Math.floor(Math.random() * Personalitys.length);
    const randomPersonality = Personalitys[randomIndex];
  
    PersonalityInfoDiv.innerHTML = `
      <h2>${randomPersonality.name}</h2>
      ${generatePersonalityHTML(randomPersonality.image, "Personality Image")}
      <p>${randomPersonality.description}</p>
    `;
  }
  