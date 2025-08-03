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








document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const certificateItems = document.querySelectorAll('.certificate-item');

  // Initialize - hide all certificates
  certificateItems.forEach(item => {
    item.style.display = 'none';
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');
      
      // Toggle active class on clicked button
      this.classList.toggle('active');
      
      // Check if button is now active after toggle
      const isActive = this.classList.contains('active');
      
      certificateItems.forEach(item => {
        if (item.getAttribute('data-category') === filterValue) {
          // Toggle display for matching items
          item.style.display = isActive ? 'block' : 'none';
        }
      });
    });
  });

  // Lightbox functionality remains the same
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

  // Optional: Activate all filters by default
  // filterButtons.forEach(btn => btn.click());
});

document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    // 1. Check for saved theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeToggleButton('dark');
    } else {
        // Default to light mode if nothing is saved or if it's 'light'
        body.classList.remove('dark-mode');
        updateThemeToggleButton('light');
    }

    // Function to update the toggle button's icon and text
    function updateThemeToggleButton(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            const textSpan = themeToggle.querySelector('span'); // Get the span for text

            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                if (textSpan) textSpan.textContent = '';
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                if (textSpan) textSpan.textContent = '';
            }
        }
    }

    // 2. Add event listener to the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode'); // Toggles the class

            // Save the new preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                updateThemeToggleButton('dark');
            } else {
                localStorage.setItem('theme', 'light');
                updateThemeToggleButton('light');
            }
        });
    }

    // Your existing mobile navigation collapse logic (ensure it's preserved)
    const navLinks = document.querySelectorAll('.nav-link.js-scroll');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navLinks && navbarToggler && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Check if the navbar is currently expanded on small screens
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click(); // Programmatically click the toggler to close it
                }
            });
        });
    }
});