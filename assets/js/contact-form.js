// Contact form: client-side validation only. No network request, no storage —
// on valid submit we just show a success toast and reset the form, per spec.
export function initContactForm(){
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (!form) return;

  const fields = {
    name: { input: document.getElementById('cf-name'), error: document.getElementById('cf-name-error') },
    email: { input: document.getElementById('cf-email'), error: document.getElementById('cf-email-error') },
    subject: { input: document.getElementById('cf-subject'), error: document.getElementById('cf-subject-error') },
    message: { input: document.getElementById('cf-message'), error: document.getElementById('cf-message-error') },
  };

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let submitted = false;

  function validateField(key){
    const { input, error } = fields[key];
    const value = input.value.trim();
    let message = '';
    if (key === 'email'){
      if (!value) message = 'Please enter a valid email address.';
      else if (!emailRe.test(value)) message = 'Please enter a valid email address.';
    } else if (!value){
      message = key === 'name' ? 'Please enter your name.'
        : key === 'subject' ? 'Please enter a subject.'
        : 'Please write a message.';
    }
    error.textContent = message;
    return !message;
  }

  function validate(){
    return Object.keys(fields).map(validateField).every(Boolean);
  }

  let toastTimer = null;
  function showToast(message){
    toastMessage.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4000);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitted = true;
    if (!validate()) return;
    // Front-end only by design: no fetch/XHR, nothing is stored or transmitted.
    showToast(`Thanks, ${fields.name.input.value.trim().split(' ')[0]}! Your message has been sent.`);
    form.reset();
    submitted = false;
    Object.values(fields).forEach(({ error }) => { error.textContent = ''; });
  });

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener('input', () => {
      if (submitted) validateField(key);
    });
  });
}
