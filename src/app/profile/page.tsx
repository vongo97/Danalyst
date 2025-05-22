'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession({ required: true });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '', // Assuming bio, jobTitle, company might not be on session.user directly
    jobTitle: '', // but could be fetched or on a nested object if customized
    company: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        // Assuming these fields might be on session.user or a nested object like session.user.profile
        // For this refactor, we'll assume they might not exist on the default user object
        // or would require further backend setup to be included in the session.
        // If they are part of the session, they can be accessed e.g. session.user.bio
        bio: (session.user as any).bio || '', 
        jobTitle: (session.user as any).jobTitle || '',
        company: (session.user as any).company || '',
      });
    }
  }, [session]);

  // Mostrar pantalla de carga while session is loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  // If session is available (status === 'authenticated' due to required: true)
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full border-4 border-white mr-6 bg-gray-300 flex items-center justify-center text-4xl font-bold text-indigo-600">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{session?.user?.name}</h1>
                <p className="text-indigo-100">{formData.jobTitle} {formData.company ? `en ${formData.company}` : ''}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Mi Perfil</h2>
              {/* Editing functionality is disabled as per requirements */}
            </div>
            
            {/* Displaying user data in a read-only format */}
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
                    href="/settings/password" // Assuming this page exists for password changes
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Cambiar contraseña
                  </Link>
                  {/* Add other account preference links here if needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}