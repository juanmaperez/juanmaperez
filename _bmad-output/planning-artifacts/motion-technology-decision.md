# Motion technology decision — Epic 7 (FR19)

**Status:** Approved for implementation (Story 7.2)  
**Date:** 2026-05-22  
**Author:** EP / product + architecture  
**Supersedes:** Legacy Gatsby stack (`gsap@2`, `scrollmagic`, `react-spring@8`)

---

## Problem

Story **7.1** inventory confirms **`same`** motion parity on home, CV, header, and project contact blocks. Legacy code is built on **GSAP 2 APIs** (`TimelineMax`, `TweenMax`) and **ScrollMagic** scenes. Astro must reproduce behavior **without** React-on-every-page and **without** running scroll libraries at static build time.

---

## Recommendation (default)

| Legacy | Astro / Epic 7.2 |
|--------|------------------|
| GSAP 2 timelines | **GSAP 3** — `gsap.timeline()`, `gsap.fromTo()`, modular import |
| ScrollMagic `Controller` / `Scene` | **ScrollTrigger** — `scrollTrigger: { trigger, start, end, scrub, pin }` |
| react-spring CV sections | **First try:** GSAP stagger or **Motion** (`motion` package) in a CV-only client module |
| react-spring (if spike fails) | **Fallback:** `@astrojs/react` + `@react-spring/web` on `/cv/` only |
| Cookie `animationCompleted` | Vanilla JS in `home-orchestration.ts` |
| Glitch / blink CSS | Port keyframes — no JS library |

**npm (site/):** `gsap@^3` — register plugin once: `gsap.registerPlugin(ScrollTrigger)`.

---

## Why GSAP 3 + ScrollTrigger (not “vanilla only” or ScrollMagic port)

1. **Closest semantic map** — Your legacy files are already GSAP timelines + ScrollMagic scenes; ScrollTrigger is the maintained replacement for scenes (see [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)).
2. **One mental model for 7.2** — Devs port scene-by-scene from inventory rows instead of relearning scroll APIs in three libraries.
3. **Tree-shaking** — Import only `gsap` + `ScrollTrigger`; avoid full GSAP 2 bundle + separate ScrollMagic.
4. **ScrollMagic is a dead end** — Already null-loaded in Gatsby SSR; no Astro advantage to reviving it.

---

## Options considered

### A. GSAP 3 + ScrollTrigger — **SELECTED**

- **Pros:** Best parity path; documented; works in Astro `client:visible` modules and vanilla `<script type="module">`.
- **Cons:** ~tens of KiB JS; needs LCP/JS checklist exception on `/`.
- **Astro pattern:** `HomeMotion.astro` on `index.astro` only:

```astro
---
import HomeMotion from '../components/motion/HomeMotion.astro';
---
<HomeMotion client:visible />
```

Inside island/module: `onMount` → init timelines + `ScrollTrigger.create()`.

### B. CSS scroll-driven animations — **simplified fallback only**

- **Pros:** Zero JS for simple reveals.
- **Cons:** Poor match for legacy **pin**, **scrub**, multi-element parallax (`workItem`, `about-block`, `contact-block`).
- **Use when:** Product accepts **simplified** on a checklist row.

### C. Motion One / WAAPI — **CV / micro-interactions**

- **Pros:** Small bundle for staggers; no React.
- **Cons:** Rewriting ScrollMagic-equivalent home scenes is more work than GSAP.
- **Use when:** CV spike shows GSAP stagger feels wrong; or header-only fades.

### D. Framer Motion / react-spring everywhere — **rejected as default**

- **Pros:** Familiar React animation APIs.
- **Cons:** Violates ADR-004 spirit (React on all routes); legacy spring v8 is outdated.
- **Use when:** CV-only fallback after failed GSAP/Motion spike.

### E. Lenis + ScrollTrigger — **optional later**

- Smooth scroll not in legacy portfolio; add only post-parity if desired.

---

## Mapping examples (legacy → GSAP 3)

**Intro timeline** (`main-block.js`):

- `new TimelineMax()` → `gsap.timeline()`
- `.fromTo('.main-block-cover', …)` → same selectors, `gsap.fromTo()`
- `.staggerFromTo('.main-list li', …)` → `timeline.from('.main-list li', { …, stagger: 0.6 })`

**Scroll fade** (`main-block.js` `removeSocial`):

```js
// Legacy ScrollMagic.Scene + setTween
ScrollTrigger.create({
  trigger: '.main-list',
  start: 'top 80%',
  end: '+=10%',
  animation: gsap.fromTo('.main-list', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.6 }),
});
```

**Parallax card** (`workItem.js`): `ScrollTrigger` with `scrub: true` + `y` tween on image/block.

---

## Bundle & NFR guardrails

- Load motion **only** on `/`, `/cv/`, `/projects/*` (contact), not blog.
- Run **7.2 spike** → record transferred JS; update checklist **LCP/JS ex.**
- **`prefers-reduced-motion: reduce`:** skip timelines; show final DOM state (sections visible, no pin).

---

## 7.2 execution order

1. Spike: `main-block` timeline + one `workItem` ScrollTrigger scene.  
2. `HomeMotion` orchestration + cookie gate.  
3. Remaining home blocks + project contact reuse.  
4. Header intro.  
5. CV typewriter (CSS/JS) + stagger (GSAP/Motion → spring fallback if needed).  
6. Story **7.4** Lighthouse/JS vs baselines.

---

## References

- [architecture.md ADR-008](./architecture.md)
- [prd.md FR19](./prd.md)
- [docs/migration-parity-checklist.md](../../docs/migration-parity-checklist.md) — Legacy animation inventory
- [GSAP 3 migration guide](https://gsap.com/docs/v3/GSAP/gsap.migrateFromV2())
