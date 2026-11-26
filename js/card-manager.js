/**
 * Dynamic Card Manager:
 * - Preserves initial cards & merges user-created/edited cards from localStorage
 * - Handles search, category filtering, favorites-only filtering
 * - Builds 3D Glassmorphism slide DOM nodes safely (without innerHTML injection)
 * - Handles Add / Edit / Delete / Preview Card form validation
 */
(function (global) {
  'use strict';

  let allCards = [];
  let recentIds = [];
  let filterState = {
    query: '',
    category: 'All',
    favoritesOnly: false
  };
  let editingCardId = null;

  function loadCards() {
    const saved = global.AppStorage.get(global.AppStorage.KEYS.CARDS, null);
    if (Array.isArray(saved) && saved.length > 0) {
      allCards = saved.map((c) => ({
        ...c,
        tags: Array.isArray(c.tags) ? c.tags : []
      }));
    } else {
      const legacyV2 = global.AppStorage.get(global.AppStorage.KEYS.LEGACY_CARDS_V2, []);
      const legacyV1 = global.AppStorage.get(global.AppStorage.KEYS.LEGACY_CARDS, []);
      const combinedLegacy = [
        ...(Array.isArray(legacyV2) ? legacyV2 : []),
        ...(Array.isArray(legacyV1) ? legacyV1 : [])
      ];
      const seenIds = new Set();
      const userCreated = combinedLegacy.filter((c) => {
        if (!c || c.isDefault !== false || seenIds.has(c.id)) return false;
        seenIds.add(c.id);
        return true;
      });
      allCards = [
        ...global.CardData.INITIAL_CARDS.map((c) => ({ ...c })),
        ...userCreated
      ];
      saveCards();
    }

    const savedRecent = global.AppStorage.get(global.AppStorage.KEYS.RECENT, []);
    recentIds = Array.isArray(savedRecent) ? savedRecent : [];
    global.FavoritesManager.prune(allCards.map((c) => c.id));
  }

  function saveCards() {
    global.AppStorage.set(global.AppStorage.KEYS.CARDS, allCards);
  }

  function recordRecent(cardId) {
    recentIds = [cardId, ...recentIds.filter((id) => id !== cardId)].slice(0, 6);
    global.AppStorage.set(global.AppStorage.KEYS.RECENT, recentIds);
    renderHighlights();
  }

  function getAllCards() {
    return allCards.slice();
  }

  function getFilteredCards() {
    const q = filterState.query.trim().toLowerCase();
    return allCards.filter((card) => {
      if (filterState.favoritesOnly && !global.FavoritesManager.has(card.id)) {
        return false;
      }
      if (filterState.category !== 'All' && card.category !== filterState.category) {
        return false;
      }
      if (q) {
        const inTitle = (card.title || '').toLowerCase().includes(q);
        const inDesc = (card.description || '').toLowerCase().includes(q);
        const inCat = (card.category || '').toLowerCase().includes(q);
        const inTags = Array.isArray(card.tags) && card.tags.some((t) => t.toLowerCase().includes(q));
        return inTitle || inDesc || inCat || inTags;
      }
      return true;
    });
  }

  function createSvgIcon(pathD, filled) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('fill', filled ? 'currentColor' : 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', pathD);
    svg.appendChild(path);
    return svg;
  }

  const HEART_PATH =
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z';
  const SHARE_PATH =
    'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13';

  function buildSlideElement(card) {
    const slide = document.createElement('article');
    slide.className = 'card swiper-slide';
    slide.dataset.cardId = card.id;

    // Image area
    const imageContent = document.createElement('div');
    imageContent.className = 'image-content';

    const cardImage = document.createElement('div');
    cardImage.className = 'card-image is-loading';

    const img = document.createElement('img');
    img.className = 'card-img';
    img.loading = 'lazy';
    img.alt = card.title || 'Slide image';
    img.src = card.image || global.CardData.FALLBACK_IMAGE;
    img.addEventListener('load', () => {
      cardImage.classList.remove('is-loading');
    });
    img.addEventListener('error', () => {
      cardImage.classList.remove('is-loading');
      if (img.src !== global.CardData.FALLBACK_IMAGE) {
        img.src = global.CardData.FALLBACK_IMAGE;
      }
    });

    const overlay = document.createElement('span');
    overlay.className = 'overlay';

    // Top badges inside image
    const topBar = document.createElement('div');
    topBar.className = 'card-top-bar';

    const catBadge = document.createElement('span');
    catBadge.className = 'card-badge';
    catBadge.textContent = card.category || 'Other';

    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    const isFav = global.FavoritesManager.has(card.id);
    favBtn.className = 'fav-btn' + (isFav ? ' is-favorited' : '');
    favBtn.setAttribute('aria-label', isFav ? `Remove ${card.title} from favorites` : `Add ${card.title} to favorites`);
    favBtn.setAttribute('aria-pressed', String(isFav));
    favBtn.dataset.action = 'favorite';
    favBtn.dataset.cardId = card.id;
    favBtn.appendChild(createSvgIcon(HEART_PATH, isFav));

    topBar.appendChild(catBadge);
    topBar.appendChild(favBtn);

    cardImage.appendChild(img);
    imageContent.appendChild(cardImage);
    imageContent.appendChild(overlay);
    imageContent.appendChild(topBar);

    // Content area
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const titleEl = document.createElement('h2');
    titleEl.className = 'name';
    titleEl.textContent = card.title;

    const descEl = document.createElement('p');
    descEl.className = 'description';
    descEl.textContent = card.description;

    const tagsWrap = document.createElement('div');
    tagsWrap.className = 'card-tags';
    (Array.isArray(card.tags) ? card.tags.slice(0, 3) : []).forEach((tag) => {
      const pill = document.createElement('span');
      pill.className = 'tag-pill';
      pill.textContent = tag;
      tagsWrap.appendChild(pill);
    });

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const detailsBtn = document.createElement('button');
    detailsBtn.type = 'button';
    detailsBtn.className = 'button button-primary';
    detailsBtn.textContent = 'View Details';
    detailsBtn.dataset.action = 'details';
    detailsBtn.dataset.cardId = card.id;

    const shareBtn = document.createElement('button');
    shareBtn.type = 'button';
    shareBtn.className = 'icon-action-btn';
    shareBtn.setAttribute('aria-label', `Share ${card.title}`);
    shareBtn.title = 'Share Card';
    shareBtn.dataset.action = 'share';
    shareBtn.dataset.cardId = card.id;
    shareBtn.appendChild(createSvgIcon(SHARE_PATH, false));

    actions.appendChild(detailsBtn);
    actions.appendChild(shareBtn);

    cardContent.appendChild(titleEl);
    cardContent.appendChild(descEl);
    cardContent.appendChild(tagsWrap);
    cardContent.appendChild(actions);

    const inner = document.createElement('div');
    inner.className = 'card-3d-inner';
    inner.appendChild(imageContent);
    inner.appendChild(cardContent);

    slide.appendChild(inner);

    return slide;
  }

  function renderSlides(filtered) {
    const wrapper = document.getElementById('cardWrapper');
    const emptyState = document.getElementById('emptyState');
    const sliderShell = document.getElementById('sliderShell');
    const thumbBar = document.getElementById('thumbnailBar');

    if (!wrapper) return;
    wrapper.textContent = '';

    if (filtered.length === 0) {
      if (emptyState) emptyState.hidden = false;
      if (sliderShell) sliderShell.classList.add('is-empty');
      if (thumbBar) thumbBar.textContent = '';
      return;
    }

    if (emptyState) emptyState.hidden = true;
    if (sliderShell) sliderShell.classList.remove('is-empty');

    const frag = document.createDocumentFragment();
    filtered.forEach((card) => {
      frag.appendChild(buildSlideElement(card));
    });
    wrapper.appendChild(frag);

    renderThumbnails(filtered);
  }

  function renderThumbnails(filtered) {
    const thumbBar = document.getElementById('thumbnailBar');
    if (!thumbBar) return;
    thumbBar.textContent = '';

    const frag = document.createDocumentFragment();
    filtered.forEach((card, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'thumb-item';
      btn.dataset.slideIndex = String(index);
      btn.setAttribute('aria-label', `Go to slide ${index + 1}: ${card.title}`);

      const img = document.createElement('img');
      img.src = card.image || global.CardData.FALLBACK_IMAGE;
      img.alt = card.title;
      img.loading = 'lazy';
      img.addEventListener('error', () => {
        if (img.src !== global.CardData.FALLBACK_IMAGE) {
          img.src = global.CardData.FALLBACK_IMAGE;
        }
      });

      const label = document.createElement('span');
      label.className = 'thumb-title';
      label.textContent = card.title;

      btn.appendChild(img);
      btn.appendChild(label);
      frag.appendChild(btn);
    });
    thumbBar.appendChild(frag);
  }

  function renderStatsAndCounts(filtered) {
    const totalEl = document.getElementById('statTotalCards');
    const favEl = document.getElementById('statFavoritesCount');
    const matchEl = document.getElementById('matchingCountBadge');
    const navFavBadge = document.getElementById('navFavCount');

    if (totalEl) totalEl.textContent = String(allCards.length);
    if (favEl) favEl.textContent = String(global.FavoritesManager.count());
    if (navFavBadge) navFavBadge.textContent = String(global.FavoritesManager.count());
    if (matchEl) {
      matchEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'card' : 'cards'} shown`;
    }
  }

  function renderCategoryPills() {
    const container = document.getElementById('categoryFilterPills');
    if (!container) return;
    container.textContent = '';

    const categories = ['All', ...global.CardData.CATEGORIES];
    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-pill' + (filterState.category === cat ? ' is-active' : '');
      btn.textContent = cat;
      btn.dataset.category = cat;
      container.appendChild(btn);
    });
  }

  function renderHighlights() {
    const featuredGrid = document.getElementById('featuredCardsGrid');
    const recentGrid = document.getElementById('recentCardsGrid');

    if (featuredGrid) {
      featuredGrid.textContent = '';
      const featured = allCards.filter((c) => c.featured).slice(0, 4);
      featured.forEach((card) => {
        featuredGrid.appendChild(buildMiniCard(card));
      });
    }

    if (recentGrid) {
      recentGrid.textContent = '';
      const recentCards = recentIds
        .map((id) => allCards.find((c) => c.id === id))
        .filter(Boolean)
        .slice(0, 4);

      if (recentCards.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'muted-hint';
        empty.textContent = 'Open "View Details" on any card to see your recently viewed items here.';
        recentGrid.appendChild(empty);
      } else {
        recentCards.forEach((card) => {
          recentGrid.appendChild(buildMiniCard(card));
        });
      }
    }
  }

  function buildMiniCard(card) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mini-card glass-panel';
    btn.dataset.action = 'details';
    btn.dataset.cardId = card.id;

    const img = document.createElement('img');
    img.src = card.image || global.CardData.FALLBACK_IMAGE;
    img.alt = card.title;
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      if (img.src !== global.CardData.FALLBACK_IMAGE) {
        img.src = global.CardData.FALLBACK_IMAGE;
      }
    });

    const info = document.createElement('div');
    info.className = 'mini-card-info';

    const title = document.createElement('strong');
    title.textContent = card.title;

    const cat = document.createElement('span');
    cat.textContent = card.category;

    info.appendChild(title);
    info.appendChild(cat);
    btn.appendChild(img);
    btn.appendChild(info);
    return btn;
  }

  function refreshUI(options = {}) {
    const filtered = getFilteredCards();
    renderSlides(filtered);
    renderStatsAndCounts(filtered);
    renderCategoryPills();
    renderHighlights();

    if (global.SliderControls && typeof global.SliderControls.syncSlides === 'function') {
      global.SliderControls.syncSlides(filtered.length, options);
    }
  }

  function isValidImageUrl(url) {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    if (trimmed.startsWith('data:image/')) return true;
    try {
      const parsed = new URL(trimmed);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (err) {
      return false;
    }
  }

  function openAddForm() {
    editingCardId = null;
    const form = document.getElementById('cardForm');
    if (form) form.reset();
    const heading = document.getElementById('cardFormTitle');
    const submitBtn = document.getElementById('cardFormSubmitBtn');
    const errorBox = document.getElementById('cardFormError');
    const previewBox = document.getElementById('cardFormPreview');
    if (heading) heading.textContent = 'Add New Card';
    if (submitBtn) submitBtn.textContent = 'Add Card';
    if (errorBox) errorBox.hidden = true;
    if (previewBox) previewBox.hidden = true;
    global.ModalManager.openBackdrop('cardFormModal');
  }

  function openEditForm(cardId) {
    const card = allCards.find((c) => c.id === cardId);
    if (!card) return;
    editingCardId = cardId;

    const heading = document.getElementById('cardFormTitle');
    const submitBtn = document.getElementById('cardFormSubmitBtn');
    const errorBox = document.getElementById('cardFormError');
    const previewBox = document.getElementById('cardFormPreview');

    if (heading) heading.textContent = 'Edit Card';
    if (submitBtn) submitBtn.textContent = 'Save Changes';
    if (errorBox) errorBox.hidden = true;
    if (previewBox) previewBox.hidden = true;

    document.getElementById('cardTitleInput').value = card.title || '';
    document.getElementById('cardDescInput').value = card.description || '';
    document.getElementById('cardImageInput').value = card.image || '';
    document.getElementById('cardCategoryInput').value = card.category || 'Technology';
    document.getElementById('cardTagsInput').value = Array.isArray(card.tags) ? card.tags.join(', ') : '';

    global.ModalManager.openBackdrop('cardFormModal');
  }

  function showFormError(msg) {
    const errorBox = document.getElementById('cardFormError');
    if (!errorBox) return;
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }

  function validateFormInputs() {
    const title = document.getElementById('cardTitleInput').value.trim();
    const description = document.getElementById('cardDescInput').value.trim();
    const image = document.getElementById('cardImageInput').value.trim();
    const category = document.getElementById('cardCategoryInput').value;
    const tagsRaw = document.getElementById('cardTagsInput').value;

    if (title.length < 2) {
      showFormError('Please enter a card title (at least 2 characters).');
      return null;
    }
    if (description.length < 10) {
      showFormError('Please enter a description (at least 10 characters).');
      return null;
    }
    if (!isValidImageUrl(image)) {
      showFormError('Please enter a valid http:// or https:// image URL.');
      return null;
    }

    // Prevent duplicate titles when adding a new card
    if (!editingCardId) {
      const duplicate = allCards.some((c) => c.title.trim().toLowerCase() === title.toLowerCase());
      if (duplicate) {
        showFormError('A card with this title already exists. Please choose a unique title.');
        return null;
      }
    }

    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 6);

    return {
      title,
      description,
      image,
      category: global.CardData.CATEGORIES.includes(category) ? category : 'Other',
      tags: tags.length ? tags : [category]
    };
  }

  function deleteCard(cardId) {
    const idx = allCards.findIndex((c) => c.id === cardId);
    if (idx === -1) return false;
    allCards.splice(idx, 1);
    global.FavoritesManager.remove(cardId);
    saveCards();
    refreshUI({ preserveSlide: true });
    return true;
  }

  function clearFilters() {
    filterState.query = '';
    filterState.category = 'All';
    filterState.favoritesOnly = false;

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    const favFilterBtn = document.getElementById('favoritesFilterBtn');
    if (favFilterBtn) {
      favFilterBtn.classList.remove('is-active');
      favFilterBtn.setAttribute('aria-pressed', 'false');
    }

    refreshUI({ resetSlide: true });
  }

  function setFavoritesFilter(enabled) {
    filterState.favoritesOnly = Boolean(enabled);
    const favFilterBtn = document.getElementById('favoritesFilterBtn');
    if (favFilterBtn) {
      favFilterBtn.classList.toggle('is-active', filterState.favoritesOnly);
      favFilterBtn.setAttribute('aria-pressed', String(filterState.favoritesOnly));
    }
    refreshUI({ resetSlide: true });
  }

  function populateCategorySelect() {
    const select = document.getElementById('cardCategoryInput');
    if (!select) return;
    select.textContent = '';
    global.CardData.CATEGORIES.forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      select.appendChild(opt);
    });
  }

  function bindEvents() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        filterState.query = e.target.value;
        refreshUI({ resetSlide: true });
      });
    }

    // Category filter pills (event delegation)
    const pillsWrap = document.getElementById('categoryFilterPills');
    if (pillsWrap) {
      pillsWrap.addEventListener('click', (e) => {
        const pill = e.target.closest('[data-category]');
        if (!pill) return;
        filterState.category = pill.dataset.category;
        refreshUI({ resetSlide: true });
      });
    }

    // Clear filters
    document.querySelectorAll('[data-clear-filters]').forEach((btn) => {
      btn.addEventListener('click', () => {
        clearFilters();
        global.SliderApp.showToast('Filters cleared');
      });
    });

    // Favorites filter toggle
    const favFilterBtn = document.getElementById('favoritesFilterBtn');
    if (favFilterBtn) {
      favFilterBtn.addEventListener('click', () => {
        setFavoritesFilter(!filterState.favoritesOnly);
      });
    }

    // Open Add Card form
    document.querySelectorAll('[data-open-add-card]').forEach((btn) => {
      btn.addEventListener('click', openAddForm);
    });

    // Preview Card inside form
    const previewBtn = document.getElementById('cardFormPreviewBtn');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        const data = validateFormInputs();
        if (!data) return;
        const errorBox = document.getElementById('cardFormError');
        if (errorBox) errorBox.hidden = true;

        const previewBox = document.getElementById('cardFormPreview');
        const previewImg = document.getElementById('previewCardImg');
        const previewTitle = document.getElementById('previewCardTitle');
        const previewDesc = document.getElementById('previewCardDesc');
        const previewCat = document.getElementById('previewCardCat');

        if (previewImg) {
          previewImg.src = data.image;
          previewImg.alt = data.title;
          previewImg.onerror = () => {
            previewImg.onerror = null;
            previewImg.src = global.CardData.FALLBACK_IMAGE;
          };
        }
        if (previewTitle) previewTitle.textContent = data.title;
        if (previewDesc) previewDesc.textContent = data.description;
        if (previewCat) previewCat.textContent = data.category;
        if (previewBox) previewBox.hidden = false;
      });
    }

    // Form submit (Add or Edit)
    const form = document.getElementById('cardForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = validateFormInputs();
        if (!data) return;

        if (editingCardId) {
          const idx = allCards.findIndex((c) => c.id === editingCardId);
          if (idx !== -1) {
            allCards[idx] = {
              ...allCards[idx],
              ...data
            };
            saveCards();
            global.ModalManager.closeBackdrop('cardFormModal');
            refreshUI({ preserveSlide: true });
            global.SliderApp.showToast('Card updated successfully');
          }
        } else {
          const newCard = {
            id: 'card-' + Date.now(),
            ...data,
            featured: false,
            isDefault: false
          };
          allCards.push(newCard);
          saveCards();
          global.ModalManager.closeBackdrop('cardFormModal');
          clearFilters();
          // Navigate to newly added card
          const filtered = getFilteredCards();
          const newIdx = filtered.findIndex((c) => c.id === newCard.id);
          if (newIdx >= 0 && global.SliderControls) {
            global.SliderControls.goToSlide(newIdx);
          }
          global.SliderApp.showToast('New card added');
        }
      });
    }

    // Event delegation for slide cards & mini cards
    document.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-action]');
      if (!actionBtn) return;
      const action = actionBtn.dataset.action;
      const cardId = actionBtn.dataset.cardId;
      if (!cardId) return;

      if (action === 'favorite') {
        e.stopPropagation();
        const added = global.FavoritesManager.toggle(cardId);
        actionBtn.classList.toggle('is-favorited', added);
        actionBtn.classList.add('is-popping');
        setTimeout(() => actionBtn.classList.remove('is-popping'), 450);
        refreshUI({ preserveSlide: true });
        global.SliderApp.showToast(added ? 'Added to Favorites' : 'Removed from Favorites');
      } else if (action === 'details') {
        global.ModalManager.openDetails(cardId);
      } else if (action === 'share') {
        const card = allCards.find((c) => c.id === cardId);
        global.ModalManager.shareCard(card);
      }
    });

    // Thumbnail click delegation
    const thumbBar = document.getElementById('thumbnailBar');
    if (thumbBar) {
      thumbBar.addEventListener('click', (e) => {
        const thumb = e.target.closest('[data-slide-index]');
        if (!thumb) return;
        const idx = Number(thumb.dataset.slideIndex);
        if (!Number.isNaN(idx) && global.SliderControls) {
          global.SliderControls.goToSlide(idx);
        }
      });
    }
  }

  function init() {
    loadCards();
    populateCategorySelect();
    bindEvents();
    refreshUI({ resetSlide: true });
  }

  global.CardManager = {
    init,
    getAllCards,
    getFilteredCards,
    refreshUI,
    openAddForm,
    openEditForm,
    deleteCard,
    clearFilters,
    setFavoritesFilter,
    recordRecent
  };
})(window);
