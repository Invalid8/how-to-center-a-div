document.addEventListener("DOMContentLoaded", () => {
  getSites();
});

const websitesList = document.getElementById("websitesList");
[1, 2, 3, 4, 5].map((e) => {
  const card = CardSkeleton();
  websitesList.innerHTML += card;
});

const apiKey = "";

// Your Custom Search Engine ID
const cx = "";

// Query
const query = "";

// URL for the Google Custom Search API
const url = ``;

function CardMarkUp({ image, description, title, link }) {
  return `
      <div class="img-box w-full h-full min-h-[150px] max-h-[150px] overflow-hidden website-img">
      ${
        image
          ? `<img
            src="${image}"
            alt="${image}"
            class="cover object-cover w-full h-full"
          />`
          : `<div class="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-[4px] grid place-content-center"><p>No Image</p></div>`
      }
      </div>
      <div class="info flex flex-col gap-4">
        <h5 class="title"><a href="${link}" target="_blank" class="block text-blue-500 hover:underline font-semibold" >${title}</a></h5>
        <p class="description text-gray-700 dark:text-white">
          ${description}
        </p>
      </div>
  `;
}

function CardSkeleton() {
  return `
    <div
      class="cardy bg-white dark:bg-gray-900 rounded-lg shadow-md p-3 flex flex-col gap-4 animate-pulse w-full min-w-[280px] sm:w-[450px] max-w-[300px]"
    >
      <div
        class="img-box w-full h-full min-h-[150px] max-h-[150px] overflow-hidden"
      >
        <div class="bg-gray-200 dark:bg-gray-600 w-full h-full"></div>
      </div>
      <div class="info flex flex-col gap-4">
        <div class="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div class="bg-gray-200 dark:bg-gray-600 rounded w-full h-10"></div>
      </div>
    </div>`;
}

function getSites() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const results = data.items;
      const websitesList = document.getElementById("websitesList");

      if (results && results.length > 0) {
        websitesList.innerHTML = "";
      }
      results.forEach((result) => {
        const title = result.title;
        const link = result.link;
        const snippet = result.snippet;
        const image = result.pagemap ? result.pagemap.cse_thumbnail : null;

        const card = document.createElement("div");
        card.className =
          "cardy bg-white dark:bg-gray-900 rounded-lg shadow-md p-3 flex flex-col gap-4 w-full min-w-[280px] sm:w-[450px] max-w-[300px]";

        card.innerHTML = CardMarkUp({
          image: image && image[0].src,
          description: snippet,
          title,
          link,
        });

        websitesList.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
}

// Get search results

var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // Toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // If set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // If NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});
