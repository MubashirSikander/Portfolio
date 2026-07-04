// Entry point — initializes all progressive-enhancement modules.
// Everything here is additive: the page is fully readable/navigable with JS disabled.
import { initNav } from './nav.js';
import { initReveal } from './reveal.js';
import { initCounters } from './counters.js';
import { initTyping } from './typing.js';
import { initTicker } from './ticker.js';
import { initContactForm } from './contact-form.js';
import { initMouseFollower } from './mouse-follower.js';

function initCore(){
  initNav();
  initReveal();
  initCounters();
  initTyping();
  initTicker();
  initContactForm();
}

function initDeferred(){
  initMouseFollower();
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initCore);
} else {
  initCore();
}

window.addEventListener('load', () => {
  if ('requestIdleCallback' in window) requestIdleCallback(initDeferred);
  else setTimeout(initDeferred, 200);
});

// simple fade-in on load / fade-out on internal navigation (page-transition feel)
// (the `.js` class itself is added by an inline script in <head> — see index.html —
// so CSS can gate the scroll-reveal hidden state on JS actually being active)
document.body.classList.add('is-entering');
document.querySelectorAll('a[href$=".html"], a[href^="projects/"]').forEach(a => {
  a.addEventListener('click', (e) => {
    if (a.target === '_blank' || e.metaKey || e.ctrlKey) return;
    const href = a.getAttribute('href');
    e.preventDefault();
    document.body.classList.add('is-leaving');
    setTimeout(() => { window.location.href = href; }, 180);
  });
});

// TODO(animation): animated background particles layer — add a small canvas or
// absolutely-positioned .particle spans inside .bg-canvas once the core
// interactions above are verified in-browser.
