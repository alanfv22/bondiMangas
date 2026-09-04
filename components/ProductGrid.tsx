"use client";

import { useMemo } from "react";
import type { Producto } from "@/lib/types";
import { useFiltros } from "./FiltrosProvider";
import ProductCard from "./ProductCard";

export default function ProductGrid({ productos }: { productos: Producto[] }) {
  const { busqueda, tipo, demografia, disponibilidad } = useFiltros();

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return productos.filter((producto) => {
      const coincideTexto =
        texto === "" ||
        producto.serie.toLowerCase().includes(texto) ||
        producto.titulo.toLowerCase().includes(texto);

      const coincideTipo = tipo === "Todo" || producto.tipo === tipo;

      const coincideDemografia =
        demografia === "Todas" || producto.demografia === demografia;

      const coincideDisponibilidad =
        disponibilidad === "todos" ||
        (disponibilidad === "por-encargue" && producto.porEncargue) ||
        (disponibilidad === "con-stock" && !producto.porEncargue);

      return (
        coincideTexto && coincideTipo && coincideDemografia && coincideDisponibilidad
      );
    });
  }, [productos, busqueda, tipo, demografia, disponibilidad]);

  if (filtrados.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 py-16 text-center">
        <p className="text-lg font-semibold">No encontramos nada por acá</p>
        <p className="text-sm text-bondi-textoSecundario">
          Probá con otra búsqueda o cambiá los filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {filtrados.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
