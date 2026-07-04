// Typing animation for the hero role line — types, pauses, erases, cycles.
export function initTyping(){
  const el = document.getElementById('heroRole');
  if (!el) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    el.textContent = 'Flutter Developer';
    return;
  }

  const phrases = ['Flutter Developer', 'Mobile App Engineer', 'Cross-Platform Builder'];
  const TYPE_MS = 65, ERASE_MS = 35, HOLD_MS = 1800, GAP_MS = 400;

  el.textContent = '';
  const caret = document.createElement('span');
  caret.className = 'caret';
  caret.setAttribute('aria-hidden', 'true');
  const textNode = document.createElement('span');
  el.appendChild(textNode);
  el.appendChild(caret);
  el.setAttribute('aria-label', 'Flutter Developer');

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function step(){
    const phrase = phrases[phraseIndex];
    if (!deleting){
      charIndex++;
      textNode.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length){
        deleting = true;
        setTimeout(step, HOLD_MS);
        return;
      }
      setTimeout(step, TYPE_MS);
    } else {
      charIndex--;
      textNode.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(step, GAP_MS);
        return;
      }
      setTimeout(step, ERASE_MS);
    }
  }
  setTimeout(step, TYPE_MS);
}
