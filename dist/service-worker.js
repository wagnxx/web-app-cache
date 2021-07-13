var CACHE_VERSION = 6;
var CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION,
  assets: 'assets-cache-v' + CACHE_VERSION
};

this.addEventListener('install', function (event) {
  console.log('install');
  event.waitUntil(self.skipWaiting());
  // event.waitUntil(
  //   caches.open(CURRENT_CACHES.assets).then((cache) => {
  //     return cache.addAll([
  //       '/',
  //       '/index.html',
  //       '/css/style.css',
  //       '/images/',
  //       '/images/scene.jpg'
  //     ]);
  //   })
  // );
});

/**
 *  event.request.url
    event.request.method
    event.request.headers
    event.request.body
 */
this.addEventListener('fetch', function (event) {
  event.respondWith(
    // caches.match(event.request).then(function (response) {
    //   return response || fetch(event.request);
    // })
    caches
      .match(event.request)
      .then((resp) => {
        return (
          resp ||
          fetch(event.request).then((response) => {
            console.log('fetch', event.request);
            if (event.request.url.indexOf('chrome-extension://') > -1) {
              return response;
            }
            return caches.open(CURRENT_CACHES.assets).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      })
      .catch(() => {
        // fallback
        return caches.match('/images/scene.jpg');
      })
  );
});

this.addEventListener('activate', function (event) {
  var cacheWhitelist = [CURRENT_CACHES.assets];
  console.log('activate !!!!!!!!!!!!!!');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(function (keyList) {
        return Promise.all(
          keyList.map(function (key) {
            if (cacheWhitelist.indexOf(key) === -1) {
              return caches.delete(key);
            }
          })
        );
      })
    ])
  );
});




window.addEventListener('beforeinstallprompt', function (e) {
  // beforeinstallprompt event fired
  e.userChoice.then(function (choiceResult) {
      if (choiceResult.outcome === 'dismissed') {
          console.log('用户取消安装应用');
      }
      else {
          console.log('用户安装了应用');
      }
  });
});