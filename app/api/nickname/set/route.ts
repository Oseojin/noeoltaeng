import { verifyDeviceToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, nickname } = await req.json();

  if (
    typeof nickname !== "string" ||
    nickname.trim().length < 1 ||
    nickname.length > 20
  ) {
    return NextResponse.json(
      { error: "Please enter a nickname between 1 and 20 characters." },
      { status: 400 }
    );
  }

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  if (typeof nickname !== "string" || nickname.trim() === "") {
    return NextResponse.json({ error: "Invalid nickname" }, { status: 400 });
  }

  const deviceId = verifyDeviceToken(token);
  if (!deviceId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const updated = await prisma.user.upsert({
    where: { deviceId },
    update: { nickname },
    create: { deviceId, nickname },
  });

  return NextResponse.json({ nickname: updated.nickname });
}
