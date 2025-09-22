// assets/js/accordion-toggle.js

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleAccordion');
  const accordion = document.getElementById('reportsAccordion');

  // Exit if the button or accordion doesn't exist on this page
  if (!toggleButton || !accordion) {
    return;
  }

  const collapsibleItems = accordion.querySelectorAll('.accordion-collapse');

  /**
   * Checks the current state of all accordion items and updates the
   * main toggle button's text and data-state accordingly.
   */
  const updateToggleButtonState = () => {
    // Count how many items are currently open (have the 'show' class)
    const openItemsCount = accordion.querySelectorAll('.accordion-collapse.show').length;

    if (openItemsCount === collapsibleItems.length) {
      // All items are expanded
      toggleButton.setAttribute('data-state', 'expanded');
      toggleButton.textContent = 'Colapsar Todos';
    } else {
      // Not all items are expanded (some or all are collapsed)
      toggleButton.setAttribute('data-state', 'collapsed');
      toggleButton.textContent = 'Expandir Todos';
    }
  };

  // Main button click event
  toggleButton.addEventListener('click', function () {
    const currentState = toggleButton.getAttribute('data-state');
    const action = currentState === 'collapsed' ? 'show' : 'hide';

    collapsibleItems.forEach(item => {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(item);
      if (action === 'show') {
        bsCollapse.show();
      } else {
        bsCollapse.hide();
      }
    });

    // Note: We let the event listeners below handle the state update
    // to avoid race conditions with the animation.
  });

  // Listen for Bootstrap's events on the accordion
  // This ensures we react to manual clicks on individual items.
  accordion.addEventListener('shown.bs.collapse', updateToggleButtonState);
  accordion.addEventListener('hidden.bs.collapse', updateToggleButtonState);

  // Perform an initial check on page load
  updateToggleButtonState();
});
