var cacheName = 'codymkw-pwa';
var filesToCache = [
    './',
    './index.html',
    './css/style.css',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Use cached file and update cache if possible */
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				const fetchPromise = fetch(event.request)
				.then(networkResponse => {
					if (event.request.url.indexOf('http') === 0)
						cache.put(event.request, networkResponse.clone());
					return networkResponse;
				}).catch(err => undefined)
				return response || fetchPromise;
			})
		})
	);
});
