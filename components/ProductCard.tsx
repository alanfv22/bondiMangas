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

        <div className="absolute left-2 top-2 flex flex-col gap-1">
          <span className="rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            {producto.tipo}
          </span>
        </div>

        {producto.porEncargue && (
          <span className="absolute right-2 top-2 rounded-md bg-bondi-rojoBadge px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow">
            Por encargue
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link href={`/serie/${serieASlug(producto.serie)}`}>
          <h3 className="line-clamp-2 font-display text-lg leading-tight tracking-wide text-bondi-texto transition hover:text-bondi-rojoTexto">
            {producto.titulo}
          </h3>
        </Link>

        <p className="text-xs text-bondi-textoSecundario">{producto.estado}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold text-bondi-texto">
            {formatearPrecio(producto.precio)}
          </span>
          <button
            type="button"
            onClick={() => agregarProducto(producto)}
            className="min-h-9 rounded-full bg-bondi-rojo px-4 py-2 text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
