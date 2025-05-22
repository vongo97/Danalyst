import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validación básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Registrar usuario
    const user = await registerUser(name, email, password);

    // Devolver respuesta exitosa
    return NextResponse.json(
      {
        message: "Usuario registrado correctamente",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en registro:", error);

    // Manejar error de email duplicado
    if (error.message === "El correo electrónico ya está registrado") {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    // Otros errores
    return NextResponse.json(
      { message: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}
