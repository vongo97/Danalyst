'use client';

import { useState } from 'react'

export function CourseIdeaGeneratorForm() {
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('Beginner')
  const [audience, setAudience] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/generate-course-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, targetAudience: audience })
      })
      if (!res.ok) throw new Error('Error al generar la idea')
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('No se pudo generar la idea. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleGenerate} className="space-y-6">
      <div>
        <label className="block font-medium">Tema</label>
        <input
          className="w-full border rounded p-2"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          required
          aria-label="Tema del curso"
        />
      </div>
      <div>
        <label className="block font-medium">Dificultad</label>
        <select
          className="w-full border rounded p-2"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          aria-label="Nivel de dificultad"
        >
          <option value="Beginner">Principiante</option>
          <option value="Intermediate">Intermedio</option>
          <option value="Advanced">Avanzado</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Audiencia objetivo</label>
        <input
          className="w-full border rounded p-2"
          value={audience}
          onChange={e => setAudience(e.target.value)}
          required
          aria-label="Audiencia objetivo"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? 'Generando...' : 'Generar Idea'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {result && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h2 className="font-semibold mb-2">{result.courseTitle}</h2>
          <p className="mb-2">{result.courseDescription}</p>
          <h3 className="font-medium">Módulos sugeridos:</h3>
          <ul className="list-disc ml-6">
            {result.suggestedModules.map((m: string, i: number) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  )
} 