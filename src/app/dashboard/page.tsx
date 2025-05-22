'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { courses } from '@/data/courses';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({
    completedCourses: 0,
    inProgressCourses: 0,
    totalProgress: 0
  });
  const router = useRouter();

  // Verificar autenticación
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    if (status === 'authenticated') {
      // Simular carga de progreso del usuario
      setUserProgress({
        completedCourses: 2,
        inProgressCourses: 1,
        totalProgress: 75
      });
      setIsLoading(false);
    }
  }, [status, router]);

  // Mostrar pantalla de carga
  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no renderizar nada (la redirección se maneja en el useEffect)
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No se ha encontrado una sesión activa</p>
          <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Tarjeta de perfil */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full border-4 border-white mr-6 bg-gray-300 flex items-center justify-center text-3xl font-bold text-indigo-600">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">Bienvenido, {session.user.name}</h1>
                <p className="text-indigo-100">Plan: Básico</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Progreso de cursos */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Progreso de cursos</h3>
                <div className="h-2 bg-gray-200 rounded-full mb-4">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${userProgress.totalProgress}%` }}
                  ></div>
                </div>
                <p className="text-gray-600">
                  {userProgress.completedCourses} de {userProgress.completedCourses + userProgress.inProgressCourses} cursos completados
                </p>
                <Link href="/courses" className="text-indigo-600 font-medium mt-4 inline-block hover:underline">
                  Ver mis cursos →
                </Link>
              </div>

              {/* Próxima mentoría */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Próxima mentoría</h3>
                <p className="text-gray-600">Jueves, 15 de Junio</p>
                <p className="text-gray-600">16:00 - 17:00</p>
                <button className="text-purple-600 font-medium mt-4 hover:underline">
                  Reprogramar →
                </button>
              </div>

              {/* Recursos guardados */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Recursos guardados</h3>
                <p className="text-gray-600">12 plantillas</p>
                <p className="text-gray-600">5 datasets</p>
                <Link href="/resources" className="text-blue-600 font-medium mt-4 inline-block hover:underline">
                  Ver recursos →
                </Link>
              </div>

              {/* Comunidad */}
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

        {/* Resto del contenido... */}
      </div>
    </div>
  );
}
