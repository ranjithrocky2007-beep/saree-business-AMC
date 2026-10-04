/**
 * Azhagu Mayil Collection - Authentication
 */

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  localStorage.setItem('azhagu_mayil_user', JSON.stringify({ email, name: email.split('@')[0] }));
  showToast('Logged in successfully!');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

function handleAdminLogin() {
  localStorage.setItem('azhagu_mayil_user', JSON.stringify({ email: 'admin@azhagumayil.com', name: 'Admin', role: 'admin' }));
  window.location.href = 'admin.html';
}
