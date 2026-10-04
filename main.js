/**
 * Azhagu Mayil Collection - Main Global Interactions
 */

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:1.5rem;left:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;pointer-events:none;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #380510;
    color: #FAF7F2;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    border: 1px solid #D4AF37;
    font-size: 0.8rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: fadeIn 0.3s ease;
  `;
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Back to top scroll listener
window.addEventListener('scroll', () => {
  const btn = document.querySelector('.back-to-top');
  if (btn) {
    if (window.scrollY > 300) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
