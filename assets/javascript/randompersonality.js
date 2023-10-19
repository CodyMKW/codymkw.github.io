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
    },
    {
        name: "Hermione Granger (Harry Potter)",
        description: "Intelligent, studious, and always willing to help others. Can be a bit of a know-it-all at times, but is always willing to learn new things.",
        image: "assets/images/personalitys/Hermione.png"
    },
    {
        name: "Captain America (Marvel Cinematic Universe)",
        description: "Brave, honest, and always willing to stand up for what he believes in. Can be a bit of a stickler for the rules, but is always willing to fight for what is right.",
        image: "assets/images/personalitys/CapAmerica.png"
    },
    {
        name: "Rey (Star Wars)",
        description: "Determined, resourceful, and always willing to stand up for what she believes in. Can be a bit reckless at times, but is always willing to learn from her mistakes.",
        image: "assets/images/personalitys/Rey.png"
    },
    {
        name: "Iron Man (Marvel Cinematic Universe)",
        description: "Intelligent, witty, and always willing to take on a challenge. Can be a bit arrogant at times, but is always willing to do what it takes to save the day.",
        image: "assets/images/personalitys/IronMan.png"
    },
    {
        name: "Black Panther (Marvel Cinematic Universe)",
        description: "Wise, compassionate, and always willing to protect his people. Can be a bit reserved at times, but is always willing to listen to others.",
        image: "assets/images/personalitys/Panther.png"
    },
    {
        name: "Wonder Woman (DC Extended Universe)",
        description: "Strong, compassionate, and always willing to fight for justice. Can be a bit of a warrior at times, but is always willing to show mercy.",
        image: "assets/images/personalitys/WonderWoman.png"
    },
    {
        name: "Harley Quinn (DC Extended Universe)",
        description: "Chaotic, unpredictable, and always up for a good time. Can be a bit dangerous at times, but is always willing to be herself.",
        image: "assets/images/personalitys/Harley.png"
    },
    {
        name: "Totoro (My Neighbor Totoro)",
        description: "Gentle, wise, and always willing to help those in need. Can be a bit mysterious at times, but is always there to offer comfort and support.",
        image: "assets/images/personalitys/Totoro.png"
    },
    {
        name: "WALL-E (WALL-E)",
        description: "Optimistic, hardworking, and always willing to do the right thing. Can be a bit lonely at times, but is always willing to make new friends.",
        image: "assets/images/personalitys/WALL-E.png"
    },
    {
        name: "Golden Mario (Nintendo)",
        description: "A legendary figure who is said to embody the purest form of heroism and determination. Possesses an aura of invincibility and is said to be able to overcome any obstacle.",
        image: "assets/images/personalitys/GoldenMario.png"
    }
  ];
  
  // Function to generate the HTML for the personality image
  function generatePersonalityHTML(imageUrl, altText) {
    return `<img src="${imageUrl}" alt="${altText}" class="personality-image">`;
  }
  
  // Update Personality info
  var PersonalityInfoDiv = document.getElementById("PersonalityInfo");
  
  function generatePersonality() {
  // Generate a random number between 1 and 100
  const randomChance = Math.floor(Math.random() * 100) + 1;

  let randomIndex;
  if (randomChance === 3) {
    // 3% chance for Golden Mario
    randomIndex = Personalitys.findIndex(personality => personality.name === "Golden Mario");
  } else {
    // 97% chance for others
    randomIndex = Math.floor(Math.random() * Personalitys.length);
  }  
    
    const randomPersonality = Personalitys[randomIndex];
  
    PersonalityInfoDiv.innerHTML = `
      <h2>${randomPersonality.name}</h2>
      ${generatePersonalityHTML(randomPersonality.image, "Personality Image")}
      <p>${randomPersonality.description}</p>
    `;
  }
  