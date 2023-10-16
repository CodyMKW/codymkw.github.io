 // Most Played Games table info
 var clickCount = 0;
 var gamesData = [
   {
     name: "Animal Crossing: New Horizons",
     playtime: 6490,
     link: "https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/509538_IGDB-144x192.jpg"
   },
   {
     name: "Splatoon 3",
     playtime: 515,
     link: "https://www.nintendo.com/store/products/splatoon-3-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/1158884259_IGDB-144x192.jpg"
   },
   {
     name: "Splatoon 2",
     playtime: 220,
     link: "https://www.nintendo.com/store/products/splatoon-2-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/495064_IGDB-144x192.jpg"
   },
   {
     name: "Ninjala",
     playtime: 230,
     link: "https://www.nintendo.com/store/products/ninjala-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/508259_IGDB-144x192.jpg"
   },
   {
     name: "Fall Guys",
     playtime: 150,
     link: "https://www.nintendo.com/store/products/fall-guys-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/512980-144x192.jpg"
   },
   {
     name: "Fortnite",
     playtime: 2875,
     link: "https://www.nintendo.com/store/products/fortnite-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/33214-144x192.jpg"
   },
   {
     name: "Pokémon Violet",
     playtime: 115,
     link: "https://www.nintendo.com/store/products/pokemon-violet-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/670867987-144x192.jpg"
   },
   {
     name: "Dragon Ball: Xenoverse 2",
     playtime: 100,
     link: "https://www.nintendo.com/store/products/dragon-ball-xenoverse-2-for-nintendo-switch-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/492731_IGDB-144x192.jpg"
   },
   {
     name: "My Hero Ultra Rumble",
     playtime: 50,
     link: "https://www.nintendo.com/store/products/my-hero-ultra-rumble-switch",
     cover: "https://static-cdn.jtvnw.net/ttv-boxart/451007760_IGDB-144x192.jpg"
   }
 ];
 
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
 
 // Clear existing rows
 gamesTable.innerHTML = '';
 
 // Create new rows based on the updated games data
 gamesData.forEach(function (game) {
   var row = document.createElement('tr');
   row.innerHTML = '<td>' + generateCoverArtHTML(game.cover, game.name) + '</td><td><a href="' + game.link + '" target="_blank">' + game.name + '</a></td><td>' + formatPlaytime(game.playtime) + ' hours</td>';
   gamesTable.appendChild(row);
 });
 
 // Function to format playtime with comma for thousands
 function formatPlaytime(playtime) {
   return playtime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }
 
 // Add a tooltip with game name to the cover art image
 function generateCoverArtHTML(coverURL, gameName) {
   return '<img src="' + coverURL + '" alt="Cover Art" title="' + gameName + '" style="max-width: 70px; margin-right: 10px; margin-right: 10px; border-radius: 4px;">';
 }