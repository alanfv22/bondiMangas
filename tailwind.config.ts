import type { Config } from "tailwindcss";

// Paleta de marca BONDI, sacada del logo (círculo rojo + texto blanco).
// Etapa 1: valores base funcionales. Etapa 2 (skills de diseño) puede
// sumar tonos derivados, pero estos 5 son el ancla y no se tocan.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bondi: {
          rojo: "#FE0000",
          // Variantes del mismo rojo ajustadas para cumplir contraste WCAG AA
          // en usos de TEXTO (el rojo de marca puro, a 12-14px, no llega a
          // 4.5:1 ni sobre superficie oscura ni como texto chico sobre blanco).
          rojoTexto: "#FF4D4D", // texto rojo sobre fondo oscuro (links, hover, "Quitar")
          rojoBadge: "#E00000", // badges/chips chicos con texto blanco (o viceversa)
          fondo: "#141414",
          superficie: "#1E1E1E",
          texto: "#FFFFFF",
          textoSecundario: "#B0B0B0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
