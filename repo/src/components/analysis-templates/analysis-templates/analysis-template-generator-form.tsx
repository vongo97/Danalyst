// src/components/analysis-templates/analysis-template-generator-form.tsx
'use client'; // <-- Marca este componente como cliente

import { useState } from 'react';

export function AnalysisTemplateGeneratorForm() {
    // Estados para los inputs del formulario
    const [templatePurpose, setTemplatePurpose] = useState('');
    const [audience, setAudience] = useState('');
    // Estados para el resultado, carga y error
    const [generatedTemplate, setGeneratedTemplate] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Manejador del envío del formulario
    async function handleGenerateTemplate(e: React.FormEvent) {
        e.preventDefault(); // Prevenir la recarga de la página

        setLoading(true); // Iniciar estado de carga
        setError(''); // Limpiar errores anteriores
        setGeneratedTemplate(null); // Limpiar plantilla anterior

        try {
            // Realizar la llamada a tu ruta API
            const res = await fetch('/api/generate-analysis-template', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Enviar los datos del formulario en el cuerpo de la solicitud
                body: JSON.stringify({ templatePurpose, audience }),
            });

            // Verificar si la respuesta fue exitosa
            if (!res.ok) {
                // Si hay un error en la respuesta (ej. status 400 o 500)
                const errorData = await res.json(); // Intentar leer detalles del error de la API
                throw new Error(errorData.error || 'Error al generar la plantilla.');
            }

            // Si la respuesta es exitosa, obtener el texto de la plantilla
            const data = await res.json();
            setGeneratedTemplate(data.template); // Guardar la plantilla en el estado

        } catch (err) {
            // Capturar cualquier error y mostrar un mensaje
            console.error('Frontend error generating template:', err);
            setError((err as Error).message || 'No se pudo generar la plantilla. Intenta de nuevo.');
        } finally {
            // Finalizar estado de carga
            setLoading(false);
        }
    }

    return (
        // Formulario con el manejador onSubmit
        <form onSubmit={handleGenerateTemplate} className="space-y-6">
            {/* Campo para el propósito de la plantilla (requerido) */}
            <div>
                <label htmlFor="templatePurpose" className="block font-medium mb-2">Propósito de la Plantilla (ej. Plan de Análisis, Esquema de Reporte)</label>
                <input
                    id="templatePurpose"
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={templatePurpose}
                    onChange={(e) => setTemplatePurpose(e.target.value)}
                    required // Hacer este campo obligatorio
                    aria-label="Propósito de la plantilla"
                />
            </div>

            {/* Campo para la audiencia (opcional) */}
            <div>
                <label htmlFor="audience" className="block font-medium mb-2">Audiencia (opcional, ej. Directores, Equipo Técnico)</label>
                <input
                    id="audience"
                    className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    aria-label="Audiencia"
                />
            </div>

            {/* Botón para generar la plantilla */}
            <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
                disabled={loading} // Deshabilitar durante la carga
                aria-busy={loading} // Indicador de estado para accesibilidad
            >
                {loading ? 'Generando...' : 'Generar Plantilla'}
            </button>

            {/* Mostrar mensaje de error si existe */}
            {error && <div className="mt-4 text-red-600">{error}</div>}

            {/* Mostrar plantilla generada si existe */}
            {generatedTemplate && (
                <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap font-mono text-sm"> {/* whitespace-pre-wrap para preservar saltos de línea */}
                    <h2 className="font-semibold mb-2">Plantilla Generada:</h2>
                    <pre>{generatedTemplate}</pre> {/* Usar <pre> para formateo si la respuesta es texto plano con saltos de línea */}
                </div>
            )}
        </form>
    );
}