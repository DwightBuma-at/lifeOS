const LIFEOS_SW_VERSION = "2026-08-11-4";
const LIFEOS_CACHE = `lifeos-app-${LIFEOS_SW_VERSION}`;
const LIFEOS_LOCAL_ASSETS = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./to-do-list.html",
  "./expense.html",
  "./sibs.html",
  "./workout.html",
  "./auth.js",
  "./sidebar.js",
  "./download-app.js",
  "./lifeos.webmanifest",
  "./manifest.webmanifest",
  "./lifeos_icon.png",
  "./lifi_welcome.png",
  "./LIFI.png",
  "./app%20icon.png",
  "./.nojekyll"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(LIFEOS_CACHE)
      .then((cache) => cache.addAll(LIFEOS_LOCAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("lifeos-") && key !== LIFEOS_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function cacheResponse(request, response) {
  if (!response || response.status >= 400) return response;
  const cache = await caches.open(LIFEOS_CACHE);
  await cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  try {
    return await cacheResponse(request, await fetch(request, { cache: "reload" }));
  } catch {
    return (await caches.match(request, { ignoreSearch: true })) ||
      (await caches.match("./index.html", { ignoreSearch: true }));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  try {
    return await cacheResponse(request, await fetch(request));
  } catch {
    return cached;
  }
}

async function staleWhileRevalidate(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  const refresh = fetch(request).then((response) => cacheResponse(request, response)).catch(() => null);
  return cached || refresh;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isSameOrigin) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
