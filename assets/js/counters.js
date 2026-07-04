// Number counters: animates each [data-count-to] from 0 to its target once visible.
export function initCounters(){
  const targets = document.querySelectorAll('[data-count-to]');
  if (!targets.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animate(el){
    const to = parseInt(el.getAttribute('data-count-to'), 10) || 0;
    const suffix = el.getAttribute('data-count-suffix') || '';
    if (reduced){
      el.textContent = to + suffix;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    function tick(now){
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * to) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)){
    targets.forEach(animate);
    return;
  }

  const animated = new Set();
  function animateOnce(el){
    if (animated.has(el)) return;
    animated.add(el);
    animate(el);
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateOnce(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  targets.forEach(el => io.observe(el));

  // Safety net (see reveal.js): guarantee every counter reaches its real
  // value even if its intersection callback never fires.
  setTimeout(() => targets.forEach(animateOnce), 2500);
}
