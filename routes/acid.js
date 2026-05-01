// routes/acid.js
const express = require('express');
const router = express.Router();

// The Chemical Constants (Titratable Acidity percentages)
const juices = {
    orange: { name: 'Fresh Orange Juice', currentAcid: 1.0 },
    pineapple: { name: 'Fresh Pineapple Juice', currentAcid: 0.8 },
    grapefruit: { name: 'Fresh Grapefruit Juice', currentAcid: 1.5 },
    watermelon: { name: 'Fresh Watermelon Juice', currentAcid: 0.2 }
};

const targets = {
    lime: { name: 'Lime Profile', targetAcid: 6.0, ratio: { citric: 0.66, malic: 0.33 } }, // Limes are 2:1 Citric to Malic
    lemon: { name: 'Lemon Profile', targetAcid: 6.0, ratio: { citric: 1.0, malic: 0 } }    // Lemons are almost entirely Citric
};

// GET Route: Display the selection menu
router.get('/', (req, res) => {
    res.render('acid-form', { juices, targets });
});

// POST Route: Calculate the adjustment
router.post('/calculate', (req, res) => {
    const { baseJuice, targetProfile, volumeMl } = req.body;
    
    const base = juices[baseJuice];
    const target = targets[targetProfile];
    const volume = parseFloat(volumeMl);

    // The Math: How much total acid is missing?
    const acidDeficitPercent = target.targetAcid - base.currentAcid;
    
    // Grams of total acid needed = (Deficit / 100) * Volume in ml
    const totalGramsNeeded = (acidDeficitPercent / 100) * volume;

    // Split the grams based on the target citrus profile
    const citricGrams = (totalGramsNeeded * target.ratio.citric).toFixed(2);
    const malicGrams = (totalGramsNeeded * target.ratio.malic).toFixed(2);

    res.render('acid-result', {
        base,
        target,
        volume,
        citricGrams,
        malicGrams
    });
});

module.exports = router;