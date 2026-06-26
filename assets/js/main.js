/* =====================================================
   Vrai HP - メインスクリプト
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- ナビゲーション: スクロールで背景変化 ----- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----- ハンバーガーメニュー ----- */
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileNav  = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.nav-mobile-close');

  const openMobile  = () => { mobileNav?.classList.add('open');    document.body.style.overflow = 'hidden'; };
  const closeMobile = () => { mobileNav?.classList.remove('open'); document.body.style.overflow = ''; };

  hamburger?.addEventListener('click', openMobile);
  mobileClose?.addEventListener('click', closeMobile);
  document.querySelectorAll('.nav-mobile-link').forEach(l => l.addEventListener('click', closeMobile));

  /* ----- ヒーロー背景オーブ ----- */
  const orbsWrap = document.querySelector('.hero-orbs');
  if (orbsWrap) {
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      const size = Math.random() * 6 + 4;
      dot.style.cssText = `
        position:absolute;
        width:${size}px; height:${size}px;
        border-radius:50%;
        background:rgba(255,255,255,${Math.random() * 0.15 + 0.05});
        left:${Math.random() * 100}%;
        bottom:-${size}px;
        animation: dotFloat ${Math.random() * 10 + 8}s linear ${Math.random() * 8}s infinite;
      `;
      orbsWrap.appendChild(dot);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes dotFloat {
        0%   { transform: translateY(0) scale(0);  opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { transform: translateY(-110vh) scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ----- スクロールフェードイン ----- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => io.observe(el));
  }

  /* ----- ブログタブ ----- */
  const tabs   = document.querySelectorAll('.blog-tab');
  const panels = document.querySelectorAll('.blog-panel');

  function switchTab(tabId) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    panels.forEach(p => p.classList.toggle('active', p.id === `panel-${tabId}`));
    history.replaceState(null, null, `#${tabId}`);
  }

  tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));

  /* URL ハッシュに合わせて初期タブを切り替え */
  const hash = location.hash.slice(1);
  const validTabs = ['mama', 'coaching', 'ai', 'subsidy'];
  if (validTabs.includes(hash)) {
    switchTab(hash);
  } else if (tabs.length > 0) {
    tabs[0].classList.add('active');
    panels[0]?.classList.add('active');
  }

  /* ----- お問い合わせフォーム ----- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const orig = btn.textContent;
      btn.textContent = '送信中...';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error('送信失敗');

        form.innerHTML = `
          <div style="text-align:center; padding:3rem 0;">
            <div style="font-size:3.5rem; margin-bottom:1rem;">✉️</div>
            <h3 style="font-size:1.25rem; color:var(--purple-700); margin-bottom:0.75rem; font-family:var(--font-display);">
              お問い合わせありがとうございます
            </h3>
            <p style="color:var(--gray-600); font-size:0.9rem; line-height:1.8;">
              通常2〜3営業日以内にご返信いたします。<br>
              しばらくお待ちくださいませ。
            </p>
          </div>`;
      } catch {
        btn.textContent = '送信に失敗しました。再度お試しください。';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = orig; }, 4000);
      }
    });
  }

});
