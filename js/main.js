// Magnetic hover movement
for (const el of document.querySelectorAll('.magnetic')) {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
}

// Typewriter
const roles = ['Flutter Developer', 'Mobile App Developer', 'UI Focused Developer', 'Firebase App Developer'];
const typed = document.getElementById('typed-role');
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  typed.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
  if (!deleting && charIndex > current.length + 7) deleting = true;
  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeRole, deleting ? 45 : 75);
}
typeRole();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact demo submit
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button');
  const old = btn.textContent;
  btn.textContent = 'Message Ready ✓';
  setTimeout(() => btn.textContent = old, 1500);
});

// Active nav tab and back-to-top button
const navItems = [...document.querySelectorAll('.nav-links a')];
const backToTop = document.querySelector('.back-to-top');
const sections = navItems
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateActiveNav() {
  let current = sections[0]?.id || 'home';
  const scrollPoint = window.scrollY + 170;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPoint) current = section.id;
  });

  navItems.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  if (backToTop) {
    backToTop.classList.toggle('show', window.scrollY > 500);
  }
}

let navTicking = false;
function requestNavUpdate(){
  if(navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => { updateActiveNav(); navTicking = false; });
}
window.addEventListener('scroll', requestNavUpdate, { passive: true });
window.addEventListener('load', updateActiveNav);

// Project detail modal
const projectData = [
  {
    title: 'United Ceres College',
    subtitle: 'Education & Agent Management ERP',
    desc: 'A role-based mobile ERP app for college operations. It includes student, parent, teacher, and agent portals with secure API based workflows.',
    points: ['Student, Parent, Teacher, and Agent portals', 'Biometric login support', 'Jira Helpdesk WebView integration', 'Attendance, leave, timetable, announcements, and agent modules'],
    play: '#', app: '#'
  },
  {
    title: 'Petiggo',
    subtitle: 'Pet Food Marketplace',
    desc: 'A pet food marketplace app with product browsing, cart handling, banners, notifications, and REST API based data loading.',
    points: ['Product listing with filters', 'Cart and address management', 'Notification read and read all flow', 'Dio based API integration with session handling'],
    play: '#', app: '#'
  },
  {
    title: 'Technician ID',
    subtitle: 'Horse Survey Management',
    desc: 'An offline-first tablet app for field technicians. It supports survey data entry, local storage, and syncing when internet is available.',
    points: ['Offline-first local data storage', 'Tablet optimized responsive UI', 'Background sync flow', 'Field survey data management'],
    play: '#', app: '#'
  },
  {
    title: 'NKCC App',
    subtitle: 'Asset Management',
    desc: 'An internal asset management app with role-based flows for employee, supervisor, and HR users.',
    points: ['Real-time asset tracking', 'Employee, Supervisor, and HR roles', 'Clean architecture structure', 'Firebase backend integration'],
    play: '#', app: '#'
  }
];

const modal = document.querySelector('.project-modal');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalDesc = document.getElementById('modal-desc');
const modalPoints = document.getElementById('modal-points');
const modalLinks = document.querySelectorAll('.modal-links a');

function openProjectModal(index) {
  const project = projectData[index];
  if (!project || !modal) return;
  modalTitle.textContent = project.title;
  modalSubtitle.textContent = project.subtitle;
  modalDesc.textContent = project.desc;
  modalPoints.innerHTML = project.points.map((point) => `<li>${point}</li>`).join('');
  modalLinks[0].href = project.play;
  modalLinks[1].href = project.app;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-details-btn').forEach((btn) => {
  btn.addEventListener('click', () => openProjectModal(Number(btn.dataset.project)));
});
document.querySelector('.modal-close')?.addEventListener('click', closeProjectModal);
document.querySelector('.modal-backdrop')?.addEventListener('click', closeProjectModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});


// Framer-like motion: scroll progress, magnetic tilt, and soft parallax
const progressBar = document.querySelector('.scroll-progress');
function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  if(progressBar) progressBar.style.width = pct + '%';
}
let progressTicking = false;
function requestProgressUpdate(){
  if(progressTicking) return;
  progressTicking = true;
  requestAnimationFrame(() => { updateProgress(); progressTicking = false; });
}
window.addEventListener('scroll', requestProgressUpdate, {passive:true});
window.addEventListener('load', updateProgress);

// Add staggered reveal delays inside grids
['.project-grid','.offer-grid','.achievement-grid','.experience-stack','.education-timeline'].forEach((selector)=>{
  document.querySelectorAll(`${selector} [data-reveal]`).forEach((el,index)=>{
    el.style.transitionDelay = `${Math.min(index*90, 360)}ms`;
  });
});

// Smooth magnetic tilt for cards and hero image
function attachTilt(selector, maxTilt = 7){
  document.querySelectorAll(selector).forEach((card)=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - .5) * -maxTilt;
      const ry = ((x / r.width) - .5) * maxTilt;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
    });
  });
}
// Heavy card tilt disabled to keep scrolling smooth. CSS hover effects remain.
// attachTilt('.project-card, .about-showcase-card, .timeline-card, .education-card, .rail-card', 5);
// attachTilt('.image-ring', 8);

// Pointer based background light, very subtle
const root = document.documentElement;
// Global pointer glow disabled for smoother scrolling and lower CPU usage.

// Tiny lift on nav links, close to Framer micro-interaction
navItems.forEach((link)=>{
  link.addEventListener('mouseenter', ()=> link.style.transform = 'translateY(-2px)');
  link.addEventListener('mouseleave', ()=> link.style.transform = '');
});

// Local mirror highlight for glass elements
const glassTargets = document.querySelectorAll('.glass, .project-card, .timeline-card, .education-card, .offer-grid article, .achievement-grid article, .contact-form, .rail-card, .about-mini-card, .about-text-card');
glassTargets.forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--local-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--local-y', `${e.clientY - r.top}px`);
  }, { passive: true });
});
