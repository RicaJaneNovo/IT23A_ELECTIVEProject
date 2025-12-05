/* ============== dashboard.js - FIXED & CLEANED VERSION =============== */

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
        if (icon) {
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        }
    });
}

/* MAIN NAV (bottom nav) */
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page, .subpage');

/* PAGE SWITCHER */
function switchTo(targetId) {
    pages.forEach(p => p.classList.remove('active'));

    const el = document.getElementById(targetId);
    if (el) el.classList.add('active');

    // update bottom nav (only main pages)
    navButtons.forEach(btn => btn.classList.remove('active'));

    const mainPageBtn = document.querySelector(`.nav-btn[data-page="${targetId}"]`);
    if (mainPageBtn) mainPageBtn.classList.add('active');
}

// Bottom nav clicks
navButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTo(btn.dataset.page));
});

/* PROFILE / SETTINGS NAVIGATION */
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

// Settings → subpages
document.querySelectorAll('.settings-item[data-open]').forEach(item => {
    item.addEventListener('click', () => switchTo(item.dataset.open));
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
        if (!threeDots.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
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
    if (btn.classList.contains('small-btn')) {
        alert(`Request to ${btn.dataset.action} ${btn.dataset.user} sent!`);
    }
});

/* Topic buttons — (except C Language) */
document.querySelectorAll('.topic-btn').forEach(btn => {
    if (btn.id !== "openCLanguage") {
        btn.addEventListener('click', () => {
            console.log(`Topic selected: ${btn.textContent.trim()}.`);
        });
    }
});

/* Hero search */
const heroSearch = document.getElementById('heroSearch');
const mainSearch = document.getElementById('mainSearch');

[heroSearch, mainSearch].forEach(inp => {
    if (inp) {
        inp.addEventListener('keydown', e => {
            if (e.key === 'Enter') switchTo('library');
        });
    }
});

/* ======================================================
                C LANGUAGE BOOK LINKS
   ====================================================== */
const bookLinks = {

     "The C Programming Language, 1st Edition (1978)": "https://archive.org/details/cprogramminglang00ritc",
    "The C Programming Language, 2nd Edition (1988)": "https://www.amazon.com/C-Programming-Language-2nd/dp/0131103628",
    "The Unix Programming Environment (1983)": "https://archive.org/details/unixprogramminge00kern",
    "The Practice of Programming (1999)": "https://www.amazon.com/Practice-Programming-Addison-Wesley-Professional-Computing/dp/020161586X",
    "Software Tools (1976)": "https://archive.org/details/softwaretools00kern",
    "The Elements of Programming Style (1974)": "https://archive.org/details/elementsofprogra0000kern",
    "Software Tools in Pascal (1986)": "https://archive.org/details/softwaretoolsinp00kern",
    "The AWK Programming Language (1988)": "https://awk.dev/",
    "Understanding the Digital World (2017)": "https://press.princeton.edu/books/hardcover/9780691177135/understanding-the-digital-world",
    "UNIX: A History and a Memoir (2019)": "https://www.amazon.com/UNIX-History-Memoir-Brian-Kernighan/dp/1695978552",

    "C: The Complete Reference": "https://www.amazon.com/C-Complete-Reference-Herbert-Schildt/dp/0072121246",
    "C++: The Complete Reference": "https://www.amazon.com/C-Complete-Reference-Herbert-Schildt/dp/0072226803",
    "Java: The Complete Reference": "https://www.amazon.com/Java-Complete-Reference-Herbert-Schildt/dp/1260440230",
    "C#: The Complete Reference": "https://www.amazon.com/Complete-Reference-Herbert-Schildt/dp/0071588415",
    "Python: The Complete Reference": "https://www.amazon.com/Python-Complete-Reference-Martin-Brown/dp/1260440214",
    "HTML & CSS: The Complete Reference": "https://www.amazon.com/HTML-CSS-Complete-Reference-Fifth/dp/0071496297",
    "JavaScript: The Complete Reference": "https://www.amazon.com/JavaScript-Complete-Reference-Third-Developers/dp/0071741300",
    "Born to Code in C": "https://www.goodreads.com/book/show/3513474-born-to-code-in-c",
    "Teach Yourself C++": "https://www.amazon.com/Sams-Teach-Yourself-Hours-Programming/dp/0672333317",
    "The Art of Java": "https://www.goodreads.com/book/show/1260803.The_Art_of_Java",

    "C Primer Plus, 5th Edition": "https://www.amazon.com/C-Primer-Plus-5th-Developers/dp/0672326965",
    "C Primer Plus, 6th Edition": "https://www.amazon.com/C-Primer-Plus-6th-Developers/dp/0321928423",
    "C++ Primer Plus, 6th Edition": "https://www.amazon.com/C-Primer-Plus-6th-Developers/dp/0321776402",
    "New C++ Primer Plus": "https://www.goodreads.com/book/show/3508464-c-primer-plus",
    "Unix Primer Plus": "https://archive.org/details/unixprimerplus0000prat",
    "Advanced Unix Programmers Guide": "https://archive.org/details/advancedunixprog00peek",
    "Assembly Language Primer for IBM": "https://openlibrary.org/books/OL24589724M/Assembly_Language_Primer_for_the_IBM_Personal_Computer",
    "Fortran Primer Plus": "https://openlibrary.org/books/OL23276478M/Fortran_Primer_Plus",
    "Objective-C Primer Plus": "https://openlibrary.org/books/OL23276243M/Objective-C_Primer_Plus",
    "C Primer Plus (Waite Group)": "https://archive.org/details/cprimerplus0000prat",

    "A Book on C (4th Edition)": "https://www.amazon.com/Book-C-Programming-Programming-Languages/dp/0201183994",
    "A Book on C (3rd Edition)": "https://archive.org/details/bookoncintroto00kell",
    "C by Example": "https://archive.org/details/cbyexample0000unks",
    "C++ by Example": "https://www.goodreads.com/book/show/692242.C_By_Example",
    "Turbo C: Essentials": "https://openlibrary.org/books/OL14243284M/Turbo_C",
    "OOP Using C++": "https://www.goodreads.com/book/show/386851.OOP_Using_C",
    "C++ for C Programmers": "https://www.amazon.com/C-Programmers-Third-13-07-1991-Kelley/dp/B01FIX8QVA",
    "Java for C/C++ Programmers": "https://www.goodreads.com/book/show/2497834.Java_for_C_C_Programmers",
    "SOA Modeling": "https://www.amazon.com/SOA-Modeling-Service-Oriented-Analysis-Design/dp/0138156751",
    "Thinking About C++": "https://www.goodreads.com/book/show/6184163-thinking-about-c",

    "Let Us C": "https://www.amazon.com/Let-Us-C-Yashavant-Kanetkar/dp/8183331637",
    "Let Us C++": "https://www.amazon.com/Let-Us-C-Yashavant-Kanetkar/dp/8183331637",
    "Let Us Java": "https://www.bpbonline.com/products/let-us-java",
    "Data Structures Through C": "https://www.amazon.com/Data-Structures-Through-Yashavant-Kanetkar/dp/8183331157",
    "Understanding Pointers in C": "https://www.amazon.com/Understanding-Pointers-Yashavant-Kanetkar/dp/8183331467",
    "Test Your C Skills": "https://www.amazon.com/Test-Your-C-Skills-Kanetkar/dp/8183331491",
    "Grasping C Pointers": "https://bpbonline.com/products/grasping-c-pointers",
    "Data Structures Through C++": "https://www.amazon.com/Data-Structures-Through-Yashavant-Kanetkar/dp/8183333176",
    "Working With C": "https://www.goodreads.com/book/show/3566526-working-with-c",
    "Unix Shell Programming": "https://www.amazon.com/Unix-Shell-Programming-Yashavant-Kanetkar/dp/8183333788"
   
};

/* ======================================================
                C LANGUAGE FEATURE  
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

// LOAD BOOKS
function loadBooks(index) {
    const author = cAuthors[index];
 document.getElementById("authorNameTitle").innerText = author.name;

    let container = document.getElementById("booksContainer");
    container.innerHTML = "";

    author.books.forEach(book => {
        let li = document.createElement("li");
        let a = document.createElement("a");

        a.href = bookLinks[book] || "#";
        a.target = "_blank";
        a.textContent = book;

        li.appendChild(a);
        container.appendChild(li);
    });

    switchTo("authorBooks");
}

// BACK BUTTON
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
