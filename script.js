const API_BASE = 'http://localhost:3000/api';

// Fetch bins
async function loadBins() {
  const res = await fetch(API_BASE + '/bins');
  const bins = await res.json();
  return bins;
}

// Submit complaint
async function submitComplaint(formData) {
  const res = await fetch(API_BASE + '/complaints', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return res.json();
}

// Update bin (admin)
async function updateBin(id, data) {
  const res = await fetch(API_BASE + `/bins/${id}/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
