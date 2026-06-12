// utils.js — shared utility functions (ES Module)

export function formatPrice(amount) {
  return `₦${Number(amount).toLocaleString('en-NG')}`;
}

export function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

export function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

export function getCartFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('fibeCartItems') || '[]');
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart) {
  localStorage.setItem('fibeCartItems', JSON.stringify(cart));
}

export function updateCartBadge() {
  const cart = getCartFromStorage();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'grid' : 'none';
  });
}

export function setupHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('header nav');
  if (!hamburger || !nav) return;
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
  // Close on nav link click (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}
