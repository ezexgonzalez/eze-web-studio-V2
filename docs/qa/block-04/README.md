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
