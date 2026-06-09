/* ============================================================
   METALISTERÍA GONZÁLEZ — Galería JS
   ============================================================ */

'use strict';

// AOS (guarded in case CDN fails offline)
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
}

// ============================================================
// NAVBAR
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ============================================================
// FILTER
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const items      = document.querySelectorAll('.galeria-item');
const countEl    = document.getElementById('galeriaCount');
const galeriaGrid = document.getElementById('galeriaGrid');

let activeFilter = 'all';

function forceLoadImages(selector) {
  document.querySelectorAll(selector).forEach(img => {
    if (img.loading === 'lazy') img.loading = 'eager';
  });
}

function applyFilter(filter) {
  activeFilter = filter;
  let visible = 0;

  items.forEach(item => {
    const match = filter === 'all' || item.dataset.category === filter;
    item.classList.toggle('hidden', !match);
    if (match) {
      visible++;
      item.classList.add('aos-animate');
    }
  });

  galeriaGrid.classList.toggle('grid-cat', filter !== 'all');
  countEl.innerHTML = `Mostrando <strong>${visible}</strong> proyecto${visible !== 1 ? 's' : ''}`;
  buildVisibleIndex();
  forceLoadImages('.galeria-item:not(.hidden) img');
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});

// ============================================================
// LIGHTBOX
// ============================================================
const lightbox         = document.getElementById('lightbox');
const lightboxClose    = document.getElementById('lightboxClose');
const lightboxPrev     = document.getElementById('lightboxPrev');
const lightboxNext     = document.getElementById('lightboxNext');
const lightboxVisual   = document.getElementById('lightboxVisual');
const lightboxBadge    = document.getElementById('lightboxBadge');
const lightboxTitle    = document.getElementById('lightboxTitle');
const lightboxSector   = document.getElementById('lightboxSector');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

let visibleItems = [];
let currentIndex = 0;

function buildVisibleIndex() {
  visibleItems = [...document.querySelectorAll('.galeria-item:not(.hidden)')];
}

function openLightbox(item) {
  buildVisibleIndex();
  currentIndex = visibleItems.indexOf(item);
  renderLightbox(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightbox(index) {
  if (index < 0 || index >= visibleItems.length) return;
  currentIndex = index;
  const item = visibleItems[index];

  // Visual: real image or placeholder clone
  const imgEl          = item.querySelector('.galeria-img-wrap img');
  const placeholderEl  = item.querySelector('.galeria-placeholder');
  lightboxVisual.innerHTML = '';
  if (imgEl) {
    const img = document.createElement('img');
    img.src = imgEl.src;
    img.alt = imgEl.alt;
    lightboxVisual.appendChild(img);
  } else if (placeholderEl) {
    lightboxVisual.appendChild(placeholderEl.cloneNode(true));
  }

  // Meta
  const badge  = item.querySelector('.galeria-badge');
  const title  = item.querySelector('h3');
  const sector = item.querySelector('.galeria-sector');

  lightboxBadge.textContent = badge ? badge.textContent.trim() : '';
  lightboxBadge.className   = badge ? 'lightbox-badge ' + [...badge.classList].filter(c => c.startsWith('badge-')).join(' ') : 'lightbox-badge';
  lightboxTitle.textContent = title  ? title.textContent.trim() : '';
  lightboxSector.innerHTML  = sector ? sector.innerHTML : '';

  // Nav state
  lightboxPrev.classList.toggle('hidden-nav', index === 0);
  lightboxNext.classList.toggle('hidden-nav', index === visibleItems.length - 1);
}

// Open on img-wrap or button click
// Track touch movement to distinguish tap vs scroll on mobile
let touchDeltaY = 0;

items.forEach(item => {
  const wrap = item.querySelector('.galeria-img-wrap');
  const btn  = item.querySelector('.galeria-open-btn');

  let touchStartY = 0;

  wrap.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchDeltaY = 0;
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    touchDeltaY = Math.abs(e.touches[0].clientY - touchStartY);
  }, { passive: true });

  wrap.addEventListener('click', () => {
    if (touchDeltaY > 10) return;
    openLightbox(item);
  });

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (touchDeltaY > 10) return;
    openLightbox(item);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => renderLightbox(currentIndex - 1));
lightboxNext.addEventListener('click', () => renderLightbox(currentIndex + 1));

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  renderLightbox(currentIndex - 1);
  if (e.key === 'ArrowRight') renderLightbox(currentIndex + 1);
});

// Swipe táctil en el lightbox
let lbTouchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  lbTouchStartX = e.touches[0].clientX;
}, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  const delta = e.changedTouches[0].clientX - lbTouchStartX;
  if (Math.abs(delta) > 50) {
    if (delta < 0) renderLightbox(currentIndex + 1);
    else           renderLightbox(currentIndex - 1);
  }
}, { passive: true });

buildVisibleIndex();
forceLoadImages('.galeria-item:not(.hidden) img');
items.forEach(item => item.classList.add('aos-animate'));

// Year
document.getElementById('year').textContent = new Date().getFullYear();
