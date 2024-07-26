const cacheName = "v1";

const cacheFiles = [
  "/",
  "/index.html",
  "/avatar.png",
  "output.css",
  "/style.css",
  "/asset/image/48.png",
  "/asset/image/72.png",
  "/asset/image/96.png",
  "/asset/image/144.png",
  "/asset/image/192.png",
  "/asset/image/512.png",
  "/asset/image/center-div.jpeg",
  "/script.js",
  "/asset/functions.js",
  "/asset/markup.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  const installButton = document.getElementById("installButton");
  if (installButton) {
    installButton.style.display = "block";
    installButton.addEventListener("click", () => {
      event.prompt();
      installButton.style.display = "none";
    });
  }
});

self.addEventListener("appinstalled", (event) => {
  console.log("App installed successfully");
  const installButton = document.getElementById("installButton");
  if (installButton) {
    installButton.style.display = "none";
  }
});
