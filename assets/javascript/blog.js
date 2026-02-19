---
---
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("BlogContent") || document.getElementById("blogPosts")) {
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
var disqusBaseUrl = 'https://codymkw.github.io'; // Updated to your GH pages URL

function initializeBlog() {
    var blogContainer = document.getElementById("blogPosts");
    var blogHeader = document.querySelector(".blog-header");
    var pagination = document.querySelector(".pagination");

    if (!blogContainer) return;

    posts = [
        {% for post in site.posts %}
        {
            "index": {{ forloop.rindex }}, 
            "title": {{ post.title | jsonify }},
            "date": "{{ post.date | date: '%b %-d, %Y' }}",
            "time": "{{ post.date | date: '%I:%M %p' }}",
            "author": "{{ post.author | default: 'CodyMKW' }}",
            "category": "{{ post.category | default: 'Page News/Updates' }}",
            "content": {{ post.content | jsonify }},
            "image": "{{ post.image }}",
            "video": "{{ post.video }}",
            "originalIndex": {{ forloop.rindex }}
        }{% unless forloop.last %},{% endunless %}
        {% endfor %}
    ];

    filteredPosts = posts.slice();

    var searchBar = document.getElementById('searchBar');
    var categoryFilter = document.getElementById('categoryFilter');
    var prevPage = document.getElementById('prevPage');
    var nextPage = document.getElementById('nextPage');

    if (searchBar) searchBar.addEventListener('input', applyFiltersAndSearch);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFiltersAndSearch);
    if (prevPage) prevPage.addEventListener('click', function () { changePage(-1); });
    if (nextPage) nextPage.addEventListener('click', function () { changePage(1); });

    populateCategories();
    handleRouting();
    window.addEventListener("popstate", handleRouting);
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
        var matchesSearch =
            !query ||
            (post.title && post.title.toLowerCase().indexOf(query) !== -1) ||
            (post.content && post.content.toLowerCase().indexOf(query) !== -1);

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
            var stripped = post.content.replace(/<[^>]*>?/gm, '');
            var trimmedContent = stripped.length > 185 ? stripped.slice(0, 185) + "..." : stripped;
            previewHTML =
                '<div class="post-content">' + trimmedContent + '</div>' +
                '<a href="?post=' + post.originalIndex + '" class="read-more">Read more →</a>';
        }

        postElement.innerHTML =
            '<h3><a href="?post=' + post.originalIndex + '">' + post.title + '</a></h3>' +
            '<p class="post-meta" id="blogmetadata">' + post.date + ' • ' + post.time + ' • ' + post.author + ' • ' + post.category + '</p>' +
            (post.image ? '<img src="' + post.image + '" alt="Post Image" style="max-width:100%; border-radius:8px; margin: 10px 0;">' : "") +
            previewHTML;

        // Add event listeners for SPA-style navigation
        var titleLink = postElement.querySelector('h3 a');
        var readMoreLink = postElement.querySelector('.read-more');
        
        [titleLink, readMoreLink].forEach(function(el) {
            if (el) {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    window.history.pushState({ post: post.originalIndex }, "", "?post=" + post.originalIndex);
                    renderSinglePostView(post.originalIndex);
                });
            }
        });

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

    var post = posts.find(function (p) {
        return p.originalIndex === postId;
    });

    if (!post) {
        blogContainer.innerHTML =
            '<a href="#" class="blog-back-button">‹ All Posts</a>' +
            '<div class="blog-message">Post not found.</div>';
        document.querySelector('.blog-back-button').addEventListener('click', goBackToList);
        return;
    }

    blogContainer.innerHTML =
        '<a href="#" class="blog-back-button">‹ All Posts</a>' +
        '<div class="blog-post" data-index="' + post.originalIndex + '">' +
        '<h3>' + post.title + '</h3>' +
        '<p class="post-meta" id="blogmetadata">' + post.date + ' • ' + post.time + ' • ' + post.author + ' • ' + post.category + '</p>' +
        (post.image ? '<img src="' + post.image + '" alt="Post Image" style="max-width:100%; border-radius:8px;">' : "") +
        '<div class="post-content">' + post.content + '</div>' +
        (post.video ? '<iframe src="' + post.video + '" frameborder="0" allowfullscreen style="width:100%; height:315px; margin: 20px 0;"></iframe>' : "") +
        '<hr style="margin: 2em 0; border: none; border-top: 1px solid #39ff14;">' +
        '<div id="disqus_thread" style="margin-top: 2em;"></div>' +
        '</div>';

    document.querySelector('.blog-back-button').addEventListener('click', goBackToList);
    loadDisqus(post.originalIndex, post.title);
}

function loadDisqus(postId, postTitle) {
    var container = document.getElementById("disqus_thread");
    if (!container) return;
    container.innerHTML = '';

    window.disqus_config = function () {
        this.page.url = disqusBaseUrl + '/blog?post=' + postId;
        this.page.identifier = 'jekyll-post-' + postId;
        this.page.title = postTitle;
    };

    var d = document, s = d.createElement('script');
    s.src = 'https://' + disqusShortname + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}

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
    currentPage += direction;
    renderListView();
    window.scrollTo(0, 0);
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