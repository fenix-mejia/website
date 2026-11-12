(() => {
  const navigation = document.querySelector('[data-archive-categories]');
  const sidebar = document.querySelector('.archive-sidebar');
  if (!navigation || !sidebar) {
    return;
  }

  const links = Array.from(navigation.querySelectorAll('[data-category-link]'));
  const sections = links.map((link) => document.getElementById(link.dataset.categoryLink)).filter(Boolean);
  const mobile = window.matchMedia('(max-width: 991.98px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.main-header');
  let activeSection = null;
  let scheduled = false;

  function showActiveLink(link) {
    if (!mobile.matches) {
      return;
    }
    const left = link.getBoundingClientRect().left - navigation.getBoundingClientRect().left + navigation.scrollLeft - 8;
    navigation.scrollTo({ left, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  }

  function setActive(section) {
    if (!section || activeSection === section) {
      return;
    }
    activeSection = section;
    links.forEach((link) => {
      const isActive = link.dataset.categoryLink === section.id;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
        showActiveLink(link);
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function updateActiveCategory() {
    scheduled = false;
    const headerHeight = header && !header.classList.contains('navbar-hidden') ? header.offsetHeight : 0;
    const sidebarHeight = mobile.matches ? sidebar.offsetHeight : 0;
    const threshold = headerHeight + sidebarHeight + 200;
    let current = sections[0];

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= threshold) {
        current = section;
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    setActive(current);
  }

  function scheduleUpdate() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateActiveCategory);
    }
  }

  links.forEach((link) => {
    link.addEventListener('click', () => setActive(document.getElementById(link.dataset.categoryLink)));
  });
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  updateActiveCategory();
})();

(() => {
  const dialog = document.getElementById('archive-viewer');
  if (!dialog || typeof dialog.showModal !== 'function') {
    return;
  }

  const items = Array.from(document.querySelectorAll('[data-archive-item]'));
  const image = document.getElementById('archive-viewer-image');
  const title = document.getElementById('archive-viewer-title');
  const count = document.getElementById('archive-viewer-count');
  const openLink = document.getElementById('archive-viewer-open');
  const closeButton = document.getElementById('archive-viewer-close');
  const previousButton = document.getElementById('archive-viewer-previous');
  const nextButton = document.getElementById('archive-viewer-next');
  let currentIndex = 0;
  let opener = null;

  function showItem(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    image.src = item.href;
    image.alt = item.dataset.archiveAlt;
    title.textContent = item.dataset.archiveTitle;
    count.textContent = `${currentIndex + 1} de ${items.length}`;
    openLink.href = item.href;

    const adjacentItem = items[(currentIndex + 1) % items.length];
    const preload = new Image();
    preload.src = adjacentItem.href;
  }

  items.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      opener = item;
      showItem(index);
      dialog.showModal();
      document.body.classList.add('archive-viewer-open');
      closeButton.focus();
    });
  });

  previousButton.addEventListener('click', () => showItem(currentIndex - 1));
  nextButton.addEventListener('click', () => showItem(currentIndex + 1));
  closeButton.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showItem(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showItem(currentIndex + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      showItem(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      showItem(items.length - 1);
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('archive-viewer-open');
    if (opener) {
      opener.focus();
    }
  });
})();
