// Soft glow cursor-follower. Desktop/pointer-fine only; skipped on touch
// devices and under prefers-reduced-motion.
export function initMouseFollower(){
  const canPointer = window.matchMedia('(pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canPointer || reduced) return;

  const el = document.createElement('div');
  el.className = 'mouse-follower';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);

  let targetX = 0, targetY = 0, x = 0, y = 0;
  let active = false;

  window.addEventListener('pointermove', (e) => {
    targetX = e.clientX; targetY = e.clientY;
    if (!active){ active = true; el.classList.add('is-active'); }
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    active = false; el.classList.remove('is-active');
  });

  function loop(){
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
