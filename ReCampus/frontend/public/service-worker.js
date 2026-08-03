const CACHE_NAME = "marketplace-vortex-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/pwa-192x192.png",
  "/pwa-512x512.png"
];

// Instala o Service Worker e salva os arquivos básicos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );

  self.skipWaiting();
});

// Apaga versões antigas do cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Intercepta as requisições
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Não interfere em POST, PUT, DELETE etc.
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Não armazena arquivos de outros sites ou do backend
  if (url.origin !== self.location.origin) {
    return;
  }

  // Para páginas, tenta internet primeiro
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });

          return response;
        })
        .catch(async () => {
          return (
            (await caches.match(request)) ||
            (await caches.match("/index.html")) ||
            (await caches.match("/"))
          );
        })
    );

    return;
  }

  // Para imagens, CSS e JavaScript, tenta cache primeiro
  event.respondWith(
    caches.match(request).then(async (cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
          const responseClone = networkResponse.clone();

          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, responseClone);
        }

        return networkResponse;
      } catch (error) {
        console.error("Recurso indisponível:", request.url);
        throw error;
      }
    })
  );
});