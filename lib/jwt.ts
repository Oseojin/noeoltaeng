import jwt from "jsonwebtoken";

const SECRET = process.env.DEVICE_JWT_SECRET!; // .env에 저장

export function signDeviceId(deviceId: string): string {
  return jwt.sign({ deviceId }, SECRET, { expiresIn: "180d" }); // 유효기간 6개월
}

export function verifyDeviceToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, SECRET) as { deviceId: string };
    return payload.deviceId;
  } catch {
    return null;
  }
}
