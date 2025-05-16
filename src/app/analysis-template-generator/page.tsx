// src/app/analysis-template-generator/page.tsx
import { Metadata } from 'next';
import { AnalysisTemplateGeneratorForm } from '@/components/analysis-templates/analysis-templates/analysis-template-generator-form'; // Importa el componente del formulario (lo crearemos en el siguiente paso)

export const metadata: Metadata = {
    title: 'Generador de Plantillas de Análisis | Danalyst', // Título para esta página
    description: 'Genera estructuras de plantillas para tus proyectos de análisis de datos con nuestra herramienta de IA.', // Descripción para SEO
};

export default function AnalysisTemplateGeneratorPage() {
    return (
        // Contenedor principal de la página, similar a otras páginas de herramientas
        <main className="container mx-auto py-12 px-4">
            {/* Título principal de la página */}
            <h1 className="text-4xl font-bold mb-4">Generador de Plantillas de Análisis</h1>
            {/* Descripción de la herramienta */}
            <p className="text-xl text-gray-600 mb-8">
                Genera estructuras de plantillas y esquemas para tus proyectos de análisis de datos, reportes y documentación.
            </p>
            {/* Contenedor para el formulario de la herramienta */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Incluye el componente del formulario aquí */}
                <AnalysisTemplateGeneratorForm />
            </div>
        </main>
    );
}