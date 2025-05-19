import { fetchCourses, Course } from '@/data/courses';
import { CourseList } from '@/components/courses/course-list';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `Cursos | ${siteConfig.name}`,
  description: 'Explora nuestra amplia gama de cursos de análisis de datos.',
};

export default async function CoursesPage() {
  const courses: Course[] = await fetchCourses();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="relative py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Nuestros Cursos de Análisis de Datos
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Explora nuestra amplia gama de cursos diseñados para impulsar tu carrera en el análisis de datos.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Separator className="my-8" />

        <div className="bg-gray-50">
          <CourseList courses={courses} />
        </div>
      </div>
    </div>
  );
}