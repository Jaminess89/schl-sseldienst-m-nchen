# Normcheck – Landing Page

Professionelle, schnelle deutsche Landing Page für den Rauchmelder-Service **Normcheck** (Vermieter & Hausverwaltungen in Berlin & Brandenburg). Reines HTML5, CSS3 und Vanilla JavaScript – ohne Frameworks, ohne Build-System, ohne externe Abhängigkeiten.

## Dateien

```
normcheck-landing/
├── index.html          # Hauptseite mit allen 15 Sektionen
├── styles.css          # Komplettes Design-System (CSS Custom Properties, Mobile First)
├── script.js           # Mobile Navigation, Sticky Header, FAQ, Formular-Validierung, Jahr
├── impressum.html      # Platzhalter Impressum
├── datenschutz.html    # Platzhalter Datenschutzerklärung
└── assets/
    ├── images/         # Illustrationen (SVG-Platzhalter)
    │   ├── hero-technician.svg
    │   ├── service-technician.svg
    │   └── berlin-skyline.svg
    └── icons/
        └── favicon.svg
```

## Website öffnen

Einfach `index.html` im Browser öffnen (Doppelklick) – die Seite funktioniert ohne Server.

## Lokalen Server starten (empfohlen)

```bash
# Variante 1: Python
cd normcheck-landing
python3 -m http.server 8000

# Variante 2: Node
npx serve normcheck-landing
```

Danach http://localhost:8000 im Browser öffnen.

## Zu ersetzende Bilder

Die drei SVG-Dateien in `assets/images/` sind **Platzhalter-Illustrationen** und sollten vor Veröffentlichung durch echte Fotos ersetzt werden (WebP, mit `width`/`height`-Angaben im HTML):

| Datei | Motiv | Empfohlene Größe |
|---|---|---|
| `hero-technician.webp` | Servicetechniker mit Klemmbrett/Tablet, Kundin, helle Wohnung, Rauchwarnmelder sichtbar | ca. 1200 × 1000 px |
| `service-technician.webp` | Techniker montiert/prüft Rauchwarnmelder an der Decke | ca. 900 × 700 px |
| `berlin-skyline.webp` | Berliner Fernsehturm / Skyline mit Wohnhäusern und Bäumen | ca. 800 × 1200 px (Hochformat) |

## Kontaktdaten ändern

Alle Kontaktdaten sind Platzhalter und zentral im HTML zu finden (Suche nach `030 123 456 78`, `hallo@normcheck.de`, `Prenzlauer Allee 180`):

- `index.html` – Top-Bar, Footer, JSON-LD (LocalBusiness)
- `impressum.html`, `datenschutz.html`

## Formular-Backend anbinden

In `script.js` ist die Stelle mit dem Kommentar `BACKEND-ANBINDUNG` markiert: Dort kann der simulierte `setTimeout`-Versand durch einen echten `fetch()`-Aufruf an einen Endpunkt ersetzt werden. Es werden bewusst **keine** Daten an einen Server gesendet und nichts in `localStorage` gespeichert.

## Design & Interaktionen

- **Design:** `styles.css` – alle Farben, Abstände, Schriftgrößen und Schatten sind als CSS Custom Properties unter `:root` definiert.
- **Interaktionen:** `script.js` – Mobile Hamburger-Navigation (schließt nach Linkauswahl, sperrt Scrollen), Sticky-Header-Schatten, FAQ-Accordion (nur ein Eintrag offen, `aria-expanded`/`aria-controls`), Formular-Validierung mit deutschen Fehlermeldungen, Lade- und Erfolgszustand, automatisches Footer-Jahr.

## Hinweise vor Veröffentlichung

- [ ] Echte Kundenbewertungen einsetzen (Markierung im HTML-Kommentar im Bewertungsbereich)
- [ ] Impressum und Datenschutzerklärung rechtlich prüfen und vervollständigen
- [ ] Echte Fotos einsetzen (siehe oben)
- [ ] Canonical-URL und Open-Graph-URL in `index.html` auf die finale Domain setzen
- [ ] Formular-Backend anbinden
- [ ] Telefonnummer, E-Mail und Adresse durch echte Daten ersetzen