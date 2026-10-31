document.querySelectorAll('[data-dropdown-toggle]').forEach((button) => {
  const dropdown = button.closest('.dropdown');

  const closeDropdown = () => {
    dropdown.classList.remove('show');
    button.setAttribute('aria-expanded', 'false');
  };

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle('show');
    button.setAttribute('aria-expanded', String(isOpen));
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
