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
