// Tipos centrales de la tienda BONDI.

export type TipoProducto = "Manga" | "Comic";

export type Producto = {
  id: string;
  tipo: TipoProducto;
  serie: string;
  volumen: number | null;
  titulo: string;
  precio: number;
  imagen: string;
  demografia: string;
  estado: string;
  porEncargue: boolean;
};

// Un ítem dentro del carrito: el producto + la cantidad elegida.
export type ItemCarrito = {
  producto: Producto;
  cantidad: number;
};

export type Disponibilidad = "todos" | "con-stock" | "por-encargue";
export type FiltroTipo = "Todo" | "Manga" | "Comic";
