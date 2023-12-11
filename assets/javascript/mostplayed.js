 // Most Played Games table info
 var clickCount = 0;

// Fetch the JSON file
fetch(' https://api.npoint.io/1c8c00be23c0d17cd8b5')
  .then(response => response.json())
  .then(data => {
    // Sort games based on playtime in descending order
    data.sort((a, b) => b.playtime - a.playtime);

    // Update games table
    var gamesTable = document.querySelector('#games-table tbody');
    
    // Clear existing rows
    gamesTable.innerHTML = '';

    // Create new rows based on the updated games data
    data.forEach(game => {
      var row = document.createElement('tr');
      row.innerHTML = `<td>${generateCoverArtHTML(game.cover, game.name)}</td><td><a href="${game.link}" target="_blank">${game.name}</a></td><td>${formatPlaytime(game.playtime)} hours</td>`;
      gamesTable.appendChild(row);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));
 
 // Function to generate the HTML for the cover art image
 function generateCoverArtHTML(imageUrl, altText) {
   return '<img src="' + imageUrl + '" alt="' + altText + '" class="game-cover">';
 }
 
 // Function to format playtime with comma for thousands
 function formatPlaytime(playtime) {
   return playtime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }
 
 // Add a tooltip with game name to the cover art image
 function generateCoverArtHTML(coverURL, gameName) {
   return '<img src="' + coverURL + '" alt="Cover Art" title="' + gameName + '" style="max-width: 70px; margin-right: 10px; margin-right: 10px; border-radius: 4px;">';
 }
