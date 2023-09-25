const CACHE_NAME = 'v1';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  '404.html',
  'assets/css/emoji.css',
  'assets/css/style.css',
  'assets/javascript/script.js',
  'assets/images/facebook.png',
  'assets/images/instagram.png',
  'assets/images/mario_oops.png',
  'assets/images/mastodon.png',
  'assets/images/switchqr.png',
  'assets/images/threads.png',
  'assets/images/twitter.png',
  'assets/images/youtube.png',
  'assets/images/splatfest/Team_Aliens.png',
  'assets/images/splatfest/Team_BigMan.png',
  'assets/images/splatfest/Team_Love.png',
  'assets/images/splatfest/Team_MintChip.png',
  'assets/images/splatfest/Team_Power.png',
  'assets/images/splatfest/Team_Sweet.png',
  'assets/images/splatfest/Team_Water.png',
  'assets/images/splatfest/Team_WhiteChocolate.png',
  'assets/images/emojis/coolDoge.png',
  'assets/images/emojis/guraWave.png',
  'assets/images/emojis/ninSwitch.png',
  'assets/images/emojis/peepoNerd.png',
  'assets/images/emojis/penguinHype.png',
  'assets/images/emojis/superMushroom.png',
  'assets/images/emojis/umaruCola.png',
  'assets/images/backgrounds/bg.gif',
  'assets/images/backgrounds/bg2.gif',
  'assets/images/backgrounds/bg3.gif',
  'assets/images/backgrounds/bg4.gif',
  'assets/images/backgrounds/bg5.gif',
  'assets/images/backgrounds/bg6.gif',
  'assets/images/backgrounds/bg7.gif',
  'assets/images/backgrounds/bg8.gif',
  'assets/images/backgrounds/bg9.gif',
  'assets/images/backgrounds/bg10.gif',
];

self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Caching files during install');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching...');
  
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('Service Worker: Found in cache:', event.request.url);
        return response;
      }

      console.log('Service Worker: Fetching resource from the network:', event.request.url);
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          console.log('Service Worker: Caching new resource:', event.request.url);
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
