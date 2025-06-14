// Modern Smooth Scrolling (Vanilla JS)
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for all js-scroll links
  document.querySelectorAll('a.js-scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Calculate position
      const headerOffset = 80; // Adjust if you have a fixed header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without jumping
      history.pushState(null, null, targetId);
    });
  });

  // Typed.js initialization (if you're using it)
  if (typeof Typed !== 'undefined') {
    new Typed("#typed", {
      strings: ["Web Developer", "Tech Enthusiast", "Problem Solver"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
      cursorChar: "|",
      backDelay: 1500
    });
  }

  // Intersection Observer for animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  };
  animateOnScroll();

  // Contact form handling
  const contactForm = document.querySelector('.contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Form validation
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
      
      if (!name || name.length < 4) {
        alert('Please enter a valid name (at least 4 characters)');
        return;
      }
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      if (!message) {
        alert('Please write your message');
        return;
      }
      
      // Form submission handling
      const successMessage = document.getElementById('sendmessage');
      if (successMessage) {
        successMessage.classList.add('show');
        setTimeout(() => successMessage.classList.remove('show'), 5000);
      }
      
      contactForm.reset();
    });
  }
});

// Initialize progress bars
function initProgressBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const percent = bar.dataset.percent;
    bar.style.setProperty('--percent', `${percent}%`);
  });
}

// Run everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initProgressBars);









// Certificate Filtering
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const certificateItems = document.querySelectorAll('.certificate-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      certificateItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox for certificates
  const certificateImages = document.querySelectorAll('.certificate-img img');
  certificateImages.forEach(img => {
    img.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.style.position = 'fixed';
      lightbox.style.top = '0';
      lightbox.style.left = '0';
      lightbox.style.width = '100%';
      lightbox.style.height = '100%';
      lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
      lightbox.style.display = 'flex';
      lightbox.style.justifyContent = 'center';
      lightbox.style.alignItems = 'center';
      lightbox.style.zIndex = '9999';
      
      const enlargedImg = document.createElement('img');
      enlargedImg.src = this.src;
      enlargedImg.style.maxHeight = '90vh';
      enlargedImg.style.maxWidth = '90vw';
      enlargedImg.style.objectFit = 'contain';
      
      lightbox.appendChild(enlargedImg);
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
      });
    });
  });
});