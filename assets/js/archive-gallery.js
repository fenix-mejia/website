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
