/**
 * Azhagu Mayil Collection - Checkout Processing
 */

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();

  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const orderId = `AMC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Clear cart
      localStorage.removeItem('azhagu_mayil_cart');
      updateCartBadge();

      // Show success modal or redirect
      const receiptModal = document.getElementById('receipt-modal');
      if (receiptModal) {
        document.getElementById('modal-order-id').textContent = orderId;
        receiptModal.style.display = 'flex';
      } else {
        alert(`Thank you! Your order ${orderId} has been placed successfully.`);
        window.location.href = 'index.html';
      }
    });
  }
});

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-list');
  if (!container) return;

  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  container.innerHTML = cart.map(item => `
    <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; padding: 0.5rem 0; border-bottom:1px solid #eee;">
      <span>${item.name} × ${item.quantity}</span>
      <span style="font-family:monospace; font-weight:700;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
    </div>
  `).join('');

  const subtotalEl = document.getElementById('checkout-subtotal');
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  const totalEl = document.getElementById('checkout-total');
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
}
