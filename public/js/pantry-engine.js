// public/js/pantry-engine.js

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const aiResultDiv = document.getElementById('aiResult');
    const protocolOutput = document.getElementById('protocolOutput');
    const techniqueSelect = document.getElementById('techniqueSelect');
    const printDossierBtn = document.getElementById('printDossierBtn');

    // --- 1. ALCHEMICAL FORMULATION ENGINE ---
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const checkedBoxes = document.querySelectorAll('.reagent-checkbox:checked');
            const selectedIngredients = Array.from(checkedBoxes).map(box => box.value);
            const selectedTechnique = techniqueSelect.value;

            // Reset the panel state for a new synthesis attempt
            aiResultDiv.style.borderTopColor = 'var(--accent-blue, #d4af37)';

            if (selectedIngredients.length === 0) {
                aiResultDiv.style.display = 'block';
                aiResultDiv.style.opacity = '1';
                aiResultDiv.style.borderTopColor = '#ffcc00'; // Warning Yellow
                protocolOutput.innerHTML = `<span style="color: #ffcc00;">⚠️ VAULT EMPTY:</span> The laboratory requires reagents to proceed. Please select items from the vault.`;
                aiResultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }

            generateBtn.innerText = "SYNTHESIZING...";
            generateBtn.disabled = true;
            aiResultDiv.style.opacity = '0.5';

            try {
                const response = await fetch('/api/generate-formulation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ingredients: selectedIngredients,
                        module_used: selectedTechnique
                    })
                });

                const data = await response.json();

                aiResultDiv.style.display = 'block';
                aiResultDiv.style.opacity = '1';

                if (data.success) {
                    protocolOutput.innerText = data.protocol;
                } else {
                    aiResultDiv.style.borderTopColor = '#ef4444'; // Error Red
                    protocolOutput.innerHTML = `<span style="color: #ef4444;">⚠️ PROTOCOL ABORTED:</span> ${data.error}`;
                }

                aiResultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } catch (error) {
                console.error("Fetch error:", error);
                aiResultDiv.style.display = 'block';
                aiResultDiv.style.opacity = '1';
                aiResultDiv.style.borderTopColor = '#ef4444';
                protocolOutput.innerHTML = `<span style="color: #ef4444;">🚨 CRITICAL FAILURE:</span> The Laboratory uplink has been severed. Security lockdown in effect.`;
                aiResultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } finally {
                generateBtn.innerText = "Initiate Protocol";
                generateBtn.disabled = false;
            }
        });
    }

    // --- 2. DOSSIER EXPORT ENGINE (PRINT/PDF) ---
    if (printDossierBtn) {
        printDossierBtn.addEventListener('click', () => {
            window.print();
        });
    }
});

// --- 3. VAULT UI INTERACTIONS (LIVE SEARCH & FILTER) ---
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('reagentSearch');
    const drawers = document.querySelectorAll('.vault-drawer');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            drawers.forEach(drawer => {
                let hasVisibleItems = false;
                const items = drawer.querySelectorAll('.pantry-item');

                items.forEach(item => {
                    const name = item.querySelector('.reagent-name').innerText.toLowerCase();

                    if (name.includes(searchTerm)) {
                        item.style.display = 'flex';
                        hasVisibleItems = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (searchTerm !== '') {
                    drawer.open = true;
                }

                drawer.style.display = hasVisibleItems ? 'block' : 'none';
            });
        });
    }
});