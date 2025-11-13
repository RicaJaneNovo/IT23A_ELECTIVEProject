const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.bottom-nav button');

function showPage(pageId, btnId) {
  pages.forEach(p => p.classList.remove('active'));
  navBtns.forEach(b => b.classList.remove('active'));

  document.getElementById(pageId).classList.add('active');
  document.getElementById(btnId).classList.add('active');
}

document.getElementById('homeBtn').onclick = () => showPage('home', 'homeBtn');
document.getElementById('libraryBtn').onclick = () => showPage('library', 'libraryBtn');
document.getElementById('scheduleBtn').onclick = () => showPage('schedule', 'scheduleBtn');
document.getElementById('restrictionsBtn').onclick = () => showPage('restrictions', 'restrictionsBtn');
document.getElementById('notificationsBtn').onclick = () => showPage('notifications', 'notificationsBtn');


const libBtns = document.querySelectorAll('.lib-btn');
const libContents = document.querySelectorAll('.lib-content');

libBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    libBtns.forEach(b => b.classList.remove('active'));
    libContents.forEach(c => c.style.display = 'none');

    btn.classList.add('active');
    const tab = document.getElementById(btn.dataset.tab);
    tab.style.display = 'block';
  });
});
