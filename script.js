const revealElements = [...document.querySelectorAll('.reveal')];

document.querySelectorAll('main section').forEach((section) => {
  section.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 180)}ms`);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

revealElements.forEach((element) => revealObserver.observe(element));

const heroProduct = document.querySelector('#heroProduct');
const galleryThumbs = [...document.querySelectorAll('.gallery-thumb')];

const selectGalleryImage = (button) => {
  const src = button.dataset.src;
  if (!src || !heroProduct) return;

  galleryThumbs.forEach((item) => {
    const isActive = item === button;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });

  if (heroProduct.src.endsWith(src)) return;
  heroProduct.classList.add('is-changing');

  const preload = new Image();
  preload.onload = () => {
    heroProduct.src = src;
    requestAnimationFrame(() => heroProduct.classList.remove('is-changing'));
  };
  preload.src = src;
};

galleryThumbs.forEach((button, index) => {
  button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
  button.addEventListener('click', () => selectGalleryImage(button));
  button.addEventListener('keydown', (event) => {
    const lastIndex = galleryThumbs.length - 1;
    let nextIndex = index;

    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = lastIndex;
    else return;

    event.preventDefault();
    galleryThumbs[nextIndex].focus();
    selectGalleryImage(galleryThumbs[nextIndex]);
  });
});

const technologySection = document.querySelector('.technology');

if (technologySection) {
  const backgroundObserver = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-bg-loaded');
    backgroundObserver.unobserve(entry.target);
  }, { rootMargin: '400px 0px' });

  backgroundObserver.observe(technologySection);
}

const navigationLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const navigationTargets = navigationLinks
  .map((link) => ({ link, target: document.querySelector(link.getAttribute('href')) }))
  .filter(({ target }) => target);

const setCurrentNavigation = (activeTarget) => {
  navigationTargets.forEach(({ link, target }) => {
    const isCurrent = target === activeTarget;
    link.classList.toggle('is-current', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

if (navigationTargets.length) {
  const navigationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setCurrentNavigation(entry.target);
    });
  }, { rootMargin: '-30% 0px -60%', threshold: 0 });

  navigationTargets.forEach(({ target }) => navigationObserver.observe(target));
}

document.querySelectorAll('.table-wrap').forEach((tableWrap) => {
  const updateScrollState = () => {
    const remaining = tableWrap.scrollWidth - tableWrap.clientWidth - tableWrap.scrollLeft;
    tableWrap.classList.toggle('is-scrolled', tableWrap.scrollLeft > 8);
    tableWrap.classList.toggle('is-at-end', remaining < 8);
  };

  tableWrap.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
});
