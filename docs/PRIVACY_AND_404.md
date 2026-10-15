# 09D — Privacidad y 404 estáticos

**IMPLEMENTATION COMPLETE / READY FOR EZE VISUAL QA**. Baseline limpio: `c21a177b8b5e3e66f8e943b1135a75afb1c4d254`. Sin merge/deploy ni certificación legal.

## Fuentes y alcance

- [CEO / Dirección — Reglas permanentes](https://docs.google.com/document/d/15k6hw8Aj_0B_fO-Wz0J7oOx5j0YTMmdq6ULpzp66Qf4/edit), política mínima viable14/10/2026.
- [Sistema de trabajo con clientes — v2 · Lanzamiento2026](https://docs.google.com/document/d/1V1AfGKOMBj8OqjigQsWzKv5sWcGyrMlQ2b7fuCpH9DY/edit).
- [Ley25.326, texto actualizado](https://www.argentina.gob.ar/normativa/nacional/64790/actualizacion), arts4/6/9/14/16, y [derechos AAIP](https://www.argentina.gob.ar/aaip/datospersonales/derechos), consultados15/10UTC. El documento no sustituye revisión jurídica ni acuerdos comerciales/fiscales.

Inspección del runtime y dependencias: sin formularios, backend propio, cuentas, cobros, cookies propias de seguimiento, analytics ni píxeles. Fuentes/assets locales; enlaces a WhatsApp, email, Instagram y demo. Motion/tsParticles/Embla procesan interacción visual; no se identificó envío de consultas por ellos. Esto no certifica la futura configuración del hosting o de las cuentas externas.

## Privacidad: contenido y datos pendientes

`privacidad.html` cubre consultas voluntarias, finalidad de propuestas/relación comercial, canales y documentación Drive/Docs del workflow, derechos y email aprobado. Fecha14/10/2026 de Buenos Aires. Responsive de lectura760px máximo, gutters24, Inter y tokens actuales, headings/sections, skip link y home links accesibles. Footer de la landing incorpora un enlace discreto debajo de copyright; mantiene sus otros destinos.

**No presentar como política definitiva antes de confirmar:**

1. Nombre o denominación legal y domicilio del responsable. La marca comercial no prueba estos datos.
2. Hosting/plan apto comercial, registros técnicos, tratamiento/ubicación internacional y configuración real.
3. Criterio de conservación/eliminación de consultas, propuestas y documentos; obligaciones que requieran conservarlos.
4. Accesos autorizados y medidas de seguridad efectivamente adoptadas en cuentas, dispositivos y documentos.

El HTML muestra estos pendientes y un aviso de revisión; usa noindex mientras esté en este estado. No se inventaron CUIT, dirección, plazos de retención, MFA, cifrado ni garantías. Al aprobar/completar, actualizar el contenido y decidir la indexación antes de publicar. No banner de cookies, T&C, tracking, formulario o nueva herramienta.

## Arquitectura y 404

Vite MPA con tres inputs: landingReact existente, privacidad.html y404.html. Las páginas nuevas son HTML completo sin scripts ni montaje del Hero, con CSS propio y assets locales. appType:mpa elimina el fallback universal a index.html. Landing/metadata/iconos09C y sistemas interactivos protegidos sin cambios; Footer solo añade Privacidad y estilos de su target/foco.

404: copy aprobado, símbolo oficial, retorno `/`, copyright; sin animación, decoración ni navegación extra. El build transforma SVG a dataURI y referencia CSS/font locales con hash. No router/dependencia nueva. Enlace home absoluto evita rutas relativas rotas al llegar a un error anidado.

Vite preview no sirve automáticamente el contenido de404.html: plugin acotado de preview después del static/html fallback atiende GET/HEAD no resueltos con ese archivo y status404. No forma parte del bundle del sitio ni es un servidor de producción. `npm run dev` conserva el404 genérico de Vite para desconocidas; para revisar el diseño/rutas de producción usar build+preview.

## Hosting: preparación y verificación pendiente

[Vercel documenta](https://vercel.com/kb/guide/custom-404-page) servir404.html estático para rutas no resueltas. `vercel.json` contiene únicamente cleanUrls:true para servir privacidad.html como `/privacidad`. No SPA catch-all, funciones, DNS, redirects de dominio ni deployment. Otro proveedor estático debe configurar su documento de error404 manteniendo el código404; no basta reescribir todas las rutas a index.html ni responder200 con el diseño de error.

En el release autorizado: salida `dist`, build `npm run build`; confirmar que ningún override del panel/host impone fallback SPA. Confirmar plan comercial y HTTPS. Medir en la URL finalmente desplegada:

```sh
curl -I https://ezewebstudio.com.ar/
curl -I https://ezewebstudio.com.ar/privacidad
curl -I https://ezewebstudio.com.ar/ruta-inexistente-qa
curl -I https://ezewebstudio.com.ar/carpeta/ruta-inexistente-qa
```

Esperados:200 home/privacidad y404 las dos desconocidas; inspeccionar también el cuerpo404 y assets anidados. `/404.html` directo es un archivo existente, no una prueba de error404. Estos comandos **no se ejecutaron contra el dominio público**; no hay prueba de deployment, DNS ni condición live.

## QA realizado y límites

`npm run check`, `git diff --check` y16tests PASS. Nueva suite `tests/staticPages.test.mjs` requiere build previo y el mismo JSDOM QA externo documentado para las suites existentes. Usa servidor Vite preview real:200home/privacidad,404rutas desconocidas/nested/asset ausente,HEAD404 vacío, contenido custom, CSS/font/iconos200, SVG byte-exact, cero scripts/forms/canvas nuevos y Footer anchors/tabIndex intactos. Las15pruebas existentes cubren Navbar/Solution, Embla2/3 TEST ONLY, FAQ/contact y particles failure lifecycle.

Revisión estructural de flujo natural y wrap; sin overflow:hidden ni alturas fijas de lectura. Eze revisa visual360/390/430/768 y Desktop, zoom200%, email largo, Tab/Shift+Tab/foco/skip/home/Privacidad, footer quieto y ausencia de regresión. No browser/AT/WCAG/overflow/pixel PASS afirmado. OG y gate interactivo08K siguen pendientes; este bloque no los cierra.

Commit único `feat: add privacy draft and static custom 404`; SHA exacto en entrega y resoluble por git log del título.
