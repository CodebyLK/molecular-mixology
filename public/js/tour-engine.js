// File: public/js/tour-engine.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if the user has already completed the tour
    if (localStorage.getItem('speakeasyTourCompleted') === 'true') {
        return; // Exit immediately, keeping the overlay hidden
    }

    // 2. Define the Universal Lore-Friendly Onboarding Sequence
    const steps = [
        {
            title: "Welcome to the Laboratory",
            text: "Your access credentials have been accepted. Let's review the core instrumentation and modules now at your disposal."
        },
        {
            title: "1. The Vault Inventory",
            text: "Navigate to the Pantry. Use the live search interface to catalog your available inventory. You may select as many reagents, botanicals, and spirits as you currently possess."
        },
        {
            title: "2. Molecular Synthesis",
            text: "Submit your inventory to the AI Engine. The system will analyze your entire selection, isolate 3-5 harmonious ingredients, and calculate a structurally balanced formulation."
        },
        {
            title: "3. Theatrics & Foundations",
            text: "Explore the Main Stage and Prep Lab. Here you can master interactive physical chemistry techniques, from pH-shifting Botanical Alchemy to liquid Density Stratification."
        },
        {
            title: "4. The Archives & Specs",
            text: "Visit the Laboratory Journal to review past formulations and export printable dossiers. For deep-dive technical mechanics, consult the Alchemist's Field Guide on your dashboard."
        }
    ];

    let currentStep = 0;

    // 3. Grab the DOM Elements from dashboard.ejs
    const overlay = document.getElementById('tour-overlay');
    const titleEl = document.getElementById('tour-title');
    const textEl = document.getElementById('tour-text');
    const counterEl = document.getElementById('tour-counter');
    const nextBtn = document.getElementById('tour-next');
    const closeBtn = document.getElementById('tour-close');

    // Prevent errors if the script runs on a page without the tour overlay
    if (!overlay) return;

    // 4. Function to update the modal content
    const renderStep = () => {
        titleEl.textContent = steps[currentStep].title;
        textEl.textContent = steps[currentStep].text;
        counterEl.textContent = `${currentStep + 1}/${steps.length}`;

        // Change button text on the final step
        if (currentStep === steps.length - 1) {
            nextBtn.textContent = "Acknowledge & Enter";
        }
    };

    // 5. Function to close the tour and save the state permanently
    const endTour = () => {
        overlay.classList.add('hidden');
        localStorage.setItem('speakeasyTourCompleted', 'true');
    };

    // 6. Event Listeners for the buttons
    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
        } else {
            endTour();
        }
    });

    closeBtn.addEventListener('click', endTour);

    // 7. Initialize the first step and show the tour
    renderStep();
    overlay.classList.remove('hidden');
});