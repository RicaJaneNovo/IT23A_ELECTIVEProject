document.addEventListener("DOMContentLoaded", () => {
 
    
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      alert("You've been successfully have an account, my dear user 💖");
      window.location.href = "index.html";
    });
  }

 
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (!username || !password) {
        alert("Please fill in both fields!");
      } else {
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html";
      }
    });
  }

  
  const googleBtn = document.getElementById("googleBtn");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      alert("Signed in successfully using Google 🌟");
      window.location.href = "dashboard.html";
    });
  }

  
  const returnBtns = document.querySelectorAll(".return-btn");
  returnBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.textContent = "Returned ✅";
      btn.disabled = true;
    });
  });


  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      alert("You have been logged out!");
      window.location.href = "index.html";
    });
  }
});
