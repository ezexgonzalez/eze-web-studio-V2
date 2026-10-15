# Mobile viewport framing

**IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**

## PROBLEM

Fixed master minima (Hero844, About753, FAQ936, Contact754) and content-only sections could finish before a taller phone viewport. Manual QA Hallazgo07 records the next section peeking while the current scene is still the focus.

Sources unchanged: 03 — Mobile FINAL/FROZEN; Desktop02B remains authoritative. This is production vertical responsiveness, not a redesign or motion pass.

## STRATEGY

`src/styles/primitives.css` owns one shared contract below768px (`max-width:47.999rem`). `--mobile-scene-height` defaults to100svh, upgraded to100dvh under `@supports (height:100dvh)` so browser chrome changes update the visible scene declaratively. Requires modern svh support; dvh falls back to svh where unavailable.

Use min-block-size on section roots only. No extra wrapper minimum, fixed height, JS viewport listeners, page snapping, scale, dependencies or new content clipping. Section backgrounds fill the root and normal flow may exceed its minimum. Taller screens add breathing room below the existing content rather than stretching components.

## SECTION CONTRACT

| Root | Contract |
| --- | --- |
| .hero | Viewport minimum; flexible whitespace on short screens. |
| .problem-section | Viewport minimum; vertical sequence/result untouched, naturally grows. |
| .solution-section | Viewport minimum; offsets0/+8/+16 and CONFIANZA56/60 untouched. |
| .projects-section | Viewport minimum; slot310, gap16, peek, controls, information and disabled01/01 state unchanged. |
| .about-section | Viewport minimum replaces753px wrapper floor; padding88/96 and Alternate background unchanged. |
| .faq-section | Viewport minimum replaces936px wrapper floor; row/answer sizing and accordion unchanged. If natural content exceeds the viewport it remains taller. |
| .contact-section | Viewport minimum replaces754px wrapper floor; editorial spacing/details unchanged. |
| Footer exception | No viewport minimum added. Existing content/padding/master floor470 retained, without any change to Footer rules or Desktop384 logic. |

Removed obsolete Mobile fixed minima instead of adding conflicting overrides. Tablet/Desktop explicitly define their existing heights/minima and remain unchanged.

## HERO ADAPTATION

Removed844px root minimum. At390×844 retain top154, CTA margin81 and bottom160. Below844px reduce only whitespace: top clamps112–154, CTA margin32–81, bottom144–160. Font sizes, 24px gutters, buttons60px, stack gap16 and description margin19 unchanged. Existing narrower-width typography exception unchanged.

Above844px these paddings stay at their master values; section minimum provides extra lower breathing room. Horizon already uses bottom:0 and original proportional width/crop, so it follows the expanded section bottom. No asset or horizon CSS changed, no vertical SVG distortion. When content needs extra height the horizon follows the actual section bottom rather than overlaying a fixed844px boundary.

## VIEWPORT TARGETS

Analytical values assuming the CSS dynamic viewport height equals the target height; not measured browser bounds.

| Viewport | Section minimum | Hero top / CTA margin / bottom px | Horizon height px |
| --- | ---: | --- | ---: |
| 360×800 | 800 | 132 /59 /144 | 118.15 |
| 390×844 | 844 | 154 /81 /160 | 128 |
| 393×873 | 873 | 154 /81 /160 | 128.98 |
| 430×932 | 932 | 154 /81 /160 | 141.13 |

Actual root height is at least the viewport and may grow with wrapping/text size. At each section start the next section is outside that viewport by the minimum-size contract. Eze must verify actual fonts/wraps, horizon, browser chrome expansion/collapse and section starts on these devices; if content exceeds a viewport, scrolling within that section is expected.

## ACCESSIBILITY

Minimum rather than fixed height permits text resizing/zoom and natural content growth. No maximum height or new overflow:hidden on content. DOM, heading/reader order, anchors/offset0, menu/focus/Escape/scroll lock, accordion, carousel keyboard/swipe, reduced-motion and glow lifecycle unchanged. No JS/data/component/assets edits.

## VALIDATION

- Synced clean baseline8f0184826ba11259d936d18692421f8e169e67a2; npm run check baseline/final PASS (lint/build).
- git diff --check PASS.
- Isolated PostCSS AST verification: seven exact roots inside Mobile query; svh/dvh support gate; all Tablet/Desktop min-width media blocks unchanged; Footer and horizon rules identical to baseline.
- No changes to App/components/hooks/data/assets/index.css/typography/package/lockfile or Problem/Solution/Projects CSS. No new dependency or listener.
- Viewport/spacing arithmetic checked at all four targets. Content remains normal flow. No physical browser, console, zoom or visual PASS claimed; manual QA belongs to Eze. No fabricated screenshots.

## COMMIT / NEXT

One implementation commit: `fix: frame mobile sections to the visible viewport`. Resolve SHA with `git log -1 --format=%H --grep='^fix: frame mobile sections to the visible viewport$'`; actual SHA delivered in final report. This identifies the containing commit without a self-referential hash or extra documentation commit.

Next: Eze visual QA. No Desktop polish, redesign or Block08 Motion initiated. Existing pending project/FAQ/contact content remains unchanged.
