# Hero Motion — Block 08D

**IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA** — 4 October 2026.

## Direction / superseded implementation

08C (`219c7846384e2bd7e3a7411b12775232b7a36e7e`) is **REJECTED BY EZE**. Its diffuse arc LOOK is retained; its motion architecture is replaced. Small layer translations, a translated duplicate pointer path and low-amplitude OGL drift passed technical assertions but did not produce perceptible life in browser. Those assertions were not visual acceptance.

Clean synchronized baseline: `c1b864ad68fe7e715eea77b7e5d47c4c060c5d18`; baseline npm run check PASS. Removed `LivingArcMotion.jsx`, `livingArcMotion.js`, `arcMotionState.js`, the React Bits particle shader/adapter and its vendor license. OGL removed from manifest/lockfile and shipped notices. No retained alternate particle renderer or glow controller.

## Protected appearance

Desktop 02B / Mobile03 geometry, section framing, Navbar, copy, typography, CTAs, body/surface assets and all section CSS are unchanged. The four exact horizon paths/viewBoxes are unchanged. Their geometry is an invisible guide for three blurred bands, not a hard visible rim.

Base bands preserved: Desktop mist64/blur28/alpha.28, halo30/blur14/.58, core9/blur4/.62; Mobile34/16/.28,16/8/.58,5/2.5/.62. Original cyan gradient and stop opacities unchanged. No exported rim, unblurred ellipse, dash, loader, travelling short highlight or path morph.

## Particle engine / licenses

Pinned current official `@tsparticles/react`, `@tsparticles/engine`, `@tsparticles/slim` **4.4.0**, MIT. Verified npm package metadata and shipped source before installation; React wrapper peer range React/ReactDOM >=16.8 includes installed React19.2.7. Current source is the tsParticles monorepo, not the archived standalone React repository's v3 instructions.

`ParticlesProvider` / `useParticlesProvider` register slim once with a stable callback. The field uses native `tsParticles.load`, with a small React ownership adapter because the official wrapper's async load does not catch failures and may finish after cleanup. Starts are serialized; each effect has a unique host/id. Pending cancelled loads are destroyed on resolution before the next starts; resolved containers are destroyed immediately on cleanup. No custom particle simulation, shader, movement loop or hover algorithm.

Native image shapes use three local radial-gradient dust sprites, with unique preload names and no recoloring. That avoids double-applying initial opacity in the SVG recoloring path. Soft elongated fragments inherit #59E3FF/#75F6FF/#A0F8FF; no white particles. Native random size/depth/opacity animation and independent directions supply variation. No links, collisions, gravity, rain, autoplay sequence or click behavior.

| Setting | Desktop >=1200 | Mobile / Transition |
| --- | --- | --- |
| Count, density disabled | 60 | 24 |
| Native move speed range | .45–.9 | .25–.5 |
| Approx. baseline CSS travel/sec before depth attenuation | 13.5–27 | 7.5–15 |
| Sprite radius range, including transparent halo | 2.5–5px | 2.5–4px |
| Animated opacity range | .18–.65 | .18–.65 |
| Opacity / size animation speed | .35 / .65, unsynchronized | same |
| Canvas layer alpha, unchanged | .55 | .4 |
| FPS limit | 60 | 30 |
| DPR | Native ratio when <=1.5; otherwise1 | 1 |
| Native hover | Fine-hover Desktop only; repulse110px, factor1, speed/maxSpeed.7 | Disabled |

Native retina mode has no maximum-ratio option in4.4. Rather than patch engine internals or modify global devicePixelRatio, high-DPR Desktop opts out; Mobile always opts out. Reduced motion is owned by the existing preference hook, which unmounts this component completely.

## Arc displacement architecture

`HeroLightArc` remains the synchronous static fallback, with its original blur-only filters. Additional live filter definitions are unreferenced until the lazy controller attaches them: they do not render turbulence in static/reduced/failed states.

Each live filter: `feTurbulence` fractalNoise, one octave → flowing noise through `feOffset` → `feDisplacementMap` on the light band → optional local displacement → original Gaussian blur. Motion animates actual `baseFrequency`, noise offsets and displacement scales via `attrEffect` / MotionValues. Guide paths, body geometry and band transforms are never animated.

| Band | Desktop idle scale | Mobile idle scale | Desktop local maximum scale |
| --- | --- | --- | --- |
| Mist | 80–132 | 34–58 | 160 |
| Halo | 38–68 | 18–32 | 100 |
| Core | 12–24 | 6–12 | 32 |

Scales are filter strengths, not pixel displacement promises: actual displacement depends on noise channels. Frequency flows between .009/.014 and .015/.009, with continuous eased13/17s noise transport and9/12/15s band modulation; Mobile transport19/23s and frequency18s. Distributed deformation changes the field itself, not only alpha. No custom scalar clock, path translation or opacity-only substitute. These settings require the human3–5s acceptance gate; numerical change alone does not prove success.

## Local pointer field / spring recovery

Desktop fine-hover mouse only; passive pointermove, no touch capture/preventDefault. Inverse SVG screen CTM maps the pointer to the guide;128 samples determine proximity within220 SVG units. A440×440 radial alpha mask localizes the noise map. Outside this mask a neutral50% channel map produces zero local displacement. The displaced light field receives this local map, not a duplicate shifted path.

Motion `springValue` controls mask position (stiffness110/damping27/mass1) and strength (75/20/1). A mapped strength drives each band's actual local displacement. Entry initializes the mask at the nearby pointer; subsequent movement follows smoothly. Leaving the curve/Hero or window blur releases strength; near-complete recovery is about1s, without elastic bounce. Springs stop when settled. Mobile has no local filter pipeline or pointer listeners.

## Bounds / upper light cut

SVG overflow remains visible. Static/live filters have256 units of padding instead of160, allowing blur plus displacement without an internal rectangular cut. Live filter regions are constrained to the Hero's visible area mapped into SVG space plus that padding, instead of rendering the full offscreen1380/1700px ellipse. ResizeObserver + resize update bounds; teardown restores original bounds. Hero's existing viewport decoration crop stays unchanged. No layout offsets or asset crop changes.

## Visibility / reduced motion / independent fallback

The existing `useHeroMotionPreferences` remains the single owner of IO, document visibility, breakpoints, hover capability and prefers-reduced-motion. Active effects mount only while visible, document active and motion allowed. Reduced/hidden/offscreen unmount destroys the particle container, stops Motion animations/springs, detaches attrEffect subscriptions, restores static filters and removes observers/listeners. No running displacement filter is referenced after cleanup.

Particles and arc fail independently. Particle init/load/image failure removes its canvas and preserves full static stars; it does not stop arc motion. Arc setup failure restores blur-only filters; unsupported displacement leaves static bands. Lazy import failure leaves the whole static background. Ten approved stars fade to18% only after particle readiness, not merely after motion eligibility. CSS restores stars immediately for reduced motion. Content never depends on either effect.

## Performance

Initial JS baseline236.02kB/gzip71.43; old lazy Hero109.34/gzip36.28. Final production build:

| Payload | Before08D | After08D |
| --- | --- | --- |
| Initial JS |236.02kB /gzip71.43|237.49kB /gzip72.04|
| All lazy Hero JS, including native dynamic plugin chunks |109.34kB /gzip36.28|214.29kB /gzip70.40|
| CSS |67.22kB /gzip13.44|67.22kB /gzip13.44|

Initial JS increases1.47kB (gzip.61); total optional Hero payload increases104.95kB (gzip34.12). Isolated Vite bundle of engine+slim+React provider/hooks, with React external:211.48kB /gzip64.89 across11 chunks. This isolated package measurement is not additive to the application build: shared code and tree shaking differ. All16 actual lazy application chunks total214.29kB. Measurements exclude stale prior build artifacts; final build used --emptyOutDir. Source licenses are shipped locally in public/licenses/hero-motion.txt. Motion and tsParticles are reached only through the Hero's dynamic import; tsParticles additionally lazy-loads native container/plugin modules. No WebGL canvas or GPU context. One active 2D dust canvas, one tsParticles frame scheduler and one shared Motion frame scheduler; six idle Motion value animations share that scheduler. Pointer adds three spring values only while reacting, not another custom RAF.

Three one-octave live SVG noise fields are referenced only for the visible variant. Mobile uses smaller field geometry/strengths, fewer particles,30FPS and DPR1. Static filters remain blur-only. No claim of measured browser FPS/GPU/memory: Eze must check real-device cost and visible life together. Sparse2D particles are cheaper than the removed custom WebGL renderer in architectural complexity; actual performance still requires browser review.

## Technical validation / visual gate

- npm run check baseline/final: PASS; git diff --check: PASS.
- SSR harness: complete static bands/body/stars, unique SVG IDs, four exact guide paths, no canvas/hard rim/duplicate response path.
- Actual4.4 slim/plugin/options harness: movement, image palette/preload, opacity/size animation, counts, native repulse and bounded DPR correctly parsed. Found/corrected native preload deduplication by assigning unique sprite names.
- Actual Motion Node RAF/DOM lifecycle harness: local springs drive displacement, recover after blur, cleanup restores filters/attributes/bounds and prevents subsequent pointer writes. This is lifecycle verification, not a rendered/perceptual test.
- All section styles, data, motion preference hook, body assets, layout and later sections unchanged. No OGL/custom shader/requestAnimationFrame in application effect code.
- Browser appearance, console, FPS, clipping and3–5s idle/pointer acceptance are **PENDING EZE**, not marked PASS. No fabricated screenshots.

Desktop review:1366×768,1440×900,1536×864,1920×1080. Mobile:360×800,390×844,393×873,430×932. Check visible dust drift, sparse softness, native hover, real idle arc shape changes, local reaction/recovery, no hard ellipse/upper cut, reduced/failure/visibility/resize, scrolling and performance.

## Commit / next

One implementation commit, title `fix: replace Hero motion with native dust and SVG displacement`. Resolve exact SHA with `git log -1 --format=%H --grep='^fix: replace Hero motion with native dust and SVG displacement$'`; full SHA in delivery report. Eze visual QA is next. No Block09 or motion in other sections.


## Dirección — 08D rejected / runtime proof required

Fecha: 4 de octubre de 2026.

Eze realizó QA en browser real después de la migración a tsParticles + SVG displacement. Resultado: visualmente el Hero continúa casi idéntico al fallback estático y no existe una reacción visible al mouse.

Repo review after rejection identified a process failure: the implementation can silently fall back to the static Hero whenever particles or arc initialization fail, so automated structural tests may pass while the actual live layer never appears.

Additional concern: current tsParticles wiring uses a custom hybrid lifecycle (ParticlesProvider/useParticlesProvider + direct engine `tsParticles.load({ id, element, options })`) instead of the canonical React wrapper flow or a simple real-id engine mount. The screenshot still resembles the original fixed-star layer rather than a 60-particle live field.

Decision: stop production tuning. Next pass is a dev-only Motion Lab with explicit runtime diagnostics and intentionally exaggerated settings. No subtle/premium tuning until Eze visually proves each subsystem works.

Required proof order:
1. particles render;
2. particles move;
3. particle hover responds;
4. arc idle displacement renders;
5. arc pointer displacement responds;
6. return-to-rest works;
7. only then reduce intensity and merge final settings.

Silent fallbacks are disabled or visibly reported inside lab mode. Production fallback remains untouched outside lab mode.
