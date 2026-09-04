export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bondi-superficie/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-2xl tracking-wide">BONDI</p>
          <p className="mt-1 max-w-xs text-sm text-bondi-textoSecundario">
            Mangas y comics en Escobar. Pedís por WhatsApp, retirás por el local.
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-bondi-textoSecundario">
          <p className="font-semibold text-bondi-texto">Dirección</p>
          <p>Dr. Travi 491, B1625DWI Escobar</p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-bondi-textoSecundario">
          <p className="font-semibold text-bondi-texto">Horarios</p>
          <p>Lunes a sábado</p>
          <p>11 a 14 hs y 15 a 19 hs</p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-bondi-textoSecundario">
          <p className="font-semibold text-bondi-texto">Seguinos</p>
          <a
            href="https://instagram.com/bondi.mangas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bondi-rojoTexto hover:underline"
          >
            @bondi.mangas
          </a>
        </div>
      </div>

      <p className="border-t border-white/5 py-4 text-center text-xs text-bondi-textoSecundario">
        © {new Date().getFullYear()} BONDI. Todos los derechos reservados.
      </p>
    </footer>
  );
}
