const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Formulation = require('../models/Formulation');

// Initialize the 2026 Stable SDK
const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

router.post('/generate-formulation', async (req, res) => {
    try {
        const { ingredients, module_used } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ success: false, error: "No reagents selected." });
        }

        const techniqueInstruction = module_used === "auto" 
            ? "Analyze the reagents and select the ONE technique that best elevates this specific flavor profile." 
            : `Focus specifically on the "${module_used}" technique.`;

        // Refined prompt using your "Speakeasy Scientist" rules
        const prompt = `
            You are the World Class Alchemist of a prestigious molecular speakeasy. 
            Available reagents: ${ingredients.join(', ')}.

            PHASE 1: SELECTIVE SYNTHESIS
            - Select a compatible subset (3-5 items). Prioritize flavor harmony.

            PHASE 2: THE MOLECULAR PROTOCOL
            - ${techniqueInstruction}
            - Techniques: Density & Stratification, Encapsulation, Acid-Adjustment, Botanical Alchemy.

            STRICT GUARDRAILS:
            1. TASTE IS SUPREME: If reagents clash, provide a "Lab Rejection Note."
            2. MEASUREMENTS: Use bartending volumes (oz, dashes, barspoons) for spirits. Use scientific units (ml, grams) ONLY for precision additives.
            3. TERMINOLOGY: Use "chilled glassware" or "pristine tools." NEVER use "sterile" or medical jargon.
            4. THE ACQUISITION LIMIT: Suggest max TWO "Critical Acquisitions."

            OUTPUT FORMAT (Elegant & Professional):
            - Protocol Name: [Creative name]
            - Technique: [Chosen Module]
            - Flavor Theory: [A brief, classy explanation of why these flavors work together.]
            - Reagents Used: [List chosen reagents with bar-measurements]
            - Critical Acquisitions: [List 1 or 2 required items, or "None"]
            - Preparation Protocol: [Step-by-step mixology instructions.]
        `;

        // --- CALLING THE 2026 STABLE MODEL ---
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Updated to the 2026 stable version
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const aiOutput = response.text;

        const newFormulation = new Formulation({
            module_used: module_used,
            target_drink: "Lab Synthesis",
            ai_protocol: aiOutput
        });
        
        await newFormulation.save();
        res.json({ success: true, protocol: aiOutput });

    } catch (error) {
        console.error("--- LAB CRASH REPORT ---");
        console.error(error);
        res.status(500).json({ success: false, error: "The Alchemist encountered a model instability. Check the logs." });
    }
});

module.exports = router;