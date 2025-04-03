document.addEventListener("DOMContentLoaded", function () {
    // 📝 Select Form Elements
    const signupForm = document.getElementById("signup-form");
    const signinForm = document.getElementById("signin-form");
    const resetPasswordButton = document.getElementById("resetPassword");
    const otpForm = document.getElementById("otp-form");
    const mobileVerificationForm = document.getElementById("mobileVerificationForm");

    // 🔐 Password Visibility Toggle
    function togglePassword(inputId) {
        const passwordInput = document.getElementById(inputId);
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    }
    window.togglePassword = togglePassword; // Make it globally accessible

    // 🟢 Handle Sign Up Form Submission
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:5000/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("✅ Sign Up Successful! Please verify your email.");
                    window.location.href = "email-confirmation.html"; // Redirect to email verification page
                } else {
                    alert(`❌ Error: ${data.message}`);
                }
            } catch (error) {
                alert("❌ Server Error. Please try again.");
            }
        });
    }

    // 🔵 Handle Sign In Form Submission
    if (signinForm) {
        signinForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("http://localhost:5000/auth/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    alert("✅ Login Successful!");
                    window.location.href = "dashboard.html";
                } else {
                    alert(`❌ Error: ${data.message}`);
                }
            } catch (error) {
                alert("❌ Server Error. Please try again.");
            }
        });
    }

    // 🔄 Handle Password Reset
    if (resetPasswordButton) {
        resetPasswordButton.addEventListener("click", async () => {
            const email = document.getElementById("email").value;

            try {
                const response = await fetch("http://localhost:5000/auth/reset-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("✅ Password reset link sent to your email!");
                } else {
                    alert(`❌ Error: ${data.message}`);
                }
            } catch (error) {
                alert("❌ Server Error. Please try again.");
            }
        });
    }

    // 🔢 Handle OTP Verification
    if (otpForm) {
        otpForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const otp = Array.from(document.querySelectorAll(".otp-input")).map(input => input.value).join("");

            try {
                const response = await fetch("http://localhost:5000/auth/verify-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ otp }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("✅ OTP Verified Successfully!");
                    window.location.href = "dashboard.html";
                } else {
                    alert(`❌ Error: ${data.message}`);
                }
            } catch (error) {
                alert("❌ Server Error. Please try again.");
            }
        });
    }

    // 📲 Handle Mobile Number Verification
    if (mobileVerificationForm) {
        mobileVerificationForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const mobileNumber = document.getElementById("mobileNumber").value;

            try {
                const response = await fetch("http://localhost:5000/auth/send-otp-mobile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mobileNumber }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("✅ OTP Sent to Mobile Number!");
                    window.location.href = "otp-verification.html"; // Redirect to OTP verification page
                } else {
                    alert(`❌ Error: ${data.message}`);
                }
            } catch (error) {
                alert("❌ Server Error. Please try again.");
            }
        });
    }

    // 🔵 Google Authentication
    window.handleGoogleAuth = async (response) => {
        try {
            const googleResponse = await fetch("http://localhost:5000/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential: response.credential }),
            });

            const data = await googleResponse.json();
            if (googleResponse.ok) {
                localStorage.setItem("token", data.token);
                alert("✅ Google Login Successful!");
                window.location.href = "dashboard.html";
            } else {
                alert(`❌ Error: ${data.message}`);
            }
        } catch (error) {
            alert("❌ Server Error. Please try again.");
        }
    };

    // 🚪 Logout Function
    window.logout = () => {
        localStorage.removeItem("token");
        alert("✅ Logged Out Successfully!");
        window.location.href = "signin.html";
    };
});
