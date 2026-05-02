// 1. Load environment variables FIRST
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Reagent = require('./models/Reagent');
const Formulation = require('./models/Formulation');



const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <-- ADD THIS LINE

// Import the routes
const densityRoutes = require('./routes/density');
const acidRouter = require('./routes/acid');
const phShiftRouter = require('./routes/ph-shift');
const spherificationRouter = require('./routes/spherification');
const pantryRouter = require('./routes/pantry');
const apiRouter = require('./routes/api');



// Tell Express: "Any traffic going to /modules/density should be handled by the densityRoutes file"
app.use('/modules/density', densityRoutes);
app.use('/modules/acid', acidRouter);
app.use('/modules/ph-shift', phShiftRouter);
app.use('/modules/spherification', spherificationRouter);
app.use('/modules/pantry', pantryRouter);
app.use('/api', apiRouter);

// 2. Pull the secure URL from the .env file
const dbURL = process.env.MONGO_URI; 

// 3. Connect to the Atlas Cluster
mongoose.connect(dbURL)
    .then(() => {
        console.log("✅ Success: Connected to MongoDB Atlas Cloud Cluster!");
    })
    .catch((error) => {
        console.error("❌ Error: Could not connect to Atlas.", error);
    });

app.get('/dashboard', (req, res) => {
    res.render('dashboard'); 
});

// Don't forget to import your model at the VERY TOP of server.js:
// const Reagent = require('./models/Reagent');



app.listen(3000, () => {
    console.log("🚀 Terminal online at http://localhost:3000");
});