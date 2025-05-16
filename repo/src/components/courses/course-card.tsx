import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';
import { Course } from '@/data/courses'; // Asegúrate de que Course esté importado si lo usas para tipado

interface CourseCardProps {
  course: Course; // Usa la interfaz Course
}

export function CourseCard({ course }: CourseCardProps) {
  // Puedes eliminar este console.log si ya no lo necesitas
  // console.log('Datos del curso recibidos:', course);

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Sección de la imagen */}
      {course.imageUrl ? (
        <div className="relative w-full h-48"> {/* Contenedor padre con position: relative y dimensiones */}
          <Image
            src={course.imageUrl}
            alt={`Imagen del curso ${course.title}`}
            fill={true} // Usando fill
            className="object-cover" // Usando className para object-fit
            // *** AGREGAR LA PROPIEDAD sizes ***
            // Esta cadena de sizes es un ejemplo basado en tus clases de grid en CourseList.tsx
            // Asegúrate de que los puntos de ruptura y los anchos (vw) coincidan con tu diseño responsivo real
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 25vw"
          // ********************************
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
        <div className="flex justify-between items-start mb-2">
          {course.category && (<Badge variant="secondary">{course.category}</Badge>)}
          {course.level && (<Badge variant="outline">{course.level}</Badge>)}
        </div>
        <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
      </CardHeader>

      {/* Contenido de la tarjeta (descripcion y duracion) */}
      <CardContent className="flex-grow">
        <CardDescription>{course.description}</CardDescription>

        {course.duration && (
          <div className="mt-3 flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1.5 h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        )}
      </CardContent>

      {/* Pie de pagina de la tarjeta (boton "Aprender Mas") */}
      <CardFooter>
        <Link href={course.link} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Aprender Más
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}