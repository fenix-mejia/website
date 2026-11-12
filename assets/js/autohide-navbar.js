// assets/js/autohide-navbar.js

// Debounce function to limit the rate at which a function gets called.
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Autohide navbar logic
const header = document.querySelector('.main-header');
if (header) {
  let lastScrollTop = 0;
  let menuInteraction = false;
  let menuInteractionTimer;
  const delta = 5; // The scroll amount required before we act
  const navbarHeight = header.offsetHeight;
  const navbarCollapse = document.getElementById('navbarSupportedContent');

  const scheduleNavbarRelease = (delay) => {
    clearTimeout(menuInteractionTimer);
    menuInteractionTimer = setTimeout(() => {
      menuInteraction = false;
    }, delay);
  };

  const holdNavbar = () => {
    menuInteraction = true;
    header.classList.remove('navbar-hidden');
    scheduleNavbarRelease(400);
  };

  if (navbarCollapse) {
    navbarCollapse.addEventListener('show.bs.collapse', holdNavbar);
    navbarCollapse.addEventListener('hide.bs.collapse', holdNavbar);
  }

  document.querySelectorAll('.menu-main .dropdown').forEach((dropdown) => {
    dropdown.addEventListener('dropdown:show', holdNavbar);
    dropdown.addEventListener('dropdown:hide', holdNavbar);
  });

  window.addEventListener('scroll', debounce(function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const menuIsOpen = navbarCollapse && navbarCollapse.classList.contains('show');

    if (menuIsOpen || menuInteraction) {
      header.classList.remove('navbar-hidden');
      lastScrollTop = scrollTop;
      if (menuInteraction) {
        scheduleNavbarRelease(150);
      }
      return;
    }

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - scrollTop) <= delta) {
      return;
    }

    // If they scrolled down and are past the navbar, add class .navbar-hidden.
    // This is necessary so you never see what is "behind" the navbar.
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
      header.classList.add('navbar-hidden');
    } else {
      // Scroll Up
      header.classList.remove('navbar-hidden');
    }

    lastScrollTop = scrollTop;
  }));
}
