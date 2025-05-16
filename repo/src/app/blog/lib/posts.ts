// src/app/blog/lib/posts.ts
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  content: string;
  contentHtml?: string;
}

// *** TU ARRAY blogPosts SIMULADO DEBE ESTAR DEFINIDO AQUÍ CON OBJETOS ***
const blogPosts: BlogPost[] = [
  {
    slug: 'introduccion-a-pandas',
    title: 'Introducción a Pandas para Análisis de Datos',
    summary: 'Aprende los conceptos básicos de la librería Pandas en Python para manipular y analizar datos.',
    date: '2023-10-01',
    content: `...`, // Asegúrate de que el contenido (aunque sea simulado) esté presente
  },
  {
    slug: 'sql-para-principiantes',
    title: 'Consultas SQL Esenciales para Empezar',
    summary: 'Un vistazo rápido a las consultas SQL más importantes que todo analista debe conocer.',
    date: '2023-10-15',
    content: `...`,
  },
  {
    slug: 'visualizacion-con-matplotlib',
    title: 'Creando Gráficos Atractivos con Matplotlib',
    summary: 'Explora cómo usar Matplotlib para crear visualizaciones de datos efectivas en Python.',
    date: '2023-11-05',
     content: `...`,
  },
  // ... asegúrate de que tus 3 o más objetos de blog simulados estén aquí con sus propiedades (slug, title, summary, date, content)
];
// *******************************************************

// Esta función debe simplemente devolver el array blogPosts
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts; // <-- ASEGÚRATE DE QUE DEVUELVE blogPosts AQUÍ
}

// getBlogPostBySlug y getAllBlogSlugs deben estar definidos y exportados también
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> { /* ... código ... */ return undefined; } // Simulación temporal si no quieres copiar el código completo ahora
export function getAllBlogSlugs(): string[] { /* ... código ... */ return []; } // Simulación temporal