// public/js/sphere-engine.js
document.addEventListener('DOMContentLoaded', () => {
    const dropBtn = document.getElementById('dropBtn');
    const clearBtn = document.getElementById('clearBtn');
    const selector = document.getElementById('caviarSelect');
    const labStation = document.querySelector('.lab-station');
    let dropCount = 0;

    const recipes = {
        'olive': {
            color: '#8B9A46',
            title: 'The "Caviar" Martini',
            desc: 'A perfectly clear, bracingly cold Martini with suspended bursts of salinity.',
            prep: `<li>Blend 2g Sodium Alginate into 250ml premium Olive Brine. Rest overnight to remove bubbles.</li>
                   <li>Dissolve 5g Calcium Lactate into 500ml distilled water (The Bath).</li>
                   <li>Drop the brine into the bath. Let sit for exactly 60 seconds.</li>
                   <li>Rinse pearls in clean water to stop the reaction.</li>`,
            build: `<li><strong>2.5 oz</strong> London Dry Gin</li>
                    <li><strong>0.5 oz</strong> Dry Vermouth</li>
                    <li>Stir relentlessly over dense ice until freezing cold. Strain into a chilled coupe.</li>
                    <li>Gently spoon a cluster of Olive Caviar into the bottom of the glass.</li>`
        },
        'cassis': {
            color: '#4A1C40',
            title: 'The Pearl Royale',
            desc: 'A futuristic French 75. Dark berry pearls dancing at the bottom of a Champagne flute.',
            prep: `<li>Blend 2g Sodium Alginate into 250ml Creme de Cassis. (Ensure ABV is below 15%).</li>
                   <li>Dissolve 5g Calcium Lactate into 500ml distilled water (The Bath).</li>
                   <li>Drop the Cassis into the bath. Let sit for 60 seconds.</li>
                   <li>Rinse pearls in clean water.</li>`,
            build: `<li><strong>1.0 oz</strong> London Dry Gin</li>
                    <li><strong>0.5 oz</strong> Fresh Lemon Juice (Acid-Adjusted)</li>
                    <li>Shake with ice and strain into a Champagne flute.</li>
                    <li>Top with <strong>3.0 oz</strong> Brut Champagne.</li>
                    <li>Drop in a spoonful of Cassis Pearls.</li>`
        },
        'aperol': {
            color: '#FF6B00',
            title: 'The Suspended Spritz',
            desc: 'Bitter orange spheres suspended in prosecco for an evolving flavor profile.',
            prep: `<li>Dilute Aperol slightly with water to lower ABV below 15%. Blend in 2g Sodium Alginate.</li>
                   <li>Dissolve 5g Calcium Lactate into 500ml distilled water.</li>
                   <li>Drop the Aperol mix into the bath. Let sit for 60 seconds.</li>
                   <li>Rinse pearls in clean water.</li>`,
            build: `<li><strong>3.0 oz</strong> Dry Prosecco</li>
                    <li><strong>1.0 oz</strong> Soda Water</li>
                    <li>Pour over fresh ice in a large wine glass.</li>
                    <li>Gently fold in a spoonful of Aperol Pearls so they distribute throughout the ice.</li>`
        }
    };

    function updateUI() {
        const selected = recipes[selector.value];
        document.documentElement.style.setProperty('--caviar-color', selected.color);
        document.getElementById('recipeTitle').innerHTML = `Signature Serve: ${selected.title}`;
        document.getElementById('recipeDesc').innerHTML = selected.desc;
        document.getElementById('recipePrep').innerHTML = selected.prep;
        document.getElementById('recipeBuild').innerHTML = selected.build;
    }

    if (dropBtn) {
        selector.addEventListener('change', updateUI);
        clearBtn.addEventListener('click', () => {
            document.querySelectorAll('.droplet').forEach(e => e.remove());
            dropCount = 0;
        });
        dropBtn.addEventListener('click', () => {
            if (dropCount >= 20) return;
            dropCount++;
            const droplet = document.createElement('div');
            droplet.classList.add('droplet');
            labStation.appendChild(droplet);
            const randomOffset = (Math.random() - 0.5) * 60;
            droplet.style.transform = `translateX(calc(-50% + ${randomOffset}px))`;
            setTimeout(() => {
                droplet.style.top = '190px'; 
                setTimeout(() => {
                    droplet.classList.add('caviar-pearl');
                    const pileHeight = 310 - (Math.floor(dropCount / 4) * 15);
                    droplet.style.top = `${pileHeight}px`;
                }, 600);
            }, 50);
        });
        updateUI();
    }
});