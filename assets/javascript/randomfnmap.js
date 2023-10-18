const fortniteMapCodes = ["8440-2203-4683", "0389-9589-7317", "2057-3742-0636", "4394-0704-4209", "8671-2143-9286", "9056-2612-1999", "1350-8290-6429", "3632-2839-9780", "3426-5561-3374"];  // Add your map codes
const fortniteMapImages = ["https://cdn-0001.qstv.on.epicgames.com/IqiigHsawdZQqYgXcJ/image/screen_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/wPHOYjXxYKCMUgkNZH/image/screen_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/SqCkzBhWpiNBSpAMRi/image/landscape_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/kUMAFeilzxclSYHBna/image/landscape_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/YvwcDeLzhuXTTqSUZR/image/landscape_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/IwBjFGXjFoHUssYnxk/image/landscape_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/yvqFSXHRWyfRXMAlPa/image/landscape_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/CGXorfknJsaAkhGZgy/image/landscape_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/QPbjeyZHnyFvYDxROK/image/landscape_comp.jpeg"];  // Add your map images

function generateRandomFortniteMap() {
    const randomIndex = Math.floor(Math.random() * fortniteMapCodes.length);
    const randomMapCode = fortniteMapCodes[randomIndex];
    const randomMapImage = fortniteMapImages[randomIndex];
  
    const mapInfoDiv = document.getElementById("fortniteMapInfo");
    mapInfoDiv.innerHTML = `
      <img src="${randomMapImage}" alt="Fortnite Map Image" class="fortnite-map-image">
      <p>Map Code: <a href="https://www.fortnite.com/@user/${randomMapCode}" target="_blank">${randomMapCode}</a></p>
    `;
  }
  