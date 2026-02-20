document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("BlogContent")) {
        initializeBlog();
    }
    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            try {
                window.dispatchEvent(new Event("themeChanged"));
            } catch (err) {
                var urlParams = new URLSearchParams(window.location.search);
                var postId = urlParams.get("post");
                if (postId !== null) {
                    var currentPost = posts.find(function (p) {
                        return p.originalIndex === parseInt(postId, 10);
                    });
                    if (currentPost) loadDisqus(currentPost.originalIndex, currentPost.title);
                }
            }
        });
    }
});

var posts = [];
var filteredPosts = [];
var currentPage = 1;
var postsPerPage = 7;
var isPaginating = false;
var disqusShortname = 'codymkw';
var disqusBaseUrl = 'https://codymkw.nekoweb.org';

function parseFrontmatter(mdContent) {
    const match = mdContent.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
    if (!match) return { metadata: {}, content: mdContent.trim() };
    
    const front = match[1];
    const content = match[2].trim();
    const metadata = {};
    
    front.split('\n').forEach(line => {
        const colon = line.indexOf(':');
        if (colon === -1) return;
        const key = line.slice(0, colon).trim();
        let val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
        metadata[key] = val;
    });
    
    return { metadata, content };
}

async function loadPostsFromFolder() {
    const blogContainer = document.getElementById("blogPosts");
    blogContainer.innerHTML = '<div class="blog-message">Loading cute posts from _posts folder... ^_^</div>';

    try {
        const indexRes = await fetch("_posts/posts-index.json");
        if (!indexRes.ok) throw new Error("No index");
        const manifest = await indexRes.json();

        const postPromises = manifest.map(async (item) => {
            const res = await fetch(`_posts/${item.filename}`);
            if (!res.ok) return null;
            const mdText = await res.text();
            const { metadata, content } = parseFrontmatter(mdText);

            let displayDate = "";
            let displayTime = "";
            if (metadata.date) {
                const [d, t] = metadata.date.split(' ');
                const [year, mon, day] = d.split('-');
                displayDate = `${parseInt(mon)}/${parseInt(day)}/${year}`;
                
                let hour = parseInt(t.split(':')[0]);
                const min = t.split(':')[1];
                const ampm = hour >= 12 ? 'PM' : 'AM';
                hour = hour % 12 || 12;
                displayTime = `${hour}:${min} ${ampm}`;
            }

            return {
                index: parseInt(item.index),
                title: metadata.title || "Untitled",
                date: displayDate,
                time: displayTime,
                author: metadata.author || "CodyMKW",
                category: metadata.category || "Uncategorized",
                content: content,
                content2: "",
                image: metadata.image || null,
                video: null,
                originalIndex: parseInt(item.index)
            };
        });

        let loaded = (await Promise.all(postPromises)).filter(p => p !== null);

        loaded.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));

        return loaded;
    } catch (e) {
        console.error(e);
        return [];
    }
}

function initializeBlog() {
    loadPostsFromFolder().then(loadedPosts => {
        posts = loadedPosts;
        filteredPosts = posts.slice();

        var searchBar = document.getElementById('searchBar');
        var categoryFilter = document.getElementById('categoryFilter');
        var prevPage = document.getElementById('prevPage');
        var nextPage = document.getElementById('nextPage');

        if (searchBar) searchBar.addEventListener('input', applyFiltersAndSearch);
        if (categoryFilter) categoryFilter.addEventListener('change', applyFiltersAndSearch);
        if (prevPage) prevPage.addEventListener('click', () => changePage(-1));
        if (nextPage) nextPage.addEventListener('click', () => changePage(1));

        populateCategories();
        handleRouting();
        window.addEventListener("popstate", handleRouting);
    });
}

function handleRouting() {
    var urlParams = new URLSearchParams(window.location.search);
    var postId = urlParams.get("post");
    if (postId !== null) {
        renderSinglePostView(parseInt(postId, 10));
    } else {
        renderListView();
    }
}
function applyFiltersAndSearch() {
    var searchBar = document.getElementById("searchBar");
    var categoryFilter = document.getElementById("categoryFilter");
    if (!searchBar || !categoryFilter) return;
    var query = searchBar.value.trim().toLowerCase();
    var selectedCategory = categoryFilter.value;
    filteredPosts = posts.filter(function (post) {
        var matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
        var matchesSearch = !query ||
            (post.title && post.title.toLowerCase().indexOf(query) !== -1) ||
            (post.content && post.content.toLowerCase().indexOf(query) !== -1) ||
            (post.content2 && post.content2.toLowerCase().indexOf(query) !== -1);
        return matchesCategory && matchesSearch;
    });
    currentPage = 1;
    renderListView();
}
function renderListView() {
    var blogContainer = document.getElementById("blogPosts");
    var blogHeader = document.querySelector(".blog-header");
    if (!blogContainer) return;
    if (blogHeader) blogHeader.classList.remove('hidden');
    blogContainer.innerHTML = "";
    if (filteredPosts.length === 0) {
        blogContainer.innerHTML = '<div class="blog-message">No posts found.</div>';
        updatePaginationUI();
        return;
    }
    var startIndex = (currentPage - 1) * postsPerPage;
    var endIndex = startIndex + postsPerPage;
    var pagePosts = filteredPosts.slice(startIndex, endIndex);
    pagePosts.forEach(function (post) {
        var postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.dataset.index = post.originalIndex;
        var previewHTML = "";
        if (post.content) {
            var trimmedContent = post.content.length > 185 ? post.content.slice(0, 185) + "..." : post.content;
            previewHTML = '<div class="post-content">' + marked.parse(trimmedContent) + '</div>' +
                          '<a href="?post=' + post.originalIndex + '" class="read-more">Read more →</a>';
        }
        postElement.innerHTML =
            '<h3><a href="?post=' + post.originalIndex + '">' + post.title + '</a></h3>' +
            '<p class="post-meta" id="blogmetadata">' + post.date + ' • ' + post.time + ' • ' + post.author + ' • ' + post.category + '</p>' +
            (post.image ? '<img src="' + post.image + '" alt="Post Image">' : "") +
            previewHTML;
        var titleLink = postElement.querySelector('h3 a');
        if (titleLink) {
            titleLink.addEventListener('click', function (e) {
                e.preventDefault();
                window.history.pushState({ post: post.originalIndex }, "", "?post=" + post.originalIndex);
                renderSinglePostView(post.originalIndex);
            });
        }
        var readMoreLink = postElement.querySelector('.read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function (e) {
                e.preventDefault();
                window.history.pushState({ post: post.originalIndex }, "", "?post=" + post.originalIndex);
                renderSinglePostView(post.originalIndex);
            });
        }
        blogContainer.appendChild(postElement);
    });
    updatePaginationUI();
}
function renderSinglePostView(postId) {
    var blogContainer = document.getElementById("blogPosts");
    var blogHeader = document.querySelector(".blog-header");
    var pagination = document.querySelector(".pagination");
    if (!blogContainer) return;
    if (blogHeader) blogHeader.classList.add('hidden');
    if (pagination) pagination.classList.add('hidden');
    var post = posts.find(function (p) { return p.originalIndex === postId; });
    if (!post) {
        blogContainer.innerHTML = '<a href="#" class="blog-back-button">‹ All Posts</a><div class="blog-message">Post not found.</div>';
        document.querySelector('.blog-back-button').addEventListener('click', goBackToList);
        return;
    }
    var postHTML = '<a href="#" class="blog-back-button">‹ All Posts</a>' +
        '<div class="blog-post" data-index="' + post.originalIndex + '">' +
        '<h3>' + post.title + '</h3>' +
        '<p class="post-meta" id="blogmetadata">' + post.date + ' • ' + post.time + ' • ' + post.author + ' • ' + post.category + '</p>' +
        (post.image ? '<img src="' + post.image + '" alt="Post Image">' : "") +
        '<div class="post-content">' + marked.parse(post.content) + '</div>' +
        (post.video ? '<iframe src="' + post.video + '" frameborder="0" allowfullscreen></iframe>' : "") +
        '<div class="post-content">' + (post.content2 ? marked.parse(post.content2) : "") + '</div>' +
        '<hr style="margin: 2em 0; border: none; border-top: 1px solid #ccc;">' +
        '<div id="disqus_thread" style="margin-top: 2em;"></div>' +
        '</div>';
    blogContainer.innerHTML = postHTML;
    document.querySelector('.blog-back-button').addEventListener('click', goBackToList);
    loadDisqus(post.originalIndex, post.title);
}
function loadDisqus(postId, postTitle) {
    var container = document.getElementById("disqus_thread");
    if (!container) return;
    container.innerHTML = '';
    var existingScript = document.getElementById('dsq-embed-js');
    if (existingScript) existingScript.remove();
    if (window.DISQUS && typeof window.DISQUS.reset === 'function') {
        window.disqus_config = function () {
            this.page.url = disqusBaseUrl + '?post=' + postId;
            this.page.identifier = 'post-' + postId;
            this.page.title = postTitle;
        };
        try { window.DISQUS.reset({ reload: true, config: window.disqus_config }); return; } catch (err) {}
    }
    window.disqus_config = function () {
        this.page.url = disqusBaseUrl + '?post=' + postId;
        this.page.identifier = 'post-' + postId;
        this.page.title = postTitle;
    };
    (function () {
        var d = document, s = d.createElement('script');
        s.src = 'https://' + disqusShortname + '.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        s.id = 'dsq-embed-js';
        (d.head || d.body).appendChild(s);
    })();
}
window.addEventListener("themeChanged", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var postId = urlParams.get("post");
    if (postId !== null) {
        var currentPost = posts.find(function (p) {
            return p.originalIndex === parseInt(postId, 10);
        });
        if (currentPost) loadDisqus(currentPost.originalIndex, currentPost.title);
    }
});
function goBackToList(e) {
    e.preventDefault();
    window.history.pushState({}, "", window.location.pathname);
    renderListView();
}
function updatePaginationUI() {
    var pageInfo = document.getElementById("pageInfo");
    var prevPageBtn = document.getElementById("prevPage");
    var nextPageBtn = document.getElementById("nextPage");
    var pagination = document.querySelector(".pagination");
    if (!pagination || !pageInfo || !prevPageBtn || !nextPageBtn) return;
    if (filteredPosts.length === 0) {
        pagination.classList.add('hidden');
        return;
    }
    var totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (totalPages <= 1) {
        pagination.classList.add('hidden');
        return;
    }
    pagination.classList.remove('hidden');
    pageInfo.textContent = 'Page ' + currentPage + ' of ' + totalPages;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage >= totalPages;
}
function changePage(direction) {
    if (isPaginating) return;
    isPaginating = true;
    var totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    var newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderListView();
    }
    setTimeout(function () { isPaginating = false; }, 200);
}
function populateCategories() {
    var categoryFilter = document.getElementById("categoryFilter");
    if (!categoryFilter) return;
    var categoryCounts = posts.reduce(function (counts, post) {
        if (post.category) counts[post.category] = (counts[post.category] || 0) + 1;
        return counts;
    }, {});
    var categories = Object.keys(categoryCounts).sort();
    while (categoryFilter.options.length > 1) categoryFilter.remove(1);
    categories.forEach(function (category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category + " (" + categoryCounts[category] + ")";
        categoryFilter.appendChild(option);
    });
}
