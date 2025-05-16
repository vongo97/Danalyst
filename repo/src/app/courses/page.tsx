import { fetchCourses, Course } from '@/data/courses'; // Importa Course si lo usas para tipado
import { CourseList } from '@/components/courses/course-list';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Cursos | Danalyst',
  description: 'Explora nuestra amplia gama de cursos de análisis de datos.',
};

export default async function CoursesPage() {
  const courses: Course[] = await fetchCourses(); // Usa la anotación de tipo Course[]

  // Puedes eliminar este console.log si ya no lo necesitas
  // console.log('Datos fetcheados en CoursesPage:', courses);

  return (
    // Contenedor principal: mantener fondo gris claro y espacio vertical
    <div className="flex flex-col min-h-screen bg-gray-50"> {/* Eliminar space-y-8 aquí, lo manejaremos dentro de las secciones */}

      {/* Sección de Encabezado: similar al Hero de la página de inicio */}
      {/* Ajustamos padding top/bottom para que sea consistente con el hero (py-20) */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          {/* Título principal */}
          {/* Clase de texto blanca por bg-gradient */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4"> {/* Ajustar tamaño y margen inferior */}
            Nuestros Cursos de Análisis de Datos
          </h1>
          {/* Descripción */}
          {/* Clase de texto blanca por bg-gradient */}
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"> {/* Ajustar tamaño, margen inferior y ancho máximo */}
            Explora nuestra amplia gama de cursos diseñados para impulsar tu carrera en el análisis de datos.
          </p>
          {/* Puedes agregar botones aquí si quieres, como en el hero, pero no es necesario para la apariencia */}
        </div>
      </section>

      {/* Contenedor principal para el contenido de la página (Separador y Lista de Cursos) */}
      {/* Añadimos padding vertical al contenedor principal del contenido para dar espacio arriba y abajo */}
      <div className="container mx-auto px-4 py-8"> {/* Añadimos padding vertical y horizontal, y centramos */}
        {/* Separador visual */}
        <Separator className="my-8" /> {/* Añadir margen vertical al separador para separarlo del contenido */}


        {/* Sección de Listado de Cursos */}
        {/* No necesita fondo gris claro si el padre ya lo tiene */}
        {/* Eliminamos padding vertical ya que el contenedor padre lo tiene */}
        <div className="bg-gray-50"> {/* Contenedor para la lista de cursos, puede heredar el fondo gris */}
          {/* Usamos el componente CourseList importado */}
          {/* CourseList ya tiene gap-8 */}
          <CourseList courses={courses} />
        </div>
      </div>
    </div>
  );
}