document.addEventListener("DOMContentLoaded", () => {
    
    // DOM Elements
    const loginForm = document.getElementById("login-form");
    const loginScreen = document.getElementById("login-screen");
    const dashboardScreen = document.getElementById("dashboard-screen");
    const errorMsg = document.getElementById("error-msg");
    const userDisplayName = document.getElementById("user-display-name");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const logoutBtn = document.getElementById("logout-btn");

    // --- Authentication Logic ---
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const user = usernameInput.value.trim();
        const pass = passwordInput.value.trim();

        // Hardcoded Credentials Check
        if (user === "Nitin" && pass === "Bundela") {
            // SUCCESS
            login(user);
        } else {
            // ERROR
            showError();
        }
    });

    function login(name) {
        // Hide error if visible
        errorMsg.classList.add("hidden");

        // Update User Name in Dashboard
        userDisplayName.textContent = name + "!";

        // Animation: Fade out login, Fade in dashboard
        loginScreen.style.opacity = "0";
        
        setTimeout(() => {
            loginScreen.classList.remove("active-screen");
            loginScreen.classList.add("hidden-screen");

            dashboardScreen.classList.remove("hidden-screen");
            dashboardScreen.classList.add("active-screen");
            
            // Simple entry animation for dashboard
            dashboardScreen.style.opacity = "0";
            setTimeout(() => dashboardScreen.style.opacity = "1", 50);
        }, 300);
    }

    function showError() {
        errorMsg.classList.remove("hidden");
        // Shake animation effect
        const container = document.querySelector(".glass-container");
        container.style.transform = "translateX(5px)";
        setTimeout(() => container.style.transform = "translateX(-5px)", 50);
        setTimeout(() => container.style.transform = "translateX(5px)", 100);
        setTimeout(() => container.style.transform = "translateX(0)", 150);
    }

    // --- Logout Logic ---
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Reset inputs
        usernameInput.value = "";
        passwordInput.value = "";

        // Switch screens back
        dashboardScreen.style.opacity = "0";
        
        setTimeout(() => {
            dashboardScreen.classList.add("hidden-screen");
            dashboardScreen.classList.remove("active-screen");

            loginScreen.classList.remove("hidden-screen");
            loginScreen.classList.add("active-screen");
            loginScreen.style.opacity = "1";
        }, 300);
    });

    // --- Navigation Logic (Visual Only) ---
    const navItems = document.querySelectorAll(".nav-item:not(#logout-btn)");
    
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove("active"));
            
            // Add to clicked
            // Note: If clicking the icon inside the link, we need to target the parent <a>
            const target = e.target.closest(".nav-item");
            target.classList.add("active");
        });
    });
});
