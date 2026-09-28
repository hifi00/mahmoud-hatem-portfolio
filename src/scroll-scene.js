/**
 * Mahmoud Hatem Portfolio – Scroll Scene Controller
 * Portrait scene + Scrollytelling chapter.
 * requestAnimationFrame-driven, reversible, no scroll-jacking.
 * Respects prefers-reduced-motion.
 */

export function initScrollScenes() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    // Show everything static
    document.querySelectorAll('.portrait-img').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.portrait-badge').forEach(el => { el.style.opacity = '1'; });
    document.querySelectorAll('.p-stage').forEach(el => {
      el.style.position = 'static';
      el.style.opacity = '1';
    });
    return;
  }
  setupPortraitScene();
  setupScrollyChapter();
}

/* ══════════════════════════════════════════════════════════
   PORTRAIT SCENE
   Track: .portrait-track   Sticky box: .portrait-sticky
   ══════════════════════════════════════════════════════════ */
function setupPortraitScene() {
  const track   = document.querySelector('.portrait-track');
  const img     = document.querySelector('.portrait-img');
  const bgLayer = document.querySelector('.portrait-bg');
  const stage1  = document.querySelector('.p-stage-1');
  const stage2  = document.querySelector('.p-stage-2');
  const badges  = document.querySelectorAll('.portrait-badge');

  if (!track || !img) return;

  let raf = false;

  function update() {
    raf = false;
    const rect  = track.getBoundingClientRect();
    const winH  = window.innerHeight;
    const total = rect.height - winH;
    if (total <= 0) return;

    const raw  = -rect.top / total;
    const p    = Math.min(Math.max(raw, 0), 1);

    // ── Portrait image ────────────────────────────────────
    let opacity, scale, ty, tx;
    if (p < 0.35) {
      const t = p / 0.35;
      opacity = 0.22 + 0.63 * t;
      scale   = 0.94 + 0.04 * t;
      ty      = 24  - 16  * t;
      tx      = 0;
    } else if (p < 0.65) {
      const t = (p - 0.35) / 0.30;
      opacity = 0.85 + 0.15 * t;
      scale   = 0.98 + 0.02 * t;
      ty      = 8   - 8    * t;
      tx      = 0;
    } else if (p < 0.85) {
      opacity = 1; scale = 1; ty = 0; tx = 0;
    } else {
      const t = (p - 0.85) / 0.15;
      opacity = 1 - 0.04 * t;
      scale   = 1 - 0.03 * t;
      ty      = -10 * t;
      tx      = -12 * t;
    }
    img.style.opacity   = opacity.toFixed(3);
    img.style.transform = `translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,0) scale(${scale.toFixed(3)})`;

    // ── Background parallax ───────────────────────────────
    if (bgLayer) {
      bgLayer.style.transform = `translate3d(0,${(-p * 28).toFixed(1)}px,0)`;
    }

    // ── Stage 1 text ──────────────────────────────────────
    if (stage1) {
      let op = 1, sy = 0;
      if (p < 0.12) {
        op = p / 0.12;
        sy = 14 * (1 - op);
      } else if (p > 0.52) {
        op = Math.max(0, 1 - (p - 0.52) / 0.16);
        sy = -10 * (1 - op);
      }
      stage1.style.opacity   = op.toFixed(3);
      stage1.style.transform = `translate3d(0,${sy.toFixed(1)}px,0)`;
    }

    // ── Stage 2 quote ─────────────────────────────────────
    if (stage2) {
      let op = 0, sy = 14;
      if (p >= 0.50 && p <= 0.90) {
        if (p < 0.64) {
          const t = (p - 0.50) / 0.14;
          op = t; sy = 14 * (1 - t);
        } else if (p <= 0.82) {
          op = 1; sy = 0;
        } else {
          const t = (p - 0.82) / 0.08;
          op = 1 - t; sy = -8 * t;
        }
      }
      stage2.style.opacity   = op.toFixed(3);
      stage2.style.transform = `translate3d(0,${sy.toFixed(1)}px,0)`;
    }

    // ── Floating badges ───────────────────────────────────
    badges.forEach((b, i) => {
      const delay = 0.22 + i * 0.10;
      let op = 0;
      if (p >= delay && p <= 0.92) {
        op = Math.min((p - delay) / 0.16, 1);
      }
      b.style.opacity   = op.toFixed(3);
      b.style.transform = `translate3d(0,${((1 - op) * 8).toFixed(1)}px,0)`;
    });
  }

  const tick = () => { if (!raf) { requestAnimationFrame(update); raf = true; } };
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  update();
}

/* ══════════════════════════════════════════════════════════
   SCROLLYTELLING CHAPTER  (architectural deep-dive)
   Track: .scrolly-track   Sticky: .scrolly-sticky
   Phases: 0→0.33 Mockup | 0.33→0.66 Grid | 0.66→1.0 Breakdown
   ══════════════════════════════════════════════════════════ */
function setupScrollyChapter() {
  const track     = document.querySelector('.scrolly-track');
  const mockup    = document.querySelector('.layer-mockup');
  const grid      = document.querySelector('.layer-grid');
  const breakdown = document.querySelector('.layer-breakdown');
  const steps     = document.querySelectorAll('.step-pill');

  if (!track) return;

  let raf = false;

  function update() {
    raf = false;
    const rect  = track.getBoundingClientRect();
    const winH  = window.innerHeight;
    const total = rect.height - winH;
    if (total <= 0) return;

    const p = Math.min(Math.max(-rect.top / total, 0), 1);

    // Phase: 0→0.33 Mockup (full)  |  0.33→0.66 Grid overlaid  |  0.66→1 Breakdown
    // Mockup: always behind, subtly darkens in later phases
    if (mockup) {
      const dark = p > 0.30 ? Math.min((p - 0.30) / 0.35, 0.5) : 0;
      mockup.style.filter = `brightness(${(1 - dark * 0.5).toFixed(2)})`;
    }

    // Grid layer
    if (grid) {
      let gOp = 0;
      if (p >= 0.22 && p <= 0.74) {
        if (p < 0.38) gOp = (p - 0.22) / 0.16;
        else if (p <= 0.58) gOp = 1;
        else gOp = 1 - (p - 0.58) / 0.16;
      }
      grid.style.opacity   = gOp.toFixed(3);
      grid.style.pointerEvents = gOp > 0.1 ? 'auto' : 'none';
    }

    // Breakdown layer
    if (breakdown) {
      let bOp = 0, by = 18;
      if (p >= 0.60) {
        const t = Math.min((p - 0.60) / 0.24, 1);
        bOp = t; by = 18 * (1 - t);
      }
      breakdown.style.opacity   = bOp.toFixed(3);
      breakdown.style.transform = `translate3d(0,${by.toFixed(1)}px,0)`;
      breakdown.style.pointerEvents = bOp > 0.1 ? 'auto' : 'none';
    }

    // Active step pill
    let active = 0;
    if (p > 0.62) active = 2;
    else if (p > 0.30) active = 1;
    steps.forEach((s, i) => s.classList.toggle('active', i === active));
  }

  const tick = () => { if (!raf) { requestAnimationFrame(update); raf = true; } };
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  update();
}
