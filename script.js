// Extend WasteManager class with dashboard features
class WasteManager {
  // ... existing code ...
  getChartData() {
    return {
      labels: this.bins.map(b => b.location.slice(0,10)),
      datasets: [{
        label: 'Fill Level (%)',
        data: this.bins.map(b => b.level),
        backgroundColor: this.bins.map(b => b.status === 'full' ? '#ef4444' : b.status === 'medium' ? '#f59e0b' : '#10b981')
      }]
    };
  }
  notify(message, type = 'success') {
    // Toast notification
    const toast = document.createElement('div');
    toast.className = `fixed top-6 right-6 p-6 rounded-3xl shadow-2xl z-50 transform transition-all ${type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`;
    toast.textContent = message;
    toast.style.right = '-400px';
    document.body.appendChild(toast);
    setTimeout(() => toast.style.right = '1.5rem', 100);
    setTimeout(() => toast.remove(), 4000);
  }
}

// Global theme toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
if (localStorage.theme === 'dark') toggleDarkMode();

// Auto-update demo data every 10s
setInterval(() => {
  wm.bins.forEach(bin => {
    bin.level = Math.min(100, bin.level + (Math.random()-0.5)*20);
    bin.status = bin.level > 70 ? 'full' : bin.level > 30 ? 'medium' : 'empty';
    bin.lastUpdate = new Date().toISOString();
  });
  wm.updateStatus();
  wm.notify('Bin levels updated live!');
}, 10000);
