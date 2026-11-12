// ==================== //
// NAVIGATION
// ==================== //
// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const header = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth Scroll
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Header Scroll Effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ==================== //
// FLIP CARD ANIMATIONS
// ==================== //
// Tap/click (and Enter/Space via the keyboard handler below) toggles a
// .flipped class. Desktop hover flipping is handled in CSS.
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });

  // Reset when the mouse leaves (desktop)
  card.addEventListener('mouseleave', function() {
    this.classList.remove('flipped');
  });
});

// Keyboard accessibility for flip cards
document.querySelectorAll('.flip-card').forEach(card => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', 'Flip card to see more information');
  
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
});

// Add animation delay for sequential appearance
const flipCards = document.querySelectorAll('.flip-card');
const flipObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      flipObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

flipCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  flipObserver.observe(card);
});

// ==================== //
// STAT NUMBER ANIMATION
// ==================== //
const animateNumber = (el, target) => {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    el.textContent = Math.round(current);
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, 20);
};

const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateNumber(entry.target, target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// ==================== //
// TURNOUT BAR ANIMATION
// ==================== //
const animateTurnoutBars = () => {
  const turnoutBars = document.querySelectorAll('.turnout-bar');
  
  turnoutBars.forEach(bar => {
    const fill = bar.querySelector('.bar-fill');
    const percentage = bar.dataset.percentage;
    
    // Reset width to 0 for animation
    fill.style.width = '0%';
    
    // Animate after a small delay
    setTimeout(() => {
      fill.style.width = `${percentage}%`;
    }, 300);
  });
};

const turnoutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateTurnoutBars();
      turnoutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Observe the turnout comparison section
const turnoutComparison = document.querySelector('.turnout-comparison');
if (turnoutComparison) {
  turnoutObserver.observe(turnoutComparison);
}

// ==================== //
// EDUCATION BAR ANIMATION
// ==================== //
const animateEducationBars = () => {
  const educationBars = document.querySelectorAll('.edu-progress');
  
  educationBars.forEach(bar => {
    // Reset width to 0 for animation
    bar.style.width = '0%';
    
    // Animate after a small delay
    setTimeout(() => {
      const width = getComputedStyle(bar).getPropertyValue('--width');
      bar.style.width = width;
    }, 300);
  });
};

const educationObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateEducationBars();
      educationObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Observe the education chart
const educationChart = document.querySelector('.education-chart');
if (educationChart) {
  educationObserver.observe(educationChart);
}

// ==================== //
// FORM HANDLING
// ==================== //
const form = document.getElementById('registration-form');
const otherCheckbox = document.getElementById('other-checkbox');
const otherInput = document.getElementById('other-interest-text');
const modal = document.getElementById('success-modal');
const modalClose = document.getElementById('modal-close');

// Keep the "Other" text box in sync with its checkbox
const syncOtherInput = () => {
  if (!otherCheckbox || !otherInput) return;
  otherInput.disabled = !otherCheckbox.checked;
  otherInput.required = otherCheckbox.checked;
  if (!otherCheckbox.checked) otherInput.value = '';
};

if (otherCheckbox && otherInput) {
  otherCheckbox.addEventListener('change', syncOtherInput);
}

// Close the success modal and clear the form
const closeModal = () => {
  modal.classList.remove('active');
  if (form) {
    form.reset();
    syncOtherInput();
  }
};

if (form && modal) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate form submission
    modal.classList.add('active');
  });
}

if (modalClose && modal) {
  modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// ==================== //
// STATE DROPDOWN POPULATION
// ==================== //
const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const stateSelect = document.getElementById('state');
if (stateSelect) {
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });
}

// ==================== //
// ACCESSIBILITY ENHANCEMENTS
// ==================== //
// Keyboard navigation for links
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close modal on Escape
    if (modal && modal.classList.contains('active')) {
      closeModal();
    }
    // Close mobile menu on Escape
    if (navToggle && navToggle.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});

// ==================== //
// DYNAMIC VIEWPORT HEIGHT (for mobile)
// ==================== //
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// ==================== //
// LOADING ANIMATION
// ==================== //
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});


// ==================== //
// CONSOLE MESSAGE
// ==================== //
console.log('%cVoteSource', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cYour vote matters. Make it count.', 'font-size: 14px; color: #666;');

// ==================== //
// ELECTIONS CARDS INTERACTIONS
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
  const electionCards = document.querySelectorAll('.card-wrap');
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  
  // Read More button handlers
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.card-wrap');
      const cardText = card.querySelector('.card-text');
      
      // Toggle expanded state
      cardText.classList.toggle('expanded');
      
      // Update button text
      if (cardText.classList.contains('expanded')) {
        this.textContent = 'Read Less';
      } else {
        this.textContent = 'Read More';
      }
    });
  });
  
  // Card click handlers
  electionCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('read-more-btn')) {
        // Handle card click (could link to detailed page)
        const title = this.querySelector('.card-title').textContent;
        console.log('Card clicked:', title);
        // You could add navigation logic here
      }
    });
  });

});
// Keep the footer year current
(function () {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
