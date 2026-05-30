/**
 * thankyou.js
 * Reads the query parameters appended by the form (method="get")
 * and populates the application summary section on thankyou.html.
 */

// Human-readable labels for membership level option values
const MEMBERSHIP_LABELS = {
  np:     'NP Membership (Non-Profit — No Fee)',
  bronze: 'Bronze Membership',
  silver: 'Silver Membership',
  gold:   'Gold Membership',
};

document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);

  // Helper: get param or return fallback text
  function getParam(key, fallback = 'Not provided') {
    const val = params.get(key);
    return (val && val.trim() !== '') ? val.trim() : fallback;
  }

  // ── Populate each summary field ──────────────────────────────
  setField('out-first-name',   getParam('firstName'));
  setField('out-last-name',    getParam('lastName'));
  setField('out-email',        getParam('email'));
  setField('out-mobile',       getParam('mobile'));
  setField('out-business-name',getParam('businessName'));

  // Membership: map value → readable label
  const rawLevel = params.get('membershipLevel') ?? '';
  setField('out-membership', MEMBERSHIP_LABELS[rawLevel] ?? rawLevel || 'Not selected');

  // Timestamp: format the ISO string into a readable local date/time
  const rawTs = params.get('timestamp');
  if (rawTs) {
    try {
      const d = new Date(rawTs);
      const formatted = d.toLocaleString('en-ZA', {
        year:   'numeric',
        month:  'long',
        day:    'numeric',
        hour:   '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setField('out-timestamp', formatted);
    } catch {
      setField('out-timestamp', rawTs);
    }
  } else {
    setField('out-timestamp', 'Not recorded');
  }

  // Personalise the headline if we have a first name
  const firstName = params.get('firstName');
  if (firstName) {
    const headline = document.querySelector('.thankyou-headline');
    if (headline) {
      headline.textContent = `Thank you, ${firstName.trim()}!`;
    }
  }

});

function setField(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
