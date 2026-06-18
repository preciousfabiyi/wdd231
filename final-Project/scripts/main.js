
// main.js — Fife Beauty Hub & Spa (single file, no modules needed)
// Works on file://, localhost, and GitHub Pages

// ── ALL PRODUCT DATA ──
const PRODUCTS = [
  { id:1,  name:'Rose Glow Face Serum',        category:'Skincare',    price:4500,  rating:4.9, reviews:128, description:'A luxurious brightening serum infused with rose extract and vitamin C to reveal radiant, even-toned skin.',             benefits:['Brightens skin tone','Reduces dark spots','Deep hydration'], inStock:true,  featured:true  },
  { id:2,  name:'Shea Butter Body Cream',      category:'Body Care',   price:3200,  rating:4.8, reviews:95,  description:'Rich, deeply moisturising body cream with pure shea butter and argan oil for silky-smooth skin.',                     benefits:['24hr moisture','Softens dry skin','Non-greasy'],             inStock:true,  featured:true  },
  { id:3,  name:'Luxury Nail Treatment Kit',   category:'Nail Care',   price:5800,  rating:4.7, reviews:64,  description:'Complete nail care kit with strengthening base coat, cuticle oil, and nourishing top coat.',                          benefits:['Strengthens nails','Cuticle repair','Salon finish'],          inStock:true,  featured:false },
  { id:4,  name:'Charcoal Deep Cleanse Mask',  category:'Facial Care', price:2800,  rating:4.6, reviews:112, description:'Activated charcoal clay mask that draws out impurities and leaves skin fresh and mattified.',                        benefits:['Unclogs pores','Reduces oiliness','Detoxifying'],             inStock:true,  featured:true  },
  { id:5,  name:'Vitamin C Brightening Toner', category:'Skincare',    price:2500,  rating:4.5, reviews:87,  description:'Alcohol-free toner with vitamin C and niacinamide to balance, brighten, and prep skin.',                             benefits:['Balances pH','Brightens','Prep step'],                        inStock:true,  featured:false },
  { id:6,  name:'Peppermint Foot Scrub',       category:'Body Care',   price:1800,  rating:4.7, reviews:73,  description:'Refreshing exfoliating foot scrub with peppermint and sea salt to soften rough heels.',                             benefits:['Exfoliates dead skin','Cools and refreshes','Softens heels'], inStock:true,  featured:false },
  { id:7,  name:'Hyaluronic Acid Moisturiser', category:'Skincare',    price:3900,  rating:4.9, reviews:156, description:'Lightweight gel-cream with triple-weight hyaluronic acid for plump, well-hydrated skin.',                            benefits:['Plumps skin','Lightweight','All skin types'],                 inStock:true,  featured:true  },
  { id:8,  name:'Argan Oil Hair Serum',        category:'Hair Care',   price:3400,  rating:4.6, reviews:49,  description:'Pure Moroccan argan oil that tames frizz, adds shine, and nourishes damaged hair.',                                 benefits:['Eliminates frizz','Adds shine','Heat protection'],            inStock:true,  featured:false },
  { id:9,  name:'Turmeric Glow Face Wash',     category:'Facial Care', price:2200,  rating:4.5, reviews:91,  description:'Gentle foaming cleanser with turmeric and papaya enzymes to brighten and fight blemishes.',                         benefits:['Brightens complexion','Anti-blemish','Gentle formula'],       inStock:true,  featured:false },
  { id:10, name:'Lavender Bath Salts',         category:'Body Care',   price:1500,  rating:4.8, reviews:62,  description:'Himalayan pink salt bath soak infused with lavender essential oil for a relaxing bath experience.',                  benefits:['Relaxes muscles','Softens skin','Aromatherapy'],              inStock:true,  featured:false },
  { id:11, name:'SPF 50 Sunscreen Gel',        category:'Skincare',    price:3100,  rating:4.7, reviews:104, description:'Lightweight invisible sunscreen with SPF 50 protection and no white cast, suitable for all skin tones.',              benefits:['Broad spectrum SPF50','No white cast','Daily wear'],          inStock:true,  featured:true  },
  { id:12, name:'Collagen Eye Cream',          category:'Skincare',    price:4200,  rating:4.6, reviews:38,  description:'Rich eye cream with marine collagen and caffeine to reduce puffiness and fine lines.',                               benefits:['Reduces puffiness','Targets dark circles','Anti-ageing'],     inStock:true,  featured:false },
  { id:13, name:'Kojic Acid Soap',             category:'Body Care',   price:1200,  rating:4.4, reviews:200, description:'Skin-brightening kojic acid and glutathione soap that evens skin tone and fades dark spots.',                        benefits:['Evens skin tone','Fades dark spots','Daily use'],             inStock:true,  featured:false },
  { id:14, name:'Retinol Night Cream',         category:'Skincare',    price:5200,  rating:4.8, reviews:77,  description:'Overnight renewal cream with 0.3% retinol and peptides to reduce wrinkles and firm skin.',                          benefits:['Anti-wrinkle','Firms skin','Overnight repair'],               inStock:false, featured:false },
  { id:15, name:'Lip Plumping Gloss',          category:'Lip Care',    price:1400,  rating:4.3, reviews:55,  description:'Non-sticky lip gloss with hyaluronic acid and peppermint for fuller, hydrated lips.',                               benefits:['Plumps lips','Long-lasting','Hydrating'],                     inStock:true,  featured:false },
  { id:16, name:'Exfoliating Body Scrub',      category:'Body Care',   price:2600,  rating:4.7, reviews:83,  description:'Sugar and coffee scrub that removes dead skin cells and leaves skin silky and radiant.',                            benefits:['Full exfoliation','Improves circulation','Glowing skin'],     inStock:true,  featured:false },
  { id:17, name:'Aloe Vera After-Sun Gel',     category:'Skincare',    price:1900,  rating:4.5, reviews:66,  description:'Cooling 99% pure aloe vera gel that soothes sun-exposed skin and restores moisture.',                               benefits:['Soothes sunburn','Cools skin','Restores moisture'],           inStock:true,  featured:false },
  { id:18, name:'Castor Oil Treatment',        category:'Hair Care',   price:2100,  rating:4.6, reviews:91,  description:'100% pure cold-pressed Jamaican black castor oil for hair growth and scalp moisture.',                               benefits:['Promotes growth','Strengthens edges','Scalp moisture'],       inStock:true,  featured:false },
  { id:19, name:'Glow Bundle Set',             category:'Skincare',    price:12500, rating:4.9, reviews:43,  description:'Complete skincare set: cleanser, toner, serum, moisturiser, and SPF — everything for radiant skin.',                 benefits:['Full routine','Best value','Great gift'],                      inStock:true,  featured:true  },
  { id:20, name:'Rose Water Facial Mist',      category:'Skincare',    price:1700,  rating:4.4, reviews:120, description:'Pure Bulgarian rose water mist that refreshes, hydrates, and sets makeup all day.',                                  benefits:['Refreshes skin','Sets makeup','Calming scent'],               inStock:true,  featured:false }
];

// Per-product local image paths — add your photos to the images/ folder
const PRODUCT_IMGS = {
  1:  'images/product1.jpeg',        // Rose Glow Face Serum
  2:  'images/product2.jpeg',   // Shea Butter Body Cream
  3:  'images/product3.jpeg',     // Luxury Nail Treatment Kit
  4:  'images/product4.jpeg',    // Charcoal Deep Cleanse Mask
  5:  'images/product5.jpeg',        // Vitamin C Brightening Toner
  6:  'images/product6.jpeg',   // Peppermint Foot Scrub
  7:  'images/product7.jpeg',  // Hyaluronic Acid Moisturiser
  8:  'images/product8.jpeg',   // Argan Oil Hair Serum
  9:  'images/product9.jpeg',    // Turmeric Glow Face Wash
  10: 'images/product10.jpeg',   // Lavender Bath Salts
  11: 'images/product11.jpeg',    // SPF 50 Sunscreen Gel
  12: 'images/product12.jpeg',    // Collagen Eye Cream
  13: 'images/product13.jpeg',         // Kojic Acid Soap
  14: 'images/product14.jpeg',  // Retinol Night Cream
  15: 'images/product15.jpeg',    // Lip Plumping Gloss
  16: 'images/product16.jpeg',   // Exfoliating Body Scrub
  17: 'images/product17.jpeg',     // Aloe Vera After-Sun Gel
  18: 'images/product18.jpeg',   // Castor Oil Treatment
  19: 'images/product19.jpeg',       // Glow Bundle Set
  20: 'images/product20.jpeg',    // Rose Water Facial Mist
};
function getImg(p) { return PRODUCT_IMGS[p.id] || 'images/placeholder.jpg'; }

// ── STATE ──
let allProducts  = [];
let activeFilter = 'All';
let activeSearch = '';
let activeSort   = 'default';
let cart         = [];

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  setupHamburger();
  loadCartFromStorage();
  updateCartBadge();
  initProducts();
  setupNewsletter();
  setupModal();
  setFooterYear();
});

// ── HAMBURGER ──
function setupHamburger() {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('header nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

// ── PRODUCTS — uses Fetch API with try/catch, falls back to inline data ──
async function initProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = '<p class="loading-msg">Loading products…</p>';

  try {
    const response = await fetch('./data/products.json');
    if (!response.ok) throw new Error('Network response not ok');
    const data = await response.json();
    if (!data.products || data.products.length === 0) throw new Error('Empty data');
    allProducts = data.products;
    console.log('Products loaded from JSON file:', allProducts.length);
  } catch (err) {
    // Fetch failed — use embedded data (works on file:// and any server)
    console.warn('JSON fetch failed, using embedded data:', err.message);
    allProducts = PRODUCTS;
  }

  // Save to localStorage
  localStorage.setItem('fibe_product_count', allProducts.length);
  localStorage.setItem('fibe_last_loaded', new Date().toISOString());

  buildFilters();
  renderProducts();
}

// ── RENDER PRODUCTS ──
function renderProducts() {
  const grid    = document.getElementById('products-grid');
  const countEl = document.getElementById('result-count');
  if (!grid) return;

  // filter() array method
  let list = allProducts.filter(p => {
    const catMatch    = activeFilter === 'All' || p.category === activeFilter;
    const searchMatch = activeSearch === '' ||
      p.name.toLowerCase().includes(activeSearch) ||
      p.category.toLowerCase().includes(activeSearch);
    return catMatch && searchMatch;
  });

  // sort()
  if (activeSort === 'price-asc')  list = list.slice().sort((a, b) => a.price - b.price);
  if (activeSort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);
  if (activeSort === 'rating')     list = list.slice().sort((a, b) => b.rating - a.rating);
  if (activeSort === 'name')       list = list.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (countEl) countEl.textContent = `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results">No products match your search.</p>';
    return;
  }

  // map() + template literals
  grid.innerHTML = list.map(p => `
    <article class="product-card" data-id="${p.id}" tabindex="0" role="button"
             aria-label="View details for ${p.name}">
      <div class="product-img-wrap">
        <img src="${getImg(p)}"
             alt="${p.name}"
             loading="lazy" width="400" height="200">
        ${p.featured ? '<span class="featured-badge">Featured</span>' : ''}
        ${!p.inStock ? '<span class="oos-badge">Out of Stock</span>' : ''}
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          <span class="stars" aria-label="${p.rating} stars">${stars(p.rating)}</span>
          <span class="rating-text">${p.rating} (${p.reviews})</span>
        </div>
        <p class="product-price">${price(p.price)}</p>
        <button class="product-btn" data-id="${p.id}"
          ${!p.inStock ? 'disabled aria-disabled="true"' : ''}
          aria-label="${p.inStock ? 'Add ' + p.name + ' to cart' : 'Out of stock'}">
          ${p.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>`).join('');

  // Events on cards
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.closest('.product-btn')) openModal(+card.dataset.id);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(+card.dataset.id); }
    });
  });

  grid.querySelectorAll('.product-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); addToCart(+btn.dataset.id); });
  });
}

// ── FILTER BUTTONS ──
function buildFilters() {
  const wrap = document.getElementById('filter-btns');
  if (!wrap) return;

  // reduce() — unique categories
  const cats = allProducts.reduce((acc, p) => {
    if (!acc.includes(p.category)) acc.push(p.category);
    return acc;
  }, ['All']);

  wrap.innerHTML = cats.map(c =>
    `<button class="filter-btn${c === 'All' ? ' active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');

  wrap.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.cat;
      renderProducts();
    });
  });

  // Search
  const search = document.getElementById('product-search');
  if (search) search.addEventListener('input', () => {
    activeSearch = search.value.trim().toLowerCase();
    renderProducts();
  });

  // Sort
  const sort = document.getElementById('sort-select');
  if (sort) sort.addEventListener('change', () => {
    activeSort = sort.value;
    renderProducts();
  });
}

// ── MODAL ──
function openModal(id) {
  const p = allProducts.find(p => p.id === id);
  const overlay = document.getElementById('product-modal');
  if (!p || !overlay) return;

  overlay.querySelector('.modal-img').src              = getImg(p);
  overlay.querySelector('.modal-img').alt              = p.name;
  overlay.querySelector('.modal-cat').textContent      = p.category;
  overlay.querySelector('.modal-name').textContent     = p.name;
  overlay.querySelector('.modal-desc').textContent     = p.description;
  overlay.querySelector('.modal-price').textContent    = price(p.price);
  overlay.querySelector('.modal-rating-text').textContent = `${stars(p.rating)} ${p.rating}/5 · ${p.reviews} reviews`;
  overlay.querySelector('.modal-benefits').innerHTML   = p.benefits.map(b => `<span class="benefit-tag">${b}</span>`).join('');

  const btn = overlay.querySelector('.modal-add-btn');
  btn.disabled   = !p.inStock;
  btn.textContent = p.inStock ? 'Add to Cart' : 'Out of Stock';
  btn.onclick    = () => { addToCart(p.id); closeModal(); };

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  overlay.querySelector('.modal-close').focus();
}

function closeModal() {
  const overlay = document.getElementById('product-modal');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setupModal() {
  const overlay = document.getElementById('product-modal');
  if (!overlay) return;
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ── CART ──
function loadCartFromStorage() {
  try { cart = JSON.parse(localStorage.getItem('fibe_cart') || '[]'); } catch { cart = []; }
}
function saveCart() {
  localStorage.setItem('fibe_cart', JSON.stringify(cart));
}
function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'grid' : 'none';
  });
}
function addToCart(id) {
  const p = allProducts.find(p => p.id === id);
  if (!p || !p.inStock) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  saveCart();
  updateCartBadge();
  showToast(`${p.name} added to cart ✓`);
}

// ── NEWSLETTER ──
function setupNewsletter() {
  const form = document.getElementById('newsletter-form');
  const msg  = document.getElementById('newsletter-msg');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email) return;
    const subs = JSON.parse(localStorage.getItem('fibe_subscribers') || '[]');
    if (!subs.includes(email)) { subs.push(email); localStorage.setItem('fibe_subscribers', JSON.stringify(subs)); }
    if (msg) msg.textContent = 'Thank you for subscribing! ✓';
    form.reset();
    setTimeout(() => { if (msg) msg.textContent = ''; }, 4000);
  });
}

// ── UTILS ──
function price(n) { return `₦${Number(n).toLocaleString('en-NG')}`; }
function stars(r) { return '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r)); }
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
function setFooterYear() {
  document.querySelectorAll('#footer-year').forEach(el => el.textContent = new Date().getFullYear());
}
