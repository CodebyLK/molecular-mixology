// routes/density.js
const express = require('express');
const router = express.Router();
const Reagent = require('../models/Reagent'); 

router.get('/', async (req, res) => {
    try {
        const dbReagents = await Reagent.find({}).sort({ specific_gravity: -1 }); 
        
        // 🔴 THE TRIPWIRE: Print the data to the terminal before sending it to the view
        console.log(`Found ${dbReagents.length} reagents in the database.`);
        
        res.render('density', { reagents: dbReagents }); 
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).send("Error loading the Masterclass.");
    }
});

module.exports = router;