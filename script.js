// Dark Mode
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
}

// Modals
const signInBtn = document.getElementById('signInBtn'), signInModal = document.getElementById('signInModal');
const signUpBtn = document.getElementById('signUpBtn'), signUpModal = document.getElementById('signUpModal');

[signInBtn, signUpBtn].forEach((btn, i) => {
    btn.onclick = () => (i === 0 ? signInModal : signUpModal).style.display = 'block';
});

document.querySelectorAll('.close').forEach(close => {
    close.onclick = () => close.closest('.modal').style.display = 'none';
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }
});

// Forms
document.querySelectorAll('form').forEach(form => {
    form.onsubmit = e => {
        e.preventDefault();
        alert('Success! (Connect to backend for real auth)');
        form.closest('.modal').style.display = 'none';
    };
});
