---
name: modify-website
description: "Modificar el sitio web de Psico.enraiz cuando Juliana pida cambios en su página, web o psicoenraiz.com, o invoque /modify-website o $modify-website. Implementar, verificar y mostrar una preview antes de solicitar autorización para publicar."
---

# Modificar Psico.enraiz

Trabajar exclusivamente sobre `tomasdavison/psicoenraiz` (`https://github.com/tomasdavison/psicoenraiz.git`). No usar ni modificar otros repositorios de la cuenta conectada.

## Experiencia de Juliana

Juliana no es técnica. Conversar en español claro y centrarse en lo que verá la persona que visita la web. No hablarle de ramas, commits, pull requests, dependencias, compilaciones ni otros detalles internos salvo que ella los pregunte o sea indispensable para decidir algo.

Interpretar pedidos cotidianos como “cambiá este texto”, “agregá este servicio”, “quiero otra foto” o “modificá mi página” como cambios en este sitio. Pedir aclaración solo cuando una elección visual o de contenido cambie materialmente el resultado y no pueda inferirse con seguridad.

## Contexto técnico estable

- La rama de producción es `master`.
- El proyecto usa Next.js 14 y React 18.
- La página principal parte de `app/page.js` y `components/PsicoEnraiz.js`.
- Los estilos globales están en `app/globals.css` y los recursos públicos en `public/`.

Usar esto solo como punto de partida y revisar el estado actual del repositorio, porque la estructura puede evolucionar.

## Flujo obligatorio

1. Abrir la copia existente del repositorio o clonarlo si no está disponible. Confirmar internamente que el remoto sea exactamente `tomasdavison/psicoenraiz` y trabajar desde la versión más reciente publicada. Preservar cualquier cambio ajeno o trabajo ya existente.
2. Revisar el área afectada y aplicar el pedido con el cambio más acotado que resuelva la necesidad. Mantener el diseño, la tipografía, los colores, la adaptación a celular y la voz profesional de Psico.enraiz, salvo que Juliana pida modificarlos.
3. Verificar que el sitio funcione. Instalar dependencias cuando sea necesario y ejecutar como mínimo `npm run build`; realizar verificaciones adicionales pertinentes al cambio.
4. Generar una preview visual antes de publicar. Abrir el sitio localmente y capturar la zona modificada en computadora y celular cuando el cambio pueda responder distinto según el tamaño. Revisar personalmente las capturas y corregir problemas de texto, espaciado, superposición, legibilidad o elementos rotos antes de mostrarlas.
5. Entregar la preview mediante capturas visibles y, si está disponible sin afectar producción, un enlace temporal. Explicar brevemente qué cambió en lenguaje cotidiano.
6. Terminar preguntando de forma simple: “¿Querés que lo publique?”. No publicar, integrar ni desplegar a producción hasta recibir una autorización explícita posterior a la preview.
7. Si Juliana aprueba, manejar internamente la integración y publicación. Confirmar que el sitio público quedó actualizado y compartir el enlace. Si el servicio de publicación no permite verificar el resultado, explicar claramente qué parte quedó completa y qué falta, sin trasladarle instrucciones técnicas innecesarias.

## Límites

- Una autorización para preparar o previsualizar un cambio no autoriza su publicación.
- Una preview remota, si se necesita, debe permanecer separada de producción.
- No cambiar textos, imágenes, analítica, formularios, dominios, variables secretas ni integraciones que queden fuera del pedido.
- No eliminar trabajo existente ni resolver conflictos descartando cambios.
- No afirmar que algo está publicado hasta comprobarlo.
