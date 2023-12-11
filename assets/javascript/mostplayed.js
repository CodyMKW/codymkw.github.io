var clickCount = 0;

// Sort games based on playtime in descending order
gamesData.sort(function (a, b) {
  return b.playtime - a.playtime;
});

// Function to generate the HTML for the cover art image
function generateCoverArtHTML(imageUrl, altText) {
  return '<img src="' + imageUrl + '" alt="' + altText + '" class="game-cover">';
}

// Update games table
var gamesTable = document.querySelector('#games-table tbody');

// Fetch the JSON file
fetch('https://api.npoint.io/1c8c00be23c0d17cd8b5')
  .then(response => response.json())
  .then(data => {
    // Sort the games based on playtime in descending order
    data.sort((a, b) => b.playtime - a.playtime);

    // Clear existing rows
    gamesTable.innerHTML = '';

    // Create new rows based on the updated games data
    data.forEach(function (game) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + generateCoverArtHTML(game.cover, game.name) + '</td><td><a href="' + game.link + '" target="_blank">' + game.name + '</a></td><td>' + formatPlaytime(game.playtime) + ' hours</td>';
      gamesTable.appendChild(row);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));

// Function to format playtime with comma for thousands
function formatPlaytime(playtime) {
  return playtime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
