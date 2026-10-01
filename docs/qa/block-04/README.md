# Block 04 — QA evidence

**Browser QA BLOCKED. No capturas de producción disponibles.**

## Comprobaciones realizadas

- Baseline npm run check PASS en `74c85a1`.
- npm run check y git diff --check PASS con implementación de Proyectos.
- React SSR: dataset real = 1, URL/preview null, un article, controles y CTA disabled, sin anchors falsos, status/pagination 1 de 1, geometría vacía aria-hidden.
- Fixture SSR aislado de tres copias del mismo contenido aprobado: tres previews reales de prueba, un article activo, viewport enfocable y rama multi-registro habilitada; fixture no publicado.
- Masters Figma 73:42 / 183:6 inspeccionados mediante metadata, design context, screenshots y propiedades; SVG exactos guardados localmente.

## Gate pendiente

| QA | Estado |
| --- | --- |
| Desktop 1536 vs 73:42 | Pendiente |
| Mobile 390 vs 183:6 | Pendiente |
| 430 / 768 / 1024 / 1280 | Pendiente |
| 767/768, 1199/1200 | Pendiente |
| Overflow / fuentes / assets en browser | Pendiente |
| Controls / keyboard / multi-record swipe | Pendiente |
| Consola de preview | Pendiente |
| Solución → Proyectos / regresión baseline | Pendiente |

Guardar después de QA real:

- `projects-desktop-1536.png`
- `projects-mobile-390.png`

No renombrar renders de Figma ni imágenes sintetizadas como evidencia de browser.

Bloqueo: Chrome local termina antes de cargar una página porque socket de ProcessSingleton está denegado. Ejecución ampliada rechazada por política sandbox_approval=false. Browser cloud rechaza localhost con ERR_BLOCKED_BY_CLIENT. Se requiere acceso permitido al preview de producción desde un navegador real para continuar el gate.

## QA Completion Pass — 1 de octubre de 2026

Base sincronizada: `5dfccb20507b640d5055b0994c0f05f33de06b56`, working tree limpio antes de la pasada. Contexto obligatorio y código/assets actuales revisados. npm run check PASS; preview del build levantado en 127.0.0.1:5175 y comprobado HTTP 200 desde su entorno de ejecución. git diff --check PASS. Sin cambios de código, dataset, dependencias ni archivos protegidos. Sin fixture temporal publicado.

**REAL ISSUE — bloqueo de infraestructura del QA**, no defecto visual confirmado:

- LOCATION: entorno local de ejecución de Chrome / acceso cloud al preview.
- OBSERVED ISSUE: creación de socket Unix devuelve `Operation not permitted`; no hay Chrome instalado utilizable en este entorno. El navegador Chrome cloud devuelve `net::ERR_BLOCKED_BY_CLIENT` al abrir el build local.
- EXPECTED FROM FIGMA: comparar un render de producción real con 73:42 (1536×941) y 183:6 (390×884), conservando 01/01 como excepción funcional intencional.
- CURRENT BROWSER RESULT: navegación rechazada antes de renderizar la landing; sin DOM de producción ni resultado visual que pueda evaluarse.
- FIX ATTEMPTED: revalidación del entorno local, build/preview real y un intento de navegación mediante el browser cloud disponible. No se modificaron restricciones ni se volvió a solicitar la ejecución ampliada previamente rechazada.
- REMAINING BLOCKER: acceso permitido a un navegador que pueda abrir este build. Se requiere URL de preview accesible al browser cloud o entorno que permita Chrome local. No se publicó un deploy ni se sustituyó QA por SSR.

Todos los gates de browser siguen pendientes: masters, seis viewports y bordes, overflow, controls, Tab/Shift+Tab, fixture multi-record (Arrow/Home/End, swipe, snap, resize, sync), consola, fuentes/assets decodificados y continuidad. No hay evidencia PNG nueva ni afirmación de browser/interaction PASS. Dataset inspeccionado sin cambios: fitness único, URL/preview null; producción mantiene paginación 01/01 y disabled existentes. La comprobación de runtime aún no ocurrió.

Estado conservado: **IMPLEMENTED / BROWSER QA BLOCKED — NOT CLOSED**. No se inicia Block 05.
