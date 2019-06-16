/**
 * Service Worker
 */

const _version = 'v5.1';
const cacheName = 'v4';
const cacheList = [
  '/',
  '/manifest.json',
  '/scripts/app.js',
  '/styles/index.css',
  '/index.html',
  '/menu01.html',
  '/menu02.html',
  '/menu03.html',
  '/menu04.html',
  '/menu05.html',
  '/vendor/jquery/jquery.min.js',
  '/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/vendor/bootstrap/css/bootstrap.min.css',
  '/css/simple-sidebar.css'  
];

const log = msg => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}

// Life cycle: INSTALL
self.addEventListener('install', event => {
  self.skipWaiting();
  log('INSTALL');
  caches.open(cacheName).then(cache => {
    log('Caching app shell');
    return cache.addAll(cacheList);
  })
});

// Life cycle: ACTIVATE
self.addEventListener('activate', event => {
  log('Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          log('Removing old cache ' + key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Functional: FETCH
self.addEventListener('fetch', event => {
  log('Fetch ' + event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
