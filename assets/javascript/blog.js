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

        // Store posts while keeping their original index
        posts = data.posts.map((post, index) => ({
            ...post,
            originalIndex: post.index // Preserve the original JSON index
        }));

        // Sort posts by date (newest first)
        posts.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA;
        });

        filteredPosts = [...posts];

        const urlParams = new URLSearchParams(window.location.search);
        const postParam = urlParams.get("post");

        if (postParam !== null) {
            const postIndex = parseInt(postParam, 10);
            const postPosition = filteredPosts.findIndex(post => post.originalIndex === postIndex);

            if (postPosition !== -1) {
                currentPage = Math.floor(postPosition / postsPerPage) + 1;
            }
        }

        populateCategories();
        renderPosts();

        window.addEventListener("popstate", () => {
            loadBlog();
        });

        setTimeout(() => {
            scrollToPost();
        }, 500); // Delay to ensure posts are fully rendered

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

    pagePosts.forEach((post) => {
        const postHTML = `
            <div class="blog-post" data-index="${post.originalIndex}">
                <h3><a href="?post=${post.originalIndex}" onclick="jumpToPost(${post.originalIndex})">${post.title}</a></h3>
                <p class="post-meta" id="blogmetadata">${post.date} • ${post.time} • ${post.author} • ${post.category}</p>
                ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
                <div class="post-content" id="blogcontent">${post.content ? marked.parse(post.content) : ""}</div>
                ${post.video ? `<iframe src="${post.video}" frameborder="0" allowfullscreen></iframe>` : ""}
                <div class="post-content" id="blogcontent">${post.content2 ? marked.parse(post.content2) : ""}</div>
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

function scrollToPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postParam = urlParams.get("post");

    if (postParam !== null) {
        const postIndex = parseInt(postParam, 10);
        const postElement = document.querySelector(`.blog-post[data-index="${postIndex}"]`);

        if (postElement) {
            postElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
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