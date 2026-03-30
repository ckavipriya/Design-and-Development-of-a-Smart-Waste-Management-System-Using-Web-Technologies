// Dark/Light Mode Toggle
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    modeToggle.textContent = '☀️';
}

// Sign In Modal
const signInBtn = document.getElementById('signInBtn');
const signInModal = document.getElementById('signInModal');
const signInClose = signInModal.querySelector('.close');

signInBtn.onclick = () => { signInModal.style.display = 'block'; }
signInClose.onclick = () => { signInModal.style.display = 'none'; }
signInModal.onclick = (e) => { if (e.target === signInModal) signInModal.style.display = 'none'; }

// Sign Up Modal
const signUpBtn = document.getElementById('signUpBtn');
const signUpModal = document.getElementById('signUpModal');
const signUpClose = signUpModal.querySelector('.close');

signUpBtn.onclick = () => { signUpModal.style.display = 'block'; }
signUpClose.onclick = () => { signUpModal.style.display = 'none'; }
signUpModal.onclick = (e) => { if (e.target === signUpModal) signUpModal.style.display = 'none'; }

// Form submits (add backend later)
document.querySelectorAll('form').forEach(form => {
    form.onsubmit = (e) => {
        e.preventDefault();
        alert('Logged in/up! (Demo - add real backend)');
        form.closest('.modal').style.display = 'none';
    };
});
