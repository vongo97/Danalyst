'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Definir el tipo de usuario
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile?: {
    bio?: string;
    jobTitle?: string;
    company?: string;
  };
}

// Definir el tipo del contexto
interface AuthContextType {
  user: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios de prueba
const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profile: {
      bio: 'Administrador del sistema',
      jobTitle: 'Admin',
      company: 'Danalyst',
    },
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@example.com',
    role: 'user',
    profile: {
      bio: 'Usuario de prueba',
      jobTitle: 'Analista',
      company: 'Tech Corp',
    },
  },
];

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const router = useRouter();

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setStatus('unauthenticated');
    }
  }, []);

  // Función de login
  const login = async (email: string, password: string) => {
    // Simular una petición a la API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verificar credenciales
    const user = users.find(u => u.email === email);
    
    if (user && password === 'password') { // En producción, compararíamos hashes
      setUser(user);
      setStatus('authenticated');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error storing user in localStorage:', error);
      }
      return { success: true };
    }
    
    return { success: false, error: 'Credenciales incorrectas' };
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    setStatus('unauthenticated');
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}