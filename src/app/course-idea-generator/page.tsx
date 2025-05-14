import { CourseIdeaGeneratorForm } from '@/components/course-ideas/course-idea-generator-form'

export const metadata = {
  title: 'Generador de Ideas de Cursos | The Analyst Academy',
  description: 'Genera ideas innovadoras para cursos de análisis de datos con nuestra herramienta de IA.',
}

export default function CourseIdeaGeneratorPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Generador de Ideas de Cursos</h1>
      <p className="text-xl text-gray-600 mb-8">
        Genera ideas innovadoras para cursos de análisis de datos con nuestra herramienta de IA.
      </p>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <CourseIdeaGeneratorForm />
      </div>
    </main>
  )
} 