(() => {
  'use strict';
  const subjects = { 'SH-018': ['2001','乳歯','87.2','specimen-sh018.jpg'], 'SH-026': ['2007','智歯','91.8','specimen-sh026.jpg'], 'SH-033': ['2015','治療抜歯','89.4','specimen-sh033.jpg'], 'SH-041': ['2021','智歯','96.1','specimen-sh041.jpg'], 'SH-052': ['2026','乳歯','99.4','specimen-sh052.jpg?v=20260820-1'] };
  const $ = (selector) => document.querySelector(selector);
  document.addEventListener('DOMContentLoaded', () => {
    const progress = window.ShiramineProgress;
    if (!progress) return;
    if (!progress.has('foundPhase1')) { $('[data-records-denied]').hidden = false; return; }
    $('[data-records-content]').hidden = false;
    progress.setPhase(progress.has('life') ? 'phase3' : 'phase2');
    const list = $('[data-specimen-list]'); const detail = $('[data-specimen-detail]');
    const gate = $('[data-record-gate]'); const gateTitle = $('[data-record-gate-title]');
    const gateMessage = $('[data-record-gate-message]'); const gateCode = $('[data-record-gate-code]'); const gateAction = $('[data-record-gate-action]');
    let attempts = 0;
    const closeGate = () => { gate.hidden = true; document.body.classList.remove('record-gate-is-open'); };
    const returnToTop = () => { progress.mark('life'); progress.setPhase('phase3'); location.href = 'index.html'; };
    const showGate = (stage) => {
      gate.hidden = false; document.body.classList.add('record-gate-is-open');
      if (stage === 'warning') {
        gateCode.textContent = 'SECURITY NOTICE / RESTRICTED DATA'; gateTitle.textContent = '警告';
        gateMessage.textContent = 'この画像には通常の標本記録に含まれない情報が関連付けられています。';
        gateAction.hidden = false; gateAction.textContent = '警告を閉じる'; gateAction.onclick = closeGate; gateAction.focus(); return;
      }
      gateCode.textContent = 'AUTHENTICATION REQUIRED'; gateTitle.textContent = '内部認証'; gateMessage.textContent = '対象者記録を照合しています…'; gateAction.hidden = true;
      window.setTimeout(() => {
        closeGate();
        const change = () => { progress.mark('life'); progress.setPhase('phase3'); };
        if (window.SiteAlteration?.play) window.SiteAlteration.play({ message: 'サイトが改変されました', onChange: change, duration: 1500, changeAt: 650 }).then(returnToTop);
        else { change(); returnToTop(); }
      }, 1200);
    };
    const openSh052 = () => {
      if (progress.has('life') || window.SiteAlteration?.isPlaying()) return;
      if (attempts === 0) { attempts = 1; showGate('warning'); return; }
      showGate('auth');
    };
    const select = (id) => {
      const data = subjects[id]; list.querySelectorAll('button').forEach((button) => button.classList.toggle('is-selected', button.dataset.id === id));
      const interactive = id === 'SH-052' && !progress.has('life');
      detail.innerHTML = `<img class="${id === 'SH-052' ? 'is-sh052-specimen' : ''}" src="images/${data[3]}" alt="${id}の標本写真"${interactive ? ' data-open-sh052 tabindex="0" role="button" aria-label="SH-052の記録画像を確認"' : ''}><div><p>管理番号　<strong>${id}</strong></p><dl><div><dt>採取年</dt><dd>${data[0]}</dd></div><div><dt>採取理由</dt><dd>${data[1]}</dd></div><div><dt>反応値</dt><dd>${data[2]}</dd></div></dl></div>`;
      const image = detail.querySelector('[data-open-sh052]'); image?.addEventListener('click', openSh052);
      image?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openSh052(); } });
    };
    Object.entries(subjects).forEach(([id, data]) => { const button = document.createElement('button'); button.type = 'button'; button.dataset.id = id; button.innerHTML = `<img src="images/${data[3]}" alt="${id}の標本写真"><span>${id}</span>`; button.onclick = () => select(id); list.append(button); });
    select('SH-018');
  });
})();
