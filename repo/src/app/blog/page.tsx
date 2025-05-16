// src/app/blog/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
// Importa getAllBlogPosts y también BlogPost para la anotación de tipo
import { getAllBlogPosts, BlogPost } from './lib/posts'; // <-- Asegúrate de importar ambos

export const metadata: Metadata = {
    title: 'Blog de Análisis de Datos | Danalyst',
    description: 'Artículos, tutoriales y reflexiones sobre análisis de datos, ciencia de datos y más.',
};

export default function BlogPage() {
    // *** Llama a la función para obtener las entradas ***
    const blogPosts = getAllBlogPosts(); // <-- Asegúrate de que esta llamada esté aquí
    // *** Puedes agregar un console.log aquí para verificar si blogPosts contiene algo ***
    console.log("Entradas de blog obtenidas en /blog:", blogPosts);
    // ********************************************************************************

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">

            {/* ... sección de encabezado ... */}

            <main className="container mx-auto py-12 px-4 flex-grow">
                <h2 className="text-3xl font-semibold mb-8 text-gray-800">Últimas Entradas</h2>

                {/* *** Mapea sobre el array blogPosts para mostrar las entradas *** */}
                <div className="space-y-8">
                    {/* Asegúrate de que estés mapeando blogPosts y usando 'post' en la función */}
                    {/* Verifica que blogPosts.length sea mayor que 0 si no se ven entradas */}
                    {blogPosts.map((post: BlogPost) => ( // <-- Asegúrate de que este mapeo esté aquí y 'post' tenga el tipo correcto
                        <article key={post.slug} className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                            <Link href={`/blog/${post.slug}`}>
                                <h3 className="text-2xl font-bold text-indigo-600 hover:underline mb-2">{post.title}</h3>
                            </Link>
                            <p className="text-gray-700 mb-4">{post.summary}</p>
                            <p className="text-sm text-gray-500">Publicado el: {post.date}</p>
                        </article>
                    ))}
                </div>
                {/* ************************************************************* */}
            </main>
        </div>
    );
}