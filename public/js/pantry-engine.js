// public/js/pantry-engine.js

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const aiResultDiv = document.getElementById('aiResult');
    const protocolOutput = document.getElementById('protocolOutput'); // Updated ID

    generateBtn.addEventListener('click', async () => {
        // 1. Gather all checked reagents from the vault
        const checkedBoxes = document.querySelectorAll('.reagent-checkbox:checked');
        const selectedIngredients = Array.from(checkedBoxes).map(box => box.value);
        
        // 2. Get the target technique (will be "auto" for Discovery Mode)
        const selectedTechnique = document.getElementById('techniqueSelect').value;

        // 3. Validation: The Alchemist needs at least a few items to work with
        if (selectedIngredients.length === 0) {
            alert("The laboratory requires reagents to proceed. Please select items from the vault.");
            return;
        }

        // Update UI: Show the "Formulating" state
        generateBtn.innerText = "SYNTHESIZING...";
        generateBtn.disabled = true;
        
        // Hide previous results while "thinking"
        aiResultDiv.style.opacity = '0.5'; 

        try {
            // 4. Send the data to the Discovery Engine
            const response = await fetch('/api/generate-formulation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ingredients: selectedIngredients,
                    module_used: selectedTechnique
                })
            });

            const data = await response.json();

            if (data.success) {
                // 5. Inject the AI output into the Laboratory Report
                // We use innerText to preserve the line breaks from the AI
                protocolOutput.innerText = data.protocol;
                
                // Show the panel and reset opacity
                aiResultDiv.style.display = 'block';
                aiResultDiv.style.opacity = '1';

                // 6. Smooth scroll to the result so the user sees the report immediately
                aiResultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } else {
                alert("Laboratory Error: " + data.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("CRITICAL ERROR: Failed to connect to the laboratory backend.");
        } finally {
            // Reset the button to its original state
            generateBtn.innerText = "Initiate Protocol";
            generateBtn.disabled = false;
        }
    });
});