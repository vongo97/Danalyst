import NextAuth, { User as NextAuthUser } from "next-auth"; // Importar User también
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/lib/auth";
import type { NextAuthConfig } from "next-auth";

// Define una interfaz para tu objeto User si tiene propiedades personalizadas como 'role'
// y si `authenticateUser` devuelve un objeto con esta forma.
interface CustomUser extends NextAuthUser {
  role?: string;
  // otras propiedades personalizadas que `authenticateUser` pueda devolver
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<CustomUser | null> { // Especificar el tipo de retorno
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Asegúrate que authenticateUser devuelve un objeto compatible con CustomUser
          const user = await authenticateUser(credentials.email as string, credentials.password as string);
          
          // Si authenticateUser devuelve null o undefined, la autenticación falla
          if (!user) return null;

          // Asumimos que 'user' de authenticateUser tiene id, name, email
          // y opcionalmente 'role'. Si 'id' no viene, NextAuth no funcionará bien.
          return user as CustomUser; // Castear a CustomUser
        } catch (error) {
          console.error("Error en authorize:", error);
          return null; 
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/', 
    error: '/login', 
  },
  callbacks: {
    async jwt({ token, user }) {
      // 'user' aquí es el objeto devuelto por 'authorize'
      if (user) {
        const customUser = user as CustomUser; // Castear a CustomUser
        token.id = customUser.id; 
        token.role = customUser.role; 
      }
      return token;
    },
    async session({ session, token }) {
      // 'token' aquí es el objeto devuelto por el callback 'jwt'
      if (session.user) {
        session.user.id = token.id as string; 
        if (token.role) {
          (session.user as CustomUser).role = token.role as string; 
        }
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET, // Dejar que NextAuth maneje el error si no está definido en producción
                                      // o usa un default solo para desarrollo estricto.
                                      // Para v5, es mejor confiar en que NEXTAUTH_SECRET esté seteado.
};

const { handlers, auth: nextAuthFunc } = NextAuth(authConfig); // Renombrar 'auth' para evitar conflicto de nombres si lo exportas
export const GET = handlers.GET;
export const POST = handlers.POST;

// Opcionalmente, exportar la función `auth` para usar en Server Components/Actions
// export const auth = nextAuthFunc;
