/* CRODE — main.js */

/* --- Card mouse spotlight --- */
document.querySelectorAll('.linear-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

/* --- Mobile nav toggle --- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

/* --- Contact modal --- */
const overlay   = document.getElementById('contactModal');
const openBtns  = document.querySelectorAll('[data-modal="contact"]');
const closeBtns = document.querySelectorAll('[data-modal-close]');

openBtns.forEach(btn => btn.addEventListener('click', () => overlay?.classList.add('open')));
closeBtns.forEach(btn => btn.addEventListener('click', () => overlay?.classList.remove('open')));
overlay?.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') overlay?.classList.remove('open');
  /* Ctrl/Cmd + K → open contact */
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    overlay?.classList.toggle('open');
  }
});

/* --- Copy email --- */
window.copyEmail = function(btn) {
  navigator.clipboard.writeText('admin@crode.net').then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
};

/* --- Scroll reveal --- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* --- Active nav link by current page --- */
const currentPage = location.pathname.split('/').filter(Boolean).pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});
