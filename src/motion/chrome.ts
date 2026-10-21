// Site chrome: the phone menu, copy buttons, the 404 path, video and screenshot viewer.
import { gsap } from 'gsap';
import { ease, onPage, prefersReducedMotion, startScroll, stopScroll } from '../engine';

function menu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
    const panel = document.querySelector<HTMLElement>('[data-menu]');
    if (!btn || !panel) return;
    const html = document.documentElement;
    const links = () => [...panel.querySelectorAll<HTMLElement>('a')];
    let isOpen = false;

    const open = () => {
      isOpen = true;
      panel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      html.classList.add('menu-open');
      stopScroll();
      if (!prefersReducedMotion()) {
        gsap.fromTo(panel, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut });
        gsap.fromTo(panel.querySelectorAll('.menu__item a'), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: ease.out, stagger: 0.05, delay: 0.15 });
      }
      links()[0]?.focus();
    };
    const close = (restore = true) => {
      if (!isOpen) return;
      isOpen = false;
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      html.classList.remove('menu-open');
      startScroll();
      if (restore) btn.focus();
    };
    const toggle = () => (isOpen ? close() : open());
    const key = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const items = [btn, ...links()];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const nextI = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === items.length - 1 ? 0 : i + 1);
      e.preventDefault();
      items[nextI].focus();
    };
    const linkClick = () => close(false);
    btn.addEventListener('click', toggle);
    document.addEventListener('keydown', key);
    links().forEach((a) => a.addEventListener('click', linkClick));
    return () => {
      close(false);
      btn.removeEventListener('click', toggle);
      document.removeEventListener('keydown', key);
      links().forEach((a) => a.removeEventListener('click', linkClick));
    };
  });
}

function copyButtons() {
  onPage(() => {
    const btns = [...document.querySelectorAll<HTMLButtonElement>('[data-copy]')];
    const timers = new Map<HTMLElement, number>();
    const click = async (e: Event) => {
      const b = e.currentTarget as HTMLButtonElement;
      const state = b.querySelector<HTMLElement>('[data-copy-state]');
      try { await navigator.clipboard.writeText(b.dataset.copy || ''); } catch { /* clipboard blocked: the text is still visible to select */ }
      if (!state) return;
      const rest = state.textContent === 'Copied' ? state.dataset.rest ?? '' : state.textContent ?? '';
      state.dataset.rest = rest;
      state.textContent = 'Copied';
      clearTimeout(timers.get(b));
      timers.set(b, window.setTimeout(() => { state.textContent = rest; }, 1800));
    };
    btns.forEach((b) => b.addEventListener('click', click));
    return () => { btns.forEach((b) => b.removeEventListener('click', click)); timers.forEach((t) => clearTimeout(t)); };
  });
}

function notFound() {
  onPage(() => {
    const el = document.querySelector('[data-nf-path]');
    if (el) el.textContent = decodeURIComponent(location.pathname);
  });
}

/** The intro poster is 79 KB; fetch it near the viewport so it never competes with first paint. */
function lazyPosters() {
  onPage(() => {
    const vids = document.querySelectorAll<HTMLVideoElement>('video[data-poster]');
    if (!vids.length) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const v = e.target as HTMLVideoElement;
      v.poster = v.dataset.poster!;
      io.unobserve(v);
    }), { rootMargin: '150% 0px' });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  });
}

/** Replaces the browser's stock play button until the first play; native controls take over after. */
function filmPlay() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('[data-film-play]');
    const fig = btn?.parentElement;
    const video = fig?.querySelector('video');
    if (!btn || !fig || !video) return;
    video.controls = false;
    const start = () => {
      fig.classList.add('is-playing');
      video.controls = true;
      if (!video.poster && video.dataset.poster) video.poster = video.dataset.poster;
      video.play().catch(() => {});
      video.focus();
    };
    const played = () => { fig.classList.add('is-playing'); video.controls = true; };
    btn.addEventListener('click', start);
    video.addEventListener('play', played);
    return () => { btn.removeEventListener('click', start); video.removeEventListener('play', played); video.pause(); };
  });
}

function lightbox() {
  onPage(() => {
    const dlg = document.querySelector<HTMLDialogElement>('[data-lightbox]');
    const triggers = [...document.querySelectorAll<HTMLAnchorElement>('[data-zoom]')];
    if (!dlg || !triggers.length) return;
    const img = dlg.querySelector<HTMLImageElement>('.lightbox__img')!;
    const cap = dlg.querySelector<HTMLElement>('.lightbox__cap')!;
    const count = dlg.querySelector<HTMLElement>('[data-lightbox-count]')!;
    let i = 0;

    const show = (n: number) => {
      i = (n + triggers.length) % triggers.length;
      const src = triggers[i].querySelector('img')!;
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      cap.innerHTML = triggers[i].closest('figure')?.querySelector('figcaption')?.innerHTML ?? '';
      count.textContent = `${String(i + 1).padStart(2, '0')} / ${String(triggers.length).padStart(2, '0')}`;
    };
    const open = (e: Event) => {
      e.preventDefault();
      show(triggers.indexOf(e.currentTarget as HTMLAnchorElement));
      dlg.showModal();
      stopScroll();
      if (!prefersReducedMotion()) gsap.fromTo(img, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: ease.out });
    };
    const closed = () => { startScroll(); triggers[i]?.focus(); };
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const step = t.closest<HTMLElement>('[data-lightbox-step]');
      if (step) return show(i + Number(step.dataset.lightboxStep));
      if (t.closest('[data-lightbox-close]') || t === dlg || t.classList.contains('lightbox__fig')) dlg.close();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') show(i + 1);
      else if (e.key === 'ArrowLeft') show(i - 1);
    };

    triggers.forEach((a) => a.addEventListener('click', open));
    dlg.addEventListener('click', click);
    dlg.addEventListener('keydown', key);
    dlg.addEventListener('close', closed);
    return () => {
      triggers.forEach((a) => a.removeEventListener('click', open));
      dlg.removeEventListener('click', click);
      dlg.removeEventListener('keydown', key);
      dlg.removeEventListener('close', closed);
      if (dlg.open) dlg.close();
    };
  });
}

export function chrome() {
  menu();
  copyButtons();
  notFound();
  lazyPosters();
  filmPlay();
  lightbox();
}
