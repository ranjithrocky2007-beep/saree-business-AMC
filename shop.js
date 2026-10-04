/**
 * Azhagu Mayil Collection - Shop Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  renderShopProducts();

  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    searchInput.addEventListener('input', renderShopProducts);
  }

  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', renderShopProducts);
  }

  const sortFilter = document.getElementById('sort-filter');
  if (sortFilter) {
    sortFilter.addEventListener('change', renderShopProducts);
  }
});

function renderShopProducts() {
  const container = document.getElementById('shop-products-container');
  if (!container) return;

  const products = getStoredProducts();
  const search = document.getElementById('shop-search')?.value.toLowerCase() || '';
  const category = document.getElementById('category-filter')?.value || 'all';
  const sort = document.getElementById('sort-filter')?.value || 'featured';

  let filtered = products.filter(p => {
    if (category !== 'all' && p.categorySlug !== category) return false;
    if (search && !p.name.toLowerCase().includes(search) && !p.material.toLowerCase().includes(search)) return false;
    return true;
  });

  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  const countEl = document.getElementById('product-count');
  if (countEl) countEl.textContent = `${filtered.length} Sarees`;

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 3rem;">
      <p style="font-size: 1.1rem; color: #500B1A; font-weight: 600;">No sarees found</p>
      <p style="color: #666; font-size: 0.85rem;">Try changing your search or category filters.</p>
    </div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card">
      <span class="discount-tag">${p.discountPercent}% Off</span>
      <button class="wishlist-btn-card" data-wishlist-id="${p.id}" onclick="toggleWishlist('${p.id}')">♥</button>
      <div class="card-img-wrap" onclick="window.location.href='product.html?id=${p.id}'" style="cursor:pointer;">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="card-body">
        <div>
          <div class="card-meta">
            <span>${p.category}</span>
            <span>⭐ ${p.rating} (${p.reviewCount})</span>
          </div>
          <h3 class="card-title" onclick="window.location.href='product.html?id=${p.id}'" style="cursor:pointer;">${p.name}</h3>
          <div class="card-prices">
            <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="btn-card-cart" onclick="addToCart('${p.id}', 1)">Add to Bag</button>
          <button class="btn-card-buy" onclick="addToCart('${p.id}', 1); window.location.href='checkout.html';">Buy Now</button>
        </div>
      </div>
    </div>
  `).join('');

  updateWishlistButtons();
}
