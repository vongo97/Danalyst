import Link from 'next/link'
import { siteConfig } from '@/config/site'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Domina el Análisis de Datos y Transforma tu Futuro
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Aprende análisis de datos con nuestros cursos online, herramientas de IA y comunidad. 
              Impulsa tu carrera y alcanza tus metas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-indigo-600 hover:bg-gray-100 h-12 px-8 py-2"
              >
                Ver Cursos
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-700 text-white hover:bg-indigo-800 h-12 px-8 py-2"
              >
                Hazte Miembro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cursos */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cursos</h3>
              <p className="text-gray-600 mb-4">
                Explora nuestra amplia variedad de cursos diseñados para todos los niveles.
              </p>
              <Link
                href="/courses"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Explorar cursos →
              </Link>
            </div>

            {/* Resumidor de Blog */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resumidor de Blog</h3>
              <p className="text-gray-600 mb-4">
                Obtén resúmenes concisos de artículos y blogs para ahorrar tiempo.
              </p>
              <Link
                href="/blog-summarizer"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Probar herramienta →
              </Link>
            </div>

            {/* Membresía */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Membresía</h3>
              <p className="text-gray-600 mb-4">
                Accede a contenido exclusivo, networking y herramientas avanzadas.
              </p>
              <Link
                href="/membership"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Unirse ahora →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
