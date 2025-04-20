import { verifyDeviceToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, nickname } = await req.json();

  // 닉네임 유효성 검사
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

  const deviceId = verifyDeviceToken(token);
  if (!deviceId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // ✅ 닉네임 중복 체크 (다른 사람이 쓰고 있는 경우)
  const existing = await prisma.user.findFirst({
    where: {
      nickname,
      deviceId: { not: deviceId }, // 본인 제외
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Nickname is already taken." },
      { status: 409 }
    );
  }

  // 저장 또는 업데이트
  const updated = await prisma.user.upsert({
    where: { deviceId },
    update: { nickname },
    create: { deviceId, nickname },
  });

  return NextResponse.json({ nickname: updated.nickname });
}
