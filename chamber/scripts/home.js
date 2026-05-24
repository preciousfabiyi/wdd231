// =============================================
// Lagos Chamber of Commerce - Home Page Scripts
// =============================================

// ---- Dynamic Year & Last Modified ----
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
  `Last Modified: ${document.lastModified}`;

// ---- Hamburger Menu Toggle ----
const menuBtn = document.getElementById('menu');
const nav = document.querySelector('.navigation');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  nav.classList.toggle('open');
});

// =============================================
// WEATHER  — OpenWeatherMap API
// Lagos, Nigeria: lat 6.5244, lon 3.3792
// =============================================
const LAT = 6.5244;
const LON = 3.3792;
// NOTE: Replace with your actual OpenWeatherMap API key
const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5';

async function fetchWeather() {
  try {
    // Current weather
    const currentRes = await fetch(
      `${WEATHER_BASE}/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`
    );
    if (!currentRes.ok) throw new Error('Weather fetch failed');
    const current = await currentRes.json();

    // 5-day / 3-hour forecast (free tier)
    const forecastRes = await fetch(
      `${WEATHER_BASE}/forecast?lat=${LAT}&lon=${LON}&units=metric&cnt=24&appid=${WEATHER_API_KEY}`
    );
    if (!forecastRes.ok) throw new Error('Forecast fetch failed');
    const forecastData = await forecastRes.json();

    displayCurrentWeather(current);
    displayForecast(forecastData);

  } catch (err) {
    // Graceful fallback with simulated data when no API key
    console.warn('Weather API not available. Showing sample data.', err.message);
    displaySampleWeather();
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;
  const humidity = data.main.humidity;
  const feelsLike = Math.round(data.main.feels_like);

  document.getElementById('current-temp').innerHTML =
    `${temp}°C <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" class="weather-icon">`;
  document.getElementById('weather-desc').textContent =
    desc.charAt(0).toUpperCase() + desc.slice(1);
  document.getElementById('weather-feels').textContent = `Feels like: ${feelsLike}°C`;
  document.getElementById('weather-humidity').textContent = `Humidity: ${humidity}%`;
}

function displayForecast(data) {
  const forecastEl = document.getElementById('forecast');
  forecastEl.innerHTML = '';

  // Pick one reading per day (noon-ish) for the next 3 days
  const days = {};
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' });
    const hour = date.getHours();
    if (!days[dateKey] && hour >= 11 && hour <= 14) {
      days[dateKey] = item;
    }
  });

  // Fallback: just take first 3 unique days if no noon found
  if (Object.keys(days).length < 3) {
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' });
      if (!days[dateKey]) days[dateKey] = item;
    });
  }

  const dayEntries = Object.entries(days).slice(0, 3);

  dayEntries.forEach(([label, item]) => {
    const high = Math.round(item.main.temp_max);
    const low = Math.round(item.main.temp_min);
    const icon = item.weather[0].icon;
    const desc = item.weather[0].description;

    const div = document.createElement('div');
    div.classList.add('forecast-day');
    div.innerHTML = `
      <span class="forecast-label">${label}</span>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" class="forecast-icon">
      <span class="forecast-temp"><strong>${high}°</strong> / ${low}°C</span>
    `;
    forecastEl.appendChild(div);
  });
}

function displaySampleWeather() {
  // Sample Lagos weather data for development/demo
  document.getElementById('current-temp').textContent = '32°C';
  document.getElementById('weather-desc').textContent = 'Partly cloudy with chance of rain';
  document.getElementById('weather-feels').textContent = 'Feels like: 36°C';
  document.getElementById('weather-humidity').textContent = 'Humidity: 78%';

  const forecastEl = document.getElementById('forecast');
  forecastEl.innerHTML = '';

  const sampleDays = [
    { label: 'Mon, May 25', high: 33, low: 26, icon: '04d', desc: 'Cloudy' },
    { label: 'Tue, May 26', high: 30, low: 25, icon: '10d', desc: 'Rain showers' },
    { label: 'Wed, May 27', high: 34, low: 27, icon: '01d', desc: 'Sunny' },
  ];

  sampleDays.forEach(day => {
    const div = document.createElement('div');
    div.classList.add('forecast-day');
    div.innerHTML = `
      <span class="forecast-label">${day.label}</span>
      <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.desc}" class="forecast-icon">
      <span class="forecast-temp"><strong>${day.high}°</strong> / ${day.low}°C</span>
    `;
    forecastEl.appendChild(div);
  });
}

// =============================================
// BUSINESS SPOTLIGHTS — Fetch from JSON
// =============================================
async function loadSpotlights() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Members JSON fetch failed');
    const data = await res.json();

    // Filter: only Gold or Silver members (string membership field)
    const eligible = data.members.filter(m =>
      m.membership === 'Gold' || m.membership === 'Silver'
    );

    // Shuffle randomly
    const shuffled = eligible.sort(() => Math.random() - 0.5);

    // Pick 2 or 3 (use all if fewer than 3 eligible)
    const count = Math.min(eligible.length >= 3 ? (Math.random() < 0.5 ? 2 : 3) : eligible.length, eligible.length);
    const selected = shuffled.slice(0, count);

    displaySpotlights(selected);
  } catch (err) {
    console.error('Could not load spotlights:', err);
  }
}

function getMembershipLabel(level) {
  if (level === 'Gold')   return { label: 'Gold Member',   cls: 'gold' };
  if (level === 'Silver') return { label: 'Silver Member', cls: 'silver' };
  return { label: 'Member', cls: '' };
}

function displaySpotlights(members) {
  const container = document.getElementById('spotlight-container');
  container.innerHTML = '';

  members.forEach(member => {
    const { label, cls } = getMembershipLabel(member.membership);

    const card = document.createElement('article');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <div class="membership-badge ${cls}">${label}</div>
      <img src="${member.image}" alt="${member.name} logo" loading="lazy"
           onerror="this.src='images/placeholder-logo.png'">
      <h3>${member.name}</h3>
      <p class="spotlight-phone">
        <span aria-label="Phone">📞</span>
        <a href="tel:${member.phone}">${member.phone}</a>
      </p>
      <p class="spotlight-address">
        <span aria-label="Address">📍</span> ${member.address}
      </p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer"
         class="spotlight-link">Visit Website</a>
    `;

    container.appendChild(card);
  });
}

// =============================================
// INIT
// =============================================
fetchWeather();
loadSpotlights();
