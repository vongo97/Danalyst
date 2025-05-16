// src/app/blog/lib/posts.ts
import { remark } from "remark";
import html from "remark-html";

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
    slug: "introduccion-a-pandas",
    title: "Introducción a Pandas para Análisis de Datos",
    summary:
      "Aprende los conceptos básicos de la librería Pandas en Python para manipular y analizar datos.",
    date: "2023-10-01",
    content: `
# ¿Qué es Pandas? La Biblioteca Esencial para la Ciencia de Datos con Python


Publicado por: El Ingeniero del Blog


Última actualización: 16 de mayo de 2025


## Introducción


Si estás aprendiendo Python o trabajando con análisis de datos, seguramente ya escuchaste hablar de **Pandas**. Esta biblioteca ha cambiado radicalmente la forma en que los programadores procesan y analizan datos en Python.


En este artículo, te explicaré qué es Pandas, cómo se usa y por qué se ha convertido en una herramienta clave para científicos de datos, analistas y desarrolladores.


## ¿Qué es Pandas?


Pandas es una biblioteca de código abierto para Python que proporciona estructuras de datos y herramientas de análisis altamente eficientes y fáciles de usar.


Fue desarrollada por Wes McKinney en 2008, y su nombre proviene del término econométrico Panel Data.


## ¿Por qué Pandas es tan útil?


Estructuras como DataFrame y Series para trabajar con datos tabulares y unidimensionales.
Herramientas para filtrar, seleccionar y transformar datos fácilmente.
Funciones integradas para manejo de valores faltantes y limpieza de datos.
Lectura y escritura en múltiples formatos como CSV, Excel, SQL, JSON, y más.
Altísimo rendimiento con grandes volúmenes de datos.


## Ejemplo básico con Pandas


Veamos un ejemplo sencillo de cómo crear y mostrar un DataFrame:


\`\`\`python
import pandas as pd


# Crear un DataFrame simple
data = {'Nombre': ['Ana', 'Carlos', 'Sofía', 'Javier'],
        'Edad': [24, 28, 22, 31],
        'Ciudad': ['Madrid', 'Barcelona', 'Valencia', 'Sevilla']}
df = pd.DataFrame(data)


# Mostrar el DataFrame
print(df)
\`\`\`
### Salida esperada:
\`\`\`
    Nombre  Edad      Ciudad
0  Ana     24  Madrid
1  Carlos  28  Barcelona
2  Sofía   22  Valencia
3  Javier  31    Sevilla
\`\`\`
## Conclusión
Pandas es una herramienta poderosa y versátil para el análisis de datos en Python. Su facilidad de uso y su rendimiento la convierten en una opción ideal para cualquier persona que trabaje con datos.


Crear un DataFrame simple.

`,
  },
  {
    slug: "sql-para-principiantes",
    title: "Consultas SQL Esenciales para Empezar",
    summary:
      "Un vistazo rápido a las consultas SQL más importantes que todo analista debe conocer.",
    date: "2023-10-15",
    content: `...`,
  },
  {
    slug: "visualizacion-con-matplotlib",
    title: "Creando Gráficos Atractivos con Matplotlib",
    summary:
      "Explora cómo usar Matplotlib para crear visualizaciones de datos efectivas en Python.",
    date: "2023-11-05",
    content: `...`,
  },
];
// *******************************************************

// Esta función debe simplemente devolver el array blogPosts
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts; // <-- ASEGÚRATE DE QUE DEVUELVE blogPosts AQUÍ
}

// getBlogPostBySlug y getAllBlogSlugs deben estar definidos y exportados también
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) {
    return undefined;
  }

  // Procesa el contenido Markdown y añade clases de Tailwind CSS
  const processedContent = await remark().use(html).process(post.content);

  const contentHtml = processedContent
    .toString()
    .replace(/<h1>/g, '<h1 class="text-3xl font-bold mb-4">')
    .replace(/<h2>/g, '<h2 class="text-2xl font-semibold mb-3">')
    .replace(/<h3>/g, '<h3 class="text-xl font-semibold mb-2">')
    .replace(/<p>/g, '<p class="text-gray-700 mb-4">')
    .replace(/<ul>/g, '<ul class="list-disc list-inside text-gray-700 mb-4">')
    .replace(
      /<ol>/g,
      '<ol class="list-decimal list-inside text-gray-700 mb-4">'
    )
    .replace(
      /<code>/g,
      '<code class="bg-gray-100 text-sm py-1 px-2 rounded font-mono">'
    )
    .replace(
      /<pre>/g,
      '<pre class="bg-gray-100 text-sm py-4 px-4 rounded font-mono overflow-x-auto whitespace-pre-wrap">'
    );

  return {
    ...post,
    contentHtml: contentHtml,
  };
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
