'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export function UserNav() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Si el usuario no está autenticado, mostrar botones de login/registro
  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  // Si está cargando, mostrar un indicador
  if (status === 'loading') {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
    );
  }

  // Si el usuario está autenticado, mostrar menú de usuario
  // (status === 'authenticated' && session)
  if (status === 'authenticated' && session) {
    return (
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
            {session.user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="hidden md:inline font-medium">{session.user?.name}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-gray-900">{session.user?.name}</p>
              <p className="text-sm text-gray-500 truncate">{session.user?.email}</p>
            </div>
            
            <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Mi perfil
          </Link>
          
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Configuración
          </Link>
          
            <button
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    );
  }

  // Fallback for any other state (should not happen in normal flow with NextAuth)
  // or if status is authenticated but session is somehow null
  return null; 
}