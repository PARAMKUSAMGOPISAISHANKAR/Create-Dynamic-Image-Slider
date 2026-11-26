/**
 * Favorites state and persistence manager.
 */
(function (global) {
  'use strict';

  let favoriteIds = new Set();

  function load() {
    const saved = global.AppStorage.get(global.AppStorage.KEYS.FAVORITES, []);
    if (Array.isArray(saved)) {
      favoriteIds = new Set(saved.filter((id) => typeof id === 'string'));
    }
    return favoriteIds;
  }

  function save() {
    global.AppStorage.set(global.AppStorage.KEYS.FAVORITES, Array.from(favoriteIds));
  }

  function has(cardId) {
    return favoriteIds.has(cardId);
  }

  function toggle(cardId) {
    if (!cardId) return false;
    let added = false;
    if (favoriteIds.has(cardId)) {
      favoriteIds.delete(cardId);
      added = false;
    } else {
      favoriteIds.add(cardId);
      added = true;
    }
    save();
    return added;
  }

  function remove(cardId) {
    if (favoriteIds.delete(cardId)) {
      save();
    }
  }

  function count() {
    return favoriteIds.size;
  }

  function prune(validCardIds) {
    const validSet = new Set(validCardIds);
    let changed = false;
    favoriteIds.forEach((id) => {
      if (!validSet.has(id)) {
        favoriteIds.delete(id);
        changed = true;
      }
    });
    if (changed) save();
  }

  function getAll() {
    return Array.from(favoriteIds);
  }

  load();

  global.FavoritesManager = {
    load,
    has,
    toggle,
    remove,
    count,
    prune,
    getAll
  };
})(window);
