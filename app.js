document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* --- 1. Sticky Floating CTA --- */
  const floatingCta = document.querySelector('.floating-cta');
  const heroSection = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    if (!floatingCta || !heroSection) return;
    
    const heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
    const currentScroll = window.scrollY;

    // Show floating CTA after scrolling past Hero
    if (currentScroll > heroBottom - 200) {
      floatingCta.classList.add('show');
    } else {
      floatingCta.classList.remove('show');
    }
  });

  /* --- 2. FAQ Accordion --- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all FAQ items
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-content').style.maxHeight = null;
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* --- 3. Evergreen Countdown Timer --- */
  // Set target date to 5 days from the current date (evergreen urgency for conversion optimization)
  let targetDate = localStorage.getItem('vinmec_workshop_countdown_target');
  
  if (!targetDate) {
    const now = new Date();
    // 5 days from now
    const target = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    targetDate = target.toISOString();
    localStorage.setItem('vinmec_workshop_countdown_target', targetDate);
  }

  const countdownTarget = new Date(targetDate).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownTarget - now;

    if (distance < 0) {
      // If expired, reset to another 3 days to maintain the CRO effect
      const newTarget = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
      localStorage.setItem('vinmec_workshop_countdown_target', newTarget.toISOString());
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update HTML elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
