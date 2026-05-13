// routes/dashboard.js
const express = require('express');
const router = express.Router();
const Reagent = require('../models/Reagent'); // Adjust path to your Reagent model if needed

// GET: The central command hub
router.get('/', async (req, res) => {
    try {
        // Fetch all reagents from your database to display in the embedded pantry
        const dbReagents = await Reagent.find({}).sort({ category: 1, name: 1 });

        // Render the dashboard.ejs view and inject the inventory
        res.render('dashboard', { reagents: dbReagents });
    } catch (err) {
        console.error("💥 [DEBUG] Error loading Dashboard:", err);
        res.status(500).send("Command center offline.");
    }
});

module.exports = router;