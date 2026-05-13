const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

console.log("🧪 TRACER BULLET: auth.js has been successfully initialized!");

// ==========================================
// REGISTRATION PORTS (SIGNUP)
// ==========================================

// GET: Display Signup Gateway
router.get('/signup', (req, res) => {
    res.render('signup', { error: null });
});

// POST: Process New Alchemist Credentials
router.post('/signup', async (req, res) => {
    console.log("📥 [DEBUG] Incoming Registration Payload:", req.body);

    try {
        const { username, email, password } = req.body;

        // Validation Check
        if (!username || !email || !password) {
            console.log("❌ [DEBUG] Validation Failure: Missing Fields");
            return res.render('signup', { error: "Transmission failed: All fields are required." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("❌ [DEBUG] Registration Denied: Duplicate Identity");
            return res.render('signup', { error: "An alchemist with that email already holds credentials." });
        }

        // Generate Record
        const user = new User({ username, email, password });
        console.log("💾 [DEBUG] Archiving new identity into Vault...");
        await user.save();

        console.log("✅ [DEBUG] Identity Securely Saved!");
        res.redirect('/signin');

    } catch (err) {
        console.error("💥 [DEBUG] Database Rejection during Signup:", err.message);
        res.render('signup', { error: "Database Error: Secure archive initialization failed." });
    }
});

// ==========================================
// AUTHENTICATION PORTS (SIGNIN)
// ==========================================

// GET: Display Signin Entrance
router.get('/signin', (req, res) => {
    res.render('signin', { error: null });
});

// POST: Verify Passphrase & Grant Access
router.post('/signin', async (req, res) => {
    console.log("📥 [DEBUG] Signin Attempt Processing for:", req.body.email);

    try {
        const { email, password } = req.body;

        // Basic verification
        if (!email || !password) {
            return res.render('signin', { error: "Transmission failed: Please supply both email and passphrase." });
        }

        const user = await User.findOne({ email });

        // Check user existence and process bcrypt mapping safely
        if (user && await bcrypt.compare(password, user.password)) {
            // SUCCESS: Initialize persistent session tracking
            req.session.userId = user._id;
            console.log("✅ [DEBUG] Vault Unlocked! Access Granted.");
            res.redirect('/dashboard');
        } else {
            // FAILURE: Mismatched credentials caught inside the template frame
            console.log("❌ [DEBUG] Authentication Refused: Bad Credentials");
            res.render('signin', { error: "Invalid email or passphrase. Access to the laboratory is denied." });
        }
    } catch (err) {
        console.error("💥 [DEBUG] Authentication Core Crash:", err.message);
        res.render('signin', { error: "The authentication engine encountered an internal system malfunction." });
    }
});

// ==========================================
// TERMINATION PORTS (SIGNOUT)
// ==========================================
router.get('/signout', (req, res) => {
    // 1. Destroy session context on the server instance
    req.session.destroy((err) => {
        if (err) {
            console.error("💥 [DEBUG] Failed to terminate cloud session container:", err);
            return res.redirect('/dashboard');
        }

        // 2. Wipe identity authorization cookies cleanly from browser cache
        res.clearCookie('connect.sid');
        console.log("🔒 [DEBUG] Session Terminated. Laboratory Vault Locked.");

        // 3. Drop back to security gate
        res.redirect('/signin');
    });
});

module.exports = router;