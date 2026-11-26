/**
 * Modal, Lightbox, Settings Dialog, and Confirmation Dialog Manager.
 * Uses safe DOM updates (textContent) for all user-provided data.
 */
(function (global) {
  'use strict';

  let currentDetailsIndex = 0;
  let currentFilteredList = [];
  let pendingDeleteId = null;

  function getBackdrop(id) {
    return document.getElementById(id);
  }

  function openBackdrop(id) {
    const el = getBackdrop(id);
    if (!el) return;
    el.hidden = false;
    requestAnimationFrame(() => {
      el.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeBackdrop(id) {
    const el = getBackdrop(id);
    if (!el) return;
    el.classList.remove('is-open');
    el.hidden = true;
    const anyOpen = document.querySelector('.modal-backdrop.is-open');
    if (!anyOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeTopModal() {
    const order = ['lightboxModal', 'confirmModal', 'cardFormModal', 'settingsModal', 'detailsModal'];
    for (const id of order) {
      const el = getBackdrop(id);
      if (el && !el.hidden) {
        closeBackdrop(id);
        return true;
      }
    }
    return false;
  }

  function renderDetails(card, list, index) {
    if (!card) return;
    currentFilteredList = Array.isArray(list) && list.length ? list : [card];
    currentDetailsIndex = Math.max(0, Math.min(index, currentFilteredList.length - 1));

    const img = document.getElementById('detailsImage');
    const title = document.getElementById('detailsTitle');
    const desc = document.getElementById('detailsDescription');
    const cat = document.getElementById('detailsCategory');
    const tagsWrap = document.getElementById('detailsTags');
    const meta = document.getElementById('detailsMeta');
    const favBtn = document.getElementById('detailsFavBtn');
    const favLabel = document.getElementById('detailsFavLabel');
    const editBtn = document.getElementById('detailsEditBtn');
    const deleteBtn = document.getElementById('detailsDeleteBtn');

    if (img) {
      img.src = card.image || global.CardData.FALLBACK_IMAGE;
      img.alt = card.title;
      img.onerror = () => {
        img.onerror = null;
        img.src = global.CardData.FALLBACK_IMAGE;
      };
    }
    if (title) title.textContent = card.title;
    if (desc) desc.textContent = card.description;
    if (cat) cat.textContent = card.category || 'Other';

    if (tagsWrap) {
      tagsWrap.textContent = '';
      const tags = Array.isArray(card.tags) ? card.tags : [];
      tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'tag-pill';
        span.textContent = tag;
        tagsWrap.appendChild(span);
      });
    }

    if (meta) {
      const originLabel = card.isDefault ? 'Curated Collection' : 'User Created';
      meta.textContent = `${originLabel} • Card ${currentDetailsIndex + 1} of ${currentFilteredList.length}`;
    }

    const isFav = global.FavoritesManager.has(card.id);
    if (favBtn) {
      favBtn.classList.toggle('is-favorited', isFav);
      favBtn.setAttribute('aria-pressed', String(isFav));
      favBtn.dataset.cardId = card.id;
    }
    if (favLabel) {
      favLabel.textContent = isFav ? 'Favorited' : 'Add to Favorites';
    }
    if (editBtn) editBtn.dataset.cardId = card.id;
    if (deleteBtn) deleteBtn.dataset.cardId = card.id;

    if (global.CardManager && typeof global.CardManager.recordRecent === 'function') {
      global.CardManager.recordRecent(card.id);
    }
  }

  function openDetails(cardId) {
    const list = global.CardManager.getFilteredCards();
    let idx = list.findIndex((c) => c.id === cardId);
    let card = idx >= 0 ? list[idx] : null;

    if (!card) {
      const all = global.CardManager.getAllCards();
      const allIdx = all.findIndex((c) => c.id === cardId);
      if (allIdx >= 0) {
        card = all[allIdx];
        idx = allIdx;
        renderDetails(card, all, idx);
        openBackdrop('detailsModal');
        return;
      }
      return;
    }

    renderDetails(card, list, idx);
    openBackdrop('detailsModal');
  }

  function stepDetails(delta) {
    if (!currentFilteredList.length) return;
    const nextIdx = (currentDetailsIndex + delta + currentFilteredList.length) % currentFilteredList.length;
    renderDetails(currentFilteredList[nextIdx], currentFilteredList, nextIdx);
  }

  function openLightbox(src, caption) {
    const img = document.getElementById('lightboxImage');
    const cap = document.getElementById('lightboxCaption');
    if (img) {
      img.src = src || global.CardData.FALLBACK_IMAGE;
      img.alt = caption || 'Image Preview';
    }
    if (cap) {
      cap.textContent = caption || '';
    }
    openBackdrop('lightboxModal');
  }

  function openConfirmDelete(cardId, cardTitle) {
    pendingDeleteId = cardId;
    const msg = document.getElementById('confirmMessage');
    if (msg) {
      msg.textContent = `Are you sure you want to delete "${cardTitle}"? This action cannot be undone.`;
    }
    openBackdrop('confirmModal');
  }

  async function shareCard(card) {
    if (!card) return;
    const shareText = `${card.title} (${card.category})\n${card.description}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: shareText,
          url: window.location.href
        });
        global.SliderApp.showToast('Card shared successfully');
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        global.SliderApp.showToast('Card details copied to clipboard');
        return;
      } catch (err) {
        // Fallback below
      }
    }

    global.SliderApp.showToast('Share ready: ' + card.title);
  }

  function init() {
    // Backdrop click close
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeBackdrop(backdrop.id);
        }
      });
    });

    // Close buttons
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        closeBackdrop(btn.getAttribute('data-close-modal'));
      });
    });

    // Details prev/next
    const prevBtn = document.getElementById('detailsPrevBtn');
    const nextBtn = document.getElementById('detailsNextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => stepDetails(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => stepDetails(1));

    // Details favorite
    const detailsFavBtn = document.getElementById('detailsFavBtn');
    if (detailsFavBtn) {
      detailsFavBtn.addEventListener('click', () => {
        const cardId = detailsFavBtn.dataset.cardId;
        if (!cardId) return;
        const added = global.FavoritesManager.toggle(cardId);
        detailsFavBtn.classList.toggle('is-favorited', added);
        detailsFavBtn.setAttribute('aria-pressed', String(added));
        const favLabel = document.getElementById('detailsFavLabel');
        if (favLabel) favLabel.textContent = added ? 'Favorited' : 'Add to Favorites';
        global.CardManager.refreshUI({ preserveSlide: true });
        global.SliderApp.showToast(added ? 'Added to Favorites' : 'Removed from Favorites');
      });
    }

    // Details share
    const shareBtn = document.getElementById('detailsShareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const card = currentFilteredList[currentDetailsIndex];
        shareCard(card);
      });
    }

    // Details lightbox trigger
    const detailsImgWrap = document.getElementById('detailsImageWrap');
    if (detailsImgWrap) {
      detailsImgWrap.addEventListener('click', () => {
        const card = currentFilteredList[currentDetailsIndex];
        if (card) openLightbox(card.image, card.title);
      });
    }

    // Details edit & delete
    const editBtn = document.getElementById('detailsEditBtn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const cardId = editBtn.dataset.cardId;
        closeBackdrop('detailsModal');
        global.CardManager.openEditForm(cardId);
      });
    }

    const deleteBtn = document.getElementById('detailsDeleteBtn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        const card = currentFilteredList[currentDetailsIndex];
        if (card) openConfirmDelete(card.id, card.title);
      });
    }

    // Confirm delete
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', () => {
        if (!pendingDeleteId) return;
        const deleted = global.CardManager.deleteCard(pendingDeleteId);
        pendingDeleteId = null;
        closeBackdrop('confirmModal');
        closeBackdrop('detailsModal');
        if (deleted) {
          global.SliderApp.showToast('Card deleted');
        }
      });
    }

    // Settings open
    document.querySelectorAll('[data-open-settings]').forEach((btn) => {
      btn.addEventListener('click', () => openBackdrop('settingsModal'));
    });
  }

  global.ModalManager = {
    init,
    openBackdrop,
    closeBackdrop,
    closeTopModal,
    openDetails,
    openLightbox,
    openConfirmDelete,
    shareCard
  };
})(window);
