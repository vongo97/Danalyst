'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

// Tipos para los datos
interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  isPremium: boolean;
  isPopular?: boolean;
  progress?: number;
}

interface Mentorship {
  mentorName: string;
  date: string;
  time: string;
}

interface Resource {
  id: string;
  title: string;
  type: string;
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // Estados para los datos
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [nextMentorship, setNextMentorship] = useState<Mentorship | null>(null);
  const [savedResources, setSavedResources] = useState<Resource[]>([]);

  // Cargar datos cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      // En un entorno real, estos datos vendrían de una API
      // Simulamos la carga de datos del usuario
      setUserCourses([
        {
          id: 'python-intro',
          title: 'Introducción a Python para Análisis',
          description: 'Fundamentos de Python para análisis de datos',
          image: '/images/pandas-intro.png',
          isPremium: false,
          progress: 65
        },
        {
          id: 'sql-advanced',
          title: 'SQL Avanzado',
          description: 'Consultas complejas y optimización',
          image: '/images/Sql_analisis_AD.jpg',
          isPremium: true,
          progress: 30
        }
      ]);

      setNextMentorship({
        mentorName: 'Carlos Martínez',
        date: 'Jueves, 15 de Junio',
        time: '16:00 - 17:00'
      });

      setSavedResources([
        { id: 'res1', title: 'Plantilla de análisis exploratorio', type: 'template' },
        { id: 'res2', title: 'Dataset de ventas 2023', type: 'dataset' },
        { id: 'res3', title: 'Guía de visualización con Tableau', type: 'guide' }
      ]);
    }

    // Cargar cursos destacados (para todos los usuarios)
    setFeaturedCourses([
      {
        id: 'pandas-intro',
        title: 'Introducción a Pandas',
        description: 'Aprende a manipular y analizar datos con la librería más popular de Python.',
        image: '/images/pandas-intro.png',
        isPremium: false,
        isPopular: true
      },
      {
        id: 'sql-data-analysis',
        title: 'SQL para Análisis de Datos',
        description: 'Domina las consultas SQL para extraer insights valiosos de tus bases de datos.',
        image: '/images/Sql_analisis_AD.jpg',
        isPremium: true
      },
      {
        id: 'tableau-viz',
        title: 'Visualización con Tableau',
        description: 'Crea dashboards interactivos y visualizaciones impactantes con Tableau.',
        image: '/images/tableau-data-viz.jpg',
        isPremium: true
      }
    ]);
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isAuthenticated
                ? `¡Bienvenido de nuevo, ${session?.user?.name}!`
                : "Domina el análisis de datos con Analyst Academy"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              {isAuthenticated
                ? "Continúa tu aprendizaje donde lo dejaste"
                : "Aprende las habilidades más demandadas en análisis de datos, ciencia de datos e inteligencia artificial"}
            </p>

            {isAuthenticated ? (
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/dashboard" className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors">
                  Ir a mi Dashboard
                </Link>
                <Link href="/courses" className="bg-indigo-500 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-400 transition-colors">
                  Explorar cursos
                </Link>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/register" className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors">
                  Registrarse gratis
                </Link>
                <Link href="/login" className="bg-indigo-500 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-400 transition-colors">
                  Iniciar sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contenido personalizado para usuarios autenticados */}
      {isAuthenticated && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Tu progreso</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cursos en progreso */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Cursos en progreso</h3>
              <div className="space-y-4">
                {userCourses.map(course => (
                  <div key={course.id} className="border-l-4 border-indigo-500 pl-4">
                    <p className="font-medium">{course.title}</p>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-2 bg-indigo-500 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{course.progress}% completado</p>
                  </div>
                ))}
              </div>
              <Link href="/courses" className="text-indigo-600 font-medium mt-4 inline-block hover:underline">
                Ver todos mis cursos →
              </Link>
            </div>

            {/* Próxima mentoría */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Próxima mentoría</h3>
              {nextMentorship ? (
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="font-medium">Sesión con {nextMentorship.mentorName}</p>
                  <p className="text-sm text-gray-600 mt-1">{nextMentorship.date}</p>
                  <p className="text-sm text-gray-600">{nextMentorship.time}</p>
                  <div className="mt-4">
                    <button className="text-indigo-600 font-medium hover:underline">
                      Reprogramar →
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No tienes mentorías programadas</p>
              )}
            </div>

            {/* Recursos guardados */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Recursos guardados</h3>
              <ul className="space-y-2">
                {savedResources.map(resource => (
                  <li key={resource.id} className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                    </svg>
                    <span>{resource.title}</span>
                  </li>
                ))}
              </ul>
              <Link href="/resources" className="text-indigo-600 font-medium mt-4 inline-block hover:underline">
                Ver todos mis recursos →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Sección de cursos destacados (visible para todos) */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Cursos destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-indigo-100 relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.isPopular && (
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                    Más popular
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-medium">
                    {course.isPremium ? 'Premium' : 'Gratis'}
                  </span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors"
                  >
                    Ver curso
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
