# Block 08B — Living Light Arc

**IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA** — 4 October 2026.

## Baseline / rejected approach

Clean synced baseline `5a30369a8b48559a84fe47ab65e064521d4d2cde`; npm run check PASS. Eze rejected Block08: almost static particles, readable ring, add-on highlight, weak atmosphere and upper light cut. Its segmented pathOffset/pathLength sweep and exported glow/rim are superseded, not retained as competing layers. `useHorizonGlow.js` was already deleted in08; it remains absent.

Desktop02B and Mobile03/viewport framing remain protected. No layout, copy, header, typography, buttons, heights, other sections, data or interaction changes outside the Hero decoration.

## Arc construction / static line removal

`HeroLightArc.jsx` renders one diffuse field per approved viewport crop. The four exact rim paths/viewBoxes remain geometry guides. No unblurred stroke, dash segment, progress offset, loader or exported rim image is rendered. Three bands: core9px/blur4, halo30px/blur14, mist64px/blur28; Mobile5/2.5,16/8,34/16. A broad multi-stop cyan/light-cyan gradient gives soft concentrations, never a hard white stroke.

Asset audit found an additional bright outline embedded in ALL four body SVGs. Removed only stroke-only paths from Desktop/Production/Wide bodies and only the stroke attribute from Mobile's filled path. Fill/gradient/ellipse/path/viewBox/dimensions unchanged, verified against baseline. Original rim/glow asset files remain historical/unimported; they are not in the live composition. Ten static Desktop stars preserved.

Static diffuse arc is rendered synchronously, including SSR, without Motion/WebGL. CSS paints only the appropriate Desktop variant; Mobile has its own variant. No portal/observer-dependent blank fallback.

## Living arc / pointer

Motion remains the selected existing library. One18s Desktop/22s Mobile clock controls broad gradient travel (sinusoidal ±22% viewBox width), gentle density breathing, and mist drift (Desktop5px lateral/4px vertical, Mobile2px). Smooth periodic return avoids dash seam and visible lap reset. This is broad light-density motion, not a short bright spot orbiting a ring. Atmospheric mist is diffuse light volume; no smoke texture/noise renderer added.

Desktop fine-hover mouse uses passive pointermove, SVG inverse screen CTM and96 curve samples. Response fades within140 SVG units of the curve. A150-unit radial mask reveals a diffuse local light duplicate, drifting upward at most5 SVG units and intensifying up to.5 alpha, eased over450ms. It shifts local light density rather than distorting the surface or making the whole ellipse wobble. Exit/blur returns smoothly. Touch/pen ignored, pointer-events:none, no capture/preventDefault. Mobile has no pointer listener.

Cleanup stops the single clock, removes listeners and resets gradient/mist/intensity/response to static state. Breakpoint changes restart only the current variant. Arc initialization failure goes through the shared static failure latch.

## Particles correction

Existing React Bits FREE Particles/OGL adapter retained. The previous speeds .045/.03 yielded near-frozen drift: raised to.65/.45 (14.4×/15×). Existing independent sinusoidal drift/depth retained, without rotation. Base-size input54/40 rather than36/28, layer opacity.55/.4 rather than.36/.24; shader alpha now independently breathes from seeded phase. Counts remain70/28, cyan/soft-white palette, DPR caps1.5/1. Sparse depth is preserved; actual apparent density/motion needs Eze review. Existing bounded local Desktop particle response and lifecycle remain intact.

## Upper cut / crop audit

Previous exported glow contains a path only5px from its own SVG top and blur11; visible overflow was not guaranteed for that image viewport. The old sweep was also a separate bounded SVG. Both are removed from rendering. New inline SVG explicitly uses overflow:visible; blur filters use userSpace bounds padded160px on all sides, large enough for half-band width32 + blur28×3 + drift4. Regions use the visible viewBox +320px, not oversized full offscreen ellipse bounds. Core/halo/mist share the same positioning owner as the body picture.

Preserved placement: Production1560×1380 atleft-60/topclamp128–200; Wide2040×1700 atleft-300/top200; Tablet1536×839 attop153; Mobile390×118 attop10 inside bottom-anchored horizon. The scene/horizon wrappers do not clip filters. Only the overall Hero background clips to the section boundary, preserving the intended page crop and preventing overflow into later sections. At shortest Desktop Production top128, upper light3σ extent stays about9px below section top. No internal SVG/filter top cut is imposed. Eze must verify the previously observed cut is visually resolved at all checkpoints; no browser PASS claimed.

## Reduced motion / fallback / lifecycle

Shared preferences hook unchanged: reduced-motion/hidden/offscreen unmounts all live controllers/particles, stops continuous loops and disposes OGL. Static diffuse light + fill surfaces + stars always remain, including SSR and chunk import/WebGL/context failure. Failure latch stays until reload, no retry loop. Reduced motion has no pointer/travelling energy/particles. StrictMode ownership remains effect setup/cleanup; one canvas, one arc clock. No old glow animation owner remains.

## Libraries / licenses

No dependency added or changed: ogl1.0.11 Unlicense, motion14.0.0 MIT (React19 compatible). React Bits source ca44b3f9ee180676a06d7de8ec6bea84cddff85b is MIT + Commons Clause, not plain MIT; attribution/notices unchanged. No Pro, new renderer, particle engine rewrite or alternate library.

## Validation / performance

npm run check and git diff --check PASS. Isolated Vite SSR + deterministic arc-controller harness checks complete static diffuse fallback, unique SVG IDs, ten stars, four exact guide paths, continuous gradient changes, bounded pointer response/recovery, cleanup, and noninteractive configuration. Body XML comparison verifies only outline removals. Protected layout declarations and later-section/data/package diffs checked. These are structural/lifecycle tests, not real browser/GPU validation. Prior08's nine tests are historical, not claimed rerun for08B.

SVG blur is now the main arc cost: three painted blur bands plus one masked response; hidden crop variants do not paint. One Motion clock replaces multiple sweep/glow timelines. OGL still has one RAF and70/28 points. DPR caps unchanged. Production build compared to08 baseline: initial JS243.67→235.97kB (gzip71.75→71.42), effects107.90→107.77kB (gzip35.87→35.67), CSS66.92→67.05kB (gzip13.40→13.41). Some historical inline image payload leaves the entry bundle; no dependency changes. These are delivered byte sizes, not render-cost measurements. No measured FPS, GPU or battery claim; validate on real hardware.

Eze QA:1366×768,1440×900,1536×864,1920×1080; Mobile360×800,390×844,393×873,430×932. Check visible particle life, soft arc vs outline, pointer refinement, upper glow continuity, text dominance, touch scrolling, resize, reduced-motion/fallback, console and real cost. No fabricated screenshots or final visual approval.

## Commit / next

One commit: `fix: rework Hero as a living atmospheric light arc`; resolve SHA with `git log -1 --format=%H --grep='^fix: rework Hero as a living atmospheric light arc$'`. Actual SHA delivered in final report. Next: Eze visual QA, no other-section motion or Block09.
