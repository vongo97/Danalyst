// src/app/blog/lib/posts.ts
import { remark } from "remark";
import html from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  content: string; // Contenido original en Markdown
  contentHtml?: string; // Propiedad para el contenido HTML procesado
  imageUrl?: string; // Imagen destacada para el post individual (si la usas)
  thumbnailUrl?: string; // URL para la miniatura en la lista de blogs
}

// *** ARRAY CON DATOS SIMULADOS DE BLOGS ***
// Asegúrate de que este array contenga tus objetos de blog con los slugs y contenido (Markdown) correctos.
const blogPosts: BlogPost[] = [
  {
    slug: "introduccion-a-pandas",
    title: "Introducción a Pandas para Análisis de Datos",
    summary:
      "Aprende los conceptos básicos de la librería Pandas en Python para manipular y analizar datos.",
    date: "2023-10-01",
    content: `
## ¿Qué es Pandas?
Pandas es una biblioteca de código abierto para Python que proporciona estructuras de datos de alto rendimiento y herramientas de análisis de datos fáciles de usar.
Es especialmente popular para la manipulación y el análisis de datos tabulares (similares a hojas de cálculo o bases de datos).

## Estructuras de Datos Clave
Las dos estructuras de datos principales en Pandas son:
1.  **Series:** Un array unidimensional etiquetado, similar a una columna en una hoja de cálculo.
2.  **DataFrame:** Una estructura de datos bidimensional etiquetada con columnas de tipos potencialmente diferentes, similar a una hoja de cálculo completa o una tabla de base de datos.

## Primeros Pasos
Para empezar con Pandas, primero necesitas importarlo:
\`\`\`python
import pandas as pd
\`\`\`
Luego, puedes crear un DataFrame a partir de un diccionario o cargar datos desde un archivo (CSV, Excel, etc.).
\`\`\`python
data = {'columna1': [1, 2, 3], 'columna2': ['A', 'B', 'C']}
df = pd.DataFrame(data)
print(df)
\`\`\`
Esto imprimirá un DataFrame simple.
Pandas ofrece una vasta cantidad de funciones para limpieza de datos, transformación, agregación, fusión y mucho más, convirtiéndola en una herramienta indispensable para cualquier analista de datos que trabaje con Python.
`,
    thumbnailUrl: "/images/thumb-pandas.jpg", // Asegúrate de tener esta imagen en public/images
  },
  {
    slug: "sql-para-principiantes",
    title: "Consultas SQL Esenciales para Empezar",
    summary:
      "Un vistazo rápido a las consultas SQL más importantes que todo analista debe conocer.",
    date: "2023-10-15",
    content: `
## Fundamentos de SQL
SQL (Structured Query Language) es el lenguaje estándar para gestionar y manipular bases de datos relacionales.
Es fundamental para extraer, actualizar y organizar datos almacenados en tablas.

## Consultas Básicas
Las operaciones más comunes incluyen:
* **SELECT:** Para recuperar datos de una o más tablas.
\`\`\`sql
SELECT columna1, columna2 FROM nombre_tabla;
\`\`\`
* **FROM:** Especifica la tabla de la cual recuperar los datos.
* **WHERE:** Filtra los registros basados en una condición.
\`\`\`sql
SELECT * FROM nombre_tabla WHERE columna1 > 100;
\`\`\`
* **GROUP BY:** Agrupa filas que tienen los mismos valores en columnas especificadas.
\`\`\`sql
SELECT categoria, COUNT(*) FROM productos GROUP BY categoria;
\`\`\`
* **ORDER BY:** Ordena los resultados.
\`\`\`sql
SELECT * FROM usuarios ORDER BY fecha_registro DESC;
\`\`\`
Dominar estas consultas básicas es el primer paso para cualquier analista de datos que trabaje con bases de datos.
SQL es una habilidad transferible a través de diversas plataformas de bases de datos.
`,
    thumbnailUrl: "/images/thumb-sql.jpg", // Asegúrate de tener esta imagen en public/images
  },
  {
    slug: "visualizacion-con-matplotlib",
    title: "Creando Gráficos Atractivos con Matplotlib",
    summary:
      "Explora cómo usar Matplotlib para crear visualizaciones de datos efectivas en Python.",
    date: "2023-11-05",
    content: `
## Introducción a Matplotlib
Matplotlib es una biblioteca de visualización en Python que permite crear gráficos estáticos, animados e interactivos.
Es muy flexible y una opción popular para generar visualizaciones para análisis exploratorio de datos y reportes.

## Tipos de Gráficos Comunes
Puedes crear una amplia variedad de gráficos, incluyendo:
* Gráficos de línea
* Gráficos de dispersión (scatter plots)
* Histogramas
* Gráficos de barras
* Gráficos de pastel (pie charts)

## Ejemplo Básico
Para crear un gráfico simple, necesitas importar \`matplotlib.pyplot\`:
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Datos de ejemplo
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Crear el gráfico de línea
plt.plot(x, y)

# Añadir etiquetas y título
plt.xlabel('Eje X')
plt.ylabel('Eje Y')
plt.title('Gráfico de Seno')

# Mostrar el gráfico
plt.show()
\`\`\`
Matplotlib ofrece un control detallado sobre cada aspecto de la visualización, desde los colores y estilos de línea hasta las etiquetas y títulos, lo que la hace muy potente para crear gráficos personalizados.
`,
    thumbnailUrl: "/images/thumb-matplotlib.jpg", // Asegúrate de tener esta imagen en public/images
  },
  // Agrega aquí más objetos de blog si tienes, verificando sus slugs y añadiendo thumbnailUrls
];
// ****************************************

// Función para obtener todas las entradas del blog (para la página de listado)
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts; // Devuelve el array completo de blogs
}

// Función asíncrona para obtener una entrada de blog por su slug y procesar el contenido
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  // Busca la entrada en el array blogPosts por el slug
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return undefined; // Si no se encuentra, devuelve undefined (esto activará el 404 en la página)
  }

  // *** Lógica de procesamiento de Markdown a HTML usando remark y remark-html ***
  // Asegúrate de que estas líneas estén presentes y correctas para convertir el contenido de Markdown a HTML
  const processedContent = await remark()
    .use(html) // Usa el plugin remark-html para la conversión
    .process(post.content); // Procesa el contenido Markdown original

  const contentHtml = processedContent.toString(); // Convierte el resultado procesado a string HTML
  // *********************************************

  // Devuelve el objeto de la entrada con el contenido HTML añadido
  return {
    ...post, // Copia las propiedades existentes de la entrada (slug, title, etc.)
    contentHtml, // Añade la propiedad contentHtml que acabamos de generar
  };
}

// Función para obtener TODOS los slugs (necesario para generateStaticParams)
export function getAllBlogSlugs(): string[] {
  // Mapea el array blogPosts para obtener solo los slugs.
  // ¡Los slugs devueltos aquí deben coincidir con los slugs en el array blogPosts!
  return blogPosts.map((post) => post.slug);
}
