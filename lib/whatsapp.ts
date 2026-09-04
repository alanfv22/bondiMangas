import type { ItemCarrito } from "./types";
import { formatearPrecio } from "./formato";

export const WHATSAPP_TIENDA = "5491126705544";

/** Arma el mensaje de pedido y devuelve el link de wa.me listo para abrir. */
export function armarLinkPedidoWhatsApp(items: ItemCarrito[]): string {
  const lineas = items.map(
    ({ producto, cantidad }) =>
      `- ${producto.titulo} x${cantidad} — ${formatearPrecio(
        producto.precio * cantidad
      )}`
  );

  const total = items.reduce(
    (acumulado, { producto, cantidad }) => acumulado + producto.precio * cantidad,
    0
  );

  const mensaje = [
    "¡Hola BONDI! Quiero hacer este pedido:",
    ...lineas,
    `Total: ${formatearPrecio(total)}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_TIENDA}?text=${encodeURIComponent(mensaje)}`;
}
