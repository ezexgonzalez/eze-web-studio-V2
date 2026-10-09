# Block 08P — Navbar alignment and specific editorial interaction

**READY FOR EZE VISUAL QA** — 8 October 2026.

Baseline: `01192c6e17832e13d6451279e7093cf2650c918b`, branch `feature/ews-v2-production`. Eze rejected08O's generic entrance effect and Desktop header alignment. This document supersedes that motion contract; no design/typography/copy/section geometry changes are authorized.

## Navbar

Desktop >=1200: existing68px header uses a symmetric Grid `minmax(0,1fr) auto minmax(0,1fr)`, vertical padding0 and align-items:center. Brand starts the left track; nav is in normal flow in the middle;160×44 CTA ends the right track. Removed absolute nav top24 and header padding-top24. All44px controls resolve to y12–56, center34, with nav center at viewport width/2. These coordinates are CSS calculations, not browser measurements.

Fixed position, full-width glass82%/blur16/300ms, subtle border, opaque fallback, threshold8 sentinel and measured scroll-padding offset are unchanged. Existing createFixedHeader remains the sole glass/offset controller; no React scroll state. Mobile/Tablet header92 and native modal behavior/styles are unchanged. Skip link/focus layering preserved.

## Generic reveal removed

Removed App's main observer hook/ref, createEditorialMotion, useEditorialMotion, every data-reveal/delay/accent attribute and obsolete reveal tests. No replacement global entrance system. Problem cards/result and About/Contact columns are always fully visible. Existing Problem Desktop fine-pointer hover (-4px, subtle cyan border/shadow) remains. FAQ hover/disclosure/icon animation and Footer hover/focus remain unchanged; Projects stays frozen.

## Solution reading highlight

Solution alone owns useSolutionHighlight/createSolutionHighlight. IntersectionObserver gates work to when its section is onscreen. A passive scroll listener schedules at most one requestAnimationFrame per scroll burst; no self-scheduling loop. On scroll/resize/return from hidden, it reads the three h3 centers and selects the closest to viewport45% within a20–70% reading band. Exactly one feature has data-reading-active; none if no word is in the band or the section leaves the viewport. All other words keep primary white #F5F7F7. Active word and accent use #8DEEFF;500ms color/accent-shadow transition, small10px/40% accent glow only. No translation, opacity, scale or letter animation.

IO/RAF unavailable or JS failure leaves white visible content. Cleanup disconnects observer, cancels scheduled frame, removes listeners/attributes and ignores late callbacks. Hidden documents do not schedule work. Reduced motion removes transitions; reading color still conveys instantaneous focus without decorative motion. No live announcement or interactive semantics added to informational headings.

## Contact

HABLEMOS is now a real anchor: `externalCtaUrl || emailHref`. Current destination is approved `mailto:hola@ezewebstudio.com`, with no new-tab attributes. A future approved external URL retains existing target=_blank/rel=noopener noreferrer behavior; data remains null until approval. Instagram URL and all other pending content stay pending.

CTA color transitions300ms toward cyan. Desktop fine-hover or keyboard focus shifts only the arrow6px and adds cyan55% to the existing rule over300ms. Typography, widths, proportions and layout remain unchanged. Reduced motion removes transitions and arrow displacement, preserving color/focus feedback. Existing focus-visible outline remains intact. Opening the local email client depends on the user's configured mail handler; no actual client launch claimed.

## Validation

- Baseline and final npm run check: lint/build PASS; git diff --check PASS.
- Five Node tests: exclusive nearest selection, scroll deduplication, resize/visibility/offscreen lifecycle, queued callback/unmount cleanup, white fallback, measured navbar/glass/observer and listener fallbacks PASS. Controlled APIs, not rendered browser.
- React SSR: no reveal attributes, unique anchors/IDs, approved content, FAQ first open/null disabled/inert closed fixture, static Hero fallback, real mailto CTA and isolated future URL fixture PASS.
- Protected diff: Hero effects/settings/components/hooks/assets, Navbar JSX/menu, FAQ JSX/CSS, Projects CSS/component/hook/data, all data/assets, global typography/tokens/primitives/index.css and dependencies unchanged.
- CSS checks: Mobile/Tablet header prefix and all Hero scene/effect CSS unchanged. Desktop center math checked1366×768/1440×900/1536×864/1920×945; Mobile390×844 retains current layout. Section resting dimensions/type/padding/offsets are unchanged.

Final visual/browser QA, actual getBoundingClientRect centers, scrolling highlight perception, hover/focus, configured mail client, anchors/modal/reduced-motion/overflow and existing Hero runtime proof remain Eze's gate. Known Chromium limitation: no fabricated browser PASS/screenshots. No Production FINAL declaration.

## Commit / review

Single commit `fix: align navbar and replace generic reveals`; exact SHA in final report, resolve with `git log -1 --format=%H --grep='^fix: align navbar and replace generic reveals$'`.

Eze reviews the five requested viewports.08K's Hero runtime proof remains pending; this pass does not alter or certify halo/plume rendering.
