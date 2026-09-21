# Eze Web Studio V2

Nueva landing oficial de **Eze Web Studio**.

El proyecto busca combinar una dirección visual minimalista, tecnológica y muy cuidada con una implementación clara, performante y fácil de mantener.

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint

## Dirección del proyecto

La identidad de Eze Web Studio parte de:

- fondo negro / dark neutral;
- blanco como texto principal;
- cyan eléctrico como acento;
- tipografía sans moderna;
- alto control de spacing;
- composición CLEAN;
- tecnología sin estética gamer;
- detalle visual sin caer en recursos SaaS / IA genéricos.

El Hero concentra el mayor impacto visual. Las secciones posteriores reducen la intensidad y priorizan claridad, contenido y respiración.

## Figma y producción

Figma es la fuente de verdad para:

- composición;
- geometría;
- jerarquía;
- tipografía;
- spacing;
- desktop;
- mobile;
- intención visual.

Los efectos complejos de producción —shaders, glow avanzado, fondos animados, partículas o niebla— pueden resolverse con herramientas especializadas siempre que respeten el diseño aprobado.

Ver `FRONTEND_AI_WORKFLOW.md` para el workflow completo.

## Política de herramientas visuales

**FREE / OPEN SOURCE FIRST.**

No se compran planes Pro para resolver motion, backgrounds o efectos ornamentales cuando existe una alternativa gratuita/open source de calidad.

Para el fondo animado del Hero, el orden de prueba actual es:

1. React Bits — solo recursos FREE.
2. ShaderGradient.
3. Vanta.js.
4. otras alternativas gratuitas/open source si hace falta.

No se instalan todas las librerías candidatas. Primero se hace un spike técnico; después se incorpora únicamente la solución elegida.

## Documentos importantes

- `project-brief.md` — estado y dirección actual del proyecto.
- `design-guidelines.md` — criterios de diseño y anti-genericismo.
- `FRONTEND_AI_WORKFLOW.md` — workflow Figma → producción y estrategia de efectos.
- `AGENTS.md` — reglas operativas para agentes de implementación.

## Scripts

- `npm run dev` — servidor de desarrollo.
- `npm run lint` — ESLint.
- `npm run build` — build de producción.
- `npm run check` — lint + build.
- `npm run preview` — preview local del build.

## Regla de dependencias

No agregar una librería por anticipación.

Una dependencia nueva debe:

1. resolver un problema concreto;
2. superar una prueba técnica/visual;
3. tener licencia compatible;
4. justificar su coste de bundle y mantenimiento;
5. quedar realmente utilizada en producción.

## Validación antes de cerrar una sección

- fidelidad a Figma;
- desktop y mobile;
- estados interactivos;
- links / CTAs;
- accesibilidad básica;
- performance;
- consola limpia;
- `prefers-reduced-motion` cuando exista motion;
- `npm run check`.
