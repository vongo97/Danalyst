import NextAuth from "next-auth";
import { authOptions } from "./options";

// Usar la configuración de opciones
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
