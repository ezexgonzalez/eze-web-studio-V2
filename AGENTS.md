# Instrucciones para agentes

## Propósito del repositorio

`eze-landing-starter` es una plantilla madre reutilizable para crear landings de negocios. Su objetivo es ofrecer una base técnica sólida, adaptable y mantenible, no representar la identidad final de un cliente ni imponer una narrativa.

La plantilla madre debe permanecer genérica. Las demos y los proyectos de clientes deben crearse como repositorios nuevos mediante **GitHub Template**. No personalizar este starter directamente para un negocio concreto.

## Principios de trabajo

- Mantener los componentes reutilizables y fáciles de adaptar entre distintos rubros.
- Mantener separados el contenido, la presentación y el comportamiento.
- Limitar `src/data/siteConfig.js` a la configuración compartida que consume el núcleo; el contenido específico de secciones debe vivir en módulos de datos propios del proyecto.
- No hardcodear nombres, teléfonos, direcciones, testimonios, promociones ni otros datos de clientes dentro de componentes.
- Evitar lógica o estilos que solo funcionen para una demo específica.
- Respetar la estructura existente del proyecto antes de introducir nuevas abstracciones.
- Mantener el código limpio, legible y sencillo de modificar por otra persona o agente.
- No agregar librerías sin una necesidad concreta y una justificación clara. Preferir las capacidades del stack actual.
- Mantener `npm run build` funcionando después de cada cambio relevante.

## Composición manual y ejemplos

- `src/examples` es material opt-in: demuestra técnicas y no forma parte automática de ningún proyecto.
- Nunca asumir que un ejemplo debe formar parte de una landing nueva.
- Nunca importar todas las secciones por defecto.
- Editar `App.jsx` manualmente para elegir y ordenar las secciones de cada proyecto.
- No crear un registry de secciones, page builder, renderer dinámico ni arrays que compongan la página.
- Antes de diseñar debe existir reconocimiento visual y una dirección creativa aprobada.
- Una landing nueva no hereda automáticamente layout, theme, composición ni secuencia del starter.

## Criterio para nuevas secciones

Antes de crear una sección, definir:

1. Qué función cumple en la narrativa de la landing.
2. Qué duda, necesidad u objeción del visitante resuelve.
3. Qué acción o comprensión debe provocar.
4. Por qué necesita existir como sección independiente.

Cada sección debe tener una intención visual propia, coherente con su función. No repetir automáticamente la misma combinación de título, texto y grupo de cards.

La landing debe construir una secuencia clara: presentar, generar interés, demostrar valor, reducir dudas y facilitar la acción. El orden final puede variar según el rubro y el objetivo comercial, y debe aprobarse para cada proyecto.

## Criterio visual

- Usar `design-guidelines.md` como referencia creativa antes de diseñar o adaptar una demo.
- Evitar una estética genérica o reconocible como generada por IA.
- No abusar de glassmorphism, cards repetidas, gradientes, brillos, sombras o decoraciones sin función.
- No elegir recursos visuales solo porque están de moda.
- Dar a cada decisión visual una relación clara con el rubro, el mensaje o la experiencia del usuario.
- Priorizar jerarquía, legibilidad, ritmo y contenido por encima de la ornamentación.

## Responsive y accesibilidad

- Trabajar con enfoque mobile-first.
- Comprobar que jerarquía, navegación, contenido y llamadas a la acción funcionen primero en pantallas pequeñas.
- Evitar que la versión móvil sea únicamente una reducción de la composición de escritorio.
- Mantener contraste suficiente, estados interactivos visibles y estructura semántica comprensible.
- Optimizar imágenes y evitar recursos que perjudiquen innecesariamente el rendimiento.

## Configuración y contenido

- Centralizar los datos editables de cada sección fuera de sus componentes, en el módulo de configuración o contenido que corresponda.
- Extender la configuración siguiendo patrones simples y explícitos cuando una sección necesite datos editables.
- Mantener separados el contenido, la presentación y el comportamiento.
- Usar contenido de ejemplo neutral en la plantilla madre.
- No introducir información real o ficticia que vincule el starter con un cliente particular.

## Validación antes de finalizar

- Confirmar que el cambio sigue siendo reutilizable para distintos negocios.
- Confirmar que no se hardcodearon datos de cliente.
- Confirmar que las nuevas secciones tienen una función narrativa y una intención visual definidas.
- Revisar la experiencia en mobile y desktop.
- Ejecutar las verificaciones disponibles en el proyecto.
- Usar `npm run check` como validación técnica final y resolver cualquier error antes de dar el trabajo por terminado.
- Documentar cualquier dependencia nueva y explicar por qué era necesaria.
