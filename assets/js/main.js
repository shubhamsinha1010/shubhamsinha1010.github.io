/* =========================================================
   Shubham Sinha — Portfolio interactions
   Vanilla JS, zero dependencies.
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------- current year ---------- */
  const yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- preloader ---------- */
  const preloader = $("[data-preloader]");
  const startReveal = () => document.querySelector(".hero")?.classList.add("is-in");

  if (preloader && !prefersReduced) {
    const bar = $("[data-preloader-bar]");
    const count = $("[data-preloader-count]");
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(tick); }
      if (bar) bar.style.width = p + "%";
      if (count) count.textContent = Math.floor(p);
      if (p === 100) {
        setTimeout(() => {
          preloader.classList.add("is-done");
          startReveal();
        }, 350);
      }
    }, 120);
  } else {
    preloader?.classList.add("is-done");
    startReveal();
  }

  /* ---------- custom cursor ---------- */
  if (!isTouch) {
    const dot = $("[data-cursor-dot]");
    const ring = $("[data-cursor-ring]");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = mx + "px"; dot.style.top = my + "px"; }
    });

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) { ring.style.left = rx + "px"; ring.style.top = ry + "px"; }
      requestAnimationFrame(loop);
    };
    loop();

    $$("a, button, [data-magnetic], [data-tilt], .skill-group__chips span").forEach((el) => {
      el.addEventListener("mouseenter", () => ring?.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring?.classList.remove("is-hover"));
    });
  }

  /* ---------- magnetic buttons ---------- */
  if (!isTouch && !prefersReduced) {
    $$("[data-magnetic]").forEach((el) => {
      const strength = 0.3;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- 3D tilt ---------- */
  if (!isTouch && !prefersReduced) {
    $$("[data-tilt]").forEach((el) => {
      const max = 6;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- scroll progress ---------- */
  const progress = $("[data-scroll-progress]");
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    if (progress) progress.style.width = (scrolled * 100) + "%";
    nav?.classList.toggle("is-scrolled", h.scrollTop > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- nav ---------- */
  const nav = $("[data-nav]");
  const burger = $("[data-burger]");
  const mobileMenu = $("[data-mobile-menu]");
  const toggleMenu = (open) => {
    const isOpen = open ?? !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", isOpen);
    mobileMenu?.classList.toggle("is-open", isOpen);
    mobileMenu?.setAttribute("aria-hidden", String(!isOpen));
    burger?.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) {
      $("[data-mm-link]", mobileMenu)?.focus();
    } else {
      burger?.focus();
    }
  };
  burger?.addEventListener("click", () => toggleMenu());
  $$("[data-mm-link]").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("is-open")) toggleMenu(false);
  });

  /* ---------- active section highlight ---------- */
  const navLinks = $$("[data-nav-link]");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => secObserver.observe(s));

  /* ---------- reveal on scroll ---------- */
  const revObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("is-in"), (i % 4) * 70);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el) => revObserver.observe(el));

  /* ---------- animated counters ---------- */
  /* Final values live in the HTML so crawlers / LLMs / no-JS see 50%, <60s, 19M+ —
     not the animation seed "0". JS only rewrites the text when animating. */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const start = performance.now();
    el.textContent = "0" + suffix;
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };
  if (!prefersReduced) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach((el) => countObserver.observe(el));
  }

  /* ---------- pipeline sequence (featured project motifs) ---------- */
  if (!prefersReduced) {
    $$("[data-pipeline]").forEach((pipeline) => {
      const nodes = $$("[data-node]", pipeline);
      if (!nodes.length) return;
      let i = 0;
      setInterval(() => {
        nodes.forEach((n) => n.classList.remove("is-live"));
        nodes[i % nodes.length].classList.add("is-live");
        i++;
      }, 900);
    });
  }

  /* ---------- hero background ----------
     Moved to assets/js/hero-bg.js — a "living backend system"
     data-flow visualization (nodes, mesh, streaming packets,
     query ripples, parallax). Remove that script tag to revert. */

  /* ---------- copy to clipboard ---------- */
  const copyButtons = $$("[data-copy]");
  const copyFeedback = $("[data-copy-feedback]");
  if (copyButtons.length) {
    let feedbackTimer;
    const defaultCaption = copyFeedback?.dataset.default || "";
    const showFeedback = (msg) => {
      if (!copyFeedback) return;
      copyFeedback.textContent = msg;
      copyFeedback.classList.add("is-visible");
      clearTimeout(feedbackTimer);
      feedbackTimer = setTimeout(() => {
        copyFeedback.classList.remove("is-visible");
        copyFeedback.textContent = defaultCaption;
      }, 1800);
    };
    const copyText = async (text) => {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    };
    copyButtons.forEach((btn) => {
      let restoreTimer;
      btn.addEventListener("click", async () => {
        const value = btn.getAttribute("data-copy");
        if (!value) return;
        try {
          await copyText(value);
          const copiedLabel = btn.dataset.copiedLabel || "✓ Copied to clipboard";
          if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent.trim();
          btn.textContent = copiedLabel;
          btn.classList.add("is-copied");
          showFeedback("✓ Copied to clipboard");
          clearTimeout(restoreTimer);
          restoreTimer = setTimeout(() => {
            btn.textContent = btn.dataset.originalText;
            btn.classList.remove("is-copied");
          }, 1800);
        } catch {
          showFeedback("Couldn't copy — please select it manually");
        }
      });
    });
  }
})();
