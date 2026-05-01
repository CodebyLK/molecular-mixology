const express = require('express');
const router = express.Router();

// Just serve the interactive sandbox
router.get('/', (req, res) => {
    res.render('density');
});

module.exports = router;