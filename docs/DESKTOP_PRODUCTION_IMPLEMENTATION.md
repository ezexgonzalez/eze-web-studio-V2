# Block 07 — Desktop Production implementation

**IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**

## SOURCE OF TRUTH

Figma `aw1k9uSQJhmNGeODZY7BC3`: `02B — Desktop Production` page `239:10`, canonical `Desktop Production Master — 1440` node `239:11`, 1440×6684. Metadata, design context and reference renders inspected for each section. Auxiliary design contexts inspected: Hero `251:66` (1366×768), Hero `251:101` (1920×1080), Solution `251:136` (1366×768).

`02 — Desktop` is historical creative reference only. `03 — Mobile` remains FINAL/FROZEN. `04 — Final Handoff` continues to govern existing interaction/accessibility intent. No Figma nodes modified.

## SUPERSEDED IMPLEMENTATION

Removed `src/styles/desktop-coherence.css` and its import, including generic centring, viewport-aware type scale and relative stage/card resizing. Replaced historical >=1200 blocks directly in each section stylesheet. The old Hero >=768 geometry is now confined to Transition; Desktop has one owned Production block. No new override stylesheet.

Retained correct base Mobile styles, Transition stacking, approved colours/surfaces, buttons/icons, glow lifecycle, semantic components and data. The prior removed grid and unified backgrounds stay removed/unified. Previous implementation `1f8ef0ab69823d2f3564bf2cbe4b2af2724b2698` is visually superseded.

## PRODUCTION TYPOGRAPHY

Fixed Desktop >=1200 runtime values; no width/height type enlargement:

| Role | Size / line-height px |
| --- | --- |
| Hero | 64 / 72 |
| Feature | 88 / 94 |
| Action | 54 / 62 |
| Heading XL | 56 / 64 |
| Heading L | 48 / 56 |
| Heading Editorial | 44 / 54 |
| Body LG | 20 / 30 |
| Feature Support | 24 / 32 |

Inter family/weights/tracking unchanged. Card 24/30, Body MD 18/28, FAQ Question 21/28, labels/nav/buttons/contact details retain approved roles. Footer meta explicitly uses 02B Body SM 16/24. Shared Tablet roles interpolate toward these Production endpoints; Mobile root values and CONFIANZA 56/60 remain unchanged.

## SECTION GEOMETRY

Coordinates below describe the canonical contract by CSS flow arithmetic, not measured browser bounds.

| Section / Figma | Implementation at 1440×900 |
| --- | --- |
| Hero `242:66` | Header x80/y24, 1280×54; centred nav. Copy x160/y330, width1120, headline144 high; description width880/y498; CTA y606, 226/214×60, gap24. |
| Problem `242:118` | Intro x160/y80 with 240px natural stack; cards x80/y376, columns296/gap32/min-height300; result x80/y724, min-height88. Icon64, badge36, title y147 and description y193 within cards. |
| Solution `242:172` | Intro y64; features x112/456/940 at y190/400/610, normal-flow rows166 and gaps44. Keyword offset64, support gap8, rail48; number y14/rail y54/accent y118 relative to each item. |
| Projects `242:196` | Header x80/y64; divider x600/y108, intro x632/y108. Active x450/y232, 540×365; previous x230/y280, 220×310; next x990/y256, 190×342; queue x1180/y288, 150×302. Controls x340/y620, 760×44. Info x370/y680, width700; CTA y800. All active elements centred at x720. |
| About `242:238` | Editorial heading x112/y308, width560; copy x808/y346, width528; divider x744/y346, height250. Copy gap32. Only Alternate background. |
| FAQ `242:252` | Header x80/y240, width540. List x704/y214, width656; first open row160, four closed84 and six 1px rules =502. Buttons retain44px targets; inner text matches row offsets. |
| Contact `242:287` | Left x80/y264, width680; right x900/y286, width440; divider x824/y250, height384. HABLEMOS 54/62 with arrow56×48/gap16; rule y372, 440×2; email label y422/value y458, Instagram y522/y558. |
| Footer `242:309` | Rule x80/y48, 1280×2; brand/nav y96; meta y224. Height derives from flow + padding (384 normally), without viewport minimum or clipping. Accessible targets stay44px. |

Seven main scenes use min-height100svh. Children stay in flow; no fixed page heights, page snap or meaningful-content clipping. Future copy/text zoom can grow sections. Decorative scene/backdrop/preview clipping is scoped to those layers.

## ASSETS / AMBIENCE

Existing icons and Mobile/Transition assets reused unchanged. Old Hero SVGs contain historical frame crop, so they cannot reproduce the new full ellipse at other widths by position alone. Added six **unchanged read-only Figma SVG exports**:

- `production-{glow,body,rim}.svg`: nodes `242:67/68/69`, intrinsic1560×1380.
- `production-wide-{glow,body,rim}.svg`: nodes `251:102/103/104`, intrinsic2040×1700.

HTTP MCP asset URLs returned HTML; exported through Plugin API `SVG_STRING`, contentsOnly/useAbsoluteBounds, with no node mutation. SVG roots parsed/verified; trailing blank lines normalized for git diff --check, no path/gradient edits. `<picture>` selects Production >=1200 and wide >=1760; fallback src retains old Transition SVG. Images use natural selected SVG dimensions; wrapper positions and scene clipping adapt crop. Existing motion queries still target the one glow img.

Stars reuse existing exact local SVGs; Desktop positions follow 02B, Transition uses original positions. Problem/Solution ambient CSS ellipses retain approved fills/opacities/blur and replace geometry from 02B. Projects' obsolete Desktop glow import was removed; approved ellipse800×540/x320/y180 is rendered as a static CSS layer with Figma fill10% and blur90px (Figma blur radius180). Mobile glow intact. No decorative grid, new animation or renderer.

## RESPONSIVE STRATEGY

| Checkpoint | Contract |
| --- | --- |
| 1366×768 | Container1270, gutters48; Hero content y270/CTA gap32 and horizon y128 per auxiliary. Solution first y170, next350, last530 per auxiliary. Reduce air first; Projects previews adapt native heights while keeping dominant width540 and asymmetric silhouettes. |
| 1440×900 | Canonical container1280/margins80 and exact fixed Production typography. Canonical flow positions above. |
| 1536×864 | Container1280/margins128; same type/widths, moderate reduction of whitespace and local preview heights. No UI scale. |
| 1920×1080 | Container1280/margins320; Hero content y400, wide horizon geometry per auxiliary, same64/72 type. More air; other content widths remain fixed. |

At narrow Desktop1200–1365, decorative Projects flank crop prevents horizontal spill; header columns adapt before collision. Solution's last item is constrained to its available404px width. Checked CSS width arithmetic at1200/1280/1366/1440/1536/1920; Contact right column remains at least370px for CTA370px.

Vertical contract calculated: Problem/Solution/Projects reduce spacing to fit normal768/864 checkpoints with current text assumptions, while canonical900 retains master values. This is **analytical validation**, not a claim of browser layout accuracy.

## PROJECT DATA EXCEPTION

02B shows intended final01/03. Runtime keeps actual01/01, one FITNESS record, null URL/preview, previous/next/VER PROYECTO disabled. Visual empty slots remain aria-hidden. No projects, URLs or previews fabricated. Architecture/hook unchanged and ready for real records.

## MOBILE PROTECTION

Mobile CSS prefixes for Problem/Solution/Projects/About/FAQ/Contact/Footer unchanged (only unused Desktop glow selector removed). Mobile typography roots unchanged. Hero Mobile assets/geometry unchanged; star CSS variables preserve exact original Transition positions. Navbar/menu/dialog, anchors, skip link, reduced-motion and hooks unchanged. Tablet stacking768–1199 stays; shared type now converges to Production rather than historical maximum. Boundaries767/768 and1199/1200 inspected by code, no new Tablet design.

## CSS CLEANUP

Deleted rejected override layer and import, replaced historical Desktop tails including old96rem wrap rules, removed Desktop svh typography clamps, removed historical621×420/340px card geometry, removed unused Projects Desktop glow import/markup/selector. No Grid token consumer in active CSS. `primitives.css` owns only Production gutter; section geometry lives in section styles. No global scale/zoom/page snapping or new dependencies.

## ACCESSIBILITY / INTERACTION

App/data/hooks/Navbar/FAQ/Contact logic unchanged. Semantic order, headings, unique IDs, disabled/null guards and targets preserved. Carousel state/keyboard/swipe logic, accordion first-open/null behavior and glow visibility/reduced-motion cleanup unchanged. No new JS behaviour. Existing keyboard/focus styles remain; content may grow beyond its target scene.

## VALIDATION

- Baseline clean on synced `feature/ews-v2-production`, base `61b4a84d13dc655b9e0a3657aa1775aff6e858f4`.
- Baseline/final npm run check PASS (lint/build); git diff --check PASS.
- Production preview HTTP200; entry JS/CSS HTTP200.
- Actual React SSR: seven sections + footer, unique IDs, grids absent, 10 stars/four steps/three features, one project article/three disabled controls/01-01, FAQ one open/four disabled, real mailto/pending destinations. SSR is not browser QA.
- All SVG assets parse and are non-empty; source imports build. Protected data/hooks/App/Navbar/FAQ/Contact/package/lockfile unchanged.
- Mobile/Transition prefix comparisons PASS; container/column/staircase/carousel width maths checked including1200. No obvious horizontal collisions by CSS arithmetic.
- Bundle baseline → implementation: JS235.66 →241.88kB (gzip70.22 →70.99), CSS70.65 →67.57kB (gzip14.08 →13.43), Inter352.24kB unchanged. Added SVG exports are included in JS; no new runtime/dependency.

## REVIEW / KNOWN EXCEPTIONS

Eze owns final browser/visual QA against02B, including actual crop/glow, fonts/wraps, overflow, zoom, physical keyboard/swipe, console and continuity. No fabricated screenshots or browser PASS. Existing About approved runtime “en cada proyecto” is preserved despite Figma's historical “sobre”; copy was not changed. Pending Projects2–3/URLs/previews, FAQ02–05 and Contact destinations remain. No Block08.

## COMMIT

Single implementation commit: `feat: implement 02B Desktop Production` (the commit adding this document and updating CURRENT_STATE). Resolve its SHA with `git log -1 --format=%H --grep='^feat: implement 02B Desktop Production$'`. This immutable subject reference avoids a self-referential hash or a second documentation commit; the actual SHA is delivered in the final report.
