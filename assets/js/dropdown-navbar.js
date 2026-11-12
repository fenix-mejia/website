document.querySelectorAll('[data-dropdown-toggle]').forEach((button) => {
  const dropdown = button.closest('.dropdown');

  const closeDropdown = () => {
    if (!dropdown.classList.contains('show')) {
      return;
    }
    dropdown.classList.remove('show');
    button.setAttribute('aria-expanded', 'false');
    dropdown.dispatchEvent(new CustomEvent('dropdown:hide', { bubbles: true }));
  };

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropdown.classList.contains('show')) {
      closeDropdown();
      return;
    }
    dropdown.classList.add('show');
    button.setAttribute('aria-expanded', 'true');
    dropdown.dispatchEvent(new CustomEvent('dropdown:show', { bubbles: true }));
  });

  dropdown.querySelectorAll('.dropdown-item').forEach((link) => {
    link.addEventListener('click', () => {
      link.blur();
      closeDropdown();
      const navbarCollapse = document.getElementById('navbarSupportedContent');
      if (navbarCollapse && navbarCollapse.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });

  dropdown.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
      button.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });
});
