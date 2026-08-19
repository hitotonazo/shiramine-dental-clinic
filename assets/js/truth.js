(() => {
  'use strict';
  const SHARE_CONFIG = {
    text: '親子三代で通える歯医者。\n「白峰デンタルクリニック」を調査しました。\n\n#おかしなサイト\nhttps://x.com/ARG_ObserverX'
  };
  const init = () => {
    const section = document.querySelector('[data-ending-section]');
    const finalMessage = document.querySelector('[data-ending-final]');
    const shareSection = document.querySelector('[data-share-section]');
    const share = document.querySelector('[data-x-share]');
    window.ShiramineProgress?.setPhase('truth');
    if (share) share.href = `https://twitter.com/intent/tweet?${new URLSearchParams({ text: SHARE_CONFIG.text })}`;
    if (!section || !finalMessage || !shareSection) return;
    let started = false;
    const finish = () => {
      if (started) return;
      started = true;
      section.classList.add('is-running');
      window.setTimeout(() => {
        finalMessage.hidden = false;
        shareSection.hidden = false;
        window.ShiramineProgress?.mark('ending');
        window.ShiramineProgress?.setPhase('ending');
      }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 3600);
    };
    if ('IntersectionObserver' in window) new IntersectionObserver((entries, observer) => { if (entries.some((entry) => entry.isIntersecting)) { finish(); observer.disconnect(); } }, { threshold: .3 }).observe(section); else finish();
  };
  document.addEventListener('DOMContentLoaded', init);
})();
