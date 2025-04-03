const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");

const router = express.Router();

// ✅ User Registration with OTP Verification
router.post("/signup", async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);

        user = await User.create({ name, email, mobile, password: hashedPassword, otp, otpExpires: Date.now() + 600000 });

        await sendEmail(email, "Email Verification OTP", `Your OTP is: ${otp}`);
        await sendSMS(mobile, `Your OTP is: ${otp}`);

        res.status(201).json({ message: "User registered. Check email and SMS for OTP." });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// ✅ Verify OTP (After Signup)
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ where: { email, otp, otpExpires: { [Op.gt]: Date.now() } } });

        if (!user) return res.status(400).json({ message: "Invalid OTP" });

        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ message: "Email & Mobile verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
