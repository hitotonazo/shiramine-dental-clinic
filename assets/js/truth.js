(() => {
  'use strict';
  const SHARE_CONFIG = {
    text: '「これからも、地域の皆さまとともに。」\n地域って、本当に白峰だけなのでしょうか。\n\n#おかしなサイト\nhttps://x.com/ARG_ObserverX'
  };
  const init = () => {
    if (!window.ShiramineProgress?.has('topTruth')) { location.replace('index.html'); return; }
    const section = document.querySelector('[data-ending-section]');
    const finalMessage = document.querySelector('[data-ending-final]');
    const shareSection = document.querySelector('[data-share-section]');
    const share = document.querySelector('[data-x-share]');
    window.ShiramineProgress?.setPhase('truth');
    const lifeRecords = {
      'SH-018': { pin:['34%','70%'], items:[['2000','白峰住宅エリア　居住記録'],['2006','白峰小学校　在籍記録'],['2014','白峰工業　勤務記録'],['2021','白峰デンタルクリニック　来院記録']] },
      'SH-026': { pin:['60%','33%'], items:[['1990','白峰住宅エリア　居住記録'],['1997','白峰小学校　在籍記録'],['2008','白峰中央医院　受診記録'],['2017','白峰デンタルクリニック　来院記録']] },
      'SH-033': { pin:['54%','53%'], items:[['1998','白峰住宅エリア　居住記録'],['2005','白峰中学校　登録記録'],['2014','白峰工業　勤務記録'],['2015','白峰デンタルクリニック　来院記録']] },
      'SH-041': { pin:['75%','56%'], items:[['2002','白峰住宅エリア　居住記録'],['2009','白峰小学校　在籍記録'],['2017','白峰中央医院　受診記録'],['2021','白峰デンタルクリニック　来院記録']] },
      'SH-052': { pin:['81%','68%'], items:[['2008','白峰小学校　入学記録'],['2014','白峰中学校　登録記録'],['2020','白峰工業　勤務開始'],['2023','白峰中央医院　受診記録'],['2026','白峰デンタルクリニック　来院・保存歯サンプル採取']] }
    };
    const recordMap = document.querySelector('[data-truth-record-map]');
    const lifeHeading = document.querySelector('[data-truth-life-heading]');
    const lifeDetail = document.querySelector('[data-truth-life-detail]');
    const mapPin = document.querySelector('[data-truth-map-pin]');
    const mapPinLabel = document.querySelector('[data-truth-map-pin-label]');
    const renderLife = (id) => {
      const record = lifeRecords[id]; if (!record || !lifeHeading || !lifeDetail || !mapPin || !mapPinLabel) return;
      lifeHeading.textContent = id;
      lifeDetail.innerHTML = `<h3>対象者プロフィール</h3><p>管理対象　${id}</p><h3>生活行動記録</h3><ol>${record.items.map(([year, text]) => `<li><strong>${year}</strong><span>${text}</span></li>`).join('')}</ol>`;
      mapPin.style.left = record.pin[0]; mapPin.style.top = record.pin[1]; mapPinLabel.style.left = record.pin[0]; mapPinLabel.style.top = record.pin[1]; mapPinLabel.textContent = `${id} / LAST RECORDED LOCATION`;
    };
    const otherSubjects = document.querySelector('[data-truth-other-subjects]');
    const residentsAction = document.querySelector('[data-truth-residents-action]');
    const residentSummary = document.querySelector('[data-truth-resident-summary]');
    const oldestAction = document.querySelector('[data-truth-oldest-action]');
    const earliestRecord = document.querySelector('[data-truth-earliest-record]');
    const lifeTitle = document.querySelector('[data-truth-life-title]');
    const addResidentPoints = () => {
      if (!recordMap || recordMap.querySelector('i')) return;
      let seed = 52026;
      for (let index = 0; index < 160; index += 1) {
        seed = (seed * 1664525 + 1013904223) >>> 0; const left = 5 + (seed / 4294967296) * 90;
        seed = (seed * 1664525 + 1013904223) >>> 0; const top = 6 + (seed / 4294967296) * 86;
        const dot = document.createElement('i'); dot.style.left = `${left.toFixed(2)}%`; dot.style.top = `${top.toFixed(2)}%`; dot.style.animationDelay = `-${((seed % 1800) / 1000).toFixed(2)}s`; recordMap.append(dot);
      }
    };
    const showOthers = (scroll = true) => {
      window.ShiramineProgress?.mark('others'); otherSubjects.hidden = false; residentsAction.hidden = false;
      if (scroll) otherSubjects.scrollIntoView({ behavior:'smooth', block:'nearest' });
    };
    const showResidents = (scroll = true) => {
      window.ShiramineProgress?.mark('residents'); lifeTitle.textContent = '白峰町生活行動記録'; recordMap.classList.add('has-residents'); addResidentPoints(); residentSummary.hidden = false; oldestAction.hidden = false;
      if (scroll) residentSummary.scrollIntoView({ behavior:'smooth', block:'nearest' });
    };
    const showOldest = (scroll = true) => {
      window.ShiramineProgress?.mark('oldest'); earliestRecord.hidden = false;
      if (scroll) earliestRecord.scrollIntoView({ behavior:'smooth', block:'nearest' });
    };
    document.querySelectorAll('[data-truth-subject]').forEach((button) => button.addEventListener('click', () => renderLife(button.dataset.truthSubject)));
    document.querySelector('[data-truth-show-others]')?.addEventListener('click', () => showOthers());
    document.querySelector('[data-truth-show-residents]')?.addEventListener('click', () => showResidents());
    document.querySelector('[data-truth-show-oldest]')?.addEventListener('click', () => showOldest());
    renderLife('SH-052');
    if (window.ShiramineProgress?.has('oldest')) {
      showOthers(false);
      showResidents(false);
      showOldest(false);
    } else if (window.ShiramineProgress?.has('residents')) {
      showOthers(false);
      showResidents(false);
    } else if (window.ShiramineProgress?.has('others')) {
      showOthers(false);
    }
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
