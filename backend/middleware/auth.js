// /middleware/auth.js

// Middleware to ensure user is authenticated
module.exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next route
    }
    res.redirect("/auth/signin"); // If not authenticated, redirect to the sign-in page
  };
  