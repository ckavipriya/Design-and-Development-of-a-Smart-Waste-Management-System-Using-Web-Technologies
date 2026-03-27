// script.js - Professional functionality
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  window.addEventListener('load', () => {
    document.querySelector('.preloader').style.opacity = '0';
    setTimeout(() => document.querySelector('.preloader').style.display = 'none', 500);
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255,255,255,1)';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.background = 'rgba(255,255,255,0.95)';
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
  });

  // Counter animation
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 100;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 30);
      } else {
        counter.innerText = target;
      }
    });
  };

  // Intersection observer for counters
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelector('.hero-stats')?.parentElement && 
  observer.observe(document.querySelector('.hero-stats'));

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Auth check
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('user.html')) {
    if (!isLoggedIn) {
      window.location.href = 'login.html';
    }
  }
});

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
