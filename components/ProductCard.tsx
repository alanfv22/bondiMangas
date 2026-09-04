"use client";

import Image from "next/image";
import Link from "next/link";
import type { Producto } from "@/lib/types";
import { formatearPrecio } from "@/lib/formato";
import { serieASlug } from "@/lib/slug";
import { useCarrito } from "./CarritoProvider";

export default function ProductCard({ producto }: { producto: Producto }) {
  const { agregarProducto } = useCarrito();

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-bondi-superficie shadow-card ring-1 ring-white/5 transition hover:-translate-y-0.5 hover:ring-bondi-rojo/40">
      {/* Portada: sin badges encima. Así nunca tapa el arte ni el título
          que ya viene impreso en la tapa del comic/manga. */}
      <Link
        href={`/serie/${serieASlug(producto.serie)}`}
        className="relative block aspect-[2/3] w-full overflow-hidden bg-black/30"
      >
        <Image
          src={producto.imagen}
          alt={producto.titulo}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        {/* Badges de tipo y disponibilidad, debajo de la portada. */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-bondi-textoSecundario">
            {producto.tipo}
          </span>
          {producto.porEncargue && (
            <span className="rounded-md bg-bondi-rojoBadge px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Por encargue
            </span>
          )}
        </div>

        <Link href={`/serie/${serieASlug(producto.serie)}`}>
          <h3 className="line-clamp-2 font-display text-lg leading-tight tracking-wide text-bondi-texto transition hover:text-bondi-rojoTexto">
            {producto.titulo}
          </h3>
        </Link>

        <p className="text-xs text-bondi-textoSecundario">{producto.estado}</p>

        {/* Precio y botón con aire de sobra; en mobile el botón pasa a
            ocupar todo el ancho debajo del precio para que sea cómodo
            de tocar (no queda apretado contra el número). */}
        <div className="mt-auto flex flex-col gap-2.5 pt-3">
          <span className="text-lg font-bold text-bondi-texto">
            {formatearPrecio(producto.precio)}
          </span>
          <button
            type="button"
            onClick={() => agregarProducto(producto)}
            className="min-h-11 w-full rounded-full bg-bondi-rojo px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
