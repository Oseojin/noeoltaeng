import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown"; // req.ip 제거

  const user = await prisma.user.findUnique({ where: { ip } });
  return NextResponse.json({ nickname: user?.nickname ?? "" });
}
