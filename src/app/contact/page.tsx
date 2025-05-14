'use client';

import { useState } from 'react'

export const metadata = {
  title: 'Contacto | The Analyst Academy',
  description: 'Ponte en contacto con The Analyst Academy para consultas y soporte.',
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      await new Promise(res => setTimeout(res, 1000))
      setSuccess(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setError('No se pudo enviar el mensaje. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block font-medium">Nombre</label>
        <input className="w-full border rounded p-2" value={name} onChange={e => setName(e.target.value)} required aria-label="Nombre" />
      </div>
      <div>
        <label className="block font-medium">Email</label>
        <input className="w-full border rounded p-2" type="email" value={email} onChange={e => setEmail(e.target.value)} required aria-label="Email" />
      </div>
      <div>
        <label className="block font-medium">Mensaje</label>
        <textarea className="w-full border rounded p-2" value={message} onChange={e => setMessage(e.target.value)} required aria-label="Mensaje" />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded disabled:opacity-50" disabled={loading} aria-busy={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
      {success && <div className="text-green-600">¡Mensaje enviado correctamente!</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  )
}

export default function ContactPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Contacto</h1>
      <p className="text-xl text-gray-600 mb-8">Ponte en contacto con The Analyst Academy para consultas y soporte.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ContactForm />
        </div>
        <div className="bg-indigo-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Información de contacto</h2>
          <ul className="mb-4">
            <li><strong>Dirección:</strong> 123 Data Drive, Analytics City, AC 54321</li>
            <li><strong>Teléfono:</strong> (555) 123-4567 (Lun-Vie, 9am-5pm EST)</li>
            <li><strong>Email:</strong> support@analyst.academy</li>
          </ul>
          <h3 className="font-semibold mb-2">Horario de oficina</h3>
          <ul>
            <li>Lunes - Viernes: 9:00 AM - 5:00 PM (EST)</li>
            <li>Sábado - Domingo: Cerrado</li>
          </ul>
        </div>
      </div>
    </main>
  )
} 