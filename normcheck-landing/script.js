/* Normcheck – Interaktionen (Vanilla JS, keine Abhängigkeiten) */
'use strict';

(function () {
  /* ---------- Mobile Navigation ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
    navMenu.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  function openMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menü schließen');
    navMenu.classList.add('is-open');
    document.body.classList.add('nav-open');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    // Menü nach Klick auf einen Link schließen
    navMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) { closeMenu(); }
    });

    // Escape schließt das Menü
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { closeMenu(); }
    });

    // Bei Wechsel auf Desktop-Ansicht Menüzustand zurücksetzen
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) { closeMenu(); }
    });
  }

  /* ---------- Sticky-Header-Zustand ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- FAQ-Accordion (nur ein Eintrag offen) ---------- */
  var faqButtons = document.querySelectorAll('.faq-item__button');
  faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var panelId = button.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : null;
      var isOpen = button.getAttribute('aria-expanded') === 'true';

      // Alle anderen schließen
      faqButtons.forEach(function (otherButton) {
        var otherPanel = document.getElementById(otherButton.getAttribute('aria-controls'));
        otherButton.setAttribute('aria-expanded', 'false');
        if (otherPanel) { otherPanel.classList.remove('is-open'); }
      });

      // Angeklickten Eintrag umschalten
      if (!isOpen) {
        button.setAttribute('aria-expanded', 'true');
        if (panel) { panel.classList.add('is-open'); }
      }
    });
  });

  /* ---------- Angebotsformular: Validierung & Absenden ---------- */
  var form = document.getElementById('offer-form');

  var messages = {
    valueMissing: 'Bitte füllen Sie dieses Feld aus.',
    typeMismatch: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    patternMismatch: 'Bitte geben Sie eine gültige fünfstellige Postleitzahl ein.',
    rangeUnderflow: 'Der Wert muss mindestens 1 betragen.',
    rangeOverflow: 'Der Wert ist zu groß.',
    badInput: 'Bitte geben Sie eine gültige Zahl ein.'
  };

  function getErrorMessage(field) {
    var validity = field.validity;
    if (validity.valueMissing) {
      if (field.tagName === 'SELECT') { return 'Bitte wählen Sie eine Option aus.'; }
      return messages.valueMissing;
    }
    if (validity.typeMismatch && field.type === 'email') { return messages.typeMismatch; }
    if (validity.patternMismatch) { return messages.patternMismatch; }
    if (validity.rangeUnderflow) { return messages.rangeUnderflow; }
    if (validity.rangeOverflow) { return messages.rangeOverflow; }
    if (validity.badInput) { return messages.badInput; }
    return 'Bitte prüfen Sie Ihre Eingabe.';
  }

  function showError(field) {
    var errorEl = document.getElementById(field.id + '-error');
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = getErrorMessage(field);
      errorEl.hidden = false;
      field.setAttribute('aria-describedby', errorEl.id);
    }
  }

  function clearError(field) {
    var errorEl = document.getElementById(field.id + '-error');
    field.removeAttribute('aria-invalid');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
      field.removeAttribute('aria-describedby');
    }
  }

  if (form) {
    var fields = form.querySelectorAll('input, select, textarea');

    // Fehler beim Tippen/Auswählen direkt wieder entfernen
    fields.forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true' && field.checkValidity()) {
          clearError(field);
        }
      });
      field.addEventListener('blur', function () {
        if (field.hasAttribute('required') || field.value.trim() !== '') {
          if (!field.checkValidity()) { showError(field); } else { clearError(field); }
        }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var firstInvalid = null;

      fields.forEach(function (field) {
        if (!field.checkValidity()) {
          showError(field);
          if (!firstInvalid) { firstInvalid = field; }
        } else {
          clearError(field);
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var submitButton = document.getElementById('offer-submit');
      var label = submitButton ? submitButton.querySelector('.btn__label') : null;
      var spinner = submitButton ? submitButton.querySelector('.btn__spinner') : null;

      // Ladezustand aktivieren
      if (submitButton) { submitButton.disabled = true; }
      if (label) { label.textContent = 'Wird gesendet …'; }
      if (spinner) { spinner.hidden = false; }

      /*
       * BACKEND-ANBINDUNG:
       * Hier später den echten Versand ergänzen, z. B.:
       * fetch('/api/angebot', { method: 'POST', body: new FormData(form) })
       *   .then(...)
       * Aktuell wird der Versand nur simuliert (keine Datenübertragung).
       */
      window.setTimeout(function () {
        if (submitButton) { submitButton.disabled = false; }
        if (label) { label.textContent = 'Kostenloses Festpreis-Angebot anfordern'; }
        if (spinner) { spinner.hidden = true; }

        var successBox = document.getElementById('offer-success');
        if (successBox) {
          successBox.hidden = false;
          successBox.setAttribute('tabindex', '-1');
          successBox.focus();
        }
        form.reset();
      }, 1200);
    });
  }

  /* ---------- Aktuelles Jahr im Footer ---------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();