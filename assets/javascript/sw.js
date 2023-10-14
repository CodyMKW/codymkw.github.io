const cacheName = "cache1"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				"/",
				"android-chrome-192x192.png", // Favicon, Android Chrome M39+ with 4.0 screen density
				"android-chrome-256x256.png", // Favicon, Android Chrome M47+ Splash screen with 1.5 screen density
				"apple-touch-icon.png", // Favicon, Apple default
				"browserconfig.xml", // IE11 icon configuration file
				"favicon.ico", // Favicon, IE and fallback for other browsers
				"favicon-16x16.png", // Favicon, default
				"favicon-32x32.png", // Favicon, Safari on Mac OS
				"index.html", // Main HTML file
				"/assets/javascript/main.js", // Main Javascript file
				"/assets/javascript/manifest.json", // Manifest file
				"mstile-150x150.png", // Favicon, Windows 8 / IE11
				"safari-pinned-tab.svg", // Favicon, Safari pinned tab
				"/assets/css/style.css", // Main CSS file
                "/assets/css/emoji.css", // Emoji CSS file
                "/assets/images/facebook.png", // Site image
                "/assets/images/instagram.png", // Site image
                "/assets/images/mario_oops.png", // Site image
                "/assets/images/mastodon.png", // Site image
                "/assets/images/switchqr.png", // Site image
                "/assets/images/threads.png", // Site image
                "/assets/images/twitter.png", // Site image
                "/assets/images/youtube.png", // Site image
                "/assets/images/backgrounds/bg.gif", // Site BG image
                "/assets/images/backgrounds/bg2.gif", // Site BG image
                "/assets/images/backgrounds/bg3.gif", // Site BG image
                "/assets/images/backgrounds/bg4.gif", // Site BG image
                "/assets/images/backgrounds/bg5.gif", // Site BG image
                "/assets/images/backgrounds/bg6.gif", // Site BG image
                "/assets/images/backgrounds/bg7.gif", // Site BG image
                "/assets/images/backgrounds/bg8.gif", // Site BG image
                "/assets/images/backgrounds/bg9.gif", // Site BG image
                "/assets/images/backgrounds/bg10.gif", // Site BG image
                "/assets/images/emojis/coolDoge.png", // Site Emoji image
                "/assets/images/emojis/guraWave.png", // Site Emoji image
                "/assets/images/emojis/MHUR.png", // Site Emoji image
                "/assets/images/emojis/ninSwitch.png", // Site Emoji image
                "/assets/images/emojis/peepoNerd.png", // Site Emoji image
                "/assets/images/emojis/penguinHype.png", // Site Emoji image
                "/assets/images/emojis/superMushroom.png", // Site Emoji image
                "/assets/images/emojis/umaruCola.png", // Site Emoji image
                "/assets/images/splatfest/Team_Aliens.png", // Site Splatfest frame image
                "/assets/images/splatfest/Team_BigMan.png", // Site Splatfest frame image
                "/assets/images/splatfest/Team_Love.png", // Site Splatfest frame image
                "/assets/images/splatfest/Team_MintChip.png", // Site Splatfest frame image
                "/assets/images/splatfest/Team_Power.png", // Site Splatfest frame image
                "/assets/images/splatfest/Team_Sweet.png", // Site Splatfest frame image
                "/assets/images/splatfest/Team_Water.png", // Site Splatfest frame image
                "/assets/images/splatfest/Team_WhiteChocolate.png", // Site Splatfest frame image
			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});