export const courses = [
  {
    title: 'Introducción al Análisis de Datos',
    description: 'Aprende los fundamentos del análisis de datos utilizando Python, Pandas y NumPy. Ideal para principiantes.'
  },
  {
    title: 'SQL para Análisis de Datos',
    description: 'Domina consultas SQL complejas, funciones de ventana y técnicas de optimización de bases de datos.'
  },
  {
    title: 'Machine Learning y Aprendizaje Automático',
    description: 'Explora los algoritmos principales de aprendizaje automático, evaluación de modelos e implementación práctica.'
  },
  {
    title: 'Visualización de Datos con Tableau',
    description: 'Crea dashboards y visualizaciones impactantes para comunicar eficazmente los conocimientos de los datos.'
  },
  {
    title: 'Análisis de Big Data con Spark',
    description: 'Aprende a procesar y analizar grandes conjuntos de datos utilizando Apache Spark y conceptos de computación distribuida.'
  },
  {
    title: 'Estadísticas para Ciencia de Datos',
    description: 'Comprende los conceptos estadísticos clave y su aplicación en la ciencia de datos y pruebas A/B.'
  }
];

export async function fetchCourses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses);
    }, 500);
  });
} 