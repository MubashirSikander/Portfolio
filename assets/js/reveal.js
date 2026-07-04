// Scroll-reveal: fades/slides [data-reveal] elements in once ~20% visible.
// Also pulses the experience timeline dot when its row enters view.
//
// Safety net: this only runs at all once .js is on <html> (see animations.css),
// so a hidden element always implies JS is active — but IntersectionObserver
// still has edge cases (rapid programmatic viewport/layout changes, some
// embedded/preview contexts). A short forced-reveal timeout guarantees content
// never gets stuck invisible even if an observer callback never fires.
export function initReveal(){
  const reveals = document.querySelectorAll('[data-reveal]');
  const dots = document.querySelectorAll('[data-reveal-dot]');

  if (!('IntersectionObserver' in window)){
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => io.observe(el));

  // Force-reveal anything still hidden after 2.5s — belt-and-suspenders so a
  // missed observer callback can never leave real content permanently invisible.
  setTimeout(() => {
    reveals.forEach(el => el.classList.add('is-visible'));
  }, 2500);

  const dotIo = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  dots.forEach(el => dotIo.observe(el));
}
