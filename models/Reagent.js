const mongoose = require('mongoose');

const reagentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, 
    abv: { type: Number, default: 0 }, 
    brix: { type: Number, default: 0 }, 
    specific_gravity: { type: Number, required: true },
    hex_color: { type: String, default: "#FFFFFF" } 
});

module.exports = mongoose.model('Reagent', reagentSchema);