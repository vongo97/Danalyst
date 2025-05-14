import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Función de utilidad para combinar clases de Tailwind CSS
// Combina clases de forma inteligente, resolviendo conflictos de estilos.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
