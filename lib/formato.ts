/** Formatea un número como pesos argentinos: 10000 -> "$10.000". */
export function formatearPrecio(valor: number): string {
  return `$${valor.toLocaleString("es-AR")}`;
}
