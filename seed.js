require('dotenv').config();
const mongoose = require('mongoose');
const Reagent = require('./models/Reagent');

// Connect to Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to Atlas for seeding..."))
    .catch(err => console.log(err));

const seedIngredients = [
    { name: "Grenadine", category: "Syrup", abv: 0, brix: 50, specific_gravity: 1.18, hex_color: "#E32636" },
    { name: "Kahlua", category: "Liqueur", abv: 20, brix: 35, specific_gravity: 1.12, hex_color: "#3b2818" },
    { name: "Campari", category: "Liqueur", abv: 24, brix: 24, specific_gravity: 1.04, hex_color: "#C9242B" },
    { name: "Blue Curaçao", category: "Liqueur", abv: 25, brix: 15, specific_gravity: 1.02, hex_color: "#00BFFF" },
    { name: "White Rum", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#f5f5f5" },
    { name: "Overproof Absinthe", category: "Spirit", abv: 68, brix: 0, specific_gravity: 0.89, hex_color: "#74c365" }
];

const runSeed = async () => {
    try {
        // Clear out any old data first to avoid duplicates
        await Reagent.deleteMany({});
        console.log("Old reagents cleared.");

        // Inject the new array
        await Reagent.insertMany(seedIngredients);
        console.log("Database successfully seeded!");

        // Disconnect when finished
        mongoose.disconnect();
    } catch (error) {
        console.error("Seeding Error:", error);
    }
};

runSeed();