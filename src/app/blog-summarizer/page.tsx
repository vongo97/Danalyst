import { BlogSummarizerForm } from '@/components/blog/blog-summarizer-form'

export const metadata = {
  title: 'Resumidor de Blogs | The Analyst Academy',
  description: 'Resume publicaciones de blog rápidamente utilizando nuestra herramienta impulsada por IA.',
}

export default function BlogSummarizerPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Resumidor de Blogs</h1>
      <p className="text-xl text-gray-600 mb-8">
        Resume publicaciones de blog rápidamente utilizando nuestra herramienta impulsada por IA.
      </p>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <BlogSummarizerForm />
      </div>
    </main>
  )
} 