// contact.js — Contact page script (ES Module)
import { setupHamburger, updateCartBadge, showToast } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  setupHamburger();
  updateCartBadge();
  setupPreferences();
  setupFormValidation();
  setDateMin();
});

// Set date minimum to today
function setDateMin() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// Restore saved service preference from localStorage
function setupPreferences() {
  const savedService = localStorage.getItem('fibe_preferred_service');
  const serviceSelect = document.getElementById('service');
  if (savedService && serviceSelect) {
    serviceSelect.value = savedService;
  }
  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      localStorage.setItem('fibe_preferred_service', serviceSelect.value);
    });
  }
}

// JS form validation with visible error messages
function setupFormValidation() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Show inline error on blur
  form.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearError(field));
  });

  form.addEventListener('submit', (e) => {
    let valid = true;
    form.querySelectorAll('input[required], select[required]').forEach(field => {
      if (!validateField(field)) valid = false;
    });
    if (!valid) {
      e.preventDefault();
      showToast('Please fill in all required fields.');
      // Focus first invalid field
      const first = form.querySelector('.field-error');
      if (first) first.previousElementSibling?.focus() || first.focus();
    }
  });
}

function validateField(field) {
  clearError(field);
  if (!field.value.trim()) {
    showError(field, `${field.labels[0]?.textContent.replace('*','').trim() || 'This field'} is required.`);
    return false;
  }
  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    showError(field, 'Please enter a valid email address.');
    return false;
  }
  return true;
}

function showError(field, message) {
  field.classList.add('input-error');
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = message;
  err.setAttribute('role', 'alert');
  field.parentNode.appendChild(err);
}

function clearError(field) {
  field.classList.remove('input-error');
  const existing = field.parentNode.querySelector('.field-error');
  if (existing) existing.remove();
}
