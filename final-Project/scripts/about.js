// about.js — About page script (ES Module)
import { setupHamburger, updateCartBadge } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  setupHamburger();
  updateCartBadge();
});
