const mongoose = require('mongoose');

const formulationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    module_used: { type: String, required: true }, // e.g., "Density", "Lipid Extraction"
    target_drink: { type: String }, // e.g., "Old Fashioned"
    ai_protocol: { type: String, required: true }, // The generated text/JSON
    date_created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Formulation', formulationSchema);