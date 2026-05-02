// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Reagent = require('./models/Reagent');

const newReagents = [
  { name: "Grenadine", category: "Syrup", abv: 0, brix: 50, specific_gravity: 1.18, hex_color: "#E32636" },
  { name: "Simple Syrup", category: "Syrup", abv: 0, brix: 50, specific_gravity: 1.13, hex_color: "#fff9c4" },
  { name: "Kahlua", category: "Liqueur", abv: 20, brix: 35, specific_gravity: 1.12, hex_color: "#3b2818" },
  { name: "Orange Juice", category: "Juice", abv: 0, brix: 10, specific_gravity: 1.04, hex_color: "#ffb300" },
  { name: "Campari", category: "Liqueur", abv: 24, brix: 24, specific_gravity: 1.04, hex_color: "#C9242B" },
  { name: "Blue Curaçao", category: "Liqueur", abv: 25, brix: 15, specific_gravity: 1.02, hex_color: "#00BFFF" },
  { name: "Water", category: "Mixer", abv: 0, brix: 0, specific_gravity: 1.00, hex_color: "#e0f7fa" },
  { name: "Dry Red Wine", category: "Wine", abv: 13, brix: 1, specific_gravity: 0.99, hex_color: "#722F37" },
  { name: "White Rum", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#f5f5f5" },
  { name: "Bourbon", category: "Spirit", abv: 45, brix: 0, specific_gravity: 0.94, hex_color: "#e65100" },
  { name: "Overproof Absinthe", category: "Spirit", abv: 68, brix: 0, specific_gravity: 0.89, hex_color: "#74c365" }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB. Clearing old data...');
        
        // 1. Wipe the current Reagents clean
        await Reagent.deleteMany({}); 
        
        // 2. Plant the fresh seeds
        console.log('Planting fresh seeds...');
        await Reagent.insertMany(newReagents);
        
        console.log('✅ Success! The vault is fully stocked.');
        process.exit(); 
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });