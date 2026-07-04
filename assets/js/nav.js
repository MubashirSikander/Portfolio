// Navbar: mobile menu toggle, scroll-spy active link, smooth-scroll anchors, sticky elevation.
export function initNav(){
  const toggle = document.getElementById('navMenuToggle');
  const links = document.getElementById('navLinks');
  const menuIcon = document.getElementById('navMenuIcon');
  const navbar = document.querySelector('.navbar');

  if (navbar){
    const setScrolled = () => navbar.classList.toggle('is-scrolled', window.scrollY > 12);
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  if (toggle && links){
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      menuIcon.innerHTML = isOpen
        ? '<use href="#i-x"/>'
        : '<use href="#i-menu"/>';
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        menuIcon.innerHTML = '<use href="#i-menu"/>';
      });
    });
  }

  // smooth-scroll for in-page anchors (native `scroll-behior:smooth` on <html>
  // already handles the motion; this just keeps the URL bar tidy without a jump)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // scroll-spy: highlight the nav link for the section currently in view
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = navAnchors
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window){
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }
}
