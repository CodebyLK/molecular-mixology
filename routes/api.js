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
            return res.status(400).json({ success: false, error: "The Alchemist requires reagents to proceed." });
        }

        const techniqueInstruction = module_used === "auto"
            ? "Analyze the reagents and select the ONE technique that best elevates this specific flavor profile."
            : `Focus specifically on the "${module_used}" technique.`;

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
    3. TERMINOLOGY & ATMOSPHERE: Enforce an elite, ultra-luxurious lounge atmosphere. ABSOLUTELY FORBIDDEN words: "beaker", "pipette", "test tube", "syringe", "sterile", or medical/clinical jargon. Instead, use high-end mixology terms: "mixing glass", "mixing vessel", "precision dropper", "dasher", "chilled glassware", or "pristine tools".
    4. THE ACQUISITION LIMIT: Suggest max TWO "Critical Acquisitions."

    OUTPUT FORMAT (Elegant & Professional):
    - Protocol Name: [Creative name]
    - Technique: [Chosen Module]
    - Flavor Theory: [A brief, classy explanation of why these flavors work together.]
    - Reagents Used: [List chosen reagents with bar-measurements]
    - Critical Acquisitions: [List 1 or 2 required items, or "None"]
    - Preparation Protocol: [Step-by-step mixology instructions.]
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const aiOutput = response.text;

        let dynamicTitle = "Lab Synthesis";
        const nameMatch = aiOutput.match(/Protocol Name:\s*\**([^*%\n\r]+)\**/i);
        if (nameMatch && nameMatch[1]) {
            dynamicTitle = nameMatch[1].trim();
        }

        const newFormulation = new Formulation({
            user_id: req.session.userId,
            module_used: module_used,
            target_drink: dynamicTitle,
            ai_protocol: aiOutput
        });

        await newFormulation.save();
        res.json({ success: true, protocol: aiOutput });

    } catch (error) {
        console.error("--- LAB CRASH REPORT ---");
        console.error(error);

        let themedError = "The Alchemist encountered a model instability.";

        // --- SPECIFIC ERROR MAPPING ---
        if (error.message && error.message.includes('API key')) {
            themedError = "Laboratory credentials invalid. Access to the Alchemist's mind is denied.";
        } else if (error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
            themedError = "The Laboratory Journal is currently offline. Protocol cannot be archived.";
        } else if (error.message && error.message.includes('quota')) {
            themedError = "The Alchemist has exceeded their daily cognitive capacity. Try again after the next shift.";
        } else if (error.message && error.message.includes('safety')) {
            themedError = "The requested synthesis was flagged as volatile and dangerous. Protocol aborted.";
        }

        res.status(500).json({ success: false, error: themedError });
    }
});

module.exports = router;