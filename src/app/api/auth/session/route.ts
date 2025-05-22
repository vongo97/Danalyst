import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authOptions } from "@/app/auth/[...nextauth]/options";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return NextResponse.json({
    user: token ? { name: token.name, email: token.email } : null,
  });
}
