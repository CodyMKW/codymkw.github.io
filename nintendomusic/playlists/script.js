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

            document.getElementById('sort-options').value = "newest"; // Set dropdown to newest first by default
            sortPlaylists(); // Sort playlists newest first by default
        })
        .catch(error => console.error('Error loading playlists:', error));
}

function createPlaylistCard(playlist) {
    const card = document.createElement('div');
    card.className = 'playlist-card';

    if (playlist.creator.toLowerCase() === 'nintendo') {
        card.classList.add('official-playlist');
    }
    if (playlist.creator.toLowerCase() === 'codymkw') {
        card.classList.add('pageowner-playlist');
    }
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

    // Create the copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy Link';
    copyButton.onclick = (event) => copyLink(event, playlist.link);

    // Create a message for link copied confirmation
    const copyMessage = document.createElement('div');
    copyMessage.className = 'copy-message';
    copyMessage.textContent = 'Link copied to clipboard!';
    copyMessage.style.display = 'none'; // Initially hidden

    // Append elements to the card
    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(creator);
    card.appendChild(copyButton);
    card.appendChild(copyMessage); // Append copyMessage here

    // Set data attributes for search and sorting
    card.setAttribute('data-tags', playlist.tags ? playlist.tags.join(' ') : '');
    card.setAttribute('data-date', playlist.dateAdded);
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

document.getElementById('patch-notes-button').addEventListener('click', () => togglePatchNotes(true));

function togglePatchNotes(show) {
    const modal = document.getElementById('patch-notes-modal');
    modal.style.display = show ? 'block' : 'none';

    if (show) {
        fetchPatchNotes();
    }
}

function fetchPatchNotes() {
    fetch('https://api.npoint.io/3cd63e8f6762892efbf8')
        .then(response => response.json())
        .then(patchNotes => {
            const contentDiv = document.getElementById('patch-notes-content');
            contentDiv.innerHTML = '';

            patchNotes.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'patch-note';
                noteDiv.innerHTML = `
                    <h3>${note.version}</h3>
                    <p>${note.date}</p>
                    <ul>
                        ${note.changes.map(change => `<li>${change}</li>`).join('')}
                    </ul>
                `;
                contentDiv.appendChild(noteDiv);
            });
        })
        .catch(error => console.error('Error loading patch notes:', error));
}

// Optional: Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('patch-notes-modal');
    if (event.target === modal) {
        togglePatchNotes(false);
    }
};

function copyLink(event, link) {
    // Prevent card click event from opening the playlist link
    event.stopPropagation();

    // Copy the link to the clipboard
    navigator.clipboard.writeText(link).then(() => {
        // Find the copyMessage element directly within the parent card
        const copyMessage = event.target.nextElementSibling;

        // Show the copy message
        copyMessage.style.display = 'block';
        
        // Hide the message after 2 seconds
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    }).catch(error => {
        console.error('Failed to copy link:', error);
    });
}
