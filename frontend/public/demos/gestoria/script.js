/**
 * Gestoría Fernández - Demo JavaScript
 * MGM Automations - Professional Portfolio Demo
 */

(function() {
  'use strict';

  // Carousel speed (synced for both carousels)
  const CAROUSEL_SPEED = 5000;

  // DOM Ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initHeader();
    initMobileMenu();
    initDropdowns();
    initHeroCardCarousel();
    initHeroStatsCarousel();
    initCounters();
    initSmoothScroll();
    initFormValidation();
  }

  // --------------------------------------------------------------------------
  // Header Scroll Effect
  // --------------------------------------------------------------------------
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

  // --------------------------------------------------------------------------
  // Mobile Menu
  // --------------------------------------------------------------------------
  function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Dropdown Menus
  // --------------------------------------------------------------------------
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.nav__dropdown');

    dropdowns.forEach(function(dropdown) {
      const button = dropdown.querySelector('button[aria-haspopup]');
      const submenu = dropdown.querySelector('.nav__submenu');

      if (!button || !submenu) return;

      button.addEventListener('click', function(e) {
        e.preventDefault();
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Close other dropdowns
        dropdowns.forEach(function(d) {
          const btn = d.querySelector('button[aria-haspopup]');
          if (btn && btn !== button) {
            btn.setAttribute('aria-expanded', 'false');
          }
        });

        button.setAttribute('aria-expanded', !isExpanded);
      });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      dropdowns.forEach(function(dropdown) {
        if (!dropdown.contains(e.target)) {
          const button = dropdown.querySelector('button[aria-haspopup]');
          if (button) {
            button.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // Hero Card Carousel
  // --------------------------------------------------------------------------
  function initHeroCardCarousel() {
    const container = document.getElementById('hero-card');
    if (!container) return;

    const slides = container.querySelectorAll('.hero__float-card-slide');
    const dots = container.querySelectorAll('.hero__float-card-dot');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let interval;

    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      showSlide((currentSlide + 1) % slides.length);
    }

    function startAutoRotate() {
      interval = setInterval(nextSlide, CAROUSEL_SPEED);
    }

    function stopAutoRotate() {
      clearInterval(interval);
    }

    dots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        stopAutoRotate();
        showSlide(index);
        startAutoRotate();
      });
    });

    container.addEventListener('mouseenter', stopAutoRotate);
    container.addEventListener('mouseleave', startAutoRotate);

    startAutoRotate();
  }

  // --------------------------------------------------------------------------
  // Hero Stats Carousel
  // --------------------------------------------------------------------------
  function initHeroStatsCarousel() {
    const container = document.getElementById('hero-stats');
    if (!container) return;

    const slides = container.querySelectorAll('.hero__stats-slide');
    const dots = container.querySelectorAll('.hero__stats-dot');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let interval;

    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      showSlide((currentSlide + 1) % slides.length);
    }

    function startAutoRotate() {
      interval = setInterval(nextSlide, CAROUSEL_SPEED);
    }

    function stopAutoRotate() {
      clearInterval(interval);
    }

    dots.forEach(function(dot, index) {
      dot.addEventListener('click', function() {
        stopAutoRotate();
        showSlide(index);
        startAutoRotate();
      });
    });

    container.addEventListener('mouseenter', stopAutoRotate);
    container.addEventListener('mouseleave', startAutoRotate);

    // Start with offset
    setTimeout(startAutoRotate, CAROUSEL_SPEED / 2);
  }

  // --------------------------------------------------------------------------
  // Animated Counters
  // --------------------------------------------------------------------------
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(element) {
    const target = parseInt(element.dataset.count, 10);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(function() {
      step++;
      current = Math.min(Math.round(increment * step), target);
      element.textContent = formatNumber(current);

      if (step >= steps) {
        clearInterval(timer);
        element.textContent = formatNumber(target);
      }
    }, duration / steps);
  }

  function formatNumber(num) {
    return num >= 1000 ? num.toLocaleString('es-ES') : num.toString();
  }

  // --------------------------------------------------------------------------
  // Smooth Scroll
  // --------------------------------------------------------------------------
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.getElementById('header')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // Form Validation
  // --------------------------------------------------------------------------
  function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Simple validation
      const nombre = form.querySelector('#nombre');
      const email = form.querySelector('#email');
      const mensaje = form.querySelector('#mensaje');
      const privacidad = form.querySelector('#privacidad');

      let isValid = true;

      [nombre, email, mensaje].forEach(function(input) {
        if (!input.value.trim()) {
          input.style.borderColor = '#dc2626';
          isValid = false;
        } else {
          input.style.borderColor = '';
        }
      });

      if (email.value && !isValidEmail(email.value)) {
        email.style.borderColor = '#dc2626';
        isValid = false;
      }

      if (!privacidad.checked) {
        isValid = false;
        alert('Debes aceptar la política de privacidad');
      }

      if (isValid) {
        // Demo mode - show success message
        alert('¡Gracias por tu mensaje! En una web real, esto enviaría el formulario al servidor.');
        form.reset();
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

})();
