import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

  const { nickname } = await req.json();

  const updated = await prisma.user.upsert({
    where: { ip },
    update: { nickname },
    create: { ip, nickname },
  });

  return NextResponse.json({ nickname: updated.nickname });
}
