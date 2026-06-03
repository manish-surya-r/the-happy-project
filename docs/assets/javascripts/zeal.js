/* ─── Zeal Core — extra JS ─── */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Stagger-animate nav items on first load */
  const navLinks = document.querySelectorAll('.md-nav--primary .md-nav__link');
  navLinks.forEach((el, i) => {
    el.style.animationDelay = `${i * 18}ms`;
    el.style.opacity = '0';
    el.style.animation = `zeal-fade-up 0.3s ease ${i * 18}ms both`;
  });

  /* 2. Highlight the current TOC entry as you scroll */
  const headings = document.querySelectorAll('.md-content h2, .md-content h3');
  const tocLinks = document.querySelectorAll('.md-nav--secondary .md-nav__link');

  if (headings.length && tocLinks.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('md-nav__link--active'));
          const id = entry.target.id;
          const active = document.querySelector(`.md-nav--secondary a[href="#${id}"]`);
          if (active) active.classList.add('md-nav__link--active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    headings.forEach(h => { if (h.id) obs.observe(h); });
  }

  /* 3. Animate code blocks into view */
  const codeBlocks = document.querySelectorAll('.md-typeset pre');
  const codeObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        codeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  codeBlocks.forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(12px)';
    block.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    codeObs.observe(block);
  });

  /* 4. Animate cards (home page) */
  const cards = document.querySelectorAll('.zeal-card');
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        cardObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.2s ease, box-shadow 0.2s ease';
    cardObs.observe(card);
  });

});
