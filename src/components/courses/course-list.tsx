import React from 'react';

// Componente que muestra la lista de cursos
export function CourseList({ courses }: { courses: any[] }) {
  return (
    // Contenedor principal con diseño de cuadrícula responsivo y espacio entre elementos
    // Cambiamos gap-6 a gap-8 para más espacio entre tarjetas
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {/* Mapeamos sobre la lista de cursos para renderizar cada tarjeta */}
      {courses.map((course, idx) => (
        // Contenedor para cada curso con estilos mejorados
        <div
          key={idx}
          // Clases de Tailwind CSS para estilo:
          // bg-white: Fondo blanco
          // rounded-lg: Esquinas redondeadas grandes
          // shadow-xl: Sombra extra grande (anteriormente 'shadow-lg')
          // border border-gray-200: Borde sutil de color gris claro
          // p-8: Padding interno de 8 unidades (anteriormente 'p-4')
          // transition-all: Añade una transición suave a todos los cambios de propiedad
          // hover:scale-[1.02]: Escala ligeramente la tarjeta al pasar el cursor (102%)
          // hover:shadow-2xl: Aumenta la sombra al pasar el cursor
          className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 transition-all hover:scale-[1.02] hover:shadow-2xl"
        >
          {/* Título del curso */}
          <h2 className="font-bold text-lg mb-2">{course.title}</h2>
          {/* Descripción del curso */}
          <p className="mb-2 text-gray-700">{course.description}</p> {/* Color de texto para consistencia */}
        </div>
      ))}
    </div>
  );
}
