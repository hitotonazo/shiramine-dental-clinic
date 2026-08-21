(() => {
  'use strict';
  const init = () => {
    const flow = document.querySelector('[data-phase1-flow]');
    const normalFlow = document.querySelector('[data-normal-flow]');
    const mosaic = document.querySelector('[data-phase1-mosaic]');
    const link = document.querySelector('[data-phase1-record-link]');
    if (!flow || !mosaic || !link || !window.ShiramineProgress) return;
    const reveal = () => { flow.hidden = false; mosaic.querySelector('[data-phase1-subject]').textContent = '保存対象'; mosaic.querySelector('[data-phase1-storage]').textContent = '院内保管'; mosaic.disabled = true; link.hidden = false; };
    normalFlow && (normalFlow.hidden = true);
    if (window.ShiramineProgress.has('foundPhase1')) { reveal(); return; }
    flow.hidden = false;
    mosaic.addEventListener('click', () => {
      if (window.ShiramineProgress.has('foundPhase1') || window.SiteAlteration?.isPlaying()) return;
      const change = () => { window.ShiramineProgress.mark('foundPhase1'); window.ShiramineProgress.setPhase('phase1'); reveal(); };
      if (window.SiteAlteration?.play) window.SiteAlteration.play({ message: 'サイトが改変されました', onChange: change, focusTarget: link, duration: 1500, changeAt: 650 }); else change();
    }, { once: true });
  };
  document.addEventListener('DOMContentLoaded', init);
})();
