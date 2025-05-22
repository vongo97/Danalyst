import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "DanalystR",
  port: parseInt(process.env.DB_PORT || "3306"),
};

// Crear un pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para obtener un usuario por email
export async function getUserByEmail(email: string) {
  try {
    const [rows] = await pool.execute(
      "SELECT usuario_id, nombre, email, clave_hash, membresia_id FROM Usuarios WHERE email = ?",
      [email]
    );

    const users = rows as any[];
    if (users.length === 0) {
      return null;
    }

    const user = users[0];
    return {
      id: user.usuario_id.toString(),
      name: user.nombre,
      email: user.email,
      password: user.clave_hash,
      role: user.membresia_id === 3 ? "admin" : "user",
    };
  } catch (error) {
    console.error("Error al buscar usuario por email:", error);
    return null;
  }
}

// Función para obtener un usuario por ID
export async function getUserById(id: string) {
  try {
    const [rows] = await pool.execute(
      "SELECT usuario_id, nombre, email, membresia_id FROM Usuarios WHERE usuario_id = ?",
      [id]
    );

    const users = rows as any[];
    if (users.length === 0) {
      return null;
    }

    const user = users[0];
    return {
      id: user.usuario_id.toString(),
      name: user.nombre,
      email: user.email,
      role: user.membresia_id === 3 ? "admin" : "user",
    };
  } catch (error) {
    console.error("Error al buscar usuario por ID:", error);
    return null;
  }
}

// Función para crear un nuevo usuario
export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }

    // Insertar el nuevo usuario
    const [result] = await pool.execute(
      "INSERT INTO Usuarios (nombre, email, clave_hash) VALUES (?, ?, ?)",
      [userData.name, userData.email, userData.password]
    );

    const insertResult = result as any;
    const userId = insertResult.insertId;

    // Devolver el usuario creado
    return {
      id: userId.toString(),
      name: userData.name,
      email: userData.email,
      role: "user",
    };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

// Exportar el pool para usarlo en otras partes de la aplicación
export { pool };
