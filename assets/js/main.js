/* =====================================================
   SKYLOOP - main.js
   Animations, navigation, formulaire, FAQ
   ===================================================== */

(function () {
  'use strict';

  /* ---- Intro overlay (1ère visite session uniquement) ---- */
  const intro = document.getElementById('intro-overlay');
  if (intro) {
    const skipNow = () => {
      if (!intro.classList.contains('intro-overlay--skip')) {
        intro.classList.add('intro-overlay--skip');
      }
    };

    // Skip sur clic ou touche
    const onSkip = () => {
      skipNow();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener('keydown', onSkip);
      window.removeEventListener('mousedown', onSkip);
      window.removeEventListener('touchstart', onSkip);
    };
    window.addEventListener('keydown', onSkip, { once: true });
    window.addEventListener('mousedown', onSkip, { once: true });
    window.addEventListener('touchstart', onSkip, { once: true, passive: true });

    // Retire l'overlay du DOM dès que l'animation de fadeout se termine
    intro.addEventListener('animationend', (e) => {
      if (e.animationName === 'intro-fadeout') {
        cleanup();
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }
    });

    // Filet de sécurité : si l'animation ne se déclenche jamais (browser exotique), retire après 2.5s
    setTimeout(() => {
      if (intro.parentNode) intro.parentNode.removeChild(intro);
    }, 2500);
  }


  /* ---- Header scroll effect ---- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 16);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Menu mobile ---- */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Smooth scroll pour ancres internes ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const headerH = document.querySelector('.header')?.offsetHeight || 0;
          window.scrollTo({
            top: target.offsetTop - headerH + 1,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* ---- Reveal on scroll (staggered musical) ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in-view'));
  }

  /* ---- Compteurs animés (ease-out cubic) ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1400;
          const start = performance.now();
          const animate = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.floor(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(animate);
            else el.textContent = target + suffix;
          };
          requestAnimationFrame(animate);
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq__q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq__item');
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---- Formulaire de contact (Web3Forms) ---- */
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.classList.remove('success', 'error');
      status.textContent = '';

      const original = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';

      const formData = new FormData(form);
      const accessKey = form.dataset.accessKey;

      // Repli mailto si pas de clé configurée
      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const subject = formData.get('subject') || 'Demande via skyloop';
        const message = formData.get('message') || '';
        const body = `De : ${name} <${email}>\n\n${message}`;
        window.location.href = `mailto:contact@skyloop.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.classList.add('success');
        status.textContent = "Votre client e-mail va s'ouvrir.";
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;
        return;
      }

      formData.append('access_key', accessKey);
      formData.append('from_name', 'Site Skyloop');
      formData.append('subject', formData.get('subject') || 'Nouveau message - skyloop.fr');

      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
          status.classList.add('success');
          status.textContent = '✓ Message envoyé. Nous vous répondrons sous 24 h.';
          form.reset();
        } else {
          throw new Error(data.message || 'Erreur inconnue');
        }
      } catch (err) {
        status.classList.add('error');
        status.textContent = '✗ Une erreur est survenue. Écrivez-nous à contact@skyloop.fr';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;
      }
    });
  }

  /* ---- Année dynamique footer ---- */
  const yearEl = document.querySelector('#current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Parallax léger sur le dashboard hero (desktop) ---- */
  const dashboard = document.querySelector('.dashboard');
  if (dashboard && window.matchMedia('(min-width: 880px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        const rotY = -6 + x * 4;
        const rotX = 2 + y * -3;
        dashboard.style.transform = `perspective(1400px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
        ticking = false;
      });
    });
  }

})();
