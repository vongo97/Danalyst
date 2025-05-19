'use client';

import Link from 'next/link';

export default function DashboardPage() {
  // Versión simplificada para compilación
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full border-4 border-white mr-6 bg-gray-300"></div>
              <div>
                <h1 className="text-3xl font-bold">Bienvenido</h1>
                <p className="text-indigo-100">Plan: Básico</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Progreso de cursos</h3>
                <div className="h-2 bg-gray-200 rounded-full mb-4">
                  <div className="h-2 bg-indigo-600 rounded-full w-3/4"></div>
                </div>
                <p className="text-gray-600">3 de 4 cursos completados</p>
                <Link href="/courses" className="text-indigo-600 font-medium mt-4 inline-block hover:underline">
                  Ver mis cursos →
                </Link>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Próxima mentoría</h3>
                <p className="text-gray-600">Jueves, 15 de Junio</p>
                <p className="text-gray-600">16:00 - 17:00</p>
                <button className="text-purple-600 font-medium mt-4 hover:underline">
                  Reprogramar →
                </button>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Recursos guardados</h3>
                <p className="text-gray-600">12 plantillas</p>
                <p className="text-gray-600">5 datasets</p>
                <Link href="/resources" className="text-blue-600 font-medium mt-4 inline-block hover:underline">
                  Ver recursos →
                </Link>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Comunidad</h3>
                <p className="text-gray-600">3 mensajes sin leer</p>
                <p className="text-gray-600">1 evento próximo</p>
                <Link href="/community" className="text-pink-600 font-medium mt-4 inline-block hover:underline">
                  Ir a la comunidad →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}