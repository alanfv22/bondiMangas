"use client";

import Image from "next/image";
import Link from "next/link";
import { useFiltros } from "./FiltrosProvider";
import BotonCarrito from "./BotonCarrito";
import { IconoBuscar } from "./Iconos";

export default function Header() {
  const { busqueda, setBusqueda } = useFiltros();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-bondi-fondo/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="BONDI"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="font-display text-2xl tracking-wide text-bondi-texto">
            BONDI
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:flex-1 sm:justify-end">
          <div className="relative w-full max-w-sm">
            <IconoBuscar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-bondi-textoSecundario" />
            <input
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar por serie o título..."
              aria-label="Buscar por serie o título"
              className="min-h-11 w-full rounded-full border border-white/10 bg-bondi-superficie py-2 pl-10 pr-4 text-sm text-bondi-texto placeholder:text-bondi-textoSecundario focus:border-bondi-rojo focus:outline-none focus:ring-1 focus:ring-bondi-rojo"
            />
          </div>
          <BotonCarrito />
        </div>
      </div>
    </header>
  );
}
