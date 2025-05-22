'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    // Detectar scroll para cambiar el estilo de la navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Detectar la ruta actual
        setActiveLink(window.location.pathname);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { href: '/courses', label: 'Cursos' },
        { href: '/membership', label: 'Membresía' },
        { href: '/analysis-template-generator', label: 'Generador' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contacto' }
    ];

    // Función para cerrar sesión
    const handleLogout = async () => {
        await signOut({ redirect: false });
        setIsUserMenuOpen(false);
        router.push('/');
    };

    // Renderizar botones de autenticación o menú de usuario
    const renderAuthButtons = () => {
        if (!session?.user) {
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

        return (
            <div className="relative">
                <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                >
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden md:inline font-medium">{session.user.name}</span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                        <div className="px-4 py-2 border-b border-gray-100">
                            <p className="font-medium text-gray-900">{session.user.name}</p>
                            <p className="text-sm text-gray-500 truncate">{session.user.email}</p>
                        </div>
                        
                        <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        
                        <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            Mi perfil
                        </Link>
                        
                        <Link
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            Configuración
                        </Link>
                        
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <header 
            className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/90 shadow-md py-3' 
                    : 'bg-white/80 border-b border-gray-200 py-4'
            }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo y Nombre del Sitio */}
                <Link href="/" className="mr-6 flex items-center space-x-3 group">
                    <div className="relative overflow-hidden rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img 
                            src="/images/Logo.svg" 
                            alt={siteConfig.name} 
                            className="h-10 w-10 rounded-full relative z-10 transition-transform duration-300 group-hover:scale-110" 
                        />
                    </div>
                    <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        {siteConfig.name}
                    </span>
                </Link>

                {/* Enlaces de Navegación - Escritorio */}
                <nav className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href} 
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                activeLink === link.href
                                ? 'text-indigo-700 bg-indigo-50'
                                : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {renderAuthButtons()}
                </nav>

                {/* Botón de menú móvil */}
                <button 
                    className="md:hidden flex items-center" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Abrir menú"
                >
                    <svg 
                        className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menú móvil */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 py-3">
                        <nav className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                                        activeLink === link.href
                                        ? 'text-indigo-700 bg-indigo-50'
                                        : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="py-2" onClick={() => setIsMobileMenuOpen(false)}>
                                {renderAuthButtons()}
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}