// Fortnite map data
var fortniteMaps = [
  {
    name: "フォートナイト学校🏫 - JAPANESE SCHOOL",
    creator: "takuman",
    code: "8440-2203-4683",
    image: "https://cdn-0001.qstv.on.epicgames.com/IqiigHsawdZQqYgXcJ/image/screen_comp.jpeg"
  },
  {
    name: "FORT SHOOTER",
    creator: "spankysully",
    code: "0389-9589-7317",
    image: "https://cdn-0001.qstv.on.epicgames.com/wPHOYjXxYKCMUgkNZH/image/screen_comp.jpeg"
  },
  {
    name: "FORTNITE FUNLAND",
    creator: "nickeh30",
    code: "2057-3742-0636",
    image: "https://cdn-0001.qstv.on.epicgames.com/SqCkzBhWpiNBSpAMRi/image/landscape_comp.jpeg"
  },
  {
    name: "[HORROR] SLENDERMAN",
    creator: "slenderman",
    code: "4394-0704-4209",
    image: "https://cdn-0001.qstv.on.epicgames.com/kUMAFeilzxclSYHBna/image/landscape_comp.jpeg"
  },
  {
    name: "MEGA RAMP SURVIVAL",
    creator: "noahsnoah",
    code: "8671-2143-9286",
    image: "https://cdn-0001.qstv.on.epicgames.com/YvwcDeLzhuXTTqSUZR/image/landscape_comp.jpeg"
  },
  {
    name: "COLOR CLIMB!",
    creator: "goodgamers",
    code: "9056-2612-1999",
    image: "https://cdn-0001.qstv.on.epicgames.com/IwBjFGXjFoHUssYnxk/image/landscape_comp.jpeg"
  },
  {
    name: "ONLYUP LIVE EVENTS! 🎇",
    creator: "nickeh30",
    code: "1350-8290-6429",
    image: "https://cdn-0001.qstv.on.epicgames.com/yvqFSXHRWyfRXMAlPa/image/landscape_comp.jpeg"
  },
  {
    name: "MUSIC MEGAVERSE",
    creator: "pridask",
    code: "3632-2839-9780",
    image: "https://cdn-0001.qstv.on.epicgames.com/CGXorfknJsaAkhGZgy/image/landscape_comp.jpeg"
  },
  {
    name: "ALAN WAKE: FLASHBACK",
    creator: "epiclabs",
    code: "3426-5561-3374",
    image: "https://cdn-0001.qstv.on.epicgames.com/QPbjeyZHnyFvYDxROK/image/landscape_comp.jpeg"
  },
  {
    name: "OCTO GAME 2.0 문어 게임",
    creator: "sundaycw",
    code: "1202-0130-7283",
    image: "https://cdn-0001.qstv.on.epicgames.com/DCSPjPZsdcuEnnvoFr/image/landscape_comp.jpeg"
  },
  {
    name: "🎡🎃 HORROR THEME PARK 🎃🎡 X 📚 HSRP 📚",
    creator: "rynex",
    code: "3039-9847-4802",
    image: "https://cdn-0001.qstv.on.epicgames.com/QNaIKFxvOMmdoBNWek/image/screen_comp.jpeg"
  },
  {
    name: "ONE PIECE - STRAW HATS VS MARINES",
    creator: "3dlab",
    code: "7374-8187-1871",
    image: "https://cdn-0001.qstv.on.epicgames.com/UIhNSzzjqCaSCQbGci/image/landscape_comp.jpeg"
  }
];

// Function to generate the HTML for the map image
function generateMapHTML(imageUrl, altText) {
  return '<img src="' + imageUrl + '" alt="' + altText + '" class="fortnite-map-image">';
}

// Update Fortnite map info
var fortniteMapInfoDiv = document.getElementById("fortniteMapInfo");

function generateRandomFortniteMap() {
  const randomIndex = Math.floor(Math.random() * fortniteMaps.length);
  const randomMap = fortniteMaps[randomIndex];

  fortniteMapInfoDiv.innerHTML = `
    <h2>${randomMap.name}</h2>
    <small>By: <a href="https://www.fortnite.com/@${randomMap.creator}" target="_blank">${randomMap.creator}</a></small>
    ${generateMapHTML(randomMap.image, "Fortnite Map Image")}
    <p>Map Code: <a href="https://www.fortnite.com/creative/island-codes/${randomMap.code}" target="_blank">${randomMap.code}</a></p>
  `;
}
