/**
 * Mahmoud Hatem Portfolio – Navigation & Theme
 * Matches CSS class names: .scrolled / .open / .theme-light / .theme-dark
 */

export function initNavigation() {
  setupHeaderScroll();
  setupThemeToggle();
  setupMobileMenu();
  setupActiveSpy();
  setupSmoothScroll();
}

/* ── Header scroll state ─────────────────────────────────── */
function setupHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const tick = () => {
    header.classList.toggle('scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ── Theme toggle (dark / light) ────────────────────────── */
function setupThemeToggle() {
  const btns = document.querySelectorAll('.theme-toggle');
  const root = document.documentElement;

  const saved = () => {
    try { return localStorage.getItem('mh-theme'); } catch { return null; }
  };
  const save = (t) => {
    try { localStorage.setItem('mh-theme', t); } catch { /* noop */ }
  };

  const apply = (theme) => {
    const dark = theme === 'dark';
    root.classList.toggle('theme-dark', dark);
    root.classList.toggle('theme-light', !dark);
    btns.forEach(btn => {
      const sun  = btn.querySelector('.icon-sun');
      const moon = btn.querySelector('.icon-moon');
      if (sun)  sun.style.display  = dark ? 'block' : 'none';
      if (moon) moon.style.display = dark ? 'none'  : 'block';
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
    save(theme);
  };

  // Default: light — user can toggle to dark
  apply(saved() || 'light');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      apply(root.classList.contains('theme-dark') ? 'light' : 'dark');
    });
  });
}

/* ── Mobile drawer ───────────────────────────────────────── */
function setupMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer  = document.getElementById('mobile-drawer');
  const links   = drawer?.querySelectorAll('a') ?? [];

  if (!menuBtn || !drawer) return;

  const toggle = (force) => {
    const open = typeof force === 'boolean'
      ? force
      : !drawer.classList.contains('open');
    drawer.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', () => toggle());

  links.forEach(link => link.addEventListener('click', () => toggle(false)));

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggle(false);
      menuBtn.focus();
    }
  });
}

/* ── Active section spy ──────────────────────────────────── */
function setupActiveSpy() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
      });
    });
  }, { threshold: 0.3, rootMargin: '-70px 0px -50% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ── Smooth scroll with header offset ───────────────────── */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
      if (history.pushState) history.pushState(null, '', id);
    });
  });
}
