/* StreamPlanner: guarda la app en el celular para que abra sin internet.
   Red primero (así llegan las actualizaciones) y, si no hay señal o tarda
   más de 4 s, la copia guardada. GitHub (calendario y respaldo) siempre va a la red. */
const CACHE = 'streamplanner-v1';
const ARCHIVOS = ['./', './index.html', './icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

/** Rechaza si la red tarda más de ms (la descarga sigue y actualiza la copia). */
function conTiempo(p, ms) {
  return new Promise((ok, mal) => {
    const t = setTimeout(() => mal(new Error('lento')), ms);
    p.then((r) => { clearTimeout(t); ok(r); }, (e) => { clearTimeout(t); mal(e); });
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const red = fetch(req).then((r) => {
    if (r.ok) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
    return r;
  });
  e.respondWith(conTiempo(red, 4000).catch(() =>
    caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('./index.html') : red))));
});
