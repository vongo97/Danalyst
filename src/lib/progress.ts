// src/lib/progress.ts

// Tipo para el progreso de un curso
export interface CourseProgress {
  courseId: string;
  userId: string;
  progress: number; // 0-100
  completed: boolean;
  lastUpdated: Date;
}

// Datos simulados de progreso
const userProgress: CourseProgress[] = [
  {
    courseId: '1',
    userId: '1',
    progress: 75,
    completed: false,
    lastUpdated: new Date(),
  },
  {
    courseId: '2',
    userId: '1',
    progress: 30,
    completed: false,
    lastUpdated: new Date(),
  },
  {
    courseId: '3',
    userId: '1',
    progress: 100,
    completed: true,
    lastUpdated: new Date(),
  },
];

// Obtener el progreso de un usuario en un curso
export function getUserCourseProgress(userId: string, courseId: string): CourseProgress | null {
  const progress = userProgress.find(p => p.userId === userId && p.courseId === courseId);
  return progress || null;
}

// Obtener todo el progreso de un usuario
export function getUserProgress(userId: string): CourseProgress[] {
  return userProgress.filter(p => p.userId === userId);
}

// Actualizar el progreso de un usuario en un curso
export function updateUserProgress(userId: string, courseId: string, progress: number): CourseProgress {
  const index = userProgress.findIndex(p => p.userId === userId && p.courseId === courseId);
  
  if (index !== -1) {
    userProgress[index] = {
      ...userProgress[index],
      progress,
      completed: progress === 100,
      lastUpdated: new Date(),
    };
    return userProgress[index];
  }
  
  // Si no existe, crear nuevo registro
  const newProgress: CourseProgress = {
    courseId,
    userId,
    progress,
    completed: progress === 100,
    lastUpdated: new Date(),
  };
  
  userProgress.push(newProgress);
  return newProgress;
}

// Marcar un curso como completado
export function markCourseAsCompleted(userId: string, courseId: string): CourseProgress {
  return updateUserProgress(userId, courseId, 100);
}