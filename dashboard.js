const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    navButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const targetPageId = button.dataset.page;
    const targetPage = document.getElementById(targetPageId);

    if (!targetPage) {
      console.warn(`⚠️ No page found with ID: ${targetPageId}`);
      return;
    }

    pages.forEach(page => page.classList.remove("active"));
    targetPage.classList.add("active");
  });
});
