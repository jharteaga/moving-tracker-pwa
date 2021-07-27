const cacheName = 'v1.2';
const assetsToCache = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/js/main.js',
  '/js/index.js',
  '/js/is-online.js',
  '/pages/not-network.html',
  '/favicon.ico',
  '/img/moving-tracker-logo.svg',
  '/img/moving-tracker-icon.svg',
  '/img/drop-glow.svg',
];

self.addEventListener('install', (event) => {
  // console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    // waitUntil tells the browser to wait for this to finish
    caches
      .open(cacheName) //caches is a global object representing CacheStorage
      .then((cache) => {
        // open the cache with the name cacheName*
        return cache.addAll(assetsToCache); // pass the array of URLs to cache**
      })
  );
});

self.addEventListener('activate', (event) => {
  // console.log('[Service Worker] Activating Service Worker ....', event);
});

self.addEventListener('fetch', (event) => {
  // console.log(`Fetching ${event.request.url}`);
  event.respondWith(
    (async () => {
      const response = await caches.match(event.request);
      return response || fetch(event.request);
    })()
  );
});
