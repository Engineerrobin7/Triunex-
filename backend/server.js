require("dotenv").config();  // ✅ Ensure dotenv is loaded first
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID); // Debugging


// ✅ Import dependencies
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport"); // ✅ Ensure correct path
const authRoutes = require("./routes/authRoutes"); // ✅ Ensure correct path
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const sequelize = require("./config/sequelize"); // ✅ Ensure correct import
const User = require("./models/User"); // ✅ Ensure correct import

// ✅ Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// ✅ Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);

// ✅ Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// ✅ Serve static files (Ensure `public` folder exists)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Authentication routes
app.use("/auth", authRoutes);

// ✅ Sync database and create tables
sequelize.sync()
    .then(() => console.log("✅ Database Synced Successfully"))
    .catch((err) => console.error("❌ Database Sync Failed:", err));

// ✅ Default route (Redirect to sign-in page)
app.get("/", (req, res) => {
    res.redirect("/signin.html");
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
