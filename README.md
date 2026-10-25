# Prabhath Dilshan — Portfolio

Responsive portfolio built with HTML, CSS and JavaScript. Includes project filters, a research screenshot gallery, local technology logos, light/dark themes, a PDF CV, and a contact form using FormSubmit.

## Project layout

```text
portfolio-website/
├── index.html                   # Website entry point
├── assets/
│   ├── css/styles.css           # Theme, components and responsive layouts
│   ├── js/script.js             # Navigation, filters and form handling
│   ├── documents/cv/            # PDF download and original DOCX
│   ├── images/
│   │   ├── profile/             # Profile photo
│   │   ├── projects/            # Project previews
│   │   ├── research/            # Smart Learn screenshots
│   │   ├── technologies/        # Technology SVG logos
│   │   └── uploads/             # CMS uploads
│   └── vendor/fontawesome/     # Icon styles, fonts and license
├── admin/                       # CMS interface and configuration
├── content/                     # Existing CMS Markdown content
├── docs/                        # Setup and validation notes
├── scripts/check_site.py        # Local static-site integrity check
├── .github/                     # Repository development guidance
└── .vscode/                     # Editor tasks
```

## Local preview

Run from the repository root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Keep the server root at this directory so `/admin/` and CMS upload paths resolve correctly.

## Editing

- Change displayed portfolio details and project cards in `index.html`.
- Change colors and layouts in `assets/css/styles.css`.
- Change interactive behavior in `assets/js/script.js`.
- Store new screenshots under `assets/images/projects/` or `assets/images/research/`.
- Keep PDF and DOCX CVs in `assets/documents/cv/`; update the links in `index.html` when filenames change.
- Keep third-party icon assets and their license together in `assets/vendor/fontawesome/`.

The CMS stores settings and projects under `content/` and uploaded images under `assets/images/uploads/`. Its existing Markdown files are not currently used to render the homepage automatically; edit `index.html` to update the displayed portfolio.

## Checks

```bash
python3 scripts/check_site.py
node --check assets/js/script.js
```

The static check verifies local HTML asset references, CSS asset URLs, section anchors, unique IDs and HTML nesting. It does not validate external services or email delivery.

## Deployment

This is a buildless static site. Publish the repository root, including `index.html`, `assets/`, `admin/` and `content/`. No bundler or dependency installation is needed. No hosting publish-directory changes are required by this reorganization.

The contact form requires the destination email's one-time FormSubmit activation. Do not put email passwords or API secrets in browser code.

## Documentation

- [Setup guide](docs/GITHUB_SETUP.md)
- [Mobile testing guide](docs/MOBILE_TESTING.md)
- [Validation notes](docs/VALIDATION.md)
