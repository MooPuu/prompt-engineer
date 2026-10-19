/* Prompt Engineer — mobile service worker (offline support) */
const CACHE = 'pe-mobile-a3321b20';
const ASSETS = [
  './',
  './index.html',
  './mobile.css',
  './app.js',
  './i18n.js',
  './data.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './prompt-engineer-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.all(ASSETS.map(a => c.add(new Request(a, { cache: 'reload' })).catch(() => null)))
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

  /* the page shell is always fetched fresh, cache is only the offline fallback */
  if (url.origin === location.origin) {
    const isShell = req.mode === 'navigate' ||
      (req.headers.get('accept') || '').includes('text/html');
    if (isShell) {
      e.respondWith(
        fetch(req).then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => caches.match(req, { ignoreSearch: true }))
      );
      return;
    }

    /* assets: cache first (ignoring the ?v= cache-buster), revalidate in background */
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then(hit => {
        const net = fetch(new Request(req, { cache: 'no-cache' })).then(res => {
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
