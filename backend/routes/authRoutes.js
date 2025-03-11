const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

const router = express.Router();

// Google OAuth Login Route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin.html' }),
  (req, res) => {
    // Generate JWT Token for the authenticated user
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Set token in cookie and redirect to dashboard
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard.html');
  }
);

// Logout Route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('token');
    res.redirect('/signin.html');
  });
});

module.exports = router;
