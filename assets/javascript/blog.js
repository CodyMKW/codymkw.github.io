document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("BlogContent")) {
        initializeBlog();
    }
});

let posts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 7;
let isPaginating = false;

async function initializeBlog() {
    const blogContainer = document.getElementById("blogPosts");
    const blogHeader = document.querySelector(".blog-header");
    const pagination = document.querySelector(".pagination");

    try {
        blogContainer.innerHTML = `<div class="blog-message">Loading posts...</div>`;
        blogHeader.classList.add('hidden');
        pagination.classList.add('hidden');

        const response = await fetch("https://api.npoint.io/5ac2ef5dd46fbff62a02");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        posts = data.posts.map(post => ({
            ...post,
            originalIndex: post.index
        })).sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));

        filteredPosts = [...posts];

        document.getElementById('searchBar').addEventListener('input', applyFiltersAndSearch);
        document.getElementById('categoryFilter').addEventListener('change', applyFiltersAndSearch);
        document.getElementById('prevPage').addEventListener('click', () => changePage(-1));
        document.getElementById('nextPage').addEventListener('click', () => changePage(1));

        populateCategories();
        handleRouting();
        window.addEventListener("popstate", handleRouting);

    } catch (error) {
        console.error("Error loading blog posts:", error);
        blogContainer.innerHTML = `<div class="blog-message">Could not load blog posts. Please try again later.</div>`;
    }
}

function handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post");

    if (postId !== null) {
        renderSinglePostView(parseInt(postId, 10));
    } else {
        renderListView();
    }
}

function applyFiltersAndSearch() {
    const query = document.getElementById("searchBar").value.trim().toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter").value;

    filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
        const matchesSearch = !query || 
            (post.title && post.title.toLowerCase().includes(query)) || 
            (post.content && post.content.toLowerCase().includes(query)) ||
            (post.content2 && post.content2.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
    });

    currentPage = 1;
    renderListView();
}

function renderListView() {
    const blogContainer = document.getElementById("blogPosts");
    const blogHeader = document.querySelector(".blog-header");

    blogHeader.classList.remove('hidden');
    blogContainer.innerHTML = "";

    if (filteredPosts.length === 0) {
        blogContainer.innerHTML = `<div class="blog-message">No posts found.</div>`;
        updatePaginationUI();
        return;
    }

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const pagePosts = filteredPosts.slice(startIndex, endIndex);

    pagePosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.dataset.index = post.originalIndex;

        // handle preview
        let previewHTML = "";
        if (post.content) {
            const trimmedContent = post.content.length > 185 
                ? post.content.slice(0, 185) + "..." 
                : post.content;
            previewHTML = `
                <div class="post-content">${marked.parse(trimmedContent)}</div>
                <a href="?post=${post.originalIndex}" class="read-more">Read more →</a>
            `;
        } else if (post.video || post.content2) {
            // show video and/or content2 when no content
            previewHTML = `
                ${post.video ? `<iframe src="${post.video}" frameborder="0" allowfullscreen></iframe>` : ""}
                ${post.content2 ? `<div class="post-content">${marked.parse(post.content2)}</div>` : ""}
            `;
        }

        postElement.innerHTML = `
            <h3><a href="?post=${post.originalIndex}">${post.title}</a></h3>
            <p class="post-meta" id="blogmetadata">${post.date} • ${post.time} • ${post.author} • ${post.category}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
            ${previewHTML}
        `;

        // link click handlers
        postElement.querySelector('h3 a').addEventListener('click', e => {
            e.preventDefault();
            window.history.pushState({ post: post.originalIndex }, "", `?post=${post.originalIndex}`);
            renderSinglePostView(post.originalIndex);
        });

        const readMoreLink = postElement.querySelector('.read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', e => {
                e.preventDefault();
                window.history.pushState({ post: post.originalIndex }, "", `?post=${post.originalIndex}`);
                renderSinglePostView(post.originalIndex);
            });
        }

        blogContainer.appendChild(postElement);
    });

    updatePaginationUI();
}

function renderSinglePostView(postId) {
    const blogContainer = document.getElementById("blogPosts");
    const blogHeader = document.querySelector(".blog-header");
    const pagination = document.querySelector(".pagination");

    blogHeader.classList.add('hidden');
    pagination.classList.add('hidden');

    const post = posts.find(p => p.originalIndex === postId);

    if (!post) {
        blogContainer.innerHTML = `
            <a href="#" class="blog-back-button">‹ All Posts</a>
            <div class="blog-message">Post not found.</div>
        `;
        document.querySelector('.blog-back-button').addEventListener('click', goBackToList);
        return;
    }

    const postHTML = `
        <a href="#" class="blog-back-button">‹ All Posts</a>
        <div class="blog-post" data-index="${post.originalIndex}">
            <h3>${post.title}</h3>
            <p class="post-meta" id="blogmetadata">${post.date} • ${post.time} • ${post.author} • ${post.category}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
            <div class="post-content">${post.content ? marked.parse(post.content) : ""}</div>
            ${post.video ? `<iframe src="${post.video}" frameborder="0" allowfullscreen></iframe>` : ""}
            <div class="post-content">${post.content2 ? marked.parse(post.content2) : ""}</div>
            <hr style="margin: 2em 0; border: none; border-top: 1px solid #ccc;">
            <div id="comments-container" style="margin-top: 2em;"></div>
        </div>
    `;

    blogContainer.innerHTML = postHTML;
    document.querySelector('.blog-back-button').addEventListener('click', goBackToList);

    loadGiscus(post.originalIndex);
}

// Giscus loader with theme sync
function loadGiscus(postId) {
    const container = document.getElementById("comments-container");
    container.innerHTML = "";

    // Get theme from localStorage (default to light if missing)
    const currentTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";

    const giscus = document.createElement("script");
    giscus.src = "https://giscus.app/client.js";
    giscus.setAttribute("data-repo", "CodyMKW/blog-comments");
    giscus.setAttribute("data-repo-id", "R_kgDOQEsfnA");
    giscus.setAttribute("data-category", "Blog Comments");
    giscus.setAttribute("data-category-id", "DIC_kwDOQEsfnM4CwyYq");
    giscus.setAttribute("data-mapping", "specific");
    giscus.setAttribute("data-term", `post-${postId}`);
    giscus.setAttribute("data-reactions-enabled", "0");
    giscus.setAttribute("data-emit-metadata", "0");
    giscus.setAttribute("data-theme", currentTheme);
    giscus.setAttribute("data-sort-by", "newest");
    giscus.setAttribute("crossorigin", "anonymous");
    giscus.async = true;

    container.appendChild(giscus);

    // Theme update listener for when user toggles theme
    window.addEventListener("themeChanged", () => {
        const newTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";
        const iframe = document.querySelector("iframe.giscus-frame");
        if (iframe) {
            iframe.contentWindow.postMessage(
                {
                    giscus: {
                        setConfig: {
                            theme: newTheme,
                        },
                    },
                },
                "https://giscus.app"
            );
        }
    });
}

function goBackToList(e) {
    e.preventDefault();
    window.history.pushState({}, "", window.location.pathname);
    renderListView();
}

function updatePaginationUI() {
    const pageInfo = document.getElementById("pageInfo");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pagination = document.querySelector(".pagination");

    if (filteredPosts.length === 0) {
        pagination.classList.add('hidden');
        return;
    }

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (totalPages <= 1) {
        pagination.classList.add('hidden');
        return;
    }

    pagination.classList.remove('hidden');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage >= totalPages;
}

function changePage(direction) {
    if (isPaginating) return;
    isPaginating = true;

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderListView();
    }

    setTimeout(() => {
        isPaginating = false;
    }, 200);
}

function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");

    // Count posts per category
    const categoryCounts = posts.reduce((counts, post) => {
        if (post.category) {
            counts[post.category] = (counts[post.category] || 0) + 1;
        }
        return counts;
    }, {});

    // Get all unique categories sorted alphabetically (optional)
    const categories = Object.keys(categoryCounts).sort();

    // Clear old options except "All"
    while (categoryFilter.options.length > 1) {
        categoryFilter.remove(1);
    }

    // Add new category options with counts
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = `${category} (${categoryCounts[category]})`;
        categoryFilter.appendChild(option);
    });
}
