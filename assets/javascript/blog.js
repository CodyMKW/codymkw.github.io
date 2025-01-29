document.addEventListener("DOMContentLoaded", () => {
    loadBlog();
});

let posts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 5;

async function loadBlog() {
    try {
        const response = await fetch("https://api.npoint.io/5ac2ef5dd46fbff62a02");
        const data = await response.json();

        // Ensure that posts have a correct index value
        posts = data.posts.map((post, index) => ({
            ...post,
            index: index // Set the index value to the current index in the array
        }));

        // Sort the posts by index in descending order (newest posts first)
        posts = data.posts.sort((a, b) => b.index - a.index);
        filteredPosts = [...posts]; // Copy sorted posts into filteredPosts

        const urlParams = new URLSearchParams(window.location.search);
        const postParam = urlParams.get("post");

        if (postParam !== null) {
            const postIndex = parseInt(postParam, 10);
            if (!isNaN(postIndex) && postIndex >= 0 && postIndex < posts.length) {
                currentPage = Math.floor(postIndex / postsPerPage) + 1;
            }
        }

        populateCategories();
        renderPosts();

        window.addEventListener("popstate", () => {
            loadBlog();
        });

        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const postParam = urlParams.get("post");
        
            if (postParam !== null) {
                const postIndex = parseInt(postParam, 10);
        
                // Find the post with the matching index from the JSON
                const postElement = Array.from(document.querySelectorAll(".blog-post")).find((element, index) => {
                    // Check if the index of the current post in the DOM matches the postIndex
                    const post = filteredPosts[(currentPage - 1) * postsPerPage + index];
                    return post && post.index === postIndex;
                });
        
                if (postElement) {
                    postElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        }, 100);                         

    } catch (error) {
        console.error("Error loading blog posts:", error);
    }
}

function renderPosts() {
    const blogContainer = document.getElementById("blogPosts");
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const pagePosts = filteredPosts.slice(startIndex, endIndex);

    blogContainer.innerHTML = "";

    pagePosts.forEach((post, index) => {
        const postHTML = `
            <div class="blog-post">
                <h3><a href="?post=${post.index}" onclick="jumpToPost(${post.index})">${post.title}</a></h3>
                <p class="post-meta">${post.date} • ${post.author} • ${post.category}</p>
                ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
                ${post.video ? `<iframe src="${post.video}" frameborder="0" allowfullscreen></iframe>` : ""}
                <p class="post-content">${marked.parse(post.content)}</p>
            </div>
        `;
        blogContainer.innerHTML += postHTML;
    });

    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${Math.ceil(filteredPosts.length / postsPerPage)}`;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage * postsPerPage >= filteredPosts.length;
}

function changePage(direction) {
    currentPage += direction;
    renderPosts();
}

function searchPosts() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderPosts();
}

function filterByCategory() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    filteredPosts = (selectedCategory === "all" ? posts : posts.filter(post => 
        post.category === selectedCategory
    ));
    currentPage = 1;
    renderPosts();
}

function populateCategories() {
    const categories = [...new Set(posts.map(post => post.category))];
    const categoryFilter = document.getElementById("categoryFilter");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function jumpToPost(postIndex) {
    const page = Math.floor(postIndex / postsPerPage) + 1;

    // Update the URL with a query parameter for the post
    const url = new URL(window.location);
    url.searchParams.set("post", postIndex);
    window.history.pushState({}, "", url);

    currentPage = page;
    renderPosts();
}
