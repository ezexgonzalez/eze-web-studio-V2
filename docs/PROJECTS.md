# Proyectos — current runtime / Block 08Q

**IMPLEMENTED / READY FOR EZE VISUAL QA** — 13 October 2026.

Branch `feature/ews-v2-production`, clean synchronized baseline `ae594892187387516f16bfc39fb80db84f3f9023`. Eze explicitly authorizes replacing the static Desktop stage/native Mobile controller with Embla v8. This supersedes the earlier frozen interaction structure, without changing approved project content or the page's visual direction.

## Sources and visual contract

Historical masters: Figma `aw1k9uSQJhmNGeODZY7BC3`, Desktop73:42 / Mobile183:6; Desktop Production242:196 and Fit266:178. Prior blocks inspected these masters;08Q follows Eze's explicit refinement brief, with no new Figma edits or redesign. Original Block04 implementation `b0fc13568dbc7176b982dab68b7b7697780941ea` was approved for continuation; old QA infrastructure history remains in `docs/qa/block-04/README.md` and git history.

Keep editorial heading, original container/padding/section height strategy, static ambience, local SVGs, controls without dots, information and214×60 CTA beneath the preview. Desktop active preview remains540wide with the approved height-aware299–365px band, centered over the information axis. Mobile retains310×210 slides at390,16px spacing and44px controls; selected slide is now centered. Tablet interpolates560–621wide and300–420high using existing rules.

One viewport/track now spans all breakpoints. Desktop real slides overlap horizontally by220px, with their unselected inner surfaces at scale.6/translateY32/opacity.65. Selected surface has native scale/position/opacity1 and higher stacking order. Embla moves the track; CSS only provides depth, so this is not a static four-slot data swap. Wrapper measurement is unaffected by inner-surface transforms. No new reveal, tilt, autoplay or infinite loop.

## Dependency and architecture

Only direct new runtime dependency: **embla-carousel-react8.6.0**, pinned exact, MIT. Its required transitive packages are embla-carousel8.6.0 and embla-carousel-reactive-utils8.6.0 (MIT). Official v8 React flow: <https://www.embla-carousel.com/docs/v8/get-started/react>; options: <https://www.embla-carousel.com/docs/v8/api/options>.

`useProjectCarousel` uses official useEmblaCarousel: align:center, containScroll:false (first/last center), loop:false, skipSnaps:false, watchDrag only when multiple records, duration25 normally. Embla's selectedScrollSnap is the single source of active state. useSyncExternalStore subscribes to select/reInit and projects the selected index; there is no React-set active index, Desktop controller, scrollLeft calculation, scroll-snap listener or debounce engine.

Buttons call Embla scrollTo. Keyboard on the viewport uses ArrowLeft/ArrowRight/Home/End and ignores modified or nested target events. Disabled flags derive from canScrollPrev/canScrollNext. Category/title/description/CTA/status/pagination and selected surface all use the same Embla index. ResizeObserver/slides observation and reInit are owned by Embla; official React wrapper destroys the instance on unmount. Application subscriptions are removed on cleanup.

Reduced motion uses reactive matchMedia, duration0 and immediate scrollTo. Direct drag tracking remains essential; a pointerUp handler jumps to the selected snap instead of animating the release. No autoplay or idle carousel loop. CSS depth/preview transitions are removed under reduced motion. Touch-action:pan-y pinch-zoom retains vertical page scrolling and zoom. No new touch-action rules outside the carousel.

## Real data versus decoration

Production dataset is unchanged: **one fitness record**, FITNESS / Fuerza con método. / Landing page para un gimnasio boutique.; preview:null and url:null. Runtime01/01, previous/next genuinely disabled, CTA button disabled without href, single slide centered and no drag affordance/tab stop.

The approved three empty Desktop flanking slots remain only in a separate aria-hidden/pointer-events:none decoration layer when there is one record; Mobile shows only the empty next peek. They are not track children, Embla slides, articles, CTA destinations or navigable records. With multiple real records the decoration is removed and real neighboring slides provide depth/peek. No cloned fitness records, previews, URLs or pending copy added.

Seven local SVGs are retained. Real previews render only when a record supplies one. Background/empty slots do not gain fake interactivity. Existing future real-preview brightness hover remains.

## Accessibility

Section/group associated with h2; native44px controls and descriptive labels; multi-record viewport is keyboard-focusable with a navigation instruction. Global focus-visible styles retained. Only the selected project's information is an article with its h3 and polite atomic status. Redundant visual previews/track and decoration are aria-hidden, with no interactive descendants or repeated project announcements. Pending CTA/null data remain explicit. No meaning depends exclusively on depth/color.

## Technical QA

- npm run check baseline/final lint/build and git diff --check PASS.
- `tests/projectCarousel.test.mjs` executes **the installed Embla8 engine and official React hook**, React DOM in StrictMode, with three clearly marked TEST ONLY records. These are isolated test inputs, never imported by App/data or included in the production bundle.
- PASS: initial/last disabled boundaries, next/previous, Arrow keys/Home/End, real engine transform changes during dispatched mouse drag, touch swipe, selected index/preview state/status/category/title/description/CTA synchronization, first/last snaps, ResizeObserver-driven Desktop↔Mobile reInit, selected center math at1366×768/1440×900/1536×864/1920×945, reduced-motion immediate snap and touch release, single approved record/null states, unmount/observer/RAF cleanup, no React console errors in harness.
- FAQ regression in the same DOM harness: approved first question open/close, aria-expanded/aria-hidden/inert, four pending questions disabled; no new answers.
- Existing five navbar/Solution controller tests PASS. Protected diff confirms Hero Motion, Navbar, Problem/Solution/About, data/assets/global typography, shared editorial grid and Mobile outside carousel unchanged.
- Production SSR and preview HTTP checks supplement the interaction harness; no browser rendering or pixel comparison inferred from them.

Reproduce with a QA-only jsdom installation **outside this repository** (not a production/dev dependency):

```sh
npm install --prefix /tmp/ews-08q-tools --no-save jsdom@26
EWS_QA_JSDOM=/tmp/ews-08q-tools/node_modules/jsdom/lib/api.js node --test tests/projectCarousel.test.mjs
node --test tests/siteMotion.test.mjs
```

DOM offsets, media/observers and pointer events in the harness are simulated; the Embla engine/React code are real. **This is technical interaction QA, not browser visual/touch hardware PASS.** No fabricated screenshots. Known Chromium absence remains; Eze validates actual drag/swipe/hover/snap perception and responsive pixels in browser.

## Bundle impact

Initial JS240.61→259.73kB (+19.12; gzip73.12→80.89, +7.77). CSS70.37→70.66kB (+.29; gzip14.02→14.09). Hero lazy chunk remains135.80kB with unchanged source. These are build sizes, not hardware/runtime FPS measurements. No autoplay/plugins/renderers; Embla is the only added runtime responsibility.

## Content / remaining review

Projects2–3, approved URLs and previews remain pending. Eze reviews empty current state and, with isolated local fixture only, real multi-slide behavior at the five requested viewports. Actual text wraps/overflow/gesture feel/snap/depth and screen-reader UX remain browser acceptance tasks. Existing08K Hero runtime gate unchanged. No Production FINAL declaration.

## Commit

Single commit `feat: refine editorial hierarchy and add Embla projects carousel`; exact SHA in final report, resolve with `git log -1 --format=%H --grep='^feat: refine editorial hierarchy and add Embla projects carousel$'`.
