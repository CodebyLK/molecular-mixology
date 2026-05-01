// public/js/ph-engine.js
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('phInput');
    const selector = document.getElementById('botanicalSelect');
    const liquid = document.getElementById('liquid');
    const phValueText = document.getElementById('phValueText');
    const botanicalNotes = document.getElementById('botanicalNotes');

    const botanicals = {
        'pea': {
            sliderGradient: "linear-gradient(to right, #ff4081, #1A237E, #2E7D32)", 
            title: "The Galaxy Margarita",
            desc: "A midnight-blue cocktail that flashes to bright magenta at the table.",
            prep: `<li>Steep dried <strong>Butterfly Pea Flowers</strong> in Blanco Tequila for 45 mins.</li>
                   <li>Strain the flowers; the spirit will be a deep, dark blue.</li>
                   <li>Keep fresh lime juice in a separate, small glass carafe.</li>`,
            build: `<li>Shake 2.0 oz Infused Tequila, 0.5 oz Cointreau, and 0.5 oz Agave Nectar.</li>
                    <li>Strain over fresh ice. The drink remains blue.</li>
                    <li><strong>The Show:</strong> Serve with the side of lime juice. Once added, the acid triggers the shift to vibrant pink.</li>`,
            getColor: (ph) => {
                if (ph <= 7.0) {
                    const hue = 230 + ((7 - ph) / 5) * 80; 
                    return `hsl(${hue}, 100%, ${35 + ((7-ph)/5)*15}%)`;
                } else {
                    const hue = 230 - ((ph - 7) / 3) * 70;
                    return `hsl(${hue}, 100%, 30%)`;
                }
            }
        },
        'cabbage': {
            sliderGradient: "linear-gradient(to right, #ff00ff, #8a2be2, #0000ff, #00ff00)",
            title: "The Neon Gimlet",
            desc: "Utilizing deodorized cabbage extract for an electric-violet visual spectrum.",
            prep: `<li>Prepare a <strong>Red Cabbage Extract</strong> (boil in distilled water, strain, and reduce).</li>
                   <li>Neutralize any cabbage scent with a drop of saline or lemon oil.</li>
                   <li>Combine 0.5 oz extract with 2.0 oz Gin. The mix will be deep violet.</li>`,
            build: `<li>Stir the violet gin base with 0.5 oz Simple Syrup over ice.</li>
                    <li>Strain into a chilled coupe glass.</li>
                    <li><strong>The Show:</strong> Express a <strong>Lemon Twist</strong> over the drink and drop in 0.5 oz Lime Juice to flash it to neon pink.</li>`,
            getColor: (ph) => {
                if (ph <= 7.0) {
                    const hue = 270 + ((7 - ph) / 5) * 60;
                    return `hsl(${hue}, 100%, 45%)`;
                } else {
                    const hue = 270 - ((ph - 7) / 3) * 110;
                    return `hsl(${hue}, 90%, 40%)`;
                }
            }
        },
        'hibiscus': {
            sliderGradient: "linear-gradient(to right, #d32f2f, #d32f2f, #263238)",
            title: "The Midnight Bloom",
            desc: "A study in 'Reverse Shifts'—moving from vibrant ruby to dark, moody teal.",
            prep: `<li>Brew a concentrated <strong>Hibiscus Tea</strong> (2:1 ratio of flowers to water).</li>
                   <li>Sweeten with sugar to create a Hibiscus Syrup.</li>
                   <li>Create an 'Alkaline Foam' using egg whites and a pinch of baking soda.</li>`,
            build: `<li>Build a Highball with 2.0 oz Vodka, 1.0 oz Hibiscus Syrup, and Soda Water.</li>
                    <li>The base of the drink will be bright ruby red.</li>
                    <li><strong>The Show:</strong> Top with the <strong>Alkaline Foam</strong>. As it settles, the red liquid turns dark, inky teal.</li>`,
            getColor: (ph) => {
                if (ph <= 5.0) return `hsl(350, 100%, 40%)`;
                const hue = 350 - ((ph - 5) / 5) * 180;
                return `hsl(${hue}, 60%, 25%)`;
            }
        },
        'saffron': {
            sliderGradient: "linear-gradient(to right, #FFD700 0%, #FFD700 70%, #8B0000 100%)",
            title: "The Alchemist's Gold",
            desc: "A golden elixir that bruises to blood-red upon contact with high-alkaline modifiers.",
            prep: `<li>Infuse 2.0 oz Gin with a pinch of <strong>Turmeric and Saffron</strong> until golden.</li>
                   <li>Prepare a chilled bottle of high-pH alkaline mineral water (pH 9.0+).</li>`,
            build: `<li>Combine the golden Gin with 0.75 oz Honey Syrup and stir over ice.</li>
                    <li>Strain into a rocks glass.</li>
                    <li><strong>The Show:</strong> Top with the <strong>Alkaline Water</strong>. Watch the gold transition into a deep, bruised crimson.</li>`,
            getColor: (ph) => {
                const val = parseFloat(ph);
                if (val < 7.4) return `hsl(45, 100%, 50%)`;
                const hue = Math.max(0, 45 - ((val - 7.4) / 2.6) * 45);
                const lightness = 50 - ((val - 7.4) / 2.6) * 15;
                return `hsl(${hue}, 100%, ${lightness}%)`;
            }
        }
    };

    function updateSandbox() {
        const ph = (slider.value / 10).toFixed(1);
        const active = botanicals[selector.value];
        
        phValueText.innerText = ph;
        botanicalNotes.innerText = active.notes;
        slider.style.setProperty('--slider-bg', active.sliderGradient);

        const newColor = active.getColor(ph);
        liquid.style.setProperty('--liquid-color', newColor);
        liquid.style.boxShadow = `0 -10px 40px ${newColor}`;

        // UPDATE THE RECIPE CARD DYNAMICALLY
        document.getElementById('recipeTitle').innerText = `Signature Serve: ${active.title}`;
        document.getElementById('recipeDesc').innerText = active.desc;
        document.getElementById('recipePrep').innerHTML = active.prep;
        document.getElementById('recipeBuild').innerHTML = active.build;
    }

    if (slider && selector) {
        slider.addEventListener('input', updateSandbox);
        selector.addEventListener('change', updateSandbox);
        updateSandbox();
    }
});