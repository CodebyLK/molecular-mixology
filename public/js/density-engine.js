// public/js/density-engine.js
document.addEventListener('DOMContentLoaded', () => {
    const ingredientList = document.getElementById('ingredientList');
    const glass = document.getElementById('glass');

    function updateGlass() {
        // 1. Gather data from the checked inputs
        const selectedIngredients = Array.from(ingredientList.querySelectorAll('input[type="checkbox"]:checked'))
            .map(input => ({
                name: input.value,
                density: parseFloat(input.dataset.density),
                color: input.dataset.color
            }));

        // 2. The Logic: Sort by Specific Gravity (Heaviest at the bottom)
        selectedIngredients.sort((a, b) => b.density - a.density);

        // 3. The UI Reset: Clear the bowl
        glass.innerHTML = '';

        if (selectedIngredients.length === 0) return;

        // 4. The Geometry: Calculate height percentages
        const layerHeight = 100 / selectedIngredients.length;

// public/js/density-engine.js
// Find the .forEach loop inside your updateGlass function and change this line:

        selectedIngredients.forEach((ing) => {
            const layer = document.createElement('div');
            layer.className = 'liquid-layer';
            layer.style.height = `${layerHeight}%`;
            layer.style.backgroundColor = ing.color;
            
            // Updated line: Injects both Name and SG into the span
            layer.innerHTML = `<span>${ing.name} <small>(SG ${ing.density})</small></span>`;
            
            glass.appendChild(layer);
        });
    }

    // Event Delegation: Listen for any checkbox changes
    if (ingredientList && glass) {
        ingredientList.addEventListener('change', updateGlass);
    }
});