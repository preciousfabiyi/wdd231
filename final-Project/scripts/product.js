// products.js — Product fetching, rendering, modal, filter/sort (ES Module)
import { formatPrice, renderStars, showToast, getCartFromStorage, saveCartToStorage, updateCartBadge } from './utils.js';

const UNSPLASH_IMGS = {
  'Skincare':    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=400&auto=format&fit=crop',
  'Body Care':   'https://images.unsplash.com/photo-1619451050621-83cb7aada2d7?q=80&w=400&auto=format&fit=crop',
  'Facial Care': 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=400&auto=format&fit=crop',
  'Nail Care':   'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop',
  'Hair Care':   'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=400&auto=format&fit=crop',
  'Lip Care':    'https://images.unsplash.com/photo-1586495777744-4e6232cf4f79?q=80&w=400&auto=format&fit=crop',
};

// Inline fallback data — used if fetch fails (e.g. file:// protocol)
const FALLBACK_PRODUCTS = [
  { id:1,  name:'Rose Glow Face Serum',       category:'Skincare',     price:4500,  rating:4.9, reviews:128, description:'A luxurious brightening serum infused with rose extract and vitamin C to reveal radiant, even-toned skin.',                     benefits:['Brightens skin tone','Reduces dark spots','Deep hydration'], inStock:true,  featured:true  },
  { id:2,  name:'Shea Butter Body Cream',     category:'Body Care',    price:3200,  rating:4.8, reviews:95,  description:'Rich, deeply moisturising body cream with pure shea butter and argan oil for silky-smooth skin.',                              benefits:['24hr moisture','Softens dry skin','Non-greasy'],             inStock:true,  featured:true  },
  { id:3,  name:'Luxury Nail Treatment Kit',  category:'Nail Care',    price:5800,  rating:4.7, reviews:64,  description:'Complete nail care kit with strengthening base coat, cuticle oil, and nourishing top coat.',                                    benefits:['Strengthens nails','Cuticle repair','Salon finish'],          inStock:true,  featured:false },
  { id:4,  name:'Charcoal Deep Cleanse Mask', category:'Facial Care',  price:2800,  rating:4.6, reviews:112, description:'Activated charcoal clay mask that draws out impurities and leaves skin fresh and mattified.',                                   benefits:['Unclogs pores','Reduces oiliness','Detoxifying'],             inStock:true,  featured:true  },
  { id:5,  name:'Vitamin C Brightening Toner',category:'Skincare',     price:2500,  rating:4.5, reviews:87,  description:'Alcohol-free toner with vitamin C and niacinamide to balance, brighten, and prep skin.',                                       benefits:['Balances pH','Brightens','Prep step'],                        inStock:true,  featured:false },
  { id:6,  name:'Peppermint Foot Scrub',      category:'Body Care',    price:1800,  rating:4.7, reviews:73,  description:'Refreshing exfoliating foot scrub with peppermint and sea salt to soften rough heels.',                                        benefits:['Exfoliates dead skin','Cools and refreshes','Softens heels'], inStock:true,  featured:false },
  { id:7,  name:'Hyaluronic Acid Moisturiser',category:'Skincare',     price:3900,  rating:4.9, reviews:156, description:'Lightweight gel-cream with triple-weight hyaluronic acid for plump, well-hydrated skin.',                                       benefits:['Plumps skin','Lightweight','All skin types'],                 inStock:true,  featured:true  },
  { id:8,  name:'Argan Oil Hair Serum',       category:'Hair Care',    price:3400,  rating:4.6, reviews:49,  description:'Pure Moroccan argan oil that tames frizz, adds shine, and nourishes damaged hair.',                                            benefits:['Eliminates frizz','Adds shine','Heat protection'],            inStock:true,  featured:false },
  { id:9,  name:'Turmeric Glow Face Wash',    category:'Facial Care',  price:2200,  rating:4.5, reviews:91,  description:'Gentle foaming cleanser with turmeric and papaya enzymes to brighten and fight blemishes.',                                    benefits:['Brightens complexion','Anti-blemish','Gentle formula'],       inStock:true,  featured:false },
  { id:10, name:'Lavender Bath Salts',        category:'Body Care',    price:1500,  rating:4.8, reviews:62,  description:'Himalayan pink salt bath soak infused with lavender essential oil for a relaxing bath experience.',                              benefits:['Relaxes muscles','Softens skin','Aromatherapy'],              inStock:true,  featured:false },
  { id:11, name:'SPF 50 Sunscreen Gel',       category:'Skincare',     price:3100,  rating:4.7, reviews:104, description:'Lightweight invisible sunscreen with SPF 50 protection and no white cast, suitable for all skin tones.',                        benefits:['Broad spectrum SPF50','No white cast','Daily wear'],          inStock:true,  featured:true  },
  { id:12, name:'Collagen Eye Cream',         category:'Skincare',     price:4200,  rating:4.6, reviews:38,  description:'Rich eye cream with marine collagen and caffeine to reduce puffiness and fine lines.',                                          benefits:['Reduces puffiness','Targets dark circles','Anti-ageing'],     inStock:true,  featured:false },
  { id:13, name:'Kojic Acid Soap',            category:'Body Care',    price:1200,  rating:4.4, reviews:200, description:'Skin-brightening kojic acid and glutathione soap that evens skin tone and fades dark spots.',                                   benefits:['Evens skin tone','Fades dark spots','Daily use'],             inStock:true,  featured:false },
  { id:14, name:'Retinol Night Cream',        category:'Skincare',     price:5200,  rating:4.8, reviews:77,  description:'Overnight renewal cream with 0.3% retinol and peptides to reduce wrinkles and firm skin.',                                      benefits:['Anti-wrinkle','Firms skin','Overnight repair'],               inStock:false, featured:false },
  { id:15, name:'Lip Plumping Gloss',         category:'Lip Care',     price:1400,  rating:4.3, reviews:55,  description:'Non-sticky lip gloss with hyaluronic acid and peppermint for fuller, hydrated lips.',                                          benefits:['Plumps lips','Long-lasting','Hydrating'],                     inStock:true,  featured:false },
  { id:16, name:'Exfoliating Body Scrub',     category:'Body Care',    price:2600,  rating:4.7, reviews:83,  description:'Sugar and coffee scrub that removes dead skin cells and leaves skin silky and glowing.',                                        benefits:['Full exfoliation','Improves circulation','Glowing skin'],     inStock:true,  featured:false },
  { id:17, name:'Aloe Vera After-Sun Gel',    category:'Skincare',     price:1900,  rating:4.5, reviews:66,  description:'Cooling 99% pure aloe vera gel that soothes sun-exposed skin and restores moisture.',                                          benefits:['Soothes sunburn','Cools skin','Restores moisture'],           inStock:true,  featured:false },
  { id:18, name:'Castor Oil Treatment',       category:'Hair Care',    price:2100,  rating:4.6, reviews:91,  description:'100% pure cold-pressed Jamaican black castor oil for hair growth and scalp moisture.',                                          benefits:['Promotes growth','Strengthens edges','Scalp moisture'],       inStock:true,  featured:false },
  { id:19, name:'Glow Bundle Set',            category:'Skincare',     price:12500, rating:4.9, reviews:43,  description:'Complete skincare set: cleanser, toner, serum, moisturiser, and SPF — everything for radiant skin.',                            benefits:['Full routine','Best value','Great gift'],                      inStock:true,  featured:true  },
  { id:20, name:'Rose Water Facial Mist',     category:'Skincare',     price:1700,  rating:4.4, reviews:120, description:'Pure Bulgarian rose water facial mist that refreshes, hydrates, and sets makeup all day.',                                      benefits:['Refreshes skin','Sets makeup','Calming scent'],               inStock:true,  featured:false },
];

let allProducts = [];
let activeFilter = 'All';
let activeSearch = '';
let activeSort   = 'default';

// ── FETCH PRODUCTS ──
export async function loadProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = `<p class="loading-msg">Loading products…</p>`;

  try {
    // Try multiple path variations to handle both local and GitHub Pages
    const paths = ['data/products.json', './data/products.json', '../final/data/products.json'];
    let data = null;

    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          data = await response.json();
          break;
        }
      } catch (e) {
        // try next path
      }
    }

    if (data && data.products && data.products.length > 0) {
      allProducts = data.products;
    } else {
      // Use inline fallback data — always works, no server needed
      allProducts = FALLBACK_PRODUCTS;
    }

    localStorage.setItem('fibe_product_count', allProducts.length);
    localStorage.setItem('fibe_last_loaded', new Date().toISOString());

    renderProducts();
    buildFilterButtons();

  } catch (error) {
    console.error('Fetch failed, using fallback data:', error);
    allProducts = FALLBACK_PRODUCTS;
    renderProducts();
    buildFilterButtons();
  }
}

// ── RENDER ──
function renderProducts() {
  const grid    = document.getElementById('products-grid');
  const countEl = document.getElementById('result-count');
  if (!grid) return;

  // filter() — by category and search text
  let filtered = allProducts.filter(p => {
    const matchCat    = activeFilter === 'All' || p.category === activeFilter;
    const matchSearch = p.name.toLowerCase().includes(activeSearch) ||
                        p.category.toLowerCase().includes(activeSearch) ||
                        p.description.toLowerCase().includes(activeSearch);
    return matchCat && matchSearch;
  });

  // sort()
  if (activeSort === 'price-asc')  filtered = filtered.slice().sort((a, b) => a.price - b.price);
  if (activeSort === 'price-desc') filtered = filtered.slice().sort((a, b) => b.price - a.price);
  if (activeSort === 'rating')     filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
  if (activeSort === 'name')       filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (countEl) countEl.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-results">No products match your search. Try a different filter.</p>`;
    return;
  }

  // map() with template literals — 4 data properties: name, category, price, rating
  grid.innerHTML = filtered.map(p => `
    <article class="product-card" data-id="${p.id}" role="button" tabindex="0"
             aria-label="View details for ${p.name}">
      <div class="product-img-wrap">
        <img
          src="${UNSPLASH_IMGS[p.category] || UNSPLASH_IMGS['Skincare']}"
          alt="${p.name} product image"
          loading="lazy"
          width="400" height="200">
        ${p.featured ? '<span class="featured-badge">Featured</span>' : ''}
        ${!p.inStock ? '<span class="oos-badge">Out of Stock</span>' : ''}
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          <span class="stars" aria-label="${p.rating} out of 5 stars">${renderStars(p.rating)}</span>
          <span class="rating-text">${p.rating} (${p.reviews})</span>
        </div>
        <p class="product-price">${formatPrice(p.price)}</p>
        <button class="product-btn"
                data-id="${p.id}"
                ${!p.inStock ? 'disabled aria-disabled="true"' : ''}
                aria-label="${p.inStock ? 'Add ' + p.name + ' to cart' : p.name + ' is out of stock'}">
          ${p.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>
  `).join('');

  // Attach card click → open modal
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.product-btn')) return;
      openModal(parseInt(card.dataset.id));
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(parseInt(card.dataset.id));
      }
    });
  });

  // Add to cart buttons
  grid.querySelectorAll('.product-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.id));
    });
  });
}

// ── FILTER BUTTONS ──
function buildFilterButtons() {
  const container = document.getElementById('filter-btns');
  if (!container) return;

  // reduce() — get unique categories
  const categories = allProducts.reduce((acc, p) => {
    if (!acc.includes(p.category)) acc.push(p.category);
    return acc;
  }, ['All']);

  container.innerHTML = categories.map(cat =>
    `<button class="filter-btn${cat === 'All' ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.cat;
      renderProducts();
    });
  });
}

// ── SEARCH & SORT ──
export function setupControls() {
  const searchInput = document.getElementById('product-search');
  const sortSelect  = document.getElementById('sort-select');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      activeSearch = searchInput.value.trim().toLowerCase();
      renderProducts();
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      renderProducts();
    });
  }
}

// ── MODAL ──
function openModal(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  const overlay = document.getElementById('product-modal');
  if (!overlay) return;

  overlay.querySelector('.modal-img').src              = UNSPLASH_IMGS[product.category] || UNSPLASH_IMGS['Skincare'];
  overlay.querySelector('.modal-img').alt              = product.name;
  overlay.querySelector('.modal-cat').textContent      = product.category;
  overlay.querySelector('.modal-name').textContent     = product.name;
  overlay.querySelector('.modal-desc').textContent     = product.description;
  overlay.querySelector('.modal-price').textContent    = formatPrice(product.price);
  overlay.querySelector('.modal-rating-text').textContent =
    `${renderStars(product.rating)} ${product.rating}/5 · ${product.reviews} reviews`;

  overlay.querySelector('.modal-benefits').innerHTML =
    product.benefits.map(b => `<span class="benefit-tag">${b}</span>`).join('');

  const addBtn = overlay.querySelector('.modal-add-btn');
  if (addBtn) {
    addBtn.disabled     = !product.inStock;
    addBtn.textContent  = product.inStock ? 'Add to Cart' : 'Out of Stock';
    addBtn.onclick = () => { addToCart(product.id); closeModal(); };
  }

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

export function setupModal() {
  const overlay = document.getElementById('product-modal');
  if (!overlay) return;
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// ── CART ──
function addToCart(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product || !product.inStock) return;
  const cart = getCartFromStorage();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCartToStorage(cart);
  updateCartBadge();
  showToast(`${product.name} added to cart ✓`);
}
