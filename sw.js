// Bump this on every release. Any change to this file's bytes makes the
// browser treat it as a new service worker version — the version string
// is mostly for your own clarity when debugging, and gives us something
// to log/expose if needed later.
const SW_VERSION = 'v1.0.0';

// This SW still does no offline caching — the loader always wants a live,
// fresh redirect target, never a stale cached one. It exists purely to
// satisfy installability requirements and to power update detection.

self.addEventListener('install', (event) => {
  // Do NOT auto-skipWaiting here — we want the page to control when an
  // update takes over, so it can show an "Update available" prompt first
  // rather than silently swapping versions under the user mid-session.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

