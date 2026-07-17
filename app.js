document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      
      // Update menu icon
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('show')) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (window.lucide) {
            window.lucide.createIcons();
          }
        }
      });
    });
  }

  // 3. Evergreen Countdown Timer
  // Targets 1 day (24 hours) from the user's first visit to create conversion urgency.
  let targetDate = localStorage.getItem('vinmec_workshop_new_countdown_target');
  
  if (!targetDate) {
    const now = new Date();
    // Set target to 1 day (24 hours) from now
    const target = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    targetDate = target.toISOString();
    localStorage.setItem('vinmec_workshop_new_countdown_target', targetDate);
  }

  const countdownTarget = new Date(targetDate).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownTarget - now;

    if (distance < 0) {
      // If expired, reset to another 24 hours to maintain urgency effect for new visitors
      const newTarget = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
      localStorage.setItem('vinmec_workshop_new_countdown_target', newTarget.toISOString());
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Initial call and set interval
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
