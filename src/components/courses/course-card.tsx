import Link from 'next/link';
// import Image from 'next/image'; // Comentamos la importación de Image
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Importa los componentes de Card de ShadCN UI
import { Badge } from '@/components/ui/badge'; // Importa el componente Badge de ShadCN UI
import { Button } from '@/components/ui/button'; // Importa el componente Button de ShadCN UI
import { ArrowRight, Clock } from 'lucide-react'; // Importa los iconos necesarios

// Define la interfaz para las propiedades del curso
interface CourseCardProps {
  course: {
    title: string;
    description: string;
    category?: string; // Propiedad opcional para la categoría
    level?: string; // Propiedad opcional para el nivel
    imageUrl?: string; // Propiedad opcional para la URL de la imagen
    duration?: string; // Propiedad opcional para la duración
    link: string; // Enlace al curso
  };
}

// Componente para mostrar una tarjeta de curso individual
export function CourseCard({ course }: CourseCardProps) {
  // Eliminamos el console.log ya que no está funcionando

  return (
    // Contenedor principal de la tarjeta usando el componente Card de ShadCN UI
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Sección de la imagen */}
      {/* Usamos una etiqueta <img> estándar en lugar de next/image */}
      {course.imageUrl ? ( // Muestra la imagen si imageUrl existe
        <div className="relative w-full h-48"> {/* Contenedor con tamaño fijo para la imagen */}
          <img
            src={course.imageUrl} // Fuente de la imagen
            alt={`Imagen del curso ${course.title}`} // Texto alternativo para accesibilidad
            // Añadimos estilos para que la imagen cubra el contenedor
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            // Añadimos un manejador de error para mostrar un mensaje si la imagen falla
            onError={(e) => {
              console.error('Error loading image for course:', course.title, 'URL:', course.imageUrl, e);
              // Opcional: podrías cambiar el src a una imagen de placeholder aquí
              // e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />
        </div>
      ) : (
        // Si no hay imageUrl, mostramos un mensaje o un placeholder
        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          No Image Available
        </div>
      )}


      {/* Encabezado de la tarjeta */}
      <CardHeader>
        {/* Área de insignias (categoría y nivel) */}
        <div className="flex justify-between items-start mb-2">
          {/* Insignia de categoría */}
          {course.category && ( // Muestra la insignia de categoría solo si existe
            <Badge variant="secondary">{course.category}</Badge>
          )}
          {/* Insignia de nivel */}
          {course.level && ( // Muestra la insignia de nivel solo si existe
            <Badge variant="outline">{course.level}</Badge>
          )}
        </div>
        {/* Título del curso */}
        <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
      </CardHeader>

      {/* Contenido de la tarjeta (descripcion y duracion) */}
      <CardContent className="flex-grow"> {/* Permite que el contenido crezca */}
        {/* Descripción del curso */}
        <CardDescription>{course.description}</CardDescription>

        {/* *** DEBUGGING AID: Muestra la URL de la imagen si existe *** */}
        {course.imageUrl && (
           <p className="mt-2 text-xs text-blue-600 break-all">
             Image URL: {course.imageUrl}
           </p>
        )}
        {/* *** FIN DEBUGGING AID *** */}


        {/* Duración del curso */}
        {course.duration && ( // Muestra la duración solo si existe
          <div className="mt-3 flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1.5 h-4 w-4" /> {/* Icono de reloj */}
            <span>{course.duration}</span> {/* Texto de duración */}
          </div>
        )}
      </CardContent>

      {/* Pie de pagina de la tarjeta (boton "Aprender Mas") */}
      <CardFooter>
        {/* Boton "Aprender Mas" */}
        <Link href={course.link} target="_blank" rel="noopener noreferrer" className="w-full"> {/* El boton es un enlace que abre en una nueva pestaña */}
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"> {/* Estilos del boton */}
            Aprender Más
            <ArrowRight className="ml-2 h-4 w-4" /> {/* Icono de flecha */}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
