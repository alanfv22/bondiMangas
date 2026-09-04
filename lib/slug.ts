/** Convierte una serie ("ONE PIECE") en un slug de URL ("one-piece"). */
export function serieASlug(serie: string): string {
  return serie.trim().toLowerCase().replace(/\s+/g, "-");
}

/** Inverso de serieASlug: reconstruye el nombre de serie a partir del slug. */
export function slugASerie(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, " ").toUpperCase();
}
