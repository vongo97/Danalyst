// src/app/api/generate-analysis-template/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Lee la clave API desde las variables de entorno
const API_KEY = process.env.GOOGLE_API_KEY;

export async function POST(req: NextRequest) {
  // Validar que la clave API esté configurada
  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
  }

  try {
    // Extrae los datos del cuerpo de la solicitud.
    // Esperamos un objeto con 'templatePurpose' y 'audience' (definiremos esto en el frontend)
    const { templatePurpose, audience } = await req.json();

    // Validar que se recibieron los datos necesarios
    if (!templatePurpose) {
        return NextResponse.json({ error: 'templatePurpose is required' }, { status: 400 });
    }
    // audience es opcional, pero ayuda a refinar la plantilla

    // Inicializa el cliente de Google Generative AI
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Usa el nombre del modelo que funcionó en tu panel de API
    // Según tu última captura, parece ser 'gemini-1.5-flash'
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construye el prompt para Gemini
    // Pedimos a Gemini que actúe como experto y genere una estructura de plantilla
    const prompt = `Eres un experto analista de datos y redactor de documentación técnica.
    Genera la estructura de una plantilla para "${templatePurpose}".
    ${audience ? `La audiencia principal para esta plantilla es: ${audience}.` : ''}
    Incluye secciones comunes, títulos descriptivos y una breve explicación del contenido esperado en cada sección.
    Presenta la plantilla en un formato de esquema claro (usando puntos, guiones o numeración).
    La respuesta debe ser directamente la estructura de la plantilla en texto plano, sin preámbulos ni conclusiones adicionales.`;


    // Llama a la API de Gemini para generar el contenido
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const templateText = response.text(); // Extrae el texto generado

    // Devuelve la plantilla generada al frontend
    return NextResponse.json({ template: templateText });

  } catch (error) {
    console.error('Error calling Gemini API for template generation:', error);
    // Devuelve un mensaje de error al frontend
    // En desarrollo, podemos incluir más detalles del error para depurar
    if (process.env.NODE_ENV === 'development') {
         return NextResponse.json({ error: 'Error generating template', details: (error as Error).message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error generating template' }, { status: 500 });
  }
}