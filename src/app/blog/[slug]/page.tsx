// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { getBlogPostBySlug, getAllBlogSlugs, BlogPost } from '../lib/posts';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

// generateMetadata debe ser async
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    // *** AGREGAR await params DE NUEVO según el error del terminal ***
    const awaitedParams = await params; // <-- Agregar esta línea de nuevo
    // Usar awaitedParams.slug
    const post = await getBlogPostBySlug(awaitedParams.slug); // <-- Usar awaitedParams.slug

    if (!post) {
        return {
            title: 'Entrada no encontrada',
            description: 'La entrada de blog solicitada no existe.',
        };
    }

    return {
        title: `${post.title} | Blog de Danalyst`,
        description: post.summary,
    };
}

// generateStaticParams debe ser async
export async function generateStaticParams() {
    // *** AGREGAR await params DE NUEVO si es necesario aquí también (aunque el error apuntaba a generateMetadata y BlogPostPage) ***
    // Si el error de generateStaticParams persiste, agregarlo aquí también:
    // const awaitedParams = await params;
    // const slugs = getAllBlogSlugs();
    // return slugs.map((slug: string) => ({ slug }));
    // Si el error solo estaba en los otros dos, mantenerlo como estaba:
    const slugs = getAllBlogSlugs(); // <-- Mantener esto si el error no apuntaba aquí
    return slugs.map((slug: string) => ({ slug }));
}

// El componente de página debe ser async
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    // *** AGREGAR await params DE NUEVO según el error del terminal ***
    const awaitedParams = await params; // <-- Agregar esta línea de nuevo
    // Usar awaitedParams.slug
    const post = await getBlogPostBySlug(awaitedParams.slug); // <-- Usar awaitedParams.slug

    if (!post) {
        notFound();
    }

    // Renderizar la entrada usando el HTML procesado
    return (
        // ... resto del componente BlogPostPage ...
        <div className="flex flex-col min-h-screen bg-gray-50">

            <section className="relative py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{post.title}</h1>
                    <p className="text-lg text-gray-300">Publicado el: {post.date}</p>
                </div>
            </section>

            <main className="container mx-auto py-12 px-4 max-w-3xl flex-grow">
                <div className="prose lg:prose-xl mx-auto">
                    {/* Usar dangerouslySetInnerHTML con el HTML procesado */}
                    <div dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
                </div>
            </main>
        </div>
    );
}