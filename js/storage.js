/**
 * Safe localStorage wrapper for Dynamic Image Slider Pro.
 */
(function (global) {
  'use strict';

  const KEYS = {
    CARDS: 'dispro_cards_v3',
    LEGACY_CARDS_V2: 'dispro_cards_v2',
    LEGACY_CARDS: 'dispro_cards_v1',
    FAVORITES: 'dispro_favorites_v1',
    THEME: 'dispro_theme_v1',
    SETTINGS: 'dispro_settings_v2',
    RECENT: 'dispro_recent_v1'
  };

  function get(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  function remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      // Ignore storage errors
    }
  }

  global.AppStorage = {
    KEYS,
    get,
    set,
    remove
  };
})(window);
