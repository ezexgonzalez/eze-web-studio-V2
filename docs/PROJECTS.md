# Proyectos — current runtime / Blocks 08Q + 08R + 08S

**READY FOR EZE VISUAL QA** — 14 October 2026.

08Q architecture record (Embla hook unchanged through08S): branch `feature/ews-v2-production`, clean synchronized baseline `ae594892187387516f16bfc39fb80db84f3f9023`. Eze explicitly authorizes replacing the static Desktop stage/native Mobile controller with Embla v8. This supersedes the earlier frozen interaction structure, without changing approved project content or the page's visual direction.

## Sources and visual contract

Historical masters: Figma `aw1k9uSQJhmNGeODZY7BC3`, Desktop73:42 / Mobile183:6; Desktop Production242:196 and Fit266:178. Prior blocks inspected these masters;08Q follows Eze's explicit refinement brief, with no new Figma edits or redesign. Original Block04 implementation `b0fc13568dbc7176b982dab68b7b7697780941ea` was approved for continuation; old QA infrastructure history remains in `docs/qa/block-04/README.md` and git history.

Keep editorial heading, original container/padding/section height strategy, static ambience, local SVGs, controls without dots, information and214×60 CTA beneath the preview. Desktop active preview remains540wide with the approved height-aware299–365px band, centered over the information axis. Mobile retains310×210 slides at390,16px spacing and44px controls; selected slide is now centered. Tablet interpolates560–621wide and300–420high using existing rules.

One viewport/track now spans all breakpoints. Desktop real slides overlap horizontally by220px, with their unselected inner surfaces at scale.6/translateY32/opacity.65. Selected surface has native scale/position/opacity1 and higher stacking order. Embla moves the track; CSS only provides depth, so this is not a static four-slot data swap. Wrapper measurement is unaffected by inner-surface transforms. No new reveal, tilt, autoplay or infinite loop.

## Dependency and architecture

Only direct new runtime dependency: **embla-carousel-react8.6.0**, pinned exact, MIT. Its required transitive packages are embla-carousel8.6.0 and embla-carousel-reactive-utils8.6.0 (MIT). Official v8 React flow: <https://www.embla-carousel.com/docs/v8/get-started/react>; options: <https://www.embla-carousel.com/docs/v8/api/options>.

`useProjectCarousel` uses official useEmblaCarousel: align:center, containScroll:false (first/last center), loop:false, skipSnaps:false, watchDrag only when multiple records, duration25 normally. Embla's selectedScrollSnap is the single source of active state. useSyncExternalStore subscribes to select/reInit and projects the selected index; there is no React-set active index, Desktop controller, scrollLeft calculation, scroll-snap listener or debounce engine.

Buttons call Embla scrollTo. Keyboard on the viewport uses ArrowLeft/ArrowRight/Home/End and ignores modified or nested target events. Directional disabled states derive from the Embla-selected index and real dataset boundaries, avoiding stale availability when the item count changes but selection stays0. There is no second selection controller. Category/title/description/CTA/status/pagination and selected surface all use the same Embla index. ResizeObserver/slides observation and reInit are owned by Embla; official React wrapper destroys the instance on unmount. Application subscriptions are removed on cleanup.

Reduced motion uses reactive matchMedia, duration0 and immediate scrollTo. Direct drag tracking remains essential; a pointerUp handler jumps to the selected snap instead of animating the release. No autoplay or idle carousel loop. CSS depth/preview transitions are removed under reduced motion. Touch-action:pan-y pinch-zoom retains vertical page scrolling and zoom. No new touch-action rules outside the carousel.

## Real data + conditional presentation

Production dataset contains **one fitness record**, FITNESS / Fuerza con método. / Landing page para un gimnasio boutique.08R supplies local `fitness-preview.webp` and approved `https://eze-demo-gimnasio.vercel.app/`. Runtime01/01, previous/next omitted from the single-project UI in08S, VER PROYECTO is an enabled anchor with target=_blank/rel=noopener noreferrer. Single slide remains centered with no drag affordance/tab stop.

08S removes all empty decorative slots and their CSS. With one project, a noninteractive paragraph says **MÁS PROYECTOS EN CAMINO**, with a32×1px cyan55% rule: right side of the preview on Desktop, in flow beneath it on Tablet/Mobile. The preview's original geometry and crop stay unchanged. Pagination01/01 uses a muted12px editorial treatment with the existing44px row retained. No fake card, border rectangle, link, hover or tab stop on the message.

With two or more approved records, the message is absent and both native controls return automatically. Only real records produce slides. Existing depth/drag/swipe/keys/pagination/information/CTA synchronization is preserved. No cloned records, filler previews or URLs.

Seven local SVGs are retained;08R adds the supplied WebP, displayed once in the real slide. Real previews render only when a record supplies one. Background/empty slots do not gain fake interactivity. Existing future real-preview brightness hover remains.

## Accessibility

Section/group associated with h2; native44px controls and descriptive labels; multi-record viewport is keyboard-focusable with a navigation instruction. Global focus-visible styles retained. Only the selected project's information is an article with its h3 and polite atomic status. Redundant visual previews/track are aria-hidden, with no interactive descendants or repeated project announcements. Projects without approved URLs still get disabled CTA buttons; FITNESS now uses its approved real destination. No meaning depends exclusively on depth/color.

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

Projects2–3 and their approved URLs/previews remain pending; project1 preview/URL are resolved in08R. Eze reviews the current single real preview state and, with isolated local fixture only, real multi-slide behavior at the five requested viewports. Actual text wraps/overflow/gesture feel/snap/depth and screen-reader UX remain browser acceptance tasks. Existing08K Hero runtime gate unchanged. No Production FINAL declaration.

## Commit

Single commit `feat: refine editorial hierarchy and add Embla projects carousel`; exact SHA in final report, resolve with `git log -1 --format=%H --grep='^feat: refine editorial hierarchy and add Embla projects carousel$'`.


## Block 08R — Real FITNESS preview + demo

14 October2026. Clean synchronized baseline `8f7cb4c375338d0f103a00c0581a338c84bd0b39`. Targeted approved content integration only; no merge.

- Eze's attached `ews-fitness-preview(1).webp` copied byte-identical to `src/assets/projects/fitness-preview.webp`:1448×1086 RGB WebP,128630bytes (~125.6KiB). Already optimized; no lossy recompression, AI alteration or temporary asset URL. SHA256 `ea3961e246c62b5aad367c629be195f27ae5c17554a1603058d3450e0b71c283`.
- `src/data/projects.js` imports the local asset and changes only fitness.preview and fitness.url to `https://eze-demo-gimnasio.vercel.app/`. ID/category/title/description, count and section copy unchanged.
- Existing ProjectPreview/Button render the image and external anchor automatically. ProjectsSection, Embla hook, all CSS, dimensions, depth, controls/decoration, Mobile, other sections and Hero Motion are byte-identical. No new dependency.
- object-fit:cover and default centered object-position remain. Source ratio4:3 versus slots540×299–365 /310×210 produces vertical cover cropping without distortion. The main headline, subject and in-screen CTA remain within calculated crop bounds at the four Desktop heights and Mobile390×844. At shorter Desktop heights more of the outer laptop framing is trimmed. No CSS crop correction was justified by source inspection; Eze verifies final perceptual crop in browser.
- CTA semantic attributes verified in React SSR/DOM: approved exact href, target=_blank, rel=noopener noreferrer, no disabled attribute. Demo HEAD returns HTTP200 at the approved URL. This checks endpoint/anchor semantics, not an actual browser tab-opening test.
- Runtime still01/01, one slide/article/image and two disabled directional controls; decorative slots contain no previews. Test's single-record assertions updated to approved preview/enabled CTA; multi-record fixture and pending/null CTA tests retained.

Validation: baseline/final npm run check lint/build and git diff --check PASS; actual Embla+React DOM isolated regression PASS, including current approved content and unchanged multi-record interactions; five site controller tests PASS. WebP decode/source-byte equality, emitted build asset and preview-server asset response/decode/hash verified. No browser visual/overflow/crop/tab-opening PASS or screenshots fabricated; final QA remains Eze's gate.

Files: local WebP, projects data, current-state/this document and existing carousel test expectation. Single commit `feat: integrate approved FITNESS preview and live demo`; exact SHA in final report, resolve with `git log -1 --format=%H --grep='^feat: integrate approved FITNESS preview and live demo$'`. Status READY FOR EZE VISUAL QA; no Production FINAL. Projects2–3 and08K runtime proof remain pending.


## Block 08S — Single-project presentation + CTA accent

14 October2026, clean synchronized baseline `e9f7126bcecae4e135554a307b8b2dafcc2dc4ee`. Only ProjectsSection, projects data/styles, existing carousel QA and current-state/this document changed. No merge, new dependency, global Button change or Embla-hook change.

### Presentation

A small grid wrapper contains the unchanged stage and optional coming-soon text. On Desktop they share the same grid row; stage dimensions/margin and preview stay the same, message aligns at the right. Its width is min(240px, half-container minus318px), leaving at least48px from the540px preview even at1200. Requested1366/1440/1536/1920 widths give240px message width and125/130/130/130px clear separation. These are CSS calculations, not measured browser bounds. No preview overlay or extra Desktop height.

Below1200 the message uses the next grid row,24px top margin,11/18 text and12px gap to its32px rule. At390 it fits the342px content width; wrapping is permitted, no clipping/fixed text height. This adds42px of natural flow before the existing counter/info with the one-line label. No changes to preview310×210, width/gap/crop, section padding or other sections.

Decorative rectangle DOM/CSS removed entirely. Native previous/next buttons mount only for multiple records. Single indicator stays centered, muted and noninteractive; existing polite project status still communicates the real count/title. The message is a p, not a placeholder project/article/CTA.

### CTA accent

Fitness data explicitly adds accent:#FF5A45. The current approved preview, URL, category/title/description remain unchanged. Existing Button receives only a local --project-accent CSS variable from the selected record, falling back to var(--color-accent-cyan). Normal outline cyan/white is untouched. Hover on fine-hover devices and focus-visible use project fill/border and Text Inverse#050708; the original local SVG image becomes dark through brightness(0), without changing the asset.225ms color/background/border/icon transitions; reduced motion removes them. Only enabled projects-cta is affected, not disabled/null CTAs or shared site buttons. No image color extraction.

Calculated dark-text contrast: Fitness6.54:1, cyan fallback13.32:1. Native focus-visible outline retained; project-specific fill complements it.

### Regression / validation

- npm run check baseline/final lint/build and git diff --check PASS.
- Existing test harness runs real Embla8+React DOM StrictMode with2and3 TEST ONLY records: conditional controls/message, active metadata/count/CTA/accent, fallback, bounds/keys/mouse/touch/resize/reduced/cleanup;1→2→3→1 mode changes also PASS. Button boundaries use selected index/count after the fixture exposed stale canScroll flags on count-only reInit; fixed in UI without modifying useProjectCarousel or Embla.
- Single approved state: exactly1slide/image/article, no decoration/directional controls, one coming paragraph,01/01, preview URL and demo anchor preserved, warm accent set. Five existing navbar/Solution tests PASS.
- SSR/AST: conditional UI and local hover/focus/225ms/reduced/cover rules PASS. CSS declaration checks do not prove rendered hover. Protected-file diff confirms hook/shared Button/assets/all other sections/styles/global layout/dependencies untouched.
- Requested Desktop/Mobile widths checked by engine geometry and CSS reasoning, including1200 minimum. Browser visual/crop/hover/focus/overflow still Eze's gate; no screenshots or browser PASS fabricated. Previous08K/content blockers remain.

Commit subject: `feat: refine single-project presentation and CTA accent`; resolve SHA with `git log -1 --format=%H --grep='^feat: refine single-project presentation and CTA accent$'`, exact SHA in final report. **READY FOR EZE VISUAL QA**, no Production FINAL.
