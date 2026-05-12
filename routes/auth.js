const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

console.log("🧪 TRACER BULLET: auth.js has been loaded by the server!");

// GET Signup Page
router.get('/signup', (req, res) => res.render('signup'));

// POST Signup Logic
router.post('/signup', async (req, res) => {
    console.log("📥 [DEBUG] Incoming Data:", req.body); // Check if data is arriving

    try {
        const { username, email, password } = req.body;

        // 1. Check if the destructuring worked
        if (!username || !email || !password) {
            console.log("❌ [DEBUG] Missing fields detected!");
            return res.status(400).send("Missing fields: Please check your input names.");
        }

        const user = new User({ username, email, password });

        console.log("💾 [DEBUG] Attempting save...");
        await user.save();

        console.log("✅ [DEBUG] User saved!");
        res.redirect('/signin');

    } catch (err) {
        // 2. THIS IS THE KEY: Print the actual Mongoose error
        console.error("💥 [DEBUG] Save Failed!");
        console.error(err.message);

        res.status(400).send("Database Error: " + err.message);
    }
});

// GET Signin Page
router.get('/signin', (req, res) => res.render('signin'));

// POST Signin Logic
router.post('/signup', async (req, res) => {
    // 1. THE TRACER: What is the server actually receiving?
    console.log("--- INCOMING RECRUIT DATA ---");
    console.log(req.body);

    try {
        const { username, email, password } = req.body;

        // 2. Pre-flight check
        if (!username || !email || !password) {
            return res.status(400).send("Transmission failed: Missing fields.");
        }

        const user = new User({ username, email, password });
        await user.save();
        res.redirect('/signin');

    } catch (err) {
        // 3. The actual database error
        console.error("--- DATABASE REJECTION ---");
        console.error(err.message);
        res.status(400).send("Error creating account. Check terminal.");
    }
});

// 1. GET: Shows the page (The "View")
router.get('/signin', (req, res) => {
    res.render('signin');
});

// 2. POST: Processes the login (The "Action")
// This is the "Door" the error message is looking for!
router.post('/signin', async (req, res) => {
    console.log("📥 [DEBUG] Signin Attempt for:", req.body.email);

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists AND if password matches the hash
        if (user && await bcrypt.compare(password, user.password)) {
            // SUCCESS: Create the session
            req.session.userId = user._id;
            console.log("✅ [DEBUG] Vault Unlocked!");
            res.redirect('/modules/pantry');
        } else {
            // FAILURE: Wrong credentials
            console.log("❌ [DEBUG] Invalid Credentials");
            res.status(401).send("Invalid email or password.");
        }
    } catch (err) {
        console.error("💥 [DEBUG] Signin Crash:", err.message);
        res.status(500).send("The authentication engine is offline.");
    }
});

router.get('/signout', (req, res) => {
    // 1. Destroy the session on the server
    req.session.destroy((err) => {
        if (err) {
            console.error("💥 [DEBUG] Failed to destroy session:", err);
            return res.redirect('/pantry'); // If it fails, keep them on the dashboard
        }

        // 2. Clear the cookie from the browser
        // Note: 'connect.sid' is the default cookie name for express-session
        res.clearCookie('connect.sid');

        console.log("🔒 [DEBUG] Session Terminated. Vault Locked.");

        // 3. Redirect back to the front door
        res.redirect('/signin');
    });
});

module.exports = router;