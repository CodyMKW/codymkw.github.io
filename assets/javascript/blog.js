document.addEventListener("DOMContentLoaded", function() {

    if (document.getElementById("BlogContent")) {
        initializeBlog();
    }

    var themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {

        themeToggle.addEventListener("click", function() {

            try {

                window.dispatchEvent(new Event("themeChanged"));

            } catch (err) {

                var urlParams = new URLSearchParams(window.location.search);

                var postId = urlParams.get("post");

                if (postId !== null) {

                    var currentPost = posts.find(function(p) {

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

function getBasePath() {

    var path = window.location.pathname;

    if (!path.endsWith("/")) {

        path = path.substring(0, path.lastIndexOf("/") + 1);

    }

    return window.location.origin + path;

}

var basePath = getBasePath();

function parseFrontmatter(md) {

    var fm = {};

    var content = md;

    if (md.indexOf('---') === 0) {

        var end = md.indexOf('---', 3);

        if (end !== -1) {

            var raw = md.slice(3, end).trim().split('\n');

            raw.forEach(function(line) {

                var i = line.indexOf(':');

                if (i !== -1) {

                    var key = line.slice(0, i).trim();

                    var value = line.slice(i + 1).trim();

                    fm[key] = value;

                }

            });

            content = md.slice(end + 3).trim();

        }

    }

    return {

        frontmatter: fm,

        content: content

    };

}

function initializeBlog() {

    var blogContainer = document.getElementById("blogPosts");

    var blogHeader = document.querySelector(".blog-header");

    var pagination = document.querySelector(".pagination");

    if (!blogContainer) return;

    try {

        blogContainer.innerHTML = '<div class="blog-message">Loading posts...</div>';

        if (blogHeader) blogHeader.classList.add('hidden');

        if (pagination) pagination.classList.add('hidden');

        return fetch(basePath + "posts/index.json")

        .then(function(response) {

            if (!response.ok) throw new Error("HTTP error! status: " + response.status);

            return response.json();

        })

        .then(function(data) {

            return Promise.all(data.posts.map(function(file, i) {

                return fetch(basePath + "posts/" + file)

                .then(function(res) {

                    if (!res.ok) throw new Error("HTTP error! status: " + res.status);

                    return res.text();

                })

                .then(function(md) {

                    var parsed = parseFrontmatter(md);

                    var fm = parsed.frontmatter;

                    return {

                        index: i + 1,

                        title: fm.title || file.replace('.md', ''),

                        date: fm.date || '',

                        time: fm.time || '',

                        author: fm.author || '',

                        category: fm.category || '',

                        image: fm.image || '',

                        video: fm.video || '',

                        content: parsed.content,

                        content2: fm.content2 || '',

                        originalIndex: i + 1

                    };

                });

            }));

        })

        .then(function(loadedPosts) {

            posts = loadedPosts.sort(function(a, b) {

                return new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time);

            });

            filteredPosts = posts.slice();

            var searchBar = document.getElementById('searchBar');

            var categoryFilter = document.getElementById('categoryFilter');

            var prevPage = document.getElementById('prevPage');

            var nextPage = document.getElementById('nextPage');

            if (searchBar) searchBar.addEventListener('input', applyFiltersAndSearch);

            if (categoryFilter) categoryFilter.addEventListener('change', applyFiltersAndSearch);

            if (prevPage) prevPage.addEventListener('click', function() {

                changePage(-1);

            });

            if (nextPage) nextPage.addEventListener('click', function() {

                changePage(1);

            });

            populateCategories();

            handleRouting();

            window.addEventListener("popstate", handleRouting);

        })

        .catch(function(error) {

            console.error("Error loading blog posts:", error);

            blogContainer.innerHTML = '<div class="blog-message">Could not load blog posts. Please try again later.</div>';

        });

    } catch (error) {

        console.error("Error loading blog posts:", error);

    }

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

    filteredPosts = posts.filter(function(post) {

        var matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

        var matchesSearch =

        !query ||

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

    pagePosts.forEach(function(post) {

        var postElement = document.createElement('div');

        postElement.className = 'blog-post';

        postElement.dataset.index = post.originalIndex;

        var previewHTML = "";

        if (post.content) {

            var trimmedContent = post.content.length > 185 ? post.content.slice(0, 185) + "..." : post.content;

            previewHTML =

            '<div class="post-content">' + marked.parse(trimmedContent) + '</div>' +

            '<a href="?post=' + post.originalIndex + '" class="read-more">Read more →</a>';

        } else if (post.video || post.content2) {

            previewHTML =

            (post.video ? '<div style="text-align:center;"><iframe src="' + post.video + '" frameborder="0" allowfullscreen></iframe></div>' : "") +

            (post.content2 ? '<div class="post-content">' + marked.parse(post.content2) + '</div>' : "");

        }

        postElement.innerHTML =

        '<h3><a href="?post=' + post.originalIndex + '">' + post.title + '</a></h3>' +

        '<p class="post-meta" id="blogmetadata">' + post.date + ' • ' + post.time + ' • ' + post.author + ' • ' + post.category + '</p>' +

        (post.image ? '<div style="text-align:center;"><img src="' + post.image + '" alt="Post Image"></div>' : "") +

        previewHTML;

        var titleLink = postElement.querySelector('h3 a');

        if (titleLink) {

            titleLink.addEventListener('click', function(e) {

                e.preventDefault();

                window.history.pushState({

                    post: post.originalIndex

                }, "", "?post=" + post.originalIndex);

                renderSinglePostView(post.originalIndex);

            });

        }

        var readMoreLink = postElement.querySelector('.read-more');

        if (readMoreLink) {

            readMoreLink.addEventListener('click', function(e) {

                e.preventDefault();

                window.history.pushState({

                    post: post.originalIndex

                }, "", "?post=" + post.originalIndex);

                renderSinglePostView(post.originalIndex);

            });

        }

        blogContainer.appendChild(postElement);

    });

    updatePaginationUI();

}