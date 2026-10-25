# Portfolio validation — 25 October 2026

The page was served locally and tested in installed headless Google Chrome.

- Responsive layout: 320, 360, 390, 640, 700, 768, 820, 991, 1024, 1280, 1440 and 1920 CSS pixels in both themes; no horizontal page overflow.
- Project filters: All (8), Individual (5), Group (2), Research (1). Hidden cards leave the keyboard and accessibility navigation order; selected filters expose `aria-pressed` and a live result count.
- Keyboard: skip link, mobile menu Escape and focus restoration, success dialog focus and Escape dismissal.
- Contact form: successful and rejected responses simulated locally, without sending email. Rejected submissions retain the entered message. Actual email delivery was not retested.
- axe-core 4.10.3: WCAG 2 A/AA and WCAG 2.1 AA rule sets at 390 and 1440 pixels in light and dark themes; zero detected violations. Some image/background contrast checks require human review. This is not a complete accessibility certification or assistive-technology audit.
- PDF: two pages generated from the supplied DOCX. Extracted text checked for experience, research, training and references; original DOCX retained.
- Static checks: JavaScript syntax, local asset paths, unique IDs, matching HTML tags and section anchors.

Research images are JPEG web copies, reduced from approximately 49 MB to 1.7 MB in total. The original supplied screenshots remain outside the repository on the user's Desktop. Safari browser chrome has been physically removed from the seven research images and tender preview. Gallery CSS viewports focus on the activity; opening an image separately also shows no Safari toolbar.

`assets/css/styles.css` is a consolidated stylesheet. `assets/js/script.js` uses one passive, animation-frame-scheduled scroll listener, no perpetual typing timers, and no reveal animations that hide page content. Icon fonts and the profile image are local to avoid blank controls when external assets cannot load. Google Fonts are optional; system font fallbacks remain available.
