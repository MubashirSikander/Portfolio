// Infinite technology ticker: duplicates the pills inside the same track so
// the CSS translateX(-50%) loop is seamless (pause-on-hover is handled by CSS).
export function initTicker(){
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const originalChildren = Array.from(track.children);
  originalChildren.forEach(child => {
    const clone = child.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
}
