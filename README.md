# Shubham Sinha — Portfolio

A fast, single-page portfolio built from scratch with plain **HTML + CSS + JS** (zero build step, zero dependencies). Designed to be hosted for free on **GitHub Pages** at a permanent, always-on link:

> **https://shubhamsinha1010.github.io**

## What's inside

```
portfolio/
├── index.html            # all content (hero, about, experience, work, skills, contact)
├── .nojekyll             # tell GitHub Pages to serve files as-is
└── assets/
    ├── css/style.css     # design system, layout, motion
    ├── js/main.js        # cursor, scroll reveal, counters, particle canvas, nav
    └── img/shubham.png    # portrait
```

### Interactions / "advanced" bits
- Custom trailing cursor + magnetic buttons + 3D tilt cards (auto-disabled on touch)
- Interactive particle constellation canvas in the hero (repels from the mouse, pauses off-screen)
- Scroll-reveal animations via `IntersectionObserver`, scroll progress bar, active-section nav
- Animated stat counters and a live "data pipeline" motif for the CricLot project
- Fully responsive + `prefers-reduced-motion` friendly

---

## Deploy to GitHub Pages (free, ~3 minutes)

Because the repo is named `shubhamsinha1010.github.io`, GitHub serves it at the root domain automatically — no custom domain or paid plan needed.

### Option A — GitHub web UI (no terminal)
1. Create a new **public** repo named exactly **`shubhamsinha1010.github.io`**.
2. Upload the **contents of this `portfolio/` folder** (i.e. `index.html`, `.nojekyll`, and the `assets/` folder) to the repo root — not the `portfolio` folder itself.
3. Go to **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` / `root`, Save.
4. Wait ~1 min, then open **https://shubhamsinha1010.github.io**.

### Option B — terminal
From inside the `portfolio/` folder:

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/shubhamsinha1010/shubhamsinha1010.github.io.git
git push -u origin main
```

Then enable Pages: **Settings → Pages → Source: Deploy from a branch → `main` / root**.

## Local preview

```bash
cd portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

## Updating content
Everything a recruiter sees lives in `index.html`. Edit the text/links there; styling is in `assets/css/style.css`. To swap the photo, replace `assets/img/shubham.png` (keep the name or update the `<img src>`).

To add a downloadable resume: drop `resume.pdf` in `assets/` and link it from the nav or contact section.
