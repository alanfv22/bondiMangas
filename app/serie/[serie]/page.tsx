import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerProductosPorSerie } from "@/lib/productos";
import { slugASerie } from "@/lib/slug";
import { FiltrosProvider } from "@/components/FiltrosProvider";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

// Server Component: arma la vista con TODOS los tomos de una serie.
export default function PaginaSerie({
  params,
}: {
  params: { serie: string };
}) {
  const nombreSerie = slugASerie(params.serie);
  const tomos = obtenerProductosPorSerie(nombreSerie);

  if (tomos.length === 0) {
    notFound();
  }

  const tipo = tomos[0].tipo;

  return (
    <FiltrosProvider>
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="w-fit text-sm text-bondi-textoSecundario transition hover:text-bondi-rojoTexto"
        >
          ← Volver al catálogo
        </Link>

        <div>
          <span className="rounded-md bg-bondi-superficie px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-bondi-textoSecundario">
            {tipo}
          </span>
          <h1 className="mt-2 text-balance font-display text-4xl tracking-wide sm:text-5xl">
            {nombreSerie}
          </h1>
          <p className="mt-1 text-sm text-bondi-textoSecundario">
            {tomos.length} {tomos.length === 1 ? "tomo disponible" : "tomos disponibles"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {tomos.map((tomo) => (
            <ProductCard key={tomo.id} producto={tomo} />
          ))}
        </div>
      </main>
    </FiltrosProvider>
  );
}
