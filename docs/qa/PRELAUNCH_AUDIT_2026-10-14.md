# Block 09A — Pre-launch audit

**AUDIT COMPLETE / AWAITING DIRECTION APPROVAL**  
14 de octubre de 2026, America/Buenos_Aires. Recomendación: **NOT READY FOR LAUNCH** hasta cerrar los gates y decisiones P1 descritos aquí. No se modificó código de producto, tests, dependencias ni assets.

## 1. Executive summary

Baseline auditado: `640253909e4bd23b0e5bee4bfeb93d24b861e705` (08T), HEAD y origin de `feature/ews-v2-production` sincronizados y limpios al comenzar. No main, implementación ni merge.

| Clasificación | Cantidad | Interpretación |
| --- | ---: | --- |
| P0 — Critical | 0 | No se reprodujo una falla que impida utilizar la landing normal o sus destinos actuales. Esto no equivale a una certificación de seguridad o accesibilidad. |
| P1 — Pre-launch | 5 | Tres problemas confirmados de manejo de fallos/configuración, más dos gates de aceptación que requieren navegador real. |
| P2 — Optional | 6 | Optimizaciones y decisiones de accesibilidad/claridad/reproducibilidad; no son requisitos para rehacer el diseño. |

Los cinco puntos principales: interacción Hero de producción aún sin prueba visual aceptada; promesa de carga de partículas sin manejo de rechazo; favicon/imagen social ausentes; URL pública/canonical/og:url sin definir; QA completo de responsive/zoom/teclado/runtime aún pendiente.

La base funcional es consistente: las **7 pruebas existentes pasan**. Fitness tiene una preview local válida y demo accesible por HTTP; estado único01/01, sin controles inútiles ni proyectos falsos. Embla pasa fixtures aislados de2/3 registros. Las cinco FAQ finales se abren/cierran con exclusividad, ARIA e inert coherentes. WhatsApp, email e Instagram tienen exactamente los destinos08T. No quedan copy/contactos antiguos ni Lab/test fixtures en el bundle activo.

No hay evidencia suficiente para afirmar que las proporciones, overflow, filtros SVG, teclado físico o performance en dispositivos reales pasan. Los PNG históricos de02/03 no representan el HEAD actual. No se usaron como screenshots de esta auditoría. No se generaron screenshots ni scores Lighthouse.

## 2. Alcance y método

### Autoridad y archivos inspeccionados

Leídos AGENTS, CURRENT_STATE, DESKTOP_FIT_IMPLEMENTATION, HERO_MOTION, PROJECTS, EDITORIAL_MOTION y design-guidelines. Fuente Desktop vigente:02C `266:94` / master `266:95`, con decisiones08M–08T;03Mobile FINAL/FROZEN.02B/02Desktop solo historial donde fueron reemplazados. No se hizo una nueva inspección visual de Figma ni una comparación browser↔Figma; se contrastó la estructura del HEAD con esos contratos documentados.

Inspeccionados App/main/index, todas las secciones y Navbar/Footer, módulos de datos, Button y primitivas, todos los estilos activos, hooks, controladores navbar/Solution/Embla, Hero/preferences/arc/particles/plume/velocity/settings, assets, configuración, manifiesto/lock, tests y build. Se revisó también la exclusión de ejemplos/Lab del entry point y las dependencias instaladas de Motion/tsParticles/Embla relevantes para fallos y ownership.

### Qué se verificó

- Lint/build/diff; suites Node y ReactDOM con JSDOM externo ya disponible, sin instalar dependencias.
- SSR de la composición real: headings/landmarks/IDs/destinos y ausencia de contenido falso.
- Pruebas temporales **fuera del repo** sobre handlers Navbar, selección declarativa de filtros, preferencias Hero, Motion real/controlador con geometría SVG simulada y fallos inyectados. No se incorporaron fixtures al sitio.
- Preview de producción HTTP:22 archivos emitidos, bytes/MIME; SVG/XML, WebP decodificado y hash; tamaño real de build; contrastes calculados desde colores CSS.
- HEAD read-only de demo/Instagram/WhatsApp y revisión limitada del HTML/JS público de la demo. Sin mensajes, apertura de clientes externos ni edición de esa demo.
- Matemática de contenedores y revisión de flujo por CSS, no coordenadas obtenidas de un renderer.

### Límite del entorno

No hay ejecutable Chromium/Chrome/Firefox ni instalación utilizable de browser para este workspace. Se comprobó disponibilidad una vez; no se instalaron navegadores, no se reintentaron workarounds conocidos. Lighthouse, pintura SVG, fuentes efectivamente renderizadas, AT, FPS, CLS, LCP, INP, tabulación física, foco nativo modal, gestures de hardware y pixels no se midieron. Eze hace el gate manual específico de la sección8.

## 3. Hallazgos priorizados

### P0

Ninguno confirmado. No convertir pendientes de identidad social ni un efecto decorativo no aceptado en un supuesto bloqueo total de navegación.

### P1-01 — Hero de producción: falta cerrar la prueba de efecto renderizado

- **Estado:** requiere browser QA; debilidad transitoria de setup confirmada mediante fallo controlado. No se atribuye la causa real del browser de Eze a ese gate sin comprobarla.
- **Sección / responsables:** Hero; `HeroBackground.jsx`, `HeroLightArc.jsx`, `HeroAtmosphere.jsx`, `ArcDisplacement.jsx`, `arcDisplacement.js`, `docs/HERO_MOTION.md`08K.
- **Evidencia:**08K sigue abierto en la memoria canónica y la última aceptación del efecto ocurrió en Lab08G. ReactDOM real mantiene los tres URLs LIVE después de un rerender; esa antigua competencia de ownership ya no es un pendiente. Motion real produce escalas locales positivas, retorno, avance/fade del plume y cleanup en geometría simulada, pero no prueba pintura. En una segunda prueba, CTM=null en setup, luego CTM disponible + resize + rerender con mismas dependencias: el efecto consulta el target solo una vez y no vuelve a inicializarse. Los returns de gates preceden a los listeners/observer del controller.
- **Impacto:** un Desktop elegible puede quedarse en fallback sin interacción; no afecta copy/CTAs, pero incumple el resultado Hero aprobado y bloquea su aceptación visual.
- **Corrección mínima:** primero seguir en el browser la cadena branch/variante/LIVE/CTM/proximidad/scale/plume/pixels. Solo si se observa un gate transitorio fallido, hacer su readiness recuperable con lifecycle acotado. Si los atributos cambian y los pixels no, revisar composición del filtro. No retunear valores ni reinstalar librerías.
- **Complejidad:** media para diagnóstico/corrección focalizada; causa del browser aún abierta.

### P1-02 — Rechazo de carga nativa de partículas queda sin manejar

- **Estado:** confirmado **en ruta de fallo inyectada**, no error observado durante una sesión normal de navegador.
- **Sección / responsables:** Hero particles; `ParticleField.jsx`, `HeroAtmosphere.jsx`; wrapper instalado `@tsparticles/react/Particles.js`4.4.0.
- **Evidencia:** wrapper llama `tsParticles.load(...).then(...)` sin catch. Probe aislado con componente oficial, una carga rechazada:1 llamada,0 particlesLoaded y1 `unhandledRejection` con el error inyectado. El catch de `ParticleField.initialize` cubre loadSlim, no esta carga del contenedor. Su timeout8s puede retirar partículas posteriormente; no maneja el rechazo previo. `failParticles` descarta el argumento de error.
- **Impacto:** excepción asíncrona en consola y causa original perdida aunque el fondo estático preserve el contenido. Una falla decorativa debe tener fallback controlado, sin promesas huérfanas.
- **Corrección mínima:** incorporar un canal de error soportado/acotado para el rechazo del contenedor y diagnóstico DEV de su causa; mantener un solo flujo oficial y fallos independientes de arco/partículas. Verificar rechazo, timeout y teardown. No silenciar globalmente unhandledrejection ni duplicar motores. Evaluar la API/solución soportada antes de aprobar una modificación del adapter.
- **Complejidad:** media; sin tuning visual ni cambios de partículas aprobadas.

### P1-03 — Favicon e imagen social no están publicados

- **Estado:** confirmado.
- **Sección / responsables:** publicación, `index.html`, `public/`; asset aprobado pendiente en CURRENT_STATE.
- **Evidencia:** no link rel=icon ni archivo favicon en el build; preview `/favicon.ico`404. Meta OG type/title/description existen, pero no og:image/imagen social; twitter:card es summary. No hay asset OG emitido.
- **Impacto:** pestaña sin identidad y compartidos sin preview visual controlada. El title/description sí están presentes; no se afirma que compartir falle por completo.
- **Corrección mínima:** Eze aprueba/provee favicon e imagen OG; integrar sus referencias y validar tipos/rutas/preview social en la URL pública. No fabricar logo ni imagen comercial.
- **Complejidad:** baja para integrar, una vez recibidos los assets.

### P1-04 — URL pública oficial y metadatos de identidad URL pendientes

- **Estado:** confirmado en el repo; hosting/dominio real aún requieren decisión/verificación de Dirección.
- **Sección / responsables:** `index.html`, configuración de publicación y destinos de despliegue.
- **Evidencia:** no canonical, og:url ni dominio oficial configurado. Las URLs actuales de Contacto y de la demo no son el dominio de esta landing. No hay configuración específica de host que permita probar aquí canonical redirects, headers o noindex de staging.
- **Impacto:** no se puede certificar la identidad canónica, evitar versiones públicas duplicadas ni cerrar el checklist de indexabilidad del despliegue. La ausencia de canonical no demuestra por sí sola que Google no pueda indexar.
- **Corrección mínima:** Dirección confirma la URL pública; configurar canonical/og:url a esa URL y comprobar en host real HTTPS, respuesta200, redirects y ausencia de bloqueos no deseados. Un robots/sitemap de una única landing es un complemento posterior si corresponde, no un requisito inventado de funcionamiento. `/robots.txt` y `/sitemap.xml`404 en preview; su ausencia no constituye un bloqueo de rastreo.
- **Complejidad:** baja para metadatos; verificación del host depende del destino aprobado.

### P1-05 — Gate de responsive/accesibilidad/runtime completo no ejecutado en browser

- **Estado:** requiere browser QA. Es un **gate de aceptación**, no una lista de supuestos defectos visuales.
- **Sección / responsables:** recorrido entero; hojas CSS activas, Navbar/dialog, FAQ, Embla y Hero.
- **Evidencia:** los tests de DOM simulan offsets/media/observers, y no existe evidencia actual de los9 viewports solicitados, zoom200%, ventanas bajas, foco nativo, screen reader o performance Mobile. El source soporta crecimiento y wrap, pero no alcanza para certificar ausencia de overflow/recortes/layout shifts.
- **Impacto:** publicar sin esta revisión deja sin confirmar los comportamientos más dependientes del browser, especialmente modal/anchors y SVG. No WCAG PASS ni browser PASS.
- **Corrección mínima:** ejecutar sección8 sobre un build del SHA auditado, con fuentes/assets listos. Corregir únicamente fallas reproducidas, identificando viewport, elemento, comportamiento esperado y resultado observado. No abrir un nuevo polish global.
- **Complejidad:** media para la pasada manual; cambios dependen de los resultados.

### P2 — Optional improvements

| ID | Sección / estado | Evidencia concreta y responsable | Impacto y corrección mínima | Complejidad |
| --- | --- | --- | --- | --- |
| P2-01 | Proyectos / confirmado | `ProjectPreview` en `ProjectsSection.jsx` no declara loading=lazy/decoding=async. Imagen local128630bytes, muy debajo del fold inicial; slot ya reserva geometría. | Posponer descarga/decode de la preview hasta proximidad puede ahorrar carga inicial. Medir antes/después; no modificar crop ni imagen aprobados. No hay CLS demostrado. | Baja |
| P2-02 | Fonts / confirmado | `fonts.css` carga una única InterVariable.woff2 de352240bytes, font-display:swap; no preload en index.html. | Es el asset binario individual más grande. Medir aparición de fuente/wrap/LCP; valorar subset conservando castellano/pesos/licencia, o preload solo si demuestra beneficio. No afirmar FOUT/CLS medido ni sustituir Inter. | Media |
| P2-03 | Hero budget / confirmado por estructura, impacto requiere browser QA | Lazy JS total219206bytes; particles count1 pero60FPS/DPR1 en `particleOptions.js`, también Mobile; `arcDisplacement.js` mantiene tres loops de ruido/flow con displacement idle0. | Perfil real para saber si el coste de partículas/ruido aporta valor; ajustar trabajo idle solo después de medir y aprobar, preservando held/plume/reduced. No retirar efecto aprobado por una estimación. | Media |
| P2-04 | Preview accesible / probable, decisión semántica | `ProjectPreview` alt="" dentro de track aria-hidden=true. AT recibe título/categoría/descripción/estado/CTA, pero no una descripción del diseño mostrado. | Si la imagen se considera evidencia informativa, aprobar una alternativa breve del proyecto activo sin anunciar todos los slides ni duplicar copy. Si es redundante/decorativa, justificar y conservar la decisión. No se declara infracción WCAG automáticamente. | Baja |
| P2-05 | QA reproducible / confirmado | `package.json` check ejecuta solo lint+build; tests*.mjs fuera del patrón JS/JSX de ESLint; no job/script QA en el repo. JSDOM documentado mediante ruta temporal externa. | Un comando de validación explícito/job que ejecute las3 suites con entorno QA controlado reduciría regresiones que check no detecta. No convertir jsdom en dependencia runtime. | Baja–media |
| P2-06 | Claridad de la demo / requiere decisión de Dirección | URL aprobada incluye demo-gimnasio; copy del estudio dice landing para un gimnasio boutique, sin afirmar un cliente real. JS público de demo muestra `+54 11 1234 5678`, de apariencia de ejemplo; no se verificó titularidad; imagen inspeccionada corresponde a su headline ENTRENÁ/MEJOR./ENTRENÁ ACÁ. | Decidir si conviene identificar explícitamente el trabajo como demo y cómo manejar sus contactos de ejemplo, evitando que un prospecto confunda un ejemplo con un negocio operativo. No sustituir datos de demo por números inventados ni cambiar su repo en esta auditoría. | Baja para decisión; implementación separada |

No se propone rediseño, nuevas secciones, más efectos ni agregar proyectos ficticios. Proyectos2–3 continúan pendientes para el alcance final histórico; **no son una falla del estado actual01/01 autorizado en08S**. Dirección debe decidir si lanza con la demostración única aprobada. No declarar la colección final de3 completa.

## 4. Revisión técnica, funcional y responsive

### Recorrido y contrato visual

| Sección | Observación estructural del HEAD | Lo que requiere Eze |
| --- | --- | --- |
| Hero | Type64/72 Desktop, CTAs210/196×52, fixed header68; escena y paths protegidos. Min viewport/flujo natural, sin escala global ni grid decorativo. | Crop, glow/guía residual, transparencia/glass, text wraps y pintura interactiva. |
| Problema | Cuatro cards min272 y conectores Desktop; min100svh con distribución de aire; Mobile secuencia vertical. Textos/iconos aprobados. | Alturas por contenido, banner, hover/foco no recortado y continuidad con Hero. |
| Solución | Keywords80/86 Desktop; offsets escalonados, flex vertical min100svh, highlight exclusivo de lectura. | Wraps de CONFIANZA especialmente estrecho/zoom; lectura y distribución, sin gigantear type. |
| Proyectos | Fitness local/demo real; único01/01, sin placeholders/controles. Embla único para múltiples; mensaje en flujo y CTA coral local. | Center/crop/snap/depth, drag/swipe real, mensaje lateral y overflow. |
| About | Única pausa tonal#0A1119; dos columnas editoriales; altura por padding/copy. | Wraps de spans y eje con FAQ/Contacto. |
| FAQ | HeadingXL56/64/600 Desktop; cinco respuestas completas,1 openId; panels grid0fr/1fr, inert y ARIA; no max-height de respuesta. | Altura nueva con respuestas08T, transición al Contacto, focus/keyboard/AT nativos. |
| Contacto | Dos columnas/eje compartido; mailto/WhatsApp/IG reales. Email min-width0/overflow-wrap:anywhere/max-width100%. | Email largo, hover/focus/arrow, handler externo y ausencia de overflow. |
| Footer | Flujo natural; Desktop local18/15/14; divider1px16%full-width, blancos atenuados; targets nav/back44px. | Fin de página, alineación/contraste renderizado y ausencia de vacío accidental. |

### Coordenadas derivadas de CSS, NO medidas con getBoundingClientRect

| Viewport Desktop | Fit container | Margen izquierdo | Eje derecho About/FAQ/Contact | Divisor About/Contact | Cards |
| --- | ---: | ---: | ---: | ---: | ---: |
|1366×768|1280|43|771|707|296|
|1440×900|1280|80|808|744|296|
|1536×864|1280|128|856|792|296|
|1920×945|1280|320|1048|984|296|
|1200×768 adicional|1136|32|678.1|621.3|260|

Los tres ejes derechos derivan del mismo Grid600fr/552fr y gap común; no correcciones independientes. Problema/Solución tienen min100svh, pueden crecer por copy. About/FAQ/Contacto/Footer no tienen mínimo Desktop de viewport. Los siete roots Mobile usan min100dvh (fallback100svh), Footer excluido. No altura máxima ni page snap.

| Viewport | Revisión disponible | Resultado que NO se certifica |
| --- | --- | --- |
|1366×768 /1440×900 /1536×864 /1920×945|CSS width/flow + tests Embla con offsets simulados|Pixels, interacción física, overflow|
|768×1024|Gutter24, ancho720; stack editorial, proceso2 columnas, slide560|Wraps/altura/gestures reales|
|1024×768|Gutter≈47.70, ancho≈928.59; stack editorial, slide≈596.15|Continuidad/espacio/gestures reales|
|360×800|Gutter24, ancho312; slide280|Texto/crop/menu/footer físicos|
|390×844|Gutter24, ancho342; slide310|Master Mobile actual renderizado|
|430×932|Gutter24, ancho382; slide310|Framing dvh/scroll/gestures|
|1366×600 adicional|Flujo crece, Hero padding mínimo; escenas pueden superar viewport|Sin recortes/colisiones reales|
|Zoom200%|Breakpoints deberían pasar al layout correspondiente a CSS viewport reducido|Reflow/focus/scroll reales; no simulado como browser zoom|

No colisión horizontal estructural evidente en la matemática inspeccionada. No declarar esto como “sin overflow”. About/copy con spans y las nuevas answers pueden aumentar alturas legítimamente. En pantallas cortas Proyectos puede superar100svh por sus mínimos de contenido: no es un error por sí solo ni motivo para escalar el sitio.

### Interacciones / semántica verificadas

- SSR real:1H1,6H2,13H3;1main,1footer como sibling y landmarks nativos; IDs únicos.18 anchors internos existentes resuelven a IDs. H2 de Solución usa eyebrow visual, pero mantiene jerarquía estructural. No heading skip estructural.
- Navbar ReactDOM StrictMode: open/close, selección de destino, cancel-event equivalente al handler de Escape, cierre al pasar a Desktop, body.menu-open, aria-expanded, foco CERRAR y retorno trigger/brand, cleanup. APIs dialog/media simuladas: **no prueba de focus trap/inert nativos, scroll físico ni Escape de navegador**. Control glass/offset68/92 y fallback/cleanup pasan los5 tests de siteMotion. CSS scroll-padding aplica offset una sola vez; skip link z100 sobre header40.
- Hero: propiedad React del filtro LIVE persiste en rerender;3 paths visibles por variante; static selection funciona. Preferencias reales en React/StrictMode responden a reduced/hidden/offscreen/fine pointer/Desktop y limpian observers. Motion real, SVG DOM/CTM/guide simulados: escalas locales positivas, recuperación,3×8wisps, avance/fade, core sin máscara, cleanup sin writes posteriores. Esto no prueba apariencia ni ausencia de clipping. El harness usa el realm EventTarget de JSDOM y un clock de Node controlado; no se cambió el controller.
- Embla8/ReactDOM real: fixturesTEST ONLY2/3, select/bounds/keys/Home/End/mouse drag/touch swipe/resize/reInit/reduced y teardown pasan. Estados derivados solo de selectedScrollSnap; sin autoplay/loop/clones. Active info/article y status polite comunican proyecto real; preview track aria-hidden sin descendientes interactivos. Drag/snap físico pendiente.
- FAQ:5 botones nativos enabled, primera abierta; open/close/exclusividad/control IDs/regions/aria-expanded/aria-hidden/inert/foco DOM válidos. Enter/Space/Tab/ShiftTab y lector real pendientes; no listeners de teclado artificiales para botones nativos.
- Destinos exactos: Fitness `https://eze-demo-gimnasio.vercel.app/`; Contacto `https://wa.me/5491161993279`; correo `mailto:ezewebstudio.dev@gmail.com`; Instagram `https://www.instagram.com/ezewebstudio/`. Externos target=_blank/rel=noopener noreferrer; mailto sin target. Navbar/Hero HABLEMOS siguen#contacto. Footer/Volver arriba usan anchors reales.
- Todos los recursos actuales son locales salvo navegación externa intencional. Las tres URLs HTTPS retornan HEAD200; WhatsApp redirige a api.whatsapp.com/send con phone5491161993279. Eso **no prueba que las cuentas/número pertenezcan a Eze ni que las apps clientes funcionen**; confirmación manual sin enviar mensajes.

## 5. Accesibilidad y UX/conversión

### Accesibilidad

Source conserva focus-visible2px cyan/offset4, botones nativos, áreas FAQ/menú/controles≥44CSSpx, enlaces semánticos, labels de navegación/diálogo/carousel y contenido visible por defecto. Links inline de contacto no requieren inventar44px globales como si fueran botones. Reduced desactiva transiciones y desmonta Hero; Embla conserva drag directo esencial y snap inmediato. Touch-action pan-y pinch-zoom preserva scroll vertical y zoom.

Contrastes de paleta calculados con luminancia sRGB, no capturas:

| Par foreground/background | Ratio |
| --- | ---: |
|Primary#F5F7F7 /Background#050708|18.77:1|
|Body#C5CDD3 /Background|12.54:1|
|Muted#A7B0B6 /Background|9.16:1|
|Body /About#0A1119|11.79:1|
|Muted /About|8.61:1|
|Footer nav#9AA6AE /Background|8.11:1|
|Footer meta#85939E /Background|6.41:1|
|Inverse#050708 /Fitness coral#FF5A45|6.54:1|
|Inverse /Cyan#59E3FF|13.32:1|
|Solution highlight#8DEEFF /Background|15.19:1|

Estos pares superan4.5:1, pero no prueban todos los estados/alphas/backdrops ni WCAG global. Divisores decorativos tenues no se confunden con texto ilegible. La preview requiere la decisiónP2-04. Reflow200% solicitado y equivalente320CSSpx, zoom400%/1280 como comprobación adicional de reflow, texto ampliado y foco no oculto por fixed header necesitan browser real.

Fuentes primarias consultadas: [W3C Contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [WAI Informative images](https://www.w3.org/WAI/tutorials/images/informative/). No certificación WCAG PASS.

### Primera visita / conversión

Inferencia editorial a partir del contenido aprobado y la preview real, no estudio con usuarios:

- Hero y descripción dejan claro el servicio de landing pages; About precisa negocios/servicios y trabajo directo. No hace falta agregar servicios ficticios ni reformular copy aprobado.
- Problema→Solución explica claridad/confianza/acción antes de la evidencia visual; el orden tiene una función consistente, no features genéricos repetidos.
- Fitness demuestra una dirección de diseño concreta y permite visitar una demo. Imagen/copy principal de la demo corresponden en la inspección limitada; no se declara fidelidad de todo el mockup ni QA de su repo. La distinción demo/cliente y contactos de ejemplo esP2-06, no una acusación de cliente inventado.
- FAQ resuelve precio, insumos, plazo, revisiones y publicación. No mostrar precio fijo/plazo no aprobado es correcto: explica dependencia del alcance.
- Contacto ofrece3 destinos reales, sin formulario ni paso artificial. Gmail personal de marca no constituye un defecto funcional ni justifica contratar herramientas.
- Footer ya es discreto; no repetir venta ni agregar CTA. Un único proyecto actual es transparente y usable. No exigir más registros para dar sensación de agencia.

## 6. Tests / resultados y métricas

### Comandos existentes

```sh
npm run check
git diff --check
node --test tests/siteMotion.test.mjs
EWS_QA_JSDOM=/tmp/ews-08r-tools/node_modules/jsdom/lib/api.js \
  node --test tests/projectCarousel.test.mjs tests/faqContact.test.mjs
```

JSDOM26 ya disponible en entorno QA externo. No npm install/ci, nuevas dependencias ni cambios de tests. La ruta es del workspace actual; en otro entorno usar la instalación QA documentada y una ruta equivalente.

| Validación | Resultado |
| --- | --- |
|Lint + Vite build|PASS|
|git diff --check baseline / documentación final|PASS|
|siteMotion|5/5PASS|
|projectCarousel|1/1PASS, múltiples subchecks/fixtures2/3|
|faqContact|1/1PASS, copy exacto5/links/ARIA/focus|
|Total suites existentes|7/7PASS|
|Probes temporales Navbar/SSR/ownership/preferences/Motion|PASS dentro de límites descritos|
|Fault injection:CTM readiness y particles rejection|Problemas reproducidos; son hallazgos, no tests normales fallidos|
|Build assets preview|22/22HTTP200/byte-exact;42SVGXML válidos|
|Favicon /robots /sitemap rutas preview|404 reales; falta faviconP1, robots/sitemap no bloquean por sí solos|
|DOM/console React en suites|Sin errores capturados en paths normales; fallo particles sí reproduce rechazo|
|Browser /Lighthouse /WCAG /CWV /FPS|NO EJECUTADO /NO CERTIFICADO|

Warning de npm `Unknown env config http-proxy` proviene del entorno, no del producto; no afecta lint/build. No se reporta como warning React del sitio.

### Tamaños medidos del build actual

kB decimales, no KiB. Gzip calculado con Node24 `gzipSync` por archivo y sumado; **compresión offline**, no bytes HTTP transferidos por el host ni duración de carga. Vite reporta sus propios gzip estimados con distinta configuración.

| Recurso | Archivos | Bytes sin comprimir | Gzip offline |
| --- | ---: | ---: | ---: |
|JS inicial|1|260461 (260.46kB)|80498 (80.50kB)|
|JS lazy Hero y plugins|16|219206 (219.21kB)|72733 (72.73kB)|
|JS total disponible|17|479667 (479.67kB)|153231 (153.23kB)|
|CSS activo|1|70982 (70.98kB)|14034 (14.03kB)|
|Inter local|1|352240 (352.24kB)|No se suma como texto gzip|
|Fitness WebP|1|128630 (128.63kB)|Ya formato comprimido|
|Todo dist, incluyendo HTML/notices/assets|22|1040895 (1.041MB)|No representa carga inicial ni una transferencia única|

Fitness1448×1086RGB, decodifica correctamente. SHA256 `ea3961e246c62b5aad367c629be195f27ae5c17554a1603058d3450e0b71c283`, sin cambios08R. CSS fixed slot evita que la falta de width/height en img sea por sí sola evidencia de CLS. Inter font-display:swap; carga real/impacto pendiente.

Hero lazy llega solo al activar preferencias y los módulos se cachean; reduce/hidden/offscreen desmontan recursos. Una vez descargado no se “desdescarga” al pausar. Pool limitado a3×8, sin DOM infinito ni renderer WebGL. Motion/tsParticles/Embla están utilizados; ejemplos/Lab no generan payload publicado. Bundle no contiene heroLab/TEST ONLY/qa-only/email viejo/copy FAQ viejo ni reveal global. Sin source maps emitidos. No CVE audit, headers de producción ni puntuación de seguridad global declarados.

## 7. SEO / social / publicación

- **Correcto por source:** lang=es, UTF8, viewport accesible sin maximum-scale/user-scalable=no; title Eze Web Studio, description aprobada; OG type/title/description; Twitter summary; h1/landmarks coherentes; anchors existentes y activos; enlaces HTTPS; recursos locales válidos.
- **Pendiente confirmado:**favicon/og:image y URL oficial/canonical/og:url, P1-03/04. No inventar dominio ni metadatos comerciales.
- **No bloqueo automático:**sin robots/sitemap, no meta robots=noindex en HTML. Indexabilidad efectiva requiere comprobar robots/headers/origen del host real. El repo no declara el dominio; el HEAD HTTP de una demo no valida el host de la landing.
- **CSR:**HTML servido contiene root vacío y script; el contenido llega por React. No se declara SEO roto por esto. Google/renderización y previews de otras plataformas deben comprobarse en URL final. Prerender no se exige sin necesidad demostrada.
- **Deploy:**Vite build emite dist válido; no merge/deploy hechos aquí. Headers/cache/compresión/redirects/despliegue atómico son del host y no fueron medidos. Sin formularios/tracking nuevo ni env secretos del sitio encontrados en source/entry auditado.

## 8. Checklist manual específico para Eze

Usar build/preview del SHA6402539, no una instancia dev vieja. Esperar `document.fonts.ready`, confirmar Inter en computed font y assets sin fallos. No enviar mensajes para esta QA.

1. **Viewports:**1366×768,1440×900,1536×864,1920×945;768×1024,1024×768;360×800,390×844,430×932. Añadir1199/1200,767/768 y1366×600. En cada uno recorrer los8 bloques: heading wraps, ritmo, section growth, FAQ answer, email, CTA y footer; no seams ni recortes. Medir overflow después de fuentes y respuestas abiertas.
2. **Ejes Desktop:**repetir snippet siguiente en los4 tamaños. Los left de about-copy/faq-list/contact-action deben diferir≤1px. Revisar divider consistente y encabezados izquierdos; navbar brand/nav/CTA con centrosY±2px y nav centrada en viewport.
3. **Navbar:**arranque transparente; glass aparece después de scroll;altura68Desktop/92Mobile estable. Cadaanchor llega sin contenido oculto. Tab inicial muestra skip link encima del header. Abrir MENÚ, Tab/ShiftTab permanecen en diálogo, Escape/cerrar/link desbloquean scroll y devuelven foco; resize1199→1200 cierra y enfoca brand. Revisar scroll de menú en pantalla corta.
4. **Hero08K:**motion permitido+Desktop/fine-hover, comprobar `data-arc-mode=live` y3paths con filtroslive. Mantener mouse sobre halo visible: local scale>0 y **pixels cambian**; salir recupera. Cruce rápido: plume visible/dirección/fade/core continuo. Después de partículas listas, filtros siguenLIVE. Cambiar1440↔1920; comprobar cropped light sin guía/corte. Si falla, capturar el primer eslabón fallido/console, sin cambiar valores.
5. **Reduced/lifecycle:**activar reduced y recargar; Hero estático sin canvas/held/plume, texto/CTAs completos. Volver al modo normal, cambiar pestaña y scroll fuera/dentro del Hero:recursos suspenden/regresan. No aumentar consumo tras varias entradas/resize. Perfil corto Mobile y Desktop; comprobar frames/longtasks y memoria, no solo readiness logs.
6. **Projects:**preview/crop legibles, ningún rectángulo vacío;01/01 y mensaje no clickable. Tab a VER PROYECTO:coral/flecha oscura y focus visible; click abre demo nueva sin opener. En fixture localTEST ONLY2/3:drag/swipe/buttons/Home/End/Arrows, selección/info/count sincronizados, límites y resize, reduced snap. Retirar fixture al terminar; no cambiar production data.
7. **FAQ/contact/footer:**cadaFAQ Enter/Spaceabre/cierra;solo una abierta;Tab/ShiftTab/foco permanecen válidos;AT anuncia estado y answer correcta. Abrir la más larga sin cortes/overflow. Contacto abre WhatsApp con teléfono correcto, correo en cliente configurado e Instagram real;no enviar mensajes. Footeranchors/backtop vuelven a destinos y cierran la página sin void;hover/focus legibles.
8. **Zoom/console/publicación:**200% navegador y texto aumentado,320CSSpx/400% adicional; sin contenido perdido ni scroll horizontal de página, foco visible no tapado. Consola sin errores/warnings nuevos;Network sin assetsfailed. Lighthouse Mobile de URL/build real y registrar LCP/CLS/TBT o métricas disponibles con condiciones, sin confundir laboratorio con INP de campo. Finalmente confirmar dominio/assetsOG/favicon/HTTPS/indexing/preview compartida.

Snippets read-only de medición, no reparación del DOM:

```js
await document.fonts.ready
console.table(['.about-copy', '.faq-list', '.contact-action'].map(selector => ({
  selector, left: document.querySelector(selector).getBoundingClientRect().left,
})))
console.table({
  viewport: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
  headerHeight: document.querySelector('.site-header').getBoundingClientRect().height,
  offset: getComputedStyle(document.documentElement).getPropertyValue('--header-offset'),
})
const arc = document.querySelector('.hero-light-arc[data-arc-mode="live"]')
console.table(arc ? [...arc.querySelectorAll('[data-arc-layer]')].map(path => ({
  layer: path.dataset.arcLayer,
  filter: path.getAttribute('filter'),
})) : [{ mode: 'STATIC: comprobar reduced/capability/visible/setup' }])
```

Un atributo LIVE o un scale positivo no cierra el gate si el efecto no se percibe. Medición scrollWidth sola tampoco descarta contenido recortado por overflow:clip: revisar visualmente todos los elementos.

## 9. Plan mínimo de correcciones / decisión

1. **Eze valida primero Hero y responsive/teclado (P1-01/05).** Registrar fallas reales y cerrar los gates que pasan. Si el Hero renderiza correctamente, no implementar una nueva teoría de causa.
2. **Aprobar solución acotada de fallo particles (P1-02).** Mantener fallback/motor/valores; prueba de rechazo y cleanup antes de aceptar.
3. **Eze confirma URL pública +assets identidad (P1-03/04).** Integración/configuración en otro bloque explícitamente autorizado y verificación del host; sin inventar recursos.
4. **Repetir check+7tests y QA puntual después de esas correcciones.** No repetir rediseños ni reviews globales si el diff no los justifica.
5. **P2 por beneficio medido:**lazy preview primero;font/idleHero solo con perfil;accesibilidad preview y etiqueta/demo según Dirección;comando QA mejora mantenimiento. No bloquear la revisión visual para ejecutar optimizaciones no medidas.

**NOT READY FOR LAUNCH en la evidencia actual.** No por necesitar más decoración ni tres proyectos obligatorios para que el sitio funcione, sino porque faltan dos aceptaciones reales y tres aspectos concretos de fallo/configuración del release. Si Eze cierra los gates y resuelve o acepta explícitamente las decisiones de publicación, reevaluar READY con un diff focalizado. La auditoría no autoriza implementación ni declara Production FINAL.

## 10. Registro de entrega

Solo `docs/qa/PRELAUNCH_AUDIT_2026-10-14.md` y `docs/CURRENT_STATE.md` cambian. Commit documental identificable por `docs: record pre-launch audit and launch gates`; SHA exacto en el reporte de entrega y resoluble con `git log -1 --format=%H --grep='^docs: record pre-launch audit and launch gates$'`. No implementación, merge ni aprobación de correcciones por el agente.
