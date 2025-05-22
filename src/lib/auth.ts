import { hash, compare } from "bcryptjs";
import { getUserByEmail, createUser, getUserById } from "./db";

// Función para registrar un nuevo usuario
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    // Hash de la contraseña
    const hashedPassword = await hash(password, 10);

    // Crear nuevo usuario en la base de datos
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

// Función para autenticar un usuario
export async function authenticateUser(email: string, password: string) {
  try {
    // Credenciales hardcodeadas para desarrollo
    if (email === "admin@example.com" && password === "password") {
      return {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      };
    }

    // Buscar usuario por email en la base de datos
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }

    // Verificar contraseña
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Devolver usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    return null;
  }
}

// Función para obtener un usuario por ID
export async function getUserByIdFromDb(id: string) {
  try {
    return await getUserById(id);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return null;
  }
}
