// routes/journal.js
const express = require('express');
const router = express.Router();
const Formulation = require('../models/Formulation');

router.get('/', async (req, res) => {
    try {
        // Fetch only formulations that belong to the logged-in user
        // Sort by date_created in descending order (-1) so newest is on top
        const myNotes = await Formulation.find({ user_id: req.session.userId })
            .sort({ date_created: -1 });

        // Render the journal page and pass the data to it
        res.render('journal', { notes: myNotes });
    } catch (err) {
        console.error("💥 [DEBUG] Error loading journal:", err);
        res.status(500).send("Error accessing the Laboratory Archives.");
    }
});

module.exports = router;