# psico.enraiz

Sitio web de la **Lic. Juliana Núñez Laya** ([@psico.enraiz](https://instagram.com/psico.enraiz)) — psicóloga clínica, enfoque psicoanalítico integrativo. Sesiones online.

Proyecto [Next.js](https://nextjs.org) (App Router). El diseño proviene de Claude Design y está embebido de forma fiel en `components/PsicoEnraiz.js`, con las animaciones (canvas de raíces, hero por líneas, manifiesto pineado, marquee) portadas a un `useEffect`.

## Desarrollo

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm start
```

## Estructura

- `app/layout.js` — layout raíz, fuentes (Cormorant Garamond + DM Sans) y carga de GSAP/ScrollTrigger.
- `app/globals.css` — variables de paleta, estilos del nav y estados hover.
- `components/PsicoEnraiz.js` — markup del sitio + lógica de animaciones e interacción.
- `public/assets/juli.jpg` — retrato.

## Notas

- Deploy sugerido: [Vercel](https://vercel.com) (detecta Next.js automáticamente).

## Formulario de contacto

El formulario envía las consultas directamente desde el navegador a la integración AJAX de FormSubmit. El destinatario es `lic.juliana.nl@gmail.com`; no requiere claves en el sitio. Para recibir correos, hay que confirmar el email de activación de FormSubmit correspondiente a la web publicada.

La validación y el armado del correo están en `lib/contact.mjs`; `lib/send-contact.mjs` gestiona la respuesta y el tiempo de espera. Si el servicio falla o pide activación, el formulario conserva los datos y no muestra una confirmación de envío. No reintenta automáticamente para evitar duplicados.

Ejecutar `node --test tests/contact.test.mjs` para probar validación y respuestas simuladas. Esas pruebas no envían correos: la entrega real se debe verificar además en el sitio publicado y en la casilla destinataria.
