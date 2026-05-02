// routes/pantry.js
const express = require('express');
const router = express.Router();
const Reagent = require('../models/Reagent'); 

router.get('/', async (req, res) => {
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