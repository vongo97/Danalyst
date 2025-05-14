export const courses = [
  {
    title: 'Introducción al Análisis de Datos',
    description: 'Aprende los fundamentos del análisis de datos utilizando Python, Pandas y NumPy. Ideal para principiantes.',
    // Corregida la URL de la imagen para que sea relativa a la carpeta public
    imageUrl: '/images/analisis_datos.jpg',
    link: '#', // Asegúrate de tener un enlace real aquí
    category: 'Fundamentos', // Ejemplo de categoría
    level: 'Principiante', // Ejemplo de nivel
    duration: '4 semanas', // Ejemplo de duración
  },
  {
    title: 'SQL para Análisis de Datos',
    description: 'Domina consultas SQL complejas, funciones de ventana y técnicas de optimización de bases de datos.',
    imageUrl: '/images/sql-data-analysis.jpg', // Añade la URL de la imagen para este curso
    link: '#', // Asegúrate de tener un enlace real aquí
    category: 'Bases de Datos',
    level: 'Intermedio',
    duration: '3 semanas',
  },
  {
    title: 'Machine Learning y Aprendizaje Automático',
    description: 'Explora los algoritmos principales de aprendizaje automático, evaluación de modelos e implementación práctica.',
    imageUrl: '/images/machine-learning.jpg', // Añade la URL de la imagen para este curso
    link: '#', // Asegúrate de tener un enlace real aquí
    category: 'IA y ML',
    level: 'Avanzado',
    duration: '6 semanas',
  },
  {
    title: 'Visualización de Datos con Tableau',
    description: 'Crea dashboards y visualizaciones impactantes para comunicar eficazmente los conocimientos de los datos.',
    imageUrl: '/images/tableau-data-viz.jpg', // Añade la URL de la imagen para este curso
    link: '#', // Asegúrate de tener un enlace real aquí
    category: 'Visualización',
    level: 'Intermedio',
    duration: '3 semanas',
  },
  {
    title: 'Análisis de Big Data con Spark',
    description: 'Aprende a procesar y analizar grandes conjuntos de datos utilizando Apache Spark y conceptos de computación distribuida.',
    imageUrl: '/images/big-data-spark.jpg', // Añade la URL de la imagen para este curso
    link: '#', // Asegúrate de tener un enlace real aquí
    category: 'Big Data',
    level: 'Avanzado',
    duration: '5 semanas',
  },
  {
    title: 'Estadísticas para Ciencia de Datos',
    description: 'Comprende los conceptos estadísticos clave y su aplicación en la ciencia de datos y pruebas A/B.',
    imageUrl: '/images/statistics-data-science.jpg', // Añade la URL de la imagen para este curso
    link: '#', // Asegúrate de tener un enlace real aquí
    category: 'Estadísticas',
    level: 'Intermedio',
    duration: '4 semanas',
  }
];

export async function fetchCourses() {
  // Simulamos una pequeña demora para la carga de datos
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Devolvemos los datos de los cursos con las URLs de imagen
  return courses;
}
