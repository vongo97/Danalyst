// Define la interfaz para la estructura de un curso
export interface Course {
  title: string;
  description: string;
  imageUrl: string; // Hacemos que imageUrl sea requerido si todos tienen imagen, o lo dejamos opcional si no
  link: string;
  category?: string;
  level?: string;
  duration?: string;
}


export const courses: Course[] = [ // Añadimos la anotación de tipo al array
  {
    title: 'Introducción al Análisis de Datos',
    description: 'Aprende los fundamentos del análisis de datos utilizando Python, Pandas y NumPy. Ideal para principiantes.',
    imageUrl: '/images/Analisis_de_datos.jpg',
    link: '#',
    category: 'Fundamentos',
    level: 'Principiante',
    duration: '4 semanas',
  },
  {
    title: 'SQL para Análisis de Datos',
    description: 'Domina consultas SQL complejas, funciones de ventana y técnicas de optimización de bases de datos.',
    imageUrl: '/images/Sql_analisis_AD.jpg',
    link: '#',
    category: 'Bases de Datos',
    level: 'Intermedio',
    duration: '3 semanas',
  },
  {
    title: 'Machine Learning y Aprendizaje Automático',
    description: 'Explora los algoritmos principales de aprendizaje automático, evaluación de modelos e implementación práctica.',
    imageUrl: '/images/Algoritmos-machine-learning.jpg',
    link: '#',
    category: 'IA y ML',
    level: 'Avanzado',
    duration: '6 semanas',
  },
  {
    title: 'Visualización de Datos con Tableau',
    description: 'Crea dashboards y visualizaciones impactantes para comunicar eficazmente los conocimientos de los datos.',
    imageUrl: '/images/tableau-data-viz.jpg',
    link: '#',
    category: 'Visualización',
    level: 'Intermedio',
    duration: '3 semanas',
  },
  {
    title: 'Análisis de Big Data con Spark',
    description: 'Aprende a procesar y analizar grandes conjuntos de datos utilizando Apache Spark y conceptos de computación distribuida.',
    imageUrl: '/images/big-data-spark.jpg',
    link: '#',
    category: 'Big Data',
    level: 'Avanzado',
    duration: '5 semanas',
  },
  {
    title: 'Estadísticas para Ciencia de Datos',
    description: 'Comprende los conceptos estadísticos clave y su aplicación en la ciencia de datos y pruebas A/B.',
    imageUrl: '/images/data-science.jpg',
    link: '#',
    category: 'Estadísticas',
    level: 'Intermedio',
    duration: '4 semanas',
  },
  {
    title: 'Certificado Profesional de Análisis de Datos de Google', // Título del curso de Google
    description: 'Aprende habilidades de análisis de datos muy demandadas por empleadores.', // Descripción (debería ser tu resumen o citar la fuente)
    imageUrl: '/images/google-certificado-Data.jpg', // Una imagen que tengas o encuentres (¡cuidado con derechos!)
    link: 'https://www.coursera.org/professional-certificates/google-data-analytics', // El enlace al curso original
    category: 'Certificación',
    level: 'Principiante',
    duration: 'Aprox. 6 meses',
  }
];

export async function fetchCourses(): Promise<Course[]> { // Añadimos anotación de tipo al retorno
  // Simulamos una pequeña demora para la carga de datos
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Devolvemos los datos de los cursos con las URLs de imagen
  return courses;
}