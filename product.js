/**
 * Azhagu Mayil Collection - Single Product Details Loader
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'prod-1';
  const products = getStoredProducts();
  const product = products.find(p => p.id === productId) || products[0];

  const titleEl = document.getElementById('pdp-title');
  if (titleEl) titleEl.textContent = product.name;

  const priceEl = document.getElementById('pdp-price');
  if (priceEl) priceEl.textContent = `₹${product.price.toLocaleString('en-IN')}`;

  const origPriceEl = document.getElementById('pdp-original-price');
  if (origPriceEl) origPriceEl.textContent = `₹${product.originalPrice.toLocaleString('en-IN')}`;

  const descEl = document.getElementById('pdp-desc');
  if (descEl) descEl.textContent = product.description;

  const matEl = document.getElementById('pdp-material');
  if (matEl) matEl.textContent = product.material;

  const colorEl = document.getElementById('pdp-color');
  if (colorEl) colorEl.textContent = product.color;

  const imgEl = document.getElementById('pdp-main-img');
  if (imgEl) imgEl.src = product.image;

  const addToCartBtn = document.getElementById('pdp-add-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('pdp-qty')?.value || '1');
      addToCart(product.id, qty);
    });
  }

  const buyNowBtn = document.getElementById('pdp-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('pdp-qty')?.value || '1');
      addToCart(product.id, qty);
      window.location.href = 'checkout.html';
    });
  }
});
