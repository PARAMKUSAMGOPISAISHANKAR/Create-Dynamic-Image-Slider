/**
 * Dynamic Image Slider Pro - Main Application Bootstrap
 * Coordinates ThemeManager, SliderControls, ModalManager, and CardManager
 * while preserving the global `swiper` instance on Swiper 11.
 */
(function (global) {
  'use strict';

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container || !message) return;

    const item = document.createElement('div');
    item.className = 'toast-item';
    item.textContent = message;
    container.appendChild(item);

    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transition = 'opacity 0.25s ease';
      setTimeout(() => item.remove(), 260);
    }, 2600);
  }

  function bindNavigation() {
    const navLinks = document.getElementById('mainNavLinks');
    const mobileBtn = document.getElementById('mobileMenuBtn');

    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-mobile-open');
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
      });
    }

    document.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.nav;
        document.querySelectorAll('.nav-link[data-nav]').forEach((el) => {
          el.classList.toggle('is-active', el.dataset.nav === target);
        });

        if (target === 'home' || target === 'all') {
          global.CardManager.clearFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (target === 'favorites') {
          global.CardManager.setFavoritesFilter(true);
          const sliderSec = document.getElementById('sliderSection');
          if (sliderSec) sliderSec.scrollIntoView({ behavior: 'smooth' });
        }

        if (navLinks && navLinks.classList.contains('is-mobile-open')) {
          navLinks.classList.remove('is-mobile-open');
          if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function initApp() {
    global.ThemeManager.init();
    global.SliderControls.init();
    global.ModalManager.init();
    global.CardManager.init();
    bindNavigation();
  }

  global.SliderApp = {
    showToast
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})(window);
