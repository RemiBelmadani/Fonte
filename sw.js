// Fonte — service worker
// Stratégie : on sert TOUJOURS la version en cache (instantané, marche sans réseau),
// et en parallèle on télécharge la nouvelle version si le réseau est là.
// => Une mise à jour publiée sur GitHub apparaît au lancement suivant.
const CACHE = 'fonte-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const key = req.mode === 'navigate' ? './index.html' : req;

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(key, { ignoreSearch: true });
    const network = fetch(req)
      .then((res) => {
        if (res && res.ok && !res.redirected) cache.put(key, res.clone());
        return res;
      })
      .catch(() => null);

    if (cached) {
      e.waitUntil(network);
      return cached;
    }
    return (await network) || new Response('Hors ligne', { status: 503 });
  })());
});
