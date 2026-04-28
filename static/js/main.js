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

/* --- Count-up animation --- */
function countUp(el, target, duration) {
  duration = duration || 1600;
  var startTime = null;
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function update(now) {
    if (!startTime) startTime = now;
    var p = Math.min((now - startTime) / duration, 1);
    el.textContent = Math.round(easeOut(p) * target).toLocaleString('ko-KR');
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* --- SVG Sparkline (bar style) --- */
function sparkline(data, color) {
  color = color || '#7683FB';
  var w = 100, h = 28, gap = 2;
  var max = Math.max.apply(null, data.concat([1]));
  var min = Math.min.apply(null, data);
  var range = max - min || 1;
  var barW = (w - gap * (data.length - 1)) / data.length;
  var bars = data.map(function(v, i) {
    var barH = Math.max(2, ((v - min) / range) * (h - 4) + 2);
    var x = i * (barW + gap);
    var y = h - barH;
    return '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + barH.toFixed(1) + '" rx="1" fill="' + color + '" opacity="0.6"/>';
  }).join('');
  return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" style="display:block">' + bars + '</svg>';
}

/* --- Stats fetch (projects.html only) --- */
if (document.getElementById('s-api')) {
  fetch('/stats.json', { cache: 'no-cache' })
    .then(function(r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function(data) {
      var map = { 'api_requests': 's-api', 'tournaments': 's-tournaments', 'records': 's-records', 'users': 's-users' };
      for (var key in map) {
        var el = document.getElementById(map[key]);
        if (el && data[key] != null) countUp(el, data[key]);
      }
      if (data.weekly_requests && data.weekly_requests.length) {
        var sparkApi = document.getElementById('spark-api');
        if (sparkApi) sparkApi.innerHTML = sparkline(data.weekly_requests, '#7683FB');
        var sparkTournaments = document.getElementById('spark-tournaments');
        if (sparkTournaments) sparkTournaments.innerHTML = sparkline(data.weekly_requests.map(function() { return 0; }), '#22C55E');
        var sparkRecords = document.getElementById('spark-records');
        if (sparkRecords) sparkRecords.innerHTML = sparkline(data.weekly_requests, '#A78BFA');
      }
      if (data.last_updated) {
        var d = new Date(data.last_updated);
        var upd = document.getElementById('stats-updated');
        if (upd) upd.textContent = 'updated ' + d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
      }
    }).catch(function() {});
}
