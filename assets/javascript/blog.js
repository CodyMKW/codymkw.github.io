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
        return fetch("posts/index.json")
        .then(function(response) {
            if (!response.ok) throw new Error("HTTP error! status: " + response.status);
            return response.json();
        })
        .then(function(data) {
            return Promise.all(data.posts.map(function(file, i) {
                return fetch("posts/" + file.replace('.md', ''))
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
function renderSinglePostView(postId) {
    var blogContainer = document.getElementById("blogPosts");
    var blogHeader = document.querySelector(".blog-header");
    var pagination = document.querySelector(".pagination");
    if (!blogContainer) return;
    if (blogHeader) blogHeader.classList.add('hidden');
    if (pagination) pagination.classList.add('hidden');
    var post = posts.find(function(p) {
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
        (post.image ? '<div style="text-align:center;"><img src="' + post.image + '" alt="Post Image"></div>' : "") +
        '<div class="post-content">' + (post.content ? marked.parse(post.content) : "") + '</div>' +
        (post.video ? '<div style="text-align:center;"><iframe src="' + post.video + '" frameborder="0" allowfullscreen></iframe></div>' : "") +
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
        window.disqus_config = function() {
            this.page.url = disqusBaseUrl + '?post=' + postId;
            this.page.identifier = 'post-' + postId;
            this.page.title = postTitle;
        };
        try {
            window.DISQUS.reset({
                reload: true,
                config: window.disqus_config
            });
            return;
        } catch (err) {}
    }
    window.disqus_config = function() {
        this.page.url = disqusBaseUrl + '?post=' + postId;
        this.page.identifier = 'post-' + postId;
        this.page.title = postTitle;
    };
    (function() {
        var d = document,
            s = d.createElement('script');
        s.src = 'https://' + disqusShortname + '.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        s.id = 'dsq-embed-js';
        (d.head || d.body).appendChild(s);
    })();
}
window.addEventListener("themeChanged", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var postId = urlParams.get("post");
    if (postId !== null) {
        var currentPost = posts.find(function(p) {
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
    setTimeout(function() {
        isPaginating = false;
    }, 200);
}
function populateCategories() {
    var categoryFilter = document.getElementById("categoryFilter");
    if (!categoryFilter) return;
    var categoryCounts = posts.reduce(function(counts, post) {
        if (post.category) counts[post.category] = (counts[post.category] || 0) + 1;
        return counts;
    }, {});
    var categories = Object.keys(categoryCounts).sort();
    while (categoryFilter.options.length > 1) {
        categoryFilter.remove(1);
    }
    categories.forEach(function(category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category + " (" + categoryCounts[category] + ")";
        categoryFilter.appendChild(option);
    });
}