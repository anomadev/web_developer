const CACHE_NAME = 'STORIES_CACHE-V1';

self.addEventListener('install', function() {
  // Guardar archivos iniciales
  caches.open(CACHE_NAME).then(function(cache) {
    cache.addAll(['/index.html', '/dist/javascript/bundle.js']);
  });
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cachesNames) {
      let promises = cachesNames.map(cacheName => {
        if (CACHE_NAME !== cacheName) caches.delete(cacheName);
      });

      return Promise.all(promises);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return searchInCacheOrMakeRequest(event.request);
    }).catch(function(err) {
      if(event.request.mode == 'navigate')
        return caches.match(event.request);
    })
  );
});

function searchInCacheOrMakeRequest(request) {
  const cachePromise = caches.open(CACHE_NAME);
  const matchPromise = cachePromise.then(function(cache) {
    return cache.match(request);
  });

  return Promise.all([cachePromise, matchPromise]).then(function([cache, cacheResponse]) {
    const fetchPromise = fetch(request).then(function(fetchResponse) {
      cache.put(request, fetchResponse.clone());
      return fetchResponse;
    });

    return cacheResponse || fetchPromise;
  });
}