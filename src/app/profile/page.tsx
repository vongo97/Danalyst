'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    jobTitle: '',
    company: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Verificar autenticación y cargar datos del usuario
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Cargar datos del formulario
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          bio: userData.profile?.bio || '',
          jobTitle: userData.profile?.jobTitle || '',
          company: userData.profile?.company || '',
        });
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simular una petición a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el usuario en localStorage
      const updatedUser = {
        ...user,
        name: formData.name,
        profile: {
          ...user.profile,
          bio: formData.bio,
          jobTitle: formData.jobTitle,
          company: formData.company,
        }
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Mostrar pantalla de carga
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no renderizar nada (la redirección se maneja en el useEffect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full border-4 border-white mr-6 bg-gray-300 flex items-center justify-center text-4xl font-bold text-indigo-600">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <p className="text-indigo-100">{formData.jobTitle} {formData.company ? `en ${formData.company}` : ''}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Mi Perfil</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Editar Perfil
                </button>
              ) : null}
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">El correo electrónico no se puede cambiar</p>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Biografía
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Cuéntanos sobre ti..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                      Puesto de trabajo
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ej: Analista de Datos"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ej: Tech Corp"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    disabled={isSaving}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Información personal</h3>
                  <div className="mt-2 border-t border-gray-200 pt-4">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-3 grid grid-cols-3">
                        <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.name}</dd>
                      </div>
                      <div className="py-3 grid grid-cols-3">
                        <dt className="text-sm font-medium text-gray-500">Correo electrónico</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.email}</dd>
                      </div>
                      <div className="py-3 grid grid-cols-3">
                        <dt className="text-sm font-medium text-gray-500">Biografía</dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {formData.bio || <span className="text-gray-500 italic">No has añadido una biografía</span>}
                        </dd>
                      </div>
                      <div className="py-3 grid grid-cols-3">
                        <dt className="text-sm font-medium text-gray-500">Puesto de trabajo</dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {formData.jobTitle || <span className="text-gray-500 italic">No especificado</span>}
                        </dd>
                      </div>
                      <div className="py-3 grid grid-cols-3">
                        <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {formData.company || <span className="text-gray-500 italic">No especificada</span>}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Preferencias de cuenta</h3>
                  <div className="mt-2 border-t border-gray-200 pt-4">
                    <Link 
                      href="/settings/password" 
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Cambiar contraseña
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}