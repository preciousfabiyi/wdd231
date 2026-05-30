// =============================================
// Lagos Chamber — Join & Thank You Page Scripts
// =============================================

// ---- Dynamic Year & Last Modified ----
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = `Last Modified: ${document.lastModified}`;

// ---- Hamburger Menu ----
const menuBtn = document.getElementById('menu');
const nav = document.querySelector('.navigation');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
  });
}

// =============================================
// JOIN PAGE
// =============================================

// ---- Set hidden timestamp when form loads ----
const timestampField = document.getElementById('timestamp');
if (timestampField) {
  const now = new Date();
  timestampField.value = now.toLocaleString('en-NG', {
    year:   'numeric',
    month:  'long',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// ---- Modal logic ----
const infoButtons = document.querySelectorAll('.mem-info-btn');
const closeButtons = document.querySelectorAll('.modal-close');
const selectButtons = document.querySelectorAll('.modal-select-btn');
const membershipSelect = document.getElementById('membership');

// Open modal when "Learn More" clicked
infoButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) modal.showModal();
  });
});

// Close modal via × button
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('dialog');
    if (modal) modal.close();
  });
});

// Close modal when clicking the backdrop
document.querySelectorAll('dialog').forEach(modal => {
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const clickedOutside =
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom;
    if (clickedOutside) modal.close();
  });
});

// "Select X Membership" button inside modal → sets the select field & closes modal
selectButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const level = btn.getAttribute('data-level');
    if (membershipSelect && level) {
      membershipSelect.value = level;
    }
    const modal = btn.closest('dialog');
    if (modal) modal.close();
  });
});

// Close any open modal with Escape (browsers do this natively for <dialog>,
// but we also update aria-expanded if needed)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('dialog[open]').forEach(m => m.close());
  }
});

// =============================================
// THANK YOU PAGE — read URL params & display
// =============================================
function getMembershipLabel(value) {
  const labels = {
    np:     'NP Membership (Non-Profit — No Fee)',
    bronze: 'Bronze Membership',
    silver: 'Silver Membership',
    gold:   'Gold Membership',
  };
  return labels[value] || value;
}

function populateThankyou() {
  const params = new URLSearchParams(window.location.search);

  const fields = {
    'out-fname':      params.get('fname'),
    'out-lname':      params.get('lname'),
    'out-email':      params.get('email'),
    'out-phone':      params.get('phone'),
    'out-org':        params.get('org-name'),
    'out-membership': getMembershipLabel(params.get('membership')),
    'out-timestamp':  params.get('timestamp'),
  };

  Object.entries(fields).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || '—';
  });
}

// Only run on thankyou page
if (window.location.pathname.includes('thankyou')) {
  populateThankyou();
}
