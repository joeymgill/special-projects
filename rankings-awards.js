(function () {
  'use strict';
  function initRankingsAwards() {
    const carousels = document.querySelectorAll('[data-rankings-carousel]');
    carousels.forEach(function (carousel, index) {
      if (carousel.dataset.initialized === 'true') return;
      carousel.dataset.initialized = 'true';
      const instructions = carousel.querySelector('[data-rankings-instructions]');
      const track = carousel.querySelector('[data-rankings-track]');
      const previousButton = carousel.querySelector('[data-rankings-previous]');
      const nextButton = carousel.querySelector('[data-rankings-next]');
      const controls = carousel.querySelector('[data-rankings-controls]');
      const status = carousel.querySelector('[data-rankings-status]');
      const items = Array.from(carousel.querySelectorAll('.rankings-awards__item'));
      let scrollTimer;
      if (instructions) {
        const id = 'rankings-awards-instructions-' + (index + 1);
        instructions.id = id;
        carousel.setAttribute('aria-describedby', id);
      }
      if (!track || !previousButton || !nextButton || !items.length) return;
      if (items.length === 1 && controls) controls.hidden = true;
      function getCurrentIndex() {
        const rect = track.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        let closest = 0;
        let distance = Infinity;
        items.forEach(function (item, itemIndex) {
          const itemRect = item.getBoundingClientRect();
          const difference = Math.abs(center - (itemRect.left + itemRect.width / 2));
          if (difference < distance) { distance = difference; closest = itemIndex; }
        });
        return closest;
      }
      function updateControls(announce) {
        const current = getCurrentIndex();
        previousButton.disabled = current === 0;
        nextButton.disabled = current === items.length - 1;
        if (announce && status) status.textContent = 'Showing ranking or award ' + (current + 1) + ' of ' + items.length + '.';
      }
      function moveTo(index) {
        const target = Math.max(0, Math.min(index, items.length - 1));
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        items[target].scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
        window.setTimeout(function () { updateControls(true); }, reduced ? 0 : 350);
      }
      previousButton.addEventListener('click', function () { moveTo(getCurrentIndex() - 1); });
      nextButton.addEventListener('click', function () { moveTo(getCurrentIndex() + 1); });
      track.addEventListener('scroll', function () {
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(function () { updateControls(false); }, 100);
      });
      window.addEventListener('resize', function () { window.requestAnimationFrame(function () { updateControls(false); }); });
      updateControls(false);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRankingsAwards);
  else initRankingsAwards();
}());
