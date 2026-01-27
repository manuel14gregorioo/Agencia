/**
 * Clínica Dental Sonrisas - Premium Demo
 * MGM Automations
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initHeader();
    initMobileMenu();
    initDropdowns();
    initSmoothScroll();
    initFormValidation();
    initScrollAnimations();
    initCounters();
  }

  // --------------------------------------------------------------------------
  // Header Scroll Effect
  // --------------------------------------------------------------------------
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      if (window.scrollY > 20) {
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

      if (!button) return;

      button.addEventListener('click', function(e) {
        e.preventDefault();
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        dropdowns.forEach(function(d) {
          const btn = d.querySelector('button[aria-haspopup]');
          if (btn && btn !== button) {
            btn.setAttribute('aria-expanded', 'false');
          }
        });

        button.setAttribute('aria-expanded', !isExpanded);
      });
    });

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

          // Close mobile menu if open
          const menu = document.getElementById('nav-menu');
          const toggle = document.getElementById('nav-toggle');
          if (menu?.classList.contains('active')) {
            toggle?.setAttribute('aria-expanded', 'false');
            toggle?.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
          }
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

      const nombre = form.querySelector('#nombre');
      const email = form.querySelector('#email');
      const mensaje = form.querySelector('#mensaje');
      const privacidad = form.querySelector('#privacidad');

      let isValid = true;

      [nombre, email, mensaje].forEach(function(input) {
        if (input && !input.value.trim()) {
          input.style.borderColor = '#dc2626';
          isValid = false;
        } else if (input) {
          input.style.borderColor = '';
        }
      });

      if (email && email.value && !isValidEmail(email.value)) {
        email.style.borderColor = '#dc2626';
        isValid = false;
      }

      if (privacidad && !privacidad.checked) {
        isValid = false;
        alert('Debes aceptar la política de privacidad');
      }

      if (isValid) {
        alert('¡Gracias por tu mensaje! En una web real, esto enviaría el formulario al servidor.');
        form.reset();
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --------------------------------------------------------------------------
  // Scroll Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.treatment-card, .team-card, .testimonial-card, .why-us__feature, .stat-item, .faq__item'
    );

    if (!animatedElements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el, index) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.transitionDelay = (index % 4) * 0.1 + 's';
      observer.observe(el);
    });
  }

  // --------------------------------------------------------------------------
  // Animated Counters
  // --------------------------------------------------------------------------
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

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
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(function() {
      step++;
      current = Math.min(Math.round(increment * step), target);
      element.textContent = formatNumber(current) + suffix;

      if (step >= steps) {
        clearInterval(timer);
        element.textContent = formatNumber(target) + suffix;
      }
    }, duration / steps);
  }

  function formatNumber(num) {
    return num >= 1000 ? num.toLocaleString('es-ES') : num.toString();
  }

})();
