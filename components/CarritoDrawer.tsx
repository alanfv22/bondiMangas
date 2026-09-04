"use client";

import Image from "next/image";
import { useCarrito } from "./CarritoProvider";
import { formatearPrecio } from "@/lib/formato";
import { armarLinkPedidoWhatsApp } from "@/lib/whatsapp";
import { IconoCerrar, IconoWhatsApp } from "./Iconos";

export default function CarritoDrawer() {
  const {
    items,
    abierto,
    cerrarCarrito,
    cambiarCantidad,
    quitarProducto,
    totalPesos,
  } = useCarrito();

  if (!abierto) return null;

  const linkWhatsApp = armarLinkPedidoWhatsApp(items);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro clickeable para cerrar */}
      <button
        aria-label="Cerrar carrito"
        onClick={cerrarCarrito}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <aside className="relative flex h-full w-full max-w-md flex-col bg-bondi-superficie shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-2xl tracking-wide">Tu carrito</h2>
          <button
            onClick={cerrarCarrito}
            aria-label="Cerrar carrito"
            className="flex h-11 w-11 items-center justify-center rounded-full text-bondi-textoSecundario transition hover:bg-white/5 hover:text-white"
          >
            <IconoCerrar />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-bondi-textoSecundario">
              Todavía no agregaste nada.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(({ producto, cantidad }) => (
                <li key={producto.id} className="flex gap-3">
                  <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded-md bg-black/30">
                    <Image
                      src={producto.imagen}
                      alt={producto.titulo}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-display text-base leading-tight tracking-wide">
                      {producto.titulo}
                    </p>
                    <p className="text-xs text-bondi-textoSecundario">
                      {formatearPrecio(producto.precio)} c/u
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <button
                        onClick={() => cambiarCantidad(producto.id, cantidad - 1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-white/20 active:scale-95"
                        aria-label="Restar"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{cantidad}</span>
                      <button
                        onClick={() => cambiarCantidad(producto.id, cantidad + 1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-white/20 active:scale-95"
                        aria-label="Sumar"
                      >
                        +
                      </button>

                      <button
                        onClick={() => quitarProducto(producto.id)}
                        className="ml-auto flex h-11 items-center rounded-full px-3 text-xs font-semibold text-bondi-rojoTexto transition hover:bg-bondi-rojo/10"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <div className="mb-4 flex items-center justify-between text-base font-bold">
            <span>Total</span>
            <span>{formatearPrecio(totalPesos)}</span>
          </div>

          <a
            href={items.length > 0 ? linkWhatsApp : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={items.length === 0}
            className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white transition ${
              items.length === 0
                ? "cursor-not-allowed bg-white/10 text-bondi-textoSecundario"
                : "bg-bondi-rojo hover:brightness-110 active:scale-95"
            }`}
          >
            <IconoWhatsApp />
            Finalizar pedido por WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}
