/* ==================== dashboard.js - FULL FIXED VERSION ==================== */

/* ------------------ APP FLOW ELEMENTS ------------------ */
const loginPage = document.getElementById('login-page');
const appContainer = document.getElementById('app-container');
const loginButton = document.querySelector('.login-btn');
const logoutButton = document.querySelector('.logout-btn');

/* ------------------ THEME TOGGLE ------------------ */
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

/* ------------------ MAIN NAV ------------------ */
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page, .subpage');

/* ------------------ PAGE SWITCHER ------------------ */
function switchTo(targetId) {
    pages.forEach(p => p.classList.remove('active'));
    const el = document.getElementById(targetId);
    if (el) el.classList.add('active');

    // update bottom nav
    navButtons.forEach(btn => btn.classList.remove('active'));
    const mainPageBtn = document.querySelector(`.nav-btn[data-page="${targetId}"]`);
    if (mainPageBtn) mainPageBtn.classList.add('active');
}

// Bottom nav clicks
navButtons.forEach(btn => btn.addEventListener('click', () => switchTo(btn.dataset.page)));

/* ------------------ PROFILE / SETTINGS NAV ------------------ */
const profileIcon = document.querySelector(".profile-icon");
if (profileIcon) profileIcon.addEventListener("click", () => {
    switchTo("profile");
    navButtons.forEach(btn => btn.classList.remove("active"));
});

const settingsIcon = document.querySelector('.settings-icon');
if (settingsIcon) settingsIcon.addEventListener('click', () => switchTo('settings'));

// Back buttons
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const dest = btn.dataset.target || btn.dataset.back || 'home';
        switchTo(dest);
    });
});

// Settings → subpages
document.querySelectorAll('.settings-item[data-open]').forEach(item => {
    item.addEventListener('click', () => switchTo(item.dataset.open));
});

/* ------------------ PROFILE / SETTINGS TABS ------------------ */
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

// Contact page
const contactBtn = document.getElementById('contactUsBtn');
if (contactBtn) contactBtn.addEventListener('click', () => switchTo('contactPage'));

/* ------------------ THREE-DOTS DROPDOWN ------------------ */
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

/* ------------------ MUTED / BLOCKED LISTS ------------------ */
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

/* ------------------ HERO & MAIN SEARCH ------------------ */
const heroSearch = document.getElementById('heroSearch');
const mainSearch = document.getElementById('mainSearch');

[heroSearch, mainSearch].forEach(inp => {
    if (inp) {
        inp.addEventListener('keydown', e => {
            if (e.key === 'Enter') switchTo('library');
        });
    }
});

/* ================== BOOK LINKS ================== */
const bookLinks = {
    /* C Language Books */
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

    /* Java Books */
   "Java WebSocket Programming": " https://www.mheducation.com/highered/mhp/product/java-websocket-programming.html",
   "Java EE 7: The Big Picture":  "https://www.barnesandnoble.com/w/java-ee-7-danny-coward/1117931160",
   "Java: A Beginner's Guide, Tenth Edition": "https://www.barnesandnoble.com/w/java-herbert-schildt/1143617850",
   "Java: The Complete Reference, Thirteenth Edition": "https://www.barnesandnoble.com/w/java-danny-coward/1143531013",
   "The Java® Language Specification": "https://www.cs.cornell.edu/andru/javaspec/",
   "The Java® Language Specification": "https://docs.oracle.com/javase/specs//jls/se6/jls3.pdf",
   "The Java® Language Specification, Java SE 7 Edition": "https://www.vitalsource.com/products/the-java-language-specification-java-se-7-edition-james-gosling-v9780133260328",
   "The Real‑Time Specification for Java": "https://www.allbookstores.com/The-Real-Time-Specification-Java/9780201703238",
   "The Java™ Language Specification (First Edition, 1996)": "https://titanium.cs.berkeley.edu/doc/java-langspec-1.0.pdf",
   "The Java Language Specification, Second Edition": "https://titanium.cs.berkeley.edu/doc/java-langspec-2.0.pdf",
   "The Java Language Specification, Third Edition (2005)": "https://docs.oracle.com/javase/specs/jls/se6/jls3.pdf",
   "Effective Java (3rd Edition)": "https://www.pearsonecademy.com/store/p//P200000000138",
   "Effective Java (3rd Edition)": "https://www.barnesandnoble.com/w/effective-java-joshua-bloch/1128557432",
   "Effective Java (2nd Edition)": "https://www.barnesandnoble.com/w/effective-java-joshua-bloch/1100507678",
   "Effective Java (3rd Edition, Web Edition)": "https://www.informit.com/store/effective-javaweb-9780134998060",
   "Java Puzzlers: Traps, Pitfalls, and Corner Cases": "https://www.amazon.com/Java%C2%BF-Puzzlers-Traps-Pitfalls-Corner/dp/032133678X",
 

    /* Python Books */
    "Learning Python, 5th Edition": "https://www.amazon.com/Learning-Python-Mark-Lutz/dp/1449355730",
    "Programming Python, 4th Edition": "https://www.amazon.com/Programming-Python-Mark-Lutz/dp/0596158106",
    "Python Pocket Reference, 5th Edition": "https://www.amazon.com/Python-Pocket-Reference-Mark-Lutz/dp/1449357016",
    "Automate the Boring Stuff with Python": "https://automatetheboringstuff.com/",
    "Making Games with Python & Pygame": "https://inventwithpython.com/pygame/",
    "Invent Your Own Computer Games with Python": "https://inventwithpython.com/",
    "Python Crash Course, 2nd Edition": "https://nostarch.com/pythoncrashcourse2e",
    "Learning Python (6th Edition, 2025)": "https://www.ingramacademic.com/9781098171308/learning-python/",
    "Programming Python (4th Edition, 2011)": "https://learning-python.com/about-pp4e",
    "Python Pocket Reference (5th Edition, 2014)": "https://learning-python.com/index-book-links.html",
    "Learning Python (4th Edition, 2009)": "https://www.oreilly.com/library/view/learning-python-4th/9780596805395/",
    "Python Pocket Reference (3rd Edition, 2005)": "https://www.vitalsource.com/products/python-pocket-reference-lutz-mark-v9780596009403",
    "Fluent Python: Clear, Concise, and Effective Programming (1st Edition)": "https://www.oreilly.com/library/view/fluent-python/9781491946237/",
    "Fluent Python (English Edition – Paperback, 2015)": "https://www.oreilly.com/library/view/fluent-python/9781491946237/",
    "Fluent Python (EPUB Edition, 2015)": "https://www.oreilly.com/library/view/fluent-python/9781491946237/",
    "Fluent Python: Second Edition (2021 Release)": "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/",
    "Fluent Python: Second Edition (Paperback, 2022 Updated Edition)":  "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/",
    "French Edition: Programmer avec Python (Fluent Python Translation)": "https://www.oreilly.com/library/view/programmer-avec-python/9781492056348/",
    "Portuguese Edition: Python Fluente (2015)": "https://www.oreilly.com/library/view/fluent-python/9781491946237/",
    "Spanish / International Editions (2015–2016)": "https://www.oreilly.com/library/view/fluent-python/9781491946237/",
    "Polish Edition (2016–2017)": "https://www.oreilly.com/library/view/fluent-python/9781491946237/",
    "Portuguese Free Translation Volume 1 (2nd Edition Adaptation, 2025)":"(Not officially published yet → no stable public link available.)",
    "Learn Python the Hard Way (5th Edition)": "https://www.pearson.com/en-us/subject-catalog/p/program/P2programid/9780138270575",
    "Learn Python the Hard Way": "https://learnpythonthehardway.org/book/download.html",
    "Learn Python 3 the Hard Way: A Very Simple Introduction…": "https://www.barnesandnoble.com/w/learn-python-3-the-hard-way-zed-shaw/",
    "Learn More Python 3 the Hard Way": "https://www.barnesandnoble.com/w/learn-more-python-3-the-hard-way-zed-a-shaw/1129071528",
    "Learn Python the Hard Way (5th Edition, or latest update)": "https://www.pearson.com/en-us/subject-catalog/p/P2programid/9780138270575",
    "Learn Python the Hard Way (official/download page)": "https://learnpythonthehardway.org/book/download.html",
    "Learn More Python 3 the Hard Way": "https://www.kobo.com/ph/en/ebook/learn-more-python-3-the-hard-way-2",

    /* C++ Books */
    "The C++ Programming Language, 4th Edition": "https://www.amazon.com/C-Programming-Language-4th/dp/0321563840",
    "Programming: Principles and Practice Using C++": "https://www.amazon.com/Programming-Principles-Practice-Using-C/dp/0321992784",
    "C++ Primer, 5th Edition": "https://www.amazon.com/Primer-5th-Stanley-Lippman/dp/0321714113",
    "Essential C++": "https://www.amazon.com/Essential-C-3rd-Stanley-Lippman/dp/0321375870",
    "The C++ Programming Language (4th Edition)":  "https://www.amazon.com/C-Programming-Language-4th/dp/0321563840",
    "The C++ Programming Language (4th Edition)": "https://www.barnesandnoble.com/w/the-c-programming-language-bjarne-stroustrup/1117355501",
    "Programming: Principles and Practice Using C++ (2nd Edition)": "https://www.amazon.com/Programming-Principles-Practice-Using-2nd/dp/0321992784",
    "Programming: Principles and Practice Using C++ (3rd Edition, 2024)": "https://www.stroustrup.com/programming.html",
    "The C++ Programming Language (4th Edition) — InformIT / Publisher Page": "https://www.informit.com/store/c-plus-plus-programming-language-9780321563842",
    "The Design and Evolution of C++ (1994)": "https://www.informit.com/store/design-and-evolution-of-c-plus-plus-9780201543308",
    "Programming: Principles and Practice Using C++ (2nd Edition)": "https://www.pearson.com/en-us/subject-catalog/p/program/P2programid/9780321992789",
    "Effective STL: 50 Specific Ways to Improve Your Use of the Standard Template Library": "https://www.amazon.com/Effective-STL-Specific-Standard-Template/dp/0201749629",
    "Effective C++: 55 Specific Ways to Improve Your Programs and Designs": "https://www.amazon.com/Effective-Specific-Improve-Programs-Designs/dp/0321334876",
    "Effective Modern C++: 42 Specific Ways to Improve Your Use of C++11 and C++14": "https://www.oreilly.com/library/view/effective-modern-c/9781491908419/",
    "More Effective C++: 35 New Ways to Improve Your Programs and Designs": "https://www.amazon.com/s?k=More+Effective+C%2B%2B+Scott+Meyers",
    "Effective STL (eBook Edition)": "https://www.amazon.com/Effective-STL-Addison-Wesley-Professional-Computing-ebook/dp/B004V4432W",
    "Effective Modern C++” (Amazon listing alternative)": "https://www.amazon.com/Effective-Modern-Specific-Ways-Improve/dp/1491903996",
    "The C++ Standard Library — A Tutorial and Reference": "https://www.josuttis.com/libbook/libbook.html",
    "C++ Templates: The Complete Guide (2nd Edition)": "https://www.josuttis.com/tmplbook/tmplbook.html",
    "C++17 - The Complete Guide": "https://leanpub.com/cpp17",
    "C++20 - The Complete Guide": "https://www.josuttis.com/cppstd20/cppstd20.html",
    "Object‑Oriented Programming in C++": "https://www.josuttis.com/cppbook/cppbook.html",
    "Modern C++ Design": "https://www.informit.com/store/modern-c-plus-plus-design-generic-programming-and-design-9780201704310",
    "Modern C++ Design (Paperback listing)": "https://www.libristo.ro/ro/carte/modern-c-design_04036802",
    "Modern C++ Design (eBook via library / e‑lending)": "https://www.overdrive.com/media/1200269/",
    "C++: The Complete Reference (4th Edition)": "https://www.barnesandnoble.com/w/c-herbert-schildt/1117354654",
    "C++: The Complete Reference (5th Edition)": "https://www.allbookstores.com/The-Complete-Reference-5th-Edition/9780071634809",
    "C/C++ Programmer's Reference": "https://www.barnesandnoble.com/w/c-c-programmers-reference-herbert-schildt/1113895009",
};

/* ================== C LANGUAGE ================== */
const cAuthors = [
    { name: "Brian Kernighan & Dennis Ritchie", books: [
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
    ]},
    { name: "Herbert Schildt", books: [
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
    ]},
    { name: "Stephen Prata", books: [
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
    ]},
    { name: "Al Kelley & Ira Pohl", books: [
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
    ]},
    { name: "Yashavant Kanetkar", books: [
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
    ]}
];

// OPEN C LANGUAGE PAGE
const openCLanguage = document.getElementById("openCLanguage");
if (openCLanguage) openCLanguage.addEventListener("click", () => {
    switchTo("cLanguage");
    loadAuthors();
});

// LOAD AUTHORS
function loadAuthors() {
    const list = document.getElementById("authorList");
    if (!list) return;
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
    if (!container) return;
    container.innerHTML = "";
    author.books.forEach(book => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = bookLinks[book] || "#";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = book;
        li.appendChild(a);
        container.appendChild(li);
    });
  switchTo("authorBooks");
}


const backToAuthors = document.getElementById("backToAuthors");
if (backToAuthors) backToAuthors.addEventListener("click", () => switchTo("cLanguage"));

/* ================== JAVA LANGUAGE ================== */
const javaAuthors = [
    { name: "Dr. Danny Coward", books: [
    "Java WebSocket Programming", 
    "Java EE 7: The Big Picture",
    "Java: A Beginner's Guide",
    "Java: The Complete Reference, Thirteenth Edition",
    "The Java Language Specification",
    "The Java Language Specification 2",
    "The Java Language Specification, Java SE 7",
    "The Real-Time Specification for Java"
   ]},

   { name: "James Gosling", books: [
    "The Java Language Specification (First Edition, 1996)",
    "The Java Language Specification (Second Edition)",
    "The Java Language Specifications, (Third Edition, 2005)"
   ]},

   {name: "Joshua J. Bloch", books: [
    "Effective Java (3rd Edition0",
    "Effective Java(3rd Edition)",
    "Effective Java (2nd Edition)",
    "Effective Java (3rd Edition, Web Edition",
    "Java Puzzlers: Traps, Pitfalls, and Corner Cases"
   ]},

   {name: "Patrick Naughton", books:[
    "The Java Handbook",
    "Java 2: The Complete Reference, Third Edition, (1999)",
    "Java 2: The Complete Reference, Third Edition",
    "Java 2: The Complete Reference, Third Edition-Used Books"
   ]},
   {name: "Dr. Edward H. Frank", books: [
    "The Java Language Specification(First Edition, 1996)",
    "The Java Language Specification(HTML version, 1996)",
    "The Java Language Specification(Second Edition, 2000)",
    "Data Structures and Abstractions with Java- 5th Edition",
    "Data Structures and Abstractions with Java"
   ]}
];

const openJavaLanguage = document.getElementById("openJavaLanguage");
if (openJavaLanguage) openJavaLanguage.addEventListener("click", () => {
    switchTo("javaLanguage");
    loadJavaAuthors();
});

function loadJavaAuthors() {
    const list = document.getElementById("javaAuthorList");
    if (!list) return;
    list.innerHTML = "";
    javaAuthors.forEach((author, index) => {
        const div = document.createElement("div");
        div.className = "author-card";
        div.innerHTML = `<strong>${author.name}</strong>`;
        div.onclick = () => loadJavaBooks(index);
        list.appendChild(div);
    });
}

function loadJavaBooks(index) {
    const author = javaAuthors[index];
    document.getElementById("javaAuthorTitle").innerText = author.name;
    const container = document.getElementById("javaBooksContainer");
    if (!container) return;
    container.innerHTML = "";
    author.books.forEach(book => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = bookLinks[book] || "#";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = book;
        li.appendChild(a);
        container.appendChild(li);
    });
    switchTo("javaBooksPage");
}

const backToJavaAuthors = document.getElementById("backToJavaAuthors");
if (backToJavaAuthors) backToJavaAuthors.addEventListener("click", () => switchTo("javaLanguage"));

/* ================== PYTHON LANGUAGE ================== */
const pythonAuthors = [
   {name: "Eric Matthes", books:[
    "Python Crash Course, 1rst Edition 2015",
    "Python Crash Course, 2nd Edition",
    "Python Crash Course, 3rd Edition",
    "Python Flash Cards: Syntax, Concepts, and Examples",
    "The Road To Alaska",
   ]},

   {name: "AI Sweigart", books:[
     "Automate The Boring Stuff with Python, 3rd Edition",
     "Automate The Boring Stuff with Python Workbook",
     "Beyond The Basic Stuff with Python",
     "The Big Book of Small Python Projects",
     "Invent your own Computer Games with Python(4th Edition)",
     "Cracking Codes with Python",
     "Coding with Minecraft",
   ]},
    {name: "Luciano Ramalho", books:[
     "Fluent Python: Clear, Concise, and Effective Programming(1st Edition)",
     "Fluent Python(English Edition-Paperback, 2015)",
     "Fluent Python (EPUB Edition, 2015)",
     "Fluent Python: Second Edition (2021 Release)",
     "Fluent Python: Second Edition (Paperback, 2022 Updated Edition)",
     "French Edition: Programmer avec Python (Fluent Python Translation)",
     "Portuguese Edition: Python Fluente (2015)",
     "Spanish / International Editions (2015–2016)",
     "Polish Edition (2016–2017)",
     "Portuguese Free Translation Volume 1 (2nd Edition Adaptation, 2025)",

    ]},
    { name: "Mark Lutz", books: [
        "Learning Python (4th Edition, 2009)",
        "Learning Python (5th Edition, 2014)",
        "Learning Python (6th Edition, 2025)",
        "Programming Python (3rd Edition, 2006)",
        "Programming Python (4th, 2011)",
        "Python Pocket Reference (3rd Edition, 2005)",
    ]},
    {name: "Zed A. Shaw", books:[
        "Learn Python the Hard Way (5th Edition)",
        "Learn Python the Hard Way",
        "Learn Python 3 the Hard Way A Very Simple Introduction… —",
        "Learn More Python 3 the Hard Way",
        "Learn Python the Hard Way (5th Edition, or latest update)",
        "Learn Python the Hard Way (official/download page)",
        "Learn More Python 3 the Hard Way",
    ]}
];

const openPythonLanguage = document.getElementById("openPythonLanguage");
if (openPythonLanguage) openPythonLanguage.addEventListener("click", () => {
    switchTo("pythonLanguage");
    loadPythonAuthors();
});

function loadPythonAuthors() {
    const list = document.getElementById("pythonAuthorList");
    if (!list) return;
    list.innerHTML = "";
    pythonAuthors.forEach((author, index) => {
        const div = document.createElement("div");
        div.className = "author-card";
        div.innerHTML = `<strong>${author.name}</strong>`;
        div.onclick = () => loadPythonBooks(index);
        list.appendChild(div);
    });
}

function loadPythonBooks(index) {
    const author = pythonAuthors[index];
    document.getElementById("pythonAuthorTitle").innerText = author.name;
    const container = document.getElementById("pythonBooksContainer");
    if (!container) return;
    container.innerHTML = "";
    author.books.forEach(book => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = bookLinks[book] || "#";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = book;
        li.appendChild(a);
        container.appendChild(li);
    });
    switchTo("pythonBooksPage");
}

const backToPythonAuthors = document.getElementById("backToPythonAuthors");
if (backToPythonAuthors) backToPythonAuthors.addEventListener("click", () => switchTo("pythonLanguage"));

/* ================== C++ LANGUAGE ================== */
const cppAuthors = [
    { name: "Bjarne Stroustrup", books: [
    "The C++ Programming Language, 4th Edition",
     "Programming: Principles and Practice Using C++",
    "Programming: Principles and Practice Using C++ (2nd Edition)",
    "Programming: Principles and Practice Using C++ (3rd Edition, 2024)",
    "The C++ Programming Language (4th Edition)",
    "The Design and Evolution of C++ (1994)",
    "Programming: Principles and Practice Using C++ (2nd Edition)",
   ]},

  {name: "Scott Douglas Meyers", books: [
     "Effective STL: 50 Specific Ways to Improve Your Use of the Standard Template Library",
    "Effective C++: 55 Specific Ways to Improve Your Programs and Designs",
     "Effective Modern C++:",
    "Effective Modern C++:",
    "Effective STL (eBook Edition)",
   "Scott Meyers — Author Page (collection of many of his C++ books)",
   "Effective Modern C++” (Amazon listing alternative)",
   ]},

   {name: "Nicolai M. Josuttis", books:[
    "The C++ Standard Library",
    "C++ Templates",
    "C++17 - The Complete Guide",
    "C++20 - The Complete Guide",
    "Object‑Oriented Programming in C++",
   ]},

    { name: "Tudor Andrei", books: [
    "Modern C++ Design",
    "Modern C++ Design (Paperback listing)",
    "Modern C++ Design (eBook via library / e‑lending)",
]},
    { name: "Herbert Schildt", books: [
    "C++: The Complete Reference(4th Edition)",
    "C++: The Complete Reference (5th Edition)",
    "C/C++ Programmer's Reference",
  ]},
  {name: "Barbara E. Moo", books: [
    "C++ Primer, Fifth Edition (with Stanley B. Lippman and Josée Lajoie)",
    "Accelerated C++: Practical Programming by Example (with Andrew Koenig)",
    "Ruminations on C++: A Decade of Programming Insight and Experience (with Andrew Koenig)",
  ]}
];

const openCppLanguage = document.getElementById("openCppLanguage");
if (openCppLanguage) openCppLanguage.addEventListener("click", () => {
    switchTo("cppLanguage");
    loadCppAuthors();
});

function loadCppAuthors() {
    const list = document.getElementById("cppAuthorList");
    if (!list) return;
    list.innerHTML = "";
    cppAuthors.forEach((author, index) => {
        const div = document.createElement("div");
        div.className = "author-card";
        div.innerHTML = `<strong>${author.name}</strong>`;
        div.onclick = () => loadCppBooks(index);
        list.appendChild(div);
    });
}

function loadCppBooks(index) {
    const author = cppAuthors[index];
    document.getElementById("cppAuthorTitle").innerText = author.name;
    const container = document.getElementById("cppBooksContainer");
    if (!container) return;
    container.innerHTML = "";
    author.books.forEach(book => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = bookLinks[book] || "#";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = book;
        li.appendChild(a);
        container.appendChild(li);
    });
    switchTo("cppBooksPage");
}

const backToCppAuthors = document.getElementById("backToCppAuthors");
if (backToCppAuthors) backToCppAuthors.addEventListener("click", () => switchTo("cppLanguage"));

/* ===========================================================
   🔎 UNIVERSAL BOOK SEARCH ENGINE (JAVA, C, PYTHON, C++)
   =========================================================== */

/* 1. Combine ALL books from ALL languages */
function getAllBooks() {
    let all = [];

    // C language
    cAuthors.forEach(author => {
        author.books.forEach(book => {
            all.push({
                title: book,
                author: author.name,
                link: bookLinks[book] || "#",
                language: "C"
            });
        });
    });

    // Java
    javaAuthors.forEach(author => {
        author.books.forEach(book => {
            all.push({
                title: book,
                author: author.name,
                link: bookLinks[book] || "#",
                language: "Java"
            });
        });
    });

    // Python
    if (typeof pythonAuthors !== "undefined") {
        pythonAuthors.forEach(author => {
            author.books.forEach(book => {
                all.push({
                    title: book,
                    author: author.name,
                    link: bookLinks[book] || "#",
                    language: "Python"
                });
            });
        });
    }

    // C++ 
    if (typeof cppAuthors !== "undefined") {
        cppAuthors.forEach(author => {
            author.books.forEach(book => {
                all.push({
                    title: book,
                    author: author.name,
                    link: bookLinks[book] || "#",
                    language: "C++"
                });
            });
        });
    }

    return all;
}

/* 2. Perform Search */
function searchBooks(keyword) {
    const allBooks = getAllBooks();
    keyword = keyword.toLowerCase();

    return allBooks.filter(book =>
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword) ||
        book.language.toLowerCase().includes(keyword)
    );
}

/* 3. Display Search Results */
function showSearchResults(results) {
    switchTo("library"); // Auto-open library page

    const resultsBox = document.getElementById("searchResults");
    if (!resultsBox) return;

    resultsBox.innerHTML = "";

    if (results.length === 0) {
        resultsBox.innerHTML = "<p>No books found.</p>";
        return;
    }

    results.forEach(book => {
        const div = document.createElement("div");
        div.className = "search-card";

        div.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Language:</strong> ${book.language}</p>
            <a href="${book.link}" target="_blank" class="open-btn">Open Book</a>
        `;

        resultsBox.appendChild(div);
    });
}

/* 4. SEARCH BUTTON + ENTER KEY HANDLER */
const searchBtn = document.getElementById("mainSearchBtn");
const searchInput = document.getElementById("mainSearch");

// Search button click
if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        const keyword = searchInput.value.trim();
        if (keyword !== "") {
            const results = searchBooks(keyword);
            showSearchResults(results);
        }
    });
}

// Press ENTER to search
if (searchInput) {
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            const keyword = searchInput.value.trim();
            if (keyword !== "") {
                const results = searchBooks(keyword);
                showSearchResults(results);
            }
        }
    });
}


/* ------------------ INITIALIZATION ------------------ */
function initializeApp() {
    renderLists();
    pages.forEach(p => p.classList.remove('active'));
    if (loginPage) loginPage.classList.add('active');
    if (appContainer) appContainer.classList.add('hidden-app');
}

if (loginButton) loginButton.addEventListener('click', () => {
    if (loginPage) loginPage.classList.remove('active');
    if (appContainer) appContainer.classList.remove('hidden-app');
    switchTo('home');
});

if (logoutButton) logoutButton.addEventListener('click', () => {
    if (appContainer) appContainer.classList.add('hidden-app');
    if (loginPage) loginPage.classList.add('active');
    navButtons.forEach(btn => btn.classList.remove('active'));
    alert("You have been logged out successfully.");
});

document.addEventListener('DOMContentLoaded', initializeApp);
