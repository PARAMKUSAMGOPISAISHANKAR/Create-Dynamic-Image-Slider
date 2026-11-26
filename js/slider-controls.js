/**
 * Advanced Swiper 11 Slider Controller:
 * - Multiple transition effects (coverflow, creative, fade, slide, depth)
 * - Autoplay play/pause/speed/hover-pause/tab-visibility-pause
 * - Progress bar & slide counter (01 / 09)
 * - 3D pointer tilt effect
 * - Fullscreen mode & keyboard navigation
 */
(function (global) {
  'use strict';

  const SPEED_MAP = {
    slow: 3500,
    normal: 2000,
    fast: 1200
  };

  let swiperInstance = null;
  let totalSlidesCount = 0;

  let settings = {
    effect: 'coverflow',
    speed: 'normal',
    autoplayEnabled: true,
    pauseOnHover: true,
    tiltEnabled: true,
    effectsEnabled: true
  };

  function loadSettings() {
    const saved = global.AppStorage.get(global.AppStorage.KEYS.SETTINGS, null);
    if (saved && typeof saved === 'object') {
      settings = { ...settings, ...saved };
    }
    document.body.classList.toggle('effects-reduced', !settings.effectsEnabled);
  }

  function saveSettings() {
    global.AppStorage.set(global.AppStorage.KEYS.SETTINGS, settings);
  }

  function buildSwiperConfig(effectName, slideCount) {
    const singleSlideEffects = ['fade', 'cards', 'flip', 'cube'];
    const isSingleView = singleSlideEffects.includes(effectName);
    const canLoop = slideCount >= 4 && !isSingleView;
    const delay = SPEED_MAP[settings.speed] || SPEED_MAP.normal;
    const swiperEffect =
      effectName === 'depth' || effectName === 'zoom-rotate' ? 'creative' : effectName;

    const base = {
      effect: swiperEffect,
      centeredSlides: true,
      slideToClickedSlide: true,
      loop: canLoop,
      grabCursor: true,
      speed: 650,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      slidesPerView: isSingleView ? 1 : 3,
      spaceBetween: 28,
      autoplay: settings.autoplayEnabled
        ? {
            delay,
            disableOnInteraction: false,
            pauseOnMouseEnter: settings.pauseOnHover
          }
        : false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: isSingleView
        ? {
            0: { slidesPerView: 1 },
            520: { slidesPerView: 1 },
            950: { slidesPerView: 1 }
          }
        : {
            0: { slidesPerView: 1, spaceBetween: 16 },
            520: { slidesPerView: 2, spaceBetween: 20 },
            950: { slidesPerView: 3, spaceBetween: 28 }
          }
    };

    if (effectName === 'coverflow') {
      base.coverflowEffect = {
        rotate: 16,
        stretch: 0,
        depth: 150,
        modifier: 1.15,
        slideShadows: false
      };
    } else if (effectName === 'creative') {
      base.creativeEffect = {
        limitProgress: 2,
        prev: {
          translate: ['-95%', 0, -180],
          rotate: [0, 18, 0],
          scale: 0.88,
          opacity: 0.72
        },
        next: {
          translate: ['95%', 0, -180],
          rotate: [0, -18, 0],
          scale: 0.88,
          opacity: 0.72
        }
      };
    } else if (effectName === 'depth') {
      base.creativeEffect = {
        limitProgress: 2,
        prev: {
          translate: ['-88%', 24, -260],
          scale: 0.82,
          opacity: 0.62
        },
        next: {
          translate: ['88%', 24, -260],
          scale: 0.82,
          opacity: 0.62
        }
      };
    } else if (effectName === 'zoom-rotate') {
      base.creativeEffect = {
        limitProgress: 2,
        prev: {
          translate: ['-92%', -18, -220],
          rotate: [0, 0, -6],
          scale: 0.8,
          opacity: 0.65
        },
        next: {
          translate: ['92%', 18, -220],
          rotate: [0, 0, 6],
          scale: 0.8,
          opacity: 0.65
        }
      };
    } else if (effectName === 'cards') {
      base.cardsEffect = {
        perSlideOffset: 10,
        perSlideRotate: 3,
        rotate: true,
        slideShadows: false
      };
    } else if (effectName === 'flip') {
      base.flipEffect = {
        slideShadows: false,
        limitRotation: true
      };
    } else if (effectName === 'cube') {
      base.cubeEffect = {
        shadow: false,
        slideShadows: false
      };
    } else if (effectName === 'fade') {
      base.fadeEffect = {
        crossFade: true
      };
    }

    return base;
  }

  function createSwiper(initialIndex = 0) {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    const slideCount = document.querySelectorAll('#cardWrapper .swiper-slide').length;
    totalSlidesCount = slideCount;

    if (slideCount === 0) {
      updateCounter(0, 0);
      updateProgressBar(0);
      return null;
    }

    const config = buildSwiperConfig(settings.effect, slideCount);
    if (initialIndex > 0 && initialIndex < slideCount) {
      config.initialSlide = initialIndex;
    }

    swiperInstance = new Swiper('.slide-content', config);
    global.swiper = swiperInstance;

    swiperInstance.on('slideChange', () => {
      updateSlideIndicators();
    });

    swiperInstance.on('autoplayTimeLeft', (_swiper, _time, progress) => {
      const pct = Math.max(0, Math.min(100, (1 - progress) * 100));
      updateProgressBar(pct);
    });

    swiperInstance.on('autoplayStart', () => updatePlayPauseUI(true));
    swiperInstance.on('autoplayStop', () => {
      updatePlayPauseUI(false);
      updateProgressBar(0);
    });

    updateSlideIndicators();
    updatePlayPauseUI(Boolean(settings.autoplayEnabled && swiperInstance.autoplay && swiperInstance.autoplay.running));
    return swiperInstance;
  }

  function updateCounter(current, total) {
    const el = document.getElementById('slideCounter');
    if (!el) return;
    const pad = (n) => String(n).padStart(2, '0');
    el.textContent = `${pad(current)} / ${pad(total)}`;
  }

  function updateProgressBar(percent) {
    const bar = document.getElementById('autoplayProgressBar');
    if (bar) {
      bar.style.width = `${percent}%`;
    }
  }

  function updateSlideIndicators() {
    if (!swiperInstance || totalSlidesCount === 0) {
      updateCounter(0, 0);
      return;
    }
    const activeIdx = swiperInstance.realIndex || 0;
    updateCounter(activeIdx + 1, totalSlidesCount);

    document.querySelectorAll('#thumbnailBar .thumb-item').forEach((btn) => {
      const idx = Number(btn.dataset.slideIndex);
      btn.classList.toggle('is-active', idx === activeIdx);
    });
  }

  function updatePlayPauseUI(isPlaying) {
    const btn = document.getElementById('toggleAutoplayBtn');
    const label = document.getElementById('toggleAutoplayLabel');
    if (btn) {
      btn.classList.toggle('is-playing', isPlaying);
      btn.setAttribute('aria-pressed', String(isPlaying));
    }
    if (label) {
      label.textContent = isPlaying ? 'Pause' : 'Play';
    }
  }

  function syncSlides(count, options = {}) {
    let targetIdx = 0;
    if (options.preserveSlide && swiperInstance) {
      targetIdx = Math.min(swiperInstance.realIndex || 0, Math.max(0, count - 1));
    }
    createSwiper(targetIdx);
  }

  function goToSlide(index) {
    if (!swiperInstance) return;
    if (swiperInstance.params.loop) {
      swiperInstance.slideToLoop(index);
    } else {
      swiperInstance.slideTo(index);
    }
  }

  function setEffect(effectName) {
    const allowed = ['coverflow', 'creative', 'depth', 'zoom-rotate', 'cards', 'flip', 'cube', 'fade', 'slide'];
    if (!allowed.includes(effectName)) return;
    const currentIdx = swiperInstance ? swiperInstance.realIndex || 0 : 0;
    settings.effect = effectName;
    saveSettings();
    syncControlInputs();
    createSwiper(currentIdx);
  }

  function setSpeed(speedName) {
    if (!SPEED_MAP[speedName]) return;
    settings.speed = speedName;
    saveSettings();
    syncControlInputs();
    const currentIdx = swiperInstance ? swiperInstance.realIndex || 0 : 0;
    createSwiper(currentIdx);
  }

  function toggleAutoplay(forceState) {
    const next = typeof forceState === 'boolean' ? forceState : !settings.autoplayEnabled;
    settings.autoplayEnabled = next;
    saveSettings();
    const currentIdx = swiperInstance ? swiperInstance.realIndex || 0 : 0;
    createSwiper(currentIdx);
  }

  function restartSlider() {
    goToSlide(0);
    if (settings.autoplayEnabled && swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.start();
    }
    global.SliderApp.showToast('Slider restarted');
  }

  function toggleFullscreen() {
    const target = document.getElementById('sliderSection') || document.documentElement;
    if (!document.fullscreenElement) {
      if (target.requestFullscreen) {
        target.requestFullscreen().catch(() => {
          global.SliderApp.showToast('Fullscreen not supported in this browser');
        });
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function syncControlInputs() {
    const effectSelect = document.getElementById('effectSelect');
    const settingsEffect = document.getElementById('settingsEffectSelect');
    if (effectSelect) effectSelect.value = settings.effect;
    if (settingsEffect) settingsEffect.value = settings.effect;

    const speedSelect = document.getElementById('speedSelect');
    const settingsSpeed = document.getElementById('settingsSpeedSelect');
    if (speedSelect) speedSelect.value = settings.speed;
    if (settingsSpeed) settingsSpeed.value = settings.speed;

    const hoverToggle = document.getElementById('pauseHoverToggle');
    if (hoverToggle) hoverToggle.checked = settings.pauseOnHover;

    const tiltToggle = document.getElementById('tiltToggle');
    const settingsTilt = document.getElementById('settingsTiltToggle');
    if (tiltToggle) tiltToggle.checked = settings.tiltEnabled;
    if (settingsTilt) settingsTilt.checked = settings.tiltEnabled;

    const effectsToggle = document.getElementById('effectsToggle');
    const settingsEffects = document.getElementById('settingsEffectsToggle');
    if (effectsToggle) effectsToggle.checked = settings.effectsEnabled;
    if (settingsEffects) settingsEffects.checked = settings.effectsEnabled;
  }

  function bindTiltInteraction() {
    const wrapper = document.getElementById('cardWrapper');
    if (!wrapper) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    wrapper.addEventListener('pointermove', (e) => {
      if (!settings.tiltEnabled || !settings.effectsEnabled) return;
      const card = e.target.closest('.card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = (x * 26).toFixed(2);
      const rotateX = (-y * 26).toFixed(2);
      const shiftX = (x * 16).toFixed(2);
      const shiftY = (y * 16).toFixed(2);
      card.style.setProperty('--tilt-rx', `${rotateX}deg`);
      card.style.setProperty('--tilt-ry', `${rotateY}deg`);
      card.style.setProperty('--shift-x', `${shiftX}px`);
      card.style.setProperty('--shift-y', `${shiftY}px`);
      card.classList.add('is-tilting');
    });

    wrapper.addEventListener('pointerout', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      if (!card.contains(e.relatedTarget)) {
        card.style.removeProperty('--tilt-rx');
        card.style.removeProperty('--tilt-ry');
        card.style.removeProperty('--shift-x');
        card.style.removeProperty('--shift-y');
        card.classList.remove('is-tilting');
      }
    });
  }

  function bindControls() {
    const toggleBtn = document.getElementById('toggleAutoplayBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        toggleAutoplay();
        global.SliderApp.showToast(settings.autoplayEnabled ? 'Autoplay resumed' : 'Autoplay paused');
      });
    }

    const restartBtn = document.getElementById('restartSliderBtn');
    if (restartBtn) restartBtn.addEventListener('click', restartSlider);

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    ['effectSelect', 'settingsEffectSelect'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          setEffect(e.target.value);
          global.SliderApp.showToast(`Transition: ${e.target.options[e.target.selectedIndex].text}`);
        });
      }
    });

    ['speedSelect', 'settingsSpeedSelect'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          setSpeed(e.target.value);
          global.SliderApp.showToast(`Autoplay speed: ${e.target.value}`);
        });
      }
    });

    const hoverToggle = document.getElementById('pauseHoverToggle');
    if (hoverToggle) {
      hoverToggle.addEventListener('change', (e) => {
        settings.pauseOnHover = e.target.checked;
        saveSettings();
        const currentIdx = swiperInstance ? swiperInstance.realIndex || 0 : 0;
        createSwiper(currentIdx);
      });
    }

    ['tiltToggle', 'settingsTiltToggle'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          settings.tiltEnabled = e.target.checked;
          saveSettings();
          syncControlInputs();
        });
      }
    });

    ['effectsToggle', 'settingsEffectsToggle'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          settings.effectsEnabled = e.target.checked;
          document.body.classList.toggle('effects-reduced', !settings.effectsEnabled);
          saveSettings();
          syncControlInputs();
        });
      }
    });

    // Pause autoplay when tab becomes inactive
    document.addEventListener('visibilitychange', () => {
      if (!swiperInstance || !swiperInstance.autoplay || !settings.autoplayEnabled) return;
      if (document.hidden) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) || '';
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable;

      if (e.key === 'Escape') {
        if (global.ModalManager && global.ModalManager.closeTopModal()) {
          e.preventDefault();
        }
        return;
      }

      if (isTyping) return;
      if (document.querySelector('.modal-backdrop.is-open')) return;

      if (e.key === 'ArrowLeft' && swiperInstance) {
        e.preventDefault();
        swiperInstance.slidePrev();
      } else if (e.key === 'ArrowRight' && swiperInstance) {
        e.preventDefault();
        swiperInstance.slideNext();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        toggleAutoplay();
      }
    });
  }

  function init() {
    loadSettings();
    syncControlInputs();
    bindControls();
    bindTiltInteraction();
  }

  global.SliderControls = {
    init,
    syncSlides,
    goToSlide,
    setEffect,
    setSpeed,
    toggleAutoplay,
    restartSlider,
    toggleFullscreen
  };
})(window);
