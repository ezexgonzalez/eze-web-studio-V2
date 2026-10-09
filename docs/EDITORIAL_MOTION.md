# Block 08O — Fixed glass navbar and editorial motion

**READY FOR EZE VISUAL QA**

8 October 2026. Branch `feature/ews-v2-production`; clean synchronized baseline `c89b335ddc6e7a7ea73547aed8ab139f707fae3c`. Eze explicitly authorizes fixed navigation and finite content motion, superseding older non-fixed/no-reveal restrictions. Final geometry, typography, approved copy/data and Hero Motion remain protected.

## Navigation

The existing header is fixed at the same origin, without adding a spacer or changing the Hero. It stays transparent initially. A 1px, absolutely positioned sentinel at page y8 controls `data-scrolled` via IntersectionObserver. Beyond that threshold the full-width pseudo-background fades in over300ms: #050708 at82%, blur16px, subtle1px lower border. Unsupported backdrop-filter gets an opaque #050708 background. No floating container, height change or new padding.

`createFixedHeader` reads the header's real bounding height and writes `--header-offset` only when it changes, using ResizeObserver. CSS initial fallbacks are68px Desktop /92px Mobile and Tablet. Existing root scroll-padding applies it exactly once; section scroll-margin remains0. Missing observers use cleaned-up resize/passive-scroll listeners; the scroll fallback changes only a boolean DOM attribute at threshold crossings, not React state every frame. Cleanup restores the earlier inline offset. StrictMode/stale callbacks are guarded.

Header z-index40 stays below the skip link100. The native dialog stays in the browser top layer; menu open/close/Escape/background isolation/focus return/Desktop auto-close code is unchanged. Header geometry/menu targets/CTA sizes are unchanged. Anchor data remains unchanged.

## Finite editorial motion

CSS + IntersectionObserver + native Web Animations are sufficient here. Existing Motion14 remains installed and owned by the protected Hero; content does not pull another Motion entry into the initial bundle. No new dependencies, global Motion provider, renderer, RAF loop or page registry.

App attaches one observer controller to main. Only explicit `data-reveal` content targets are selected; Hero, Projects, FAQ list and Footer do not participate. Nothing receives a hidden CSS class, inline opacity0 or offscreen initial layout. Entry animates opacity .4→1 and individual `translate`16px→0 for550ms with cubic-bezier(.22,1,.36,1). The default content remains visible if JS/observation/animation fails. Native fill:none leaves no final inline transform or opacity. The independent translate property also avoids fighting card hover transforms.

Each target is unobserved after its first entry (threshold .12, bottom root margin -32px). Four Problem cards stagger0/70/140/210ms; result independently reveals. Solution features stagger0/60/120ms as they enter, and their cyan accent has a finite .65→1 scale-X/opacity reveal delayed80ms. About and Contact columns use0/90ms. No letter-level motion, permanently moving accents/dividers, parallax or global reveal.

Preference changes, hidden documents, unmount and keyboard focus cancel active enhancement animations to the fully visible baseline. A seen target never replays on later visibility/preference changes. Cleanup disconnects observation/listeners; late callbacks after disposal cannot restart it. No reveal starts while reduced motion or document.hidden is active.

## Interaction by section

- Problem: Desktop fine-hover only, -4px card lift, border cyan30%, subtle black shadow,450ms return. Cards remain informational, with no added tabindex, role or pointer cursor. Reduced motion removes the lift/transition.
- Solution: finite entry/accent only; final stair-step and type80/86 unchanged.
- Projects: no reveals, changes to data, carousel geometry/state, placeholders, disabled controls or CTA. Only real `.project-preview` images can gain brightness1.06 on hover; there are currently none, so the empty master remains inert.
- About: two-column entry, no continuous divider animation; shared Desktop grid unchanged.
- FAQ: native buttons and React openId remain authoritative. CSS grid0fr↔1fr animates the panel's natural content height for450ms; opacity400ms and margin450ms. A min-height0 inner wrapper permits real collapse without a fixed pixel height. Closed panels immediately get aria-hidden and inert; visibility becomes hidden after closing. Reduced motion resets transitions/delays, so state changes are immediate. Icon rotation changes only for enabled questions; hover/focus color is limited to enabled buttons. Null answers still have disabled controls and no panel/aria-controls. No invented content.
- Contact: two-column entry; real anchors get color/underline feedback. Disabled HABLEMOS has no hover/click affordance; pending Instagram stays text.
- Footer: color hover/focus only on real nav/back-to-top links, no reveal/decorative motion. Layout/type/height/full-width rule unchanged.

Hover styling is scoped to hover-capable fine pointers. Focus-visible outlines remain owned by the existing base styles, with added color feedback where useful. All nonessential CSS transitions are disabled under prefers-reduced-motion. FAQ expansion intentionally changes natural flow after user input; entry animations do not change measured layout or allocate new space.

## Technical verification

- `npm run check` baseline/final lint/build and `git diff --check`: PASS.
- `node --test tests/siteMotion.test.mjs`: six tests PASS. Entry once/stagger/accent, reduced-motion live cancellation, document visibility/focus/unmount, API failure fallback, measured header resize/threshold/cleanup, scroll/resize fallback and earlier-offset restoration. These use controlled DOM/observer APIs, not a rendered browser.
- React SSR: unique IDs/anchors, approved content,4cards/3features/5FAQ rows with first open, static Hero fallback PASS. Added check verifies12 reveal targets, none in Hero/Projects/Footer, disabled/null data and closed fixture panel aria-hidden/inert. No injected fixture enters production data.
- CSS AST comparison: existing width/height/min/max/padding/margins/gaps/columns/type/offset declarations unchanged in all five edited stylesheets. Header position/z-index/anchor offset and FAQ disclosure are the explicitly authorized behavior changes.
- Build impact: initial JS238.20→241.25kB (gzip72.39→73.39); CSS66.77→70.99kB (gzip13.33→14.01). Hero lazy chunk remains135.80kB in size. No new dependency or renderer. These are bundle measurements, not runtime/GPU benchmarks.
- Protected-file diff: Hero effects/components/hooks/assets/settings, carousel component/hook/data, all data/assets, tokens/type/primitives, index.css and package/lock unchanged. Mobile/Tablet resting composition unchanged; navigation is intentionally fixed there too.
- Checkpoint reasoning:1366×768,1440×900,1536×864,1920×945 use current Desktop geometry and68px fallback offset;390×844 retains current Mobile composition and92px fallback. Actual runtime height wins on resize.

No browser visual PASS, actual hover/FAQ/anchor/pointer rendering, screenshots or GPU benchmark asserted. The known local Chromium executable limitation remains; Eze performs final browser QA. Existing08K Hero runtime gate/content blockers stay open. No Production FINAL declaration.

## Eze review

Verify transparent top/restored-scroll glass, constant header height, full-page visibility, blur fallback, all anchors and skip link, Mobile modal lifecycle, one-time reveals/stagger and hover restraint, FAQ open/close with keyboard and pending rows, shared editorial axes after animations, reduced-motion live switching, and unchanged Hero held/plume behavior at the five viewports.

## Commit

One commit `feat: add fixed glass navigation and editorial motion`; exact SHA in final report, resolvable with `git log -1 --format=%H --grep='^feat: add fixed glass navigation and editorial motion$'`.
