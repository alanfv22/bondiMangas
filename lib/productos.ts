import "server-only";
import fs from "fs";
import path from "path";
import type { Producto, TipoProducto } from "./types";

// Extensiones de imagen que aceptamos al leer las carpetas.
const EXTENSIONES_VALIDAS = [".jpg", ".jpeg", ".png", ".webp"];

const CARPETAS: { dir: string; tipo: TipoProducto; publicPath: string }[] = [
  { dir: "Mangas", tipo: "Manga", publicPath: "/Mangas" },
  { dir: "Comics", tipo: "Comic", publicPath: "/Comics" },
];

/**
 * Convierte un nombre de archivo (sin extensión) en sus partes:
 * serie (mayúsculas, con espacios) y volumen (número o null si no hay).
 * Ej: "one-piece-01" -> { serie: "ONE PIECE", volumen: 1 }
 *     "watchmen"     -> { serie: "WATCHMEN", volumen: null }
 */
function parsearNombre(nombreSinExtension: string): {
  serie: string;
  volumen: number | null;
} {
  const match = nombreSinExtension.match(/^(.+)-(\d{2})$/);

  if (match) {
    const [, base, numero] = match;
    return {
      serie: base.replace(/-/g, " ").toUpperCase(),
      volumen: parseInt(numero, 10),
    };
  }

  // No termina en dos dígitos: es un tomo único.
  return {
    serie: nombreSinExtension.replace(/-/g, " ").toUpperCase(),
    volumen: null,
  };
}

/**
 * Lee una carpeta de /public y arma la lista de productos correspondiente.
 * Se ejecuta SOLO del lado del servidor (usa fs.readdirSync).
 */
function leerCarpeta(dir: string, tipo: TipoProducto, publicPath: string): Producto[] {
  const rutaAbsoluta = path.join(process.cwd(), "public", dir);

  if (!fs.existsSync(rutaAbsoluta)) {
    return [];
  }

  const archivos = fs
    .readdirSync(rutaAbsoluta)
    .filter((archivo) =>
      EXTENSIONES_VALIDAS.includes(path.extname(archivo).toLowerCase())
    )
    .sort(); // orden alfabético estable (respeta el orden de volúmenes)

  return archivos.map((archivo, indice) => {
    const nombreSinExtension = path.basename(archivo, path.extname(archivo));
    const { serie, volumen } = parsearNombre(nombreSinExtension);

    const titulo =
      volumen !== null
        ? `${serie} ${String(volumen).padStart(2, "0")}`
        : serie;

    return {
      id: nombreSinExtension,
      tipo,
      serie,
      volumen,
      titulo,
      precio: 10000,
      imagen: `${publicPath}/${archivo}`,
      demografia: tipo === "Manga" ? "Shonen" : "Comic",
      estado: "En curso",
      // Alternamos con stock / por encargue para mostrar ambos casos en la demo.
      porEncargue: indice % 2 === 1,
    };
  });
}

/**
 * Punto de entrada: junta los productos de Mangas + Comics.
 * Se llama desde Server Components (ej. app/page.tsx).
 */
export function obtenerProductos(): Producto[] {
  return CARPETAS.flatMap(({ dir, tipo, publicPath }) =>
    leerCarpeta(dir, tipo, publicPath)
  );
}

/** Devuelve todos los tomos de una serie, ordenados por número de volumen. */
export function obtenerProductosPorSerie(serie: string): Producto[] {
  return obtenerProductos()
    .filter((p) => p.serie === serie)
    .sort((a, b) => (a.volumen ?? 0) - (b.volumen ?? 0));
}
