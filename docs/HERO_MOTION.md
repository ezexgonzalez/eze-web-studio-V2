# Hero Motion — Block 08H / Production Integration

**HERO MOTION — PRODUCTION INTEGRATED / READY FOR EZE VISUAL QA**

6 de octubre de2026. Eze aprobó el resultado08G y autorizó integrar su export. Esta sección gobierna producción; el historial08E–08G más abajo describe estados anteriores y no implica que producción siga en08D.

## Valores aprobados / fuente única

`src/components/effects/heroMotionSettings.js` contiene exactamente el export de Dirección:

```json
{
  "particles": { "count": 1, "speed": 0.1, "opacity": 0.575, "size": 1.5, "distance": 200, "strength": 2.4 },
  "arc": { "mist": 0, "halo": 0, "core": 0, "noiseSpeed": 1, "radius": 110, "pointerStrength": 620, "recovery": 1 },
  "haloQuality": { "coreWidth": 11, "coreBlur": 5.5, "coreOpacity": 0.625, "haloWidth": 20, "haloBlur": 8.5, "haloOpacity": 0.475, "mistWidth": 50, "mistBlur": 20.5, "mistOpacity": 0.24 },
  "plume": { "enabled": true, "speedThreshold": 1, "lifetime": 1600, "travel": 110, "blobCount": 8, "baseRadius": 30, "spread": 24, "drag": 1, "opacity": 0.075, "mistCut": 0.7, "haloCut": 0.12, "turbulence": 8, "cooldown": 100 }
}
```

HeroLightArc pinta esta calidad sin esperar import/JS effects: los tres filtros estáticos/vivos comparten width/blur/opacity, incluidas las variantes Mobile/Tablet/Production/Wide. Sin cambio de paths, crop, viewBox ni framing. Particle options conservan exactamente el mapping/rangos nativos usados por el Lab aprobado (speed/opacity/size son centros de rango); un solo registro de partículas, sin tuning adicional.

## Integración y cleanup

- Un solo controlador `arcDisplacement.js`, extraído del Lab y reemplazando el antiguo controlador08D. Held radius110/strength620/recovery1, idle scales0; no se restauraron los loops de idle displacement.
- `volumetricWake.js` y `pointerVelocity.js` ahora son compartidos por producción/Lab. Pool3×8, sin path clones, sin nodos por pointermove ni clock propio. El plume usa exactamente threshold1/lifetime1600/travel110/baseRadius30/drag1/opacity0.075; resto del modelo08G sin tuning. Mist cut y halo cut alargados/fijos, core sin atenuación. Held existente conserva su respuesta local del core.
- ArcDisplacement usa el probe real de feDisplacementMap, no el constructor ausente que bloqueaba08D. Motion se monta solo con preferencias activas e interacción fine-hover Desktop. Unsupported/error deja halo estático; fallo de partículas no detiene arco.
- `ParticleField.jsx` comparte flujo oficial ParticlesProvider + Particles/init una vez. Retirados engine.load manual, custom hosts/queue y renderer de partículas duplicado. Lab conserva diagnóstico en LabParticles, fuera del controlador común. Producción no tiene polling/telemetría/panel/sliders/export.
- `particleOptions.js` comparte mapping aprobado; el contenedor pasa a opacity1, igual al Lab probado, sin el multiplicador08D0.55/0.4. Count1 y speed0.1 preservados.
- DEV Lab permanece con `npm run dev` + `?heroLab=1`, usa la misma lógica y valores de partida. Imports/UI/CSS de Lab excluidos del build de producción. No dependencia ni asset nuevo.

## Guía residual — diagnóstico y corrección

No se encontró un rim exportado extra, stroke de body ni path de highlight duplicado en el DOM activo. Sí hay un borde alpha duro de las superficies SVG body: el relleno se corta en una ellipse/path binario justamente debajo del arco, con color distinto del fondo. Se conserva su geometría/gradiente/posición/asset y se featheriza únicamente el alpha del body mediante blur3px en el img; no se bajó coreOpacity ni se cambió la calidad elegida, no hay overlay para esconder un stroke.

Diagnóstico aislado sobre geometría alpha de production-body parseada del SVG: en x200/400/1160/1360 el salto máximo154–186 pasa a24–29 con feather3px. Es una prueba de borde geométrico, no render browser. El renderer SVG externo no estaba disponible; no se usó como evidencia browser. Eze debe confirmar visualmente que esa transición ya no se percibe como guía y que no queda otra contribución visible del core. No se declara aceptación visual del fix antes de su QA.

## Reduced motion / lifecycle / fallback

useHeroMotionPreferences sigue siendo único dueño de reduced, visibilidad y breakpoints. Reduced/hidden/offscreen desmonta HeroAtmosphere: wrapper destruye canvas, controlador cancela Motion/springs/observers/listeners, elimina pool y restaura filtros/máscaras. No held/plume/loops continuos en reduced motion. Halo completo de calidad aprobada permanece renderizado estáticamente, con body featherizado y stars. Mobile/Tablet sin fine Desktop hover no monta el controlador interactivo; no captura touch ni cambia framing. Import/setup/canvas failures preservan contenido, CTA y fondo estático.

## Validación técnica / límites

npm run check baseline/final PASS; git diff --check PASS. Motion real + DOM simulado: export exacto, held displacement y recuperación, idle0, fast plume, cleanup durante wake/restauración y ausencia de writes después del unmount PASS. Pool/XY/cooldown/divergencia/drag/fade y core intacto PASS. Opciones de partículas comparadas contra función08G desde git: idénticas. SSR estático completo con calidad aprobada y IDs de filtros únicos en cuatro crops, sin canvas/debug UI PASS. Vite DEV transforma Lab/shared modules PASS. Build contiene cero query/UI/telemetría Lab. CSS assert: reglas de layout/framing idénticas, cambios limitados a feather body y multiplicador de partículas. Datos, Navbar, App, copy/type, assets y otras secciones sin cambios.

Bundle antes/después: inicial237.59→238.02kB (gzip72.06→72.29); lazy HeroAtmosphere130.89→135.81kB (gzip41.02→43.31); CSS67.24→67.26kB (gzip13.45→13.45). No nueva dependencia; no FPS/GPU/console/browser QA medidos. Eze valida en producción/preview: held, recovery, dirección/fade de plume, guía residual, reduced y cuatro Desktop checkpoints. El estado entregado es integrado, listo para QA; no FINAL/FROZEN ni autorización Block09.

## Commit

Único commit `feat: integrate approved Hero light motion into production`; SHA mediante `git log -1 --format=%H --grep='^feat: integrate approved Hero light motion into production$'`. SHA exacto en reporte final.

---

# Historial — Block 08E / Runtime Lab

**HERO MOTION LAB — READY FOR EZE INTERACTIVE TUNING**

08D is rejected. Its technical PASS did not prove visible motion in Eze's browser. No final tuning was integrated in08E. The normal08D production configuration and static appearance remain unchanged while a temporary diagnostic system proves runtime behavior.

## Open the Lab locally

```sh
npm run dev
```

Open `http://localhost:5173/?heroLab=1` (use the port printed by Vite). This is **DEV ONLY**: `npm run preview`, production builds and deployed URLs do not activate the Lab even with the query. Remove the query/reload to return to the normal Hero. No persistent localStorage settings or automatic production changes.

The guarded lazy import in HeroBackground replaces normal atmosphere only in Lab mode. A fixed panel is portaled to document.body, outside the decoration's aria-hidden/clipping layer. Navbar, Hero composition/type/copy/buttons, four guide paths, body assets, Mobile production and other sections are untouched. Production controllers/configuration/dependencies/CSS remain byte-for-byte unchanged. Lab CSS/components/presets are absent from production bundle imports.

## Runtime status / failures

Panel: PARTICLES (LOADING/RUNNING/FAILED), ARC (LOADING/RUNNING/FAILED), POINTER (ACTIVE/INACTIVE near the arc), REDUCED MOTION (ON/OFF), viewport width×height. PAUSED is additionally explicit for reduced motion, hidden documents or an offscreen Hero; there is no fabricated RUNNING while effects are blocked.

Shows actual canvas dimensions, DPR, native count and max particle position travel over0.5s; shows actual arc scale/noise attributes. Empty canvas/count,8s load timeout or3s stalled positions/filter attributes become visible errors. This telemetry is runtime evidence, **not visual acceptance**.

Provider init errors, official-wrapper rejected promises, React boundaries, arc setup/support/CTM failures and global runtime errors include stack/message in the panel. No preventDefault suppresses console errors. Unknown runtime errors stop both Lab layers and are displayed. Static background remains as a safety layer, but its presence never conceals a Lab error.

The production constructor gate is displayed separately; Lab tests actual feDisplacementMap DOM support rather than assuming an absent constructor proves unsupported filters. If initialization fails, use Reset proof/retry; if engine init failed, reload the Lab to clear the official provider's initialization state.

## Particles proof

One supported official4.4 React flow: stable init callback + `ParticlesProvider` + `<Particles />`, as required by the installed official wrapper source. No manual tsParticles.load, custom hosts or second renderer in the Lab. Production's rejected adapter is deliberately untouched outside Lab and never mounts simultaneously.

Proof:60 particles, speed2.5–4, opacity.35–.8, size3–7, cyan palette unchanged, native repulse200px/strength4,60FPS/DPR1. Diagnostic native circles remove sprite loading/softness/depth attenuation as possible blockers; this is intentionally conspicuous proof, not a particle aesthetic redesign. No click/touch capture. Fine-hover Desktop enables repulse; capability state is visible.

## Arc proof

Lab-only controller operates on the same exact guide paths, three existing blur/displacement filters and original colors/bands. Idle scales:mist200–260, halo100–160, core40–70. Noise evolves5× faster; transport is broader. Local radius350 SVG units, strength500 (halo.65/core.3 of that), radial mask resized accordingly, critically damped spring recovery about.8s. Filter padding512 is temporary and restored on cleanup; no geometry/crop offsets change. Mobile variant has lighter base bands and no pointer pipeline, as before; production Mobile is untouched.

## Controls / Eze-owned gate

Particle ranges:count, speed, opacity, size, repulse distance/strength. Arc ranges:mist/halo/core displacement, noise speed, pointer radius/strength, recovery. They affect only the Lab. Particle options use the official component lifecycle; arc setting changes restore/restart only the Lab controller. Reduced motion always stops both systems.

First use the proof preset. Confirm via the panel's manual checkboxes: many visible particles; movement within1s; visible repulse; idle arc deformation; visible local arc response/recovery. Sliders remain available to diagnose a failure, but no final preset is chosen automatically. Reset proof returns to exaggerated settings. Exportar valores creates selectable JSON including settings, viewport and Eze's confirmation flags; copy it back for the subsequent production pass. No selected values enter production in08E.

## Validation / scope

- Synced baseline `e443dc009c2ba7d946d23dfb7ff7fea73739a126` (Direction docs-only update after08D); code baseline npm run check PASS.
- npm run check / git diff --check PASS.
- In-process Vite dev HTTP200/transformation for Lab URL and all Lab modules/CSS; actual slim4.4 option parsing confirms proof ranges/count/repulse/circle/DPR and public particle telemetry API.
- Production build entry contains no heroLab switch, Lab UI/import/presets; no Lab stylesheet in emitted CSS. Production controllers, all section CSS/data/assets/hooks, package/lockfile and App unchanged.
- Actual Motion Lab harness: exaggerated scales/mask, pointer ACTIVE/INACTIVE, spring recovery, attribute/bounds restoration and listener teardown PASS; no perceptual claim.
- No browser/perceptual/console/rendering success asserted. Eze must confirm visible behavior in his real browser. The status means the diagnostic tool is delivered, not that motion is approved.

Files: HeroBackground dev gate; `src/components/effects/lab/{HeroMotionLab,LabParticles,LabArc,LabBoundary}.jsx`, labSettings.js, createLabArc.js, hero-lab.css; docs HERO_MOTION/CURRENT_STATE. No new dependencies.

Commit title: `dev: add Hero motion runtime proof lab`; exact SHA via `git log -1 --format=%H --grep='^dev: add Hero motion runtime proof lab$'` and delivery report. Next: Eze runs/exports the Lab results. No final settings, other-section motion or Block09.

---

## 08D implementation record — REJECTED

**REJECTED BY EZE — EFFECTS STILL APPEAR STATIC IN REAL BROWSER** — 4 October 2026.

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


## Block 08F — Halo Quality + Velocity Wake Lab

**08F HISTÓRICO — WAKE VISUALLY REJECTED / HALO QUALITY ACCEPTED**. Implementado el5 de octubre; rechazo y nuevo baseline el6 de octubre. Arquitectura y valores siguientes documentan08F, ya reemplazado por08G.

DEV only: `npm run dev`, abrir `/?heroLab=1`. Producción no cambia. No nuevos paquetes ni integración de valores finales.

### Baseline preservado

Export aprobado por Eze en browser real 1920×945: particles count1/speed0.1/opacity0.575/size1.5/distance200/strength2.4; arc mist0/halo0/core0/noiseSpeed1/radius110/pointerStrength620/recovery1. Render, repulse, arc runtime y deformación local confirmados por Eze; particle drift NO confirmado. Partículas conservan el motor/rangos existentes; no se retocaron en este pass. Cero displacement idle: se omiten los tres loops de escala cero. Noise/flow siguen disponibles para el campo local sostenido.

### Calidad del halo

Nueve controles Lab independientes: width/blur/opacity para core, halo y mist. Inicio core5/2/0.625, halo20/8.5/0.475, mist50/21/0.24. No son valores finales. Misma geometría/gradiente. Controlador separado actualiza filtros estáticos y vivos, restaura atributos al salir y conserva halo limpio con reduced motion.

### Velocity wake

Un único listener de pointer del arco alimenta la deformación sostenida y el wake. Velocidad real CSS px/ms entre eventos; dirección calculada en SVG por transformación CTM. Primer evento, posición quieta, movimiento lento y muestras separadas por más de150ms no disparan. Requiere proximidad al arco (radio del baseline) y superar threshold. Salir del Hero/blur resetea historia.

Pool fijo de tres slots, sin reciclar slots activos ni crear nodos por evento. Cooldown inicial100ms. Cada slot atenúa temporalmente el mist original y secundariamente halo mediante máscara radial negra sobre fondo blanco; copia local de ambos se desplaza en dirección real, expande radio, aumenta blur y pierde opacidad. Core no tiene máscara ni copia de wake. Held deformation original del core permanece.

Inicio: enabled true, threshold0.9px/ms, distance60SVG units, lifetime700ms, radius85, expansion85 adicionales (final170), opacity0.7, mist influence0.85, halo influence0.25, cooldown100ms. Impulso multiplicado por speed/threshold, limitado a0.5–1.5 del distance configurado (default máximo90). Influencias controlan copia y atenuación original. Controles exportan `haloQuality` y `wake`, además de `particles` y `arc`.

Motion anima progreso únicamente durante wakes activos; ningún RAF propio, canvas nuevo o trabajo periódico específico del wake. Telemetría informa velocidad/dirección/slots activos. Al pausar, cambiar controles/variante, reducir motion o desmontar: detener animaciones, remover máscaras/copias y restaurar originales. Mobile/fine-hover unavailable no monta wake ni held pointer. Reduced motion conserva calidad estática, sin interacción ni wake.

### Validación y aceptación pendiente

npm run check PASS; git diff --check PASS. Harness aislado con Motion real y DOM simulado: baseline exacto, dirección/velocidad, quieto/lento/fuera, cooldown, máximo3, desplazamiento/fade temporal, core intacto, restauración máscaras/nodos PASS. Build production idéntico a08E; Lab fuera del bundle productivo. Transformación Vite de módulos Lab PASS. Esto NO es prueba de apariencia browser.

Eze debe verificar: reposo limpio; pointer lento deforma; salida recupera; swipe rápido abre y empuja humo en su dirección; al detenerse disipa. Nuevos controles y wake sin aprobación visual todavía. No screenshots ni éxito visual fabricado. No integrar producción hasta nuevo export/decisión de Eze.

Commit de implementación: `dev: add halo quality and velocity wake lab`; SHA mediante `git log -1 --format=%H --grep='^dev: add halo quality and velocity wake lab$'`.


## 08F rejected wake / 08G volumetric plume direction

Date: 6 October 2026.

Eze approved the current halo quality direction but rejected the 08F velocity wake. Exported 08F baseline:
- haloQuality: core11/blur5.5/op0.625; halo20/8.5/0.475; mist50/20.5/0.24.
- held deformation: radius110, pointerStrength620, recovery1s.
- wake tested: threshold1.25, distance55, lifetime1100, radius50, expansion90, opacity1, mistInfluence0.625, haloInfluence0.475, cooldown100.

Visual diagnosis from current code: `velocityWake.js` masks and duplicates the original mist/halo path, then translates and expands that clipped path section. The result naturally looks like a line segment breaking and growing, not smoke being torn/pushed.

Direction for 08G:
- preserve halo quality and held deformation;
- remove duplicated-path wake payload;
- use a local volumetric plume built from soft cyan mist blobs / wisps, optionally textured with SVG turbulence;
- retain only a short-lived soft attenuation on original mist at impact;
- push plume in real pointer velocity direction with drag, divergence and fade;
- core stays intact;
- no wake on slow hover;
- lab-first, no production integration until Eze approval.


## Block 08G — Volumetric Light-Wake Lab

**HERO MOTION LAB PHASE 3 — READY FOR EZE TUNING** — 6 de octubre de2026.

### Qué se reemplazó / qué permanece

08F copiaba un fragmento de stroke; el resultado percibido por Eze fue una línea rota, no humo. `velocityWake.js`, su payload, máscaras crecientes y controles exclusivos de copia se retiraron. El tracker de velocidad se conserva separado en `pointerVelocity.js`; no hay paths/clones/strokes en el nuevo plume.

HaloQuality por defecto exacto aprobado: core11/5.5/0.625; halo20/8.5/0.475; mist50/20.5/0.24. Reset conserva estos valores. Held-pointer radius110/strength620/recovery1s e idle displacement0/0/0 permanecen. Particles1/speed0.1 y demás configuración08F intactos; sin nuevo trabajo tsParticles.

### Plume y corte de impacto

`volumetricWake.js` preconstruye3 slots,8 wisps por slot (controles6–10). Cada volumen es una elipse rellena por gradiente radial transparente, sin borde, con blur compartido por slot y turbulencia de un octave exclusivamente en la nube. Cyan26DDF4/59E3FF/75F6FF, mínimo A0F8FF de menor intensidad. Radio26±12, siluetas superpuestas, centro difuso y bordes transparentes. La percepción final como niebla, sin burbujas/fragmentos/línea, debe confirmarla Eze.

Anchor: punto más cercano del path aprobado más offset normal de45% del mistWidth hacia lado del impacto. El path solo determina origen y normal; nunca forma el gráfico del wake.

Mist/halo originales reciben máscaras blancas con tres atenuaciones elípticas suaves, largas y orientadas al gesto. Tamaño fijo (rx1.9×baseRadius, ry0.65×baseRadius); no expansión de hueco. MistCut0.7, haloCut0.12, coreCut siempre0 sin control. Recuperación del corte en350ms. El núcleo conserva sus atributos originales, incluida su deformación sostenida aprobada.

### Velocidad, divergencia y disipación

Mismo listener del arco, sin nueva suscripción global. Tracker mide velocidad CSS px/ms; dirección obtenida de posiciones transformadas por CTM inversa. No primer-evento, quieto, lento, fuera de proximidad, muestras separadas >150ms o eventos durante cooldown. Threshold1.1, cooldown100ms; slots ocupados no se reciclan. Blur/salida del Hero resetea historia.

Un Motion progress por slot activo (sin repeat): impacto inicial hasta150ms mantiene concentración y dirección coherente; después divergen trayectorias deterministas hasta±spread24°. Wisps viajan55–85% o90–110% del impulso, con travel110 y multiplicador de velocidad limitado1–1.5. Mayor velocidad aumenta tamaño hasta1.175 y separación por distancia. Drag0.82 controla curva exponencial normalizada: impulso temprano y drift desacelerado. Radios crecen1.7×, blur5.5→9.5, opacity0.65→0. Turbulence8 aumenta ligeramente/offset se desplaza solo durante wake; no turbulencia extra sobre arco. Lifetime900ms; al completar, volumen hidden, corte0 y slot disponible.

### Controles / export

Enabled más speedThreshold, lifetime, travel/plumeTravel, blobCount, baseRadius, spread, drag, opacity/plumeOpacity, mistCut, haloCut, turbulence, cooldown. Export08G añade `plume` con estos campos; conserva `haloQuality`, `arc`, `particles`, viewport/reduced/confirmaciones. Variación de radio±12, expansión1.7 y coreCut0 son constantes documentadas. Cambio de parámetros/blobCount desmonta/restaura y construye pool limpio.

Acceso DEV: `npm run dev` y `/?heroLab=1`. Normal DEV y producción intactos. No cambios HeroLightArc/geometry, estilos de producción, copy, Navbar, framing Mobile, otras secciones o dependencias.

### Lifecycle / reduced / performance

Sin RAF propio, canvas/WebGL o loop permanente del wake. Pool máximo30 wisps con count10; por defecto24. Solo tres superficies de filtro locales acotadas, ocultas cuando idle. Un animation progress por slot ocupado; sin asignación de nodos por pointermove. El coste real de browser/GPU no fue medido.

Reduced motion, visibility/offscreen y unmount cancelan Motion, remueven nodos/máscaras y restauran originales. Held y plume no se montan sin active+fine hover; Mobile sin interacción plume. Calidad aprobada permanece en filtro estático con reduced motion. Fallos se muestran en panel, sin fallback silencioso de Lab.

### QA y puerta visual

npm run check y git diff --check PASS. Vite transforma módulos DEV PASS. Harness aislado con Motion real/DOM simulado: baseline exacto, velocidad/direcciónXY, gating de quieto/lento/fuera, cooldown/pool3, ningún path generado,3×8 wisps, corte fijo/core sin máscara, divergencia/radios/drag/fade, cleanup durante y después de animación, rebuild6/10 PASS. Bundle producción con mismos assets/hashes08F; Lab excluido. Estas pruebas verifican comportamiento técnico; no apariencia renderizada.

Eze debe confirmar siete checks: reposo limpio; held lento; recuperación al salir; nube irregular hacia derecha; nube hacia izquierda; separación/expansión/freno/fade; core continuo. No screenshot ni browser/console/visual PASS inventados. No integrar producción hasta export/aprobación.

Commit único `dev: replace copied arc wake with volumetric plume lab`; SHA mediante `git log -1 --format=%H --grep='^dev: replace copied arc wake with volumetric plume lab$'`.
