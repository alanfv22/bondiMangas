"use client";

import { useCarrito } from "./CarritoProvider";
import { IconoCarrito } from "./Iconos";

export default function BotonCarrito() {
  const { cantidadTotal, abrirCarrito } = useCarrito();

  return (
    <button
      type="button"
      onClick={abrirCarrito}
      aria-label={`Abrir carrito${cantidadTotal > 0 ? `, ${cantidadTotal} productos` : ""}`}
      className="relative flex min-h-11 items-center gap-2 rounded-full bg-bondi-rojo px-4 py-2 text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
    >
      <IconoCarrito />
      <span className="hidden sm:inline">Carrito</span>
      {cantidadTotal > 0 && (
        <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-bondi-rojoBadge">
          {cantidadTotal}
        </span>
      )}
    </button>
  );
}
