/* =====================================================
   SKYLOOP - main.js
   Animations, navigation, formulaire
   ===================================================== */

(function () {
  'use strict';

  // ---- Header scroll effect ----
  const header = document.querySelector('.header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---- Menu mobile ----
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Fermer le menu après clic sur un lien
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Scroll smooth pour les ancres ----
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

  // ---- Reveal on scroll (Intersection Observer) ----
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in-view'));
  }

  // ---- Compteurs animés (hero stats) ----
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1400;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased) + (el.dataset.suffix || '');
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = target + (el.dataset.suffix || '');
          };
          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  // ---- Formulaire de contact (Web3Forms) ----
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.classList.remove('success', 'error');
      status.textContent = '';

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';

      const formData = new FormData(form);
      const accessKey = form.dataset.accessKey;

      // Si la clé Web3Forms n'est pas configurée -> mode démo / mailto fallback
      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        // Construire un mailto en repli
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const subject = formData.get('subject') || 'Demande via skyloop.fr';
        const message = formData.get('message') || '';
        const body = `De : ${name} <${email}>\n\n${message}`;
        window.location.href = `mailto:contact@skyloop.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        status.classList.add('success');
        status.textContent = 'Votre client e-mail va s\'ouvrir. Pour activer l\'envoi automatique, configurez la clé Web3Forms (voir README).';
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
      }

      formData.append('access_key', accessKey);
      formData.append('from_name', 'Site Skyloop');
      formData.append('subject', formData.get('subject') || 'Nouveau message - skyloop.fr');

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          status.classList.add('success');
          status.textContent = '✓ Message envoyé ! Nous vous répondrons sous 24h.';
          form.reset();
        } else {
          throw new Error(data.message || 'Erreur inconnue');
        }
      } catch (err) {
        status.classList.add('error');
        status.textContent = '✗ Une erreur est survenue. Vous pouvez nous écrire directement à contact@skyloop.fr';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // ---- Année dynamique footer ----
  const yearEl = document.querySelector('#current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Effet parallax léger sur le hero ----
  const heroOrbit = document.querySelector('.hero__orbit');
  const heroChips = document.querySelectorAll('.hero__chip');
  if (heroOrbit && window.matchMedia('(min-width: 720px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroOrbit.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) rotate(${(Date.now() / 200) % 360}deg)`;
      heroChips.forEach((chip, i) => {
        const factor = (i + 1) * 0.5;
        chip.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

})();
