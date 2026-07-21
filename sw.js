const LIFEOS_SW_VERSION = "2026-07-21-2";
const LIFEOS_CACHE = `lifeos-runtime-${LIFEOS_SW_VERSION}`;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys
        .filter((key) => key.startsWith("lifeos-") && key !== LIFEOS_CACHE)
        .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const shouldRefresh =
    request.mode === "navigate" ||
    (isSameOrigin && /\.(html|js|css|webmanifest)$/i.test(url.pathname));

  if (!shouldRefresh) {
    return;
  }

  event.respondWith(
    fetch(request, { cache: "reload" }).then((response) => {
      const copy = response.clone();
      caches.open(LIFEOS_CACHE).then((cache) => cache.put(request, copy));
      return response;
    }).catch(() => caches.match(request))
  );
});
