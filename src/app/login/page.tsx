'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { siteConfig } from '@/config/site';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  // Handle messages from query params (e.g., after registration or OAuth error)
  useEffect(() => {
    const registered = searchParams.get('registered');
    if (registered === 'true') {
      setSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
    }

    const error = searchParams.get('error');
    if (errorParam === 'CredentialsSignin') { // Specific error from NextAuth
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    } else if (errorParam) {
      setError('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Usar NextAuth para iniciar sesión
      const result = await signIn('credentials', {
        redirect: false, // Important to handle redirect manually or rely on useEffect
        email,
        password,
        callbackUrl: callbackUrl // Pass callbackUrl to NextAuth
      });

      if (result?.error) {
        // Error is handled by the useEffect hook listening to searchParams.get('error')
        // but we can set a general message or log if needed.
        // setError('Credenciales incorrectas o error en el inicio de sesión.');
        // router.push(`/login?error=${result.error}`); // This is often handled by NextAuth itself if redirect is not false
        if (result.error !== 'CredentialsSignin') { // CredentialsSignin is handled by useEffect
            setError('Ocurrió un error inesperado durante el inicio de sesión.');
        }
        setIsLoading(false);
        return;
      }

      // If signIn is successful and there's no error,
      // the useEffect for status === 'authenticated' should handle the redirect.
      // For immediate feedback or if useEffect is slow, uncomment:
      // router.push(callbackUrl);
      // setIsLoading(false); // Already handled by status change and useEffect redirect

    } catch (error) {
      console.error('Login submission error:', error);
      setError('Ocurrió un error al procesar el inicio de sesión. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }
    // setIsLoading(false) should be called regardless of outcome if not redirecting immediately
    // but since status change will trigger re-render or redirect, it might not be needed here.
  };

  // While NextAuth is checking session status, show loading or minimal UI
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="p-8 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-700">Cargando...</p>
          {/* You can add a spinner here */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div>
            <Link href="/" className="flex items-center mb-8">
              <img src="/images/Logo.svg" alt={siteConfig.name} className="w-10 h-10 mr-3" />
              <span className="text-2xl font-bold text-indigo-600">{siteConfig.name}</span>
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Inicia sesión en tu cuenta</h2>
            <p className="mt-2 text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Regístrate
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md">
                {successMessage}
              </div>
            )}

            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                      Recordarme
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex-1 hidden w-0 lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
            <h2 className="mb-6 text-4xl font-bold">Accede a contenido exclusivo</h2>
            <p className="max-w-md mb-8 text-xl text-center text-indigo-100">
              Desbloquea cursos premium, mentorías personalizadas y herramientas avanzadas para impulsar tu carrera en análisis de datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}