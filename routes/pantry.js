// routes/pantry.js
const express = require('express');
const router = express.Router();
const Reagent = require('../models/Reagent');

console.log("📍 [TRACER] pantry.js file has successfully loaded!");

router.get('/', async (req, res) => {
    console.log("📍 [TRACER] /pantry route was just requested by a user!");
    try {
        // Fetch all reagents and sort them alphabetically by Category, then by Name
        const dbReagents = await Reagent.find({}).sort({ category: 1, name: 1 }); 
        
        res.render('pantry', { reagents: dbReagents }); 
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).send("Error loading the Pantry.");
    }
});

module.exports = router;