"use client";

// Estado de búsqueda + filtros del catálogo. Vive en memoria (Context),
// compartido entre el buscador del Header y la grilla de productos.

import { createContext, useContext, useMemo, useState } from "react";
import type { Disponibilidad, FiltroTipo } from "@/lib/types";

type FiltrosContexto = {
  busqueda: string;
  setBusqueda: (valor: string) => void;
  tipo: FiltroTipo;
  setTipo: (valor: FiltroTipo) => void;
  demografia: string;
  setDemografia: (valor: string) => void;
  disponibilidad: Disponibilidad;
  setDisponibilidad: (valor: Disponibilidad) => void;
};

const Contexto = createContext<FiltrosContexto | null>(null);

export function FiltrosProvider({ children }: { children: React.ReactNode }) {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState<FiltroTipo>("Todo");
  const [demografia, setDemografia] = useState("Todas");
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad>("todos");

  const valor = useMemo(
    () => ({
      busqueda,
      setBusqueda,
      tipo,
      setTipo,
      demografia,
      setDemografia,
      disponibilidad,
      setDisponibilidad,
    }),
    [busqueda, tipo, demografia, disponibilidad]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useFiltros() {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useFiltros debe usarse dentro de <FiltrosProvider>");
  }
  return contexto;
}
