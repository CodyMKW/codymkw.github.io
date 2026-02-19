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

                var slug = getSlugFromURL();

                if (slug) {

                    var currentPost = posts.find(function (p) {

                        return p.slug === slug;

                    });

                    if (currentPost) {

                        loadDisqus(currentPost.slug, currentPost.title);

                    }

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

var disqusShortname = "codymkw";

var disqusBaseUrl = "https://codymkw.github.io";

function getSlugFromURL() {

    var path = window.location.pathname;

    var parts = path.split("/").filter(function (p) {

        return p.length > 0;

    });

    if (parts.length >= 2 && parts[0] === "blog") {

        return parts[1];

    }

    return null;

}

function goToPost(slug) {

    window.history.pushState(

        { post: slug },

        "",

        "/blog/" + slug

    );

    renderSinglePostView(slug);

}

function initializeBlog() {

    var blogContainer = document.getElementById("blogPosts");

    if (!blogContainer) return;

    posts = [

        {% for post in site.posts %}

        {

            "title": {{ post.title | jsonify }},

            "slug": "{{ post.slug }}",

            "date": "{{ post.date | date: '%b %-d, %Y' }}",

            "time": "{{ post.date | date: '%I:%M %p' }}",

            "author": "{{ post.author | default: 'CodyMKW' }}",

            "category": "{{ post.category | default: 'Page News/Updates' }}",

            "content": {{ post.content | jsonify }},

            "content2": {{ post.content2 | jsonify }},

            "image": "{{ post.image }}",

            "video": "{{ post.video }}"

        }

        {% unless forloop.last %},{% endunless %}

        {% endfor %}

    ];

    filteredPosts = posts.slice();

    var searchBar = document.getElementById("searchBar");

    var categoryFilter = document.getElementById("categoryFilter");

    var prevPage = document.getElementById("prevPage");

    var nextPage = document.getElementById("nextPage");

    if (searchBar) {

        searchBar.addEventListener("input", applyFiltersAndSearch);

    }

    if (categoryFilter) {

        categoryFilter.addEventListener("change", applyFiltersAndSearch);

    }

    if (prevPage) {

        prevPage.addEventListener("click", function () {

            changePage(-1);

        });

    }

    if (nextPage) {

        nextPage.addEventListener("click", function () {

            changePage(1);

        });

    }

    populateCategories();

    handleRouting();

    window.addEventListener("popstate", handleRouting);

}

function handleRouting() {

    var slug = getSlugFromURL();

    if (slug) {

        renderSinglePostView(slug);

    } else {

        renderListView();

    }

}

function applyFiltersAndSearch() {

    var searchBar = document.getElementById("searchBar");

    var categoryFilter = document.getElementById("categoryFilter");

    if (!searchBar || !categoryFilter) return;

    var query = searchBar.value.toLowerCase();

    var category = categoryFilter.value;

    filteredPosts = posts.filter(function (post) {

        var matchesCategory = category === "all" || post.category === category;

        var matchesSearch =

            !query ||

            post.title.toLowerCase().indexOf(query) !== -1 ||

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

    var pagination = document.querySelector(".pagination");

    if (!blogContainer) return;

    if (blogHeader) blogHeader.classList.remove("hidden");

    if (pagination) pagination.classList.remove("hidden");

    blogContainer.innerHTML = "";

    if (filteredPosts.length === 0) {

        blogContainer.innerHTML = "<div>No posts found</div>";

        updatePaginationUI();

        return;

    }

    var start = (currentPage - 1) * postsPerPage;

    var end = start + postsPerPage;

    var pagePosts = filteredPosts.slice(start, end);

    pagePosts.forEach(function (post) {

        var el = document.createElement("div");

        el.className = "blog-post";

        var preview = "";

        if (post.content) {

            var trimmed = post.content.length > 185

                ? post.content.slice(0, 185) + "..."

                : post.content;

            preview += '<div class="post-content">' +

                marked.parse(trimmed) +

                "</div>";

        }

        if (post.image) {

            preview +=

                '<img src="' +

                post.image +

                '" style="max-width:100%; border-radius:8px; margin-top:10px;">';

        }

        if (post.video) {

            preview +=

                '<iframe src="' +

                post.video +

                '" frameborder="0" allowfullscreen style="width:100%; height:315px; margin-top:10px;"></iframe>';

        }

        preview +=

            '<a href="/blog/' +

            post.slug +

            '" class="read-more">Read more →</a>';

        el.innerHTML =

            '<h3><a href="/blog/' +

            post.slug +

            '">' +

            post.title +

            "</a></h3>" +

            '<p class="post-meta">' +

            post.date +

            " • " +

            post.time +

            " • " +

            post.author +

            " • " +

            post.category +

            "</p>" +

            preview;

        var links = el.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function (e) {

                e.preventDefault();

                goToPost(post.slug);

            });

        });

        blogContainer.appendChild(el);

    });

    updatePaginationUI();

}

function renderSinglePostView(slug) {

    var blogContainer = document.getElementById("blogPosts");

    var blogHeader = document.querySelector(".blog-header");

    var pagination = document.querySelector(".pagination");

    if (!blogContainer) return;

    if (blogHeader) blogHeader.classList.add("hidden");

    if (pagination) pagination.classList.add("hidden");

    var post = posts.find(function (p) {

        return p.slug === slug;

    });

    if (!post) {

        blogContainer.innerHTML =

            '<a href="/blog" class="blog-back-button">‹ All Posts</a>' +

            "<div>Post not found</div>";

        return;

    }

    blogContainer.innerHTML =

        '<a href="/blog" class="blog-back-button">‹ All Posts</a>' +

        "<h3>" +

        post.title +

        "</h3>" +

        '<p class="post-meta">' +

        post.date +

        " • " +

        post.time +

        " • " +

        post.author +

        " • " +

        post.category +

        "</p>" +

        (post.image

            ? '<img src="' +

              post.image +

              '" style="max-width:100%; border-radius:8px;">'

            : "") +

        '<div class="post-content">' +

        post.content +

        "</div>" +

        (post.video

            ? '<iframe src="' +

              post.video +

              '" frameborder="0" allowfullscreen style="width:100%; height:315px;"></iframe>'

            : "") +

        '<div class="post-content">' +

        (post.content2 || "") +

        "</div>" +

        '<div id="disqus_thread"></div>';

    document

        .querySelector(".blog-back-button")

        .addEventListener("click", function (e) {

            e.preventDefault();

            window.history.pushState({}, "", "/blog");

            renderListView();

        });

    loadDisqus(post.slug, post.title);

}

function loadDisqus(slug, title) {

    var container = document.getElementById("disqus_thread");

    if (!container) return;

    container.innerHTML = "";

    window.disqus_config = function () {

        this.page.url = disqusBaseUrl + "/blog/" + slug;

        this.page.identifier = slug;

        this.page.title = title;

    };

    var d = document;

    var s = d.createElement("script");

    s.src = "https://" + disqusShortname + ".disqus.com/embed.js";

    s.setAttribute("data-timestamp", +new Date());

    (d.head || d.body).appendChild(s);

}

function updatePaginationUI() {

    var pageInfo = document.getElementById("pageInfo");

    var prev = document.getElementById("prevPage");

    var next = document.getElementById("nextPage");

    if (!pageInfo || !prev || !next) return;

    var total = Math.ceil(filteredPosts.length / postsPerPage);

    pageInfo.textContent = "Page " + currentPage + " of " + total;

    prev.disabled = currentPage === 1;

    next.disabled = currentPage >= total;

}

function changePage(direction) {

    if (isPaginating) return;

    isPaginating = true;

    currentPage += direction;

    renderListView();

    window.scrollTo(0, 0);

    setTimeout(function () {

        isPaginating = false;

    }, 200);

}

function populateCategories() {

    var categoryFilter = document.getElementById("categoryFilter");

    if (!categoryFilter) return;

    var counts = {};

    posts.forEach(function (post) {

        counts[post.category] = (counts[post.category] || 0) + 1;

    });

    Object.keys(counts)

        .sort()

        .forEach(function (cat) {

            var option = document.createElement("option");

            option.value = cat;

            option.textContent = cat + " (" + counts[cat] + ")";

            categoryFilter.appendChild(option);

        });

}