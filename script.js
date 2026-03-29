<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Theme Toggle (Pro feature)
function toggleTheme() {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
}
if (!document.documentElement.dataset.theme) document.documentElement.dataset.theme = 'light';

// Particles.js Background (Stunning!)
if (document.getElementById('particles-js') || document.body) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ['#00d4ff', '#7c3aed', '#00ff88', '#ff6b6b'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.2, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: true }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'repulse' } } }
  });
}

// Stagger Animations (Pro Polish)
gsap.from('.card', {
  duration: 1,
  y: 100,
  opacity: 0,
  stagger: 0.2,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.container', start: 'top 80%' }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.style.background = scrollY > 50 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)';
});

// Bin Progress Shimmer + Pulse on Critical
setInterval(() => {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    if (parseFloat(bar.style.width) > 85) {
      gsap.to(bar, { scale: 1.05, duration: 0.5, yoyo: true, repeat: 1 });
    }
  });
}, 2000);

// Floating Elements
gsap.to('.btn', {
  y: -5,
  rotation: 2,
  duration: 2,
  yoyo: true,
  repeat: -1,
  ease: 'power1.inOut',
  stagger: { amount: 0.5 }
});
