import { obtenerProductos } from "@/lib/productos";
import { FiltrosProvider } from "@/components/FiltrosProvider";
import Header from "@/components/Header";
import Filtros from "@/components/Filtros";
import ProductGrid from "@/components/ProductGrid";

// Server Component: lee /public/Mangas y /public/Comics en el servidor.
export default function Home() {
  const productos = obtenerProductos();
  const demografias = Array.from(
    new Set(productos.map((producto) => producto.demografia))
  );

  return (
    <FiltrosProvider>
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
        <div>
          <h1 className="text-balance font-display text-4xl tracking-wide sm:text-5xl">
            Catálogo
          </h1>
          <p className="mt-1 text-sm text-bondi-textoSecundario">
            {productos.length} títulos disponibles
          </p>
        </div>

        <Filtros demografias={demografias} />

        <ProductGrid productos={productos} />
      </main>
    </FiltrosProvider>
  );
}
