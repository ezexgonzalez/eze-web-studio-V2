# Block 08 — Living Hero

**IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**

## Baseline / scope

Synced clean production branch, baseline `5dac6abcef1e238bbec0d0cac87ad74e5116f217`; baseline lint/build PASS. Desktop02B and Mobile03/framing protected. No copy, typography, spacing, CTA, header, section-height, asset or later-section changes.

## Selected libraries / provenance

- React Bits FREE **Particles, JS/CSS variant**, inspected current official source at commit `ca44b3f9ee180676a06d7de8ec6bea84cddff85b`: https://github.com/DavidHDev/react-bits/blob/ca44b3f9ee180676a06d7de8ec6bea84cddff85b/src/content/Backgrounds/Particles/Particles.jsx . Copied/adapted source under `src/vendor/react-bits/particles.js`; not a newly authored particle engine.
- Upstream license is **MIT + Commons Clause**, not plain MIT/OSI-open-source. It permits use as part of an application/website/product including commercial purposes, and restricts resale/redistribution of the components themselves. Current LICENSE retained next to copied code and in served notices; no Pro source used.
- `ogl@1.0.11`, Unlicense, is the one renderer dependency required by upstream. Current npm metadata verified before installation; upstream https://github.com/oframe/ogl, license text from README.
- `motion@14.0.0`, MIT, pinned from current npm registry. Peer range React/ReactDOM18 or19; existing React19.2.7 retained. Used JS `animate`, `motionValue`, `svgEffect` APIs inside React effects. Docs: https://motion.dev/docs/svg-effect and https://motion.dev/docs/animate . No Motion+.
- Motion brings its own framer-motion/motion-dom/motion-utils14 dependencies and promotes existing tslib to runtime. No separate framer-motion dependency was added by us. All existing installed versions in lockfile remain unchanged.
- Full React Bits/Motion family/OGL/tslib notices served at `/licenses/hero-motion.txt`; upstream vendor license also preserved in repo.

## Controlled spike / gate

Before production edits, copied the current static Hero into an isolated temporary Vite app, installed only ogl/Motion, integrated Particles + exact-path Motion sweep, built it and ran lifecycle tests. Production remained unchanged until the technical spike passed.

Nine isolated Vitest/JSDOM tests cover canvas/RAF ownership, explicit disposal, initialization/link failure, context loss, bounded pointer state, StrictMode preference subscription cleanup, actual Motion SVG integration, full-Hero reduced/offscreen/static fallback, cheaper Mobile configuration and WebGL failure latch. OGL is stubbed for deterministic lifecycle assertions. This exercises integration code, **not real GPU shader compilation/rendering or visual quality**. No test fixture or test-only packages retained in production.

1440×900 and390×844 configurations map to the protected geometry; browser visual spike acceptance (premium/calm particles, sweep versus loader, text dominance) remains with Eze. No unavailable Chrome workaround retried, no fabricated screenshots or visual PASS. Candidate retained for that review; do not treat technical completion as final visual approval.

## Particles / configuration

| Configuration | Desktop >=1200 | Mobile / Transition |
| --- | --- | --- |
| Particle count | 70 | 28 |
| Speed (upstream time multiplier) | .045 | .03 |
| DPR cap | 1.5 | 1 |
| Point base size (upstream distance formula) | 36 | 28 |
| Layer opacity | .36 | .24 |
| Spread / camera distance | 8 /20 | 8 /20 |
| Rotation | Disabled | Disabled |
| Pointer | Fine mouse + hover only | Off |

Palette #59E3FF/#75F6FF/#F5F7F7; original random positions/depth/sizes/drift retained. Small opacity diversity added using original vRandom.z. No camera rotation, click bursts or noise overlays. GPU positions update through the upstream shader; no per-particle React state. Point-size values are upstream inputs, not fixed CSS pixel sizes.

### Pointer interaction

Original React Bits hover translates the entire field. Replaced that part with a small localized shader addition: two uniforms and a bounded screen-space displacement, radius .24 NDC and maximum .014 NDC (about10px horizontally at1440). Strength eases over180ms. Original drift/position sampling/renderer retained; no replacement engine or substantial shader rewrite.

Passive window pointermove observes the Hero bounds, including UI overlays, without intercepting events. Touch/pen ignored; only Desktop fine-hover mouse enables listener. No capture, preventDefault, scroll handling or input overlay. Outside Hero/blur resets strength. Decorative layer and canvas use pointer-events:none.

## Horizon technique / exact geometry

`horizonPaths.js` contains verbatim d/viewBox from production-rim, production-wide-rim, desktop-rim (Transition) and mobile-rim. Programmatic comparisons PASS. No morphing or approximated ellipse. Local asset files remain untouched.

One SVG sweep uses four synchronized strokes: broad low-alpha cyan glow (blur5px), faint14% cyan shoulder,10% cyan sharp shoulder,5% soft-white centre. Common progress drives Motion pathOffset; each stroke gets its own short pathLength. Initial dash attributes prevent a full-rim enhancement flash before Motion binds. Base rim/body/glow are independent and never hidden.

Full traversal12s Desktop/Transition,14s Mobile; linear velocity, modulo-one looping. Enhancement intensity breathes .65–.9–.65 over9s. Layered stroke lengths/alpha soften the segment instead of drawing the entire rim like a loader. Eze must assess actual visual result.

Sweep portals into the existing Desktop scene or Mobile horizon. Existing Production picture placement rule also positions sweep SVG, including wide crop, so no parallel geometry system. Transition153/1536×839 and Mobile10/390×118 match original rim placements. Mobile keeps proportional bottom-anchored horizon framing. All enhancement layers are absolute/decorative; no layout shift by CSS structure.

## Ambient glow / static stars

Motion replaces `useHorizonGlow.js`, which is deleted. Single glow owner:18s opacity1/.84/.96/1 Desktop/Transition and1/.92/.98/1 Mobile. Body/base rim never animated. Cleanup stops controls and removes inline opacity, restoring full base glow.

All ten Desktop static star assets/positions retained as anchor lights and fallback. Mobile preserves its existing static composition, without adding new fixed stars. Combined density still needs Eze's visual review; no anchor asset removed speculatively.

## Reduced motion / fallback / visibility

`useHeroMotionPreferences` owns reduced-motion, breakpoint/pointer queries, IntersectionObserver and visibilitychange. Effects load dynamically only while visible, document visible and motion allowed. Initial/SSR state is complete static Hero. Without IntersectionObserver, static fallback stays.

Reduced-motion changes unmount particles/sweep/glow owner; no active decorative RAF or opacity loop remains. CSS adds a first-paint guard but JS owns cancellation. No effects chunk requested for a session that stays reduced/static.

Offscreen/document.hidden unmounts enhancements, cancelling animations and destroying WebGL resources/context. Resume mounts a fresh field (random points may differ) and timelines start cleanly. StrictMode setup/cleanup leaves one live canvas and one field, with explicit listeners/observer/frame removal.

Renderer init/render failure, shader-link failure, context loss or chunk import failure latches static fallback for the current page session. Contextlost cancels frame, removes canvas, deletes resources if possible and releases context. No automatic context-restoration retry loop; reload can retry. Full base assets remain underneath; no blank Hero. On normal teardown buffers/program/context are released.

## Performance

Same production toolchain/React baseline before/after, minified Vite output:

| Asset | Baseline kB / gzip | Implementation kB / gzip |
| --- | --- | --- |
| Initial JS | 241.88 /70.99 | 243.67 /71.75 |
| Lazy effects JS | None | 107.90 /35.87 |
| Total JS if effects loaded | 241.88 /70.99 | 351.57 /107.62 |
| CSS | 68.04 /13.51 | 66.92 /13.40 |
| Inter | 352.24 | 352.24 |

Initial gzip delta+.76kB; full loaded JS gzip delta+36.63kB. Lazy chunk is the **delivered dependency + adapter cost**, not an individual package size or GPU benchmark. OGL/Motion are only requested for an eligible visible Hero. No renderer overhead in static/reduced mode apart from lightweight preference subscriptions.

Active system: one OGL canvas/RAF, one Motion path progress timeline, two opacity timelines (base glow and enhancement intensity); Motion shares its scheduler and may use native opacity animation where supported. Hidden/reduced/failed state: zero decorative animation loops/canvases; one visibility/preference owner remains to resume. No measured FPS, battery or physical GPU claim. Mobile scroll and actual device cost require Eze QA.

## Validation / manual QA

- Baseline/final npm run check PASS; git diff --check PASS. Production preview/initial and lazy JS/CSS/Inter/served notices HTTP200 (not browser QA).
- Nine isolated lifecycle tests PASS (JSDOM/OGL stub; actual Motion API).
- Actual React SSR: complete static Hero, no canvas/sweep, seven sections, ten existing stars, one real project, unique IDs.
- AST CSS check: every previous Hero declaration unchanged; only placement selector expanded to include sweep and enhancement-only rules added.
- All four rim path/viewBox pairs exactly equal local SVGs; HeroSection/content/data/assets/other sections/framing/styles unchanged.
- Existing dependency versions unchanged; no test-only package in production manifest/lockfile.
- Eze targets: Desktop1366×768/1440×900/1536×864/1920×1080; Mobile360×800/390×844/393×873/430×932. Check pointer subtlety, rim identity/brightness, particle density, text dominance, touch scrolling, chrome height changes, fallback/reduced-motion, visibility, console, fonts/assets, zoom and real performance.

## Tuned / rejected options

Only React Bits FREE Particles + Motion actually evaluated in this pass. Tuned from upstream count200/speed.1/base100/rotation/default-white to sparse cyan depth, lower inputs/DPR, no rotation and local gentle pointer response. Replaced upstream limited teardown with explicit failure/resource lifecycle. No generic rim library tried; MagicRings remains historically rejected, not retried here.

## Commit / next

One implementation commit: `feat: add living Hero particles and horizon light sweep`; resolve SHA with `git log -1 --format=%H --grep='^feat: add living Hero particles and horizon light sweep$'`. Actual SHA delivered in final report; no extra self-referential documentation commit.

Next: Eze visual/browser QA of Hero motion. No later-section motion or Block09 implementation authorized by this delivery.
