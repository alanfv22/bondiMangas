// Set de iconos SVG en línea, trazo consistente (stroke-width 1.75).
// Evitamos emojis para los controles estructurales (carrito, cerrar, buscar):
// escalan mejor, no dependen de la fuente del sistema y quedan prolijos
// en cualquier tema.

type IconoProps = { className?: string };

export function IconoCarrito({ className = "h-5 w-5" }: IconoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.25" fill="currentColor" stroke="none" />
      <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}

export function IconoCerrar({ className = "h-5 w-5" }: IconoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function IconoBuscar({ className = "h-4 w-4" }: IconoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function IconoWhatsApp({ className = "h-5 w-5" }: IconoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.34a9.86 9.86 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2Zm5.79 14.06c-.24.68-1.4 1.32-1.93 1.4-.49.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.7-4.1-4.85-4.29-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.38.26-.28.56-.35.75-.35h.53c.17 0 .4-.03.62.47.24.55.81 1.9.88 2.04.07.14.11.3.02.49-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.28-.12.55.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.62.76 1.9.9.28.14.46.21.53.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}
