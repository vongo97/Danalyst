import { fetchCourses } from '@/data/courses'
import { CourseList } from '@/components/courses/course-list'

export const metadata = {
  title: 'Cursos | The Analyst Academy',
  description: 'Explora nuestra amplia gama de cursos de análisis de datos.',
}

export default async function CoursesPage() {
  const courses = await fetchCourses();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Nuestros Cursos</h1>
      <CourseList courses={courses} />
    </main>
  )
} 