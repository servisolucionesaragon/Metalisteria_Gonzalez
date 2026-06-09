/* ============================================================
   METALISTERÍA GONZÁLEZ — Main JavaScript
   ============================================================ */

'use strict';

// ============================================================
// AOS INIT
// ============================================================
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
});

// ============================================================
// NAVBAR: scroll effect & active link
// ============================================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// ============================================================
// HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ============================================================
// SMOOTH SCROLL for all anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================================
// COUNTER ANIMATION
// ============================================================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ============================================================
// PARTICLES
// ============================================================
const particlesContainer = document.getElementById('particles');

function createParticle() {
  if (!particlesContainer) return;
  const p = document.createElement('div');
  p.classList.add('particle');

  const size = Math.random() * 4 + 1;
  const left = Math.random() * 100;
  const duration = Math.random() * 12 + 8;
  const delay = Math.random() * 8;

  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: -10px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;

  particlesContainer.appendChild(p);

  setTimeout(() => p.remove(), (duration + delay) * 1000);
}

// Generate particles periodically (max 20 simultaneous)
const MAX_PARTICLES = 20;
setInterval(() => {
  if (particlesContainer && particlesContainer.childElementCount < MAX_PARTICLES) {
    createParticle();
  }
}, 600);
// Generate initial batch
for (let i = 0; i < 10; i++) {
  setTimeout(createParticle, i * 300);
}



// ============================================================
// HERO: Tilt effect on logo (desktop only)
// ============================================================
const heroLogoWrap = document.querySelector('.hero-logo-wrap');
if (heroLogoWrap && window.matchMedia('(min-width: 768px)').matches) {
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    const tiltX = dy * 8;
    const tiltY = -dx * 8;
    heroLogoWrap.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    heroLogoWrap.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  });
}

// ============================================================
// SCROLL REVEAL for ticker
// ============================================================
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  // Pause on hover
  const tickerWrap = document.querySelector('.ticker-wrap');
  tickerWrap.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
  });
  tickerWrap.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
  });
}

// ============================================================
// Lazy reveal for sections
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
  revealObserver.observe(section);
});

console.log('%c🔩 Metalistería González — Web cargada exitosamente', 'color:#D4A017; font-size:14px; font-weight:bold;');

// ============================================================
// Logo image fallback
// ============================================================
document.querySelectorAll('img[alt*="González"], img[alt*="Metalistería"]').forEach(img => {
  img.addEventListener('error', function() {
    // If logo can't load, show text placeholder
    this.style.display = 'none';
    const sibling = this.parentElement.querySelector('.logo-text') || this.nextElementSibling;
    if (sibling) sibling.style.fontSize = '1.2rem';
  });
});
