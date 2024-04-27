import { CardMarkUp, CardSkeleton } from "./markup.js";

export function preloadSites() {
  const websitesList = document.getElementById("websitesList");
  websitesList.innerHTML = "";
  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((e) => {
    const card = CardSkeleton();
    websitesList.innerHTML += card;
  });
}

export function getSites() {
  preloadSites();

  const pageQuery = getQueryParam("page") || 1;
  const limitQuery = getQueryParam("limit") || 6;

  const page = parseInt(pageQuery);
  const limit = parseInt(limitQuery);

  fetch(`/api/search?page=${page}&limit=${limit}`)
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

      doPagination({ page });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export function themeButton() {
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
}

export const doPagination = ({ page, total = 10 }) => {
  const updateURL = (page) => {
    const websitesList = document.getElementById("websitesList");
    const pagination = document.getElementById("pagination");
    if (pagination) {
      pagination.remove();
    }
    const newURL = `${window.location.pathname}?page=${page}`;
    window.history.pushState({ path: newURL }, "", newURL);

    // Scroll the page to the top of websitesList
    const websitesListTop =
      websitesList.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: websitesListTop, behavior: "smooth" });

    getSites(page);
  };

  const paginationDiv = document.createElement("div");
  paginationDiv.id = "pagination";
  paginationDiv.classList.add(
    "flex",
    "gap-6",
    "sm:gap-8",
    "justify-center",
    "items-center",
    "w-full",
    "flex-wrap"
  );

  if (page > 1) {
    const previousButton = document.createElement("button");
    previousButton.textContent = "Previous Page";
    previousButton.classList.add(
      "p-2",
      "px-3",
      "bg-gray-300",
      "dark:bg-gray-600",
      "border-1",
      "rounded"
    );
    previousButton.onclick = () => {
      updateURL(page - 1);
    };
    paginationDiv.appendChild(previousButton);
  }

  const pageNumberSpan = document.createElement("span");
  pageNumberSpan.textContent = `Page ${page} of ${total}`;
  paginationDiv.appendChild(pageNumberSpan);

  if (page < total) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next Page";
    nextButton.classList.add(
      "p-2",
      "px-3",
      "bg-gray-300",
      "dark:bg-gray-600",
      "border-1",
      "rounded"
    );
    nextButton.onclick = () => {
      updateURL(page + 1);
    };
    paginationDiv.appendChild(nextButton);
  }

  document.body
    .querySelector("#root #weblist-container")
    .appendChild(paginationDiv);
};
