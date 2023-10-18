const fortniteMapCodes = ["8440-2203-4683", "0389-9589-7317", "2057-3742-0636"];  // Add your map codes
const fortniteMapImages = ["https://cdn-0001.qstv.on.epicgames.com/IqiigHsawdZQqYgXcJ/image/screen_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/wPHOYjXxYKCMUgkNZH/image/screen_comp.jpeg", "https://cdn-0001.qstv.on.epicgames.com/SqCkzBhWpiNBSpAMRi/image/landscape_comp.jpeg"];  // Add your map images

function generateRandomFortniteMap() {
  const randomIndex = Math.floor(Math.random() * fortniteMapCodes.length);
  const randomMapCode = fortniteMapCodes[randomIndex];
  const randomMapImage = fortniteMapImages[randomIndex];

  const mapInfoDiv = document.getElementById("fortniteMapInfo");
  mapInfoDiv.innerHTML = `
    <img src="${randomMapImage}" alt="Fortnite Map Image">
    <p>Map Code: ${randomMapCode}</p>
  `;
}
