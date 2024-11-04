document.addEventListener('DOMContentLoaded', loadPlaylists);

function loadPlaylists() {
    fetch('https://api.npoint.io/28718000abe41036232b')
        .then(response => response.json())
        .then(playlists => {
            const mainContainer = document.getElementById('playlist-container');
            const featuredContainer = document.getElementById('featured-playlist-container');

            let featuredCount = 0;

            playlists.forEach(playlist => {
                const card = createPlaylistCard(playlist); // Create the card

                // Check if it's a featured playlist
                if (playlist.featured && featuredCount < 4) {
                    // Append a cloned card to the featured container
                    featuredContainer.appendChild(createPlaylistCard(playlist));
                    featuredCount++; 
                }

                // Append the original card to the main container
                mainContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading playlists:', error));
}

function createPlaylistCard(playlist) {
    const card = document.createElement('div');
    card.className = 'playlist-card';
    // Add a special class for official Nintendo playlists
    if (playlist.creator.toLowerCase() === 'nintendo') {
        card.classList.add('official-playlist');
    }
    // Add a special class for Nintendo Music Credits Project playlists
    if (playlist.icon === "https://files.catbox.moe/e4legu.jpg") {
        card.classList.add('nm-credit-project');
    }    
    card.onclick = () => window.open(playlist.link, '_blank');

    const icon = document.createElement('img');
    icon.src = playlist.icon;
    icon.alt = `${playlist.name} icon`;

    const title = document.createElement('div');
    title.className = 'playlist-title';
    title.textContent = playlist.name;

    const creator = document.createElement('div');
    creator.className = 'playlist-creator';
    creator.textContent = `Created by: ${playlist.creator}`;

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(creator);

    // Set data-tags attribute to include all tags for search functionality
    if (playlist.tags) {
        card.setAttribute('data-tags', playlist.tags.join(' ')); // Join tags as a single string
    } else {
        card.setAttribute('data-tags', ''); // Empty if no tags
    }

    // Set data-date attribute for sorting
    card.setAttribute('data-date', playlist.dateAdded);

    // Set data-featured attribute for sorting
    card.setAttribute('data-featured', playlist.featured ? "true" : "false");

    return card;
}

function filterPlaylists() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const playlists = document.querySelectorAll('.playlist-card');

    playlists.forEach(card => {
        const title = card.querySelector('.playlist-title').textContent.toLowerCase();
        const tags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase() : "";

        // Check if the query matches either the title or tags
        if (title.includes(query) || tags.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortPlaylists() {
    const sortOption = document.getElementById('sort-options').value;
    const container = document.getElementById('playlist-container');
    const playlists = Array.from(container.getElementsByClassName('playlist-card'));

    playlists.sort((a, b) => {
        const nameA = a.querySelector('.playlist-title').textContent.toLowerCase();
        const nameB = b.querySelector('.playlist-title').textContent.toLowerCase();
        const creatorA = a.querySelector('.playlist-creator').textContent.toLowerCase();
        const creatorB = b.querySelector('.playlist-creator').textContent.toLowerCase();

        switch (sortOption) {
            case 'alphabetical':
                return nameA.localeCompare(nameB);
            case 'reverse-alphabetical':
                return nameB.localeCompare(nameA);
            case 'creator':
                return creatorA.localeCompare(creatorB);
            case 'creator-reverse':
                return creatorB.localeCompare(creatorA);
            case 'newest':
                return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
            case 'oldest':
                return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
            case 'featured':
                return (b.getAttribute('data-featured') === "true") - (a.getAttribute('data-featured') === "true");
            default:
                return 0;
        }
    });

    // Clear the container and append sorted playlists
    container.innerHTML = '';
    playlists.forEach(playlist => container.appendChild(playlist));
}

