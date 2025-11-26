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

/**
 * Hides all pages/subpages and shows the one with the targetId.
 * @param {string} targetId The ID of the page/subpage to show.
 */
function switchTo(targetId) {
    pages.forEach(p => p.classList.remove('active'));
    const el = document.getElementById(targetId);
    if (el) el.classList.add('active');

    // Update bottom nav active state (only for main pages)
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
        // Ensure no bottom nav button is active when on profile/settings
        navButtons.forEach(btn => btn.classList.remove("active")); 
    });
}

const settingsIcon = document.querySelector('.settings-icon');
if (settingsIcon) settingsIcon.addEventListener('click', () => switchTo('settings'));

// Back buttons (handles navigation back to previous main page/subpage)
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const dest = btn.dataset.target || 'home';
        switchTo(dest);
    });
});

// Settings item clicks (opens subpages)
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

/* Settings: Contact Us button */
const contactBtn = document.getElementById('contactUsBtn');
if (contactBtn) contactBtn.addEventListener('click', () => {
    switchTo('contactPage');
});

/* Three-dots dropdown (borrow notes) */
const threeDots = document.querySelector('.three-dots');
const dropdown = document.getElementById('borrowNotesDropdown');
if (threeDots && dropdown) {
    threeDots.addEventListener('click', (e) => {
        e.stopPropagation();
        const shown = dropdown.style.display === 'block';
        document.querySelectorAll('.dropdown-box').forEach(d => d.style.display = 'none');
        dropdown.style.display = shown ? 'none' : 'block';
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!threeDots.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

/* Muted / Blocked lists rendering (Added sample data and buttons) */
const mutedList = ["@annabellasuposo", "@ranichellcompendio"]; // sample data
const blockedList = ["@testuser1"]; // sample data

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
            // Output list items with Unmute button
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
            // Output list items with Unblock button
            blockedListEl.innerHTML = blockedList.map(u => 
                `<li>${u} <button class="small-btn" data-action="unblock" data-user="${u}">Unblock</button></li>`
            ).join('');
        }
    }
}

// Generic handler for Unmute/Unblock buttons
document.addEventListener('click', e => {
    const btn = e.target;
    if (btn.classList.contains('small-btn') && btn.dataset.action) {
        const action = btn.dataset.action; 
        const user = btn.dataset.user;      
        
        console.log(`Action: ${action} on user: ${user}`);
        alert(`Request to ${action} ${user} sent!`);
    }
});


/* Topic buttons (NO NAVIGATION) */
document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(`Topic selected: ${btn.textContent.trim()}. Keeping user on Home page.`);
    });
});

/* Hero search triggers main search */
const heroSearch = document.getElementById('heroSearch');
const mainSearch = document.getElementById('mainSearch');

// Grouped listeners for search inputs
[heroSearch, mainSearch].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            // Assume search should lead to library to view results
            switchTo('library');
        }
    });
});


// 🌟 NEW: INITIALIZATION AND LOGIN/LOGOUT LOGIC 🌟

function initializeApp() {
    renderLists();

    // 1. Set initial state to login screen
    pages.forEach(p => p.classList.remove('active'));
    if (loginPage) {
        loginPage.classList.add('active');
    }
    
    // 2. Hide the main app container
    if (appContainer) {
        appContainer.classList.add('hidden-app');
    }
}

// --- Login Functionality ---
if (loginButton) {
    loginButton.addEventListener('click', () => {
        // Hide login, show dashboard
        if (loginPage) loginPage.classList.remove('active');
        if (appContainer) appContainer.classList.remove('hidden-app');
        
        // Navigate to the home page and set active nav button
        switchTo('home'); 
    });
}

// --- Log Out Functionality ---
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Hide dashboard, show login
        if (appContainer) appContainer.classList.add('hidden-app');
        if (loginPage) loginPage.classList.add('active');
        
        // Remove active state from dashboard navigation
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        alert("You have been logged out successfully."); 
    });
}

// Call the new initializer on load
document.addEventListener('DOMContentLoaded', initializeApp);