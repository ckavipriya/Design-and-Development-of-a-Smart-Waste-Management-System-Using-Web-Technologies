// Theme Toggle
const modeToggle = document.getElementById('modeToggle');
const html = document.documentElement;
modeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    modeToggle.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Load theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
modeToggle.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// Modals
const signInBtn = document.getElementById('signInBtn') || document.getElementById('profileBtn');
const signInModal = document.getElementById('signInModal');
const closes = document.querySelectorAll('.close');

signInBtn.onclick = () => signInModal.style.display = 'block';
closes.forEach(close => close.onclick = () => close.closest('.modal').style.display = 'none');
signInModal.onclick = e => e.target === signInModal && (signInModal.style.display = 'none');

// Form handling
document.querySelector('form').onsubmit = e => {
    e.preventDefault();
    alert('Authentication successful! Welcome to Dashboard.');
    signInModal.style.display = 'none';
};

// Real-time Bins
const binsData = [
    { id: 1, name: 'Zone A-1', level: 95, status: 'critical' },
    { id: 2, name: 'Zone A-2', level: 78, status: 'warning' },
    { id: 3, name: 'Zone B-1', level: 45, status: 'warning' },
    { id: 4, name: 'Zone B-2', level: 22, status: 'good' },
    { id: 5, name: 'Zone C-1', level: 88, status: 'critical' }
];

function renderBins() {
    const container = document.getElementById('binsContainer');
    container.innerHTML = binsData.map(bin => `
        <div class="bin-item">
            <div class="bin-status">
                <div class="status-dot ${bin.status}"></div>
                <div>
                    <div class="bin-name">${bin.name}</div>
                    <div class="bin-id">Bin #${bin.id}</div>
                </div>
            </div>
            <div class="bin-fill">
                <div class="fill-bar ${bin.status}" style="width: ${bin.level}%"></div>
            </div>
        </div>
    `).join('');
}
renderBins();

// Simulate real-time updates
setInterval(() => {
    binsData.forEach(bin => {
        bin.level += (Math.random() - 0.5) * 10;
        bin.level = Math.max(0, Math.min(100, bin.level));
        bin.status = bin.level > 80 ? 'critical' : bin.level > 50 ? 'warning' : 'good';
    });
    renderBins();
}, 5000);

// Simple Chart (Canvas)
const canvas = document.getElementById('fillChart');
const ctx = canvas.getContext('2d');
function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Simple bar chart
    const levels = binsData.map(b => b.level);
    const maxHeight = 150;
    const barWidth = 50;
    levels.forEach((level, i) => {
        const barHeight = (level / 100) * maxHeight;
        ctx.fillStyle = level > 80 ? '#ef4444' : level > 50 ? '#f59e0b' : '#10b981';
        ctx.fillRect(i * 70 + 20, canvas.height - barHeight, barWidth, barHeight);
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${level}%`, i * 70 + 45, canvas.height - barHeight - 5);
    });
}
drawChart();
setInterval(drawChart, 5000);
