// Perform install steps
var CACHE_NAME = 'pwinter-v1';
var urlsToCache = [
    'styles/pwinter.css',
    'styles/pwinter_dark.css',
    'styles/pwinter_light.css',
    'scripts/pwinter-save.js',
    'scripts/pwinter-share.js',
    'scripts/pwinter.js',
    'index.html',
    'images/csv-file.png',
    'images/short-new-logo.png',
    'images/short-rand-logo.png'
];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pwinter-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});