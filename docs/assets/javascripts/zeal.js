/* ─── Zeal Core v2 — JavaScript ─── */

(function () {
  'use strict';

  /* ── 1. Parallax scroll on hero layers ─────────────────────── */
  function initParallax() {
    const hero = document.querySelector('.zc-hero');
    if (!hero) return;

    const layers = {
      sky:       { el: document.querySelector('.zc-layer--sky'),       speed: 0.02 },
      glow:      { el: document.querySelector('.zc-layer--glow'),      speed: 0.04 },
      grid:      { el: document.querySelector('.zc-layer--grid'),      speed: 0.06 },
      mountains: { el: document.querySelector('.zc-layer--mountains'), speed: 0.10 },
      hills:     { el: document.querySelector('.zc-layer--hills'),     speed: 0.18 },
      nodes:     { el: document.querySelector('.zc-layer--nodes'),     speed: 0.08 },
      trees:     { el: document.querySelector('.zc-layer--trees'),     speed: 0.28 },
      fog:       { el: document.querySelector('.zc-layer--fog'),       speed: 0.22 },
    };

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          Object.values(layers).forEach(({ el, speed }) => {
            if (el) {
              el.style.transform = `translateY(${scrollY * speed}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 2. Mouse-move subtle layer tilt ───────────────────────── */
  function initMouseParallax() {
    const hero = document.querySelector('.zc-hero');
    if (!hero) return;

    const mountains = document.querySelector('.zc-layer--mountains');
    const hills     = document.querySelector('.zc-layer--hills');
    const trees     = document.querySelector('.zc-layer--trees');
    const nodes     = document.querySelector('.zc-layer--nodes');

    hero.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const mx = (e.clientX / innerWidth  - 0.5) * 2;  // -1 to 1
      const my = (e.clientY / innerHeight - 0.5) * 2;

      if (mountains) mountains.style.transform = `translate(${mx * 6}px, ${my * 3}px)`;
      if (hills)     hills.style.transform     = `translate(${mx * 10}px, ${my * 5}px)`;
      if (trees)     trees.style.transform     = `translate(${mx * 14}px, ${my * 2}px)`;
      if (nodes)     nodes.style.transform     = `translate(${mx * 8}px, ${my * 8}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      [mountains, hills, trees, nodes].forEach(el => {
        if (el) el.style.transform = '';
      });
    });
  }

  /* ── 3. Scroll-animate cards ────────────────────────────────── */
  function initCardAnimations() {
    const cards = document.querySelectorAll('.zc-card');
    if (!cards.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || 0);
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.dataset.delay = i * 60;
      obs.observe(card);
    });
  }

  /* ── 4. Animated node dots in hero ─────────────────────────── */
  function initStarField() {
    const hero = document.querySelector('.zc-hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position:absolute; inset:0; width:100%; height:100%;
      pointer-events:none; z-index:2; opacity:0.5;
    `;
    hero.querySelector('.zc-hero__layers').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W, H, stars = [];

    function resize() {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }

    function createStars(n) {
      stars = [];
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.3,
          a: Math.random(),
          da: (Math.random() - 0.5) * 0.004,
          color: Math.random() > 0.5 ? '#5c6bc0' : '#00bcd4'
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    resize();
    createStars(120);
    draw();
    window.addEventListener('resize', () => { resize(); createStars(120); });
  }

  /* ── Init ───────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initMouseParallax();
    initCardAnimations();
    initStarField();
  });

})();
