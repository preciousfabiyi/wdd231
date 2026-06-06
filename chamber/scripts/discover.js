import { places } from '../data/places.mjs';
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
// VISIT TRACKING — localStorage
// =============================================
function displayVisitMessage() {
  const msgEl = document.getElementById('visit-message');
  if (!msgEl) return;

  const now = Date.now();
  const lastVisit = localStorage.getItem('chamberLastVisit');

  if (!lastVisit) {
    // First visit ever
    msgEl.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSince = Math.floor((now - Number(lastVisit)) / msPerDay);

    if (daysSince < 1) {
      msgEl.textContent = 'Back so soon! Awesome!';
    } else if (daysSince === 1) {
      msgEl.textContent = 'You last visited 1 day ago.';
    } else {
      msgEl.textContent = `You last visited ${daysSince} days ago.`;
    }
  }

  // Store current visit time
  localStorage.setItem('chamberLastVisit', now);
}

displayVisitMessage();

// =============================================
// BUILD PLACE CARDS FROM JSON
// =============================================
function buildCards() {
  const grid = document.getElementById('places-grid');
  if (!grid) return;

  places.forEach((place, index) => {
    const card = document.createElement('article');
    card.classList.add('place-card');
    card.setAttribute('data-index', index + 1);

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img
          src="${place.image}"
          alt="${place.alt}"
          loading="lazy"
          width="300"
          height="200"
          onerror="this.src='images/placeholder.webp'">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button" aria-label="Learn more about ${place.name}">Learn More</button>
    `;

    grid.appendChild(card);
  });
}

buildCards();
