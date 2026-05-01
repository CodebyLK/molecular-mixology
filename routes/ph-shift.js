// routes/ph-shift.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('ph-shift');
});

module.exports = router;