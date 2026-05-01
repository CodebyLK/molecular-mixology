// routes/spherification.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('spherification');
});

module.exports = router;