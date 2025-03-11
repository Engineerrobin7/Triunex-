const API_URL = "http://localhost:5000/auth"; // ✅ Backend API URL

// ✅ Sign-Up Function
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("❌ Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Signup failed");

        alert("🎉 Registration Successful!");
        window.location.href = "signin.html"; // Redirect to sign-in page
    } catch (error) {
        console.error("❌ Server Error:", error);
        alert("❌ " + error.message);
    }
});

// ✅ Sign-In Function
document.getElementById("signin-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    if (!email || !password) {
        alert("❌ Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Login failed");

        localStorage.setItem("token", data.token);
        alert("🎉 Login Successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
        console.error("❌ Server Error:", error);
        alert("❌ " + error.message);
    }
});

// ✅ Google Sign-In Function
function handleGoogleAuth(response) {
    const jwtToken = response.credential;

    if (jwtToken) {
        localStorage.setItem("token", jwtToken);
        alert("🎉 Google Sign-In Successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("❌ Google Sign-In Failed. Please try again.");
    }
}

// ✅ Password Toggle Function
function togglePassword(inputId) {
    const passwordField = document.getElementById(inputId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

// ✅ Logout Function
document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("✅ Logged out successfully!");
    window.location.href = "signin.html";
});
