import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Bloquea el acceso a archivos ocultos que puedan quedar dentro de /public
// (ej. ".claude/", configuración de herramientas de desarrollo). Next.js
// sirve todo lo que hay en /public tal cual, así que esto evita exponerlos
// por accidente en la demo.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.split("/").some((segmento) => segmento.startsWith("."))) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
