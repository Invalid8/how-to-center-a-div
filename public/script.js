import { getSites, preloadSites, themeButton } from "./asset/functions.js";
import { OfflineMarkUp } from "./asset/markup.js";

if (!navigator.onLine) {
  const weblistContainer = document.getElementById("weblist-container");
  weblistContainer.innerHTML = OfflineMarkUp();
  console.log("You are offline. Please check your internet connection.");
} else {
  preloadSites();
}

document.addEventListener("DOMContentLoaded", () => {
  themeButton();
  getSites();
});

window.addEventListener("online", () => {
  loacation.reload();
});

window.addEventListener("offline", () => {
  const weblistContainer = document.getElementById("weblist-container");
  weblistContainer.innerHTML = OfflineMarkUp();
  console.log("You are offline. Please check your internet connection.");
});
