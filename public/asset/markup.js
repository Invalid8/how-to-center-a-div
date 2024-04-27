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
        class="cardy bg-white dark:bg-gray-900 rounded-lg shadow-md p-3 flex flex-col gap-4 animate-pulse w-full min-w-[280px] sm:w-[420px] max-w-[300px]"
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

function OfflineMarkUp() {
  return `
    <div class="w-full h-svh min-h-[300px] p-4 grid place-content-center">
      <div class="flex items-center gap-4 flex-col">
        <h3>You are currently offline!</h3>
        <p>Please check your internet connection.</p>
      </div>
    </div>
  `;
}

export { OfflineMarkUp, CardMarkUp, CardSkeleton };
