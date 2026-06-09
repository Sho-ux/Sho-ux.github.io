const root = document.documentElement;

// ----- Theme -----
const themeBtn = document.getElementById('themeBtn');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = prefersDark ? 'dark' : 'light';
root.setAttribute('data-theme', theme);

const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2.5M12 20v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M1.5 12h2.5M20 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8"/></svg>';
const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
function syncIcon(){ themeBtn.innerHTML = theme === 'dark' ? sun : moon; }
syncIcon();
themeBtn.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);
  syncIcon();
});

// ----- Language -----
const langBtn = document.getElementById('langBtn');
let lang = (navigator.language || 'ja').startsWith('en') ? 'en' : 'ja';
root.setAttribute('lang', lang);
langBtn.addEventListener('click', () => {
  lang = lang === 'ja' ? 'en' : 'ja';
  root.setAttribute('lang', lang);
});

// ----- Reveal on scroll -----
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (Math.min(i, 6) * 0.05) + 's';
  io.observe(el);
});
