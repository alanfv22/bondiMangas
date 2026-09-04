"use client";

import { useFiltros } from "./FiltrosProvider";
import type { Disponibilidad, FiltroTipo } from "@/lib/types";

const TIPOS: FiltroTipo[] = ["Todo", "Manga", "Comic"];

const DISPONIBILIDADES: { valor: Disponibilidad; etiqueta: string }[] = [
  { valor: "todos", etiqueta: "Todas" },
  { valor: "con-stock", etiqueta: "Con stock" },
  { valor: "por-encargue", etiqueta: "Por encargue" },
];

export default function Filtros({ demografias }: { demografias: string[] }) {
  const { tipo, setTipo, demografia, setDemografia, disponibilidad, setDisponibilidad } =
    useFiltros();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {TIPOS.map((opcion) => (
          <button
            key={opcion}
            type="button"
            onClick={() => setTipo(opcion)}
            className={`min-h-10 rounded-full px-4 py-2 text-sm font-bold transition ${
              tipo === opcion
                ? "bg-bondi-rojo text-white"
                : "bg-bondi-superficie text-bondi-textoSecundario hover:text-bondi-texto"
            }`}
          >
            {opcion === "Todo" ? "Todo" : `${opcion}s`}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="filtro-demografia">
          Filtrar por demografía
        </label>
        <select
          id="filtro-demografia"
          value={demografia}
          onChange={(evento) => setDemografia(evento.target.value)}
          className="min-h-10 rounded-lg border border-white/10 bg-bondi-superficie px-3 py-2 text-sm text-bondi-texto focus:border-bondi-rojo focus:outline-none"
        >
          <option value="Todas">Toda demografía</option>
          {demografias.map((valor) => (
            <option key={valor} value={valor}>
              {valor}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="filtro-disponibilidad">
          Filtrar por disponibilidad
        </label>
        <select
          id="filtro-disponibilidad"
          value={disponibilidad}
          onChange={(evento) =>
            setDisponibilidad(evento.target.value as Disponibilidad)
          }
          className="min-h-10 rounded-lg border border-white/10 bg-bondi-superficie px-3 py-2 text-sm text-bondi-texto focus:border-bondi-rojo focus:outline-none"
        >
          {DISPONIBILIDADES.map(({ valor, etiqueta }) => (
            <option key={valor} value={valor}>
              {etiqueta}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
