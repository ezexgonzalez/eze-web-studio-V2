# Block 08L — Desktop Fit implementation

**DESKTOP FIT IMPLEMENTED / READY FOR EZE VISUAL QA**

8 October 2026. Branch `feature/ews-v2-production`; clean synchronized baseline `4585816` (`fix: use explicit JSX import for Hero arc controller`). No new dependencies, copy, assets, components or behavior.

## Source of truth

Figma `aw1k9uSQJhmNGeODZY7BC3`, page `02C — Desktop Fit` (`266:94`), master `266:95` **1440×5256**, compact reference `268:66` **1366×5124**. Metadata, full design context and reference renders inspected. Section contexts: Hero `266:96`, Problem `266:124`, Solution `266:147`, About `266:210`, FAQ `266:218`, Contact `266:234`, Footer `266:254`. No Figma edits.

02C supersedes 02B geometry only for these modified Desktop sections. Projects `266:178` is FROZEN: existing runtime components, CSS, data and behavior remain untouched, including its original responsive container. 03 — Mobile remains FINAL/FROZEN; Transition 768–1199 remains unchanged. Interaction/semantic contracts and approved repo copy take precedence over accidental text variants in Figma. Hero Motion is protected; this block does not close the earlier 08K runtime verification gate.

## Section geometry / 02B → 02C

Positions below are source measurements and CSS flow arithmetic, **not measured browser bounds**. Content may grow with wrapping/zoom; no page heights are hard-coded.

| Section | Superseded 02B | 02C implementation at 1440×900 |
| --- | --- | --- |
| Hero | Nav176×54, actions226/214×60; CTA gap to copy48 at900 | Nav160×44; header x80/y24,44-high content. Hero actions210/196×52, horizontal gap24, total430; copy gap32, actions y590. Hero64/72, description20/30 and y330 content remain. |
| Problem | 900 scene; intro y80/gap24; cards y376/300high; banner y724/88high | Intro y64/gap16, natural224high; cards y320, four296×272/gap32. Ring56, icon40, number32; title y131, body y173 within card. Connectors y368. Banner y624/min80. Natural section768. |
| Solution | 900 scene; feature88/94; items y190/400/610, rows166/gaps44 | Fit feature80/86,600,-3% via existing utility with **locally scoped variables**, no global typography change. Items x112/456/940 at y174/356/538; rows min158/gap24. Rails48, accents and support24/32 unchanged. Natural section768. |
| Projects | Existing scenic runtime | Unchanged. One real record01/01; disabled controls/CTA; null preview/URL intact. |
| About | Viewport minimum; header y308, copy y346 | Header x112/y96; copy x808/y134; divider x744/y134/250high. Grid widths560/528/gap136. Padding96/136 yields natural512 with current text. Approved “en cada proyecto” preserved. |
| FAQ | Viewport minimum; header y240/list y214; open160/closed84 | Header x80/y106; list x704/y80,656wide. Row content open148/closed76 plus 1px dividers. Existing44px buttons retained: padding16 places the28px text at the source's24px offset. Open answer gap6 to44px button reproduces source14px after28px text. List458 + top80/bottom86 = natural624. No fixed row/answer height; wrapping/expansion grows flow. |
| Contact | Viewport minimum; left y264/right y286; divider384 | Left x80/y112/right x900/y134; divider x824/y98/352. Natural560 from content + padding112/122; CTA54/62, rule440×2 and real destinations unchanged. |
| Footer | Natural384; inset rule y48; main y96/meta y224 | Natural224: padding64/36, main44high, gap36, bottom44high. Visual brand/nav y64; copyright/back-to-top y144. Top2px divider at y0 spans footer/viewport via root pseudo-element **outside the limited container**. Inset `.footer-rule` hidden only on Desktop, so exactly one line paints. Mobile/Tablet original divider untouched. |

Problem cards use minimum272, not fixed height. If text wraps to more than three body lines, cards grow and result/banner move down. Solution rows use minimum158, not fixed height. About/FAQ/Contact/Footer have no Desktop viewport minima or fixed section heights. Hero and Projects retain their scenic viewport treatment. Section references total 5256 at canonical dimensions; actual page height follows content and viewport.

## Responsive strategy

Modified Desktop sections use local `min(100% - 64px, 1280px)` containers. This yields the exact compact43px margins at1366 without altering shared `--production-gutter` or Projects. At1200 widths narrow naturally; columns remain minmax(0,…) and content can grow. Solution's third offset is bounded by available width404 (64px notation +340px support) to avoid spill. No global zoom, transform scale or proportional type scaling introduced.

| Checkpoint | Container / margins | Vertical strategy |
| --- | --- | --- |
| 1366×768 |1280 /43|Compact 268:66 geometry; Hero content y270, modified content sections keep their flow dimensions. |
| 1440×900 |1280 /80|Canonical 02C measurements above. |
| 1536×864 |1280 /128|Same typography and natural content heights; Hero existing height-aware top remains. |
| 1920×945 |1280 /320|No UI enlargement; Hero existing top/crop strategy preserved. |
| 1920×1080 |1280 /320|Same natural sections; Hero existing spacious framing preserved. |

768–1199 and <768 CSS prefixes are byte-identical to baseline. Shared typography/tokens/primitives are untouched. Thus the local Fit feature80/86 cannot reach Mobile CONFIANZA56/60 or other sections. No forced four-column layout below1200. At1200 cards260wide and copy may grow; wider required checkpoints retain296.

## Protection / cleanup

Only changed `src/styles/{header-hero,problem-solution,about-faq,contact-footer}.css`, replacing their existing Desktop rules. Removed superseded height-aware 02B paddings/min100svh and old narrow-Desktop staircase/wrap exceptions; no appended override layer. Hero scene/body/star/filter-variant/motion rules are byte-identical, as are all effects/hooks/settings/assets. Residual-guide blur3px remains. Project files and all components/data/App unchanged; menu/anchors/FAQ/nullable destinations unchanged.

Existing local icon SVGs remain in their original callsites; nonempty/XML parse verified. Desktop icon geometry remains40 inside56 ring, TrendingDown44, FAQ20 inside44px control, Contact arrow56×48. No asset download/replacement or temporary Figma URL added. Approved ambience is retained at its existing source geometry/fills; no grid or new motion.

## Validation

- Clean baseline; `npm run check` baseline/final PASS (lint/build); `git diff --check` PASS.
- Protected-file comparisons PASS: effects, hooks, components, data/assets, Projects CSS, shared typography/primitives/tokens, dependencies.
- Mobile/Tablet CSS prefixes and Hero background/effect rules byte-identical PASS.
- Width arithmetic inspected at all five required checkpoints and1200: containers, four cards, editorial columns, staircase and footer navigation fit. This is **not browser overflow proof**.
- React SSR: unique IDs/anchors, four steps/three features, five FAQ rows/first open, approved About text, FITNESS content and static Hero fallback PASS. SSR does not prove pointer/accordion behavior or pixels.
- Production preview, entry JavaScript and CSS returned HTTP 200. No browser visual QA or Hero pointer reaction claimed; Eze performs final review. No synthesized/browser screenshots.
- CSS67.30→66.33kB (gzip13.46→13.25); initial JS238.20kB/gzip72.39 unchanged in size. No dependency delta.

Eze should review the five Desktop sizes, 1199/1200 transition, Mobile regression, actual text wraps/heights, expanded FAQ growth, full-width footer rule, no horizontal overflow, and Hero held/plume runtime. Existing content blockers (Projects2–3/URLs/previews, FAQ02–05, pending contact destinations) remain. No Production FINAL declaration.

## Commit

One commit `feat: implement 02C Desktop Fit geometry`. Resolve exact SHA with `git log -1 --format=%H --grep='^feat: implement 02C Desktop Fit geometry$'`; full SHA in delivery report. This subject avoids a self-referential hash and a second documentation-only commit.
