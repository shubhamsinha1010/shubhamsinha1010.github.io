# Shubham Sinha | Portfolio

Live at **https://shubhamsinha1010.github.io**

A portfolio for a Python backend and AI engineer: a coral and dark teal theme, angled hero sections, tilted cards, and five case studies with architecture diagrams. Design notes are in `DESIGN.md`.

## Stack

- **Astro** (static output, view transitions, `build.format: 'file'` so case studies stay at `/work/<slug>.html`)
- **GSAP** (ScrollTrigger, SplitText) on a single ticker, with **Lenis** smooth scroll
- Self-hosted **Nunito** (variable weight)
- No UI framework, no WebGL; about 60 KB of gzipped JS

## Layout

```
src/
  data/site.ts        all copy, jobs, projects and case studies
  pages/              index, work/[slug] (case studies), 404
  layouts/Base.astro  head, SEO, JSON-LD, header, footer
  components/         Header, Finale, Pipeline, Diagram
  engine/             page lifecycle, reveals, smooth scroll, transitions
  motion/             page transition, pipeline animation, menu, video, lightbox
  styles/             tokens.css, engine.css, site.css
public/               fonts, images, video, resume, og.png, favicons, robots.txt
```

To edit content, change `src/data/site.ts`. Every number on the site comes from the resume or the case studies.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/
npm run check      # type-check
```

Set `ASTRO_TELEMETRY_DISABLED=1` if your environment blocks writes to the Astro config directory.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The old "Deploy from a branch" mode serves the raw repository and will not work with the Astro build.
