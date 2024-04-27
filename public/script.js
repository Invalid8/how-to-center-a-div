import { getSites, preloadSites, themeButton } from "./asset/functions.js";

preloadSites();

document.addEventListener("DOMContentLoaded", () => {
  themeButton();
  getSites();
});
