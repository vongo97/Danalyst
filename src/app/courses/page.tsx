import { fetchCourses } from '@/data/courses';
import { CourseList } from '@/components/courses/course-list'; // Importamos el componente CourseList desde su ubicación correcta
import { Separator } from '@/components/ui/separator'; // Importamos el componente Separator (ahora debería existir)

export const metadata = {
  title: 'Cursos | The Analyst Academy',
  description: 'Explora nuestra amplia gama de cursos de análisis de datos.',
};

export default async function CoursesPage() {
  const courses = await fetchCourses();

  return (
    // Contenedor principal con espacio vertical entre secciones y fondo gris claro
    // Añadimos bg-gray-50 al contenedor principal para cubrir todo el fondo
    <div className="flex flex-col min-h-screen space-y-8 bg-gray-50"> {/* Aplicamos space-y-8 y bg-gray-50 */}
      {/* Sección de Encabezado para la Página de Cursos */}
      <section className="relative py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"> {/* Fondo con gradiente como en el hero */}
        <div className="container mx-auto px-4 text-center"> {/* Centramos el contenido horizontalmente */}
          {/* Título principal de la página */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary"> {/* Estilos del título según especificación */}
            Nuestros Cursos de Análisis de Datos
          </h1>
          {/* Descripción de la página */}
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-xl text-muted-foreground"> {/* Estilos de la descripción según especificación */}
            Explora nuestra amplia gama de cursos diseñados para impulsar tu carrera en el análisis de datos.
          </p>
        </div>
      </section>

      {/* Separador visual */}
      {/* El contenedor del separador ya no necesita fondo propio si el padre lo tiene */}
      <div className="container mx-auto px-4"> {/* Contenedor para centrar el separador */}
         <Separator /> {/* Componente Separator */}
      </div>


      {/* Sección de Listado de Cursos */}
      {/* Eliminamos el padding vertical del main ya que el space-y-8 en el contenedor principal lo maneja */}
      {/* Mantenemos el fondo gris claro, aunque ahora el padre también lo tiene, esto no causa conflicto */}
      <main className="container mx-auto px-4 bg-gray-50 py-8"> {/* Añadimos py-8 para espacio interno dentro de la sección */}
        {/* Usamos el componente CourseList importado */}
        <CourseList courses={courses} />
      </main>
    </div>
  );
}
