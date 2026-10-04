/**
 * Azhagu Mayil Collection - Wishlist Management
 */

function getWishlist() {
  const data = localStorage.getItem('azhagu_mayil_wishlist');
  return data ? JSON.parse(data) : [];
}

function saveWishlist(list) {
  localStorage.setItem('azhagu_mayil_wishlist', JSON.stringify(list));
  updateWishlistBadge();
}

function toggleWishlist(productId) {
  let list = getWishlist();
  const products = getStoredProducts();
  const product = products.find(p => p.id === productId);
  const name = product ? product.name : 'Saree';

  if (list.includes(productId)) {
    list = list.filter(id => id !== productId);
    showToast(`Removed "${name}" from wishlist`, 'info');
  } else {
    list.push(productId);
    showToast(`Saved "${name}" to your wishlist!`);
  }

  saveWishlist(list);
  updateWishlistButtons();
}

function updateWishlistBadge() {
  const list = getWishlist();
  const badges = document.querySelectorAll('.wishlist-count-badge');
  badges.forEach(b => {
    b.textContent = list.length;
    b.style.display = list.length > 0 ? 'flex' : 'none';
  });
}

function updateWishlistButtons() {
  const list = getWishlist();
  const buttons = document.querySelectorAll('[data-wishlist-id]');
  buttons.forEach(btn => {
    const id = btn.getAttribute('data-wishlist-id');
    if (list.includes(id)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateWishlistBadge();
  updateWishlistButtons();
});
