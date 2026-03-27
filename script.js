async login(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const validUsers = {
        'admin': 'admin123',
        'user': 'user123'
      };
      
      if (validUsers[username] === password) {
        resolve({ 
          success: true, 
          role: username,
          token: btoa(username + ':' + Date.now())
        });
      } else {
        resolve({ 
          success: false, 
          error: username ? 'Incorrect password' : 'Username not found' 
        });// Critical: WasteManager must exist
class WasteManager {
  async login(username, password) {
    return new Promise(resolve => {
      setTimeout(() => {
        const valid = { 'admin': 'admin123', 'user': 'user123' };
        if (valid[username] === password) {
          resolve({ success: true, role: username, token: 'demo-token' });
        } else {
          resolve({ success: false, error: 'Invalid credentials' });
        }
      }, 1000);
    });
  }
  // ... rest of class
}
window.wm = new WasteManager();
        // Notification system (already in backend, enhance)
function showNotification(title, message, type = 'info') {
  if (!document.getElementById('notification-container')) {
    document.body.insertAdjacentHTML('beforeend', '<div id="notification-container"></div>');
  }
  const container = document.getElementById('notification-container');
  const notif = document.createElement('div');
  notif.className = `fixed top-24 right-6 p-6 rounded-2xl shadow-2xl z-50 transform transition-all duration-300 
                     ${type === 'success' ? 'bg-emerald-500' : type === 'warning' ? 'bg-orange-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`;
  notif.innerHTML = `<h4 class="font-bold text-lg">${title}</h4><p>${message}</p>`;
  notif.style.right = '-400px';
  container.appendChild(notif);
  
  setTimeout(() => notif.style.right = '1.5rem', 100);
  setTimeout(() => notif.remove(), 5000);
}

// Demo notifications
setInterval(() => {
  if (Math.random() > 0.7) {
    showNotification('🚛 Alert', 'Bin #2 in Ambattur is FULL - Truck dispatched!');
  }
  // Perfect role redirect
if (response.success) {
  localStorage.setItem('role', response.role);
  const url = response.role === 'admin' ? 'admin.html' : 'user.html';
  window.location.replace(url); // Force redirect
}
}, 15000);
      }
    }, 1200); // Realistic API delay
  });
}
