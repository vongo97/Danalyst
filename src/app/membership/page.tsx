import Link from 'next/link'; // Importa Link si no está
import { siteConfig } from '@/config/site'; // Importa siteConfig si lo usas para metadatos o branding

export const metadata = {
  // Considera usar siteConfig.name aquí para consistencia si quieres
  title: 'Membresía | The Analyst Academy', // O `Membresía | ${siteConfig.name}`
  description: 'Únete a la membresía de The Analyst Academy para obtener beneficios exclusivos.',
}

const benefits = [
  { icon: '⭐', text: 'Acceso a todos los cursos premium' },
  { icon: '📜', text: 'Certificados de finalización' },
  { icon: '🤝', text: 'Acceso a la comunidad privada' },
  { icon: '🎓', text: 'Mentorías personalizadas' },
  { icon: '📂', text: 'Recursos exclusivos y descargables' },
]

export default function MembershipPage() {
  return (
    // Contenedor principal: añadir fondo gris claro si no lo tiene el layout raíz
    // Si el layout raíz ya tiene bg-gray-50, no necesitas ponerlo aquí
    <div className="flex flex-col min-h-screen bg-gray-50"> {/* Añadir contenedor principal con fondo y flex-col */}

      {/* Sección de Hero para la Página de Membresía */}
      {/* Estilo similar al hero de la página de inicio y encabezado de cursos */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Únete a Nuestra Comunidad Exclusiva
          </h1>
          {/* Descripción */}
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Accede a contenido premium, soporte personalizado y una red de profesionales de datos.
          </p>
          {/* Botón de CTA - Puedes usar uno aquí también si quieres */}
          <Link
            href="/membership#join" // Enlace a la sección de unirse si tienes ancla
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-indigo-600 hover:bg-gray-100 h-12 px-8 py-2"
          >
            Explora los Beneficios
          </Link>
        </div>
      </section>

      {/* Contenido principal de la página */}
      {/* Añadimos padding vertical para separar del hero y la sección inferior */}
      <main className="container mx-auto py-12 px-4 flex-grow"> {/* flex-grow para ocupar espacio disponible */}
        {/* La estructura de 2 columnas y la tarjeta de beneficios está bien */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Columna de la Imagen */}
          {/* Puedes ajustar el tamaño de la imagen aquí si es necesario */}
          <div className="flex flex-col justify-center items-center">
            {/* Asegúrate de que esta imagen existe en /public */}
            <img src="/membership.png" alt="Comunidad" className="rounded-lg shadow w-full max-w-xs" />
          </div>
          {/* Columna de Beneficios */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Beneficios de la Membresía</h2>
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">{b.icon}</span> {b.text}
                </li>
              ))}
            </ul>
            {/* Botón "Únete Ahora" - Deshabilitado según tu código original */}
            <button
              className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" // Añadir estilos para deshabilitado
              aria-label="Unirse (Próximamente)"
              disabled
            >
              Únete Ahora (Próximamente)
            </button>
          </div>
        </div>

        {/* Sección de "No eres miembro" */}
        {/* Mantener el estilo actual, ya es distintivo */}
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">¿Aún no eres miembro?</h3>
          <p className="mb-4">Explora nuestros cursos gratuitos o prueba el resumidor de blogs.</p>
          {/* Usar componente Link de Next.js para navegación interna */}
          <Link href="/courses" className="text-indigo-600 font-medium underline mr-4 hover:text-indigo-800">Ver Cursos</Link>
          <Link href="/blog-summarizer" className="text-indigo-600 font-medium underline hover:text-indigo-800">Probar Resumidor</Link>
        </div>
      </main>
    </div>
  );
}