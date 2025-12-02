/* ============== dashboard.js - CONSOLIDATED & ENHANCED =============== */

/* NEW: APP FLOW ELEMENTS */
const loginPage = document.getElementById('login-page');
const appContainer = document.getElementById('app-container');
const loginButton = document.querySelector('.login-btn');
const logoutButton = document.querySelector('.logout-btn');


/* THEME TOGGLE */
const toggleBtn = document.querySelector('.theme-toggle');
const body = document.body;
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = toggleBtn.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}

/* MAIN NAV (bottom nav) & PAGE SWITCHING LOGIC */
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page, .subpage');

/** PAGE SWITCHER — used everywhere */
function switchTo(targetId) {
    pages.forEach(p => p.classList.remove('active'));
    const el = document.getElementById(targetId);
    if (el) el.classList.add('active');

    // Update bottom nav active state (only main pages)
    navButtons.forEach(btn => btn.classList.remove('active'));
    const mainPageBtn = document.querySelector(`.nav-btn[data-page="${targetId}"]`);
    if (mainPageBtn) {
        mainPageBtn.classList.add('active');
    }
}

// Bottom nav clicks
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTo(btn.dataset.page);
    });
});

/* PROFILE/SETTINGS PAGE NAVIGATION */
const profileIcon = document.querySelector(".profile-icon");
if (profileIcon) {
    profileIcon.addEventListener("click", () => {
        switchTo("profile");
        navButtons.forEach(btn => btn.classList.remove("active")); 
    });
}

const settingsIcon = document.querySelector('.settings-icon');
if (settingsIcon) settingsIcon.addEventListener('click', () => switchTo('settings'));

// Back buttons
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const dest = btn.dataset.target || 'home';
        switchTo(dest);
    });
});

// Settings subpages
document.querySelectorAll('.settings-item[data-open]').forEach(item => {
    item.addEventListener('click', () => {
        switchTo(item.dataset.open);
    });
});

/* PROFILE/SETTINGS TABS */
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(c => c.classList.remove('active'));
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
    });
});

const contactBtn = document.getElementById('contactUsBtn');
if (contactBtn) contactBtn.addEventListener('click', () => switchTo('contactPage'));

/* Three-dots dropdown */
const threeDots = document.querySelector('.three-dots');
const dropdown = document.getElementById('borrowNotesDropdown');
if (threeDots && dropdown) {
    threeDots.addEventListener('click', (e) => {
        e.stopPropagation();
        const shown = dropdown.style.display === 'block';
        document.querySelectorAll('.dropdown-box').forEach(d => d.style.display = 'none');
        dropdown.style.display = shown ? 'none' : 'block';
    });
    document.addEventListener('click', (e) => {
        if (!threeDots.contains(e.target) && !dropdown.contains(e.target))
            dropdown.style.display = 'none';
    });
}

/* Muted / Blocked lists */
const mutedList = ["@annabellasuposo", "@ranichellcompendio"];
const blockedList = ["@testuser1"];

function renderLists() {
    const mutedListEl = document.getElementById('mutedList');
    const blockedListEl = document.getElementById('blockedList');
    const mutedNote = document.getElementById('mutedListNote');
    const blockedNote = document.getElementById('blockedListNote');

    if (mutedListEl && mutedNote) {
        if (mutedList.length === 0) {
            mutedListEl.innerHTML = '';
            mutedNote.style.display = 'block';
        } else {
            mutedNote.style.display = 'none';
            mutedListEl.innerHTML = mutedList.map(u =>
                `<li>${u} <button class="small-btn" data-action="unmute" data-user="${u}">Unmute</button></li>`
            ).join('');
        }
    }

    if (blockedListEl && blockedNote) {
        if (blockedList.length === 0) {
            blockedListEl.innerHTML = '';
            blockedNote.style.display = 'block';
        } else {
            blockedNote.style.display = 'none';
            blockedListEl.innerHTML = blockedList.map(u =>
                `<li>${u} <button class="small-btn" data-action="unblock" data-user="${u}">Unblock</button></li>`
            ).join('');
        }
    }
}

// Unmute/Unblock handler
document.addEventListener('click', e => {
    const btn = e.target;
    if (btn.classList.contains('small-btn') && btn.dataset.action) {
        alert(`Request to ${btn.dataset.action} ${btn.dataset.user} sent!`);
    }
});

/* Topic buttons — except C Language (we override it below) */
document.querySelectorAll('.topic-btn').forEach(btn => {
    if (btn.id !== "openCLanguage") {
        btn.addEventListener('click', () => {
            console.log(`Topic selected: ${btn.textContent.trim()}. Staying on home page.`);
        });
    }
});

/* Hero search */
const heroSearch = document.getElementById('heroSearch');
const mainSearch = document.getElementById('mainSearch');

[heroSearch, mainSearch].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') switchTo('library');
    });
});


/* ======================================================
     ***   C LANGUAGE FEATURE — FULLY MERGED   ***
   ====================================================== */

const cAuthors = [
  {
    name: "Brian Kernighan & Dennis Ritchie",
    books: [
      "The C Programming Language, 1st Edition (1978)",
      "The C Programming Language, 2nd Edition (1988)",
      "The Unix Programming Environment (1983)",
      "The Practice of Programming (1999)",
      "Software Tools (1976)",
      "The Elements of Programming Style (1974)",
      "Software Tools in Pascal (1986)",
      "The AWK Programming Language (1988)",
      "Understanding the Digital World (2017)",
      "UNIX: A History and a Memoir (2019)"
    ]
  },
  {
    name: "Herbert Schildt",
    books: [
      "C: The Complete Reference",
      "C++: The Complete Reference",
      "Java: The Complete Reference",
      "C#: The Complete Reference",
      "Python: The Complete Reference",
      "HTML & CSS: The Complete Reference",
      "JavaScript: The Complete Reference",
      "Born to Code in C",
      "Teach Yourself C++",
      "The Art of Java"
    ]
  },
  {
    name: "Stephen Prata",
    books: [
      "C Primer Plus, 5th Edition",
      "C Primer Plus, 6th Edition",
      "C++ Primer Plus, 6th Edition",
      "New C++ Primer Plus",
      "Unix Primer Plus",
      "Advanced Unix Programmers Guide",
      "Assembly Language Primer for IBM",
      "Fortran Primer Plus",
      "Objective-C Primer Plus",
      "C Primer Plus (Waite Group)"
    ]
  },
  {
    name: "Al Kelley & Ira Pohl",
    books: [
      "A Book on C (4th Edition)",
      "A Book on C (3rd Edition)",
      "C by Example",
      "C++ by Example",
      "Turbo C: Essentials",
      "OOP Using C++",
      "C++ for C Programmers",
      "Java for C/C++ Programmers",
      "SOA Modeling",
      "Thinking About C++"
    ]
  },
  {
    name: "Yashavant Kanetkar",
    books: [
      "Let Us C",
      "Let Us C++",
      "Let Us Java",
      "Data Structures Through C",
      "Understanding Pointers in C",
      "Test Your C Skills",
      "Grasping C Pointers",
      "Data Structures Through C++",
      "Working With C",
      "Unix Shell Programming"
    ]
  }
];

// OPEN C LANGUAGE PAGE
const openCLanguage = document.getElementById("openCLanguage");
if (openCLanguage) {
    openCLanguage.addEventListener("click", () => {
        switchTo("cLanguage");
        loadAuthors();
    });
}

// LOAD AUTHORS
function loadAuthors() {
    const list = document.getElementById("authorList");
    list.innerHTML = "";

    cAuthors.forEach((author, index) => {
        const div = document.createElement("div");
        div.className = "author-card";
        div.innerHTML = `<strong>${author.name}</strong>`;
        div.onclick = () => loadBooks(index);

        list.appendChild(div);
    });
}

// LOAD BOOKS OF SELECTED AUTHOR
function loadBooks(index) {
    const author = cAuthors[index];

    document.getElementById("authorNameTitle").innerText = author.name;

    let container = document.getElementById("booksContainer");
    container.innerHTML = "";

    author.books.forEach(book => {
        let li = document.createElement("li");
        li.innerText = book;
        container.appendChild(li);
    });

    switchTo("authorBooks");
}

// BACK BUTTON (already exists but we ensure hook)
const backToAuthors = document.getElementById("backToAuthors");
if (backToAuthors) {
    backToAuthors.addEventListener("click", () => switchTo("cLanguage"));
}


/* ======================================================
                INITIALIZATION
   ====================================================== */

function initializeApp() {
    renderLists();

    pages.forEach(p => p.classList.remove('active'));
    if (loginPage) loginPage.classList.add('active');
    if (appContainer) appContainer.classList.add('hidden-app');
}

if (loginButton) {
    loginButton.addEventListener('click', () => {
        if (loginPage) loginPage.classList.remove('active');
        if (appContainer) appContainer.classList.remove('hidden-app');
        switchTo('home');
    });
}

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        if (appContainer) appContainer.classList.add('hidden-app');
        if (loginPage) loginPage.classList.add('active');
        navButtons.forEach(btn => btn.classList.remove('active'));
        alert("You have been logged out successfully.");
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);
