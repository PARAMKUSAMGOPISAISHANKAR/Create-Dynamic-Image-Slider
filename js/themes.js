/**
 * Theme manager supporting Midnight Glass, Purple Galaxy, Ocean Blue, and Minimal Light.
 */
(function (global) {
  'use strict';

  const THEMES = [
    { id: 'midnight', label: 'Midnight Glass', dot: '#3b82f6' },
    { id: 'purple', label: 'Purple Galaxy', dot: '#a855f7' },
    { id: 'ocean', label: 'Ocean Blue', dot: '#06b6d4' },
    { id: 'light', label: 'Minimal Light', dot: '#64748b' }
  ];

  function getSavedTheme() {
    const saved = global.AppStorage.get(global.AppStorage.KEYS.THEME, 'midnight');
    return THEMES.some((t) => t.id === saved) ? saved : 'midnight';
  }

  function applyTheme(themeId) {
    const valid = THEMES.some((t) => t.id === themeId) ? themeId : 'midnight';
    document.documentElement.setAttribute('data-theme', valid);
    global.AppStorage.set(global.AppStorage.KEYS.THEME, valid);

    document.querySelectorAll('[data-theme-option]').forEach((btn) => {
      const isActive = btn.getAttribute('data-theme-option') === valid;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    const headerSelect = document.getElementById('themeSelect');
    if (headerSelect && headerSelect.value !== valid) {
      headerSelect.value = valid;
    }

    return valid;
  }

  function init() {
    const current = applyTheme(getSavedTheme());

    const headerSelect = document.getElementById('themeSelect');
    if (headerSelect) {
      headerSelect.addEventListener('change', (e) => {
        const next = applyTheme(e.target.value);
        if (global.SliderApp && typeof global.SliderApp.showToast === 'function') {
          const found = THEMES.find((t) => t.id === next);
          global.SliderApp.showToast(`Theme switched to ${found ? found.label : next}`);
        }
      });
    }

    document.querySelectorAll('[data-theme-option]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = applyTheme(btn.getAttribute('data-theme-option'));
        if (global.SliderApp && typeof global.SliderApp.showToast === 'function') {
          const found = THEMES.find((t) => t.id === next);
          global.SliderApp.showToast(`Theme switched to ${found ? found.label : next}`);
        }
      });
    });

    return current;
  }

  global.ThemeManager = {
    THEMES,
    init,
    applyTheme,
    getSavedTheme
  };
})(window);
