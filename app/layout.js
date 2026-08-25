import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Lic. Juliana Núñez Laya · psico.enraiz",
  description:
    "Psicología clínica con enfoque psicoanalítico integrativo. Atención online para adolescentes, adultos, parejas y familias. Supervisiones, charlas y talleres.",
  openGraph: {
    title: "Lic. Juliana Núñez Laya · psico.enraiz",
    description:
      "Psicología clínica con enfoque psicoanalítico integrativo. Atención online para adolescentes, adultos, parejas y familias. Supervisiones, charlas y talleres.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
