require('dotenv').config();
const mongoose = require('mongoose');
const Reagent = require('./models/Reagent');

const definitiveReagents = [
  // --- BASE SPIRITS ---
  { name: "Vodka (Wheat)", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#ffffff" },
  { name: "Vodka (Potato)", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#fdfdfd" },
  { name: "London Dry Gin", category: "Spirit", abv: 47, brix: 0, specific_gravity: 0.93, hex_color: "#f5f5f5" },
  { name: "Botanical Gin", category: "Spirit", abv: 42, brix: 0, specific_gravity: 0.95, hex_color: "#e8f4f8" },
  { name: "Tequila Blanco", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#ffffff" },
  { name: "Tequila Reposado", category: "Spirit", abv: 40, brix: 2, specific_gravity: 0.96, hex_color: "#f4e0a2" },
  { name: "Tequila Añejo", category: "Spirit", abv: 40, brix: 3, specific_gravity: 0.96, hex_color: "#d4af37" },
  { name: "Mezcal Joven", category: "Spirit", abv: 45, brix: 0, specific_gravity: 0.94, hex_color: "#f2f2f2" },
  { name: "White Rum", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#f5f5f5" },
  { name: "Aged Rum", category: "Spirit", abv: 40, brix: 2, specific_gravity: 0.96, hex_color: "#8b4513" },
  { name: "Overproof Rum", category: "Spirit", abv: 63, brix: 0, specific_gravity: 0.90, hex_color: "#e3c28c" },
  { name: "Rhum Agricole", category: "Spirit", abv: 50, brix: 0, specific_gravity: 0.93, hex_color: "#f5f5dc" },
  { name: "Bourbon", category: "Spirit", abv: 45, brix: 0, specific_gravity: 0.94, hex_color: "#e65100" },
  { name: "Rye Whiskey", category: "Spirit", abv: 50, brix: 0, specific_gravity: 0.93, hex_color: "#cc5500" },
  { name: "Peated Scotch", category: "Spirit", abv: 46, brix: 0, specific_gravity: 0.94, hex_color: "#d4af37" },
  { name: "Irish Whiskey", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#c28e0e" },
  { name: "Cognac VSOP", category: "Spirit", abv: 40, brix: 1, specific_gravity: 0.96, hex_color: "#b95c00" },
  { name: "Pisco", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#ffffff" },
  { name: "Shochu (Rice)", category: "Spirit", abv: 25, brix: 0, specific_gravity: 0.97, hex_color: "#ffffff" },
  { name: "Overproof Absinthe", category: "Spirit", abv: 68, brix: 0, specific_gravity: 0.89, hex_color: "#74c365" },

  // --- AMARI & LIQUEURS ---
  { name: "Campari", category: "Liqueur", abv: 24, brix: 24, specific_gravity: 1.04, hex_color: "#C9242B" },
  { name: "Aperol", category: "Liqueur", abv: 11, brix: 25, specific_gravity: 1.05, hex_color: "#ff6a00" },
  { name: "Sweet Vermouth", category: "Wine", abv: 16, brix: 14, specific_gravity: 1.03, hex_color: "#4a0404" },
  { name: "Dry Vermouth", category: "Wine", abv: 15, brix: 3, specific_gravity: 0.99, hex_color: "#e8e5ba" },
  { name: "Blanc Vermouth", category: "Wine", abv: 16, brix: 10, specific_gravity: 1.01, hex_color: "#f5f5dc" },
  { name: "Green Chartreuse", category: "Liqueur", abv: 55, brix: 25, specific_gravity: 1.01, hex_color: "#c0d860" },
  { name: "Yellow Chartreuse", category: "Liqueur", abv: 43, brix: 30, specific_gravity: 1.04, hex_color: "#e0d838" },
  { name: "Fernet Branca", category: "Amari", abv: 39, brix: 10, specific_gravity: 1.00, hex_color: "#1c140d" },
  { name: "Cynar", category: "Amari", abv: 16.5, brix: 15, specific_gravity: 1.03, hex_color: "#2b1c10" },
  { name: "Amaro Nonino", category: "Amari", abv: 35, brix: 18, specific_gravity: 1.02, hex_color: "#b05e0b" },
  { name: "Cointreau", category: "Liqueur", abv: 40, brix: 25, specific_gravity: 1.04, hex_color: "#ffffff" },
  { name: "Dry Curaçao", category: "Liqueur", abv: 40, brix: 20, specific_gravity: 1.03, hex_color: "#f5b041" },
  { name: "Blue Curaçao", category: "Liqueur", abv: 25, brix: 15, specific_gravity: 1.02, hex_color: "#00BFFF" },
  { name: "Maraschino Liqueur", category: "Liqueur", abv: 32, brix: 35, specific_gravity: 1.08, hex_color: "#ffffff" },
  { name: "St. Germain", category: "Liqueur", abv: 20, brix: 20, specific_gravity: 1.06, hex_color: "#f4eebb" },
  { name: "Coffee Liqueur", category: "Liqueur", abv: 20, brix: 30, specific_gravity: 1.10, hex_color: "#3b2818" },
  { name: "Amaretto", category: "Liqueur", abv: 28, brix: 35, specific_gravity: 1.09, hex_color: "#8b4513" },

  // --- SYRUPS & SWEETENERS ---
  { name: "Simple Syrup (1:1)", category: "Syrup", abv: 0, brix: 50, specific_gravity: 1.13, hex_color: "#fff9c4" },
  { name: "Rich Simple Syrup (2:1)", category: "Syrup", abv: 0, brix: 66, specific_gravity: 1.25, hex_color: "#fffae6" },
  { name: "Demerara Syrup", category: "Syrup", abv: 0, brix: 50, specific_gravity: 1.14, hex_color: "#a67b5b" },
  { name: "Honey Syrup (3:1)", category: "Syrup", abv: 0, brix: 60, specific_gravity: 1.20, hex_color: "#d4af37" },
  { name: "Agave Nectar", category: "Syrup", abv: 0, brix: 75, specific_gravity: 1.35, hex_color: "#c2a34f" },
  { name: "Grenadine", category: "Syrup", abv: 0, brix: 50, specific_gravity: 1.18, hex_color: "#E32636" },
  { name: "Orgeat", category: "Syrup", abv: 0, brix: 45, specific_gravity: 1.15, hex_color: "#f5deb3" },
  { name: "Maple Syrup", category: "Syrup", abv: 0, brix: 66, specific_gravity: 1.33, hex_color: "#c86b28" },

  // --- PRODUCE & JUICES ---
  { name: "Lemon Juice", category: "Juice", abv: 0, brix: 8, specific_gravity: 1.03, hex_color: "#fff44f" },
  { name: "Lime Juice", category: "Juice", abv: 0, brix: 8, specific_gravity: 1.03, hex_color: "#d4e157" },
  { name: "Orange Juice", category: "Juice", abv: 0, brix: 10, specific_gravity: 1.04, hex_color: "#ffb300" },
  { name: "Grapefruit Juice", category: "Juice", abv: 0, brix: 9, specific_gravity: 1.03, hex_color: "#ff8c69" },
  { name: "Pineapple Juice", category: "Juice", abv: 0, brix: 12, specific_gravity: 1.05, hex_color: "#ffeb3b" },
  { name: "Cranberry Juice", category: "Juice", abv: 0, brix: 11, specific_gravity: 1.04, hex_color: "#8b0000" },
  { name: "Apple Juice", category: "Juice", abv: 0, brix: 11, specific_gravity: 1.04, hex_color: "#fdd835" },

  // --- MOLECULAR POWDERS & ACIDS ---
  { name: "Citric Acid", category: "Acid", abv: 0, brix: 0, specific_gravity: 1.66, hex_color: "#ffffff" },
  { name: "Malic Acid", category: "Acid", abv: 0, brix: 0, specific_gravity: 1.60, hex_color: "#ffffff" },
  { name: "Tartaric Acid", category: "Acid", abv: 0, brix: 0, specific_gravity: 1.76, hex_color: "#ffffff" },
  { name: "Ascorbic Acid (Vitamin C)", category: "Acid", abv: 0, brix: 0, specific_gravity: 1.65, hex_color: "#ffffff" },
  { name: "Lactic Acid (88%)", category: "Acid", abv: 0, brix: 0, specific_gravity: 1.20, hex_color: "#ffffe0" },
  { name: "Sodium Alginate", category: "Hydrocolloid", abv: 0, brix: 0, specific_gravity: 1.00, hex_color: "#fafafa" },
  { name: "Calcium Lactate", category: "Salt", abv: 0, brix: 0, specific_gravity: 1.00, hex_color: "#f0f0f0" },
  { name: "Agar Agar", category: "Hydrocolloid", abv: 0, brix: 0, specific_gravity: 1.00, hex_color: "#fffff0" },
  { name: "Xanthan Gum", category: "Hydrocolloid", abv: 0, brix: 0, specific_gravity: 1.50, hex_color: "#f5f5dc" },
  { name: "Soy Lecithin", category: "Emulsifier", abv: 0, brix: 0, specific_gravity: 1.03, hex_color: "#eedc82" },

  // --- CLARIFIERS & EXTRACTION LIPIDS ---
  { name: "Whole Milk", category: "Dairy", abv: 0, brix: 5, specific_gravity: 1.03, hex_color: "#fffafa" },
  { name: "Egg White", category: "Protein", abv: 0, brix: 0, specific_gravity: 1.03, hex_color: "#fffafa" },
  { name: "Aquafaba", category: "Protein", abv: 0, brix: 2, specific_gravity: 1.02, hex_color: "#fdf5e6" },
  { name: "Pectinase", category: "Enzyme", abv: 0, brix: 0, specific_gravity: 1.10, hex_color: "#f5f5dc" },
  { name: "Refined Coconut Oil", category: "Lipid", abv: 0, brix: 0, specific_gravity: 0.92, hex_color: "#ffffff" },
  { name: "Brown Butter", category: "Lipid", abv: 0, brix: 0, specific_gravity: 0.90, hex_color: "#cd7f32" },
  { name: "Toasted Sesame Oil", category: "Lipid", abv: 0, brix: 0, specific_gravity: 0.92, hex_color: "#964b00" },
  { name: "Olive Oil (Extra Virgin)", category: "Lipid", abv: 0, brix: 0, specific_gravity: 0.91, hex_color: "#556b2f" },

  // --- BITTERS & DROPS ---
  { name: "Angostura Bitters", category: "Bitters", abv: 44.7, brix: 5, specific_gravity: 0.95, hex_color: "#3d1c04" },
  { name: "Peychaud's Bitters", category: "Bitters", abv: 35, brix: 5, specific_gravity: 0.96, hex_color: "#e63244" },
  { name: "Orange Bitters", category: "Bitters", abv: 39, brix: 5, specific_gravity: 0.96, hex_color: "#ff8c00" },
  { name: "Saline Solution (20%)", category: "Salt", abv: 0, brix: 0, specific_gravity: 1.15, hex_color: "#e0f7fa" },
  
  // --- BOTANICALS & WATER ---
  { name: "Fresh Mint", category: "Botanical", abv: 0, brix: 0, specific_gravity: 1.00, hex_color: "#98ff98" },
  { name: "Fresh Basil", category: "Botanical", abv: 0, brix: 0, specific_gravity: 1.00, hex_color: "#4f7942" },
  { name: "Coffee Beans", category: "Botanical", abv: 0, brix: 0, specific_gravity: 1.10, hex_color: "#2b180d" },
  { name: "Cacao Nibs", category: "Botanical", abv: 0, brix: 0, specific_gravity: 1.30, hex_color: "#3d1c02" },
  { name: "Water", category: "Mixer", abv: 0, brix: 0, specific_gravity: 1.00, hex_color: "#e0f7fa" },
  // --- THE MISSING 6 (ADVANCED MODIFIERS & BUFFERS) ---
  { name: "Sodium Citrate", category: "Salt", abv: 0, brix: 0, specific_gravity: 1.00, hex_color: "#ffffff" }, // Crucial pH buffer for Spherification
  { name: "Isomalt", category: "Sugar", abv: 0, brix: 100, specific_gravity: 1.50, hex_color: "#ffffff" }, // Used for molecular sugar-glass garnishes
  { name: "Suze", category: "Amari", abv: 20, brix: 10, specific_gravity: 1.02, hex_color: "#e6d933" }, // Earthy gentian root modifier
  { name: "Cachaça", category: "Spirit", abv: 40, brix: 0, specific_gravity: 0.95, hex_color: "#fdfdfd" }, // Grassy sugarcane base
  { name: "Lillet Blanc", category: "Wine", abv: 17, brix: 10, specific_gravity: 1.01, hex_color: "#f5f5dc" }, // Fortified wine essential for Vespers
  { name: "Creme de Violette", category: "Liqueur", abv: 20, brix: 25, specific_gravity: 1.08, hex_color: "#4b0082" } // High-density floral pigment
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB. Clearing old data...');
        await Reagent.deleteMany({}); 
        
        console.log(`Planting ${definitiveReagents.length} premium reagents...`);
        await Reagent.insertMany(definitiveReagents);
        
        console.log('✅ Success! The ultimate speakeasy vault is fully stocked.');
        process.exit(); 
    })
    .catch(err => {
        console.error('❌ Error:', err);
        process.exit(1);
    });