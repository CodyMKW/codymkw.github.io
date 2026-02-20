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

var postManifest = [
  {index:1, filename:"2023-01-17-welcome-to-my-blog.md"},
  {index:2, filename:"2023-01-18-had-an-idea-for-new-post-but.md"},
  {index:3, filename:"2023-01-21-nintendo-news-page-added.md"},
  {index:4, filename:"2023-02-15-game-status-page-added.md"},
  {index:5, filename:"2023-02-17-new-splatfest-frames-page-now-live.md"},
  {index:6, filename:"2024-12-15-game-status-page-broken.md"},
  {index:7, filename:"2025-01-24-3-snes-games-available-for-switch-online-members.md"},
  {index:8, filename:"2025-01-28-whats-your-favorite-chocolate-splatfest-theme-returns.md"},
  {index:9, filename:"2025-01-28-shiny-manaphy-shiny-enamorus-added-for-completing-sinnoh-hisui-pokedex-in-pokemon-home.md"},
  {index:10, filename:"2025-01-29-new-game-trials-for-nintendo-switch-online-members-moving-out-2-dead-cells.md"},
  {index:11, filename:"2025-01-29-hatsune-miku-joins-rocket-league-on-nintendo-switch.md"},
  {index:12, filename:"2025-02-12-organize-your-game-library-with-backloggd.md"},
  {index:13, filename:"2025-02-14-new-twitch-stream-viewer-added.md"},
  {index:14, filename:"2025-02-14-multi-stream-viewer-update-watch-multiple-twitch-streams-at-once.md"},
  {index:15, filename:"2025-02-16-new-youtube-video-viewer-added.md"},
  {index:16, filename:"2025-04-02-game-status-page-fixed.md"},
  {index:17, filename:"2025-04-10-theme-switcher-added-to-all-pages.md"},
  {index:18, filename:"2025-05-06-backing-up-my-switch-captures-to-youtube.md"},
  {index:19, filename:"2025-07-07-blog-improvements.md"},
  {index:20, filename:"2025-07-12-comments-added-to-blog-posts.md"},
  {index:21, filename:"2025-10-13-havent-felt-like-playing-nso-online-games.md"},
  {index:22, filename:"2025-10-14-been-playing-pokemon-rom-hacks.md"},
  {index:23, filename:"2025-10-15-ctgp-7-16-releasing-october-31.md"},
  {index:24, filename:"2025-10-16-dont-forget-to-get-splatfest-avatar.md"},
  {index:25, filename:"2025-10-16-button-page-has-been-updated.md"},
  {index:26, filename:"2025-10-18-disqus-replaced-with-giscus.md"},
  {index:27, filename:"2025-10-28-halloween-icons-for-nso-members.md"},
  {index:28, filename:"2025-11-10-huge-acnh-free-30-update.md"},
  {index:29, filename:"2025-12-04-listening-status-added-to-homepage.md"},
  {index:30, filename:"2025-12-06-statuscafe-added-to-homepage.md"},
  {index:31, filename:"2025-12-15-switched-comments-back-to-disqus.md"},
  {index:32, filename:"2026-01-08-added-a-site-banner.md"},
  {index:33, filename:"2026-01-13-added-a-countdown-timer-page.md"}
];

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
    if (blogContainer) blogContainer.innerHTML = '<div class="blog-message">Loading your adorable posts... ^_^</div>';

    const postPromises = postManifest.map(async (item) => {
        try {
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
                index: item.index,
                title: metadata.title || "Untitled",
                date: displayDate,
                time: displayTime,
                author: metadata.author || "CodyMKW",
                category: metadata.category || "Uncategorized",
                content: content,
                content2: "",
                image: metadata.image || null,
                video: null,
                originalIndex: item.index
            };
        } catch (e) {
            return null;
        }
    });

    let loaded = (await Promise.all(postPromises)).filter(p => p !== null);
    loaded.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
    return loaded;
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
    }).catch(err => {
        console.error("Failed to load posts:", err);
        const blogContainer = document.getElementById("blogPosts");
        if (blogContainer) blogContainer.innerHTML = '<div class="blog-message">Could not load posts. Make sure your .md files are in the _posts folder.</div>';
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
