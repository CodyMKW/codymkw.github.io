const CACHE_NAME = "version-1"
const urlsToCache = [ 
  '/',
  '/index.html',
  '/404.html',
  '/assets/css/emoji.css',
  '/assets/css/style.css',
  '/assets/javascript/script.js',
  '/assets/images/facebook.png',
  '/assets/images/instagram.png',
  '/assets/images/mario_oops.png',
  '/assets/images/mastodon.png',
  '/assets/images/switchqr.jpg',
  '/assets/images/threads.png',
  '/assets/images/twitter.png',
  '/assets/images/youtube.png',
  '/assets/images/splatfest/Team_Aliens.png',
  '/assets/images/splatfest/Team_BigMan.png',
  '/assets/images/splatfest/Team_Love.png',
  '/assets/images/splatfest/Team_MintChip.png',
  '/assets/images/splatfest/Team_Power.png',
  '/assets/images/splatfest/Team_Sweet.png',
  '/assets/images/splatfest/Team_Water.png',
  '/assets/images/splatfest/Team_WhiteChocolate.png',
  '/assets/images/emojis/coolDoge.png',
  '/assets/images/emojis/guraWave.png',
  '/assets/images/emojis/ninSwitch.png',
  '/assets/images/emojis/peepoNerd.png',
  '/assets/images/emojis/penguinHype.png',
  '/assets/images/emojis/superMushroom.png',
  '/assets/images/emojis/umaruCola.png',
  '/assets/images/backgrounds/bg.gif',
  '/assets/images/backgrounds/bg2.gif',
  '/assets/images/backgrounds/bg3.gif',
  '/assets/images/backgrounds/bg4.gif',
  '/assets/images/backgrounds/bg5.gif',
  '/assets/images/backgrounds/bg6.gif',
  '/assets/images/backgrounds/bg7.gif',
  '/assets/images/backgrounds/bg8.gif',
  '/assets/images/backgrounds/bg9.gif',
  '/assets/images/backgrounds/bg10.gif',
]

const self = this

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache')

                return cache.addAll(urlsToCache)
            })
    )
})
// Activate Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))

    )
})

self.addEventListener('fetch', event => { 
  if (event.request.method != 'GET') return;
  event.respondWith(async function() {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);
    // If no cached version, fall back to server fetch
    return cached ? cached : fetch(event.request);
  })
});
