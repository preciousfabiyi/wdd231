// contact.js — Contact page script (ES Module)
import { setupHamburger, updateCartBadge, showToast } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  setupHamburger();
  updateCartBadge();
  setupPreferences();
});

function setupPreferences() {
  // Restore saved preference from localStorage
  const savedService = localStorage.getItem('fibe_preferred_service');
  const serviceSelect = document.getElementById('service');
  if (savedService && serviceSelect) {
    serviceSelect.value = savedService;
  }
  // Save selection as preference
  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      localStorage.setItem('fibe_preferred_service', serviceSelect.value);
    });
  }
}
