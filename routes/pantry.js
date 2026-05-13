// routes/pantry.js
const express = require('express');
const router = express.Router();
const Reagent = require('../models/Reagent');

router.get('/', async (req, res) => {
    try {
        const dbReagents = await Reagent.find({}).sort({ category: 1, name: 1 });
        res.render('pantry', { reagents: dbReagents });
    } catch (err) {
        console.error("--- VAULT ACCESS ERROR ---", err);

        // Render the themed error page instead of a plain text string
        res.status(500).render('error', {
            message: "The Laboratory Vault is currently jammed. Our records indicate a database synchronization failure."
        });
    }
});

module.exports = router;