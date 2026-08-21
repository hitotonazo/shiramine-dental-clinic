(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const progress = window.ShiramineProgress;
    const map = document.querySelector('[data-access-map]');
    if (!progress || !map || !progress.has('life')) return;
    map.classList.add('is-record-map');
    map.setAttribute('role', 'button'); map.setAttribute('tabindex', '0'); map.setAttribute('aria-label', '白峰町生活行動記録を確認');
    const points = document.createElement('div'); points.className = 'access-observation-points'; points.setAttribute('aria-hidden', 'true');
    let seed = 52026;
    for (let index = 0; index < 128; index += 1) {
      seed = (seed * 1664525 + 1013904223) >>> 0; const left = 4 + (seed / 4294967296) * 92;
      seed = (seed * 1664525 + 1013904223) >>> 0; const top = 5 + (seed / 4294967296) * 90;
      const dot = document.createElement('i'); dot.style.left = `${left.toFixed(2)}%`; dot.style.top = `${top.toFixed(2)}%`; points.append(dot);
    }
    map.append(points);
    let openingTruth = false;
    const moveToTruth = () => {
      progress.setPhase('truth');
      location.href = 'truth.html';
    };
    const openTruth = () => {
      if (openingTruth || window.SiteAlteration?.isPlaying()) return;
      openingTruth = true;
      if (progress.has('topTruth')) {
        moveToTruth();
        return;
      }
      const change = () => { progress.mark('topTruth'); progress.setPhase('truth'); };
      if (window.SiteAlteration?.play) {
        window.SiteAlteration.play({ message: 'サイトが改変されました', onChange: change, duration: 1500, changeAt: 650 }).then(moveToTruth);
      } else {
        change();
        moveToTruth();
      }
    };
    map.addEventListener('click', openTruth);
    map.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openTruth(); } });
  });
})();
