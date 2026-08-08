/* =========================================================
   Hero background — "living backend system"
   A data-flow network: service nodes linked by a mesh, with
   packets of data streaming along the edges, query ripples,
   and subtle mouse parallax. Vanilla JS, zero dependencies.

   Thematic to "search, sync & scale": data is always moving.

   To disable: remove the <script> tag for this file in index.html.
   ========================================================= */
(() => {
  "use strict";

  const canvas = document.querySelector("[data-hero-canvas]");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  const ACCENT = "199, 249, 75";      // brand lime
  const MESH = "150, 160, 140";       // dim connective tissue

  let w, h, dpr;
  let nodes = [];
  let edges = [];
  let packets = [];
  let ripples = [];
  let raf = null;
  let startT = 0;

  const mouse = { x: -9999, y: -9999, active: false };
  const parallax = { x: 0, y: 0, tx: 0, ty: 0 };

  const rand = (a, b) => a + Math.random() * (b - a);
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- build graph ---------- */
  const build = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    w = canvas.width = cw * dpr;
    h = canvas.height = ch * dpr;

    const area = cw * ch;
    const cap = isTouch ? 24 : 46;
    const count = Math.max(14, Math.min(Math.floor(area / 26000), cap));

    nodes = Array.from({ length: count }, () => {
      const depth = Math.random();                    // 0 = far, 1 = near
      const ax = Math.random() * w;
      const ay = Math.random() * h;
      return {
        ax, ay, x: ax, y: ay,
        depth,
        r: (1 + depth * 1.9) * dpr,
        range: rand(10, 26) * dpr * (0.4 + depth * 0.6),
        speed: rand(0.00006, 0.00018),
        phase: rand(0, Math.PI * 2),
        glow: 0,                                       // 0..1 proximity highlight
      };
    });

    // edges: link each node to its 3 nearest neighbours (dedup a<b)
    edges = [];
    const maxDist = 210 * dpr;
    const seen = new Set();
    for (let i = 0; i < nodes.length; i++) {
      const near = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const d = Math.hypot(nodes[i].ax - nodes[j].ax, nodes[i].ay - nodes[j].ay);
        if (d < maxDist) near.push([d, j]);
      }
      near.sort((a, b) => a[0] - b[0]);
      near.slice(0, 3).forEach(([, j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) { seen.add(key); edges.push({ a: Math.min(i, j), b: Math.max(i, j) }); }
      });
    }

    packets = [];
    ripples = [];
    const targetPackets = Math.max(6, Math.floor(edges.length * 0.28));
    for (let i = 0; i < targetPackets; i++) spawnPacket();
  };

  /* ---------- packets (data flowing along edges) ---------- */
  const spawnPacket = (fromEdge, fromNode) => {
    if (!edges.length) return;
    let edge, dir;
    if (fromEdge != null && fromNode != null) {
      // hop: pick a connected edge sharing fromNode
      const options = edges.filter((e, idx) => idx !== fromEdge && (e.a === fromNode || e.b === fromNode));
      if (!options.length) { edge = edges[Math.floor(Math.random() * edges.length)]; }
      else { edge = options[Math.floor(Math.random() * options.length)]; }
      dir = edge.a === fromNode ? 1 : 0;
    } else {
      edge = edges[Math.floor(Math.random() * edges.length)];
      dir = Math.random() < 0.5 ? 1 : 0;
    }
    packets.push({
      edgeIndex: edges.indexOf(edge),
      dir,                                  // 1 = a→b, 0 = b→a
      t: 0,
      speed: rand(0.0045, 0.011),
      trail: [],
    });
  };

  const spawnRipple = (x, y) => {
    if (ripples.length > 10) return;
    ripples.push({ x, y, r: 2 * dpr, max: rand(46, 90) * dpr, life: 1 });
  };

  /* ---------- frame ---------- */
  const frame = (now) => {
    if (!startT) startT = now;
    const t = now - startT;

    // ease parallax toward target
    parallax.x += (parallax.tx - parallax.x) * 0.06;
    parallax.y += (parallax.ty - parallax.y) * 0.06;

    ctx.clearRect(0, 0, w, h);

    // update node positions (bounded orbital drift around anchor)
    for (const n of nodes) {
      n.x = n.ax + Math.cos(t * n.speed + n.phase) * n.range + parallax.x * (0.3 + n.depth);
      n.y = n.ay + Math.sin(t * n.speed * 1.25 + n.phase) * n.range + parallax.y * (0.3 + n.depth);

      // proximity glow from cursor
      if (mouse.active) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const target = d < 150 * dpr ? 1 - d / (150 * dpr) : 0;
        n.glow += (target - n.glow) * 0.12;
      } else {
        n.glow += (0 - n.glow) * 0.08;
      }
    }

    // draw edges (dim mesh)
    ctx.lineWidth = 0.6 * dpr;
    for (const e of edges) {
      const a = nodes[e.a], b = nodes[e.b];
      const glow = Math.max(a.glow, b.glow);
      const alpha = 0.06 + glow * 0.18;
      ctx.strokeStyle = glow > 0.05
        ? `rgba(${ACCENT}, ${alpha})`
        : `rgba(${MESH}, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // update + draw packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      const edge = edges[p.edgeIndex];
      if (!edge) { packets.splice(i, 1); continue; }
      const a = nodes[edge.a], b = nodes[edge.b];
      p.t += p.speed;

      const tt = p.dir ? p.t : 1 - p.t;
      const px = lerp(a.x, b.x, tt);
      const py = lerp(a.y, b.y, tt);

      p.trail.push([px, py]);
      if (p.trail.length > 7) p.trail.shift();

      // trail
      for (let k = 0; k < p.trail.length - 1; k++) {
        const [x1, y1] = p.trail[k];
        const [x2, y2] = p.trail[k + 1];
        const a2 = (k / p.trail.length) * 0.5;
        ctx.strokeStyle = `rgba(${ACCENT}, ${a2})`;
        ctx.lineWidth = 1.4 * dpr;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // head
      ctx.save();
      ctx.shadowColor = `rgba(${ACCENT}, 0.9)`;
      ctx.shadowBlur = 8 * dpr;
      ctx.fillStyle = `rgba(${ACCENT}, 0.95)`;
      ctx.beginPath();
      ctx.arc(px, py, 1.9 * dpr, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (p.t >= 1) {
        const dest = p.dir ? edge.b : edge.a;
        if (Math.random() < 0.5) spawnRipple(nodes[dest].x, nodes[dest].y);
        packets.splice(i, 1);
        // hop onward or respawn to keep density stable
        if (Math.random() < 0.7) spawnPacket(p.edgeIndex, dest);
        else spawnPacket();
      }
    }

    // draw nodes
    for (const n of nodes) {
      const base = 0.28 + n.depth * 0.35;
      const a = Math.min(1, base + n.glow * 0.5);
      if (n.glow > 0.04) {
        ctx.save();
        ctx.shadowColor = `rgba(${ACCENT}, ${n.glow})`;
        ctx.shadowBlur = 10 * dpr * n.glow;
        ctx.fillStyle = `rgba(${ACCENT}, ${a})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.glow * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        ctx.fillStyle = `rgba(${MESH}, ${a})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ripples (query pulses)
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += (rp.max - rp.r) * 0.06;
      rp.life -= 0.02;
      if (rp.life <= 0) { ripples.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(${ACCENT}, ${rp.life * 0.4})`;
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();
    }

    raf = requestAnimationFrame(frame);
  };

  /* ---------- static single frame (reduced motion) ---------- */
  const drawStatic = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 0.6 * dpr;
    for (const e of edges) {
      const a = nodes[e.a], b = nodes[e.b];
      ctx.strokeStyle = `rgba(${MESH}, 0.08)`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    for (const n of nodes) {
      ctx.fillStyle = `rgba(${MESH}, ${0.3 + n.depth * 0.3})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  /* ---------- controls ---------- */
  const start = () => {
    if (prefersReduced) { drawStatic(); return; }
    if (!raf) { startT = 0; raf = requestAnimationFrame(frame); }
  };
  const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

  if (!isTouch) {
    window.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
      mouse.active = true;
      // parallax: shift field toward cursor, subtly
      parallax.tx = ((e.clientX - r.left) / r.width - 0.5) * 26 * dpr;
      parallax.ty = ((e.clientY - r.top) / r.height - 0.5) * 26 * dpr;
    });
    window.addEventListener("mouseout", () => {
      mouse.active = false; mouse.x = -9999; mouse.y = -9999;
      parallax.tx = 0; parallax.ty = 0;
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { build(); if (prefersReduced) drawStatic(); }, 180);
  });

  // pause when hero scrolled away
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => { entry.isIntersecting ? start() : stop(); });
  }, { threshold: 0 }).observe(canvas);

  build();
  start();
})();
