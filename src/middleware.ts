import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Rutas que requieren autenticación
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/analysis-template-generator'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Verificar si la ruta actual está protegida
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Verificar si el usuario está autenticado
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // Si no hay token y la ruta está protegida, redirigir al login
  if (!token && isProtectedRoute) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}