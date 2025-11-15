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

/* 🌸 PROFILE PAGE TAB SWITCHING */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    tabContents.forEach(content => content.classList.remove("active"));
    document.getElementById(tab).classList.add("active");
  });
});

/* 🌸 OPEN PROFILE WHEN ICON CLICKED */
const profileIcon = document.querySelector(".profile-icon");

profileIcon.addEventListener("click", () => {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById("profile").classList.add("active");

  navButtons.forEach(btn => btn.classList.remove("active"));
});

/* 🌸 BACK BUTTON IN PROFILE */
const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById("home").classList.add("active");
});
