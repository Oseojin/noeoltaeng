import { verifyDeviceToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const deviceId = verifyDeviceToken(token);
  if (!deviceId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { deviceId } });
  return NextResponse.json({ nickname: user?.nickname ?? "", found: !!user });
}
