// Mock data if no backend
const MOCK_BINS = [
  {id:'B001', location:'College Gate', fill:75, status:'Full', temp:32},
  {id:'B002', location:'Market Road', fill:20, status:'Empty', temp:28},
  {id:'B003', location:'Hostel Area', fill:90, status:'Critical', temp:35}
];

async function apiCall(endpoint, options = {}) {
  try {
    const res = await fetch(`http://localhost:3000${endpoint}`, options);
    return await res.json();
  } catch {
    // Fallback to mock
    if (endpoint === '/api/bins') return MOCK_BINS;
    return [];
  }
}

// Load bins for all pages
async function loadBins(containerId) {
  const bins = await apiCall('/api/bins');
  const container = document.getElementById(containerId);
  container.innerHTML = bins.map(bin => `
    <div class="glass card p-6 flex justify-between items-center hover:scale-105 transition-all">
      <div>
        <h3 class="text-2xl font-bold text-white mb-2">${bin.id}</h3>
        <p class="text-white/80">${bin.location}</p>
      </div>
      <div class="text-right">
        <div class="text-3xl font-bold text-white mb-2">${bin.fill}%</div>
        <span class="status status-${bin.status.toLowerCase()}">${bin.status}</span>
      </div>
    </div>
  `).join('');
}

// Submit complaint
async function submitComplaint(form) {
  const formData = Object.fromEntries(new FormData(form));
  const result = await apiCall('/api/complaints', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(formData)
  });
  return result;
}
