/**
 * Frau Krueger – Café Website
 * main.js
 *
 * Aufgaben:
 *   1. Mobiles Navigationsmenü öffnen/schließen (Menü-Knopf)
 *   2. Schatten an der Navigation beim Scrollen
 *   3. Menü schließen wenn ein Navigationslink geklickt wird
 *   4. Menü per Escape-Taste schließen
 *
 * Keine externen Abhängigkeiten. Nur Vanilla JS.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // Elemente
  // -------------------------------------------------------------------------
  const navigation     = document.querySelector('.navigation');
  const menue_knopf    = document.getElementById('menue-knopf');
  const navigationsLinks = document.getElementById('navigations-links');
  const alleLinks      = navigationsLinks ? navigationsLinks.querySelectorAll('.navigation__link') : [];

  // -------------------------------------------------------------------------
  // 1. Mobiles Menü öffnen / schließen
  // -------------------------------------------------------------------------

  function menue_setzen(geoeffnet) {
    if (!menue_knopf || !navigationsLinks) return;

    menue_knopf.setAttribute('aria-expanded', String(geoeffnet));
    menue_knopf.setAttribute('aria-label', geoeffnet ? 'Menü schließen' : 'Menü öffnen');
    navigationsLinks.classList.toggle('ist-geoeffnet', geoeffnet);

    // Seitenscrollen sperren während das Menü offen ist
    document.body.style.overflow = geoeffnet ? 'hidden' : '';
  }

  if (menue_knopf) {
    menue_knopf.addEventListener('click', function () {
      const istGeoeffnet = menue_knopf.getAttribute('aria-expanded') === 'true';
      menue_setzen(!istGeoeffnet);
    });
  }

  // -------------------------------------------------------------------------
  // 2. Menü schließen wenn ein Navigationslink geklickt wird
  // -------------------------------------------------------------------------
  alleLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      menue_setzen(false);
    });
  });

  // -------------------------------------------------------------------------
  // 3. Menü per Escape-Taste schließen
  // -------------------------------------------------------------------------
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      const istGeoeffnet = menue_knopf && menue_knopf.getAttribute('aria-expanded') === 'true';
      if (istGeoeffnet) {
        menue_setzen(false);
        menue_knopf.focus(); // Fokus zurück zum Knopf
      }
    }
  });

  // -------------------------------------------------------------------------
  // 4. Menü schließen beim Klick außerhalb
  // -------------------------------------------------------------------------
  document.addEventListener('click', function (event) {
    if (!navigation) return;
    const istGeoeffnet = menue_knopf && menue_knopf.getAttribute('aria-expanded') === 'true';
    if (istGeoeffnet && !navigation.contains(event.target)) {
      menue_setzen(false);
    }
  });

  // -------------------------------------------------------------------------
  // 5. Schatten an der Navigation beim Scrollen
  // -------------------------------------------------------------------------
  function navigation_schatten_aktualisieren() {
    if (!navigation) return;
    const gescrollt = window.scrollY > 8;
    navigation.classList.toggle('navigation--gescrollt', gescrollt);
  }

  // Einmal beim Laden ausführen (falls Seite schon gescrollt ist)
  navigation_schatten_aktualisieren();

  window.addEventListener('scroll', navigation_schatten_aktualisieren, { passive: true });

})();
