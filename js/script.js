/* ================================================================
   MANAS DASARI — PORTFOLIO SCRIPTS
   ================================================================ */

(function () {
  'use strict';

  /* ── Navbar: active link + scroll class ────────────────────── */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileNav = document.querySelector('.nav-mobile');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Scroll class
    function onScroll() {
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active link highlight
    document.querySelectorAll('.nav-links a, .nav-mobile ul a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkFile = href.split('/').pop();
      if (
        linkFile === currentPath ||
        (currentPath === '' && linkFile === 'index.html') ||
        (currentPath === 'index.html' && linkFile === 'index.html')
      ) {
        link.classList.add('active');
      }
    });

    // Hamburger toggle
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', function () {
        const isOpen = hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click
      mobileNav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          hamburger.classList.remove('open');
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        });
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
          hamburger.classList.remove('open');
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* ── Scroll-triggered fade-in animations ───────────────────── */
  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in, .stagger').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Typewriter effect for hero ─────────────────────────────── */
  function initTypewriter() {
    const el = document.querySelector('[data-typewriter]');
    if (!el) return;

    const words = JSON.parse(el.dataset.typewriter || '[]');
    if (!words.length) return;

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let paused = false;

    function tick() {
      const word = words[wordIdx];

      if (paused) {
        paused = false;
        setTimeout(tick, 1400);
        return;
      }

      if (!deleting) {
        el.textContent = word.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === word.length) {
          deleting = true;
          paused = true;
          setTimeout(tick, 50);
          return;
        }
      } else {
        el.textContent = word.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }

      setTimeout(tick, deleting ? 55 : 90);
    }

    tick();
  }

  /* ── Smooth number counter for stats ────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(ease * target) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ── Copy email to clipboard ─────────────────────────────────── */
  function initCopyEmail() {
    document.querySelectorAll('[data-copy-email]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const email = btn.dataset.copyEmail;
        navigator.clipboard.writeText(email).then(function () {
          const original = btn.innerHTML;
          btn.innerHTML = '✓ Copied!';
          btn.style.background = 'rgba(16,185,129,0.15)';
          btn.style.borderColor = 'rgba(16,185,129,0.4)';
          btn.style.color = '#10b981';
          setTimeout(function () {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 2000);
        });
      });
    });
  }

  /* ── Init ───────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initScrollAnimations();
    initTypewriter();
    initCounters();
    initCopyEmail();
  });

})();
