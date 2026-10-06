/* Prompt Engineer — mobile service worker (offline support) */
const CACHE = 'pe-mobile-v1.5.0';
const ASSETS = [
  './',
  './index.html',
  './mobile.css',
  './app.js',
  './data.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  '../prompt engineer icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.all(ASSETS.map(a => c.add(a).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* app shell: cache first, refresh in background */
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req, { ignoreSearch: false }).then(hit => {
        const net = fetch(req).then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  /* fonts/CDN: cache first, fall back to network */
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).catch(() => null))
  );
});
