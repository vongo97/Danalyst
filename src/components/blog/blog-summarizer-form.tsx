'use client';

import { useState } from 'react'

export function BlogSummarizerForm() {
  const [content, setContent] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSummarize(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSummary('')
    try {
      const res = await fetch('/api/summarize-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogPostContent: content })
      })
      if (!res.ok) throw new Error('Error al resumir el blog')
      const data = await res.json()
      setSummary(data.summary)
    } catch (err) {
      setError('No se pudo generar el resumen. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSummarize} className="space-y-6">
      <label htmlFor="blog-content" className="block font-medium">Contenido del blog</label>
      <textarea
        id="blog-content"
        className="w-full min-h-[120px] border rounded p-2"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        aria-label="Contenido del blog"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? 'Resumiendo...' : 'Resumir'}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {summary && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h2 className="font-semibold mb-2">Resumen generado</h2>
          <p>{summary}</p>
        </div>
      )}
    </form>
  )
} 