/**
 * Azhagu Mayil Collection - Cart Management
 */

function getCart() {
  const data = localStorage.getItem('azhagu_mayil_cart');
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem('azhagu_mayil_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, quantity = 1) {
  const products = getStoredProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  showToast(`Added "${product.name}" to your bag!`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  showToast('Item removed from cart', 'info');
}

function updateCartQuantity(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = cart.find(i => i.id === productId);
  if (item) item.quantity = qty;
  saveCart(cart);
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => {
    b.textContent = totalItems;
    b.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
