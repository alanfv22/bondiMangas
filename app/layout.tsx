import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/components/CarritoProvider";
import CarritoDrawer from "@/components/CarritoDrawer";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

// Inter para texto de cuerpo (legible), Bebas Neue para títulos: da el aire
// de tapa de comic/manga sin perder seriedad. Ambas se cargan como variables
// CSS y se mapean en tailwind.config.ts (font-sans / font-display).
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "BONDI — Mangas y Comics",
  description:
    "Comiquería BONDI: mangas y comics en Escobar. Pedí por WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-bondi-fondo text-bondi-texto">
        <CarritoProvider>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <CarritoDrawer />
        </CarritoProvider>
        <Analytics />
      </body>
    </html>
  );
}
