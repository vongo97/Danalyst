export const metadata = {
  title: 'Membresía | The Analyst Academy',
  description: 'Únete a la membresía de The Analyst Academy para obtener beneficios exclusivos.',
}

const benefits = [
  { icon: '⭐', text: 'Acceso a todos los cursos premium' },
  { icon: '📜', text: 'Certificados de finalización' },
  { icon: '🤝', text: 'Acceso a la comunidad privada' },
  { icon: '🎓', text: 'Mentorías personalizadas' },
  { icon: '📂', text: 'Recursos exclusivos y descargables' },
]

export default function MembershipPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Membresía</h1>
      <p className="text-xl text-gray-600 mb-8">
        Únete a la membresía de The Analyst Academy para obtener beneficios exclusivos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col justify-center items-center">
          <img src="/membership.png" alt="Comunidad" className="rounded-lg shadow w-full max-w-xs" />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Beneficios de la Membresía</h2>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-lg">
                <span className="text-2xl">{b.icon}</span> {b.text}
              </li>
            ))}
          </ul>
          <button
            className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 transition-colors"
            aria-label="Unirse (Próximamente)"
            disabled
          >
            Únete Ahora (Próximamente)
          </button>
        </div>
      </div>
      <div className="bg-indigo-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">¿Aún no eres miembro?</h3>
        <p className="mb-4">Explora nuestros cursos gratuitos o prueba el resumidor de blogs.</p>
        <a href="/courses" className="text-indigo-600 font-medium underline mr-4">Ver Cursos</a>
        <a href="/blog-summarizer" className="text-indigo-600 font-medium underline">Probar Resumidor</a>
      </div>
    </main>
  )
} 