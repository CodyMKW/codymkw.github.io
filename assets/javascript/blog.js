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

// Change this if your _posts folder is somewhere else relative to your HTML page
var postsFolder = '_posts/';

function parseFrontMatter(raw) {
    var result = { attributes: {}, body: "" };
    var trimmed = raw.trim();
    if (trimmed.indexOf("---") !== 0) {
        result.body = raw;
        return result;
    }
    var secondDash = trimmed.indexOf("---", 3);
    if (secondDash === -1) {
        result.body = raw;
        return result;
    }
    var frontMatterBlock = trimmed.substring(3, secondDash).trim();
    var bodyContent = trimmed.substring(secondDash + 3).trim();
    var lines = frontMatterBlock.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var colonIndex = line.indexOf(":");
        if (colonIndex === -1) continue;
        var key = line.substring(0, colonIndex).trim();
        var value = line.substring(colonIndex + 1).trim();
        if (
            (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') ||
            (value.charAt(0) === "'" && value.charAt(value.length - 1) === "'")
        ) {
            value = value.substring(1, value.length - 1);
        }
        result.attributes[key] = value;
    }
    result.body = bodyContent;
    return result;
}

function dateFromFilename(filename) {
    var match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : "";
}

function titleFromFilename(filename) {
    var name = filename.replace(/\.md$/i, "");
    name = name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
    name = name.replace(/-/g, " ");
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function loadMarkdownFile(filename, index) {
    var url = postsFolder + filename;
    return fetch(url)
        .then(function (response) {
            if (!response.ok) throw new Error("Failed to load " + url + " (status " + response.status + ")");
            return response.text();
        })
        .then(function (text) {
            var parsed = parseFrontMatter(text);
            var attrs = parsed.attributes;
            var body = parsed.body;

            var content = body;
            var content2 = "";
            var separatorIndex = body.indexOf("<!--more-->");
            if (separatorIndex !== -1) {
                content = body.substring(0, separatorIndex).trim();
                content2 = body.substring(separatorIndex + "<!--more-->".length).trim();
            }

            var fileDateStr = dateFromFilename(filename);
            var dateStr = attrs.date || fileDateStr || "";
            var timeStr = attrs.time || "12:00 AM";

            return {
                originalIndex: index,
                title: attrs.title || titleFromFilename(filename),
                date: dateStr,
                time: timeStr,
                author: attrs.author || "Unknown",
                category: attrs.category || "Uncategorized",
                content: content,
                content2: content2,
                image: attrs.image || "",
                video: attrs.video || ""
            };
        })
        .catch(function (err) {
            console.error("Error loading post file: " + filename, err);
            return null;
        });
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

        return fetch(postsFolder + "posts.json")
            .then(function (response) {
                if (!response.ok) throw new Error("HTTP error! status: " + response.status);
                return response.json();
            })
            .then(function (postFiles) {
                var promises = postFiles.map(function (filename, index) {
                    return loadMarkdownFile(filename, index);
                });
                return Promise.all(promises);
            })
            .then(function (loadedPosts) {
                posts = loadedPosts.filter(function (p) {
                    return p !== null;
                });

                posts.sort(function (a, b) {
                    return new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time);
                });

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
            })
            .catch(function (error) {
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

    filteredPosts = posts.filter(function (post) {
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

    pagePosts.forEach(function (post) {
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
                (post.video ? '<iframe src="' + post.video + '" frameborder="0" allowfullscreen></iframe>' : "") +
                (post.content2 ? '<div class="post-content">' + marked.parse(post.content2) + '</div>' : "");
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

    var post = posts.find(function (p) {
        return p.originalIndex === postId;
    });

    if (!post) {
        blogContainer.innerHTML =
            '<a href="#" class="blog-back-button">‹ All Posts</a>' +
            '<div class="blog-message">Post not found.</div>';
        var backBtn1 = document.querySelector('.blog-back-button');
        if (backBtn1) backBtn1.addEventListener('click', goBackToList);
        return;
    }

    var postHTML =
        '<a href="#" class="blog-back-button">‹ All Posts</a>' +
        '<div class="blog-post" data-index="' + post.originalIndex + '">' +
        '<h3>' + post.title + '</h3>' +
        '<p class="post-meta" id="blogmetadata">' + post.date + ' • ' + post.time + ' • ' + post.author + ' • ' + post.category + '</p>' +
        (post.image ? '<img src="' + post.image + '" alt="Post Image">' : "") +
        '<div class="post-content">' + (post.content ? marked.parse(post.content) : "") + '</div>' +
        (post.video ? '<iframe src="' + post.video + '" frameborder="0" allowfullscreen></iframe>' : "") +
        '<div class="post-content">' + (post.content2 ? marked.parse(post.content2) : "") + '</div>' +
        '<hr style="margin: 2em 0; border: none; border-top: 1px solid #ccc;">' +
        '<div id="disqus_thread" style="margin-top: 2em;"></div>' +
        '</div>';

    blogContainer.innerHTML = postHTML;

    var backBtn2 = document.querySelector('.blog-back-button');
    if (backBtn2) backBtn2.addEventListener('click', goBackToList);

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
        try {
            window.DISQUS.reset({ reload: true, config: window.disqus_config });
            return;
        } catch (err) {}
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

    setTimeout(function () {
        isPaginating = false;
    }, 200);
}

function populateCategories() {
    var categoryFilter = document.getElementById("categoryFilter");
    if (!categoryFilter) return;

    var categoryCounts = posts.reduce(function (counts, post) {
        if (post.category) counts[post.category] = (counts[post.category] || 0) + 1;
        return counts;
    }, {});

    var categories = Object.keys(categoryCounts).sort();

    while (categoryFilter.options.length > 1) {
        categoryFilter.remove(1);
    }

    categories.forEach(function (category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category + " (" + categoryCounts[category] + ")";
        categoryFilter.appendChild(option);
    });
}