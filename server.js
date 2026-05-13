// 1. Load environment variables FIRST
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const protect = require('./middleware/auth');

// Models (Optional here if routes handle them, but good for top-level tasks)
// const Reagent = require('./models/Reagent');
// const Formulation = require('./models/Formulation');

const app = express();

// Middleware & View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Configuration (Must be before routes)
app.use(session({
    secret: process.env.SESSION_SECRET || 'alchemy-secret-key', // Use .env for the secret!
    resave: false,
    saveUninitialized: false
}));

// --- ROUTE IMPORTATION ---
const authRouter = require('./routes/auth');
const pantryRouter = require('./routes/pantry');
const apiRouter = require('./routes/api');
const densityRoutes = require('./routes/density');
const acidRouter = require('./routes/acid');
const phShiftRouter = require('./routes/ph-shift');
const spherificationRouter = require('./routes/spherification');
const journalRouter = require('./routes/journal');
const dashboardRouter = require('./routes/dashboard');

// --- ROUTE DEFINITION ---

app.get('/', (req, res) => {
    res.redirect('/signin');
});

// Public Routes (No 'protect' needed)
app.use('/', authRouter);

// Protected Routes (The "Locked Door" logic)
// All 'Main Pages' and the API must use the 'protect' middleware
app.get('/dashboard', protect, (req, res) => {
    res.render('dashboard');
});

app.use('/modules/pantry', protect, pantryRouter);
app.use('/api', protect, apiRouter);

// Module Routes (These are also main pages and should be protected)
app.use('/modules/density', protect, densityRoutes);
app.use('/modules/acid', protect, acidRouter);
app.use('/modules/ph-shift', protect, phShiftRouter);
app.use('/modules/spherification', protect, spherificationRouter);
app.use('/modules/journal', protect, journalRouter);
app.use('/modules/dashboard', dashboardRouter);

// --- DATABASE CONNECTION ---
const dbURL = process.env.MONGO_URI;

mongoose.connect(dbURL)
    .then(() => console.log("✅ Success: Connected to MongoDB Atlas Cloud Cluster!"))
    .catch((error) => console.error("❌ Error: Could not connect to Atlas.", error));

// Server Activation
const PORT = process.env.PORT || 3000; // Uses Render's port in production, 3000 locally
app.listen(PORT, () => {
    console.log(`🚀 Terminal online at port ${PORT}`);
});