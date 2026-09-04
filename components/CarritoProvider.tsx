"use client";

// Estado global del carrito, en memoria (useState + Context).
// A propósito NO usamos localStorage/sessionStorage: el carrito
// vive solo mientras dura la sesión en el navegador (se pierde al refrescar).

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ItemCarrito, Producto } from "@/lib/types";

type CarritoContexto = {
  items: ItemCarrito[];
  abierto: boolean;
  cantidadTotal: number;
  totalPesos: number;
  agregarProducto: (producto: Producto) => void;
  quitarProducto: (id: string) => void;
  cambiarCantidad: (id: string, cantidad: number) => void;
  vaciarCarrito: () => void;
  abrirCarrito: () => void;
  cerrarCarrito: () => void;
};

const Contexto = createContext<CarritoContexto | null>(null);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [abierto, setAbierto] = useState(false);

  const agregarProducto = useCallback((producto: Producto) => {
    setItems((actual) => {
      const existente = actual.find((item) => item.producto.id === producto.id);
      if (existente) {
        return actual.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...actual, { producto, cantidad: 1 }];
    });
    setAbierto(true);
  }, []);

  const quitarProducto = useCallback((id: string) => {
    setItems((actual) => actual.filter((item) => item.producto.id !== id));
  }, []);

  const cambiarCantidad = useCallback((id: string, cantidad: number) => {
    setItems((actual) => {
      if (cantidad <= 0) {
        return actual.filter((item) => item.producto.id !== id);
      }
      return actual.map((item) =>
        item.producto.id === id ? { ...item, cantidad } : item
      );
    });
  }, []);

  const vaciarCarrito = useCallback(() => setItems([]), []);
  const abrirCarrito = useCallback(() => setAbierto(true), []);
  const cerrarCarrito = useCallback(() => setAbierto(false), []);

  const cantidadTotal = useMemo(
    () => items.reduce((acumulado, item) => acumulado + item.cantidad, 0),
    [items]
  );

  const totalPesos = useMemo(
    () =>
      items.reduce(
        (acumulado, item) => acumulado + item.producto.precio * item.cantidad,
        0
      ),
    [items]
  );

  const valor = useMemo(
    () => ({
      items,
      abierto,
      cantidadTotal,
      totalPesos,
      agregarProducto,
      quitarProducto,
      cambiarCantidad,
      vaciarCarrito,
      abrirCarrito,
      cerrarCarrito,
    }),
    [
      items,
      abierto,
      cantidadTotal,
      totalPesos,
      agregarProducto,
      quitarProducto,
      cambiarCantidad,
      vaciarCarrito,
      abrirCarrito,
      cerrarCarrito,
    ]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useCarrito() {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  }
  return contexto;
}
