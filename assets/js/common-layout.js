(() => {
  'use strict';

  const isTopPage = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html');
  const topLink = (fragment) => `${isTopPage ? '' : 'index.html'}${fragment}`;
  const navigation = [
    ['当院について', topLink('#about')],
    ['診療案内', topLink('#treatment')],
    ['院長・スタッフ', topLink('#staff')],
    ['歯のコラム', topLink('#column')],
    ['アクセス', topLink('#access')]
  ];

  const links = navigation.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('');

  const header = `
    <header class="site-header" data-site-header-component>
      <div class="l-container site-header__inner">
        <a class="site-logo" href="index.html" aria-label="白峰デンタルクリニック トップページ">
          <img src="images/logo.png" width="2172" height="724" alt="白峰デンタルクリニック">
        </a>
        <button class="site-header__reset site-header__reset--mobile" type="button" data-exploration-reset>探索リセット</button>
        <button class="site-header__menu-button" type="button" aria-expanded="false" aria-controls="global-navigation">
          <span class="site-header__menu-icon" aria-hidden="true"></span><span>メニュー</span>
        </button>
        <nav class="site-header__navigation" id="global-navigation" aria-label="メインナビゲーション">
          <ul>${links}</ul>
          <div class="site-header__actions"><button class="site-header__reset" type="button" data-exploration-reset>探索リセット</button><a class="c-button c-button--primary site-header__reservation" href="${topLink('#reservation')}">WEB予約</a></div>
        </nav>
      </div>
    </header>`;

  const footer = `
    <footer class="site-footer" data-site-footer-component>
      <div class="l-container site-footer__inner">
        <div class="site-footer__brand">
          <a class="site-logo site-logo--footer" href="index.html" aria-label="白峰デンタルクリニック トップページ">
            <img src="images/logo.png" width="2172" height="724" alt="白峰デンタルクリニック">
          </a>
          <p>地域の皆さまのお口の健康を、毎日の暮らしに寄り添いながら支えます。</p>
        </div>
        <nav class="site-footer__navigation" aria-label="フッターナビゲーション"><ul>${links}<li><a href="${topLink('#reservation')}">WEB予約</a></li></ul></nav>
        <section class="site-footer__information" aria-labelledby="clinic-information-title">
          <h2 id="clinic-information-title">診療時間・アクセス</h2>
          <dl><div><dt>診療時間</dt><dd>平日 9:00–18:00／土曜 9:00–13:00</dd></div><div><dt>休診日</dt><dd>日曜・祝日</dd></div><div><dt>所在地</dt><dd>白峰町中央 0-0-0（設定準備中）</dd></div></dl>
        </section>
      </div>
      <div class="site-footer__bottom"><div class="l-container"><small>&copy;ぺいぽぴー<br>※このWebサイトの内容はフィクションであり、実在の人物・団体とは一切関係ありません。</small></div></div>
    </footer>`;

  const initialiseMenu = () => {
    const component = document.querySelector('[data-site-header-component]');
    const button = component?.querySelector('.site-header__menu-button');
    const nav = component?.querySelector('.site-header__navigation');
    if (!button || !nav) return;
    const setMenu = (open) => {
      button.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-is-open', open);
    };
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      setMenu(!open);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a') && matchMedia('(max-width: 959px)').matches) {
        setMenu(false);
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        button.focus();
      }
    });
    addEventListener('resize', () => {
      if (!matchMedia('(max-width: 959px)').matches) setMenu(false);
    });
  };

  const initialiseExplorationReset = () => {
    document.querySelectorAll('[data-exploration-reset]').forEach((button) => button.addEventListener('click', () => {
      if (!confirm('探索の進行状況をリセットします。よろしいですか？')) return;
      try { Object.keys(localStorage).filter((key) => key.startsWith('shiramine')).forEach((key) => localStorage.removeItem(key)); } catch {}
      location.href = 'index.html';
    }));
  };

  const initialiseHeroSlideshow = () => {
    const slides = [...document.querySelectorAll('.hero__slide')];
    if (slides.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let current = 0;
    window.setInterval(() => { slides[current].classList.remove('is-active'); current = (current + 1) % slides.length; slides[current].classList.add('is-active'); }, 5500);
  };

  const initialiseEndingMessage = () => {
    const message = document.querySelector('[data-ending-message]');
    if (!message) return;
    try { message.hidden = localStorage.getItem('shiramineEnding') !== 'true'; } catch {}
  };

  const initialiseDebug = () => {
    if (!window.SiteAlterationDebug) return;
    window.SiteAlterationDebug.init({
      storagePrefix: 'shiramine',
      state: {
        phases: ['phase0', 'phase1', 'phase2', 'phase3', 'truth', 'ending'],
        getPhase: () => window.ShiramineProgress?.phase() || 'phase0',
        setPhase: (phase) => window.ShiramineProgress?.setPhase(phase)
      }
    });
  };

  document.querySelector('[data-site-header]')?.replaceWith(document.createRange().createContextualFragment(header));
  document.querySelector('[data-site-footer]')?.replaceWith(document.createRange().createContextualFragment(footer));
  initialiseMenu();
  initialiseExplorationReset();
  initialiseHeroSlideshow();
  initialiseEndingMessage();
  initialiseDebug();
})();
