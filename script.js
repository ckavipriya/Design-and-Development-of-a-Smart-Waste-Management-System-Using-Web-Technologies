// Professional data model
class WasteManager {
  constructor() {
    this.bins = JSON.parse(localStorage.getItem('bins')) || this.initBins();
    this.users = { admin: 'admin123', user: 'user123' };
    this.apiDelay = 500;
  }
  initBins() {
    return [
      { id: 1, location: 'Ambattur, TN', level: 85, status: 'full', lastUpdate: new Date().toISOString(), gps: { lat: 13.11, lng: 80.15 } },
      { id: 2, location: 'Karur, TN', level: 45, status: 'medium', lastUpdate: new Date().toISOString(), gps: { lat: 10.96, lng: 78.08 } },
      { id: 3, location: 'Chennai Central', level: 15, status: 'empty', lastUpdate: new Date().toISOString(), gps: { lat: 13.08, lng: 80.27 } }
    ];
  }
  async login(username, password) {
    return new Promise((resolve) => setTimeout(() => {
      if (this.users[username] === password) {
        localStorage.setItem('token', btoa(username + ':' + password));
        resolve({ success: true, role: username === 'admin' ? 'admin' : 'user' });
      } else resolve({ success: false, error: 'Invalid credentials' });
    }, this.apiDelay));
  }
  save() { localStorage.setItem('bins', JSON.stringify(this.bins)); }
  updateStatus() { this.save(); }
  addBin(location) {
    const newBin = { id: this.bins.length + 1, location, level: 0, status: 'empty', lastUpdate: new Date().toISOString(), gps: { lat: 13.0, lng: 80.0 } };
    this.bins.push(newBin);
    this.updateStatus();
  }
  getStats() {
    const full = this.bins.filter(b => b.status === 'full').length;
    const avg = Math.round(this.bins.reduce((sum, b) => sum + b.level, 0) / this.bins.length);
    return { full, avg, total: this.bins.length };
  }
}

// Global instance
window.wm = new WasteManager();
