/* ════════════════════════════════════════════════
   ALI FATHY PORTFOLIO — script.js
════════════════════════════════════════════════ */

/* ── NAVBAR scroll class ─────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── HAMBURGER mobile menu ───────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── ACTIVE nav link on scroll ───────────────── */
const sections = document.querySelectorAll('section[id]');

function setActiveLink () {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

/* ── SCROLL REVEAL ───────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Timeline items
document.querySelectorAll('.timeline-item').forEach(el => revealObserver.observe(el));

// Project cards — stagger
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  revealObserver.observe(el);
});

// Service cards — stagger
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});

// Generic data-reveal
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ── CONTACT FORM submit ─────────────────────── */
const contactForm    = document.getElementById('contactForm');
const formFeedback   = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();

  // Simulate send
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    formFeedback.textContent = `✓ Thanks ${name}! Your message was sent successfully.`;
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    setTimeout(() => { formFeedback.textContent = ''; }, 5000);
  }, 1400);
});

/* ── SKILL TAGS hover ripple ─────────────────── */
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

/* ── HERO glow parallax ──────────────────────── */
const heroGlow = document.querySelector('.hero-glow');
if (heroGlow) {
  window.addEventListener('mousemove', (e) => {
    const xPct = (e.clientX / window.innerWidth  - 0.5) * 30;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 30;
    heroGlow.style.transform = `translate(${xPct}px, ${yPct}px)`;
  });
}

/* ── TYPING effect for hero label ────────────── */
(function typeEffect () {
  const el   = document.querySelector('.hero-title');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, 38);
})();
