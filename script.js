const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const heroProduct = document.querySelector('#heroProduct');
const galleryThumbs = [...document.querySelectorAll('.gallery-thumb')];

galleryThumbs.forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.dataset.src;
    if (!src || heroProduct.src.endsWith(src)) return;
    galleryThumbs.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    heroProduct.classList.add('is-changing');
    const preload = new Image();
    preload.onload = () => {
      heroProduct.src = src;
      requestAnimationFrame(() => heroProduct.classList.remove('is-changing'));
    };
    preload.src = src;
  });
});
