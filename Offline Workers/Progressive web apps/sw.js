// constants
const CACHE_NAME = 'v1';
const CACHE_URLS = [
    '/Offline Workers/Service worker/index.html',
    '/Offline Workers/Service worker/download.jpeg',
    '/Offline Workers/Service worker/script.js',
    '/Offline Workers/Service worker/style.css',
]

self.addEventListener('install', (event) => {
    // install the cache
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CACHE_URLS);
        })
    )
})

self.addEventListener('activate', (event) => {
    // delete old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    )
})

self.addEventListener('fetch', (event) => {
    // when a file is requested
    // 1. fetch from network, update my cache
    // 2. cache as a fallback
    // 3. return the file from cache

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // update the cache
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());
                })
                return response;
            }).catch(() => {
                // return the file from cache
                return caches.match(event.request);
            })
    )
})