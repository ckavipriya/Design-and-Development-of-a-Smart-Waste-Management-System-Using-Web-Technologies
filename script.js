// Simulate bin data
let bins = JSON.parse(localStorage.getItem('bins')) || [
  {id:1, location:'Ambattur', level:75, status:'Full'},
  {id:2, location:'Karur', level:40, status:'Medium'},
  {id:3, location:'Chennai', level:20, status:'Empty'}
];

// Save to localStorage
function saveData() { localStorage.setItem('bins', JSON.stringify(bins)); }

// Update status table
function updateStatus() {
  const tbody = document.querySelector('#statusTable tbody');
  if (tbody) {
    tbody.innerHTML = bins.map(bin => `
      <tr>
        <td>${bin.id}</td>
        <td>${bin.location}</td>
        <td>${bin.level}%</td>
        <td><span class="${bin.status.toLowerCase()}">${bin.status}</span></td>
      </tr>
    `).join('');
  }
  saveData();
}

// Login simulation
function login() {
  const user = document.getElementById('username').value;
  if (user) {
    localStorage.setItem('user', user);
    window.location.href = user === 'admin' ? 'admin.html' : 'user.html';
  }
}

// Init on load
document.addEventListener('DOMContentLoaded', updateStatus);
