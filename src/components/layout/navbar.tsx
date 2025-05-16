// src/components/layout/navbar.tsx
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 py-4 backdrop-blur-md border-b border-gray-200">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                {/* Logo (Imagen) y Nombre del Sitio (Texto) */}
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    {/* Etiqueta de la imagen del logo - USA CLASES DE TAMAÑO VÁLIDAS Y RUTA CORRECTA */}
                    {/* Prueba con h-10 w-10 (40px) o h-12 w-12 (48px) */}
                    <img src="/images/logo.svg" alt="Logo" className="h-12 w-12 rounded-full" /> {/* <-- Agrega rounded-full aquí */}
                    {/* Etiqueta del texto del sitio - REDUCE EL TAMAÑO */}
                    {/* Prueba con text-xl o text-2xl para que combine mejor con el logo */}
                    <span className="font-bold inline-block text-2xl"> {/* <-- Cambia 'text-5xl' a un tamaño menor como 'text-2xl' */}
                        {siteConfig.name}
                    </span>
                </Link>

                {/* Enlaces de Navegación */}
                {/* ... el resto de la navegación ... */}
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/courses" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Cursos
                    </Link>
                    <Link href="/membership" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Membresía
                    </Link>
                    <Link href="/analysis-template-generator" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Generador Plantillas
                    </Link>
                    <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Blog
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
                        Contacto
                    </Link>
                </nav>
            </div>
        </header>
    );
}