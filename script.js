// Auth Check
const user = JSON.parse(localStorage.getItem('user'));
if (!user) window.location.href = 'login.html';
document.getElementById('userEmail') ? document.getElementById('userEmail').textContent = `Hi, ${user.email}` : null;
document.getElementById('adminEmail') ? document.getElementById('adminEmail').textContent = `Admin: ${user.email}` : null;

function logout() { localStorage.removeItem('user'); window.location.href = 'login.html'; }

// Mock IoT Bins Data (API ready)
let bins = [
  {id:1, fill:75, status:'Full', type:'Wet', loc:'Area A'},
  {id:2, fill:40, status:'OK', type:'Dry', loc:'Area B'},
  {id:3, fill:92, status:'Critical', type:'Plastic', loc:'Area C'}
];

// Update Live Bins
function renderBins(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = bins.map(bin => `
    <div class="card p-6 text-center">
      <h3 class="text-xl font-bold mb-2">Bin #${bin.id} (${bin.type})</h3>
      <div class="progress"><div id="bin-${bin.id}-level" class="progress-bar" style="width:${bin.fill}%"></div></div>
      <p class="mt-2 font-semibold text-lg">${bin.fill}% - ${bin.status}</p>
      <p class="text-sm text-gray-500">${bin.loc}</p>
    </div>
  `).join('');
}

// User Requests
let requests = JSON.parse(localStorage.getItem('requests')) || [];
function renderRequests() {
  document.getElementById('requestsList').innerHTML = requests.map((req, i) => `
    <div class="card p-6 border-l-4 border-${req.status === 'Pending' ? 'yellow' : 'green'}-500">
      <h4>Type: ${req.type}</h4>
      <p>${req.desc}</p>
      <span class="px-3 py-1 rounded-full text-sm bg-gray-100">${req.status}</span>
    </div>
  `).join('');
}
document.getElementById('newRequest')?.addEventListener('submit', e => {
  e.preventDefault();
  const req = {
    type: document.getElementById('type').value,
    desc: document.getElementById('desc').value,
    status: 'Pending',
    id: Date.now()
  };
  requests.unshift(req);
  localStorage.setItem('requests', JSON.stringify(requests));
  renderRequests();
  e.target.reset();
  alert('Request raised! 🚀');
});

// Auto-update Bins (simulate IoT)
setInterval(() => {
  bins.forEach(bin => {
    bin.fill += (Math.random() - 0.5) * 10;
    bin.fill = Math.max(0, Math.min(100, bin.fill));
    bin.status = bin.fill > 85 ? 'Critical' : bin.fill > 60 ? 'Full' : 'OK';
    document.getElementById(`bin-${bin.id}-level`)?.style.width = `${bin.fill}%`;
  });
  renderBins('liveBins');
  renderBins('binsDashboard');
}, 5000);

// Init
renderRequests();
renderBins('liveBins');
renderBins('binsDashboard');
document.getElementById('pendingRequests').innerHTML = requests.filter(r => r.status === 'Pending').map(req => `<div class="card p-4"><p>${req.type}: ${req.desc}</p><button onclick="assignRequest(${req.id})" class="btn bg-green-600 text-sm">Assign Driver</button></div>`).join('');
function assignRequest(id) {
  const req = requests.find(r => r.id === id);
  req.status = 'Assigned';
  localStorage.setItem('requests', JSON.stringify(requests));
  location.reload();
}

// User Chart
if (document.getElementById('binChart')) {
  new Chart(document.getElementById('binChart'), {
    type: 'bar',
    data: { labels: bins.map(b => `Bin ${b.id}`), datasets: [{ label: 'Fill %', data: bins.map(b => b.fill), backgroundColor: '#8b5cf6' }] },
    options: { responsive: true }
  });
}
