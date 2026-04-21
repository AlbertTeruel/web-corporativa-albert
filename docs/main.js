// FoodLogistic S.A. — main.js (compartit per totes les pàgines)

// ---- HEADER SCROLL ----
const header = document.getElementById('header');
if (header) {
  if (header.classList.contains('solid')) {
    // pàgines internes: sempre sòlid
  } else {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
}

// ---- MENÚ HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ---- ACTIVE NAV LINK ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ---- SCROLL ANIMATIONS ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.servei-card, .visual-card, .nosaltres-text, .nosaltres-visual, .contacte-info, .contacte-form-wrapper').forEach(el => observer.observe(el));

// ---- FORMULARI CONTACTE ----
const contacteForm = document.getElementById('contacte-form');
if (contacteForm) {
  contacteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const privacitat = document.getElementById('privacitat');
    if (!privacitat || !privacitat.checked) {
      privacitat.closest('.form-check').style.borderColor = '#e76f1e';
      privacitat.closest('.form-check').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const wrapper = document.querySelector('.contacte-form-wrapper');
    const success = document.getElementById('form-success');
    if (wrapper && success) {
      wrapper.style.display = 'none';
      success.style.display = 'flex';
    }
  });
}

// ---- BANNER COOKIES ----
function cookiesAccepted() {
  return localStorage.getItem('fl_cookies') !== null;
}
const cookieBanner = document.getElementById('cookie-banner');
if (cookieBanner && !cookiesAccepted()) {
  setTimeout(() => cookieBanner.classList.add('show'), 800);
}
function acceptCookies() {
  localStorage.setItem('fl_cookies', 'accepted');
  if (cookieBanner) cookieBanner.classList.remove('show');
}
function rejectCookies() {
  localStorage.setItem('fl_cookies', 'rejected');
  if (cookieBanner) cookieBanner.classList.remove('show');
}