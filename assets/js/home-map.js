(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const progress = window.ShiramineProgress;
    const map = document.querySelector('[data-access-map]');
    if (!progress || !map || !progress.has('oldest')) return;

    map.classList.add('is-record-map');
    map.setAttribute('role', 'button');
    map.setAttribute('tabindex', '0');
    map.setAttribute('aria-label', '白峰町生活行動記録を確認');
    let opening = false;
    const openTruth = () => {
      if (opening || window.SiteAlteration?.isPlaying()) return;
      if (progress.has('topTruth')) { location.href = 'truth.html'; return; }
      opening = true;
      const change = () => { progress.mark('topTruth'); progress.setPhase('truth'); };
      const leave = () => { location.href = 'truth.html'; };
      if (window.SiteAlteration?.play) window.SiteAlteration.play({ message: 'サイトが改変されました', onChange: change, duration: 1500, changeAt: 650 }).then(leave);
      else { change(); leave(); }
    };
    map.addEventListener('click', openTruth);
    map.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openTruth(); } });
  });
})();
