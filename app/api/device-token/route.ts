import { signDeviceId } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { deviceId } = await req.json();

  const token = signDeviceId(deviceId);
  return NextResponse.json({ token });
}
