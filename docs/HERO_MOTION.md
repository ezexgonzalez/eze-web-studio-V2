# Block 08C — Living Arc Behavior

**IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA** — 4 October 2026.

## Baseline / scope

Clean synced baseline `924e1ba2225abb255e2d63674ecce27b5490e9fe`; baseline npm run check PASS. Eze accepted08B's visual direction as substantially closer, but did not approve its motion: arc/interaction too static, isolated bright particle points.08C preserves that diffuse arc concept and tunes life, not composition.

Desktop02B/Mobile03 and viewport framing remain protected. No layout, copy, type, Header, CTA, surface asset, crop, filter size, section height, other section or data change. `useHorizonGlow.js` remains absent (deleted in08), no competing glow system.

## Preserved arc appearance / fallback

HeroLightArc retains08B's exact four guide paths/viewBoxes and three diffuse bands: Desktop core9/blur4, halo30/blur14, mist64/blur28; Mobile5/2.5,16/8,34/16. Original cyan gradient/base band opacities retained. No hard exported rim, unblurred outline, dash or progress stroke. Body fill-only assets from08B unchanged. Inline overflow:visible/filter padding160 and existing Production/Wide/Tablet/Mobile placements unchanged; no recurrence of the old internally cropped image layers.

Static diffuse field renders synchronously including SSR. No WebGL/Motion required for that fallback. Ten original Desktop stars remain; only while live atmosphere is eligible do they fade to18% as intentionally distant fixed anchors, so they no longer dominate moving dust. Reduced-motion CSS restores them immediately; inactive/failed state has original fallback opacity.

## Arc motion

Single existing Motion clock retained; `arcMotionState.js` owns independent continuous rates for broad energy drift, per-stop density shimmer, mist/halo drift and breathing. No new renderer, filter or animation owner. Active gradient spacing narrows from2× to1.3× viewBox width, making density drift easier to perceive without drawing a short travelling segment. Seven stops vary smoothly from72–100% of their base alpha, with staggered phases. Field intensity stays about.79–1.01.

Energy travel combines slow rates.29/.47rad/s and amplitudes.24/.075×width; mist6px lateral/4px vertical, halo2.5px vertical maximum. Mobile runs at72% time rate with mist2.5/2px and halo1px. Core geometry stays fixed; the changing density/atmosphere supplies life. Analytic checks at3/5seconds verify state changes, not human visual acceptance.

A120s scalar Motion clock supplies frame callbacks; accumulated/clamped delta drives the field independently of scalar phase. Clock wrap cannot reset the light or produce a lap seam. No single short breathing cycle; frame stalls are capped50ms. Cleanup restores gradient bounds, every stop alpha, layer transforms, field alpha and pointer response to the exact static composition. Clock creation failure also restores before shared fallback.

## Pointer polish

Desktop fine-hover mouse only. Existing passive/inverse SVG screen-CTM/96 curve-sample approach retained. Proximity radius140→180 SVG units; mask150→180; local diffuse response width24→36 (Mobile stays24), displacement5→9 units maximum, response alpha.5→.68, damping450→380ms. Broad local light disturbance, not whole-field follow, surface morph, hard line, bounce or repulsion. Response eases to rest on leave/blur. Touch/pen ignored, no capture/preventDefault; Mobile has no arc pointer listener.

## Particle visual / motion polish

React Bits FREE Particles/OGL adapter retained, not replaced with a new engine. Live shader replaces the near-solid circular disc and colour oscillation with a diffuse slightly elongated Gaussian light fragment: low-alpha halo + soft concentration, tapered outer edge, seeded orientation and brightness. Palette now directly matches the arc (#59E3FF/#75F6FF/#A0F8FF/#D6FAFF), avoiding isolated white star points.

| Setting | Desktop | Mobile / Transition |
| --- | --- | --- |
| Count |70|28|
| Speed multiplier |1.05|.72|
| Base sprite input |160|120|
| Actual sprite bounds |5–14 CSS px including transparent/diffuse halo|same|
| Canvas layer opacity |.55|.4|
| DPR cap |1.5|1|
| Pointer |existing small local response|off|

Larger sprite inputs allocate room to glow, not an opaque bigger dot. Depth attenuates alpha35–100%, brightness varies calmly60–92%, peak fragment alpha remains below the previous point profile. Drift frequencies now have explicit nonzero minima: X.22–.42,Y.18–.38,Z.16–.30 per shader time; amplitudes bounded.2–.65/.2–.6/.15–.45 world units. Additional tiny screen drift.012NDC keeps distant fragments moving as well. Independent seeds/rates, gentle depth motion, no rotation/burst/glitter/smoke clouds.

Colour, diffuse profile and smooth low-frequency alpha now relate dust to arc. Particles stay secondary: fewer Mobile points, capped sprite footprints, faint distant anchors, no extra fog layer.

## Reduced motion / lifecycle / failure

Preferences hook unchanged: reduced/hidden/offscreen unmounts live controllers and OGL, cancels motion/RAF and releases listeners/observers/GPU resources. No continuous shimmer/floating/pointer interaction in reduced state. Static diffuse field/fill/stars remain. Import/WebGL/shader/context failure retains existing static latch until reload; no retries. StrictMode effect ownership remains one canvas and one arc clock. New clock init failure explicitly restores static SVG state.

## Libraries / performance

No dependency/lockfile change: ogl1.0.11 Unlicense, motion14.0.0 MIT. React Bits source ca44b3f9ee180676a06d7de8ec6bea84cddff85b remains MIT + Commons Clause; attribution/notices untouched. No Pro or new engine.

One Motion clock plus one OGL RAF; same three diffuse blur bands and one local response as08B. No new blur surfaces/renderers.70/28 sprites capped14px with existing DPR limits; seven SVG stop alpha writes share the clock. No test packages retained. Real GPU/battery/FPS not measured; Eze must assess cost on hardware.

Build sizes against08B (kB raw / gzip):

| Asset |08B|08C|
| --- | --- | --- |
| Initial JS |235.97 /71.42|236.02 /71.43|
| Lazy effects |107.77 /35.67|109.34 /36.28|
| CSS |67.05 /13.41|67.19 /13.44|

Full loaded JS gzip delta+.62kB; Inter352.24kB unchanged. Byte sizes are not GPU cost measurements.

## Validation / review

- npm run check and git diff --check PASS.
- Deterministic SSR/controller harness: complete static diffuse fallback, unique IDs/ten stars, four exact guide paths,3/5s Desktop/Wide/Mobile field changes, bounded pointer response/recovery, cleanup, noninteractive state and clock-failure restoration.
- Actual Motion numeric clock delivers continuous callbacks and stops in a Node timer-backed RAF harness. This is real library execution, not a browser rendering test.
- OGL-stub integration:5s Desktop/Mobile shader time advances to5.25/3.6, counts/DPR/uniforms correct, single RAF and idempotent disposal. Does not compile/render GLSL on a real GPU.
- Protected Hero/Header CSS declarations, content/data/Mobile framing/dependency manifests unchanged; assets and later sections unchanged. New CSS only dims live fallback stars and restores them for reduce.
- No browser visual/console/FPS PASS or fabricated screenshots. Apparent life/softness still requires Eze review.

Desktop review:1366×768,1440×900,1536×864,1920×1080. Mobile:360×800,390×844,393×873,430×932. Observe idle3–5s, pointer near curve/recovery, dust softness/speed/density, text dominance, upper glow, reduced/failure, resize/visibility, touch scrolling and actual cost. Do not treat technical motion assertions as visual approval.

## Commit / next

One commit: `fix: polish living Hero arc and luminous dust behavior`; resolve SHA with `git log -1 --format=%H --grep='^fix: polish living Hero arc and luminous dust behavior$'`. Actual SHA in final report. Next: Eze visual QA. No later-section motion or Block09.
