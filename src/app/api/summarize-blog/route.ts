import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { blogPostContent } = await req.json()
  // Simulación de resumen
  await new Promise(res => setTimeout(res, 1000))
  return NextResponse.json({
    summary: `Resumen IA: ${blogPostContent.slice(0, 100)}... (resumido)`
  })
} 