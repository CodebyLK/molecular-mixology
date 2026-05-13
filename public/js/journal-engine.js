// public/js/journal-engine.js

document.addEventListener('DOMContentLoaded', () => {
    const exportButtons = document.querySelectorAll('.export-dossier-btn');

    exportButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent HTML summary element toggle defaults
            e.preventDefault();
            e.stopPropagation();

            // Isolate the specific parent accordion container
            const targetAccordion = button.closest('.recipe-accordion');

            if (targetAccordion) {
                // 1. Tag this targeted element for CSS isolation
                targetAccordion.classList.add('printing-now');

                // 2. Cache the current user toggle view state, then force true for print render
                const originallyOpen = targetAccordion.open;
                targetAccordion.open = true;

                // 3. Initiate native print/save layout dialog
                window.print();

                // 4. Restore regular application viewport structure immediately following execution
                targetAccordion.classList.remove('printing-now');
                targetAccordion.open = originallyOpen;
            }
        });
    });
});